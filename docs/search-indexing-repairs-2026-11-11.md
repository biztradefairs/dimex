# DIEMEX indexing repairs - 11 November 2026

Changes in this report are local until deployed. Search Console reports describe past crawls, not necessarily the current responses.

## Confirmed by live checks before these changes

- /index.html returns 308 to / and the destination returns 200.
- https://diemex.in/home redirects through www to / and returns 200; no loop was observed.
- The five reported old article URLs and the SkladTech 2026 article have existing redirects to real, self-canonical articles. Current article content was preserved.
- /exhibition-directory/40b7fb60-8ef4-4c58-a75b-ed0340e98796 returns 200 with its own canonical and the Goel Carbon heading.
- /sitemap.xml returns 200 with 90 canonical URLs, with no literal [slug] entries.
- /culture, /about-skladtech, /partners-and-sponsors and /terms-of-visiting return 200 but incorrectly inherit the homepage canonical.
- /passes is a public visitor-registration landing page but has a noindex header, a homepage canonical and a robots.txt block.
- Literal /articles/[slug] and /exhibition-directory/[slug] return HTTP 200 with noindex (streamed not-found responses).
- Both /index.php host variants end at a Vercel 403 with X-Vercel-Mitigated: deny. The block occurs before application routing.

## Repairs

- Give Pune travel pages, visitor terms, partners/sponsors, legal policies and the visitor-pass landing page their own metadata/canonicals; include those public pages in the sitemap.
- Keep the legacy SkladTech page accessible with its own canonical and noindex because its content describes a different exhibition. Omit it from the sitemap.
- Allow /passes to be crawled and indexed. Keep registration, issued-pass, success and scan URLs below /passes/ excluded with noindex response headers.
- Allow Google to crawl public utility pages with noindex so the directive can be read; retain robots blocks for admin/dashboard/API paths.
- Handle visitor/enquiry query variants of /register with a real temporary redirect to /passes before rendering. Preserve campaign parameters and other registration tabs.
- Return HTTP 404 plus noindex for literal or percent-encoded route-template URLs before page rendering starts.
- Redirect the old media-partners URL to the existing partners-and-sponsors listing.
- Add a homepage redirect for /index.php if the request reaches the application. This does not override the Vercel firewall.

## Validation

- Production build passed, including TypeScript and generation of 161 routes.
- 52 tests passed across search indexing, detail indexing, public blogs, exhibitor enquiries and registration submission.
- 39 HTTP checks passed against the built app on localhost: public self-canonicals, indexable /passes, utility-page noindex, plain/encoded placeholder 404s, visitor redirects, legacy redirects and genuine removed-page 404s. The served robots.txt was also verified.
- The actual sitemap generator was run with public production backend data (cache and request-context wrappers bypassed for this check). It produced 100 unique URLs: the previous 90 plus ten public pages, including 32 published company profiles and seven published blogs. Placeholder paths, private pass flows and the SkladTech page were excluded. This is source-level generation verification, not a claim that the live sitemap has changed.
- Lint passed for the new SEO/routing code and page wrappers. The legal pages have 27 pre-existing react/no-unescaped-entities errors (19 terms-of-use, eight cookies-policy); comparison with Git HEAD confirmed the same diagnostics before and after these metadata-only edits.
- The build logged a non-fatal blog-cache revalidation error because the local environment points at http://localhost:5000, whose blog API returned 404. Environment files were left unchanged. Sitemap generation was therefore checked separately with the published backend; deployment must use the working production API configuration.
- The temporary localhost server was stopped. No commit, push, deployment or Search Console request was made.

## Reports that should remain excluded

- Page with redirect: old entry URLs and HTTP/non-www aliases should redirect. Inspect/index their canonical destinations.
- Alternative page with proper canonical: exhibitor, sponsor and brochure query variants share /register; visitor variants redirect to /passes.
- Fonts and favicon are resources, not HTML pages that need indexing.
- Scanner, account/admin pages, pass registration/results and incomplete partner records intentionally retain noindex.
- Malformed URLs and removed pages without equivalent content should return 404, rather than redirecting indiscriminately to the homepage.

The reported legacy /exhibitors/exhibitor-profile, /conference/sponsors,
/buyer-seller-meet/domestic-buyer-seller-meet, /media-coverage/print,
/about-diemex-expo/message-from-organizer (both hosts) and /& have no verified
equivalent content. Their 404s are retained. Other listed legacy paths already
have redirects to current pages.

## Hosting and Search Console follow-up

1. Deploy this repository and verify the changed URLs, canonicals, robots rules, placeholder 404s and /sitemap.xml.
2. Inspect the Vercel firewall/security rule denying /index.php. If this historical homepage URL should redirect, permit only the specific path so the application's permanent redirect can run. Keep other PHP probes blocked.
3. Submit https://www.diemex.in/sitemap.xml in Search Console and inspect the public canonical URLs using Test Live URL, then Request Indexing.
4. Start or repeat validation for confirmed repaired issues after the deployment. Expected redirect, canonical, noindex and true 404 exclusions can remain in the report.
5. The earlier audit recorded Search Console API accessNotConfigured/403. No Search Console change or indexing request has been made in this task.

Google controls recrawling and indexing; a correct sitemap and eligible page do not guarantee inclusion.
References:
- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://support.google.com/webmasters/answer/7440203
