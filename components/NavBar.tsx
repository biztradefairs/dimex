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
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

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

  /* ================= SCREEN SIZE CHECK ================= */
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1280)
    }
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-[999] font-parabolica">
        <div className={`px-4 sm:px-6 lg:px-8 ${scrolled ? "pt-2" : "pt-4"}`}>
          <div className="mx-auto max-w-[1600px]">
            <div className="rounded-3xl bg-gradient-to-r from-[#06162f] to-[#0a2b57] text-white shadow-xl">
              <div className="flex items-center justify-between px-4 sm:px-5 lg:px-6 py-3">
                {/* LOGO - With responsive adjustments */}
                <Link
                  href="/"
                  className="flex items-center gap-2 lg:gap-3 font-bold flex-shrink-0 min-w-0"
                >
                  {/* Logo Container */}
                  <div className="flex items-center gap-2 lg:gap-3">
                    {/* Main Logo - Responsive sizing */}
                    <div className="relative w-[80px] h-[53px] sm:w-[100px] sm:h-[67px] lg:w-[120px] lg:h-[80px] flex-shrink-0">
                      <Image
                        src="/images/logo-diemex2.png"
                        alt="DIEMEX 2026 Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 120px"
                        priority
                      />
                    </div>

                    {/* Divider - Hidden on mobile, responsive spacing */}
                    <span className="hidden lg:block h-6 lg:h-8 w-px bg-white/70 mx-1 lg:mx-2"></span>

                    {/* Edition Badge - Responsive sizing */}
                    <div className="relative w-[70px] h-[35px] sm:w-[90px] sm:h-[45px] lg:w-[120px] lg:h-[60px] flex-shrink-0">
                      <Image
                        src="/images/3rd-edition.png"
                        alt="3rd Edition"
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 70px, (max-width: 1024px) 90px, 120px"
                        priority
                      />
                    </div>
                  </div>

                  {/* Event Info - Responsive text */}
                  <div className="hidden sm:flex flex-col font-parabolica min-w-0 ml-1 lg:ml-2">
                    <span className="text-[11px] sm:text-[12px] lg:text-[13px] leading-tight whitespace-nowrap">
                      08–10 October 2026
                    </span>
                    <span className="text-[11px] sm:text-[12px] lg:text-[13px] leading-tight whitespace-nowrap truncate max-w-[120px] lg:max-w-none">
                      Auto Cluster Exhibition Centre, Pune
                    </span>
                  </div>
                </Link>

                {/* DESKTOP NAV - With responsive gap */}
                <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-parabolica flex-shrink min-w-0">
                  {navItems.map((item, i) =>
                    item.dropdown ? (
                      <div
                        key={i}
                        className="relative group"
                        onMouseEnter={() => setActiveDropdown(i)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button className="flex items-center gap-1 hover:text-gray-200 relative whitespace-nowrap">
                          <span className="text-[14px] xl:text-[15px] relative">
                            {item.title}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF131C] group-hover:w-full transition-all duration-300"></span>
                          </span>
                          <ChevronDown
                            className={`h-3 w-3 xl:h-4 xl:w-4 transition-transform duration-300 ${activeDropdown === i ? "rotate-180" : ""
                              }`}
                          />
                        </button>

                        {activeDropdown === i && item.links && (
                          <div className="absolute left-0 top-full pt-3 z-50">
                            <div className="min-w-48 xl:min-w-52 rounded-lg bg-white py-2 shadow-xl text-gray-800 border border-gray-100">
                              {item.links.map((link, j) => (
                                <Link
                                  key={j}
                                  href={link.href}
                                  className="block px-3 xl:px-4 py-2 text-[13px] xl:text-[14px] hover:bg-gray-100 relative group/item whitespace-nowrap"
                                >
                                  <span className="relative">
                                    {link.text}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 group-hover/item:w-full transition-all duration-300"></span>
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
                        className="hover:text-gray-200 relative group whitespace-nowrap"
                      >
                        <span className="text-[14px] xl:text-[15px] relative">
                          {item.title}
                          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF131C] group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    )
                  )}
                </nav>

                {/* DESKTOP CTA - Responsive buttons */}
                <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
                  <Button 
                    href="/exhibiting-enquiry" 
                    className="bg-[#004D9F] text-[12px] xl:text-[13px] px-3 xl:px-4 py-2 whitespace-nowrap"
                  >
                    {isSmallScreen ? "Exhibit" : "Become an Exhibitor"}
                  </Button>
                  <Button 
                    href="/visitor-registration"
                    className="bg-[#004D9F] text-[12px] xl:text-[13px] px-3 xl:px-4 py-2 whitespace-nowrap"
                  >
                    {isSmallScreen ? "Register" : "Register Now"}
                  </Button>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden rounded-full bg-white/10 p-2 flex-shrink-0"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {/* TIMER BAR (DESKTOP ONLY) - Responsive positioning */}
            {!scrolled && (
              <div className="hidden lg:flex justify-end mr-4 lg:mr-8 xl:mr-25 pr-4 lg:pr-8 font-parabolica">
                <div className="flex items-center gap-3 xl:gap-4 rounded-b-xl bg-[#0d1e3c] px-3 xl:px-4 py-1 xl:py-1.5 text-[12px] xl:text-[13px] text-white whitespace-nowrap">
                  <span>{timeLeft.days} Days</span>
                  <span>{timeLeft.hours} Hours</span>
                  <span>{timeLeft.minutes} Mins</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed top-[72px] left-0 right-0 z-[998]
               max-h-[calc(100vh-80px)] overflow-y-auto
               bg-[#0d1e3c] text-white shadow-xl font-parabolica"
        >
          <div className="px-5 py-4">
            {/* Event Info in Mobile Menu */}
            <div className="mb-4 text-center">
              <div className="text-sm font-semibold mb-1">DIEMEX 2026</div>
              <div className="text-xs opacity-80">
                08–10 October 2026 | Auto Cluster Exhibition Centre, Pune
              </div>
            </div>

            <div className="mb-3 text-center font-mono text-xs opacity-80 border-t border-white/20 pt-3">
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </div>

            <div className="flex flex-col gap-4">
              {navItems.map((item, i) =>
                item.dropdown && item.links ? (
                  <div key={i} className="group/mobile">
                    <div className="text-sm font-semibold font-parabolica pb-2 border-b border-white/20 group-hover/mobile:border-blue-500 transition-colors duration-300">
                      {item.title}
                    </div>
                    <div className="mt-1 ml-3 flex flex-col gap-1.5">
                      {item.links.map((link, j) => (
                        <Link
                          key={j}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm opacity-80 hover:opacity-100 hover:text-blue-300 transition-colors duration-300 py-2 relative group/item"
                        >
                          <span className="relative">
                            {link.text}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-300 group-hover/item:w-full transition-all duration-300"></span>
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
                    className="text-sm font-semibold pb-2 border-b border-white/20 hover:border-blue-500 hover:text-blue-300 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                )
              )}

              <div className="mt-4 flex flex-col gap-2 border-t border-white/20 pt-4">
                <Button href="/exhibiting-enquiry" className="bg-[#004D9F]" fullWidth>
                  Become an Exhibitor
                </Button>
                <Button href="/visitor-registration" className="bg-[#004D9F]" fullWidth>
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}