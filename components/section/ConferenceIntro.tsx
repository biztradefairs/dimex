"use client"

import Link from "next/link"
import SectionContainer from "@/components/UI/SectionContainer"

const ConferenceIntro = () => {
  return (
    <section className="bg-[#f3f9fd] py-20">
      <SectionContainer>
        <h1 className="text-[56px] font-extrabold text-black mb-4 mt-10">
          Conference Programme
        </h1>

        <p className="text-sm uppercase tracking-wide text-black/70">
          Transport and Logistics Congress
        </p>
      </SectionContainer>
    </section>
  )
}

export default ConferenceIntro
