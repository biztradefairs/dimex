"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import Button from "./UI/Button"
import Image from "next/image"

type NavItem = {
  title: string
  dropdown: boolean
  href?: string
  links?: { text: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: "Exhibit",
    dropdown: true,
    links: [
      { text: "Why Exhibit", href: "/why-exhibit" },
      { text: "Become an Exhibitor", href: "/exhibiting-enquiry" },
      { text: "Event Sectors", href: "/sectors" },
      { text: "Plan your travel", href: "/plan-your-travel" },
      { text: "Exhibitor List", href: "/exhibition-directory" },
      { text: "Exhibitor Resource Center", href: "/exhibitor-resource-center" },
      { text: "Exhibitor Promotions", href: "/free-promo" }
    ],
  },
  {
    title: "Attend",
    dropdown: true,
    links: [
      { text: "Why Visit", href: "/why-visit" },
      { text: "Event Sector", href: "/sectors" },
      { text: "Exhibitor List", href: "/exhibition-directory" },
      { text: "Download Event Brochure", href: "/event-brochure" },
    ],
  },
  {
    title: "Insights",
    dropdown: true,
    links: [
      { text: "Industry News", href: "/articles" },
      { text: "Post Show Report", href: "/post-show-report" },
      { text: "Event Brochure", href: "/event-brochure" },
      { text: "Media Gallery", href: "/media-gallery" }
    ],
  },
  {
    title: "About",
    dropdown: true,
    links: [
      { text: "About Diemex", href: "/about-diemex" },
      { text: "About The Organizer", href: "/about-organizer" },
      { text: "Partners & Sponsors", href: "/partners-and-sponsors" },
    ],
  },
  { title: "Contact us", dropdown: false, href: "/contact-us" },
  { title: "Conference", dropdown: false, href: "/conference" }
]

