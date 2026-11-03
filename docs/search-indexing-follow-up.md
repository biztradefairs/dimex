# Search indexing follow-up

Date: 3 November 2026 (Asia/Calcutta).

The follow-up changes are saved locally and verified against a production build. They have not been committed, pushed or deployed by this task. The live sitemap still returned 51 URLs at the final check; the local sitemap now returns 59.

## Changes

- Repaired the three broken homepage article links using existing article records whose current titles match the cards exactly. Added permanent 308 redirects from the old URLs to those articles. Existing article text is preserved; no replacement text was invented.
- Added self-canonical metadata and initial server-rendered headings/content for all six gallery pages. Kept gallery images and the client lightbox.
- Added self-canonical metadata for partner profiles. Only IDEMI has a complete profile and is included in the sitemap. Eight incomplete profiles remain accessible with noindex and are omitted from the sitemap. Unknown partner slugs return 404.
- Rendered the initial company directory and published company details on the server. Company cards now contain crawlable links using stable company IDs. Existing company-name URLs remain accessible and canonicalize to the ID URL.
- Company data is projected to public display fields before serialization. Raw account metadata is not passed to client components. Only approved/active companies are eligible; backend failures throw rather than becoming cached missing profiles.
- Expanded the generated sitemap from 51 to 59 URLs: six galleries, one complete partner and one currently published company. Company and blog counts can change as published records change.

## Three repaired article URLs

| Old URL | Canonical destination |
| --- | --- |
| /articles/why-is-india-die-mould-industry-accelerating-in-2026 | /articles/the-role-of-freight-forwarders-in-managing-complex-supply-chains |
| /articles/how-is-die-mould-industry-preparing-in-2026 | /articles/why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2027 |
| /articles/what-s-next-for-large-complex-tooling-mould-manufacturing | /articles/how-are-ports-preparing-for-increased-freight-handling-demands-in-2027 |

These destinations retain legacy freight-oriented slugs, but their current article titles and content concern the corresponding tooling topics.

## Validation

- Production build passed, including TypeScript checking and generation of 161 routes.
- All five relevant test suites passed: 46 tests.
- Targeted lint and git diff whitespace checks passed.
- All 59 sitemap URLs returned 200, one matching canonical and no noindex directive.
- Initial HTML contained article/blog content, gallery headings and first images, partner/company headings, the directory company and its crawlable detail link.
- All 21 application redirects returned 308 and their destinations returned 200. Campaign query parameters survived.
- Both sitemap files parsed as XML; the old correctly named sitemap remains an index pointing to /sitemap.xml. robots.txt declared the canonical sitemap.
- All eight placeholder partner profiles returned noindex and were absent from the sitemap.
- Unknown static gallery/partner routes returned 404 with noindex. A missing dynamic company returned Next.js streamed not-found content with HTTP 200 and noindex; it is absent from the sitemap. Next.js retains HTTP 200 when notFound() occurs after streaming starts: https://nextjs.org/docs/app/api-reference/file-conventions/not-found.
- The company-name alias returned 200, initial company content and the stable company-ID canonical. Raw password/reset field names were absent from public detail HTML.

## Search Console and deployment

A read-only Search Console sites-list request using the existing configured service account returned HTTP 403 PERMISSION_DENIED, reason accessNotConfigured. The configured Google Cloud project does not currently have usable Search Console API configuration. No sitemap submission, indexing request or Cloud API configuration change was made.

After deploying the changes:

1. Confirm the live /sitemap.xml has the new gallery, partner and company URLs and that the three old article URLs redirect.
2. Submit https://www.diemex.in/sitemap.xml in Search Console.
3. Inspect canonical article, directory, company and gallery URLs using Test Live URL, then Request Indexing.
4. Validate relevant fixed issue groups. Retain redirects, canonical alternatives, private pages and deliberately missing URLs as excluded.
5. Supply the actual URL from the report's single Discovered - currently not indexed entry; its URL was omitted from the attachment and remains unaudited.

Google says recrawling can take a few days to a few weeks; indexing is not guaranteed and the coverage report can update after the live test. The live test checks the deployed version immediately. Guidance: https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl.
