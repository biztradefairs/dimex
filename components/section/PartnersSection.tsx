"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

type Partner = {
  name: string
  logo: string
  link: string
}

const PartnersSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number | null>(null)
  const isPausedRef = useRef(false)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const partners: Partner[] = [
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

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners]

  /* ---------------- FIXED AUTO SCROLL ---------------- */
  useEffect(() => {
    if (!sliderRef.current) return

    let animationId: number
    let lastTime = 0
    const scrollSpeed = 0.8

    const autoScroll = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const elapsed = timestamp - lastTime
      
      if (elapsed > 16 && !isPausedRef.current && sliderRef.current) {
        const slider = sliderRef.current
        const itemWidth = 320 // Updated to match new card width
        const maxScroll = slider.scrollWidth - slider.clientWidth
        
        // Check if we've scrolled past the original content
        if (slider.scrollLeft >= partners.length * itemWidth) {
          // Smoothly reset to start without jumping
          slider.scrollLeft = slider.scrollLeft - (partners.length * itemWidth)
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
  }, [partners.length])

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
    const walk = (x - startX) * 1.5
    slider.scrollLeft = scrollLeft - walk
  }

  const stopDragging = () => {
    setIsDragging(false)
    setTimeout(() => {
      isPausedRef.current = false
    }, 300)
  }

  // Function to truncate text to a maximum number of words
  const truncateText = (text: string, maxWords: number = 5) => {
    const words = text.split(' ')
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
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
            className="overflow-x-auto scrollbar-hide select-none cursor-grab active:cursor-grabbing py-4"
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
                  className="min-w-[320px] max-w-[320px] px-4 flex-shrink-0" // Fixed width for all cards
                >
                  <Link
                    href={partner.link}
                    className="group flex w-full flex-col items-center text-center transition-all hover:scale-[1.02] h-full"
                  >
                    {/* Card Container */}
                    <div className="w-full rounded-lg bg-white shadow-lg transition-all group-hover:shadow-xl overflow-hidden border border-gray-100">
                      {/* Logo Container - Fixed Height */}
                      <div className="h-48 w-full bg-gray-50 flex items-center justify-center p-6">
                        <div className="relative h-32 w-full">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            draggable={false}
                            className="object-contain p-2"
                            unoptimized
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement
                              img.src = "/images/image.png"
                            }}
                            sizes="(max-width: 320px) 100vw, 320px"
                          />
                        </div>
                      </div>
                      
                      {/* Text Container - Fixed Height */}
                      <div className="p-4 min-h-[80px] flex items-center justify-center border-t border-gray-100">
                        <div className="w-full">
                          <small className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight">
                            {truncateText(partner.name, 6)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Static Grid for Mobile (optional) */}
        <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {partners.slice(0, 6).map((partner, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <Link href={partner.link} className="block">
                <div className="h-32 bg-gray-50 flex items-center justify-center p-4">
                  <div className="relative h-20 w-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      unoptimized
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        img.src = "/images/image.png"
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <small className="text-sm font-medium text-gray-700 line-clamp-2 leading-tight">
                    {truncateText(partner.name, 4)}
                  </small>
                </div>
              </Link>
            </div>
          ))}
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
        
        /* Ensure consistent card heights */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </SectionContainer>
  )
}

export default PartnersSection