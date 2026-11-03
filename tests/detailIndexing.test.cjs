const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.join(__dirname, '..');
function load(file, imports = {}, globals = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(compiled, {
    module: mod, exports: mod.exports, URL, Date, Map, Set, AbortSignal,
    process: { env: {} }, console: { log() {}, error() {}, warn() {} },
    require(id) {
      if (Object.hasOwn(imports, id)) return imports[id];
      throw new Error('Unexpected import: ' + id);
    }, ...globals,
  }, { filename: file });
  return mod.exports;
}
const metadata = load('lib/pageMetadata.ts');
const articles = load('app/articles/data.ts');
const gallery = load('app/media-gallery/data.ts');
const partners = load('data/partnersData.ts');
const mapper = load('app/exhibition-directory/api.ts');
const origin = 'https://www.diemex.in';
const id1 = '00000000-0000-0000-0000-000000000001';
const id2 = '00000000-0000-0000-0000-000000000002';
const id3 = '00000000-0000-0000-0000-000000000003';
const id4 = '00000000-0000-0000-0000-000000000004';
const notFound = () => { throw new Error('NOT_FOUND'); };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });
const company = (overrides = {}) => ({
  id: id1, company: 'Precision Tools', status: 'approved',
  originalPassword: 'SECRET_SENTINEL', password: 'SECRET_SENTINEL',
  metadata: JSON.stringify({ about: 'Precision tooling for automotive manufacturing.', originalPassword: 'SECRET_SENTINEL' }),
  ...overrides,
});
function publicFixture(responder) {
  const calls = [];
  const cached = new Map();
  const api = load('lib/publicExhibitors.ts', {
    'server-only': {},
    react: { cache: (fn) => fn },
    'next/cache': {
      unstable_cache(fn, keys) {
        return async (...args) => {
          const key = JSON.stringify([keys, args]);
          if (cached.has(key)) return cached.get(key);
          const result = await fn(...args);
          cached.set(key, result);
          return result;
        };
      },
    },
    '@/app/exhibition-directory/api': mapper,
  }, {
    fetch: async (url) => { calls.push(url); return responder(new URL(url), calls.length); },
  });
  return { api, calls };
}

test('public company discovery paginates, accepts mapped active status and excludes incomplete/private records', async () => {
  const app = publicFixture((url) => {
    const page = Number(url.searchParams.get('page'));
    assert.equal(url.searchParams.get('status'), 'approved');
    assert.equal(url.searchParams.get('limit'), '100');
    return json({ success: true, data: page === 1
      ? [company({ status: 'active' }), company({ id: id2, status: 'pending' })]
      : [company({ id: id3 }), company({ id: id4, company: '' })],
      pagination: { page, totalPages: 2 } });
  });
  const list = await app.api.fetchIndexableExhibitors();
  assert.deepEqual(Array.from(list, (item) => item.id), [id1, id3]);
  assert.equal(app.calls.length, 2);
  assert.doesNotMatch(JSON.stringify(list), /SECRET_SENTINEL|originalPassword|metadata|password/);
});

test('company ID and name aliases resolve to the same sanitized record and canonical', async () => {
  const app = publicFixture((url) => url.search
    ? json({ success: true, data: [company({ status: 'active' })], pagination: { page: 1, totalPages: 1 } })
    : json({ success: true, data: company() }));
  const first = await app.api.fetchPublicExhibitor(id1);
  const alias = await app.api.fetchPublicExhibitor('precision-tools');
  assert.equal(alias.id, first.id);
  assert.equal(alias.description, 'Precision tooling for automotive manufacturing.');
  assert.doesNotMatch(JSON.stringify(alias), /SECRET_SENTINEL|originalPassword|metadata|password/);
  assert.equal(app.calls.filter((url) => url.endsWith('/' + id1)).length, 1);
  const page = load('app/exhibition-directory/[slug]/page.tsx', {
    'react/jsx-runtime': require('react/jsx-runtime'),
    'next/navigation': { notFound },
    '@/lib/pageMetadata': metadata,
    '@/lib/publicExhibitors': app.api,
    './ExhibitorDetailClient': { default() {} },
  });
  for (const slug of [id1, 'precision-tools']) {
    const result = await page.generateMetadata({ params: Promise.resolve({ slug }) });
    assert.equal(result.alternates.canonical, origin + '/exhibition-directory/' + id1);
    assert.match(result.title, /Precision Tools/);
    const rendered = await page.default({ params: Promise.resolve({ slug }) });
    assert.equal(rendered.props.company.id, id1);
    assert.doesNotMatch(JSON.stringify(rendered.props), /SECRET_SENTINEL/);
  }
  const initial = await app.api.fetchInitialCompanyDirectory();
  assert.equal(initial.companies[0].company, 'Precision Tools');
  assert.equal(initial.totalPages, 1);
});

test('unpublished and missing companies cannot become public pages', async () => {
  for (const status of ['pending', 'inactive', 'rejected']) {
    const app = publicFixture(() => json({ success: true, data: company({ status }) }));
    assert.equal(await app.api.fetchPublicExhibitor(id1), null);
  }
  const missing = publicFixture(() => json({ success: false }, 404));
  assert.equal(await missing.api.fetchPublicExhibitor(id1), null);
});

