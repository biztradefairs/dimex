"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  Package,
  Building,
  Mail,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { exhibitorsAPI, type Exhibitor } from "@/lib/api/exhibitors";
import {
  fetchExhibitorRequirementsSummary,
  type ExhibitorRequirementsSummary,
} from "@/lib/api/extraRequirements";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

type ExhibitorRow = ExhibitorRequirementsSummary & {
  hasRequests: boolean;
};

export default function ExhibitionExtraRequirementsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ExhibitorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [exhibitorsRes, summary] = await Promise.all([
          exhibitorsAPI.getAll({ limit: 1000 }),
          fetchExhibitorRequirementsSummary().catch(() => [] as ExhibitorRequirementsSummary[]),
        ]);

        const summaryById = new Map(
          (summary || [])
            .filter((item) => item.exhibitorId)
            .map((item) => [item.exhibitorId, item])
        );

        const merged: ExhibitorRow[] = (exhibitorsRes.data || []).map((exhibitor: Exhibitor) => {
          const extra = summaryById.get(exhibitor.id);
          return {
            exhibitorId: exhibitor.id,
            companyName: exhibitor.company || extra?.companyName || "Unknown",
            contactPerson: exhibitor.name || extra?.contactPerson || "",
            email: exhibitor.email || extra?.email || "",
            phone: exhibitor.phone || extra?.phone || "",
            stallNumber: exhibitor.booth || extra?.stallNumber || "",
            requestCount: extra?.requestCount || 0,
            paidCount: extra?.paidCount || 0,
            pendingCount: extra?.pendingCount || 0,
            totalAmount: extra?.totalAmount || 0,
            paidAmount: extra?.paidAmount || 0,
            pendingAmount: extra?.pendingAmount || 0,
            latestSubmittedAt: extra?.latestSubmittedAt || "",
            hasRequests: Boolean(extra?.requestCount),
          };
        });

        merged.sort((a, b) => {
          if (a.hasRequests !== b.hasRequests) return a.hasRequests ? -1 : 1;
          return a.companyName.localeCompare(b.companyName);
        });

        setRows(merged);
      } catch (error: any) {
        if (error.message === "unauthorized" || error.response?.status === 401) {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitors");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const filtered = useMemo(
    () =>
      rows.filter((row) => {
        const q = search.toLowerCase();
        return (
          row.companyName?.toLowerCase().includes(q) ||
          row.contactPerson?.toLowerCase().includes(q) ||
          row.email?.toLowerCase().includes(q) ||
          row.stallNumber?.toLowerCase().includes(q)
        );
      }),
    [rows, search]
  );

  const openExhibitor = (exhibitorId: string) => {
    router.push(`/admin/exhibition/exhibitors/${exhibitorId}/requirements`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Exhibitor Extra Requirements</h1>
        <p className="text-gray-600 mt-2">
          All exhibitors. Click one to see extra requirement requests and payment status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">All exhibitors</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{rows.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">With requests</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {rows.filter((row) => row.hasRequests).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="text-2xl font-semibold text-green-700 mt-1">
            {formatCurrency(rows.reduce((sum, row) => sum + row.paidAmount, 0))}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-semibold text-yellow-700 mt-1">
            {formatCurrency(rows.reduce((sum, row) => sum + row.pendingAmount, 0))}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search exhibitors by company, contact, email, or booth..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading exhibitors...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium">No exhibitors found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exhibitor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requests</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((row) => (
                  <tr
                    key={row.exhibitorId}
                    onClick={() => openExhibitor(row.exhibitorId)}
                    className="hover:bg-blue-50/50 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{row.companyName}</p>
                          <p className="text-sm text-gray-500">{row.contactPerson}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.stallNumber || "—"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{row.requestCount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-green-700">
                        <CheckCircle className="h-4 w-4" />
                        {formatCurrency(row.paidAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-sm text-yellow-700">
                        <Clock className="h-4 w-4" />
                        {formatCurrency(row.pendingAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                        View
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
