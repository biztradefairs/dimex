'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2, Building2, LayoutGrid, Rows3, PanelsTopLeft, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import CompanyGrid from './company-grid';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';
import { fetchExhibitionCompanies, type ExhibitionCompany } from './api';

export default function CompanyDirectory({ initialCompanies, initialTotalPages, initialTotal }: {
  initialCompanies: ExhibitionCompany[]; initialTotalPages: number; initialTotal: number;
}) {
  const router = useRouter();
  const [companies, setCompanies] = useState(initialCompanies);
  const [total, setTotal] = useState(initialTotal);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [query, setQuery] = useState({ page: 1, search: '', letter: '' });
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'gallery' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstRequest = useRef(true);
  const limit = 24;

  useEffect(() => {
    const timer = setTimeout(() => setQuery(current => current.search === search.trim()
      ? current : { ...current, page: 1, search: search.trim() }), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (firstRequest.current) { firstRequest.current = false; return; }
    let active = true;
    setLoading(true);
    setError(null);
    fetchExhibitionCompanies(query.page, limit, query.search, query.letter)
      .then(result => {
        if (!active) return;
        setCompanies(result.companies);
        setTotal(result.total);
        setTotalPages(Math.max(1, result.totalPages));
      })
      .catch(() => { if (active) setError('Unable to load exhibitors. Please try again.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query]);

  const pending = loading || search.trim() !== query.search;
  const resetFilters = () => { setSearch(''); setQuery({ page: 1, search: '', letter: '' }); };
  const start = total ? (query.page - 1) * limit + 1 : 0;
  const end = total ? Math.min(start + companies.length - 1, total) : 0;
  const firstButton = Math.max(1, Math.min(query.page - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => firstButton + i);
  const pageButton = 'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40';
  const views = [{ key: 'grid', label: 'Grid view', Icon: LayoutGrid }, { key: 'gallery', label: 'Gallery view', Icon: PanelsTopLeft }, { key: 'list', label: 'List view', Icon: Rows3 }] as const;

  return (
    <div className="bg-[#f6f8fb] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#004A96]">DIEMEX 2027 / Exhibitor directory</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet the exhibitors<span className="text-[#004A96]">.</span></h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">Discover companies, explore their products and plan the connections that matter for your business.</p>
          </div>
          <div className="flex w-fit items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/60 px-5 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#004A96] shadow-sm"><Building2 className="h-5 w-5" /></div>
            <div><p className="text-2xl font-bold leading-none text-[#004A96]">{initialTotal}</p><p className="mt-1.5 text-xs font-medium text-slate-500">Exhibiting companies</p></div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section aria-label="Find exhibitors" className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-lg">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input type="search" aria-label="Search exhibitors" placeholder="Search by company, contact or email..." value={search} onChange={event => setSearch(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 [&::-webkit-search-cancel-button]:hidden" />
              {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-800"><X className="h-4 w-4" /></button>}
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">Browse exhibitors</span>
              <div role="group" aria-label="Display options" className="flex gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
                {views.map(({ key, label, Icon }) => <button type="button" key={key} aria-label={label} title={label} aria-pressed={viewMode === key} onClick={() => setViewMode(key)} className={'rounded-lg p-2 transition ' + (viewMode === key ? 'bg-[#004A96] text-white shadow-sm' : 'text-slate-400 hover:bg-white hover:text-slate-700')}><Icon className="h-4 w-4" /></button>)}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
            <span className="shrink-0 text-xs font-medium text-slate-500">Company name</span>
            <nav aria-label="Filter by company initial" className="flex flex-wrap gap-1">
              {['', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter => <button type="button" key={letter || 'all'} aria-label={letter ? 'Companies starting with ' + letter : 'All companies'} aria-pressed={query.letter === letter} onClick={() => setQuery(current => ({ ...current, page: 1, letter }))} className={'flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold transition ' + (query.letter === letter ? 'bg-[#004A96] text-white' : 'text-slate-500 hover:bg-blue-50 hover:text-[#004A96]')}>{letter || 'All'}</button>)}
            </nav>
          </div>
        </section>

        <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-4">
          <p role="status" aria-live="polite" className="text-sm text-slate-500">{pending ? 'Finding exhibitors...' : <>Showing <span className="font-semibold text-slate-800">{start}-{end}</span> of <span className="font-semibold text-slate-800">{total}</span> active exhibitors</>}</p>
          {(query.letter || search) && <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#004A96] hover:underline"><X className="h-3.5 w-3.5" />Clear filters</button>}
        </div>

        {pending ? <div role="status" className="flex min-h-72 items-center justify-center gap-3 text-sm text-slate-500"><Loader2 className="h-5 w-5 animate-spin text-[#004A96]" />Loading exhibitors...</div>
          : error ? <div role="alert" className="rounded-2xl border border-red-100 bg-white p-12 text-center"><p className="text-sm text-red-600">{error}</p><button type="button" onClick={() => setQuery(current => ({ ...current }))} className="mt-4 text-sm font-medium text-[#004A96]">Try again</button></div>
          : companies.length ? <CompanyGrid companies={companies} viewMode={viewMode} onProductBrochureClick={id => router.push('/exhibition-directory/' + id)} />
          : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><Search className="mx-auto mb-4 h-8 w-8 text-slate-300" /><h2 className="text-lg font-semibold">No exhibitors found</h2><p className="mt-2 text-sm text-slate-500">Try another company name or clear the filters.</p><button type="button" onClick={resetFilters} className="mt-5 rounded-lg bg-[#004A96] px-5 py-2.5 text-sm font-medium text-white">Clear filters</button></div>}

        {!error && !pending && total > 0 && <nav aria-label="Directory pagination" className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 sm:flex-row">
          <p className="text-sm text-slate-500">Page <span className="font-medium text-slate-700">{query.page}</span> of {totalPages}</p>
          <div className="flex items-center gap-1.5">
            <button type="button" aria-label="Previous directory page" disabled={query.page <= 1} onClick={() => setQuery(current => ({ ...current, page: current.page - 1 }))} className={pageButton}><ChevronLeft className="h-4 w-4" /><span className="ml-1 hidden sm:inline">Previous</span></button>
            {pages.map(page => <button type="button" key={page} aria-label={'Directory page ' + page} aria-current={page === query.page ? 'page' : undefined} onClick={() => setQuery(current => ({ ...current, page }))} className={pageButton + (page === query.page ? ' !border-[#004A96] !bg-[#004A96] !text-white' : '')}>{page}</button>)}
            <button type="button" aria-label="Next directory page" disabled={query.page >= totalPages} onClick={() => setQuery(current => ({ ...current, page: current.page + 1 }))} className={pageButton}><span className="mr-1 hidden sm:inline">Next</span><ChevronRight className="h-4 w-4" /></button>
          </div>
        </nav>}
        <p className="mt-3 flex items-center justify-center gap-1.5 pb-5 text-center text-xs text-slate-400"><ArrowUpRight className="h-3.5 w-3.5" />Select an exhibitor to explore their company profile and products.</p>
      </div>
      <BackToTop />
    </div>
  );
}
