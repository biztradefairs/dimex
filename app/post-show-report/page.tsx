import { Metadata } from "next"
import PostShowReportForm from "@/components/PostShowReportForm"
import PartnersSlider from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"

export const metadata: Metadata = {
  title: "Post-Show Report | TransRussia & SkladTech",
  description: "Download the complete post-show report for TransRussia & SkladTech Expo. See event statistics, success metrics, and exhibitor feedback.",
}

export default function PostShowReportPage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl lg:text-6xl font-bold text-black">
            Proven Success
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            Get to know how we helped our participants achieve their business goals.
          </p>
        </SectionContainer>
      </section>

      {/* CONTENT + FORM */}
      <section className="py-20">
        <SectionContainer>
          <div className="grid items-start gap-14 lg:grid-cols-2">
            {/* LEFT CONTENT */}
            <div>
              <h2 className="mb-6 text-4xl font-semibold text-gray-800 lg:text-5xl">
                Your Roadmap to DIEMEX 2026
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                Position your brand within India’s growing die, mould, and precision manufacturing 
                ecosystem. <strong className="text-blue-700">DIEMEX </strong> is a focused B2B platform that brings together die & mould manufacturers, 
                tooling suppliers, technology providers, and serious buyers from automotive, engineering, 
                and industrial manufacturing sectors. 
              </p>

              <hr className="my-8 border-gray-300" />

              <h3 className="mb-4 text-3xl font-semibold text-gray-800">
                Download the Post-Show Report to:
              </h3>

              <ul className="mb-10 list-disc space-y-4 pl-5 text-lg text-gray-700">
                <li>Review exhibitor participation highlights and market response</li>
                <li>Understand visitor profiles, industry representation, and sourcing interests</li>
                <li>
                  Learn how DIEMEX supports lead generation, brand visibility, and long-term business growth
                </li>
              </ul>

              <hr className="my-10 border-gray-300" />

              {/* Success Numbers */}
              <h3 className="mb-6 text-3xl font-semibold text-gray-900">
                Success In Numbers
              </h3>

              <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <p className="text-5xl font-bold text-blue-600">30,500</p>
                  <p className="text-lg text-gray-700">Visitors</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-blue-600">600+</p>
                  <p className="text-lg text-gray-700">Exhibitors</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-blue-600">160+</p>
                  <p className="text-lg text-gray-700">Speakers</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-blue-600">50+</p>
                  <p className="text-lg text-gray-700">Countries Represented</p>
                </div>
              </div>

              {/* Image */}
              <div className="mt-14 flex justify-center">
                <div className="relative w-full max-w-md">
                  <img
                    src="https://cdn.itegroupnews.com/image_20_55bd04064d.png"
                    alt="Post Show Report"
                    className="w-full rounded-xl shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:sticky lg:top-32">
              <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-lg lg:p-8">
                <PostShowReportForm />
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
