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
      
      <div className="container grid size-full min-h-screen">
        <div className="flex flex-col justify-end gap-5 pb-16">
          <h1 className="text-[140px] leading-[0.8] font-bold tracking-tight hero-element">
            TransRussia <span className="text-[#33A8DF]">2026</span>
          </h1>
          
<div className="mt-8 flex items-center justify-between gap-10">
            {/* LEFT TEXT */}
            <div className="max-w-none">
              <h2
                // ref={subtitleRef}
                className="mb-6 whitespace-nowrap text-3xl font-bold leading-tight sm:whitespace-normal"
              >
                Where global logistics companies connect with CIS market leaders
              </h2>

              <ul
                // ref={listRef}
                className="space-y-4 text-lg"
              >
                <li className="flex gap-3 whitespace-nowrap sm:whitespace-normal">
                  <span className="text-[#33A8DF]">•</span>
                  <span>
                    30th Edition of the International Exhibition for Transport & Logistics Services, Warehouse Equipment, and Technologies
                  </span>
                </li>

                <li className="flex gap-3 whitespace-nowrap sm:whitespace-normal">
                  <span className="text-[#33A8DF]">•</span>
                  <span>
                    5th Edition of SkladTech Leading B2B Exhibition for Warehouse Equipment
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <a href="/exhibiting-enquiry">
                <button
                  // ref={buttonRef}
                  className="rounded-full bg-[#33A8DF] px-12 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#33A8DF]/40"
                >
                  Book Your Stand
                </button>
              </a>
            </div>
          </div>
        


        </div>
      </div>
    </section>
  )
}