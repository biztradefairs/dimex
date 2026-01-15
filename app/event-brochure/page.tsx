import { Metadata } from "next"
import Image from "next/image"
import BrochureForm from "@/components/BrochureForm"
import PartnersSlider from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"

export const metadata: Metadata = {
  title: "Event Brochure | TransRussia & SkladTech",
  description: "Download the complete event brochure for TransRussia & SkladTech Expo 2026. Explore exhibitor opportunities and visitor information.",
}

export default function BrochurePage() {
  return (
    <main className="bg-white">
      {/* HEADER */}
      <div className="bg-[#F4FAFF] pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
            Browse Through Your Event Brochure
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Almost there, your brochure is waiting for you to download
          </p>
        </SectionContainer>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <SectionContainer>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* LEFT CONTENT */}
            <div>
              <div className="max-w-3xl">
                <h2 className="mt-5 text-4xl font-semibold text-blue-800 lg:text-5xl">
                  Your Roadmap to DIEMEX 2026
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Position your brand at the centre of India’s fast-growing die, mould, and precision 
                  manufacturing market. As a leading B2B exhibition for die & mould, tooling, and advanced 
                  manufacturing technologies, <strong className="text-blue-700">DIEMEX</strong> connects global solution providers with qualified buyers, 
                  OEMs, and decision-makers from across India and international markets. 
                </p>

                <hr className="my-10 border-gray-300" />

                <h3 className="text-3xl font-semibold text-blue-800 lg:text-4xl">
                  Download the Event Brochure to:
                </h3>

                <ul className="mt-6 space-y-4 pl-6 text-lg text-gray-700">
                  <li className="list-disc">Explore exhibitor opportunities and participation packages.</li>
                  <li className="list-disc">Understand visitor demographics, cargo volumes, and purchasing trends.</li>
                  <li className="list-disc">
                    Discover how TransRussia delivers measurable ROI and long-term
                    business growth.
                  </li>
                </ul>

                <hr className="my-12 border-gray-300" />

                <h3 className="mb-8 text-3xl font-semibold text-gray-900">
                  Success In Numbers
                </h3>

                <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                  <div>
                    <p className="text-5xl font-bold text-blue-600">30,500</p>
                    <p className="mt-2 text-xl text-gray-700">Visitors</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-600">600+</p>
                    <p className="mt-2 text-xl text-gray-700">Exhibitors</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-600">160+</p>
                    <p className="mt-2 text-xl text-gray-700">Speakers</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-blue-600">50+</p>
                    <p className="mt-2 text-xl text-gray-700">Countries Represented</p>
                  </div>
                </div>

                <div className="mt-20 flex justify-center">
                  <div className="relative">
                    <Image
                      src="/Brochure_Mockup_8_f53822fd4a.png"
                      alt="Event Brochure Mockup"
                      width={420}
                      height={420}
                      className="rotate-[-8deg] transform shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="relative">
              <div className="sticky top-32">
                <BrochureForm />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* PARTNERS */}
      <section className="py-20 bg-gray-50">
        <SectionContainer>
          <PartnersSlider />
        </SectionContainer>
      </section>
    </main>
  )
}
