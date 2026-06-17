// app/visitor-registration/page.tsx
import { Metadata } from "next"
import DiemexTabbedFormWrapper from "@/components/diemextabbedform"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Visitor Registration | DIEMEX 2026",
  description: "Register to visit DIEMEX 2026, India's leading die & mould manufacturing exhibition.",
}

export default function VisitorRegistrationPage() {
  return (
    <main className="bg-white font-parabolica">
      <div className="bg-[#F4FAFF] pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
            Register to Visit
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Register now to access India's premier die & mould manufacturing exhibition.
          </p>
        </SectionContainer>
      </div>

      <section className="py-16">
        <SectionContainer>
          <div className="max-w-6xl mx-auto">
            <DiemexTabbedFormWrapper
              defaultTab="enquiry"
              headerTitle="Register as a Visitor"
              headerSubtitle="Please fill in the details below and our team will get in touch with you."
            />
          </div>
        </SectionContainer>
      </section>
      <BackToTop />
    </main>
  )
}