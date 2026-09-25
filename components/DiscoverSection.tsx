// components/DiscoverSection.tsx
import SectionContainer from './UI/SectionContainer'

export default function DiscoverSection() {
  return (
    <section className="bg-[#004A96] py-32 text-white">
      <SectionContainer>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 lg:border-l lg:border-white/20 lg:pl-14">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.85] tracking-tight">
              Discover <span className="text-[#E0161D]">DIEMEX</span>
            </h2>

            <div className="space-y-6 mt-8 max-w-3xl">
              <p className="text-lg lg:text-xl leading-relaxed">
               Download our comprehensive post-show report to gain key insights into India’s premier die & mould and tooling exhibition, including visitor profiles, exhibitor highlights, and market trends.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                Download now and start planning your success!
              </p>
            </div>

            <a href="/post-show-report" className="inline-block mt-10">
              <button className="rounded-full bg-white text-[#004A96] px-8 lg:px-10 py-3 lg:py-4 font-semibold hover:bg-[#E0161D] hover:text-white transition-colors">
                Download the 2025 Post Show Report
              </button>
            </a>
          </div>

          <div className="lg:col-span-5 grid place-content-center">
  <img
    src="/images/Why-Exhibit/brochure.png"
    alt="Brochure"
    className="w-full max-h-[400px] object-contain rounded-2xl bg-transparent"
  />
</div>

        </div>
      </SectionContainer>
    </section>
  );
}