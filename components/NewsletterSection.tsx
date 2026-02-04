// components/NewsletterSection.tsx - RESPONSIVE VERSION
import SectionContainer from './UI/SectionContainer'

export default function NewsletterSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-32">
      <SectionContainer>
        {/* CARD */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[36px] bg-gradient-to-r from-[#0b1f3f] to-[#0a2348] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-14 py-8 sm:py-10 lg:py-12 xl:py-14 text-white">
          
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-[1050px] space-y-4 sm:space-y-5 lg:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[56px] leading-[1.05] font-bold tracking-tight">
              Join our Newsletter
            </h2>

            <p className="text-sm sm:text-base lg:text-[18px] leading-relaxed text-white/90">
              Don't miss out on the latest with our weekly newsletter,
              bringing you not only the latest updates from the event but also
              cutting-edge insights from the entire industry. Don't miss
              out—subscribe now for more
            </p>

            <a href="/newsletter" className="inline-block pt-3 sm:pt-4">
              <button className="rounded-full bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-[15px] font-semibold text-[#0b1f3f] transition hover:bg-[#004D9F] hover:text-white">
                Sign up Today
              </button>
            </a>
          </div>

          {/* IMAGE - Hidden on mobile, visible on lg+ */}
          <img
            src="https://cdn.itegroupnews.com/img_11_445fce1f7c.png"
            alt="Newsletter"
            className="pointer-events-none absolute bottom-0 right-0 z-10 hidden lg:block h-[200px] lg:h-[250px] xl:h-[300px] object-contain"
          />

          {/* BACKGROUND CIRCLES */}
          <div className="pointer-events-none absolute -bottom-[35%] -right-[8%] z-0 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[520px] lg:w-[520px] rounded-full bg-[#0092D7]/25" />
          <div className="pointer-events-none absolute -bottom-[20%] -right-[3%] z-0 h-[200px] w-[200px] sm:h-[260px] sm:w-[260px] lg:h-[360px] lg:w-[360px] rounded-full bg-[#0092D7]/25" />
        </div>
      </SectionContainer>
    </section>
  );
}