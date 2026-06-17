// app/become-partner/page.tsx
import { Metadata } from "next"
import DiemexTabbedFormWrapper from "@/components/diemextabbedform"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Become a Partner | DIEMEX 2026",
  description: "Partner with DIEMEX 2026 and position your brand in front of 10,000+ decision-makers.",
}

export default function BecomePartnerPage() {
  return (
    <main className="bg-white font-parabolica">
      <div className="bg-[#F4FAFF] pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
            Become a Partner
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Partner with DIEMEX 2026 and put your brand in front of 10,000+ professionals.
          </p>
        </SectionContainer>
      </div>

      <section className="py-16">
        <SectionContainer>
          <div className="max-w-6xl mx-auto">
            <DiemexTabbedFormWrapper
              defaultTab="sponsor"
              headerTitle="Become a Sponsor / Partner"
              headerSubtitle="Partner with DIEMEX 2026 and put your brand in front of 10,000+ professionals."
            />
          </div>
        </SectionContainer>
      </section>
      <BackToTop />
    </main>
  )
}