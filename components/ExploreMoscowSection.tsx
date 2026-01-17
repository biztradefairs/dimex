// components/ExploreMoscowSection.tsx
import SectionContainer from './UI/SectionContainer'

export default function ExplorePuneSection() {
  return (
    <section className="relative overflow-hidden py-32">
      <SectionContainer>
        <div className="flex flex-col gap-8">
          
          {/* HEADING */}
          <h2 className="text-5xl lg:text-6xl font-[600] leading-[0.85] tracking-tight text-black">
            Explore Pune Beyond the Exhibition
          </h2>

          {/* DESCRIPTION */}
          <div className="max-w-3xl space-y-6">
            <p className="text-lg lg:text-xl leading-relaxed text-black">
              Make the most of your visit to DIEMEX 2026 by experiencing the dynamic city of Pune—a major hub for automotive, engineering, and manufacturing excellence. Explore key industrial corridors, business districts, cultural landmarks, and dining destinations that perfectly complement your exhibition and networking experience.git
            </p>
          </div>

          {/* CTA */}
          <a href="/explore-moscow" className="mt-6 w-fit">
            <button className="flex items-center justify-center gap-2 rounded-full bg-[#0092D7] px-8 lg:px-10 py-3 lg:py-4 text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[#33A8DF]">
              City Guide
            </button>
          </a>

        </div>
      </SectionContainer>
    </section>
  );
}