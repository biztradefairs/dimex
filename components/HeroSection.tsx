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
      <div className="absolute inset-0 z-[-1] bg-black/50 md:bg-gradient-to-t md:from-black/70 md:via-black/40 md:to-transparent" />
      
      {/* Content container aligned with navbar */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
          <div className="flex flex-col justify-end gap-5 pb-16 min-h-screen">
            {/* MAIN HEADING - Adjusted for mobile */}
            <h1 className="text-[70px] sm:text-[100px] md:text-[120px] lg:text-[150px] xl:text-[170px] leading-[0.85] font-bold tracking-tight mt-32 lg:mt-0">
              DIEMEX <span className="text-[#33A8DF]">2026</span>
            </h1>
            
            {/* CONTENT - Adjusted for mobile */}
           <div className="mt-8 flex flex-col lg:flex-row lg:items-end gap-6">
  
  {/* LEFT TEXT */}
  <div className="lg:max-w-5xl">
    <h2 className="mb-3 text-2xl sm:text-3xl font-bold leading-snug">
Where global die & mould leaders connect with India’s manufacturing ecosystem.    </h2>

    <ul className="space-y-2 text-base sm:text-lg leading-snug">
      <li className="flex gap-2 items-start">
        <span className="text-[#33A8DF] mt-[2px]">•</span>
        <span>
3rd Edition of the International Exhibition for Die & Mould, Tooling, and Precision Manufacturing Technologies</span>
      </li>

      <li className="flex gap-2 items-start">
        <span className="text-[#33A8DF] mt-[2px]">•</span>
        <span>
        </span>
      </li>
    </ul>
  </div>

  {/* CTA BUTTON */}
  <div className="shrink-0 mt-6 lg:mt-0 lg:ml-auto">
    <a href="/exhibiting-enquiry">
      <button className="rounded-full bg-[#33A8DF] px-12 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#33A8DF]/40">
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
