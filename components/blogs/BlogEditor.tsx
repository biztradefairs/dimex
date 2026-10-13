'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchAdminBlog, saveBlog, uploadBlogImage } from '@/lib/api/blogs';
import { blogError, blogSlug, type BlogInput } from '@/lib/blogs';
import BlogContent from './BlogContent';
import BlogCover from './BlogCover';

const empty: BlogInput = { title: '', slug: '', excerpt: '', content: '', author: 'DIEMEX Team', category: 'Industry Insights', image: '', status: 'draft', metaTitle: '', metaDescription: '' };
const inputClass = 'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#004A96] focus:ring-1 focus:ring-[#004A96]';

export default function BlogEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogInput>(empty);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [preview, setPreview] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);
  const [revision, setRevision] = useState(0);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    async function load() {
      setLoading(true); setLoadError('');
      try {
        const blog = await fetchAdminBlog(id!, controller.signal);
        if (controller.signal.aborted) return;
        const { title, slug, excerpt, content, author, category, image, status, metaTitle, metaDescription } = blog;
        setForm({ title, slug, excerpt, content, author, category, image: image || '', status, metaTitle, metaDescription });
        setSlugEdited(true);
      } catch (error) { if (!controller.signal.aborted) setLoadError(blogError(error)); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }
    load();
    return () => controller.abort();
  }, [id, revision]);

  function change<K extends keyof BlogInput>(field: K, value: BlogInput[K]) {
    setForm(current => ({ ...current, [field]: value }));
  }

  function insert(before: string, after = '', placeholder = 'Your text') {
    const field = contentRef.current;
    if (!field) return;
    const start = field.selectionStart;
    const end = field.selectionEnd;
    const selected = form.content.slice(start, end) || placeholder;
    change('content', form.content.slice(0, start) + before + selected + after + form.content.slice(end));
    requestAnimationFrame(() => { field.focus(); field.setSelectionRange(start + before.length, start + before.length + selected.length); });
  }

  async function upload(file?: File) {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { setError('Choose a JPG, PNG or WebP image smaller than 5 MB.'); return; }
    setUploading(true); setError('');
    try { change('image', await uploadBlogImage(file)); }
    catch (error) { setError(blogError(error)); }
    finally { setUploading(false); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || uploading) return;
    setSaving(true); setError('');
    try {
      await saveBlog({ ...form, slug: form.slug || blogSlug(form.title) }, id);
      router.push('/admin/blogs');
      router.refresh();
    } catch (error) { setError(blogError(error)); setSaving(false); }
  }

  if (loading) return <p role="status" className="py-16 text-center text-slate-500">Loading blog...</p>;
  if (loadError) return <div role="alert" className="rounded-lg bg-red-50 p-6 text-red-700">{loadError}<button onClick={() => setRevision(value => value + 1)} className="ml-3 underline">Retry</button><Link href="/admin/blogs" className="ml-3 underline">Back to blogs</Link></div>;

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4"><div><Link href="/admin/blogs" className="text-sm font-medium text-[#004A96] hover:underline">← Blogs</Link><h1 className="mt-2 text-2xl font-bold text-slate-900">{id ? 'Edit blog' : 'Create a blog'}</h1></div><div className="flex gap-3"><button type="button" onClick={() => setPreview(value => !value)} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">{preview ? 'Continue editing' : 'Preview'}</button><button disabled={saving || uploading} className="rounded-lg bg-[#004A96] px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">{saving ? 'Saving...' : form.status === 'published' ? 'Publish blog' : 'Save draft'}</button></div></div>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <fieldset disabled={saving} className="min-w-0 space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <label className="block text-sm font-semibold">Title<input required maxLength={255} value={form.title} onChange={event => { const title = event.target.value; setForm(current => ({ ...current, title, slug: slugEdited ? current.slug : blogSlug(title) })); }} className={inputClass} placeholder="Give your blog a clear headline" /></label>
          <label className="block text-sm font-semibold">URL slug<input required maxLength={255} pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={event => { setSlugEdited(true); change('slug', event.target.value); }} className={inputClass} /><span className="mt-1 block break-all text-xs font-normal text-slate-500">/blogs/{form.slug || 'your-blog-title'}</span></label>
          <label className="block text-sm font-semibold">Short introduction<textarea value={form.excerpt} onChange={event => change('excerpt', event.target.value)} rows={3} maxLength={500} className={inputClass} placeholder="A brief summary for the blog listing and article introduction" /></label>
          <div><label htmlFor="blog-content" className="text-sm font-semibold">Blog content</label><div className="mt-2 flex flex-wrap gap-2 rounded-t-lg border border-b-0 border-slate-300 bg-slate-50 p-2">{[
            { label: 'Heading', before: '\n## ', after: '\n' },
            { label: 'Bold', before: '**', after: '**' },
            { label: 'Italic', before: '*', after: '*' },
            { label: 'List', before: '\n- ', after: '\n' },
            { label: 'Quote', before: '\n> ', after: '\n' },
            { label: 'Link', before: '[', after: '](https://example.com)' },
          ].map(tool => <button key={tool.label} type="button" onClick={() => { setPreview(false); insert(tool.before, tool.after); }} className="rounded border border-slate-200 bg-white px-3 py-1 text-xs font-medium hover:bg-blue-50">{tool.label}</button>)}</div>
          <textarea ref={contentRef} id="blog-content" required maxLength={200000} rows={18} value={form.content} onChange={event => change('content', event.target.value)} className="w-full rounded-b-lg border border-slate-300 px-4 py-3 font-mono text-sm leading-6 outline-none focus:border-[#004A96]" placeholder="Write your story. Use ## for headings, **bold**, - for lists and [link text](https://url)." />
          <p className="mt-2 text-xs text-slate-500">Supports paragraphs, headings, bold, italic, lists, quotes and links. Use Preview to review the formatted result.</p></div>
        </fieldset>
        <fieldset disabled={saving} className="space-y-5 self-start rounded-xl border border-slate-200 bg-white p-5">
          <label className="block text-sm font-semibold">Status<select value={form.status} onChange={event => change('status', event.target.value as BlogInput['status'])} className={inputClass}><option value="draft">Draft</option><option value="published">Published</option></select><span className="mt-2 block text-xs font-normal text-slate-500">{form.status === 'draft' ? 'Drafts are visible only in admin.' : 'Saving publishes this post on the website.'}</span></label>
          <label className="block text-sm font-semibold">Author<input required maxLength={120} value={form.author} onChange={event => change('author', event.target.value)} className={inputClass} /></label>
          <label className="block text-sm font-semibold">Category<input required maxLength={80} value={form.category} onChange={event => change('category', event.target.value)} className={inputClass} /></label>
          <div className="space-y-3"><p className="text-sm font-semibold">Cover image</p>{form.image && <div className="overflow-hidden rounded-lg"><BlogCover image={form.image} title={form.title || 'Blog cover'} /></div>}<label className="block text-sm"><span className="sr-only">Upload cover image</span><input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={event => { upload(event.target.files?.[0]); event.target.value = ''; }} className="block w-full text-xs file:mr-2 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-semibold file:text-[#004A96]" /></label><p role="status" className="text-xs text-slate-500">{uploading ? 'Uploading image...' : 'JPG, PNG or WebP. Maximum 5 MB.'}</p><label className="block text-xs text-slate-500">Or paste an image URL<input type="url" maxLength={2048} value={form.image || ''} onChange={event => change('image', event.target.value)} className={inputClass} placeholder="https://..." disabled={uploading} /></label>{form.image && <button type="button" disabled={uploading} onClick={() => change('image', '')} className="text-xs font-medium text-red-600">Remove image</button>}</div>
          <details className="border-t border-slate-100 pt-4"><summary className="cursor-pointer text-sm font-semibold">Search engine details</summary><div className="mt-4 space-y-4"><label className="block text-xs">Meta title<input maxLength={255} value={form.metaTitle} onChange={event => change('metaTitle', event.target.value)} className={inputClass} placeholder="Defaults to the blog title" /></label><label className="block text-xs">Meta description<textarea maxLength={320} rows={4} value={form.metaDescription} onChange={event => change('metaDescription', event.target.value)} className={inputClass} placeholder="Defaults to the short introduction" /></label></div></details>
        </fieldset>
      </div>
      {preview && <section aria-label="Blog preview" className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-6 sm:p-10"><p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Preview · {form.status}</p><h2 className="text-3xl font-bold leading-tight text-[#082856]">{form.title || 'Your blog title'}</h2><p className="mb-6 mt-4 text-sm text-slate-500">By {form.author}</p><div className="mb-7 overflow-hidden rounded-lg"><BlogCover image={form.image} title={form.title || 'Blog cover'} /></div>{form.excerpt && <p className="mb-6 font-semibold leading-7 text-[#082856]">{form.excerpt}</p>}<BlogContent content={form.content || 'Your formatted blog content will appear here.'} /></section>}
    </form>
  );
}
