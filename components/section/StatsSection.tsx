import React from "react"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

const StatsSection = () => {
  const stats = [
    { value: "10,000", label: "Visitors" },
    { value: "200+", label: "Exhibitors" },
    { value: "5+", label: "Countries" },
    { value: "10", label: "Event Sectors" },
  ]

  return (
    <section className="relative z-[1] bg-white mt-10">
      {/* CONTENT */}
      <SectionContainer className="pt-24 pb-16">
        <div className="max-w-10xl">
          <h2 className="text-[56px] leading-[1.1] font-bold text-black mb-6">
            Shaping the Future of Die & Mould Manufacturing
          </h2>

          <p className="text-lg leading-relaxed text-black/80 max-w-8xl mb-10">
            DIEMEX is India’s leading die & mould and tooling exhibition, bringing together top manufacturers, toolrooms, 
            material suppliers, and advanced manufacturing technology providers across the entire precision manufacturing value chain.
          </p>

  <p className="text-lg leading-relaxed text-black/80 max-w-8xl mb-10">
            The 2026 edition, to be held from 8–10 October 2026 at the Auto Cluster Exhibition Centre, Pune, 
            India, will serve as a focused platform for showcasing cutting-edge tooling technologies, design and 
            engineering solutions, automation, materials, and Industry 4.0 innovations to a highly qualified audience of industry decision-makers.
          </p>
          <Link href="/why-exhibit">
            <button className="rounded-full bg-[#004D9F] px-10 py-4 text-white font-semibold text-base transition hover:bg-[#083E82]">
              Why Exhibit
            </button>
          </Link>
        </div>
      </SectionContainer>

{/* STATS BAR – TRUE FULL WIDTH */}
<div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F3F8FC] py-10">
  <SectionContainer>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
      {stats.map((stat, index) => (
        <div key={index}>
          <h3 className="text-[52px] font-bold text-[#004D9F] mb-2">
            {stat.value}
          </h3>

          <p className="text-base text-black/80 mb-4">
            {stat.label}
          </p>

          <div className="h-px w-36 bg-black/10" />
        </div>
      ))}
    </div>
  </SectionContainer>
</div>


    </section>
  )
}

export default StatsSection
