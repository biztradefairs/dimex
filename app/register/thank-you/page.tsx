'use client';

import { Suspense, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Mail } from 'lucide-react';
import { resolveRegistrationTab, type RegistrationTab } from '@/lib/registrationRoutes';
import {
  readThanksSession, readRegistrationStatus, subscribeRegistrationUpdates,
} from '@/lib/submitRegistration';

const COPY: Record<RegistrationTab, { title: string; body: string }> = {
  visitor: {
    title: 'Thank you for registering to visit',
    body: 'Your visitor registration is confirmed. A thank-you email is on its way, and our team will follow up shortly.',
  },
  exhibitor: {
    title: 'Thank you for your exhibiting enquiry',
    body: 'We have received your stand enquiry. Check your inbox for confirmation — our sales team will contact you soon.',
  },
  sponsor: {
    title: 'Thank you for your partnership interest',
    body: 'Your sponsor / partner request is in. A confirmation email is being sent, and our partnerships team will reach out.',
  },
  brochure: {
    title: 'Your brochure request is on its way',
    body: 'Thanks for requesting the DIEMEX 2027 brochure. The download link will arrive in your email shortly.',
  },
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const session = useSyncExternalStore(subscribeRegistrationUpdates, readThanksSession, () => null);
  const submission = useSyncExternalStore(subscribeRegistrationUpdates, readRegistrationStatus, () => null);
  const tab = resolveRegistrationTab(searchParams.get('t')) ||
    resolveRegistrationTab(session?.tab ?? null) || 'visitor';
  const name = searchParams.get('name') || session?.name || 'there';
  const copy = COPY[tab];
  const currentSubmission = submission?.tab === tab ? submission : null;
  const body = currentSubmission?.status === 'error'
    ? currentSubmission.message
    : currentSubmission?.status === 'pending'
      ? 'Your details are being processed. Your confirmation email will follow shortly.'
      : copy.body;

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#004A96] px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[#004A96]">{copy.title}</h1>
        <p className="mt-3 text-base text-slate-600">
          Dear {name}, {body}
        </p>
        <p role="status" aria-live="polite" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#E8F1F8] px-4 py-2 text-sm font-medium text-[#004A96]">
          <Mail className="h-4 w-4" />
          {currentSubmission?.status === 'pending'
            ? 'Completing your registration...'
            : currentSubmission?.status === 'error'
              ? 'Please contact our team for help'
              : 'Please check your email for the thank-you message'}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-[#004A96] px-6 py-3 text-sm font-semibold text-white hover:bg-[#003875]"
          >
            Back to Home
          </Link>
          <Link
            href={`/register?t=${tab}`}
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Submit another form
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function RegisterThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-slate-500">Loading…</div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
