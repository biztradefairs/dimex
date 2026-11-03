import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { mapExhibitionCompany, type ExhibitionCompany, type ExhibitionCompanyRecord } from '@/app/exhibition-directory/api';

const backend = (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://diemex-backend.onrender.com')
  .replace(/\/+$/, '').replace(/\/api$/, '');
const API = backend + '/api/exhibitors';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
type CompanyLink = { id: string; company: string };
function record(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}
function isPublic(status: unknown) {
  return status === 'approved' || status === 'active';
}
class ExhibitorRequestError extends Error {
  constructor(readonly status: number) {
    super('Unable to load the public exhibition directory (' + status + ').');
  }
}
async function read(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
  if (!response.ok) {
    await response.body?.cancel().catch(() => undefined);
    throw new ExhibitorRequestError(response.status);
  }
  const payload: unknown = await response.json();
  if (!record(payload) || payload.success !== true) throw new Error('Invalid public exhibitor response.');
  return payload;
}

export const fetchIndexableExhibitors = unstable_cache(async (): Promise<CompanyLink[]> => {
  const companies = new Map<string, CompanyLink>();
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const payload = await read(API + '?status=approved&limit=100&page=' + page);
    const pagination = payload.pagination;
    if (!Array.isArray(payload.data) || !record(pagination) ||
        !Number.isSafeInteger(pagination.totalPages) || Number(pagination.totalPages) < 0 ||
        Number(pagination.page) !== page) throw new Error('Invalid public exhibitor pagination.');
    totalPages = Number(pagination.totalPages);
    for (const item of payload.data) {
      if (!record(item) || typeof item.id !== 'string' || !UUID.test(item.id)) throw new Error('Invalid exhibitor identifier.');
      // The public API maps database approved to frontend active.
      if (!isPublic(item.status) || typeof item.company !== 'string' || !item.company.trim()) continue;
      companies.set(item.id, { id: item.id, company: item.company });
    }
  }
  return [...companies.values()];
}, ['indexable-exhibitors-v1', API], { revalidate: 60 });

const cachedCompany = unstable_cache(async (id: string): Promise<ExhibitionCompany | null> => {
  let payload: Record<string, unknown>;
  try {
    payload = await read(API + '/' + encodeURIComponent(id));
  } catch (error) {
    if (error instanceof ExhibitorRequestError && error.status === 404) return null;
    throw error;
  }
  const company = payload.data;
  if (!record(company) || company.id !== id || typeof company.company !== 'string') {
    throw new Error('Invalid public exhibitor detail.');
  }
  if (!isPublic(company.status) || !company.company.trim()) return null;
  // Serialize public display fields only, never raw account metadata.
  return mapExhibitionCompany(company as unknown as ExhibitionCompanyRecord);
}, ['public-exhibitor-detail-v1', API], { revalidate: 60 });

export const fetchPublicExhibitor = cache(async (slugOrId: string): Promise<ExhibitionCompany | null> => {
  if (UUID.test(slugOrId)) return cachedCompany(slugOrId.toLowerCase());
  const companies = await fetchIndexableExhibitors();
  const match = companies.find((item) => item.company.toLowerCase().replace(/\s+/g, '-') === slugOrId);
  return match ? cachedCompany(match.id) : null;
});

export async function fetchInitialCompanyDirectory() {
  const links = await fetchIndexableExhibitors();
  const firstPage = await Promise.all(links.slice(0, 24).map((item) => fetchPublicExhibitor(item.id)));
  return {
    companies: firstPage.filter((company): company is ExhibitionCompany => company !== null),
    totalPages: Math.max(1, Math.ceil(links.length / 24)),
  };
}
