import { Metadata } from "next"
import ContactForm from "@/components/contactSection/ContactForm"
import PartnersSlider from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"

export const metadata: Metadata = {
  title: "Contact Us | TransRussia & SkladTech",
  description: "Get in touch with TransRussia & SkladTech Expo. Contact our team for sales, marketing, technical, or general exhibition enquiries.",
}

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl font-bold text-black">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Reach out to our team for any enquiries about DIEMEX Expo 2026
          </p>
        </SectionContainer>
      </section>

      {/* FORM SECTION WITH MAP */}
      <section className="relative py-24">
        {/* Map Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/images/world-map-light.png')",
          }}
        />
        
        <div className="relative z-10">
          <SectionContainer>
            {/* Intro text */}
            <div className="mb-12 text-center">
              <p className="mx-auto max-w-2xl text-lg text-gray-700">
                Have questions or need help? Contact us below, and our team will
                respond within 24 hours.
              </p>
            </div>

            {/* Form Card */}
            <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8 md:p-10">
              <div className="mb-8">
                <h2 className="mb-2 text-3xl font-bold text-blue-700">
                  Send us a Message
                </h2>
                <p className="text-gray-700">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {/* Contact Form */}
              <ContactForm />

              {/* Contact Info */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="mb-6 text-xl font-semibold text-gray-900">
                  Other Ways to Connect
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="mt-1 text-gray-600">+91 91483 19993</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="mt-1 text-gray-600">pad@maxxmedia.in</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="font-semibold text-gray-900">Hours</h4>
                    <p className="mt-1 text-gray-600">Mon-Sat, 10AM-6PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-20 bg-gray-50">
        <SectionContainer>
          <PartnersSlider />
        </SectionContainer>
      </section>
    </main>
  )
}
