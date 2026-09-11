"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Users, Building, Mail, MapPin, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchExhibitorTeamSummaries,
  type ExhibitorTeamSummary,
} from "@/lib/api/exhibitorTeam";

export default function ExhibitorsTeamPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ExhibitorTeamSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchExhibitorTeamSummaries();
        setRows(data);
      } catch (error: any) {
        if (error.message === "unauthorized") {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitor teams");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const companyOptions = useMemo(() => {
    const unique = new Map<string, string>();
    rows.forEach((row) => {
      const name = (row.companyName || "").trim();
      if (name && !unique.has(name.toLowerCase())) {
        unique.set(name.toLowerCase(), name);
      }
    });
    return Array.from(unique.values()).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
  }, [rows]);

  const filtered = useMemo(() => {
    const sorted = [...rows].sort((a, b) =>
      String(a.companyName || "").localeCompare(String(b.companyName || ""), undefined, {
        sensitivity: "base",
      })
    );
    if (selectedCompany === "all") return sorted;
    return sorted.filter(
      (row) => row.companyName?.toLowerCase() === selectedCompany.toLowerCase()
    );
  }, [rows, selectedCompany]);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Exhibitors Team</h1>
        <p className="text-gray-600 mt-2">
          All exhibitors. Click one to see company name, city, and team details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">All exhibitors</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{rows.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Teams submitted</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {rows.filter((row) => row.hasTeam).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Team members</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {rows.reduce((sum, row) => sum + (row.memberCount || 0), 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
        <div className="relative">
          <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none"
          >
            <option value="all">All companies</option>
            {companyOptions.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading exhibitor teams...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium">No exhibitors found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Exhibitor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Team members
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((row) => (
                  <tr
                    key={row.exhibitorId}
                    onClick={() => router.push(`/admin/exhibition/teams/${row.exhibitorId}`)}
                    className="hover:bg-blue-50/50 cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{row.companyName}</p>
                          <p className="text-sm text-gray-500">{row.exhibitorName}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.city ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {row.city}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.hasTeam ? row.memberCount : "Not submitted"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                        View team
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
