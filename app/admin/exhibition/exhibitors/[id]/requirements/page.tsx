"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchExhibitorRequirements,
  type ExtraRequirementRequest,
} from "@/lib/api/extraRequirements";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

function isRequestPaid(request: ExtraRequirementRequest) {
  return String(request.payment?.status || "").toLowerCase() === "paid";
}

export default function ExhibitorExtraRequirementsPage() {
  const params = useParams();
  const router = useRouter();
  const exhibitorId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending">("all");
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchExhibitorRequirements>> | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchExhibitorRequirements(exhibitorId);
        setData(result);
      } catch (error: any) {
        if (error.message === "unauthorized") {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitor requirements");
      } finally {
        setLoading(false);
      }
    };

    if (exhibitorId) load();
  }, [exhibitorId, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Loading extra requirements...</span>
      </div>
    );
  }

  if (!data) return null;

  const filteredRequests = data.requests.filter((request) => {
    if (paymentFilter === "paid") return isRequestPaid(request);
    if (paymentFilter === "pending") return !isRequestPaid(request);
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.push("/admin/exhibition/requirements")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to all exhibitors
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{data.exhibitor.company || "Exhibitor"}</h1>
          <p className="text-gray-600 mt-1">
            {data.exhibitor.name} · {data.exhibitor.email}
            {data.exhibitor.booth ? ` · Booth ${data.exhibitor.booth}` : ""}
          </p>
        </div>
        <Link
          href={`/admin/exhibition/exhibitors/${exhibitorId}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          View exhibitor profile
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-600">Filter extra requirements by payment status</p>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value as "all" | "paid" | "pending")}
          className="w-full sm:w-56 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Requests" value={String(data.summary.requestCount)} />
        <SummaryCard label="Items requested" value={String(data.summary.itemCount)} />
        <SummaryCard label="Paid" value={formatCurrency(data.summary.paidAmount)} />
        <SummaryCard label="Pending payment" value={formatCurrency(data.summary.pendingAmount)} />
      </div>

      {data.requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-700 font-medium">No extra requirements submitted</p>
          <p className="text-sm text-gray-500 mt-1">This exhibitor has not applied for extra services yet.</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-700 font-medium">No {paymentFilter} requirements</p>
          <p className="text-sm text-gray-500 mt-1">Try another payment status in the dropdown.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRequests.map((request, index) => (
            <RequestCard key={request.id} request={request} index={filteredRequests.length - index} />
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function RequestCard({ request, index }: { request: ExtraRequirementRequest; index: number }) {
  const paid = isRequestPaid(request);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="font-semibold text-gray-900">Request #{index}</p>
          <p className="text-sm text-gray-500">
            Submitted{" "}
            {request.submittedAt
              ? new Date(request.submittedAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 capitalize">
            {request.status || "pending"}
          </span>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              paid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {paid ? <CheckCircle className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
            {paid ? "Payment received" : "Payment pending"}
          </span>
        </div>
      </div>

      <div className="px-6 py-4 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-xs uppercase text-gray-500">
              <th className="pb-2">Service</th>
              <th className="pb-2">Description</th>
              <th className="pb-2">Qty</th>
              <th className="pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(request.items || []).length === 0 ? (
              <tr>
                <td colSpan={4} className="py-4 text-sm text-gray-500">
                  No line items were stored for this request.
                </td>
              </tr>
            ) : (
              request.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 text-sm font-medium text-gray-900">{item.type}</td>
                  <td className="py-3 text-sm text-gray-600">
                    <div>{item.description}</div>
                    {item.specifications ? (
                      <div className="text-xs text-gray-400 mt-0.5">{item.specifications}</div>
                    ) : null}
                  </td>
                  <td className="py-3 text-sm text-gray-700">{item.quantity}</td>
                  <td className="py-3 text-sm text-right font-medium text-gray-900">
                    {formatCurrency(item.totalPrice || 0)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Request total</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Services</span>
              <span>{formatCurrency(request.totals.servicesTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST</span>
              <span>{formatCurrency(request.totals.gst)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Deposit</span>
              <span>{formatCurrency(request.totals.deposit)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-1">
              <span>Grand total</span>
              <span>{formatCurrency(request.totals.total)}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Payment</p>
          {request.payment ? (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Invoice</span>
                <span className="font-medium text-gray-900">{request.payment.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Amount</span>
                <span>{formatCurrency(request.payment.amount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Method</span>
                <span>{request.payment.paymentMethod || "—"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Status</span>
                <span className={paid ? "text-green-700 font-medium" : "text-yellow-700 font-medium"}>
                  {paid ? "Paid" : request.payment.status}
                </span>
              </div>
              {request.payment.invoiceId ? (
                <Link
                  href={`/admin/financial/invoices/${request.payment.invoiceId}`}
                  className="inline-flex items-center gap-1 mt-2 text-blue-700 hover:text-blue-900"
                >
                  <FileText className="h-4 w-4" />
                  Open invoice
                </Link>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No invoice has been generated for this request yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
