"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import Button from "./UI/Button"

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
    ],
  },
  {
    title: "Attend",
    dropdown: true,
    links: [
      { text: "Why Visit", href: "/why-visit" },
      { text: "Event Sector", href: "/sectors" },
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
    ],
  },
  {
    title: "About",
    dropdown: true,
    links: [
      { text: "About TransRussia", href: "/about-transrussia" },
      { text: "About SkladTech", href: "/about-skladtech" },
      { text: "About ITE Group", href: "/about-ite" },
      { text: "Partners & Sponsors", href: "/partners-and-sponsors" },
    ],
  },
  { title: "Contact us", dropdown: false, href: "/contact-us" },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  })

  /* ================= TIMER ================= */
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date("March 17, 2026 10:00:00").getTime()
      const now = new Date().getTime()
      const diff = eventDate - now

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)
    return () => clearInterval(timer)
  }, [])

  /* ================= SCROLL ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="hidden lg:block fixed top-0 left-0 z-50 w-full">
        <div className={`w-full ${scrolled ? "pt-2" : "pt-4"} px-4 sm:px-6 lg:px-8`}>
          {/* Container with consistent width */}
          <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
            {/* Original navbar design */}
            <div className={`rounded-3xl bg-gradient-to-r from-[#06162f] to-[#0a2b57] text-white shadow-xl transition-all ${scrolled ? "py-2" : "py-3"}`}>
              <div className="flex items-center justify-between px-8">
                
                {/* LOGOS - Original design */}
                <Link href="/" className="flex items-center gap-4 font-semibold">
                  <span>TransRussia</span>
                  <span className="opacity-40">|</span>
                  <span>SkladTech</span>
                </Link>

                {/* NAV LINKS - Original design */}
                <nav className="flex items-center gap-6">
                  {navItems.map((item, i) =>
                    item.dropdown ? (
                      <div
                        key={i}
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(i)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button className="flex items-center gap-1 hover:text-gray-200">
                          {item.title}
                          <ChevronDown className="h-4 w-4" />
                        </button>

                        {activeDropdown === i && item.links && (
                          <div className="absolute left-0 top-full pt-3 z-50">
                            <div className="min-w-52 rounded-lg bg-white py-2 shadow-xl">
                              {item.links.map((link, j) => (
                                <Link
                                  key={j}
                                  href={link.href}
                                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                >
                                  {link.text}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={i} href={item.href!} className="hover:text-gray-200">
                        {item.title}
                      </Link>
                    )
                  )}
                </nav>

                {/* CTA - Original design */}
                <div className="flex items-center gap-3">
                  <Button href="/exhibiting-enquiry" className="rounded-full px-5 py-2.5">
                    Become an Exhibitor
                  </Button>
                  <Button href="/visitor-registration" className="rounded-full px-5 py-2.5">
                    Register Now
                  </Button>
                </div>
              </div>
            </div>

            {/* ================= TIMER BAR (SAME PLACE AS BEFORE) ================= */}
            {!scrolled && (
              <div className="flex justify-end mr-8">
                <div className="flex items-center gap-4 rounded-b-xl bg-[#0d1e3c] px-4 py-1.5 text-sm text-white">
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold">
                      {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-xs opacity-70">Days</span>
                  </div>

                  <div className="h-3 w-px bg-white/30" />

                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </span>
                    <span className="text-xs opacity-70">Hours</span>
                  </div>

                  <div className="h-3 w-px bg-white/30" />

                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-xs opacity-70">Mins</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE NAVBAR ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#06162f] text-white">
        {/* Mobile navbar container */}
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-bold">
              TransRussia · SkladTech
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-full bg-white/10 p-2"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 rounded-xl bg-[#0d1e3c] p-4">
              <div className="mb-4 text-center font-mono font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item, i) =>
                  item.dropdown && item.links ? (
                    <div key={i}>
                      <div className="font-semibold">{item.title}</div>
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {item.links.map((link, j) => (
                          <Link
                            key={j}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm opacity-80"
                          >
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={i}
                      href={item.href!}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-semibold"
                    >
                      {item.title}
                    </Link>
                  )
                )}

                <div className="mt-4 flex flex-col gap-3 border-t border-white/20 pt-4">
                  <Button href="/exhibiting-enquiry" fullWidth>
                    Become an Exhibitor
                  </Button>
                  <Button href="/visitor-registration" fullWidth>
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}