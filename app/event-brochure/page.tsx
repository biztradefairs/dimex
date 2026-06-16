import { Metadata } from "next"
import Image from "next/image"
import BrochureForm from "@/components/BrochureForm"
import PartnersSlider from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"
import DiemexTabbedFormWrapper from "@/components/diemextabbedform"

export const metadata: Metadata = {
  title: "Event Brochure |Diemex 2026",
  description: "Download the complete event brochure for Diemex Expo 2026. Explore exhibitor opportunities and visitor information.",
}

export default function BrochurePage() {
  return (
    <main className="bg-white font-parabolica">
          {/* HEADER */}
          <div className="bg-[#F4FAFF] pt-48 pb-10">
            <SectionContainer>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
                Download Event Brochure
              </h1>
              <p className="mt-4 max-w-4xl text-lg text-gray-600">
                Please complete the form below and our team will send you the complete event brochure.
              </p>
            </SectionContainer>
          </div>
    
          {/* FORM - With max width constraint */}
          <section className="py-16">
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
              <DiemexTabbedFormWrapper
                defaultTab="brochure"
                headerTitle="Download Event Brochure"
                headerSubtitle="Please fill in the details below and we will send you the complete event brochure."
              />
            </div>
          </section>
        </main>
  )
}