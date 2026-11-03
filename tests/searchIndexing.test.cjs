const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.join(__dirname, '..');

function load(file, imports = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(compiled, {
    module: mod, exports: mod.exports, Date, Map, Set, URL,
    require(id) {
      if (Object.hasOwn(imports, id)) return imports[id];
      throw new Error('Unexpected import: ' + id);
    },
  }, { filename: file });
  return mod.exports;
}
const metadata = load('lib/pageMetadata.ts');
const articles = load('app/articles/data.ts');
const sectors = load('app/sectors/data.ts');
const config = load('next.config.ts').default;
const source = 'https://www.diemex.in';
const canon = (entry) => String(entry.alternates.canonical);
function sitemap(fetchPublishedBlogs) {
  return load('app/sitemap.ts', {
    '@/lib/pageMetadata': metadata,
    '@/app/articles/data': articles,
    '@/app/sectors/data': sectors,
    '@/lib/publicBlogs': { fetchPublishedBlogs },
  }).default();
}

test('registration variants share the canonical register page while distinct public pages self-canonicalize', () => {
  for (const key of ['register', 'exhibitorRegister', 'brochure'])
    assert.equal(canon(metadata.PAGE_META[key]), source + '/register');
  assert.equal(canon(metadata.PAGE_META.exhibitionDirectory), source + '/exhibition-directory');
  assert.equal(canon(metadata.PAGE_META.participants), source + '/participants');
  assert.equal(canon(metadata.PAGE_META.conferenceProgramme), source + '/conference-programme');
  assert.equal(canon(metadata.PAGE_META.conference), source + '/conference');
  assert.equal(canon(metadata.PAGE_META.privacyPolicy), source + '/privacy-policy');
});

