export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string | null;
  status: 'draft' | 'published';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  metaTitle: string;
  metaDescription: string;
};

export type BlogInput = Pick<Blog, 'title' | 'slug' | 'excerpt' | 'content' | 'author' | 'category' | 'image' | 'status' | 'metaTitle' | 'metaDescription'>;
export type BlogList = { blogs: Blog[]; total: number; page: number; totalPages: number };

const backend = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com').replace(/\/+$/, '').replace(/\/api$/, '');
export const BLOGS_API_URL = backend + '/api/blogs';

export function blogDate(value: string | null) {
  return value ? new Intl.DateTimeFormat('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  }).format(new Date(value)) : '';
}

export function blogSlug(title: string) {
  return title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function blogError(error: unknown) {
  const candidate = error as { response?: { data?: { error?: string } }; message?: string };
  return candidate?.response?.data?.error || candidate?.message || 'Something went wrong. Please try again.';
}
