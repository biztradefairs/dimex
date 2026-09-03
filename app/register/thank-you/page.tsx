'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Mail } from 'lucide-react';
import { isValidRegistrationTab, type RegistrationTab } from '@/lib/registrationRoutes';
import { readThanksSession } from '@/lib/submitRegistration';

const COPY: Record<RegistrationTab, { title: string; body: string }> = {
  enquiry: {
    title: 'Thank you for registering to visit',
    body: 'Your visitor enquiry is confirmed. A thank-you email is on its way, and our team will follow up shortly.',
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
    body: 'Thanks for requesting the DIEMEX 2026 brochure. The download link will arrive in your email shortly.',
  },
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('there');
  const [tab, setTab] = useState<RegistrationTab>('enquiry');

  useEffect(() => {
    const session = readThanksSession();
    const queryTab = searchParams.get('t');
    const queryName = searchParams.get('name');

    if (isValidRegistrationTab(queryTab)) setTab(queryTab);
    else if (session?.tab) setTab(session.tab);

    const resolved = queryName || session?.name;
    if (resolved) setName(resolved);
  }, [searchParams]);

  const copy = useMemo(() => COPY[tab], [tab]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F4FAFF] px-4 py-28">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[#0F2F5C]">{copy.title}</h1>
        <p className="mt-3 text-base text-slate-600">
          Dear {name}, {copy.body}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800">
          <Mail className="h-4 w-4" />
          Please check your email for the thank-you message
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-[#004D9F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#003d7f]"
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
