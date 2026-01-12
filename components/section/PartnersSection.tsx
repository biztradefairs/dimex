"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer" // Adjust import path as needed

const PartnersSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  const isPausedRef = useRef(false)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const partners = [
    { name: "Apace Digital Cargo", logo: "/images/image.png", link: "/partner/apace-digital-cargo" },
    { name: "Cargo Insights", logo: "/images/image.png", link: "/partner/cargo-insights" },
    { name: "International Coordinating Council for Trans-Eurasian Transportation", logo: "/images/image.png", link: "/partner/international-coordinating-council-for-trans-eurasian-transportation" },
    { name: "LOGIRUS", logo: "/LOGIRUS_34da1707d5.webp", link: "/partner/logirus" },
    { name: "CargoTalk", logo: "/images/image.png", link: "/partner/cargo-talk" },
    { name: "Logistics 360 Magazine", logo: "/images/image.png", link: "/partner/logistics-360-magazine" },
    { name: "BizToday", logo: "/images/image.png", link: "/partner/trans-russia-partner-1" },
    { name: "Logistics.ru", logo: "/images/image.png", link: "/partner/logistics-ru" },
    { name: "TravTalkME", logo: "/images/image.png", link: "/partner/trav-talk-me" },
    { name: "The Council of Supply Chain Professionals", logo: "/images/image.png", link: "/partner/the-council-of-supply-chain-professionals" },
    { name: "Moneta Tanitim", logo: "/images/image.png", link: "/partner/trans-russia-partner-Moneta-Tanitim" },
    { name: "Utikad", logo: "/images/image.png", link: "/partner/utikad" },
    { name: "VTB", logo: "/images/image.png", link: "/partner/vtb" },
    { name: "Urban Transport News", logo: "/images/image.png", link: "/partner/trans-russia-partner-2" },
    { name: "WIFFA", logo: "/images/image.png", link: "/partner/trans-russia-partner-WIFFA" },
    { name: "UND", logo: "/images/image.png", link: "/partner/und" },
    { name: "RZD-Partner", logo: "/images/image.png", link: "/partner/rzd-partner" },
    { name: "RZD Business Asset", logo: "/images/image.png", link: "/partner/rzd-business-asset" },
    { name: "Asia MH", logo: "/images/image.png", link: "/partner/asia-mh" },
    { name: "The Business Year", logo: "/images/image.png", link: "/partner/the-business-year" },
    { name: "ICIB", logo: "/images/image.png", link: "/partner/trans-russia-partner-3" },
    { name: "ATI.SU", logo: "/images/image.png", link: "/partner/ati-su" },
    { name: "ACU Logo", logo: "/images/image.png", link: "/partner/acu-logo" }

  ]

  // Duplicate partners for seamless loop (we need enough duplicates to fill the gap)
  const duplicatedPartners = [...partners, ...partners, ...partners]

  /* ---------------- FIXED AUTO SCROLL ---------------- */
  useEffect(() => {
    if (!sliderRef.current) return

    let animationId: number
    let lastTime = 0
    const scrollSpeed = 0.8 // Adjust speed here

    const autoScroll = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const elapsed = timestamp - lastTime
      
      if (elapsed > 16 && !isPausedRef.current && sliderRef.current) { // ~60fps
        const slider = sliderRef.current
        const maxScroll = slider.scrollWidth - slider.clientWidth
        
        // Check if we've scrolled past the original content
        if (slider.scrollLeft >= partners.length * 280) { // 280px per item
          // Smoothly reset to start without jumping
          slider.scrollLeft = slider.scrollLeft - (partners.length * 280)
        } else {
          // Normal scrolling
          slider.scrollLeft += scrollSpeed
        }
        
        lastTime = timestamp
      }
      
      animationId = requestAnimationFrame(autoScroll)
    }

    animationId = requestAnimationFrame(autoScroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [partners.length]) // Add partners.length as dependency

  /* ---------------- DRAG HANDLERS ---------------- */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    isPausedRef.current = true
    
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    setStartX(e.clientX - rect.left)
    setScrollLeft(slider.scrollLeft)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()
    const x = e.clientX - rect.left
    const walk = (x - startX) * 1.5 // Adjust drag sensitivity
    slider.scrollLeft = scrollLeft - walk
  }

  const stopDragging = () => {
    setIsDragging(false)
    // Resume auto scroll after a short delay
    setTimeout(() => {
      isPausedRef.current = false
    }, 300)
  }

  return (
    <SectionContainer>
      <div className="space-y-10 py-10">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-4xl font-bold text-black lg:text-6xl">
            Partners & Sponsors
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Gradient overlay for smooth edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-white to-transparent" />

          {/* Scrollable Container */}
          <div
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseOut={() => (isPausedRef.current = false)}
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <div className="flex items-stretch min-w-max">
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="min-w-[280px] px-4" // Fixed width for consistent items
                >
                  <Link
                    href={partner.link}
                    className="group flex w-full flex-col items-center gap-5 text-center transition-transform hover:scale-[1.02]"
                  >
                    <div className="h-40 w-full overflow-hidden rounded-lg bg-white px-8 py-6 shadow-lg transition-all group-hover:shadow-xl">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={160}
                        height={160}
                        draggable={false}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/placeholder-logo.png" // Add a fallback
                        }}
                      />
                    </div>
                    <small className="text-sm font-medium text-gray-700 line-clamp-2">
                      {partner.name}
                    </small>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SectionContainer>
  )
}

export default PartnersSection