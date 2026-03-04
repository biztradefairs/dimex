import React from "react"
import Link from "next/link"
import Image from "next/image"
import SectionContainer from "../UI/SectionContainer"

const ExhibitorsSection = () => {
  return (
    <SectionContainer className="py-16 lg:py-24">
      {/* Heading */}
      <h2 className="title-72 text-black mb-6">
        A Glimpse of Our Past Exhibitors
      </h2>

      <p className="title-40 font-semibold text-gray-700 mb-12 lg:mb-16">
        Participating in DIEMEX Boosts Your Business Growth and Visibility
      </p>

      {/* Single Banner Image with All Logos */}
      <div className="relative w-full mb-12 lg:mb-16 overflow-hidden rounded-2xl shadow-xl">
        <div className="relative w-full h-auto">
          <Image
            src="/images/conference/venue/registration.webp" // Update this path to your banner image
            alt="Our Past Exhibitors Banner"
            width={1200}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
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