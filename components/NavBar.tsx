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
    days: 35,
    hours: 0,
    minutes: 29,
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
{/* ================= MOBILE NAVBAR ================= */}
<div className="lg:hidden w-full absolute top-0 left-0 right-0 z-50">
  <div className="bg-gradient-to-r from-[#06162f] to-[#0a2b57] text-white w-full">
    
    {/* HEADER */}
    <div className="grid grid-cols-[70px_auto_1fr_auto] gap-x-2 px-1 pt-0.5 pb-1.5 items-center w-full">

      
      {/* LOGO */}
      <div className="relative w-[70px] h-[47px]">
        <Image
          src="/images/logo-diemex2.png"
          alt="DIEMEX 2026 Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="block h-5 lg:h-6 xl:h-8 w-px bg-white/70 mx-1"></span>


      {/* 3rd Edition */}
      <div className="relative w-[52px] h-[26px]">
        <Image
          src="/images/3rd-edition.png"
          alt="3rd Edition"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* MENU BUTTON */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="rounded-full bg-white/10 hover:bg-white/20 p-1 active:scale-95"
        aria-label="Toggle menu"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* DATE + VENUE */}
      <div className="col-span-3 text-[9px] opacity-90 leading-tight whitespace-nowrap">
        08–10 October 2026 · Auto Cluster Exhibition Centre, Pune
      </div>
    </div>
  </div>

  {/* TIME BAR */}
  <div className="flex justify-center px-0">
    <div className="flex items-start gap-1.5 rounded-b-2xl bg-[#0d1e3c] px-2 py-0.5 text-[10px] text-white justify-start mr-30">
      <span className="font-medium">{timeLeft.days} Days</span>
      <span className="font-medium">{timeLeft.hours} Hours</span>
      <span className="font-medium">{timeLeft.minutes} Mins</span>
    </div>
  </div>
</div>




            {/* ================= DESKTOP NAV BAR (UNCHANGED) ================= */}
            <div className="hidden lg:block rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-r from-[#06162f] to-[#0a2b57] text-white shadow-xl">
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
                  <div className="md:flex flex-col font-parabolica min-w-0 ml-1 lg:ml-2">
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
      className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-opacity duration-300"
      onClick={() => setMobileMenuOpen(false)}
    />
    
    {/* Menu Panel - Opens from the right like TransRussia */}
    <div 
      className="lg:hidden fixed inset-y-0 right-0 z-[999] w-full max-w-xs bg-gradient-to-b from-[#06162f] to-[#0a2b57] text-white shadow-2xl overflow-y-auto"
      style={{ animation: 'slideInRight 0.3s ease-out' }}
    >
      {/* Menu Header */}
      <div className="sticky top-0 bg-[#06162f] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">Menu</h2>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-full bg-white/10 hover:bg-white/20 p-2 active:scale-95"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="px-4 py-6">
        <div className="space-y-1">
          {navItems.map((item, i) =>
            item.dropdown && item.links ? (
              <div key={i} className="border-b border-white/10 last:border-0">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                  className="w-full flex items-center justify-between text-base font-semibold py-4 hover:text-blue-300 transition-colors"
                >
                  <span>{item.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === i ? "rotate-180" : ""}`} />
                </button>
                
                {activeDropdown === i && (
                  <div className="pb-3 pl-3">
                    {item.links.map((link, j) => (
                      <Link
                        key={j}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2.5 text-sm opacity-85 hover:opacity-100 hover:text-blue-300 transition-colors pl-4 border-l border-white/10"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={i}
                href={item.href!}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold py-4 border-b border-white/10 last:border-0 hover:text-blue-300 transition-colors"
              >
                {item.title}
              </Link>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 space-y-3">
          <Button 
            href="/exhibiting-enquiry" 
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#004D9F] hover:bg-[#003d7f] text-sm py-3 font-semibold rounded-lg active:scale-95 transition-all shadow-lg w-full" 
          >
            Become an Exhibitor
          </Button>
          <Button 
            href="/visitor-registration" 
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#004D9F]  text-sm py-3 font-semibold rounded-lg active:scale-95 transition-all shadow-lg w-full" 
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  </>
)}

{/* CSS Animations */}
<style jsx global>{`
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`}</style> 
    </>
  )
}