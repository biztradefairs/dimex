import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays } from 'lucide-react';
import SectionContainer from '@/components/UI/SectionContainer';
import { blogDate, type Blog } from '@/lib/blogs';
import { fetchPublishedBlogs } from '@/lib/publicBlogs';
import BlogCover from './BlogCover';

const gridClassName = 'grid auto-rows-fr items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3';

function BlogPreviewLoading() {
  return (
    <div aria-busy="true" aria-label="Loading latest blogs" className={gridClassName}>
      <p role="status" className="sr-only">Loading the latest DIEMEX blogs.</p>
      {[0, 1, 2].map((index) => (
        <div key={index} aria-hidden="true" className="overflow-hidden rounded-2xl border border-[#004A96]/15 bg-white motion-safe:animate-pulse">
          <div className="aspect-video bg-[#E5EDF7]" />
          <div className="space-y-4 p-5 sm:p-6">
            <div className="h-3 w-36 rounded bg-[#E5EDF7]" />
            <div className="h-5 w-full rounded bg-[#E5EDF7]" />
            <div className="h-5 w-4/5 rounded bg-[#E5EDF7]" />
            <div className="pt-2"><div className="h-3 w-28 rounded bg-[#E5EDF7]" /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function LatestBlogCards() {
  let blogs: Blog[];

  try {
    const result = await fetchPublishedBlogs(1);
    blogs = result.blogs.slice(0, 3);
  } catch (error) {
    console.error('Unable to load the homepage blog preview.', error);
    return <p role="status" className="rounded-2xl border border-[#004A96]/10 bg-white px-6 py-12 text-center text-[#526174]">The latest blogs are temporarily unavailable. Please check back shortly.</p>;
  }

  if (blogs.length === 0) {
    return <p className="rounded-2xl border border-[#004A96]/10 bg-white px-6 py-12 text-center text-[#526174]">New stories are on the way. Explore all DIEMEX blogs for industry insights and updates.</p>;
  }

  return (
    <div className={gridClassName}>
      {blogs.map((blog) => {
        const publishedAt = blog.publishedAt || blog.createdAt;

        return (
          <article key={blog.id} className="h-full min-w-0">
            <Link
              href={'/blogs/' + blog.slug}
              aria-label={'Read ' + blog.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#004A96]/15 bg-white shadow-[0_4px_24px_rgba(19,45,73,0.03)] transition-[border-color,box-shadow,translate] duration-300 hover:border-[#004A96]/40 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004A96] motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
            >
              <div className="aspect-video overflow-hidden">
                <div className="h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105">
                  <BlogCover image={blog.image} title={blog.title} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="mb-3 flex items-center gap-2 text-xs font-medium leading-relaxed text-[#004A96]">
                  <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  <span>Posted on <time dateTime={publishedAt}>{blogDate(publishedAt)}</time></span>
                </p>
                <h3 className="line-clamp-3 text-lg font-semibold leading-snug tracking-[-0.015em] text-[#132D49] transition-colors group-hover:text-[#004A96] motion-reduce:transition-none sm:text-xl">
                  {blog.title}
                </h3>
                <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                  <p className="text-sm leading-relaxed text-[#526174]">By {blog.author}</p>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-[#004A96] transition-colors group-hover:text-[#E0161D] motion-reduce:transition-none" />
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export default function LatestBlogsSection() {
  return (
    <section id="latest-blogs" aria-labelledby="latest-blogs-heading" className="bg-[#F4F7FB] py-16 font-parabolica sm:py-20 lg:py-24">
      <SectionContainer>
        <div className="mb-9 text-center sm:mb-10 lg:mb-12">
          <p className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#526174] sm:text-sm">
            <span aria-hidden="true" className="h-0.5 w-7 bg-[#E0161D]" />
            Industry insights
            <span aria-hidden="true" className="h-0.5 w-7 bg-[#E0161D]" />
          </p>
          <h2 id="latest-blogs-heading" className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#132D49] sm:text-4xl lg:text-5xl">
            Latest DIEMEX <span className="text-[#004A96]">Blogs</span>
          </h2>
        </div>

        <Suspense fallback={<BlogPreviewLoading />}>
          <LatestBlogCards />
        </Suspense>

        <div className="mt-9 text-center sm:mt-10">
          <Link href="/blogs" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#004A96] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#E0161D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004A96] motion-reduce:transition-none">
            View All Blogs
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}
