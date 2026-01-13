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
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

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
      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-[999]">
        <div className={`px-4 sm:px-6 lg:px-8 ${scrolled ? "pt-2" : "pt-4"}`}>
          <div className="mx-auto max-w-[1600px]">
            <div className="rounded-3xl bg-gradient-to-r from-[#06162f] to-[#0a2b57] text-white shadow-xl">
              <div className="flex items-center justify-between px-6 py-3">

                {/* LOGO */}
                <Link href="/" className="flex items-center gap-3 font-semibold">
                  <span>TransRussia</span>
                  <span className="opacity-40">|</span>
                  <span>SkladTech</span>
                  <div className="flex flex-col"> <span className="text-xs text-white/70 leading-tight"> 17–19 March 2026 </span> <span className="text-xs text-white/60 leading-tight"> Crocus Expo, Pavilion 3 </span> </div>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden lg:flex items-center gap-6">
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
                          <div className="absolute left-0 top-full pt-3">
                            <div className="min-w-52 rounded-lg bg-white py-2 shadow-xl text-gray-800">
                              {item.links.map((link, j) => (
                                <Link
                                  key={j}
                                  href={link.href}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100"
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

                {/* DESKTOP CTA */}
                <div className="hidden lg:flex items-center gap-3">
                  <Button href="/exhibiting-enquiry">Become an Exhibitor</Button>
                  <Button href="/visitor-registration">Register Now</Button>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden rounded-full bg-white/10 p-2"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {/* TIMER BAR (DESKTOP ONLY) */}
            {!scrolled && (
              <div className="hidden lg:flex justify-end mr-25 pr-8">
                <div className="flex items-center gap-4 rounded-b-xl bg-[#0d1e3c] px-4 py-1.5 text-sm text-white">
                  <span>{timeLeft.days}d</span>
                  <span>{timeLeft.hours}h</span>
                  <span>{timeLeft.minutes}m</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

{mobileMenuOpen && (
  <div
    className="lg:hidden fixed top-[72px] left-0 right-0 z-[998]
               max-h-[calc(100vh-80px)] overflow-y-auto
               bg-[#0d1e3c] text-white shadow-xl"
  >
    <div className="px-5 py-4">
      <div className="mb-3 text-center font-mono text-xs opacity-80">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      </div>

      <div className="flex flex-col gap-4">
        {navItems.map((item, i) =>
          item.dropdown && item.links ? (
            <div key={i}>
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="mt-1 ml-3 flex flex-col gap-1.5">
                {item.links.map((link, j) => (
                  <Link
                    key={j}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm opacity-80 hover:opacity-100"
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
              className="text-sm font-semibold"
            >
              {item.title}
            </Link>
          )
        )}

        <div className="mt-4 flex flex-col gap-2 border-t border-white/20 pt-4">
          <Button href="/exhibiting-enquiry" fullWidth>
            Become an Exhibitor
          </Button>
          <Button href="/visitor-registration" fullWidth>
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
