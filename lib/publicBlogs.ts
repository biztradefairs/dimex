import 'server-only';
import { cache } from 'react';
import { BLOGS_API_URL, type Blog, type BlogList } from './blogs';

export async function fetchPublishedBlogs(page = 1): Promise<BlogList> {
  const response = await fetch(BLOGS_API_URL + '?page=' + page + '&limit=12', {
    cache: 'no-store', signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error('Unable to load blogs.');
  const payload = await response.json();
  return payload.data;
}

export const fetchPublishedBlog = cache(async (slug: string): Promise<Blog | null> => {
  const response = await fetch(BLOGS_API_URL + '/slug/' + encodeURIComponent(slug), {
    cache: 'no-store', signal: AbortSignal.timeout(20000),
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unable to load this blog.');
  const payload = await response.json();
  return payload.data;
});
