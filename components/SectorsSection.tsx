"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import SectionContainer from "./UI/SectionContainer"

const sectors = [
  {
    title: "Precision Die & Mould Solutions",
    slug: "precision-moulds",
    image: "/images/precision.jpg",
    description:
      "Comprehensive die & mould manufacturing, tooling systems, design engineering, and end-to-end production solutions supporting high-precision industrial applications.",
  },
  {
    title: "Tooling, Mould Bases & Standard Components",
    slug: "tooling-mould-base",
    image: "/images/mouldbase.jpg",
    description:
      "High-quality mould bases, precision components, hot runner systems, and standard tooling elements supporting efficient and reliable die & mould production.",
  },
  {
    title: "Machining & Finishing Technologies",
    slug: "machining-finishing",
    image: "/images/finishing.jpg",
    description:
      "High-precision CNC machining, EDM, wire-cut, surface finishing, and polishing solutions for toolroom operations.",
  },
  {
    title: "Automation & Industry 4.0 Solutions",
    slug: "automation-industry",
    image: "/images/automation.jpg",
    description:
      "Smart automation, robotics, digital manufacturing, and smart factory technologies for modern die & mould production.",
  },
  {
    title: "Design, CAD/CAM & Engineering Software",
    slug: "cad-cam",
    image: "/images/cad.jpg",
    description:
      "Advanced design, simulation, and manufacturing software enabling accurate tooling development and reduced time-to-market.",
  },
  {
    title: "Tool Steel & Advanced Materials",
    slug: "tool-steel",
    image: "/images/toolsteel.jpg",
    description:
      "High-performance tool steels, alloy steels, special metals, and advanced materials engineered for durability, precision, and long tool life.",
  },
]

export default function SectorsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <SectionContainer>
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#004D9F]">
              Sectors
            </p>
            <h2 className="font-parabolica text-[32px] font-black leading-[1.05] tracking-tight text-[#06162F] sm:text-4xl lg:text-[44px] xl:text-5xl">
              Discover in-demand product sectors at DIEMEX
            </h2>
          </div>

          <Link
            href="/sectors"
            className="inline-flex w-fit items-center gap-2 bg-[#004D9F] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#003d7f]"
          >
            Explore Sectors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {sectors.map((sector, i) => (
            <Link
              key={sector.slug}
              href={`/sectors/${sector.slug}`}
              className="group relative block h-[340px] overflow-hidden sm:h-[380px] lg:h-[420px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${sector.image})` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06162F] via-[#06162F]/55 to-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#06162F]/95 via-[#004D9F]/80 to-[#82C6EB]/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                <span className="mb-3 font-parabolica text-sm font-black text-[#82C6EB]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-parabolica text-xl font-bold leading-snug text-white lg:text-2xl">
                  {sector.title}
                </h3>
                <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  {sector.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#82C6EB] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Explore Sector
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
