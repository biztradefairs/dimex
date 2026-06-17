// app/event-brochure/page.tsx
import { Metadata } from "next"
import DiemexTabbedFormWrapper from "@/components/diemextabbedform"
import PartnersSlider from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Event Brochure | DIEMEX 2026",
  description: "Download the complete event brochure for DIEMEX 2026. Explore exhibitor opportunities and visitor information.",
}

export default function BrochurePage() {
  return (
    <main className="bg-white font-parabolica">
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
          <div className="max-w-7xl mx-auto">
            <DiemexTabbedFormWrapper
              defaultTab="brochure"
              headerTitle="Download Event Brochure"
              headerSubtitle="Fill in your details to receive the DIEMEX 2026 event brochure instantly."
              showHeader={true}
            />
          </div>
        </SectionContainer>
      </section>

      {/* PARTNERS */}
      <section className="py-20 bg-gray-50">
        <SectionContainer>
          <PartnersSlider />
        </SectionContainer>
      </section>
      <BackToTop />
    </main>
  )
}