import React from "react"
import SectionContainer from "@/components/UI/SectionContainer"

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND IMAGE - Full Width */}
      <img
        src="/images/about-header.jpg"
        alt="Diemex©2027"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* GRADIENT (BOTTOM ONLY) */}
      <div className="absolute bottom-0 h-[45%] w-full bg-gradient-to-t from-[#004A96]/90 via-[#004A96]/40 to-transparent" />

      {/* CONTENT with SectionContainer */}
      <SectionContainer className="relative z-10">
        <div className="pt-12 pb-8 sm:pt-14">
          <div className="text-white">
            <h2 className="title-72">About DIEMEX 2027</h2>
            <p className="mt-4 max-w-6xl text-lg">
              
              Shaping the Future of Die & Mould Manufacturing.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}

export default HeroSection