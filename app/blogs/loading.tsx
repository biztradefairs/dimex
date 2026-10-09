export default function BlogsLoading() {
  return <section aria-label="Loading blogs" aria-busy="true" className="mx-auto max-w-7xl px-6 py-14"><div className="mb-7 h-10 w-72 animate-pulse rounded bg-slate-100" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map(key => <div key={key} className="h-80 animate-pulse rounded-lg bg-slate-100" />)}</div></section>;
}
