"use client"

import Link from "next/link"
import { partners } from "@/components/section/PartnersSection"

export default function ParticipantsPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] font-parabolica">
      <section className="bg-[#004A96] pt-36 pb-14 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <p className="text-[12px] font-bold tracking-[0.22em] text-white/70 uppercase">
            DIEMEX 2027
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">Participants</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Exhibitors taking part in the International Exhibition.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <ul className="grid grid-cols-4 gap-3 sm:gap-5">
          {partners.map((partner) => (
            <li key={partner.name}>
              <Link
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[88px] items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:h-[160px] sm:rounded-2xl sm:p-5"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
