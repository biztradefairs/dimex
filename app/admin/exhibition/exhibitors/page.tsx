"use client";

import { useEffect, useState } from "react";
import {
  Plus, Eye, Edit, Trash2, Key, Search, Building, Mail, Phone, CheckCircle,
  XCircle, Clock, Loader2, RefreshCw, Package, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, X, AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ExhibitorLogo from "@/components/ExhibitorLogo";
import { exhibitorsAPI, type Exhibitor, type ExhibitorStatus } from "@/lib/api/exhibitors";
import { loadAdminExhibitors, type ExhibitorListQuery, type ExhibitorPageSize } from "@/lib/adminExhibitorList";

const errorMessage = (error: unknown, fallback: string) => error instanceof Error ? error.message : fallback;
const controlClass = "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-40";
const actionClass = "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40";

export default function ExhibitorsPage() {
  const router = useRouter();
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [query, setQuery] = useState<ExhibitorListQuery>({ page: 1, pageSize: 10, search: "" });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [action, setAction] = useState<{ id: string; type: "delete" | "resend" | "status" } | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery((current) => current.search === search.trim()
        ? current : { ...current, page: 1, search: search.trim() });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    let current = true;
    async function fetchExhibitors() {
      setLoading(true);
      setError(null);
      try {
        const response = await loadAdminExhibitors(query);
        if (!current) return;
        setExhibitors(response.data);
        setPagination(response.pagination);
      } catch (error) {
        if (current) setError(errorMessage(error, "Failed to load exhibitors"));
      } finally {
        if (current) setLoading(false);
      }
    }
    void fetchExhibitors();
    // Ignore old responses when search, page size or page changes.
    return () => { current = false; };
  }, [query, refresh]);

  const deleteExhibitor = async (exhibitor: Exhibitor) => {
    if (!confirm("Delete exhibitor " + exhibitor.email + "? This cannot be undone.")) return;
    setAction({ id: exhibitor.id, type: "delete" });
    try {
      await exhibitorsAPI.delete(exhibitor.id);
      toast.success("Exhibitor deleted successfully");
      setRefresh((value) => value + 1);
    } catch (error) {
      toast.error(errorMessage(error, "Failed to delete exhibitor"));
    } finally {
      setAction(null);
    }
  };

  const resendCredentials = async (exhibitor: Exhibitor) => {
    if (!confirm("Resend credentials to " + exhibitor.email + "?")) return;
    setAction({ id: exhibitor.id, type: "resend" });
    const toastId = toast.loading("Resending credentials...");
    try {
      await exhibitorsAPI.resendCredentials(exhibitor.id);
      toast.success("Credentials resent to " + exhibitor.email, { id: toastId });
    } catch (error) {
      toast.error(errorMessage(error, "Failed to resend credentials"), { id: toastId });
    } finally {
      setAction(null);
    }
  };

  const updateStatus = async (exhibitor: Exhibitor, status: ExhibitorStatus) => {
    setAction({ id: exhibitor.id, type: "status" });
    try {
      await exhibitorsAPI.update(exhibitor.id, { status });
      toast.success("Status updated to " + status);
      setRefresh((value) => value + 1);
    } catch (error) {
      toast.error(errorMessage(error, "Failed to update status"));
    } finally {
      setAction(null);
    }
  };

  const showPassword = (exhibitor: Exhibitor) => {
    if (!exhibitor.originalPassword) return toast.error("No password available for this exhibitor");
    toast.success(
      <div className="p-2">
        <h3 className="mb-2 font-semibold">Password for {exhibitor.email}</h3>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 font-mono text-lg">{exhibitor.originalPassword}</div>
        <p className="mt-2 text-sm text-slate-500">Share this password securely with the exhibitor.</p>
      </div>,
      { duration: 8000 },
    );
  };

  const pending = loading || search.trim() !== query.search;
  const totalPages = Math.max(1, pagination.totalPages);
  const currentPage = pagination.page;
  const start = pagination.total ? (currentPage - 1) * pagination.limit + 1 : 0;
  const end = Math.min(start + exhibitors.length - 1, pagination.total);
  const firstPageButton = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const visiblePages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => firstPageButton + index);
  const changePage = (page: number) => setQuery((current) => ({ ...current, page }));
  const openExhibitor = (id: string, suffix = "") => router.push("/admin/exhibition/exhibitors/" + id + suffix);

  const renderStatus = (exhibitor: Exhibitor) => {
    const active = ["active", "approved"].includes(exhibitor.status);
    const waiting = exhibitor.status === "pending";
    const Icon = active ? CheckCircle : waiting ? Clock : XCircle;
    return (
      <div className="space-y-2">
        <span className={"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium " +
          (active ? "bg-emerald-50 text-emerald-700" : waiting ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600")}>
          {action?.id === exhibitor.id && action.type === "status"
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />}
          {active ? "Active" : exhibitor.status.charAt(0).toUpperCase() + exhibitor.status.slice(1)}
        </span>
        <select
          aria-label={"Change status for " + exhibitor.company}
          value={active ? "active" : exhibitor.status}
          disabled={Boolean(action) || pending}
          onChange={(event) => void updateStatus(exhibitor, event.target.value as ExhibitorStatus)}
          className="block w-28 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
          {exhibitor.status === "rejected" && <option value="rejected">Rejected</option>}
        </select>
      </div>
    );
  };

  const renderActions = (exhibitor: Exhibitor) => (
    <div className="grid w-fit grid-cols-3 gap-1.5">
      <button type="button" className={actionClass} aria-label={"View " + exhibitor.company} title="View details" onClick={() => openExhibitor(exhibitor.id)}><Eye className="h-4 w-4" /></button>
      <button type="button" className={actionClass} aria-label={"Edit " + exhibitor.company} title="Edit exhibitor" onClick={() => openExhibitor(exhibitor.id, "/edit")}><Edit className="h-4 w-4" /></button>
      <button type="button" className={actionClass} aria-label={"Requirements for " + exhibitor.company} title="Extra requirements" onClick={() => openExhibitor(exhibitor.id, "/requirements")}><Package className="h-4 w-4" /></button>
      <button type="button" className={actionClass} aria-label={"Show password for " + exhibitor.company} title="Show password" disabled={!exhibitor.originalPassword} onClick={() => showPassword(exhibitor)}><Key className="h-4 w-4" /></button>
      <button type="button" className={actionClass} aria-label={"Resend credentials to " + exhibitor.company} title="Resend credentials email" disabled={Boolean(action)} onClick={() => void resendCredentials(exhibitor)}>
        {action?.id === exhibitor.id && action.type === "resend" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
      </button>
      <button type="button" className={actionClass + " hover:!border-red-200 hover:!bg-red-50 hover:!text-red-600"} aria-label={"Delete " + exhibitor.company} title="Delete exhibitor" disabled={Boolean(action)} onClick={() => void deleteExhibitor(exhibitor)}>
        {action?.id === exhibitor.id && action.type === "delete" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <div className="min-w-0 space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Exhibitors</h1>
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">{loading ? "..." : pagination.total}</span>
          </div>
          <p className="mt-1.5 text-sm text-slate-500">Manage exhibitor accounts, stalls and access.</p>
        </div>
        <button type="button" onClick={() => router.push("/admin/exhibition/exhibitors/new")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
          <Plus className="h-4 w-4" /> Add Exhibitor
        </button>
      </header>

      <section aria-label="Exhibitor list" className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search" aria-label="Search all exhibitors" placeholder="Search company, contact or email..."
              value={search} onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 [&::-webkit-search-cancel-button]:hidden"
            />
            {search && <button type="button" aria-label="Clear search" onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X className="h-4 w-4" /></button>}
          </div>
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <label className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-500">
              Rows per page
              <select aria-label="Rows per page" value={query.pageSize} onChange={(event) => setQuery((current) => ({ ...current, page: 1, pageSize: (event.target.value === "all" ? "all" : Number(event.target.value)) as ExhibitorPageSize }))} className={controlClass}>
                {[10, 25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
                <option value="all">All</option>
              </select>
            </label>
            <button type="button" onClick={() => setRefresh((value) => value + 1)} disabled={pending} aria-label="Refresh exhibitors" title="Refresh exhibitors" className={controlClass + " !p-2.5"}><RefreshCw className={"h-4 w-4" + (pending ? " animate-spin" : "")} /></button>
          </div>
        </div>

        <div aria-busy={pending}>
          {pending ? (
            <div role="status" className="flex min-h-64 items-center justify-center gap-3 py-20 text-sm text-slate-500"><Loader2 className="h-5 w-5 animate-spin text-blue-600" />Loading exhibitors...</div>
          ) : error ? (
            <div role="alert" className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
              <AlertCircle className="h-9 w-9 text-red-400" /><h2 className="font-semibold text-slate-900">Unable to load exhibitors</h2><p className="text-sm text-slate-500">{error}</p>
              <button type="button" className={controlClass} onClick={() => setRefresh((value) => value + 1)}>Try again</button>
            </div>
          ) : exhibitors.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-6 py-12 text-center">
              <Building className="h-10 w-10 text-slate-300" /><h2 className="font-semibold text-slate-900">No exhibitors found</h2>
              <p className="text-sm text-slate-500">{query.search ? "Try a different company, contact or email." : "Add your first exhibitor to get started."}</p>
              {query.search && <button type="button" className={controlClass} onClick={() => setSearch("")}>Clear search</button>}
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[880px] text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr><th scope="col" className="px-5 py-3 font-semibold">Exhibitor</th><th scope="col" className="px-4 py-3 font-semibold">Contact</th><th scope="col" className="px-4 py-3 font-semibold">Stall</th><th scope="col" className="px-4 py-3 font-semibold">Status</th><th scope="col" className="px-4 py-3 font-semibold">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {exhibitors.map((exhibitor, index) => (
                      <tr key={exhibitor.id} className="transition hover:bg-blue-50/30">
                        <td className="max-w-[310px] px-5 py-4 align-top">
                          <div className="flex gap-3"><div className="flex shrink-0 flex-col items-center gap-1"><ExhibitorLogo logoUrl={exhibitor.logoUrl} company={exhibitor.company} /><span className="text-[10px] text-slate-400">{start + index}</span></div>
                            <div className="min-w-0"><button type="button" onClick={() => openExhibitor(exhibitor.id)} className="text-left font-semibold leading-5 text-slate-900 hover:text-blue-600">{exhibitor.company}</button><p className="mt-1 text-xs text-slate-500">{exhibitor.name}</p>{exhibitor.sector && <p className="mt-1.5 text-xs leading-4 text-slate-400">{exhibitor.sector}</p>}</div>
                          </div>
                        </td>
                        <td className="max-w-[260px] px-4 py-4 align-top">
                          <a href={"mailto:" + exhibitor.email} className="flex items-start gap-2 text-xs leading-5 text-slate-600 hover:text-blue-600"><Mail className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-400" /><span className="break-all">{exhibitor.email}</span></a>
                          {exhibitor.phone && <a href={"tel:" + exhibitor.phone} className="mt-2 flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600"><Phone className="h-3.5 w-3.5 text-slate-400" />{exhibitor.phone}</a>}
                        </td>
                        <td className="px-4 py-4 align-top"><span className="inline-block max-w-36 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">{exhibitor.booth || "Not assigned"}</span><p className="mt-2 whitespace-nowrap text-xs text-slate-500">{exhibitor.boothSize || "Size not set"}</p></td>
                        <td className="px-4 py-4 align-top">{renderStatus(exhibitor)}</td>
                        <td className="px-4 py-4 align-top">{renderActions(exhibitor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="divide-y divide-slate-100 md:hidden">
                {exhibitors.map((exhibitor, index) => (
                  <article key={exhibitor.id} className="space-y-4 p-4">
                    <div className="flex items-start gap-3"><div className="flex shrink-0 flex-col items-center gap-1"><ExhibitorLogo logoUrl={exhibitor.logoUrl} company={exhibitor.company} /><span className="text-[10px] text-slate-400">{start + index}</span></div><div className="min-w-0"><button type="button" onClick={() => openExhibitor(exhibitor.id)} className="text-left text-sm font-semibold text-slate-900">{exhibitor.company}</button><p className="mt-1 text-xs text-slate-500">{exhibitor.name}</p></div></div>
                    <div className="space-y-1.5 text-xs text-slate-500"><a href={"mailto:" + exhibitor.email} className="block break-all text-blue-600">{exhibitor.email}</a><p>{exhibitor.phone}</p><p>Stall <span className="font-medium text-slate-700">{exhibitor.booth}</span>{exhibitor.boothSize && " / " + exhibitor.boothSize}</p></div>
                    <div className="flex items-start justify-between gap-4">{renderStatus(exhibitor)}{renderActions(exhibitor)}</div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        <footer className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p role="status" aria-live="polite" className="text-sm text-slate-500">
            {pending ? "Loading results..." : error ? "Results unavailable" : <>Showing <span className="font-semibold text-slate-700">{start}-{Math.max(0, end)}</span> of <span className="font-semibold text-slate-700">{pagination.total}</span> exhibitors</>}
          </p>
          <nav aria-label="Exhibitor pagination" className="flex items-center gap-1">
            <button type="button" aria-label="First page" title="First page" className={controlClass + " !p-2"} disabled={pending || Boolean(error) || currentPage <= 1} onClick={() => changePage(1)}><ChevronsLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="Previous page" title="Previous page" className={controlClass + " !p-2"} disabled={pending || Boolean(error) || currentPage <= 1} onClick={() => changePage(currentPage - 1)}><ChevronLeft className="h-4 w-4" /></button>
            {visiblePages.map((page) => <button type="button" key={page} aria-label={"Page " + page} aria-current={page === currentPage ? "page" : undefined} className={controlClass + " min-w-9 !px-2 !py-1.5 " + (page === currentPage ? "!border-blue-600 !bg-blue-600 !font-semibold !text-white" : "hover:bg-slate-100")} disabled={pending || Boolean(error)} onClick={() => changePage(page)}>{page}</button>)}
            <button type="button" aria-label="Next page" title="Next page" className={controlClass + " !p-2"} disabled={pending || Boolean(error) || currentPage >= totalPages} onClick={() => changePage(currentPage + 1)}><ChevronRight className="h-4 w-4" /></button>
            <button type="button" aria-label="Last page" title="Last page" className={controlClass + " !p-2"} disabled={pending || Boolean(error) || currentPage >= totalPages} onClick={() => changePage(totalPages)}><ChevronsRight className="h-4 w-4" /></button>
            <span className="sr-only">Page {currentPage} of {totalPages}</span>
          </nav>
        </footer>
      </section>
    </div>
  );
}
