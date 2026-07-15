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
  {
    name: 'RAJTOOLS AND STAMPING', 
    logo: 'images/raj.png',
    link: "https://www.rajtools.co.in/"
  },
  {
    name: 'RAJAMANE SOLUTIONS', 
    logo: 'images/rajamane.png',
    link: "https://rajamanesolutions.com/"
  },
  {
    name: 'BHAT METALS', 
    logo: 'images/bhat_metals.png',
    link: "https://bhatmetals.com/"
  },
  {
    name: 'SWASTIK AUTOMATION & CONTROL', 
    logo: 'images/catouni.jpg',
    link: "https://www.cautoniswastikinstrument.com/"
  },
  {
    name: 'HEMANAV GRAPHITES', 
    logo: 'images/hemnav.png',
    link: "https://www.hemnav.com/"
  },
  {
    name: 'RAINBOW TECHNOLOGIES', 
    logo: 'images/rainbowtechnologies.jpg',
    link: "https://www.rainbowtechnologies.in"
  },
  {
    name: 'RHEOLOGIST GAZE AND SOLUTION', 
    logo: 'images/reologist.png',
    link: "https://www.rgees.in/"
  },
  {
    name: 'JAI AMBAY ETCHING PROCESS', 
    logo: 'images/jayambe.jpg',
    link: "https://jaiambayetchingprocess.com"
  },
  {
    name: 'EXCELLENT LASERTECH ', 
    logo: 'images/excellent.jpg',
    link: "https://www.indiamart.com/excellent-lasertech-proto/?srsltid=AfmBOoo1XRJ320qkGlU-s_c2iMZjHXJoRy6gGqNlXmQtyP8jkCFq4n-i"
},
   {
    
    name: 'SENOR METALS', 
    logo: 'images/senor.png',
    link: "https://senormetals.com/"
    
},    {
    name: 'GOEL CARBON  ', 
    logo: 'images/goel_carbon.png',
    link: "https://goelcarbon.com/"
},    {
  name: 'PRIMETECH POLYMOLD ', 
    logo: 'images/primetech.jpg',
    link: "https://primetechpolymold.in/"
 },    {  
    name: 'THRIAM MOULDS AND DIES ', 
    logo: 'images/thiaram.png',
    link: "https://thriam.com/"
},    {
  name: 'HYDRALIQUE PRODUCTION SYSTEMS ', 
    logo: 'images/hps.jpg',
    link: "http://www.hpsindia.com/"
  },    {
    name: 'IDEMI -GOVT OF INDIA', 
    logo: 'images/idemi.png',
    link: "https://www.idemi.org/"
},    {
  name: 'OEM UPDATE ', 
    logo: 'images/oemupdate.jpg',
    link: "https://www.oemupdate.com/"
    






  },
];

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
            Exhibitors
          </h2>
        </div>

        {/* Slider Container - Desktop Only */}
        <div className="relative hidden lg:block">
          {/* Gradient overlay for smooth edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-linear-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-linear-to-l from-white to-transparent" />

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
                  className="min-w-[280px] max-w-[280px] px-4 shrink-0"
                >
                  <Link
                    href={partner.link}
                    className="group block text-center transition-all hover:scale-[1.02]"
                  >
                    {/* Card */}
                    <div className="w-full rounded-lg bg-white shadow-md transition-all group-hover:shadow-lg overflow-hidden border border-gray-100">
                      
                      {/* Logo Container – Show placeholder when no image */}
                      <div className="h-32 w-full bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
                        <div className="relative h-20 w-full flex items-center justify-center">
                          {partner.logo ? (
                            <Image
                              src={partner.logo}
                              alt={partner.name}
                              fill
                              draggable={false}
                              className="object-contain"
                              unoptimized
                              sizes="(max-width: 280px) 100vw, 280px"
                            />
                          ) : (
                            <span className="text-gray-400 font-medium text-lg">
                              Logo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Partner Name – OUTSIDE CARD */}
                    <p className="font-parabolica mt-3 text-sm font-medium text-gray-800 leading-snug">
                      {truncateText(partner.name, 5)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Static Grid for Mobile - Shows only partner names */}
        <div className="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {partners.slice(0, 6).map((partner, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <Link href={partner.link} className="block p-4">
                <div className="flex items-center justify-center min-h-[60px]">
                  <span className="text-gray-800 font-medium text-center text-sm">
                    {partner.name}
                  </span>
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