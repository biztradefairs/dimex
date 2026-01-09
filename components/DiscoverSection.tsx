// components/DiscoverSection.tsx
import SectionContainer from './UI/SectionContainer'

export default function DiscoverSection() {
  return (
    <section className="bg-[#0E1C35] py-32 text-white">
      <SectionContainer>
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 lg:border-l lg:border-white/20 lg:pl-14">
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.85] tracking-tight">
              Discover <span className="text-[#82c6eb]">TransRussia</span>
            </h2>

            <div className="space-y-6 mt-8 max-w-3xl">
              <p className="text-lg lg:text-xl leading-relaxed">
                Download our comprehensive post-show report to unlock the
                details of CIS's premier transport and logistics exhibition.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                Download now and start planning your success!
              </p>
            </div>

            <a href="/post-show-report" className="inline-block mt-10">
              <button className="rounded-full bg-white text-[#0092D7] px-8 lg:px-10 py-3 lg:py-4 font-semibold hover:bg-[#0092D7] hover:text-white transition-colors">
                Download the 2025 Post Show Report
              </button>
            </a>
          </div>

          <div className="lg:col-span-5 grid place-content-center">
            <img
              src="/images/image.png"
              alt="Brochure"
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}