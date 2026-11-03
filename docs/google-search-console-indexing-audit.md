# DIEMEX Search Console indexing audit

Date: 3 November 2026 (Asia/Calcutta).

Changes are saved locally in the dimex repository. Nothing was deployed, and no Google Search Console submission or indexing request was made.

All 42 exact issue URLs supplied in the report were audited. The report mentions 43 entries, but its discovered-not-indexed URL was not supplied. Live production responses were checked before changes. Local results below refer to the final optimized Next.js production build served temporarily on port 3107; that server was stopped after verification.

## Changes implemented

- Deleted `public/diemex-sitemap .xml`.
- Added `app/sitemap.ts` for `/sitemap.xml` with 51 verified canonical URLs: 22 landing/listing pages, 9 articles, 13 DIEMEX sector pages and 7 published blogs. Blog pagination is automatic; drafts and malformed slugs are excluded.
- Retained `public/diemex-sitemap.xml` as a valid sitemap index pointing to the generated sitemap. Removed literal [slug] entries, query duplicates, redirecting URLs, static assets and scanner/pass flows from page discovery.
- Added `app/robots.ts` and the canonical sitemap declaration. Added noindex response headers for admin/account/API/scanner/pass/thank-you routes.
- Corrected the directory, conference programme, conference and privacy-policy canonicals. Registration/brochure variants share /register while preserving form selection.
- Isolated campaign tracking in `components/AppShell.tsx`. Its query-dependent hook previously caused the entire shared page body to fall back to client rendering. Article and blog content now appears in initial HTML. Query-driven pages retain a separate loading boundary and shared-layout visibility is unchanged.
- Added 18 permanent redirects, including three matching 2026-to-2027 article migrations. Unknown article slugs now return real 404 responses with noindex instead of 200 pages titled Article Not Found.
- No existing article text, registration fields, submission logic or exhibition content was replaced. No missing article content was invented.

