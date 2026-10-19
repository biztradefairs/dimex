import Image from 'next/image';
import { Handshake, Lightbulb } from 'lucide-react';
import SectionContainer from './UI/SectionContainer';

export default function AboutDiemexSection() {
  return (
    <section
      id="about-diemex-2027"
      aria-labelledby="about-diemex-2027-heading"
      className="scroll-mt-28 bg-[#F4F7FB] py-16 font-parabolica sm:py-20 lg:scroll-mt-44 lg:py-24"
    >
      <SectionContainer>
        <div className="overflow-hidden rounded-2xl border border-[#004A96]/10 bg-white shadow-[0_16px_56px_-32px_rgba(0,56,117,0.3)] sm:rounded-3xl">
          <div className="grid lg:grid-cols-12">
            <figure className="relative isolate aspect-[4/3] min-w-0 overflow-hidden bg-[#003875] sm:aspect-[16/9] lg:col-span-5 lg:aspect-auto lg:min-h-[580px]">
              <Image
                src="/images/media-gallery/EX25_2.webp"
                alt="Visitors exploring die and tooling technologies at the DIEMEX 2025 exhibition"
                fill
                sizes="(min-width: 1536px) 640px, (min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#003875] via-[#003875]/40 to-[#003875]/5" />
              <figcaption className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 lg:p-9 xl:p-12">
                <span aria-hidden="true" className="mb-5 block h-1 w-12 bg-[#E0161D]" />
                <h2
                  id="about-diemex-2027-heading"
                  className="text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl xl:text-[3.5rem]"
                >
                  <span className="mb-2 block text-xl font-medium tracking-normal text-white/80 sm:text-2xl">About</span>{' '}
                  DIEMEX 2027
                </h2>
                <span className="mt-5 block text-xs font-medium uppercase tracking-[0.2em] text-white/75 sm:text-sm">
                  Die. Mould. Tooling.
                </span>
              </figcaption>
            </figure>

            <div className="min-w-0 p-6 sm:p-9 lg:col-span-7 lg:p-10 xl:p-12">
              <div className="mb-5 flex items-center gap-3" aria-hidden="true">
                <span className="h-0.5 w-8 bg-[#E0161D]" />
                <span className="h-0.5 w-16 bg-[#004A96]/20" />
              </div>
              <h3 className="max-w-2xl text-[1.65rem] font-semibold leading-[1.25] tracking-tight text-[#132D49] sm:text-3xl xl:text-[2.125rem]">
                A Platform for the{' '}
                <span className="text-[#004A96]">Die, Mould and Tooling Industry</span>
              </h3>

              <p className="mt-6 text-base leading-[1.8] text-[#526174] sm:text-lg">
                <strong className="font-semibold text-[#004A96]">DIEMEX 2027</strong>{' '}
                is an industry-focused exhibition designed to connect manufacturers,
                technology providers, suppliers, buyers and professionals from the die,
                mould, tooling and precision manufacturing sectors.
              </p>

              <div className="mt-7 divide-y divide-[#004A96]/10 border-t border-[#004A96]/10">
                <div className="flex items-start gap-4 py-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#004A96]/[0.06] text-[#004A96]">
                    <Lightbulb aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <p className="text-base leading-[1.8] text-[#526174]">
                    The exhibition provides opportunities to explore manufacturing solutions,
                    learn about industry developments, strengthen business networks and
                    discover technologies supporting modern manufacturing.
                  </p>
                </div>
                <div className="flex items-start gap-4 pb-1 pt-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E0161D]/[0.06] text-[#E0161D]">
                    <Handshake aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <p className="text-base leading-[1.8] text-[#526174]">
                    Whether you manufacture dies and moulds, supply machining solutions,
                    provide tooling technology or seek manufacturing partners, DIEMEX offers
                    a platform to explore opportunities and connect with the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
