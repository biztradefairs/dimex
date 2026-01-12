// components/Footer.tsx - UPDATED WITH NAVBAR ALIGNMENT
import Link from "next/link"
export default function Footer() {
  return (
    <footer id="footer" className="text-white bg-[#004D9F]">
      {/* TOP BRAND BAR */}
      <div className="bg-linear-to-r from-[#06162f] to-[#0a2b57] py-10">
        <div className="mx-auto max-w-375 px-5">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500" />
                <div>
                  <div className="text-xl font-bold">DIEMEX</div>
                  <div className="text-sm">2026</div>
                </div>
              </div>

              <div className="h-10 w-px bg-white/40" />

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-300" />
                <div className="text-xl font-bold"></div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-375 px-5 py-12">
        <div className="flex flex-wrap justify-between gap-10">
          {/* ABOUT */}
          <div className="max-w-md space-y-5">
            <p className="text-white/70">
              DIEMEX 2026 is a premier international exhibition showcasing die & mould technologies, tool room solutions, precision components, and next-generation manufacturing systems.
            </p>

            <div>
              <h5 className="mb-2 font-semibold">Contact Us</h5>
              <div className="text-white/70">
                <p>+91 91483 19993</p>
                <a
                  href="mailto:pad@maxxmedia.in"
                  className="hover:underline"
                >
                  pad@maxxmedia.in
                </a>
              </div>
            </div>
          </div>

          {/* HOURS + VENUE */}
          <div className="max-w-md space-y-5">
            <div>
              <h5 className="mb-2 font-semibold">Opening Hours</h5>
              <div className="text-white/70 space-y-1">
                <p>
                  <strong>08 October 2026:</strong> 10:00—18:00
                </p>
                <p>
                  <strong>09 October 2026:</strong> 10:00—18:00
                </p>
                <p>
                  <strong>10 October 2026:</strong> 10:00—18:00
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
              <div className="flex flex-col gap-1 text-white/70">
                <Link href="/exhibiting-enquiry" className="hover:underline">
                  Become an Exhibitor
                </Link>
                <Link href="/post-show-report" className="hover:underline">
                  Download post-show report
                </Link>
                <Link href="/event-brochure" className="hover:underline">
                  Download event brochure
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white"
                >
                  <div className="h-4 w-4 rounded bg-blue-600" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/diemex_india"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-purple-500 via-pink-500 to-yellow-400"
                >
                  <div className="h-4 w-4 rounded bg-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
   

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 py-5 text-sm">
          <div className="flex items-center gap-2">
            <span>Organised By </span>
            <div className="h-6 w-16 rounded bg-white/20" />
          </div>

          <div className="flex flex-wrap gap-3 text-white/70">
            <span>© DIEMEX 2026. All Rights Reserved</span>
            <a
              href="https://maxxmedia.in/terms-of-use"
              target="_blank"
              className="hover:underline"
            >
              Terms
            </a>
            <a
              href="https://maxxmedia.in/privacy"
              target="_blank"
              className="hover:underline"
            </a>
              Privacy
            </a>
            <a
              href="https://maxxmedia.in/cookies/"
              target="_blank"
              className="hover:underline"
            >
              Cookies
            </a>
            <a href="/sitemap.xml" className="hover:underline">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
    )
}
