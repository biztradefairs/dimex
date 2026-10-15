'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogsError({ reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [retrying, startTransition] = useTransition();

  const retry = () => {
    startTransition(() => {
      // A server-component fetch failure needs a fresh server render as well as a boundary reset.
      router.refresh();
      reset();
    });
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-[#082856]">We couldn’t load the blogs</h1>
      <p className="mt-3 text-slate-600">Please try again in a moment.</p>
      <button type="button" onClick={retry} disabled={retrying} aria-busy={retrying}
        className="mt-6 rounded-lg bg-[#004A96] px-6 py-3 font-semibold text-white disabled:opacity-60">
        {retrying ? 'Retrying…' : 'Try again'}
      </button>
    </section>
  );
}
