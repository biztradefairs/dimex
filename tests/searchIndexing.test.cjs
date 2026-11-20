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
const gallery = load('app/media-gallery/data.ts');
const partners = load('data/partnersData.ts');
const config = load('next.config.ts').default;
const source = 'https://www.diemex.in';
const canon = (entry) => String(entry.alternates.canonical);
function sitemap(fetchPublishedBlogs) {
  return load('app/sitemap.ts', {
    'next/server': { connection: async () => {} },
    '@/lib/pageMetadata': metadata,
    '@/app/articles/data': articles,
    '@/app/sectors/data': sectors,
    '@/lib/publicBlogs': { fetchPublishedBlogs },
    '@/lib/publicExhibitors': { fetchIndexableExhibitors: async () => [] },
    '@/app/media-gallery/data': gallery,
    '@/data/partnersData': partners,
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
  for (const route of ['/register', '/conference-programme', '/exhibition-directory', '/exhibit-2027', '/blogs/first-post', '/blogs/second-post', '/passes', '/culture', '/iconic-landmarks', '/places-to-eat', '/shop-and-stroll', '/explore-pune', '/terms-of-visiting', '/partners-and-sponsors', '/termstouse', '/cookies-policy'])
    assert.ok(urls.includes(source + route), route);
  for (const slug of articles.getAllArticleSlugs()) assert.ok(urls.includes(source + '/articles/' + slug));
  for (const sector of sectors.diemexSectors) assert.ok(urls.includes(source + '/sectors/' + sector.slug));
  for (const url of urls) {
    const parsed = new URL(url);
    assert.equal(parsed.origin, source);
    assert.equal(parsed.search, '');
    assert.equal(parsed.hash, '');
    assert.doesNotMatch(url, /\[|\]|\s|unpublished|\.woff|favicon|_next|\/admin|\/dashboard|\/passes\/|about-skladtech|\/scanner|thank-you|draft=true/);
  }
  assert.equal(entries.find((entry) => entry.url.endsWith('/first-post')).lastModified.toISOString(), '2026-10-20T10:00:00.000Z');
  assert.equal(Object.hasOwn(entries.find((entry) => entry.url.endsWith('/second-post')), 'lastModified'), false);
  const redirects = await config.redirects();
  for (const redirect of redirects.filter((entry) => !entry.has)) assert.equal(urls.includes(source + redirect.source), false);
  for (const url of urls.filter((url) => !url.includes('/blogs/') && !url.includes('/articles/') && !url.includes('/sectors/') && !url.includes('/media-gallery/') && !url.includes('/partner/') && !url.includes('/exhibition-directory/'))) {
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
  for (const slug of ['article-that-does-not-exist', 'missing-industry-news'])
    await assert.rejects(page.generateMetadata({ params: Promise.resolve({ slug }) }), /NOT_FOUND/);
});

test('legacy redirects resolve directly, with temporary visitor redirects to passes', async () => {
  const redirects = await config.redirects();
  const paths = new Set(redirects.filter((entry) => !entry.has).map((entry) => entry.source));
  assert.equal(new Set(redirects.map((entry) => entry.source)).size, redirects.length);
  for (const redirect of redirects) {
    const isVisitorRedirect = Boolean(redirect.has) || ['/visitor-registration', '/visitors/visitor-registration'].includes(redirect.source);
    assert.equal(redirect.permanent, !isVisitorRedirect);
    if (isVisitorRedirect) assert.equal(redirect.destination, '/passes');
    const target = new URL(redirect.destination, source);
    assert.equal(paths.has(target.pathname), false);
    if (target.pathname.startsWith('/articles/'))
      assert.ok(articles.getArticleBySlug(target.pathname.slice('/articles/'.length)));
    else if (target.pathname.startsWith('/images/'))
      assert.ok(fs.statSync(path.join(root, 'public', target.pathname.slice(1))).isFile(), redirect.destination);
    else assert.ok(fs.existsSync(path.join(root, 'app', target.pathname, 'page.tsx')), redirect.destination);
  }
  assert.equal(redirects.find((entry) => entry.source === '/event-brochure').destination, '/register?t=brochure');
  assert.equal(redirects.find((entry) => entry.source === '/index.php').destination, '/');
  for (const route of ['/buyer-seller-meet/domestic-buyer-seller-meet', '/buyer-seller-meet/international-buyer-seller-meet', '/&'])
    assert.equal(paths.has(route), false);
});

test('robots advertises the generated sitemap, and private routes retain explicit noindex headers', async () => {
  const robots = load('app/robots.ts', { '@/lib/pageMetadata': metadata }).default();
  assert.equal(robots.sitemap, source + '/sitemap.xml');
  assert.equal(robots.rules.allow, '/');
  for (const route of ['/admin', '/dashboard', '/api/'])
    assert.ok(robots.rules.disallow.includes(route));
  for (const route of ['/passes', '/scanner', '/login', '/forgot-password', '/register/thank-you'])
    assert.ok(!robots.rules.disallow.some((blocked) => route.startsWith(blocked)));
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

test('public visitor and travel pages have distinct canonicals and legacy SkladTech stays excluded', () => {
  for (const [key, route] of [
    ['visitorPass', '/passes'], ['culture', '/culture'],
    ['iconicLandmarks', '/iconic-landmarks'], ['placesToEat', '/places-to-eat'],
    ['shopAndStroll', '/shop-and-stroll'], ['explorePune', '/explore-pune'],
    ['termsOfVisiting', '/terms-of-visiting'], ['partnersAndSponsors', '/partners-and-sponsors'],
    ['termsOfUse', '/termstouse'], ['cookiesPolicy', '/cookies-policy'],
  ]) {
    assert.equal(canon(metadata.PAGE_META[key]), source + route);
    assert.notEqual(metadata.PAGE_META[key].robots?.index, false);
  }
  assert.equal(canon(metadata.PAGE_META.aboutSkladtech), source + '/about-skladtech');
  assert.equal(metadata.PAGE_META.aboutSkladtech.robots.index, false);
});

test('literal and encoded route templates get HTTP 404 while real detail URLs pass through', () => {
  const { NextRequest } = require('next/server');
  const { proxy } = load('proxy.ts', { 'next/server': require('next/server') });
  for (const route of ['articles', 'blogs', 'exhibition-directory', 'media-gallery', 'partner', 'sectors']) {
    for (const slug of ['[slug]', '%5Bslug%5D', '%5bslug%5d']) {
      const response = proxy(new NextRequest(source + '/' + route + '/' + slug));
      assert.equal(response.status, 404);
      assert.match(response.headers.get('x-robots-tag'), /noindex/);
    }
    const response = proxy(new NextRequest(source + '/' + route + '/real-detail'));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('x-middleware-next'), '1');
  }
});

test('Next routing redirects visitor variants before rendering, preserves campaigns and indexes only the passes landing page', async () => {
  const { unstable_getResponseFromNextConfig, getRedirectUrl } = require('next/experimental/testing/server');
  async function response(route) {
    return unstable_getResponseFromNextConfig({ url: source + route, nextConfig: config });
  }
  for (const tab of ['visitor', 'enquiry']) {
    const result = await response('/register?t=' + tab + '&utm_source=search&utm_campaign=diemex');
    assert.equal(result.status, 307);
    const target = new URL(getRedirectUrl(result));
    assert.equal(target.pathname, '/passes');
    assert.equal(target.searchParams.get('utm_source'), 'search');
    assert.equal(target.searchParams.get('utm_campaign'), 'diemex');
  }
  for (const tab of ['exhibitor', 'sponsor', 'brochure']) {
    assert.equal((await response('/register?t=' + tab)).status, 200);
  }
  for (const route of ['/passes', '/passes/']) {
    assert.equal((await response(route)).headers.get('x-robots-tag'), null);
  }
  for (const route of ['/passes/register', '/passes/view/sample-code', '/passes/success', '/passes/scan', '/scanner', '/register/thank-you']) {
    assert.match((await response(route)).headers.get('x-robots-tag'), /noindex/);
  }
  for (const [route, destination] of [
    ['/index.php', '/'], ['/index.html', '/'], ['/home', '/'],
    ['/media/media-partners', '/partners-and-sponsors'],
  ]) {
    const result = await response(route + '?utm_campaign=diemex');
    assert.equal(result.status, 308);
    const target = new URL(getRedirectUrl(result));
    assert.equal(target.pathname, destination);
    assert.equal(target.searchParams.get('utm_campaign'), 'diemex');
  }
});