Google recommends canonical sitemap URLs and treats sitemap submission as a hint, not a guarantee of crawling or indexing. [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Implementation follows [Next.js sitemap routes](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) and [permanent redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects).

## URL-by-URL audit

Live status includes existing HTTP/non-www hops. Added redirects and metadata changes await deployment. Production host redirects were verified and retained under the existing hosting configuration. Eligible means technically eligible after deployment, not confirmed indexed by Google.

| Original URL | Live status before changes | Reported issue | Action taken | Target URL | Indexable after fix | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| `http://diemex.in/` | 308 -> 308 -> 200 | Page with redirect – 5 URLs | Retained existing HTTP/host redirects. | `https://www.diemex.in/` | Source excluded; homepage eligible | Redirects verified live; canonical homepage local 200. |
| `https://diemex.in/` | 308 -> 200 | Page with redirect – 5 URLs | Retained existing HTTP/host redirects. | `https://www.diemex.in/` | Source excluded; homepage eligible | Redirects verified live; canonical homepage local 200. |
| `http://www.diemex.in/` | 308 -> 200 | Page with redirect – 5 URLs | Retained existing HTTP/host redirects. | `https://www.diemex.in/` | Source excluded; homepage eligible | Redirects verified live; canonical homepage local 200. |
| `https://diemex.in/index` | 308 -> 200 | Page with redirect – 5 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/event-brochure` | 200 | Page with redirect – 5 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/register?t=brochure` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026` | 200 (Article Not Found) | Excluded by noindex – 4 URLs | Permanent redirect to matching current 2027 article. | `https://www.diemex.in/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2027` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/articles/how-is-die-mould-industry-preparing-in-2026` | 200 (Article Not Found) | Excluded by noindex – 4 URLs | Content missing; return real 404. Restore actual content before indexing. | - | No | Local 404 with noindex. |
| `https://www.diemex.in/articles/why-is-india-die-mould-industry-accelerating-in-2026` | 200 (Article Not Found) | Excluded by noindex – 4 URLs | Content missing; return real 404. Restore actual content before indexing. | - | No | Local 404 with noindex. |
| `https://www.diemex.in/articles/what-s-next-for-large-complex-tooling-mould-manufacturing` | 200 (Article Not Found) | Excluded by noindex – 4 URLs | Content missing; return real 404. Restore actual content before indexing. | - | No | Local 404 with noindex. |
| `https://www.diemex.in/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2026` | 200 (Article Not Found) | Alternative page with proper canonical – 3 URLs | Permanent redirect to matching current 2027 article. | `https://www.diemex.in/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2027` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/register?t=visitor` | 200 | Alternative page with proper canonical – 3 URLs | Preserved form selection; canonicalized query variants to /register. | `https://www.diemex.in/register` | Variant excluded; /register eligible | All four tabs: 200 and shared canonical. |
| `https://www.diemex.in/articles/happy-new-year-and-merry-christmas` | 200 | Alternative page with proper canonical – 3 URLs | Retained self-canonical; added current article to sitemap. | `https://www.diemex.in/articles/happy-new-year-and-merry-christmas` | Eligible after deployment | Local 200, matching canonical, no noindex. Article body present in initial HTML. |
| `https://www.diemex.in/index.php` | 403 | Blocked due to access forbidden (403) – 2 URLs | Retained production restriction; no PHP route enabled. | - | No | Live final 403; local path 404. |
| `https://diemex.in/index.php` | 308 -> 403 | Blocked due to access forbidden (403) – 2 URLs | Retained production restriction; no PHP route enabled. | - | No | Live final 403; local path 404. |
| `https://www.diemex.in/exhibition-directory` | 200 | Crawled – currently not indexed – 7 URLs | Corrected self-canonical; added page to sitemap. | `https://www.diemex.in/exhibition-directory` | Eligible after deployment | Local 200, matching canonical, no noindex. |
| `https://www.diemex.in/conference-programme` | 200 | Crawled – currently not indexed – 7 URLs | Corrected self-canonical; added page to sitemap. | `https://www.diemex.in/conference-programme` | Eligible after deployment | Local 200, matching canonical, no noindex. |
| `https://www.diemex.in/_next/static/media/Parabolica_Medium-s.p.9f2fff98.woff2` | 200 | Crawled – currently not indexed – 7 URLs | Kept asset accessible; excluded from page sitemap. | `https://www.diemex.in/_next/static/media/Parabolica_Medium-s.p.9f2fff98.woff2` | Asset; no page indexing needed | Live/local 200; font/image content type. |
| `https://www.diemex.in/_next/static/media/Parabolica_Regular-s.p.4fd138f3.woff` | 200 | Crawled – currently not indexed – 7 URLs | Kept asset accessible; excluded from page sitemap. | `https://www.diemex.in/_next/static/media/Parabolica_Regular-s.p.4fd138f3.woff` | Asset; no page indexing needed | Live/local 200; font/image content type. |
| `https://www.diemex.in/favicon.ico?favicon.6edaf72f.ico` | 200 | Crawled – currently not indexed – 7 URLs | Kept asset accessible; excluded from page sitemap. | `https://www.diemex.in/favicon.ico?favicon.6edaf72f.ico` | Asset; no page indexing needed | Live/local 200; font/image content type. |
| `https://www.diemex.in/articles/sklad-tech-2026-participants-and-sections` | 200 (Article Not Found) | Crawled – currently not indexed – 7 URLs | Permanent redirect to matching current 2027 article. | `https://www.diemex.in/articles/sklad-tech-2027-participants-and-sections` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/articles/the-role-of-freight-forwarders-in-managing-complex-supply-chains` | 200 | Crawled – currently not indexed – 7 URLs | Retained self-canonical; added current article to sitemap. | `https://www.diemex.in/articles/the-role-of-freight-forwarders-in-managing-complex-supply-chains` | Eligible after deployment | Local 200, matching canonical, no noindex. Article body present in initial HTML. |
| `https://www.diemex.in/register?t=exhibitor` | 200 | Duplicate – Google chose different canonical – 1 URL | Preserved form selection; canonicalized query variants to /register. | `https://www.diemex.in/register` | Variant excluded; /register eligible | All four tabs: 200 and shared canonical. |
| `https://diemex.in/home` | 308 -> 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/index.html` | 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/home` | 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/visitors/visitor-registration` | 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/register?t=visitor` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://diemex.in/exhibitors/exhibitor-profile` | 308 -> 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://diemex.in/about-diemex-expo/diemex-expo` | 308 -> 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/about-diemex` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://diemex.in/conference/sponsors` | 308 -> 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://diemex.in/visitors/visitor-registration` | 308 -> 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/register?t=visitor` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/&` | 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://www.diemex.in/buyer-seller-meet/domestic-buyer-seller-meet` | 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://www.diemex.in/policies/privacy-policy` | 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/privacy-policy` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/about-diemex-expo/message-from-organizer` | 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://diemex.in/media-coverage/print` | 308 -> 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://diemex.in/about-diemex-expo/message-from-organizer` | 308 -> 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://diemex.in/exhibitors/exhibitor-registration` | 308 -> 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/register?t=exhibitor` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/media/media-partners` | 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://diemex.in/pastshow` | 308 -> 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/post-show-report` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://diemex.in/buyer-seller-meet/international-buyer-seller-meet` | 308 -> 404 | Not found (404) – 20 URLs | Kept proper 404; no equivalent was invented. | - | No | Local 404 with noindex. |
| `https://www.diemex.in/about-diemex-expo/why-participate` | 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/why-exhibit` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |
| `https://www.diemex.in/visitors/opportunities` | 404 | Not found (404) – 20 URLs | Permanent redirect to verified current equivalent. | `https://www.diemex.in/why-visit` | Source excluded; canonical target eligible | Local 308; target 200 and canonical verified. |

## Permanent redirects verified

| Source | Destination | Status |
| --- | --- | --- |
| `/home` | `/` | 308 |
| `/index` | `/` | 308 |
| `/index.html` | `/` | 308 |
| `/visitors/visitor-registration` | `/register?t=visitor` | 308 |
| `/exhibitors/exhibitor-registration` | `/register?t=exhibitor` | 308 |
| `/about-diemex-expo/diemex-expo` | `/about-diemex` | 308 |
| `/about-diemex-expo/why-participate` | `/why-exhibit` | 308 |
| `/policies/privacy-policy` | `/privacy-policy` | 308 |
| `/pastshow` | `/post-show-report` | 308 |
| `/visitors/opportunities` | `/why-visit` | 308 |
| `/visitor-registration` | `/register?t=visitor` | 308 |
| `/exhibiting-enquiry` | `/register?t=exhibitor` | 308 |
| `/become-exhibitor` | `/register?t=exhibitor` | 308 |
| `/become-partner` | `/register?t=sponsor` | 308 |
| `/event-brochure` | `/register?t=brochure` | 308 |
| `/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026` | `/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2027` | 308 |
| `/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2026` | `/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2027` | 308 |
| `/articles/sklad-tech-2026-participants-and-sections` | `/articles/sklad-tech-2027-participants-and-sections` | 308 |

Campaign parameters survive redirects. Verified `/visitors/visitor-registration?utm_source=seo-check&utm_campaign=indexing` -> `/register?utm_source=seo-check&utm_campaign=indexing&t=visitor`. No application redirect points to another application redirect source. Existing platform host redirects can precede a route redirect on historical non-www URLs.

## Canonical sitemap URLs verified

- `https://www.diemex.in/`
- `https://www.diemex.in/about-diemex`
- `https://www.diemex.in/about-organizer`
- `https://www.diemex.in/articles`
- `https://www.diemex.in/articles/ev-die-casting-and-tooling-in-india-key-trends`
- `https://www.diemex.in/articles/happy-new-year-and-merry-christmas`
- `https://www.diemex.in/articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2027`
- `https://www.diemex.in/articles/how-e-commerce-logistics-is-redefining-fast-and-flexible-delivery`
- `https://www.diemex.in/articles/precision-die-mould-solutions-technologies-guide`
- `https://www.diemex.in/articles/sklad-tech-2027-participants-and-sections`
- `https://www.diemex.in/articles/the-role-of-freight-forwarders-in-managing-complex-supply-chains`
- `https://www.diemex.in/articles/tooling-mould-bases-and-standard-components`
- `https://www.diemex.in/articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2027`
- `https://www.diemex.in/blogs`
- `https://www.diemex.in/blogs/battery-housing-and-enclosure-manufacturing-tooling-challenges`
- `https://www.diemex.in/blogs/complete-guide-for-manufacturers-toolmakers-industry-professionals`
- `https://www.diemex.in/blogs/conformal-cooling-and-3d-printed-inserts-in-mould-making`
- `https://www.diemex.in/blogs/die-mould-exhibition-in-india-complete-guide-for-exhibitors-visitors`
- `https://www.diemex.in/blogs/gigacasting-ev-die-casting-what-indian-tooling-makers-need-to-know-in-2027`
- `https://www.diemex.in/blogs/how-to-choose-the-right-die-mould-manufacturers`
- `https://www.diemex.in/blogs/why-quality-standards-matter-in-die-and-mould-manufacturing`
- `https://www.diemex.in/conference`
- `https://www.diemex.in/conference-programme`
- `https://www.diemex.in/contact-us`
- `https://www.diemex.in/exhibit-2027`
- `https://www.diemex.in/exhibition-directory`
- `https://www.diemex.in/exhibitor-resource-center`
- `https://www.diemex.in/free-promo`
- `https://www.diemex.in/layout`
- `https://www.diemex.in/media-gallery`
- `https://www.diemex.in/participants`
- `https://www.diemex.in/plan-your-travel`
- `https://www.diemex.in/post-show-report`
- `https://www.diemex.in/privacy-policy`
- `https://www.diemex.in/register`
- `https://www.diemex.in/sectors`
- `https://www.diemex.in/sectors/automation-industry`
- `https://www.diemex.in/sectors/cad-cam`
- `https://www.diemex.in/sectors/cnc-machines`
- `https://www.diemex.in/sectors/die-casting`
- `https://www.diemex.in/sectors/die-mould-manufacturing`
- `https://www.diemex.in/sectors/ev-die-casting-and-tooling-in-india-key-trends`
- `https://www.diemex.in/sectors/machining-finishing`
- `https://www.diemex.in/sectors/materials-steels-alloys`
- `https://www.diemex.in/sectors/precision-moulds`
- `https://www.diemex.in/sectors/surface-treatment`
- `https://www.diemex.in/sectors/tool-steel`
- `https://www.diemex.in/sectors/tooling-mould-base`
- `https://www.diemex.in/sectors/tooling-tool-rom-technologies`
- `https://www.diemex.in/why-exhibit`
- `https://www.diemex.in/why-visit`

## Validation

- `npm.cmd run build` passed, including Next.js TypeScript checking and generation of 145 static routes.
- Indexing, public-blog, registration-submission and exhibitor-form suites: 38 tests passed, including the suspended-tracker server-rendering regression test.
- All 51 sitemap URLs return 200 with matching canonicals and no noindex meta/header. Equivalent homepage trailing-slash forms were normalized during comparison.
- Every article and published-blog detail page contains its heading and article content in initial HTML. No browser JavaScript or real form submission was used for these checks.
- All 18 redirects return 308 with expected destinations. All four registration tabs return 200 with the /register canonical.
- Both sitemap documents parse as valid XML. The removed spaced-filename URL returns 404. robots.txt returns 200 with the canonical sitemap declaration.
- Admin/login, dashboard, pass, scanner, thank-you and API sample responses carry noindex headers. Fonts/favicon remain accessible and absent from the page sitemap.
- Targeted lint passed for the new sitemap/robots files, metadata/configuration, article route and conference programme. Privacy-policy retains 9 existing unescaped-punctuation errors and AppShell retains 3 existing explicit-any errors. Comparing HEAD and edited files confirmed identical diagnostics on those unrelated lines.
- Initial standalone TypeScript checking encountered transient missing .next/dev generated files. Source-only checking passed and the final production build passed its complete TypeScript check.
- Next.js 16.1.1 logs Internal: NoFallbackError for the three deliberately missing static article slugs; their HTTP responses were verified as 404 with noindex.

## Content decisions and remaining work

These three article URLs have no matching content. They remain excluded and return 404. Restore actual article text or identify a verified replacement before adding them to the sitemap:

- `https://www.diemex.in/articles/how-is-die-mould-industry-preparing-in-2026`
- `https://www.diemex.in/articles/why-is-india-die-mould-industry-accelerating-in-2026`
- `https://www.diemex.in/articles/what-s-next-for-large-complex-tooling-mould-manufacturing`

Historical buyer/seller meeting pages, the organiser message, print coverage, exhibitor-profile page and specific sponsor/media-partner paths have no verified matching content. They remain 404. The malformed /& URL remains 404. Production /index.php remains restricted; no PHP endpoint was enabled.

Other historical/template pages and dynamic company, partner and gallery detail pages were not blindly expanded into the sitemap. Some inherit a parent/homepage canonical or require a verified content source. Review their content and metadata before adding them. The directory catalogue still loads companies through its existing client API; inspect its rendered data in Search Console after deployment.

Export the single discovered-not-indexed URL omitted from the supplied report for a separate audit. No pages were restored because missing source content was not provided. Actual Google indexing status requires the property?s Search Console data.

## Files changed

- `app/sitemap.ts`
- `app/robots.ts`
- `public/diemex-sitemap.xml`
- `public/diemex-sitemap .xml (deleted)`
- `next.config.ts`
- `lib/pageMetadata.ts`
- `app/articles/[slug]/page.tsx`
- `app/conference-programme/page.tsx`
- `app/conference/page.tsx`
- `app/privacy-policy/page.tsx`
- `components/AppShell.tsx`
- `tests/searchIndexing.test.cjs`
- `docs/google-search-console-indexing-audit.md`

## After deployment

1. Verify `https://www.diemex.in/sitemap.xml` and `https://www.diemex.in/robots.txt` on the live site.
2. Submit `https://www.diemex.in/sitemap.xml` in Search Console. Remove a spaced-filename submission if present; the correctly named old sitemap remains a working index.
3. Use URL Inspection -> Test Live URL for the directory, conference programme, updated articles and key landing pages; request indexing for their canonical URLs.
4. Validate only issue groups whose underlying URLs were corrected. Keep redirects, canonical alternatives, assets, private pages and deliberately missing URLs excluded.
