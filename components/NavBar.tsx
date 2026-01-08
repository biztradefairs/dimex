"use client"

import { useState } from "react"
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
  { title: "Connect", href: "/connect", dropdown: false },
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
      { text: "Partners & Sponsors", href: "/partners-and-sponsors"}
    ],
  },
  { title: "Contact us", href: "/contact-us", dropdown: false },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <header className="hidden xl:block fixed top-5 left-1/2 z-50 w-full -translate-x-1/2">
        <div className="flex justify-center px-5">
          <div
            className="
              w-full max-w-375
              rounded-full
              px-6 py-3
              text-white
              bg-linear-to-r from-[#06162f] to-[#0a2b57]
              shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]
            "
          >
            <div className="flex items-center justify-between gap-6">
              {/* LOGO */}
              <div className="flex items-center gap-5">
                <Link href="/" className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-500" />
                    <div>
                      <div className="font-bold leading-none">TransRussia</div>
                      <div className="text-xs">©24</div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-white/40" />
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-300" />
                    <div className="font-bold">SkladTech</div>
                  </div>
                </Link>

                <div className="flex flex-col text-sm">
                  <span>17–19 March 2026</span>
                  <span>Crocus Expo, Pavilion 3</span>
                </div>
              </div>

              {/* NAV LINKS */}
              <nav className="flex items-center gap-6">
                {navItems.map((item, i) =>
                  item.dropdown ? (
                    <div key={i} className="relative group">
                      <button className="flex items-center gap-1 hover:text-gray-200">
                        {item.title}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      <div className="absolute left-0 top-full hidden group-hover:block pt-3">
                        <div className="min-w-48 rounded-lg bg-white py-2 shadow-xl">
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

              {/* CTA */}
              <div className="flex items-center gap-3">
                <Button href="/exhibiting-enquiry">Become an Exhibitor</Button>
                <Button href="/visitor-registration">Register Now</Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE NAVBAR ================= */}
      <header className="xl:hidden fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-[#06162f] to-[#0a2b57] px-4 py-3 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">
            TransRussia · SkladTech
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full bg-white/10 p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className="mt-1 text-xs">
          17–19 March 2026 · Crocus Expo, Pavilion 3
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 rounded-xl bg-[#06162f] p-4">
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
