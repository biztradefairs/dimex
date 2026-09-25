"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, ChevronDown, Megaphone, Menu, X } from "lucide-react"
import Image from "next/image"
import ExhibitorNavProfile, { useExhibitorLoggedIn } from "./ExhibitorNavProfile"

type NavItem = {
  title: string
  dropdown: boolean
  href?: string
  links?: { text: string; href: string }[]
}

const navItems: NavItem[] = [
  { title: "Home", dropdown: false, href: "/" },
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
      { text: "Exhibitor Promotions", href: "/free-promo" },
      { text: "Floor Plan", href: "/layout" },
    ],
  },
  {
    title: "Attend",
    dropdown: true,
    links: [
      { text: "Why Visit", href: "/why-visit" },
      { text: "Digital Visitor Pass", href: "/passes" },
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
      { text: "Media Gallery", href: "/media-gallery" },
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
  { title: "Conference", dropdown: false, href: "/conference" },
]

const EVENT_DATE = new Date("2027-03-24T10:00:00+05:30").getTime()

function remainingUntilEvent() {
  const diff = EVENT_DATE - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  }
}

function DatesMarquee({ onKnowMore }: { onKnowMore: () => void }) {
  return (
    <div
      className="relative flex h-[38px] items-center overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(105deg, #ff0713 0%, #f50d1c 24%, #c51d3d 48%, #63315f 72%, #004b92 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />

      <div className="relative z-10 flex h-full shrink-0 items-center pr-3 pl-4 sm:pl-6 xl:pl-[72px]">
        <Megaphone strokeWidth={2} className="h-[20px] w-[20px]" />
      </div>

      <button
        type="button"
        onClick={onKnowMore}
        className="relative z-10 min-w-0 flex-1 overflow-hidden text-left"
      >
        <div className="animate-diemex-marquee flex w-max items-center hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center text-[14px] font-semibold tracking-[-0.01em] whitespace-nowrap"
            >
              <span>Visitor Registrations Are Now Open — Get your Pass</span>
              <span className="mx-[18px] text-white/65">|</span>
              <span>Exhibitor Bookings Are Now Open — Grow Your Business at DIEMEX 2027</span>
              <span className="mx-[24px] text-white/65">|</span>
            </div>
          ))}
        </div>
      </button>

      <button
        type="button"
        onClick={onKnowMore}
        className="relative z-10 mr-4 ml-2 inline-flex h-full shrink-0 items-center gap-2 text-[14px] font-bold text-white transition-opacity hover:opacity-80 sm:mr-6 sm:ml-6 xl:mr-[58px]"
      >
        <span className="hidden sm:inline">Know More</span>
        <ArrowRight className="h-[18px] w-[18px]" />
      </button>
    </div>
  )
}

