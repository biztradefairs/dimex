import Link from "next/link"
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter
} from "react-icons/fa"
import Image from "next/image"

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#004D9F] text-white font-parabolica">
      {/* TOP BRAND BAR */}
      <div className="bg-gradient-to-r from-[#06162f] to-[#0a2b57] py-10">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo-diemex2.png"
                  alt="DIEMEX 2026 Logo"
                  width={120}
                  height={80}
                  className="object-contain"
                  priority
                />
                <span className="h-8 w-px bg-white/70 mx-2"></span>
                <Image
                  src="/images/3rd-edition.png"
                  alt="DIEMEX 2026 Logo"
                  width={120}
                  height={80}
                  className="object-contain mb-1"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-col lg:flex-row flex-wrap justify-between gap-10">
          {/* ABOUT */}
          <div className="lg:max-w-md space-y-5">
            <p className="text-white/70">
              DIEMEX 2026 is a premier international exhibition showcasing die & mould technologies, tool room solutions, precision components, and next-generation manufacturing systems.
            </p>

            <div>
              <h5 className="mb-2 font-semibold">Contact Us</h5>
              <div className="text-white/70">
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+91 91483 19993</span>
                </p>
                <a
                  href="mailto:pad@maxxmedia.in"
                  className="hover:underline flex items-center gap-2 mt-1"
                >
                  <span>✉️</span>
                  <span>pad@maxxmedia.in</span>
                </a>
              </div>
            </div>
          </div>

          {/* HOURS + VENUE */}
          <div className="lg:max-w-md space-y-5">
            <div>
              <h5 className="mb-2 font-semibold">Opening Hours</h5>
              <div className="text-white/70 space-y-1">
                <p className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span><strong>08 October 2026:</strong> 10:00—18:00</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span><strong>09 October 2026:</strong> 10:00—18:00</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  <span><strong>10 October 2026:</strong> 10:00—18:00</span>
                </p>
              </div>
            </div>

            <div>
              <h5 className="mb-2 font-semibold">Venue</h5>
              <p className="text-white/70">
                Auto Cluster Exhibition Centre, Pune, India
              </p>
            </div>
          </div>

          {/* LINKS + SOCIAL */}
          <div className="lg:max-w-md space-y-5">
            <div>
              <h5 className="mb-2 font-semibold">Quick Links</h5>
              <div className="flex flex-col gap-2 text-white/70">
                <Link
                  href="/exhibiting-enquiry"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Become an Exhibitor
                </Link>
                <Link
                  href="/post-show-report"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Download post-show report
                </Link>
                <Link
                  href="/event-brochure"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Download event brochure
                </Link>
                <Link
                  href="/contact-us"
                  className="hover:underline hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div>
              <h5 className="mb-2 font-semibold">Stay Connected</h5>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/diemex-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="h-5 w-5 text-blue-600 hover:text-white" />
                </a>

                <a
                  href="https://www.instagram.com/diemex_india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 hover:opacity-90 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5 text-white" />
                </a>
              </div>

              <p className="mt-3 text-sm text-white/60">
                Follow us for latest updates and news
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 border-t border-white/20 py-5 text-sm">
          {/* Organized By - Updated for mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-sm text-white/70 mb-2 sm:mb-0">Organised By</span>
            
            <div className="flex items-center rounded-md bg-white px-4 py-2 shadow-sm whitespace-nowrap min-w-0">
              <span className="font-bold text-[#004A96] text-sm sm:text-base">
                MAXX BUSINESS MEDIA PVT. LTD.
              </span>
            </div>
          </div>

          {/* Copyright and Links - Updated for mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-white/90 text-center sm:text-left">
            <span className="text-sm sm:text-base">© DIEMEX 2026. All Rights Reserved</span>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm">
              <Link
                href="/termstouse"
                className="hover:text-white hover:underline transition-colors px-1"
              >
                Terms of Use
              </Link>
              <span className="text-white/40">•</span>
              <Link
                href="/privacy-policy"
                className="hover:text-white hover:underline transition-colors px-1"
              >
                Privacy Policy
              </Link>
              <span className="text-white/40">•</span>
              <Link
                href="/cookies-policy"
                className="hover:text-white hover:underline transition-colors px-1"
              >
                Cookie Policy
              </Link>
              {/* Sitemap removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}