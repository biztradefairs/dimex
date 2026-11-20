"use client"

import Image from "next/image"
import Link from "next/link"
import { FaLinkedin } from "react-icons/fa"
import { partners } from "@/components/section/PartnersSection"

const orderedPartners = [...partners].sort(
  (first, second) => Number(Boolean(second.linkedin)) - Number(Boolean(first.linkedin))
)

export default function ParticipantsPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb] font-parabolica">
      <section className="bg-[#004A96] pt-12 pb-14 sm:pt-16 sm:pb-16">
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
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {orderedPartners.map((partner) => {
            const logoPanel = (
              <>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  width={200}
                  height={120}
                  className="h-20 w-32 max-w-full object-contain sm:h-24 sm:w-40 md:h-28 md:w-48"
                />
              </>
            )
            const panelClassName = "flex flex-1 flex-col items-center justify-center rounded-2xl bg-white p-4 sm:p-6"

            return (
              <li
                key={partner.name}
                className="group flex h-full flex-col rounded-2xl border border-[#004A96] bg-gradient-to-l from-[#004A96] to-[#003875] shadow-[0px_18px_20px_0px_#004A9633] transition-shadow duration-300 hover:shadow-[0px_18px_25px_0px_#004A9680]"
              >
                {partner.link ? (
                  <Link
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${partner.name} website`}
                    className={`${panelClassName} outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#004A96]`}
                  >
                    {logoPanel}
                  </Link>
                ) : (
                  <div className={panelClassName}>{logoPanel}</div>
                )}

                <div className="mt-auto flex min-h-14 items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">
                  {partner.link ? (
                    <Link
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View details for ${partner.name}`}
                      className="inline-flex min-h-9 items-center rounded text-[10px] text-white underline-offset-4 outline-none hover:underline hover:decoration-[#E0161D] focus-visible:ring-2 focus-visible:ring-white sm:text-xs md:text-sm"
                    >
                      View Details
                    </Link>
                  ) : (
                    <span aria-disabled="true" className="text-[10px] text-white/50 sm:text-xs md:text-sm">
                      View Details
                    </span>
                  )}

                  {partner.linkedin && (
                    <a
                      href={partner.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${partner.name} on LinkedIn`}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded text-white outline-none transition hover:bg-[#E0161D] focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <FaLinkedin aria-hidden="true" className="h-6 w-6 sm:h-7 sm:w-7" />
                    </a>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
