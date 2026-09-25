'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircleIcon } from '@heroicons/react/24/outline';
import CashfreePayment from '@/components/CashfreePayment';
import { dashboardAPI } from '@/lib/api/exhibitors';
import { formatINR, nextUnpaidPhase, type PaymentPhase } from '@/lib/stallPayment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function StallPhaseCheckout({
  phases,
  returnPath,
  onUpdated,
}: {
  phases: PaymentPhase[];
  returnPath: string;
  onUpdated: () => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const started = useRef('');
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const payable = nextUnpaidPhase(phases);

  const finalize = useCallback(
    async (orderId: string, paymentId?: string) => {
      setBusy(true);
      try {
        const token = localStorage.getItem('exhibitor_token') || localStorage.getItem('token');
        await fetch(`${API_BASE_URL}/api/cashfree/verify-payment/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        try {
          await dashboardAPI.confirmStallPayment({ orderId, paymentId });
        } catch {
          /* webhook may already have saved the phase */
        }
        setMessage('Payment saved on Stall Payment. Next remainder dates are updated.');
        setOpen(false);
        onUpdated();
        router.replace(returnPath);
      } catch (err: any) {
        setMessage(err.message || 'Could not record stall payment');
        onUpdated();
      } finally {
        setBusy(false);
      }
    },
    [onUpdated, returnPath, router]
  );

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    if (!orderId || started.current === orderId) return;
    started.current = orderId;
    finalize(orderId);
  }, [finalize, searchParams]);

  if (!payable || payable.amount < 1) {
    return message ? <p className="text-sm text-green-700">{message}</p> : null;
  }

  const requirementId = `stall-phase-${payable.phase}`;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="space-y-3">
      {busy && <p className="text-sm text-[#004A96]">Confirming stall payment...</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-[#004A96] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#003875]"
      >
        Pay {payable.label} · {formatINR(payable.amount)}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h3 className="font-semibold text-gray-900">{payable.label}</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
            <CashfreePayment
              invoiceId={requirementId}
              requirementsId={requirementId}
              amount={payable.amount}
              invoiceLabel={payable.label}
              returnUrl={`${origin}${returnPath}?payment_status=success&order_id={order_id}`}
              onSuccess={({ orderId, paymentId }) => {
                finalize(orderId, paymentId);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
