// components/HeroSection.tsx - UPDATED
export default function HeroSection() {
  return (
    <section id="heroSection" className="relative min-h-screen text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-[-2] overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url(/images/image.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[-1] bg-black/50 md:bg-linear-to-t md:from-black/70 md:via-black/40 md:to-transparent" />

      {/* Navbar-aligned container */}
      <div className="w-full px-4 sm:px-6 xl:px-10">
        <div className={`
          mx-auto
          min-h-screen
          w-full
          max-w-[1180px]
          2xl:max-w-[1400px]
          3xl:max-w-[1800px]
        `}>
          <div className="flex min-h-screen flex-col justify-end gap-6 pb-16">
            {/* MAIN TITLE */}
            <h1 className="text-[100px] lg:text-[140px] xl:text-[170px] leading-[0.8] font-bold tracking-tight">
              TransRussia <span className="text-[#33A8DF]">2026</span>
            </h1>

            {/* BOTTOM ROW */}
            <div className="mt-8 flex flex-col lg:flex-row w-full items-end justify-between gap-8">
              {/* LEFT TEXT */}
              <div className="max-w-[1100px]">
                <h2 className="mb-1 text-2xl lg:text-3xl font-bold leading-tight">
                  Where global logistics companies connect with CIS market leaders
                </h2>

                <ul className="text-base lg:text-lg mt-4">
                  <li className="flex gap-2 items-start">
                    <span className="text-[#33A8DF] mt-1">•</span>
                    <span>
                      30th Edition of the International Exhibition for Transport &
                      Logistics Services, Warehouse Equipment, and Technologies
                    </span>
                  </li>

                  <li className="flex gap-2 items-start mt-2">
                    <span className="text-[#33A8DF] mt-1">•</span>
                    <span>
                      5th Edition of SkladTech Leading B2B Exhibition for Warehouse
                      Equipment
                    </span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="shrink-0 mt-8 lg:mt-0">
                <a href="/exhibiting-enquiry">
                  <button className="rounded-full bg-[#33A8DF] px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#33A8DF]/40">
                    Book Your Stand
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}