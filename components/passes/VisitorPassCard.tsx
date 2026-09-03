'use client';

import { CheckCircle2, QrCode } from 'lucide-react';
import type { VisitorPass } from '@/lib/api/passes';

type VisitorPassCardProps = {
  pass: VisitorPass;
  cardId?: string;
};

export default function VisitorPassCard({ pass, cardId = 'visitor-pass-card' }: VisitorPassCardProps) {
  const initial = (pass.name || 'V').trim().charAt(0).toUpperCase();

  return (
    <article
      id={cardId}
      className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,47,92,0.18)]"
    >
      <div className="flex items-center justify-between bg-gradient-to-r from-[#0F766E] to-[#16A34A] px-5 py-3 text-white">
        <p className="text-xs font-black tracking-[0.22em]">VISITOR PASS</p>
        <QrCode className="h-4 w-4 opacity-80" />
      </div>

      <div className="px-6 pb-6 pt-5 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-2xl font-black text-white shadow-lg shadow-emerald-600/20">
          {initial}
        </div>
        <h3 className="mt-3 text-xl font-black capitalize text-slate-900">{pass.name}</h3>
        <p className="text-sm font-medium text-slate-500">{pass.company}</p>
        {pass.location ? (
          <p className="mt-1 text-xs text-slate-400">{pass.location}</p>
        ) : null}

        <div className="relative mx-auto mt-5 w-[210px]">
          <img
            src={pass.qrDataUrl}
            alt="Visitor pass QR code"
            className="h-[210px] w-[210px] rounded-2xl border border-slate-100 bg-white p-2"
          />
          <span className="pointer-events-none absolute left-3 right-3 top-1/2 h-0.5 -translate-y-1/2 bg-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
        </div>

        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Scan at entry
        </p>
        <p className="mt-1 font-mono text-[11px] font-semibold text-slate-600">
          {pass.registrationNumber}
        </p>
        <p className="mt-4 text-sm font-semibold text-slate-800">{pass.event.name}</p>
        <p className="text-xs text-slate-500">{pass.event.venue}</p>
        <p className="text-xs text-slate-400">{pass.event.dates}</p>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Visitor
        </div>
      </div>
    </article>
  );
}
