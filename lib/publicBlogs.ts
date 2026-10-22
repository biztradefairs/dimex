import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { BLOGS_API_URL, type Blog, type BlogList } from './blogs';
import { PublicBlogRequestError, requestPublicBlogData } from './publicBlogRequest';

function envelope(payload: unknown): unknown {
  if (!payload || typeof payload !== 'object' ||
      !('success' in payload) || payload.success !== true || !('data' in payload)) {
    throw new Error('Invalid blog response');
  }
  return payload.data;
}

function isBlog(value: unknown): value is Blog {
  return Boolean(value && typeof value === 'object' &&
    'id' in value && typeof value.id === 'string' &&
    'slug' in value && typeof value.slug === 'string' &&
    'title' in value && typeof value.title === 'string');
}

// Cache validated results, not raw HTTP responses or backend startup/error pages.
// Successful data can be served while Next.js refreshes it in the background.
export const fetchPublishedBlogs = unstable_cache(
  async (page = 1): Promise<BlogList> => requestPublicBlogData(
    BLOGS_API_URL + '?page=' + page + '&limit=12',
    (payload) => {
      const data = envelope(payload) as Partial<BlogList> | null;
      if (!data || !Array.isArray(data.blogs) || !data.blogs.every(isBlog) ||
          !Number.isSafeInteger(data.total) || Number(data.total) < 0 ||
          !Number.isSafeInteger(data.page) || Number(data.page) < 1 ||
          !Number.isSafeInteger(data.totalPages) || Number(data.totalPages) < 0) {
        throw new Error('Invalid blog list');
      }
      return data as BlogList;
    },
  ),
  ['public-blog-list-v2', BLOGS_API_URL],
  { revalidate: 60, tags: ['public-blogs'] },
);

const cachedPublishedBlog = unstable_cache(
  async (slug: string): Promise<Blog | null> => {
    try {
      return await requestPublicBlogData(
        BLOGS_API_URL + '/slug/' + encodeURIComponent(slug),
        (payload) => {
          const data = envelope(payload);
          if (!isBlog(data) || typeof data.content !== 'string') {
            throw new Error('Invalid blog');
          }
          return data;
        },
      );
    } catch (error) {
      if (error instanceof PublicBlogRequestError && error.status === 404) return null;
      throw error;
    }
  },
  ['public-blog-detail-v2', BLOGS_API_URL],
  { revalidate: 60, tags: ['public-blogs'] },
);

// Share a detail lookup between metadata generation and rendering in the same request.
export const fetchPublishedBlog = cache(cachedPublishedBlog);
