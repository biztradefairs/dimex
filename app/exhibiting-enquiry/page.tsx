// app/exhibiting-enquiry/page.tsx
import { Metadata } from "next"
import DiemexTabbedFormWrapper from "@/components/diemextabbedform"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Enquiry to Exhibit | DIEMEX 2026",
  description: "Register your interest to exhibit at DIEMEX 2026, India's leading die & mould manufacturing exhibition.",
}

export default function ExhibitorEnquiryPage() {
  return (
    <main className="bg-white font-parabolica">
      <div className="bg-[#F4FAFF] pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
            Enquiry to Exhibit
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Please complete the form below and our team will contact you regarding DIEMEX 2026 exhibiting opportunities.
          </p>
        </SectionContainer>
      </div>

      <section className="py-16">
        <SectionContainer>
          <div className="max-w-6xl mx-auto">
            <DiemexTabbedFormWrapper
              defaultTab="exhibitor"
              headerTitle="Enquire about exhibiting at our event"
              headerSubtitle="Please fill in the details below and our team will get in touch with you."
            />
          </div>
        </SectionContainer>
      </section>
      <BackToTop />
    </main>
  )
}