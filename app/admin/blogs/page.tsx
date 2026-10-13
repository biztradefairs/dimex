'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { fetchAdminBlogs, deleteBlog } from '@/lib/api/blogs';
import { blogDate, blogError, type BlogList, type Blog } from '@/lib/blogs';

export default function AdminBlogsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<BlogList>({ blogs: [], total: 0, page: 1, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const [removing, setRemoving] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try { setResult(await fetchAdminBlogs({ page, search, status }, controller.signal)); }
      catch (error) { if (!controller.signal.aborted) setError(blogError(error)); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [page, search, status, revision]);

  async function remove(blog: Blog) {
    if (!window.confirm('Delete "' + blog.title + '"? This cannot be undone.')) return;
    setRemoving(blog.id);
    setError('');
    try {
      await deleteBlog(blog.id);
      setNotice('Blog deleted.');
      if (result.blogs.length === 1 && page > 1) setPage(page - 1);
      else setRevision(value => value + 1);
    } catch (error) { setError(blogError(error)); }
    finally { setRemoving(null); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-2xl font-bold text-slate-900">Blogs</h1><p className="mt-1 text-sm text-slate-600">Create, publish and manage DIEMEX blog posts.</p></div><div className="flex gap-3"><Link href="/blogs" target="_blank" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold">View blogs</Link><Link href="/admin/blogs/new" className="inline-flex items-center gap-2 rounded-lg bg-[#004A96] px-4 py-2 text-sm font-semibold text-white"><Plus size={18} />New blog</Link></div></div>
      <div className="flex flex-wrap gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <label className="flex min-w-56 flex-1 items-center gap-3 rounded-lg border border-slate-300 px-3"><Search size={18} className="text-slate-400" /><span className="sr-only">Search blogs</span><input value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} maxLength={200} placeholder="Search title or author..." className="w-full bg-transparent py-2 outline-none" /></label>
        <label className="flex items-center gap-2 text-sm font-medium">Status<select value={status} onChange={event => { setStatus(event.target.value); setPage(1); }} className="rounded-lg border border-slate-300 px-3 py-2"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option></select></label>
      </div>
      {notice && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
      {error && <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error} <button onClick={() => setRevision(value => value + 1)} className="ml-2 font-semibold underline">Retry</button></div>}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loading ? <p role="status" className="p-12 text-center text-slate-500">Loading blogs...</p> : error ? null : result.blogs.length === 0 ? <div className="p-12 text-center"><h2 className="font-semibold text-slate-900">{search || status !== 'all' ? 'No matching blogs' : 'Your first blog starts here'}</h2><p className="mt-2 text-sm text-slate-500">{search || status !== 'all' ? 'Try another search or status.' : 'Create a draft, add your image and content, then publish when ready.'}</p></div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Blog</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Published</th><th className="px-5 py-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{result.blogs.map(blog => <tr key={blog.id}>
          <td className="max-w-md px-5 py-4"><Link href={'/admin/blogs/' + blog.id + '/edit'} className="font-semibold text-slate-900 hover:text-[#004A96]">{blog.title}</Link><p className="mt-1 text-xs text-slate-500">{blog.author} · {blog.category}</p><p className="mt-1 truncate text-xs text-slate-400">/blogs/{blog.slug}</p></td>
          <td className="px-5 py-4"><span className={blog.status === 'published' ? 'rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700' : 'rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700'}>{blog.status === 'published' ? 'Published' : 'Draft'}</span></td>
          <td className="whitespace-nowrap px-5 py-4 text-slate-500">{blogDate(blog.publishedAt) || 'Not published'}</td>
          <td className="px-5 py-4"><div className="flex items-center gap-2"><Link href={'/admin/blogs/' + blog.id + '/edit'} aria-label={'Edit ' + blog.title} className="rounded p-2 text-[#004A96] hover:bg-blue-50"><Pencil size={17} /></Link>{blog.status === 'published' && <Link href={'/blogs/' + blog.slug} target="_blank" aria-label={'View ' + blog.title} className="rounded p-2 text-slate-600 hover:bg-slate-50"><ExternalLink size={17} /></Link>}<button disabled={removing !== null} onClick={() => remove(blog)} aria-label={'Delete ' + blog.title} className="rounded p-2 text-red-600 hover:bg-red-50 disabled:opacity-40"><Trash2 size={17} /></button></div></td>
        </tr>)}</tbody></table></div>}
        {!loading && !error && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 text-sm"><p className="text-slate-500">{result.total} blog{result.total === 1 ? '' : 's'} · Page {page} of {Math.max(1, result.totalPages)}</p><div className="flex gap-2"><button disabled={page === 1} onClick={() => setPage(value => value - 1)} className="rounded border px-3 py-1.5 disabled:opacity-40">Previous</button><button disabled={page >= result.totalPages} onClick={() => setPage(value => value + 1)} className="rounded border px-3 py-1.5 disabled:opacity-40">Next</button></div></div>}
      </div>
    </div>
  );
}
