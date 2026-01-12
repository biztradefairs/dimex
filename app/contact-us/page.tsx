// app/contact/page.tsx
import { Metadata } from "next"
import ContactForm from "@/components/contactSection/ContactForm"
import PartnersSlider from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"

export const metadata: Metadata = {
  title: "Contact Us | TransRussia & SkladTech",
  description:
    "Get in touch with TransRussia & SkladTech Expo. Contact our team for sales, marketing, technical, or general exhibition enquiries.",
}

export default function ContactPage() {
  return (
    <main className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl font-bold text-black">
            Contact Us
          </h1>
        </SectionContainer>
      </section>

      {/* ================= FORM SECTION WITH MAP ================= */}
      <section className="relative py-24">

        {/* Map Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/world-map-light.png)",
          }}
        />

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-white/75" />

        <div className="relative z-10">
          <SectionContainer>

            {/* Intro text */}
            <div className="mb-12 text-center">
              <p className="mx-auto max-w-2xl text-lg text-gray-700">
                Have questions or need help? Contact us below, and our team will
                respond promptly.
              </p>
            </div>

            {/* Form Card */}
            <div className="mx-auto max-w-3xl rounded-md border border-gray-200 bg-white p-8 shadow-2xl sm:p-10">

              <h2 className="mb-2 text-3xl font-bold text-blue-700">
                Contact Us
              </h2>

              <p className="mb-6 text-gray-700">
                For any enquiries, feel free to reach out to us.
              </p>

              {/* Existing Form */}
              <ContactForm />

            </div>

          </SectionContainer>
        </div>
      </section>

      {/* ================= PARTNERS SECTION ================= */}
      <section className="py-20">
        <SectionContainer>
          <PartnersSlider />
        </SectionContainer>
      </section>

    </main>
  )
}
