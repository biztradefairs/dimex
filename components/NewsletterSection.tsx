// components/NewsletterSection.tsx
import SectionContainer from './UI/SectionContainer'

export default function NewsletterSection() {
  return (
    <section className="py-32">
      <SectionContainer>
        {/* CARD */}
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#0b1f3f] to-[#0a2348] px-6 lg:px-10 xl:px-14 py-14 text-white">
          
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-[720px] space-y-6">
            <h2 className="text-4xl lg:text-5xl xl:text-[56px] leading-[1.05] font-bold tracking-tight">
              Join our Newsletter
            </h2>

            <p className="text-base lg:text-[18px] leading-relaxed text-white/90">
              Don't miss out on the latest with our weekly newsletter,
              bringing you not only the latest updates from the event but also
              cutting-edge insights from the entire industry. Don't miss
              out—subscribe now for more
            </p>

            <a href="/newsletter" className="inline-block pt-4">
              <button className="rounded-full bg-white px-8 py-3 text-[15px] font-semibold text-[#0b1f3f] transition hover:bg-[#0092D7] hover:text-white">
                Sign up Today
              </button>
            </a>
          </div>

          {/* IMAGE */}
          <img
            src="/images/image.png"
            alt="Newsletter"
            className="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-[150px] object-contain lg:block"
          />

          {/* BACKGROUND CIRCLES */}
          <div className="pointer-events-none absolute -bottom-[35%] -right-[8%] z-0 h-[400px] w-[400px] lg:h-[520px] lg:w-[520px] rounded-full bg-[#0092D7]/25" />
          <div className="pointer-events-none absolute -bottom-[20%] -right-[3%] z-0 h-[260px] w-[260px] lg:h-[360px] lg:w-[360px] rounded-full bg-[#0092D7]/25" />
        </div>
      </SectionContainer>
    </section>
  );
}