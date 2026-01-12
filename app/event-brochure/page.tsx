import React from "react"
import Image from "next/image"
import Link from "next/link"
import PartnersSection from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"

const BrochurePageContent: React.FC = () => {
  return (
    <div className="page-spacing-wrapper">
      
      {/* ================= HEADER ================= */}
      <div className="relative z-[1] bg-[#F4FAFF] pt-48 pb-10">
        <SectionContainer>
          <h1 className="title-72 text-black">
            Browse Through Your Event Brochure
          </h1>
          <p className="mt-4 max-w-4xl text-lg">
            Almost there, your brochure is waiting for you to download
          </p>
        </SectionContainer>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-16">
        <SectionContainer>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">

            {/* -------- LEFT CONTENT -------- */}
            <div>
              <div className="max-w-3xl">
                <h2 className="mt-5 text-4xl font-semibold text-mainColor2 lg:text-6xl">
                  Your Roadmap to TransRussia 2026
                </h2>

                <p className="mt-6 text-lg leading-relaxed">
                  Position your brand at the heart of Russia and Eurasia&apos;s logistics
                  market. As the region&apos;s leading B2B exhibition for transport and
                  logistics services, <strong>TransRussia</strong> connects international
                  freight forwarders, carriers, and logistics technology providers with
                  thousands of qualified buyers from across 50+ countries.
                </p>

                <hr className="my-10" />

                <h3 className="text-3xl font-semibold text-mainColor2 lg:text-5xl">
                  Download the Event Brochure to:
                </h3>

                <ul className="mt-6 space-y-4 text-lg list-disc pl-6">
                  <li>Explore exhibitor opportunities and participation packages.</li>
                  <li>Understand visitor demographics, cargo volumes, and purchasing trends.</li>
                  <li>
                    Discover how TransRussia delivers measurable ROI and long-term
                    business growth.
                  </li>
                </ul>

                <hr className="my-12" />

                <h3 className="mb-8 text-3xl font-semibold">
                  Success In Numbers
                </h3>

                <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                  <div>
                    <p className="text-5xl font-bold text-mainColor1">30,500</p>
                    <p className="mt-2 text-xl">Visitors</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-mainColor1">600+</p>
                    <p className="mt-2 text-xl">Exhibitors</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-mainColor1">160+</p>
                    <p className="mt-2 text-xl">Speakers</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-mainColor1">50+</p>
                    <p className="mt-2 text-xl">Countries Represented</p>
                  </div>
                </div>

                <div className="mt-20 flex justify-center">
                  <Image
                    src="/Brochure_Mockup_8_f53822fd4a.png"
                    alt="Event Brochure Mockup"
                    width={420}
                    height={420}
                    className="rotate-[-8deg]"
                  />
                </div>
              </div>
            </div>

            {/* -------- RIGHT FORM -------- */}
            <div className="relative">
              <div className="sticky top-32">
                <form className="w-full max-w-md space-y-4 rounded-lg border border-black/20 bg-white p-6 shadow-sm">

                  <h3 className="text-xl font-semibold text-mainColor2">
                    Download Event Brochure
                  </h3>

                  <div>
                    <label className="text-sm font-medium">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-mainColor1"
                      placeholder="Type your first name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 w-full rounded border px-3 py-2 text-sm"
                      placeholder="Type your last name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Company Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 w-full rounded border px-3 py-2 text-sm"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Job Title<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-1 w-full rounded border px-3 py-2 text-sm"
                      placeholder="Job title"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Work Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-1 w-full rounded border px-3 py-2 text-sm"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Phone<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      className="mt-1 w-full rounded border px-3 py-2 text-sm"
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Country<span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      className="mt-1 w-full rounded border bg-white px-3 py-2 text-sm"
                    >
                      <option value="">Select country</option>
                      <option>India</option>
                      <option>Russia</option>
                      <option>UAE</option>
                      <option>UK</option>
                      <option>USA</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-fit rounded bg-mainColor1 px-6 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Submit
                  </button>

                  <p className="text-[11px] leading-relaxed text-black">
                    By submitting this form, you agree to receive marketing
                    communications. You can unsubscribe anytime. Read our{" "}
                    <a
                      href="https://ite.group/en/privacy/"
                      className="underline"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* ================= PARTNERS ================= */}
      <PartnersSection />
    </div>
  )
}

export default BrochurePageContent
