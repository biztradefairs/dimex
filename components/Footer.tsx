// components/Footer.tsx - UPDATED WITH NAVBAR ALIGNMENT
import Link from "next/link"

export default function Footer() {
  return (
    <footer id="footer" className="text-white bg-[#040d1f]">
      {/* TOP BRAND BAR - Full width */}
      <div className="bg-gradient-to-r from-[#06162f] to-[#0a2b57] py-10">
        <div className="w-full px-4 sm:px-6 xl:px-10">
          <div className={`
            mx-auto
            w-full
            max-w-[1180px]
            2xl:max-w-[1400px]
            3xl:max-w-[1800px]
          `}>
            <div className="flex items-center gap-5">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500" />
                  <div>
                    <div className="text-xl font-bold">TransRussia</div>
                    <div className="text-sm">©24</div>
                  </div>
                </div>

                <div className="h-10 w-px bg-white/40" />

                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-300" />
                  <div className="text-xl font-bold">SkladTech</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - Aligned with navbar */}
      <div className="w-full px-4 sm:px-6 xl:px-10 py-12">
        <div className={`
          mx-auto
          w-full
          max-w-[1180px]
          2xl:max-w-[1400px]
          3xl:max-w-[1800px]
        `}>
          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
            {/* ABOUT */}
            <div className="max-w-md space-y-5">
              <p className="text-white/70">
                TransRussia is Eurasia&apos;s leading international exhibition for
                transport and logistics services, warehouse equipment, and IT
                solutions.
              </p>

              <div>
                <h5 className="mb-2 font-semibold">Contact Us</h5>
                <div className="text-white/70 space-y-1">
                  <p>+7-(495)-799-55-85</p>
                  <a
                    href="mailto:marketing@ite.group"
                    className="hover:underline"
                  >
                    marketing@ite.group
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
                    <strong>17 March 2026:</strong> 10:00—18:00
                  </p>
                  <p>
                    <strong>18 March 2026:</strong> 10:00—18:00
                  </p>
                  <p>
                    <strong>19 March 2026:</strong> 10:00—16:00
                  </p>
                </div>
              </div>

              <div>
                <h5 className="mb-2 font-semibold">Venue</h5>
                <p className="text-white/70">
                  Crocus Expo IEC, Moscow, Pavilion 3
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
                  <Link href="/articles" className="hover:underline">
                    Industry News
                  </Link>
                  <Link href="/sectors" className="hover:underline">
                    Event Sectors
                  </Link>
                </div>
              </div>

              <div>
                <h5 className="mb-2 font-semibold">Stay Connected</h5>
                <div className="flex gap-3">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/transrussia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white hover:scale-105 transition-transform"
                  >
                    <svg className="h-4 w-4" fill="#0A66C2" viewBox="0 0 24 24">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/expotransrussia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 hover:scale-105 transition-transform"
                  >
                    <svg className="h-5 w-5" fill="#ffffff" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a
                    href="https://t.me/transrussia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0088cc] hover:scale-105 transition-transform"
                  >
                    <svg className="h-5 w-5" fill="#ffffff" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.155c-.172-.736-.708-.903-1.202-.956-.494-.053-1.692.118-2.168.236-.588.147-1.232.308-1.232.308s-.65.162-.65.5c0 .337.337.428.637.472.3.044 1.1.044 1.1.044l.354 4.908s-.118.56-.472.65c-.354.09-.826-.147-.972-.207-.146-.06-2.601-1.183-3.5-1.721-.898-.538-.538-.898.118-1.456.656-.558 2.602-2.183 2.602-2.183s.294-.325.088-.472c-.206-.147-.472-.103-.472-.103-.56-.044-1.006-.088-1.318-.147-.313-.059-.708-.207-.972-.354-.265-.147-.59-.472-.442-.956.147-.484.708-.708 1.358-.885.65-.177 2.953-.59 4.778-.59 1.825 0 3.5.236 4.13.354.63.118 1.064.354 1.232 1.09z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="w-full px-4 sm:px-6 xl:px-10">
        <div className={`
          mx-auto
          w-full
          max-w-[1180px]
          2xl:max-w-[1400px]
          3xl:max-w-[1800px]
        `}>
          {/* Organiser Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-4 bg-white/10 rounded-full px-6 py-3">
              <span className="text-sm font-medium">Organised By</span>
              <div className="flex items-center gap-2">
                <div className="h-8 w-24 bg-white/30 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">ITE Group</span>
                </div>
                <div className="h-6 w-px bg-white/40" />
                <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs">RU</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Links */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 border-t border-white/20 pt-6 pb-4">
            <div className="text-sm text-white/70">
              <span>© TransRussia 2025. All Rights Reserved</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
              <a
                href="https://ite.group/en/terms-of-use"
                target="_blank"
                className="hover:underline hover:text-white transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="https://ite.group/en/privacy"
                target="_blank"
                className="hover:underline hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="https://ite.group/en/cookies/"
                target="_blank"
                className="hover:underline hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
              <a 
                href="/sitemap.xml" 
                className="hover:underline hover:text-white transition-colors"
              >
                Sitemap
              </a>
              <a 
                href="/contact-us" 
                className="hover:underline hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Powered by */}
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>Powered by</span>
              <a
                href="https://prismetic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold uppercase hover:underline hover:text-white transition-colors"
              >
                Prismetic
              </a>
            </div>
          </div>

          {/* Event Information */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <div className="text-xs text-white/50 space-y-2">
              <p>TransRussia 2026 • 17–19 March 2026 • Crocus Expo, Pavilion 3 • Moscow, Russia</p>
              <p>For exhibition enquiries: +7-(495)-799-55-85 | marketing@ite.group</p>
              <p className="mt-4">This website uses cookies to enhance user experience. By continuing to browse, you agree to our use of cookies.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}