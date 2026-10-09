import Link from 'next/link';
import BlogCard from '@/components/blogs/BlogCard';
import { fetchPublishedBlogs } from '@/lib/publicBlogs';
import { pageMeta } from '@/lib/pageMetadata';

export const metadata = pageMeta('DIEMEX Blogs | Die & Mould Industry News and Insights', 'Read the latest DIEMEX blogs on die and mould manufacturing, precision tooling and exhibition news.', '/blogs');

export default async function BlogsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const requested = Number(params.page);
  const page = Number.isSafeInteger(requested) && requested > 0 && requested <= 100000 ? requested : 1;
  const result = await fetchPublishedBlogs(page);
  const [featured, ...remaining] = result.blogs;
  const side = remaining.slice(0, 2);
  const grid = page === 1 ? remaining.slice(2) : result.blogs;

  return (
    <section className="bg-white py-10 font-parabolica sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-7 text-3xl font-bold tracking-tight text-[#082856] sm:text-4xl">Latest DIEMEX Blogs</h1>
        {!featured ? <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-16 text-center"><h2 className="text-xl font-semibold text-[#082856]">{page > 1 ? 'No posts on this page' : 'New stories are on the way'}</h2><p className="mt-3 text-slate-600">Explore DIEMEX event information while you wait for our latest updates.</p><Link href={page > 1 ? '/blogs' : '/about-diemex'} className="mt-5 inline-block font-semibold text-[#004A96] underline">{page > 1 ? 'Back to blogs' : 'Discover DIEMEX'}</Link></div> : <>
          {page === 1 && <div className="mb-7 grid items-stretch gap-5 lg:grid-cols-3"><div className="lg:col-span-2"><BlogCard blog={featured} featured /></div>{side.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{side.map(blog => <BlogCard key={blog.id} blog={blog} />)}</div>}</div>}
          {grid.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{grid.map(blog => <BlogCard key={blog.id} blog={blog} />)}</div>}
        </>}
        {(page > 1 || result.totalPages > 1) && <nav aria-label="Blog pagination" className="mt-10 flex flex-wrap items-center justify-center gap-5">
          {page > 1 && <Link href={'/blogs?page=' + (page - 1)} className="rounded-lg border border-[#004A96] px-5 py-2 font-semibold text-[#004A96]">Previous</Link>}
          <span className="text-sm text-slate-600">Page {page} of {Math.max(page, result.totalPages)}</span>
          {page < result.totalPages && <Link href={'/blogs?page=' + (page + 1)} className="rounded-lg bg-[#004A96] px-5 py-2 font-semibold text-white">Next</Link>}
        </nav>}
      </div>
    </section>
  );
}
