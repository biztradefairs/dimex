import { exhibitorsAPI, type Exhibitor, type PaginatedResponse } from "@/lib/api/exhibitors";

export type ExhibitorPageSize = 10 | 25 | 50 | 100 | "all";
export type ExhibitorListQuery = { page: number; pageSize: ExhibitorPageSize; search: string };
type RequestPage = typeof exhibitorsAPI.getAll;

export async function loadAdminExhibitors(
  query: ExhibitorListQuery,
  requestPage: RequestPage = exhibitorsAPI.getAll,
): Promise<PaginatedResponse<Exhibitor>> {
  const search = query.search.trim();
  const limit = query.pageSize === "all" ? 100 : query.pageSize;
  let response = await requestPage({ page: query.pageSize === "all" ? 1 : query.page, limit, search });

  if (query.pageSize !== "all") {
    const lastPage = Math.max(1, response.pagination.totalPages);
    // Deleting the last record on a page must take the user back to a valid page.
    if (query.page > lastPage) response = await requestPage({ page: lastPage, limit, search });
    return response;
  }

  const records = new Map(response.data.map((exhibitor) => [exhibitor.id, exhibitor]));
  for (let page = 2; page <= response.pagination.totalPages; page++) {
    const next = await requestPage({ page, limit, search });
    for (const exhibitor of next.data) records.set(exhibitor.id, exhibitor);
    response = next;
  }
  const data = [...records.values()];
  return {
    ...response,
    data,
    pagination: { total: data.length, page: 1, limit: Math.max(1, data.length), totalPages: data.length ? 1 : 0 },
  };
}
