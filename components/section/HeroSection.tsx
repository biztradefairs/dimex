import React from "react"
import SectionContainer from "@/components/UI/SectionContainer"

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-end">
      {/* BACKGROUND IMAGE - Full Width */}
      <img
        src="https://cdn.itegroupnews.com/photorealistic_scene_with_warehouse_logistics_operations_bf55208e3d.jpg"
        alt="TransRussia©24"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* GRADIENT (BOTTOM ONLY) */}
      <div className="absolute bottom-0 h-[45%] w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* CONTENT with SectionContainer */}
      <SectionContainer className="relative z-10">
        <div className="flex h-full items-end">
          <div className="pb-25 text-white">
            <h2 className="title-72">About DIEMEX 2026</h2>
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