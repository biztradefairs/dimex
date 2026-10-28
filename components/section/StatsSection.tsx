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
          <h1 className="text-[56px] leading-[1.1] font-bold text-black mb-6">
            India’s International Die & Mould Exhibition
          </h1>

          <p className="text-lg leading-relaxed text-black/80 max-w-8xl mb-10">
            DIEMEX is India’s international exhibition for die and mould manufacturing, organised by Maxx Business Media Pvt. Ltd. It brings toolmakers, OEMs, suppliers and buyers together under one roof to discover technology, compare solutions and do business. The next edition, DIEMEX 2027, takes place on 24-26 March 2027 in Pune.
          </p>


          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/register?t=visitor"
              className="inline-block rounded-full bg-[#004A96] px-10 py-4 text-white font-semibold text-base transition hover:bg-[#003875]"
            >
              Register Free
            </Link>

            <Link
              href="/register?t=exhibitor"
              className="inline-block rounded-full bg-[#004A96] px-10 py-4 text-white font-semibold text-base transition hover:bg-[#003875]"
            >
              Book a Stall
            </Link>
          </div>



        </div>
      </SectionContainer>

      {/* STATS BAR – TRUE FULL WIDTH */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F3F8FC] py-10">
        <SectionContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-[52px] font-bold text-[#004A96] mb-2">
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
