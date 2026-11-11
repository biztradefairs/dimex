import type { MetadataRoute } from 'next';
import { connection } from 'next/server';
import { getAllArticleSlugs } from '@/app/articles/data';
import { diemexSectors } from '@/app/sectors/data';
import { PAGE_META, SITE_URL } from '@/lib/pageMetadata';
import { fetchPublishedBlogs } from '@/lib/publicBlogs';
import { fetchIndexableExhibitors } from '@/lib/publicExhibitors';
import { mediaDetails } from '@/app/media-gallery/data';
import { getIndexablePartners } from '@/data/partnersData';

export const revalidate = 3600;
export const maxDuration = 90;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Backend-backed URLs are discovered at request time, never during the build.
  await connection();
  // Use the same canonical URLs as the public pages, with one entry per URL.
  const entries: MetadataRoute.Sitemap = Object.values(PAGE_META)
    .filter((metadata) => typeof metadata.robots !== 'object' || metadata.robots?.index !== false)
    .map((metadata) => metadata.alternates?.canonical)
    .filter((canonical): canonical is string => typeof canonical === 'string')
    .map((url) => ({ url }));

  entries.push({ url: SITE_URL + '/exhibit-2027' });
  for (const slug of getAllArticleSlugs()) {
    entries.push({ url: SITE_URL + '/articles/' + slug });
  }
  const sectorSlugs = new Set([
    ...diemexSectors.map((sector) => sector.slug),
    'ev-die-casting-and-tooling-in-india-key-trends',
  ]);
  for (const slug of sectorSlugs) {
    entries.push({ url: SITE_URL + '/sectors/' + slug });
  }

  for (const item of mediaDetails) {
    entries.push({ url: SITE_URL + '/media-gallery/' + item.slug });
  }
  for (const partner of getIndexablePartners()) {
    entries.push({ url: SITE_URL + '/partner/' + partner.slug });
  }
  for (const company of await fetchIndexableExhibitors()) {
    entries.push({ url: SITE_URL + '/exhibition-directory/' + company.id });
  }

  // Read every published-blog page. Cached reads retain their last successful data;
  // an uncached outage must fail rather than publish a sitemap with missing URLs.
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const result = await fetchPublishedBlogs(page);
    totalPages = result.totalPages;
    for (const blog of result.blogs) {
      if (blog.status !== 'published' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(blog.slug)) continue;
      const updatedAt = new Date(blog.updatedAt);
      entries.push({
        url: SITE_URL + '/blogs/' + blog.slug,
        ...(Number.isFinite(updatedAt.getTime()) ? { lastModified: updatedAt } : {}),
      });
    }
  }

  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}
