"use client"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

const ConferenceOverview = () => {
  return (
    <section className="bg-white py-20">
      <SectionContainer>
        <h2 className="text-[48px] font-bold text-black mb-6">
          Innovate Through Knowledge
        </h2>

       <p className="max-w-9xl text-base leading-relaxed text-black/80 mb-10">
  The <strong>DIEMEX 2026 Conference</strong> features a series of high-impact industry sessions delivering practical insights and forward-looking strategies for the die & mould, tooling, and precision manufacturing sectors. 

  Industry leaders, technology innovators, and international experts will share trends, best practices, case studies, and real-world applications shaping the future of advanced manufacturing in India and globally.
  <br /><br />
  Attendance to all conference sessions is complimentary for registered exhibition visitors.
</p>

        {/* <Link
          href="/conference-programme/download"
          className="inline-flex items-center rounded-full bg-[#004aad] px-8 py-4 text-white font-semibold transition hover:bg-[#003a87]"
        >
          Download 2025 Conference Programme Schedule
        </Link> */}
      </SectionContainer>
    </section>
  )
}

export default ConferenceOverview
