'use client'

import Link from 'next/link'
import Button from '@/components/UI/Button'

export default function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[550px] lg:h-[600px] w-full overflow-hidden text-white">
      {/* ================= BACKGROUND IMAGE ================= */}
      <div className="absolute inset-0 bg-black">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/diemex-hero-image.jpg')`, // Replace with your actual image path
          }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex h-full w-full items-end px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1440px] pb-6 md:pb-10 lg:pb-16">
          {/* Heading */}
          <h1 className="font-parabolica text-[32px] font-bold leading-[0.85] tracking-tight sm:text-[48px] md:text-[80px] lg:text-[100px] xl:text-[160px]">
            CONFERENCE
          </h1>

          {/* Sub content */}
          <div className="mt-4 md:mt-6 flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <h2 className="mb-2 md:mb-3 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">
            

              </h2>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                Driving Precision, Performance & Sustainability in Tooling and Plastics
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 lg:mt-0 lg:ml-auto flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                onClick={() => window.location.href = '/became-delegate'}
                className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 lg:px-10 lg:py-4"
              >
                Become a delegate
              </Button>

              <Link href="/become-partner">
                <button className="relative z-50 rounded-full bg-[#004D9F] px-6 py-3 md:px-8 md:py-3 lg:px-10 lg:py-4 text-sm md:text-base lg:text-lg font-semibold transition hover:scale-105 hover:shadow-2xl hover:shadow-[#33A8DF]/40">
                  Become a partner
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}