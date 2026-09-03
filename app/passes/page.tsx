'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function PassesLandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F8FC]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,47,92,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,47,92,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-sky-200/60 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Registration Open for DIEMEX 2026
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Your Digital Visitor Badge In Seconds.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Register for DIEMEX, receive your QR-coded visitor pass instantly via WhatsApp or SMS, and walk into the exhibition hassle-free.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-600">
            {[
              ['1', 'Register'],
              ['2', 'Get Badge'],
              ['3', 'Walk In'],
            ].map(([step, label], index) => (
              <div key={step} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F2F5C] text-xs font-bold text-white">
                  {step}
                </span>
                <span>{label}</span>
                {index < 2 ? <ArrowRight className="h-4 w-4 text-slate-300" /> : null}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/passes/register"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4F46E5] via-[#2563EB] to-[#0EA5E9] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition hover:brightness-110"
            >
              <QrCode className="h-4 w-4" />
              Register Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              Learn How It Works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-5 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-indigo-500" />
              Secure & Private
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              Instant Badge
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              Free Registration
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[380px]">
          <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-indigo-200/70 via-sky-100 to-pink-100 blur-2xl" />
          <article className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-indigo-300/40 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-black tracking-[0.24em] text-slate-400"># VISITOR PASS</p>
              <Smartphone className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-lg font-black text-white">
                V
              </div>
              <div>
                <p className="font-bold text-slate-900">Your Name</p>
                <p className="text-xs text-slate-500">Company / Organization</p>
              </div>
            </div>
            <div className="relative mx-auto mt-6 w-[220px]">
              <div className="aspect-square rounded-2xl bg-[repeating-conic-gradient(#0F2F5C_0_25%,#fff_0_50%)] bg-[length:18px_18px] p-4">
                <div className="flex h-full items-center justify-center rounded-xl bg-white">
                  <QrCode className="h-24 w-24 text-slate-900" />
                </div>
              </div>
              <span className="pointer-events-none absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,1)]" />
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">
              Scan at entry for instant check-in.
            </p>
            <div className="mt-5 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">DIEMEX 2026</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified Visitor
              </span>
            </div>
          </article>
        </div>
      </div>

      <section id="how-it-works" className="relative border-t border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-3 lg:px-8">
          {[
            {
              icon: Smartphone,
              title: 'Verify by SMS or WhatsApp',
              text: 'Enter your mobile number, choose a channel, and confirm with a 4-digit OTP.',
            },
            {
              icon: ShieldCheck,
              title: 'Complete a short form',
              text: 'Add your name, company and interests so we can issue a personalised visitor pass.',
            },
            {
              icon: QrCode,
              title: 'Get the badge on your phone',
              text: 'Your QR pass is sent to the same number by WhatsApp or SMS, ready for entry.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <item.icon className="h-6 w-6 text-[#1E5AA6]" />
              <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
