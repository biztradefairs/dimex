import Link from "next/link"
import { 
  FaLinkedinIn, 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube, 
  FaTwitter 
} from "react-icons/fa"

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#004D9F] text-white">
      {/* TOP BRAND BAR */}
      <div className="bg-gradient-to-r from-[#06162f] to-[#0a2b57] py-10">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">D</span>
                </div>
                <div>
                  <div className="text-xl font-bold">DIEMEX</div>
                  <div className="text-sm">2026</div>
                </div>
              </div>

              <div className="h-10 w-px bg-white/40" />
 {false && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-300" />
                <div className="text-xl font-bold"></div>)}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex flex-wrap justify-between gap-10">
          {/* ABOUT */}
          <div className="max-w-md space-y-5">
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
          <div className="max-w-md space-y-5">
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
          <div className="max-w-md space-y-5">
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
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/diemex-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="h-5 w-5 text-blue-600 hover:text-white" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/diemex_india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 hover:opacity-90 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-5 w-5 text-white" />
                </a>

                {/* Facebook */}
                {/* <a
                  href="https://www.facebook.com/diemexindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 hover:bg-blue-800 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-5 w-5 text-white" />
                </a> */}

                {/* Twitter */}
                {/* <a
                  href="https://twitter.com/diemexindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 hover:bg-sky-600 transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-5 w-5 text-white" />
                </a> */}
              </div>
              
              <p className="mt-3 text-sm text-white/60">
                Follow us for latest updates and news
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 py-5 text-sm">
          <div className="flex items-center gap-3">
            <span className="text-white/70">Organised By</span>
            <div className="h-8 w-52 rounded bg-white/40 flex items-center justify-center">
              <span className="font-bold text-white">MAXX</span>
<span className="mx-2 font-bold text-white-400">BUSINESS</span>
<span className="font-bold text-white">MEDIA</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white/70">
            <span>© DIEMEX 2026. All Rights Reserved</span>
            <div className="flex gap-3">
              <a
                href="https://maxxmedia.in/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="https://maxxmedia.in/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://maxxmedia.in/cookies/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white hover:underline transition-colors"
              >
                Cookie Policy
              </a>
              <a 
                href="/sitemap.xml" 
                className="hover:text-white hover:underline transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
