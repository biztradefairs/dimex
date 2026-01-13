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

        <p className="max-w-5xl text-base leading-relaxed text-black/80 mb-10">
          Transport and Logistics Congress “TransRussia 2025” – 6 industry
          conferences featuring only the most useful and relevant information
          to solve your business problems. Trends and prospects for the
          development of the transport and logistics industry, best practices,
          exchange of real experience, Russian and international speakers and
          experts.
          <br /><br />
          Attendance at all events of the conference programme is free with a
          ticket to the exhibition, which can be obtained with the promo code
          <strong> “tr25CDPTR”</strong>.
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
