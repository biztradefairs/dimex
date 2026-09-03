'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type PassesChromeProps = {
  backHref?: string;
  backLabel?: string;
};

export default function PassesChrome({
  backHref = '/',
  backLabel = 'Back to Home',
}: PassesChromeProps) {
  return (
    <header className="absolute left-0 right-0 top-0 z-20 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white">
          <span className="rounded-full border border-white/20 bg-white/10 p-1.5">
            <ArrowLeft className="h-4 w-4" />
          </span>
          {backLabel}
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-black text-[#0F2F5C]">
            D
          </div>
          <span className="hidden text-sm font-bold text-white sm:inline">DIEMEX 2026</span>
        </div>
      </div>
    </header>
  );
}
