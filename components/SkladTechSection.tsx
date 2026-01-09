// components/SkladTechSection.tsx
import SectionContainer from './UI/SectionContainer'

export default function SkladTechSection() {
  return (
    <section className="relative py-32">
      <SectionContainer>
        <div className="grid items-center gap-16 lg:grid-cols-3">
          
          {/* LEFT ICON */}
          <div className="grid place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-sm"
              fill="none"
              viewBox="0 0 309 309"
            >
              <path
                fill="#33A8DF"
                d="M154.5 0 0 154v93.211L154.5 93.236l84.188 83.916v83.915H70.312v1.31L24.516 308H309V154L154.5 0Z"
              />
              <path
                fill="#0092D7"
                d="M195.5 308.062 70 177v84l52.5 47.062"
              />
            </svg>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-2 flex flex-col gap-8">
            <div className="flex w-fit items-center gap-3 rounded-full bg-[#F4F4F4] py-2 pe-5 pl-3">
              <img
                src="/images/logo-icon-4.png"
                alt="SkladTech"
                className="w-6"
              />
              <span className="text-sm font-medium">
                Two Leading Events, One Location
              </span>
            </div>

            <h2 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-[0.85] tracking-tight text-black">
              SkladTech
            </h2>

            <div className="max-w-3xl space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                Discover SkladTech, the premier showcase of cutting-edge warehouse
                equipment designed for maximum commercial impact. Held collocated
                with TransRussia, SkladTech offers unparalleled exposure to
                warehousing buyers at the industry's most significant gathering
                in CIS.
              </p>
            </div>

            <a href="/about-skladtech" className="w-fit">
              <button className="group flex items-center justify-center gap-2 rounded-full bg-[#0092D7] px-8 lg:px-10 py-3 lg:py-4 text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[#33A8DF]">
                Discover SkladTech
              </button>
            </a>
          </div>

        </div>
      </SectionContainer>
    </section>
  )
}