const EVENT_DATE = new Date("2026-10-08T10:00:00").getTime()

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "laptop" | "desktop">("desktop")
  const [isMounted, setIsMounted] = useState(false)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  /* ================= MOUNT CHECK ================= */
  useEffect(() => {
    setIsMounted(true)
  }, [])

  /* ================= TIMER ================= */
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now()
      const diff = EVENT_DATE - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ================= SCREEN SIZE DETECTION ================= */
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setScreenSize("mobile")
      } else if (width >= 768 && width < 1024) {
        setScreenSize("tablet")
      } else if (width >= 1024 && width < 1280) {
        setScreenSize("laptop")
      } else {
        setScreenSize("desktop")
      }
    }
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  /* ================= PREVENT BODY SCROLL WHEN MOBILE MENU OPEN ================= */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Calculate font sizes based on screen size
  const getNavItemFontSize = () => {
    switch(screenSize) {
      case "laptop": return "text-[10px] lg:text-[11px] xl:text-[13px]"
      case "desktop": return "text-[11px] lg:text-[13px] xl:text-[15px]"
      default: return "text-[11px] lg:text-[13px] xl:text-[15px]"
    }
  }

  const getButtonFontSize = () => {
    switch(screenSize) {
      case "laptop": return "text-[8px] lg:text-[10px] xl:text-[12px]"
      case "desktop": return "text-[9px] lg:text-[11px] xl:text-[13px]"
      default: return "text-[9px] lg:text-[11px] xl:text-[13px]"
    }
  }

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-[999] font-parabolica">
        <div className={`px-2 sm:px-4 md:px-6 lg:px-8 transition-all duration-300 ${scrolled ? "pt-1.5 sm:pt-2" : "pt-2 sm:pt-3 md:pt-4"}`}>
          <div className="mx-auto max-w-[1600px]">
            <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#06162f] to-[#0a2b57] text-white shadow-xl">
              <div className="flex items-center justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-4 px-2 sm:px-3 md:px-4 lg:px-5 py-1.5 sm:py-2 md:py-2.5 lg:py-3">
                
                {/* ================= LOGO SECTION ================= */}
                <Link
                  href="/"
                  className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0 min-w-0"
                >
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                    {/* Main Logo */}
                    <div className="relative w-[45px] h-[30px] xs:w-[55px] xs:h-[37px] sm:w-[70px] sm:h-[47px] md:w-[85px] md:h-[57px] lg:w-[95px] lg:h-[63px] xl:w-[110px] xl:h-[73px] flex-shrink-0">
                      <Image
                        src="/images/logo-diemex2.png"
                        alt="DIEMEX 2026 Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 374px) 45px, (max-width: 474px) 55px, (max-width: 639px) 70px, (max-width: 767px) 85px, (max-width: 1023px) 95px, 110px"
                        priority
                      />
                    </div>

                    {/* Divider - Show only on desktop and up */}
                    <span className="hidden md:block h-5 lg:h-6 xl:h-8 w-px bg-white/70 mx-1"></span>

                    {/* Edition Badge */}
                    <div className="relative w-[38px] h-[19px] xs:w-[45px] xs:h-[23px] sm:w-[60px] sm:h-[30px] md:w-[70px] md:h-[35px] lg:w-[85px] lg:h-[43px] xl:w-[100px] xl:h-[50px] flex-shrink-0">
                      <Image
                        src="/images/3rd-edition.png"
                        alt="3rd Edition"
                        fill
                        className="object-contain"
                        sizes="(max-width: 374px) 38px, (max-width: 474px) 45px, (max-width: 639px) 60px, (max-width: 767px) 70px, (max-width: 1023px) 85px, 100px"
                        priority
                      />
                    </div>
                  </div>

                  {/* Event Info - Hidden on small screens */}
                  <div className="hidden md:flex flex-col font-parabolica min-w-0 ml-1 lg:ml-2">
                    <span className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[12px] leading-tight whitespace-nowrap">
                      08–10 October 2026
                    </span>
                    <span className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[12px] leading-tight whitespace-nowrap truncate max-w-[150px] lg:max-w-[180px] xl:max-w-none">
                      Auto Cluster Exhibition Centre, Pune
                    </span>
                  </div>
                </Link>

                {/* ================= DESKTOP NAVIGATION ================= */}
                <nav className={`hidden lg:flex items-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-4 font-parabolica flex-shrink min-w-0 ${screenSize === "laptop" ? "mx-1" : ""}`}>
                  {navItems.map((item, i) =>
                    item.dropdown ? (
                      <div
                        key={i}
                        className="relative group"
                        onMouseEnter={() => setActiveDropdown(i)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button className="flex items-center gap-0.5 lg:gap-0.5 xl:gap-1 hover:text-gray-200 relative whitespace-nowrap transition-colors px-0.5 lg:px-1">
                          <span className={`relative font-medium ${getNavItemFontSize()}`}>
                            {item.title}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] lg:h-[2px] bg-[#FF131C] group-hover:w-full transition-all duration-300"></span>
                          </span>
                          <ChevronDown className={`h-2 w-2 lg:h-2.5 lg:w-2.5 xl:h-3 xl:w-3 transition-transform duration-300 ${activeDropdown === i ? "rotate-180" : ""}`} />
                        </button>

                        {activeDropdown === i && item.links && (
                          <div className="absolute left-0 top-full pt-1.5 lg:pt-2 z-50">
                            <div className="min-w-[160px] lg:min-w-[170px] xl:min-w-[200px] rounded-lg bg-white py-1 lg:py-1.5 shadow-xl text-gray-800 border border-gray-100">
                              {item.links.map((link, j) => (
                                <Link
                                  key={j}
                                  href={link.href}
                                  className="block px-2 lg:px-3 xl:px-4 py-1 lg:py-1.5 xl:py-2 text-[10px] lg:text-[11px] xl:text-[13px] hover:bg-gray-100 relative group/item whitespace-nowrap transition-colors"
                                >
                                  <span className="relative">
                                    {link.text}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-blue-600 group-hover/item:w-full transition-all duration-300"></span>
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={i}
                        href={item.href!}
                        className="hover:text-gray-200 relative group whitespace-nowrap transition-colors px-0.5 lg:px-1"
                      >
                        <span className={`relative font-medium ${getNavItemFontSize()}`}>
                          {item.title}
                          <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] lg:h-[2px] bg-[#FF131C] group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    )
                  )}
                </nav>

                {/* ================= DESKTOP CTA BUTTONS ================= */}
                <div className="hidden lg:flex items-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-3 flex-shrink-0">
                  <Button 
                    href="/exhibiting-enquiry" 
                    className={`bg-[#004D9F] hover:bg-[#003d7f] px-1.5 lg:px-2 xl:px-3 py-1 lg:py-1.5 xl:py-2 whitespace-nowrap transition-all ${getButtonFontSize()}`}
                  >
                    {screenSize === "laptop" ? "Exhibit" : "Become an Exhibitor"}
                  </Button>
                  <Button 
                    href="/visitor-registration"
                    className={`bg-[#004D9F] hover:bg-[#003d7f] px-1.5 lg:px-2 xl:px-3 py-1 lg:py-1.5 xl:py-2 whitespace-nowrap transition-all ${getButtonFontSize()}`}
                  >
                    {screenSize === "laptop" ? "Register" : "Register Now"}
                  </Button>
                </div>

                {/* ================= MOBILE MENU BUTTON ================= */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden rounded-full bg-white/10 hover:bg-white/20 p-1.5 sm:p-2 flex-shrink-0 transition-all active:scale-95"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  ) : (
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* ================= TIMER BAR (DESKTOP ONLY) ================= */}
            {!scrolled && (
              <div className="hidden lg:flex justify-end mr-1 lg:mr-2 xl:mr-4 pr-1 lg:pr-2 xl:pr-4 font-parabolica">
                <div className={`flex items-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-3 rounded-b-xl bg-[#0d1e3c] px-1.5 lg:px-2 xl:px-3 py-0.5 lg:py-1 xl:py-1.5 text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] text-white whitespace-nowrap shadow-md ${screenSize === "laptop" ? "mr-2" : ""}`}>
                  <span className="font-medium">{timeLeft.days} Days</span>
                  <span className="font-medium">{timeLeft.hours} Hours</span>
                  <span className="font-medium">{timeLeft.minutes} Mins</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[997] transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
            style={{ animation: 'fadeIn 0.3s ease-out' }}
          />
          
          {/* Menu Panel */}
          <div 
            className="lg:hidden fixed top-[50px] xs:top-[56px] sm:top-[64px] md:top-[74px] left-0 right-0 bottom-0 z-[998] overflow-y-auto bg-[#0d1e3c] text-white shadow-2xl font-parabolica"
            style={{ animation: 'slideDown 0.3s ease-out' }}
          >
            <div className="px-3 xs:px-4 sm:px-5 md:px-6 py-3 xs:py-4 sm:py-5 md:py-6">
              
              {/* Event Info */}
              <div className="mb-3 sm:mb-4 text-center pb-3 border-b border-white/20">
                <div className="text-xs xs:text-sm sm:text-base font-bold mb-1 sm:mb-1.5">DIEMEX 2026</div>
                <div className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm opacity-90 leading-relaxed">
                  08–10 October 2026
                </div>
                <div className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm opacity-90">
                  Auto Cluster Exhibition Centre, Pune
                </div>
              </div>

              {/* Countdown Timer */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="bg-white/10 backdrop-blur-sm px-3 xs:px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg">
                    <div className="text-center">
                      <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold block">{timeLeft.days}</span>
                      <span className="text-[9px] xs:text-[10px] sm:text-xs opacity-70">Days</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 xs:px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg">
                    <div className="text-center">
                      <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold block">{timeLeft.hours}</span>
                      <span className="text-[9px] xs:text-[10px] sm:text-xs opacity-70">Hours</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 xs:px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg">
                    <div className="text-center">
                      <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold block">{timeLeft.minutes}</span>
                      <span className="text-[9px] xs:text-[10px] sm:text-xs opacity-70">Mins</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-2.5 xs:gap-3 sm:gap-4">
                {navItems.map((item, i) =>
                  item.dropdown && item.links ? (
                    <div key={i} className="group/mobile">
                      <div className="text-xs xs:text-sm sm:text-base font-bold pb-2 border-b-2 border-white/30 group-hover/mobile:border-blue-400 transition-colors">
                        {item.title}
                      </div>
                      <div className="mt-1.5 sm:mt-2 ml-2 xs:ml-3 sm:ml-4 flex flex-col gap-0.5 sm:gap-1">
                        {item.links.map((link, j) => (
                          <Link
                            key={j}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[11px] xs:text-xs sm:text-sm md:text-base opacity-85 hover:opacity-100 hover:text-blue-300 transition-all py-1.5 xs:py-2 relative group/item active:scale-95"
                          >
                            <span className="relative">
                              {link.text}
                              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-blue-300 group-hover/item:w-full transition-all duration-300"></span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={i}
                      href={item.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs xs:text-sm sm:text-base font-bold pb-2 border-b-2 border-white/30 hover:border-blue-400 hover:text-blue-300 transition-all active:scale-95"
                    >
                      {item.title}
                    </Link>
                  )
                )}

                {/* CTA Buttons */}
                <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 flex flex-col gap-2 sm:gap-2.5 md:gap-3 border-t-2 border-white/30 pt-3 xs:pt-4 sm:pt-5">
                  <Button 
                    href="/exhibiting-enquiry" 
                    className="bg-[#004D9F] hover:bg-[#003d7f] text-xs xs:text-sm sm:text-base py-2.5 xs:py-3 sm:py-3.5 md:py-4 font-semibold active:scale-95 transition-all shadow-lg" 
                    fullWidth
                  >
                    Become an Exhibitor
                  </Button>
                  <Button 
                    href="/visitor-registration" 
                    className="bg-[#004D9F] hover:bg-[#003d7f] text-xs xs:text-sm sm:text-base py-2.5 xs:py-3 sm:py-3.5 md:py-4 font-semibold active:scale-95 transition-all shadow-lg" 
                    fullWidth
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}