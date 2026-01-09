"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import Button from "./UI/Button"

const navItems = [
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
  { title: "Contact us", href: "/contact-us", dropdown: false },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Calculate time until March 17, 2026 (event start date)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('March 17, 2026 10:00:00').getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header
        className={`hidden lg:block fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "pt-2" : "pt-4"
        }`}
      >
        {/* OUTER GUTTER */}
        <div className="px-4 sm:px-6 xl:px-10">
          {/* NAVBAR CONTAINER */}
          <div
            className={`
              mx-auto
    w-full
    max-w-[1240px]
    lg:max-w-[1320px]
    xl:max-w-[1440px]
    2xl:max-w-[1600px]
              rounded-3xl
              bg-linear-to-r from-[#06162f] to-[#0a2b57]
              text-white
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              transition-all duration-300
              ${scrolled ? "py-1.5" : "py-2"}
            `}
          >
            <div className="flex items-center justify-between gap-6 px-6 xl:px-8">
              {/* LOGOS + DATE */}
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-blue-500" />
                    <span className="font-semibold">TransRussia</span>
                  </div>
                  <div className="h-8 w-px bg-white/40" />
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-blue-300" />
                    <span className="font-semibold">SkladTech</span>
                  </div>
                </Link>

                {!scrolled && (
                  <div className="flex flex-col text-sm leading-tight">
                    <span>17–19 March 2026</span>
                    <span className="opacity-80">
                      Crocus Expo, Pavilion 3
                    </span>
                  </div>
                )}
              </div>

              {/* NAV LINKS */}
              <nav className="flex items-center gap-6">
                {navItems.map((item, i) =>
                  item.dropdown ? (
                    <div key={i} className="relative group">
                      <button className="flex items-center gap-1 hover:text-gray-200">
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                      </button>

                      <div className="absolute left-0 top-full hidden group-hover:block pt-3">
                        <div className="min-w-52 rounded-lg bg-white py-2 shadow-xl">
                          {item.links?.map((link, j) => (
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
                    </div>
                  ) : (
                    <Link
                      key={i}
                      href={item.href!}
                      className="hover:text-gray-200"
                    >
                      {item.title}
                    </Link>
                  )
                )}
              </nav>

              {/* CTA BUTTONS */}
              <div className="flex items-center gap-3">
                <Button
                  href="/exhibiting-enquiry"
                  className="rounded-full border-2 border-[#004D9F] bg-[#004D9F] px-5 py-2.5 text-white hover:bg-[#0a53be]"
                >
                  Become an Exhibitor
                </Button>

                <Button
                  href="/visitor-registration"
                  className="rounded-full bg-[#003a8f] px-5 py-2.5 text-white hover:bg-[#002f73]"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>

          {/* TIMER BAR - Added based on your image */}
          {!scrolled && (
            <div className="mx-auto flex w-full max-w-[1180px] 2xl:max-w-[1400px] 3xl:max-w-[1800px] justify-end">
              <div className="flex items-center gap-6 rounded-xl bg-[#0d1e3c] px-6 py-2 text-sm text-white mr-15">
                {/* Countdown Timer */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold tabular-nums">
                    {timeLeft.days.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs opacity-70">Days</span>
                </div>
                
                <div className="h-4 w-px bg-white/30" />
                
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold tabular-nums">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs opacity-70">Hours</span>
                </div>
                
                <div className="h-4 w-px bg-white/30" />
                
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold tabular-nums">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs opacity-70">Mins</span>
                </div>
                
                <div className="h-4 w-px bg-white/30" />
                
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-bold tabular-nums">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs opacity-70">Secs</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE NAVBAR ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-[#06162f] to-[#0a2b57] px-4 py-3 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-lg">
              TransRussia · SkladTech
            </Link>
            
            {/* Mobile Timer */}
            <div className="flex items-center gap-2 rounded-full bg-[#0d1e3c] px-3 py-1 text-xs">
              <span className="font-mono font-bold">
                {timeLeft.days}d {timeLeft.hours}h
              </span>
              <span className="opacity-70">RU 🇷🇺</span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full bg-white/10 p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 rounded-xl bg-[#06162f] p-4">
            {/* Mobile Timer Expanded */}
            <div className="mb-4 rounded-lg bg-[#0d1e3c] p-4">
              <div className="text-center text-sm opacity-80 mb-2">Time until TransRussia 2026</div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="font-mono text-xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs opacity-70">Days</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs opacity-70">Hours</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs opacity-70">Mins</div>
                </div>
                <div>
                  <div className="font-mono text-xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs opacity-70">Secs</div>
                </div>
              </div>
              <div className="mt-3 text-center text-sm">
                <span>17–19 March 2026</span>
                <span className="mx-2">•</span>
                <span>Crocus Expo, Pavilion 3</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {navItems.map((item, i) =>
                item.dropdown ? (
                  <div key={i}>
                    <div className="font-semibold">{item.title}</div>
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {item.links?.map((link, j) => (
                        <Link
                          key={j}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm text-gray-300 hover:text-white"
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
      </header>
    </>
  )
}