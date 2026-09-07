"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, DollarSign, Users, Package, Download, Calendar, Loader2 } from "lucide-react";
import {
  buildRevenueAnalytics,
  fetchAdminInvoices,
  getAdminAuthToken,
  type AdminInvoice,
} from "@/lib/adminFinance";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);

export default function RevenuePage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year" | "all">("year");
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const [invoices, setInvoices] = useState<AdminInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = async () => {
    const token = getAdminAuthToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchAdminInvoices(token);
      setInvoices(data);
    } catch (err) {
      if (err instanceof Error && err.message === "unauthorized") {
        localStorage.removeItem("token");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      setError(err instanceof Error ? err.message : "Failed to load revenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const analytics = useMemo(
    () => buildRevenueAnalytics(invoices, Number(selectedYear), timeRange),
    [invoices, selectedYear, timeRange]
  );

  const maxRevenue = Math.max(...analytics.monthly.map((month) => month.revenue), 1);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Month,Year,Revenue,Exhibitors,Growth",
        ...analytics.monthly.map(
          (row) => `"${row.month}",${row.year},${row.revenue},${row.exhibitors},${row.growth}`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `revenue-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading revenue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="text-gray-600">Live revenue from paid exhibitor invoices</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
      ) : null}

      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
                className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {analytics.years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analytics.totalRevenue)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Latest month growth</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.growthRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Paying exhibitors</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.uniqueExhibitors}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-yellow-100">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Avg / month</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analytics.avgRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Revenue Trend</h3>
            {analytics.monthly.length === 0 ? (
              <p className="text-sm text-gray-500 py-16 text-center">No paid invoices in this period.</p>
            ) : (
              <div className="h-64 flex items-end space-x-2">
                {analytics.monthly.map((month) => {
                  const height = Math.max((month.revenue / maxRevenue) * 100, 6);
                  return (
                    <div key={month.key} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full h-48 flex items-end">
                        <div className="w-full bg-blue-500 rounded-t-lg" style={{ height: `${height}%` }}>
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                            {formatCurrency(month.revenue)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">{month.month}</div>
                      <div className="text-xs text-gray-400 mt-1">{month.exhibitors} exhibitors</div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Total: {formatCurrency(analytics.totalRevenue)}</span>
                <span>{analytics.paidCount} paid invoices</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue by Source</h3>
            {analytics.sources.length === 0 ? (
              <p className="text-sm text-gray-500 py-16 text-center">No service breakdown yet.</p>
            ) : (
              <div className="space-y-4">
                {analytics.sources.map((source) => (
                  <div key={source.category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900">{source.category}</span>
                      <span className="font-medium">
                        {formatCurrency(source.amount)} ({source.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${source.color}`} style={{ width: `${source.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Highest source</p>
                  <p className="text-lg font-semibold text-gray-900">{analytics.sources[0]?.category || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid invoices</p>
                  <p className="text-lg font-semibold text-gray-900">{analytics.paidCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Monthly Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exhibitors</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg/Exhibitor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.monthly.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-8 text-center text-sm text-gray-500">
                      No paid revenue to show for this period.
                    </td>
                  </tr>
                ) : (
                  analytics.monthly.map((month) => (
                    <tr key={month.key}>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {month.month} {month.year}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{formatCurrency(month.revenue)}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{month.exhibitors}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${month.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {month.growth >= 0 ? "+" : ""}
                          {month.growth}%
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(month.exhibitors ? month.revenue / month.exhibitors : 0)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
