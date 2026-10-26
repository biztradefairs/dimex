import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPublishedBlog } from '@/lib/publicBlogs';
import { blogDate } from '@/lib/blogs';
import { pageMeta, SITE_URL } from '@/lib/pageMetadata';
import BlogCover from '@/components/blogs/BlogCover';
import BlogContent from '@/components/blogs/BlogContent';
import {
  BATTERY_HOUSING_BLOG_STRUCTURED_DATA,
  CONFORMAL_COOLING_AND_3D_PRINTING,
  HOW_TO_CHOOSE_RIGHT_DIE,
} from '@/lib/structuredData';

const SPECIFIC_BLOG_SCHEMAS: Record<string, unknown> = {
  'battery-housing-and-enclosure-manufacturing-tooling-challenges':
    BATTERY_HOUSING_BLOG_STRUCTURED_DATA,
  'conformal-cooling-and-3d-printed-inserts-in-mould-making':
    CONFORMAL_COOLING_AND_3D_PRINTING,
  'how-to-choose-the-right-die-mould-manufacturers ':
    HOW_TO_CHOOSE_RIGHT_DIE

};

type Props = { params: Promise<{ slug: string }> };

export const maxDuration = 90;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchPublishedBlog(slug);
  if (!blog) return { title: 'Blog not found | DIEMEX', robots: { index: false } };
  const metadata = pageMeta(blog.metaTitle || blog.title + ' | DIEMEX', blog.metaDescription || blog.excerpt || 'Read the latest DIEMEX industry insights.', '/blogs/' + blog.slug);
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: 'article', publishedTime: blog.publishedAt || undefined, modifiedTime: blog.updatedAt, authors: [blog.author], ...(blog.image ? { images: [{ url: blog.image, alt: blog.title }] } : {}) },
    twitter: { ...metadata.twitter, ...(blog.image ? { images: [blog.image] } : {}) },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = await fetchPublishedBlog(slug);
  if (!blog) notFound();
  const structuredData = SPECIFIC_BLOG_SCHEMAS[blog.slug] || {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/blogs/${blog.slug}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/blogs/${blog.slug}`,
        },
        headline: blog.title,
        description: blog.excerpt || undefined,
        url: `${SITE_URL}/blogs/${blog.slug}`,
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt,
        author: { '@type': 'Organization', name: blog.author || 'DIEMEX Editorial Team' },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'DIEMEX',
          url: `${SITE_URL}/`,
        },
        inLanguage: 'en-IN',
        articleSection: blog.category || 'Manufacturing',
        ...(blog.image ? { image: blog.image } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/blogs/${blog.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blogs', item: `${SITE_URL}/blogs` },
          { '@type': 'ListItem', position: 3, name: blog.title, item: `${SITE_URL}/blogs/${blog.slug}` },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'DIEMEX',
        url: `${SITE_URL}/`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 font-parabolica sm:px-6 sm:py-14 lg:px-8">
      <script
        id="diemex-blog-post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <Link href="/blogs" className="mb-6 inline-block text-sm font-semibold text-[#004A96] hover:underline">← All blogs</Link>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#004A96]">{blog.category}</p>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#082856] sm:text-4xl lg:text-5xl">{blog.title}</h1>
      <p className="mb-7 mt-5 text-sm text-slate-500">By {blog.author} · <time dateTime={blog.publishedAt || undefined}>{blogDate(blog.publishedAt)}</time></p>
      <div className="mb-8 overflow-hidden rounded-lg"><BlogCover image={blog.image} title={blog.title} priority /></div>
      {blog.excerpt && <p className="mb-7 text-lg font-semibold leading-8 text-[#082856]">{blog.excerpt}</p>}
      <BlogContent content={blog.content} />
      <div className="mt-12 border-t border-slate-200 pt-6"><Link href="/blogs" className="font-semibold text-[#004A96] hover:underline">Explore more DIEMEX blogs →</Link></div>
    </article>
  );
}
