const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, imports, globals = {}) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(compiled, {
    module: mod, exports: mod.exports, Error,
    require(id) {
      if (Object.hasOwn(imports, id)) return imports[id];
      throw new Error('Unexpected import: ' + id);
    },
    ...globals,
  }, { filename: file });
  return mod.exports;
}

function fixture(responses) {
  const calls = [];
  const delays = [];
  const cached = new Map();
  const policies = [];
  const request = load('lib/publicBlogRequest.ts', {}, {
    AbortSignal,
    setTimeout: (resolve, delay) => { delays.push(delay); queueMicrotask(resolve); },
    fetch: async (url, options) => {
      calls.push({ url, options });
      const response = responses.shift();
      if (response instanceof Error) throw response;
      if (!response) throw new Error('Unexpected extra request');
      return response;
    },
  });
  // Reproduce the important cache contract: only resolved values are retained.
  const api = load('lib/publicBlogs.ts', {
    'server-only': {},
    react: { cache: fn => fn },
    'next/cache': {
      unstable_cache(fn, keys, policy) {
        policies.push(policy);
        return async (...args) => {
          const key = JSON.stringify([keys, args]);
          if (cached.has(key)) return cached.get(key);
          const value = await fn(...args);
          cached.set(key, value);
          return value;
        };
      },
    },
    './blogs': { BLOGS_API_URL: 'https://example.test/api/blogs' },
    './publicBlogRequest': request,
  });
  return { ...api, calls, delays, cached, policies, responses };
}

const blog = { id: 'blog-1', slug: 'precision-tooling', title: 'Precision tooling', content: 'A tooling update' };
const list = { blogs: [blog], total: 1, page: 1, totalPages: 1 };
const response = (status, payload) => ({
  ok: status >= 200 && status < 300, status,
  json: async () => payload,
});
const success = () => response(200, { success: true, data: list });

test('first visit recovers from a temporary unavailable backend without another page request', async () => {
  const app = fixture([response(503), success()]);
  assert.equal((await app.fetchPublishedBlogs(1)).blogs[0].slug, blog.slug);
  assert.equal(app.calls.length, 2);
  assert.equal(app.delays.length, 1);
  assert.notEqual(app.calls[0].options.signal, app.calls[1].options.signal);
});

test('network timeouts are retried with a fresh request', async () => {
  const app = fixture([Object.assign(new Error('Timed out'), { name: 'TimeoutError' }), success()]);
  assert.equal((await app.fetchPublishedBlogs(1)).total, 1);
  assert.equal(app.calls.length, 2);
});

test('a hosting HTML startup response is retried instead of cached', async () => {
  const html = { ok: true, status: 200, json: async () => { throw new SyntaxError('Unexpected HTML'); } };
  const app = fixture([html, success()]);
  assert.equal((await app.fetchPublishedBlogs(1)).total, 1);
  assert.equal(app.cached.size, 1);
  assert.equal(app.calls.length, 2);
});

test('malformed successful JSON cannot poison the cache', async () => {
  const app = fixture([response(200, { success: true, data: {} }), success()]);
  assert.equal((await app.fetchPublishedBlogs(1)).blogs.length, 1);
  assert.equal(app.calls.length, 2);
});

test('successful results are reused and a different page has a separate cache key', async () => {
  const app = fixture([success(), response(200, { success: true, data: { ...list, blogs: [], page: 2 } })]);
  await app.fetchPublishedBlogs(1);
  await app.fetchPublishedBlogs(1);
  await app.fetchPublishedBlogs(2);
  assert.equal(app.calls.length, 2);
  assert.equal(app.policies[0].revalidate, 60);
});

test('persistent failures are bounded and the next visitor can recover', async () => {
  const app = fixture([response(503), response(503), response(503)]);
  await assert.rejects(app.fetchPublishedBlogs(1), { status: 503 });
  assert.equal(app.calls.length, 3);
  assert.equal(app.cached.size, 0);
  app.responses.push(success());
  assert.equal((await app.fetchPublishedBlogs(1)).total, 1);
});

test('permanent client errors are not retried', async () => {
  const app = fixture([response(400)]);
  await assert.rejects(app.fetchPublishedBlogs(1), { status: 400 });
  assert.equal(app.calls.length, 1);
});

test('a missing blog remains a genuine not-found result', async () => {
  const app = fixture([response(404)]);
  assert.equal(await app.fetchPublishedBlog('missing'), null);
  assert.equal(app.calls.length, 1);
});

test('detail pages recover from temporary failures and preserve the requested slug', async () => {
  const app = fixture([response(502), response(200, { success: true, data: blog })]);
  assert.equal((await app.fetchPublishedBlog(blog.slug)).title, blog.title);
  assert.equal(app.calls[1].url, 'https://example.test/api/blogs/slug/' + blog.slug);
});

test('a valid empty list is displayed without treating it as an outage', async () => {
  const app = fixture([response(200, { success: true, data: { blogs: [], total: 0, page: 1, totalPages: 0 } })]);
  assert.equal((await app.fetchPublishedBlogs(1)).total, 0);
  assert.equal(app.calls.length, 1);
});
