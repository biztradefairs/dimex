import React from "react"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

const ExhibitorsSection = () => {
  const exhibitors = [
    ".",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]

  return (
    <SectionContainer className="py-16 lg:py-24">
      {/* Heading */}
      <h2 className="title-72 text-black mb-6">
        A Glimpse of Our 2026 Exhibitors
      </h2>

      <p className="title-40 font-semibold text-gray-700 mb-12 lg:mb-16">
        Participating in DIEMEX Boosts Your Business Growth and Visibility
      </p>

      {/* Exhibitors Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-12 lg:mb-16">
        {exhibitors.map((exhibitor, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 flex items-center justify-center min-h-[100px] transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-mainColor2"
          >
            <span className="text-gray-800 font-medium text-sm md:text-base text-center">
              {exhibitor}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <Link href="/exhibition-directory" target="_blank" rel="noopener noreferrer">
          <button className="group flex items-center gap-3 rounded-full px-10 py-4 text-[18px] font-semibold bg-[#004D9F] text-white transition hover:bg-mainColor4 hover:shadow-xl">
            View Our 2026 Exhibitor List
          </button>
        </Link>
      </div>
    </SectionContainer>
  )
}

export default ExhibitorsSection