function Countdown({ timeLeft }: { timeLeft: { days: number; hours: number; minutes: number } }) {
  const cells = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
  ]

  return (
    <div className="hidden items-center gap-4 xl:flex">
      {cells.map((cell) => (
        <div key={cell.label} className="min-w-[42px] text-center">
          <p className="text-[18px] leading-none font-bold tabular-nums text-slate-900">
            {String(cell.value).padStart(2, "0")}
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-slate-400">{cell.label}</p>
        </div>
      ))}
    </div>
  )
}

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { loggedIn: exhibitorLoggedIn, ready: exhibitorReady } = useExhibitorLoggedIn()
  const pathname = usePathname()
  const [timeLeft, setTimeLeft] = useState(remainingUntilEvent)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(remainingUntilEvent()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const openDatesInfo = () => {
    if (pathname === "/") {
      window.dispatchEvent(new Event("open-postponed-popup"))
      return
    }
    window.location.href = "/"
  }

  const isItemActive = (item: NavItem) =>
    item.href === pathname || item.links?.some((l) => l.href === pathname)

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-[999] font-parabolica">
        <DatesMarquee onKnowMore={openDatesInfo} />

        <div
          className={`border-b bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
            scrolled
              ? "border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              : "border-slate-100 shadow-none"
          }`}
        >
          <div className="mx-auto flex h-[80px] max-w-[1440px] items-center justify-between gap-4 px-4 lg:h-[88px] lg:px-8">
            <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2.5">
              <div className="relative h-14 w-[156px] transition-opacity group-hover:opacity-80 lg:h-16 lg:w-[178px]">
                <Image
                  src="/images/diemex3.png"
                  alt="DIEMEX"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden flex-1 items-center justify-center lg:flex">
              {navItems.map((item, i) => {
                const active = isItemActive(item)
                return item.dropdown ? (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(i)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-2.5 py-2 text-[14px] font-medium transition-colors xl:px-3.5 ${
                        active ? "text-[#004A96]" : "text-slate-700 hover:text-[#004A96]"
                      }`}
                    >
                      {item.title}
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                          activeDropdown === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <span
                      className={`absolute bottom-0 left-2.5 h-[2px] rounded-full bg-[#004A96] transition-all duration-200 ${
                        active ? "right-2.5 opacity-100" : "right-[calc(100%-2.5px)] opacity-0"
                      }`}
                    />
                    {item.links && (
                      <div
                        className={`absolute top-full left-0 z-50 pt-2 transition-all duration-150 ${
                          activeDropdown === i
                            ? "translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-1 opacity-0"
                        }`}
                      >
                        <div className="min-w-[230px] overflow-hidden rounded-xl border border-slate-100 bg-white py-2 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                          {item.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`block px-4 py-2.5 text-[13px] transition-colors ${
                                link.href === pathname
                                  ? "bg-[#004A96]/5 text-[#004A96]"
                                  : "text-slate-600 hover:bg-[#004A96]/5 hover:text-[#004A96]"
                              }`}
                            >
                              {link.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    href={item.href!}
                    className={`relative px-2.5 py-2 text-[14px] font-medium transition-colors xl:px-3.5 ${
                      active ? "text-[#004A96]" : "text-slate-700 hover:text-[#004A96]"
                    }`}
                  >
                    {item.title}
                    <span
                      className={`absolute bottom-0 left-2.5 h-[2px] rounded-full bg-[#004A96] transition-all duration-200 ${
                        active ? "right-2.5 opacity-100" : "right-[calc(100%-2.5px)] opacity-0"
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3 lg:gap-5">
              <Countdown timeLeft={timeLeft} />
              {exhibitorReady && exhibitorLoggedIn && <ExhibitorNavProfile variant="mobile" />}
              {(!exhibitorReady || !exhibitorLoggedIn) && (
                <Link
                  href="/visitor-registration"
                  className="hidden items-center gap-2 rounded-full bg-[#E0161D] px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#c01218] hover:shadow-md lg:inline-flex"
                >
                  Register Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-md text-[#004A96] hover:bg-slate-100 lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu
                  className={`absolute h-6 w-6 transition-all duration-200 ${
                    mobileMenuOpen ? "scale-75 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <X
                  className={`absolute h-6 w-6 transition-all duration-200 ${
                    mobileMenuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-[2px] lg:hidden"
            style={{ animation: "fadeIn 0.2s ease-out" }}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed top-[118px] right-0 left-0 z-[9999] max-h-[calc(100dvh-118px)] overflow-y-auto bg-white shadow-2xl lg:hidden"
            style={{ animation: "slideDown 0.22s ease-out" }}
          >
            <div className="px-5 py-4">
              {navItems.map((item, i) =>
                item.dropdown && item.links ? (
                  <div key={item.title} className="border-b border-slate-100">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                      className="flex w-full items-center justify-between py-3.5 text-sm font-semibold text-slate-800"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          activeDropdown === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid overflow-hidden transition-all duration-200 ${
                        activeDropdown === i ? "grid-rows-[1fr] pb-3 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden pl-2">
                        {item.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-2 text-sm ${
                              link.href === pathname ? "font-medium text-[#004A96]" : "text-slate-600"
                            }`}
                          >
                            {link.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    href={item.href!}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block border-b border-slate-100 py-3.5 text-sm font-semibold ${
                      item.href === pathname ? "text-[#004A96]" : "text-slate-800"
                    }`}
                  >
                    {item.title}
                  </Link>
                )
              )}

              <div className="mt-5 space-y-2.5">
                {exhibitorReady && !exhibitorLoggedIn && (
                  <Link
                    href="/exhibiting-enquiry"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center rounded-full bg-[#004A96] px-4 py-3 text-sm font-bold text-white"
                  >
                    Become an Exhibitor
                  </Link>
                )}
                <Link
                  href="/visitor-registration"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#E0161D] px-4 py-3 text-sm font-bold text-white"
                >
                  Register Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {exhibitorReady && exhibitorLoggedIn && (
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-full bg-[#004A96] py-3 text-center text-sm font-bold text-white"
                    >
                      My Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem("exhibitor_token")
                        localStorage.removeItem("exhibitor_data")
                        window.location.href = "/"
                      }}
                      className="w-full rounded-full bg-red-50 py-3 text-sm font-semibold text-[#E0161D]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes slideDown {
          from {
            transform: translateY(-8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-diemex-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </>
  )
}