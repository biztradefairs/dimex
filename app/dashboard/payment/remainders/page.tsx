'use client';

import { useEffect, useState } from 'react';
import { CalendarDaysIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { dashboardAPI } from '@/lib/api/exhibitors';
import { formatINR, formatPhaseDate, type StallPayment } from '@/lib/stallPayment';

type PaymentData = StallPayment & { boothNumber?: string; company?: string };

const statusStyles: Record<string, string> = {
  paid: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  overdue: 'bg-red-50 text-red-700',
};

export default function PaymentRemaindersPage() {
  const [data, setData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dashboardAPI
      .getPayment()
      .then(setData)
      .catch((err) => setError(err.message || 'Failed to load payment remainders'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="mt-3 text-gray-600">Loading payment remainders...</p>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>;
  }

  const paid = (data?.paymentPhases || [])
    .filter((phase) => phase.status === 'paid')
    .reduce((sum, phase) => sum + (phase.amount || 0), 0);
  const remaining = (data?.finalAmount || 0) - paid;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Remainders</h1>
        <p className="mt-1 text-sm text-gray-500">
          Initial 30%, 2nd 40%, and 3rd 30% with dates set by the organiser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Final amount</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{formatINR(data?.finalAmount || 0)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="mt-2 text-2xl font-bold text-green-700">{formatINR(paid)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Remaining</p>
          <p className="mt-2 text-2xl font-bold text-blue-700">{formatINR(remaining)}</p>
        </div>
      </div>

      <div className="space-y-4">
        {(data?.paymentPhases || []).map((phase) => (
          <div key={phase.phase} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {phase.phase === 1 ? '1st' : phase.phase === 2 ? '2nd' : '3rd'} · {phase.label}
                </p>
                <p className="mt-1 text-sm text-gray-500">{phase.percent}% of final amount</p>
              </div>
              <span
                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  statusStyles[phase.status] || statusStyles.pending
                }`}
              >
                {phase.status === 'paid' && <CheckCircleIcon className="mr-1 h-4 w-4" />}
                {phase.status === 'pending' && <ClockIcon className="mr-1 h-4 w-4" />}
                {phase.status === 'overdue' && <ExclamationTriangleIcon className="mr-1 h-4 w-4" />}
                {phase.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarDaysIcon className="h-4 w-4" />
                  Due date
                </p>
                <p className="mt-1 font-medium text-gray-900">{formatPhaseDate(phase.dueDate)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-xs text-gray-500">Amount</p>
                <p className="mt-1 font-medium text-gray-900">{formatINR(phase.amount)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
