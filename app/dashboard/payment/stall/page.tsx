'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { dashboardAPI } from '@/lib/api/exhibitors';
import { formatINR, formatPhaseDate, type StallPayment } from '@/lib/stallPayment';
import StallPhaseCheckout from '@/components/StallPhaseCheckout';

type PaymentData = StallPayment & { boothNumber?: string; company?: string; boothType?: string; size?: string };

const statusStyles: Record<string, string> = {
  paid: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  overdue: 'bg-red-50 text-red-700',
};

export default function StallPaymentPage() {
  const [data, setData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    dashboardAPI
      .getPayment()
      .then(setData)
      .catch((err) => setError(err.message || 'Failed to load stall payment'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="mt-3 text-gray-600">Loading stall payment...</p>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stall Payment</h1>
        <p className="mt-1 text-sm text-gray-500">
          Pay the initial 30% now. The 2nd payment is due 15 days later, and the 3rd 15 days after that.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Stall Cost</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{formatINR(data?.stallCost || 0)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Discount</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{formatINR(data?.discount || 0)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">GST ({data?.gstPercent || 18}%)</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{formatINR(data?.gstAmount || 0)}</p>
        </div>
        <div className="rounded-xl bg-blue-600 p-5 text-white shadow-sm">
          <p className="text-sm text-blue-100">Final Amount</p>
          <p className="mt-2 text-2xl font-bold">{formatINR(data?.finalAmount || 0)}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="flex items-center gap-2 font-semibold text-gray-900">
            <CreditCardIcon className="h-5 w-5 text-blue-600" />
            Amount breakdown
          </h2>
        </div>
        <div className="divide-y divide-gray-100 px-6">
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">Booth number</span>
            <span className="font-medium text-gray-900">{data?.boothNumber || '—'}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">Stall type</span>
            <span className="font-medium text-gray-900">
              {data?.boothType === 'shell-space'
                ? 'Shell space'
                : data?.boothType === 'raw-space'
                  ? 'Raw space'
                  : data?.boothType || '—'}
            </span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">Stall cost</span>
            <span className="font-medium text-gray-900">{formatINR(data?.stallCost || 0)}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">Discount</span>
            <span className="font-medium text-gray-900">- {formatINR(data?.discount || 0)}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">Stall cost − discount</span>
            <span className="font-medium text-gray-900">{formatINR(data?.afterDiscount || 0)}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-gray-500">GST ({data?.gstPercent || 18}%)</span>
            <span className="font-medium text-gray-900">{formatINR(data?.gstAmount || 0)}</span>
          </div>
          <div className="flex justify-between py-4 text-base font-semibold">
            <span className="text-gray-900">Final amount</span>
            <span className="text-blue-700">{formatINR(data?.finalAmount || 0)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">Payment schedule</h2>
        <div className="mt-4 space-y-3">
          {(data?.paymentPhases || []).map((phase) => (
            <div key={phase.phase} className="flex flex-col gap-2 rounded-lg bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {phase.label} · {phase.percent}%
                </p>
                <p className="text-xs text-gray-500">Due {formatPhaseDate(phase.dueDate)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">{formatINR(phase.amount)}</span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                    statusStyles[phase.status] || statusStyles.pending
                  }`}
                >
                  {phase.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Suspense fallback={null}>
            <StallPhaseCheckout
              phases={data?.paymentPhases || []}
              returnPath="/dashboard/payment/stall"
              onUpdated={load}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