test('backend outages are errors and cannot poison the public company cache as not-found', async () => {
  const app = publicFixture((url, count) => count === 1
    ? json({ success: false }, 503)
    : json({ success: true, data: company() }));
  await assert.rejects(app.api.fetchPublicExhibitor(id1), /503/);
  assert.equal((await app.api.fetchPublicExhibitor(id1)).company, 'Precision Tools');
  assert.equal(app.calls.length, 2);
  const invalid = publicFixture(() => json({ success: true, data: [] }));
  await assert.rejects(invalid.api.fetchIndexableExhibitors(), /pagination/);
});

test('all gallery pages have unique canonicals, real initial HTML and static not-found handling', async () => {
  const Client = load('app/media-gallery/[slug]/MediaGalleryClient.tsx', {
    react: React,
    'react/jsx-runtime': require('react/jsx-runtime'),
    'next/link': { default: (props) => React.createElement('a', props, props.children) },
  }).default;
  const page = load('app/media-gallery/[slug]/page.tsx', {
    'react/jsx-runtime': require('react/jsx-runtime'),
    'next/navigation': { notFound },
    '@/lib/pageMetadata': metadata,
    '../data': gallery,
    './MediaGalleryClient': { default: Client },
  });
  assert.equal(page.dynamicParams, false);
  assert.equal(page.generateStaticParams().length, gallery.mediaDetails.length);
  for (const item of gallery.mediaDetails) {
    const result = await page.generateMetadata({ params: Promise.resolve({ slug: item.slug }) });
    assert.equal(result.alternates.canonical, origin + '/media-gallery/' + item.slug);
    assert.ok(fs.existsSync(path.join(root, 'public', item.images[0].src)));
    const element = await page.default({ params: Promise.resolve({ slug: item.slug }) });
    const html = renderToStaticMarkup(element);
    assert.ok(html.includes(item.title), item.slug);
    assert.match(html, /<h1/);
    assert.ok(html.includes(item.images[0].src));
    assert.equal(html.includes('Media Item Not Found'), false);
  }
  await assert.rejects(page.generateMetadata({ params: Promise.resolve({ slug: 'missing-gallery' }) }), /NOT_FOUND/);
});

test('complete partner profiles self-canonicalize while placeholder profiles remain noindex', async () => {
  const page = load('app/partner/[slug]/page.tsx', {
    'react/jsx-runtime': require('react/jsx-runtime'),
    'next/navigation': { notFound },
    '@/components/UI/SectionContainer': { default: (props) => props.children },
    '@/lib/pageMetadata': metadata,
    '@/data/partnersData': partners,
  });
  assert.equal(page.dynamicParams, false);
  for (const partner of Object.values(partners.partnersData).flat()) {
    const result = await page.generateMetadata({ params: Promise.resolve({ slug: partner.slug }) });
    assert.equal(result.alternates.canonical, origin + '/partner/' + partner.slug);
    assert.equal(result.robots.index, partners.isIndexablePartner(partner));
  }
  assert.ok(partners.getIndexablePartners().length > 0);
  assert.equal(partners.isIndexablePartner({ name: '', description: 'Description', logo: '/logo.png' }), false);
  assert.equal(partners.isIndexablePartner({ name: 'Partner', description: '', logo: '/logo.png' }), false);
  await assert.rejects(page.generateMetadata({ params: Promise.resolve({ slug: 'missing-partner' }) }), /NOT_FOUND/);
});

test('homepage article cards link to the existing articles with matching titles and legacy URLs redirect directly', async () => {
  const text = fs.readFileSync(path.join(root, 'components/ArticlesSection.tsx'), 'utf8');
  const slugs = [...text.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
  const titles = [...text.matchAll(/title: '([^']+)'/g)].map((match) => match[1]);
  assert.equal(slugs.length, 3);
  slugs.forEach((slug, index) => assert.equal(articles.getArticleBySlug(slug)?.attributes.Title, titles[index]));
  const redirects = await load('next.config.ts').default.redirects();
  const aliases = [
    ['why-is-india-die-mould-industry-accelerating-in-2026', slugs[0]],
    ['how-is-die-mould-industry-preparing-in-2026', slugs[1]],
    ['what-s-next-for-large-complex-tooling-mould-manufacturing', slugs[2]],
  ];
  for (const [oldSlug, slug] of aliases) {
    const redirect = redirects.find((item) => item.source === '/articles/' + oldSlug);
    assert.equal(redirect.destination, '/articles/' + slug);
    assert.equal(redirect.permanent, true);
    assert.equal(redirects.some((item) => item.source === redirect.destination), false);
  }
});

test('the sitemap includes canonical gallery, complete partner and public company URLs without aliases or placeholders', async () => {
  const sitemap = load('app/sitemap.ts', {
    '@/lib/pageMetadata': metadata,
    '@/app/articles/data': articles,
    '@/app/sectors/data': load('app/sectors/data.ts'),
    '@/lib/publicBlogs': { fetchPublishedBlogs: async () => ({ totalPages: 0, blogs: [] }) },
    '@/lib/publicExhibitors': { fetchIndexableExhibitors: async () => [{ id: id1, company: 'Precision Tools' }] },
    '@/app/media-gallery/data': gallery,
    '@/data/partnersData': partners,
  }).default;
  const entries = await sitemap();
  const urls = Array.from(entries, (entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.includes(origin + '/exhibition-directory/' + id1));
  assert.equal(urls.includes(origin + '/exhibition-directory/precision-tools'), false);
  for (const item of gallery.mediaDetails) assert.ok(urls.includes(origin + '/media-gallery/' + item.slug));
  for (const partner of Object.values(partners.partnersData).flat())
    assert.equal(urls.includes(origin + '/partner/' + partner.slug), partners.isIndexablePartner(partner));
});