test('the sitemap includes current articles, sector pages and all published blog pages, with no duplicate or excluded URLs', async () => {
  const calls = [];
  const entries = await sitemap(async (page) => {
    calls.push(page);
    return {
      totalPages: 2,
      blogs: page === 1 ? [
        { slug: 'first-post', status: 'published', updatedAt: '2026-10-20T10:00:00Z' },
        { slug: 'unpublished-post', status: 'draft', updatedAt: '2026-10-20' },
      ] : [
        { slug: 'second-post', status: 'published', updatedAt: 'not-a-date' },
        { slug: 'first-post', status: 'published', updatedAt: '2026-10-20T10:00:00Z' },
        { slug: '../private?draft=true', status: 'published', updatedAt: '2026-10-20' },
      ],
    };
  });
  assert.deepEqual(calls, [1, 2]);
  const urls = Array.from(entries, (entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  for (const route of ['/register', '/conference-programme', '/exhibition-directory', '/exhibit-2027', '/blogs/first-post', '/blogs/second-post'])
    assert.ok(urls.includes(source + route), route);
  for (const slug of articles.getAllArticleSlugs()) assert.ok(urls.includes(source + '/articles/' + slug));
  for (const sector of sectors.diemexSectors) assert.ok(urls.includes(source + '/sectors/' + sector.slug));
  for (const url of urls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, source);
    assert.equal(parsed.search, '');
    assert.equal(parsed.hash, '');
    assert.doesNotMatch(url, /\[|\]|\s|unpublished|\.woff|favicon|_next|\/admin|\/dashboard|\/passes|\/scanner|thank-you|draft=true/);
  }
  assert.equal(entries.find((entry) => entry.url.endsWith('/first-post')).lastModified.toISOString(), '2026-10-20T10:00:00.000Z');
  assert.equal(Object.hasOwn(entries.find((entry) => entry.url.endsWith('/second-post')), 'lastModified'), false);
  const redirects = await config.redirects();
  for (const redirect of redirects) assert.equal(urls.includes(source + redirect.source), false);
  for (const url of urls.filter((url) => !url.includes('/blogs/') && !url.includes('/articles/') && !url.includes('/sectors/'))) {
    const route = new URL(url).pathname;
    assert.ok(fs.existsSync(path.join(root, 'app', route, 'page.tsx')), 'Missing page for ' + route);
  }
});

test('a blog outage does not publish a successful sitemap with blog pages silently removed', async () => {
  await assert.rejects(sitemap(async () => { throw new Error('Backend unavailable'); }), /Backend unavailable/);
});

test('public articles self-canonicalize and missing articles produce notFound before rendering', async () => {
  const page = load('app/articles/[slug]/page.tsx', {
    'react/jsx-runtime': require('react/jsx-runtime'),
    'next/navigation': { notFound() { throw new Error('NOT_FOUND'); } },
    '../data': articles,
    './ArticleClient': { default() {} },
    '@/lib/pageMetadata': metadata,
  });
  assert.equal(page.dynamicParams, false);
  for (const slug of articles.getAllArticleSlugs()) {
    const result = await page.generateMetadata({ params: Promise.resolve({ slug }) });
    assert.equal(canon(result), source + '/articles/' + slug);
    assert.notEqual(result.robots?.index, false);
  }
  for (const slug of ['how-is-die-mould-industry-preparing-in-2026', 'why-is-india-die-mould-industry-accelerating-in-2026', 'what-s-next-for-large-complex-tooling-mould-manufacturing'])
    await assert.rejects(page.generateMetadata({ params: Promise.resolve({ slug }) }), /NOT_FOUND/);
});

test('legacy redirects are permanent, resolve to existing pages and have no redirect chains', async () => {
  const redirects = await config.redirects();
  const paths = new Set(redirects.map((entry) => entry.source));
  assert.equal(paths.size, redirects.length);
  for (const redirect of redirects) {
    assert.equal(redirect.permanent, true);
    const target = new URL(redirect.destination, source);
    assert.equal(paths.has(target.pathname), false);
    if (target.pathname.startsWith('/articles/'))
      assert.ok(articles.getArticleBySlug(target.pathname.slice('/articles/'.length)));
    else assert.ok(fs.existsSync(path.join(root, 'app', target.pathname, 'page.tsx')), redirect.destination);
  }
  assert.equal(redirects.find((entry) => entry.source === '/event-brochure').destination, '/register?t=brochure');
  assert.equal(paths.has('/index.php'), false);
  for (const route of ['/buyer-seller-meet/domestic-buyer-seller-meet', '/buyer-seller-meet/international-buyer-seller-meet', '/&'])
    assert.equal(paths.has(route), false);
});

test('robots advertises the generated sitemap, and private routes retain explicit noindex headers', async () => {
  const robots = load('app/robots.ts', { '@/lib/pageMetadata': metadata }).default();
  assert.equal(robots.sitemap, source + '/sitemap.xml');
  assert.equal(robots.rules.allow, '/');
  for (const route of ['/admin', '/dashboard', '/register/thank-you'])
    assert.ok(robots.rules.disallow.includes(route));
  for (const rule of await config.headers())
    assert.ok(rule.headers.some((header) => header.key === 'X-Robots-Tag' && header.value.includes('noindex')));
  assert.equal(fs.existsSync(path.join(root, 'public/diemex-sitemap .xml')), false);
  assert.match(fs.readFileSync(path.join(root, 'public/diemex-sitemap.xml'), 'utf8'), /<sitemapindex[\s\S]*https:\/\/www\.diemex\.in\/sitemap\.xml/);
});


test('public content remains in server HTML while campaign tracking waits for the browser', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  for (const [pathname, sharedLayout] of [
    ['/articles/example', true], ['/exhibit-2027', false], ['/dashboard', false],
  ]) {
    const Shell = load('components/AppShell.tsx', {
      react: { ...React, useEffect() {} },
      'react/jsx-runtime': require('react/jsx-runtime'),
      'next/navigation': { usePathname: () => pathname },
      '@/components/NavBar': { default: () => React.createElement('nav', null, 'Navigation') },
      '@/components/Footer': { default: () => React.createElement('footer', null, 'Footer') },
      '@/components/UTMProvider': { UTMProvider() { throw new Promise(() => {}); } },
      '@/lib/utmTracker': { getUTMParams: () => ({}) },
    }).default;
    const html = renderToStaticMarkup(React.createElement(Shell, null,
      React.createElement('article', null, React.createElement('h1', null, 'Indexable article content')),
    ));
    assert.ok(html.includes('<h1>Indexable article content</h1>'), pathname);
    assert.equal(html.includes('<nav>Navigation</nav>'), sharedLayout, pathname);
    assert.equal(html.includes('<footer>Footer</footer>'), sharedLayout, pathname);
  }
});
