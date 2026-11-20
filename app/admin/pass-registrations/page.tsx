'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { isAxiosError } from 'axios';
import { ChevronLeft, ChevronRight, Download, ExternalLink, Loader2, RefreshCw, Search, Ticket, X } from 'lucide-react';
import { fetchPassRegistrations, type PassRegistration, type PassRegistrationList } from '@/lib/api/passRegistrations';

const PAGE_SIZE = 25;
const controlClass = 'rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-[#004A96] focus:outline-none focus:ring-2 focus:ring-blue-100';
const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50';

function date(value: string | null) {
  if (!value) return 'Not recorded';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? 'Not recorded' : new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata',
  }).format(parsed);
}

function channel(value: string | null) {
  return value === 'whatsapp' ? 'WhatsApp' : value === 'sms' ? 'SMS' : value === 'email' ? 'Email' : value || 'Not sent';
}

function PassStatus({ status }: { status: string }) {
  const label = status === 'checked_in' ? 'Checked in' : status === 'cancelled' ? 'Cancelled' : 'Issued';
  const colors = status === 'checked_in' ? 'bg-green-50 text-green-700' : status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-[#004A96]';
  return <span className={'inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ' + colors}>{label}</span>;
}

function SyncStatus({ sync }: { sync: PassRegistration['cmsSync'] }) {
  const synced = sync.status === 'synced';
  const label = synced ? 'Synced' : sync.lastError ? 'Retry pending' : sync.status === 'not_queued' ? 'Awaiting sync' : 'Pending';
  return <span className={'inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ' + (synced ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-800')}>{label}</span>;
}

function RegistrationDetails({ pass, onClose }: { pass: PassRegistration; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);
  const download = new URL(pass.badgeUrl);
  download.searchParams.set('download', '1');
  const rows = [
    ['Full name', pass.name], ['Company', pass.company], ['Designation', pass.designation],
    ['Phone', pass.phone], ['Email', pass.email], ['Area', pass.area], ['City', pass.city],
    ['State', pass.state], ['Country', pass.country], ['PIN code', pass.pinCode],
    ['Heard about us', pass.source], ['Interests', pass.interests.join(', ')],
    ['Verification method', channel(pass.channel)], ['Phone verified', date(pass.verifiedAt)],
    ['Registered', date(pass.createdAt)], ['Issued', date(pass.issuedAt)],
    ['Badge design', pass.badgeDesign === 'design2' ? 'Design 2' : 'Design 1'],
    ['Delivery channel', channel(pass.sentVia)], ['Delivery status', pass.sentStatus],
    ['Last sent', date(pass.sentAt)], ['Checked in', date(pass.checkedInAt)],
    ['Last synced to CMS', date(pass.cmsSync.syncedAt)],
  ];
  return (
    <dialog ref={dialog} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      aria-labelledby="registration-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white p-5">
        <div>
          <h2 id="registration-title" className="text-xl font-bold">{pass.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{pass.registrationNumber}</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close registration details" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-[240px_1fr]">
        <div className="space-y-4">
          {imageFailed ? <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600">Badge preview unavailable. Open the pass below.</p> :
            <Image src={pass.badgeUrl} alt={'Visitor badge for ' + pass.name} width={450} height={714} unoptimized onError={() => setImageFailed(true)} className="mx-auto h-auto w-full max-w-64 rounded-lg border border-slate-200" />}
          <a href={pass.passUrl} target="_blank" rel="noopener noreferrer" className={buttonClass + ' w-full'}><ExternalLink className="h-4 w-4" />View pass</a>
          <a href={download.toString()} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#004A96] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#003875]"><Download className="h-4 w-4" />Download badge</a>
        </div>
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3"><PassStatus status={pass.status} /><span className="text-sm text-slate-500">CMS:</span><SyncStatus sync={pass.cmsSync} /></div>
          {pass.cmsSync.lastError ? <div role="status" className="mb-5 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
            <p className="font-medium">CMS sync will retry automatically.</p>
            <p className="mt-1 break-words">{pass.cmsSync.lastError}</p>
            {pass.cmsSync.nextAttemptAt ? <p className="mt-1 text-xs">Next attempt: {date(pass.cmsSync.nextAttemptAt)}</p> : null}
          </div> : null}
          <dl className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            {rows.map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 break-words text-sm font-medium">{value || 'Not provided'}</dd></div>)}
          </dl>
        </div>
      </div>
    </dialog>
  );
}

export default function PassRegistrationsPage() {
  const [data, setData] = useState<PassRegistrationList | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeDetails = useCallback(() => setSelectedId(null), []);

  useEffect(() => {
    let active = true;
    let running = false;
    const controller = new AbortController();
    async function load(quiet = false) {
      if (running) return;
      running = true;
      if (!quiet) setLoading(true);
      try {
        const result = await fetchPassRegistrations({ page, limit: PAGE_SIZE, search, status }, controller.signal);
        if (active) { setData(result); setError(''); }
      } catch (failure: unknown) {
        if (active) setError(isAxiosError<{ error?: string }>(failure)
          ? failure.response?.data?.error || 'Could not load pass registrations.'
          : 'Could not load pass registrations.');
      } finally {
        running = false;
        if (active) setLoading(false);
      }
    }
    void load();
    const timer = window.setInterval(() => { if (document.visibilityState === 'visible') void load(true); }, 30000);
    return () => { active = false; controller.abort(); window.clearInterval(timer); };
  }, [page, search, status, refresh]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  const selected = data?.registrations.find(pass => pass.id === selectedId);
  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#004A96]">Visitor registration</p>
          <h1 className="mt-1 flex items-center gap-3 text-3xl font-bold text-slate-900"><Ticket className="h-7 w-7 text-[#004A96]" />Pass Registrations</h1>
          <p className="mt-2 text-sm text-slate-600">View registered visitors, their badges, check-ins, and CMS sync status.</p>
        </div>
        <button type="button" className={buttonClass} onClick={() => setRefresh(value => value + 1)} disabled={loading}><RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')} />Refresh</button>
      </div>
      {error ? <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p> : null}
      {data && !data.cmsConfigured ? <p role="status" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">Visitors are saved in DIEMEX. CMS sync is awaiting backend configuration.</p> : null}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap gap-3 border-b border-slate-200 p-4">
          <form onSubmit={submitSearch} className="flex flex-1 gap-2">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search pass registrations</span>
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input value={searchInput} onChange={event => setSearchInput(event.target.value)} maxLength={120} placeholder="Name, company, phone, email, or registration number" className={controlClass + ' w-full pl-9'} />
            </label>
            <button type="submit" className={buttonClass}>Search</button>
          </form>
          <label>
            <span className="sr-only">Filter by pass status</span>
            <select value={status} onChange={event => { setStatus(event.target.value); setPage(1); }} className={controlClass}>
              <option value="">All pass statuses</option><option value="issued">Issued</option><option value="checked_in">Checked in</option><option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>{['Registration', 'Visitor', 'Company', 'Phone', 'Pass status', 'CMS sync', 'Details'].map(label => <th key={label} scope="col" className="whitespace-nowrap px-4 py-3 font-semibold">{label}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? <tr><td colSpan={7} className="px-4 py-16 text-center text-slate-500"><Loader2 className="mr-2 inline h-5 w-5 animate-spin" />Loading registrations...</td></tr> :
                !data?.registrations.length ? <tr><td colSpan={7} className="px-4 py-16 text-center text-slate-500">{error ? 'Registrations could not be loaded. Try Refresh.' : search || status ? 'No registrations match these filters.' : 'No visitor passes have been registered yet.'}</td></tr> :
                  data.registrations.map(pass => <tr key={pass.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-4"><p className="font-semibold text-[#004A96]">{pass.registrationNumber}</p><p className="mt-1 text-xs text-slate-500">{date(pass.createdAt)}</p></td>
                    <td className="px-4 py-4"><p className="font-medium text-slate-900">{pass.name}</p><p className="mt-1 text-xs text-slate-500">{pass.email || 'Email not provided'}</p></td>
                    <td className="px-4 py-4 text-slate-700">{pass.company}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-slate-700">{pass.phone}</td>
                    <td className="px-4 py-4"><PassStatus status={pass.status} /></td>
                    <td className="px-4 py-4"><SyncStatus sync={pass.cmsSync} /></td>
                    <td className="px-4 py-4"><button type="button" className="whitespace-nowrap font-semibold text-[#004A96] hover:underline" onClick={() => setSelectedId(pass.id)} aria-label={'View registration for ' + pass.name}>View details</button></td>
                  </tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
          <p className="text-sm text-slate-500">{data?.total ?? 0} registrations</p>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Previous page" className={buttonClass} disabled={loading || page <= 1} onClick={() => setPage(value => value - 1)}><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-sm text-slate-600">Page {page} of {data?.totalPages ?? 1}</span>
            <button type="button" aria-label="Next page" className={buttonClass} disabled={loading || !data || page >= data.totalPages} onClick={() => setPage(value => value + 1)}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
      {selected ? <RegistrationDetails key={selected.id} pass={selected} onClose={closeDetails} /> : null}
    </main>
  );
}
