// app/post-show-report/page.tsx
import PostShowReportForm from "@/components/PostShowReportForm"
import PartnersSection from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"

export default function TransRussiaPostShowReport() {
  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl lg:text-6xl font-bold text-black">
            Proven Success
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-700">
            Get to know how we helped our participants achieve their business goals.
          </p>
        </SectionContainer>
      </section>

      {/* ================= CONTENT + FORM ================= */}
      <section className="py-20">
        <SectionContainer>

          <div className="grid items-start gap-14 lg:grid-cols-2">

            {/* -------- LEFT CONTENT -------- */}
            <div>
              <h2 className="mb-6 text-4xl font-semibold text-gray-800 lg:text-5xl">
                Your Roadmap to TransRussia 2026
              </h2>

              <p className="mb-8 text-lg leading-relaxed text-gray-700">
                Position your brand at the heart of Russia and Eurasia&apos;s logistics
                market. As the region&apos;s leading B2B exhibition for transport and
                logistics services, <strong>TransRussia</strong> connects international
                freight forwarders, carriers, and logistics technology providers with
                thousands of qualified buyers from across 50+ countries.
              </p>

              <hr className="my-8" />

              <h3 className="mb-4 text-3xl font-semibold text-gray-800">
                Download the Post-Show Report to:
              </h3>

              <ul className="mb-10 list-disc space-y-4 pl-5 text-lg text-gray-700">
                <li>Explore exhibitor opportunities and participation packages.</li>
                <li>Understand visitor demographics, cargo volumes, and purchasing trends.</li>
                <li>
                  Discover how TransRussia delivers measurable ROI and long-term
                  business growth.
                </li>
              </ul>

              <hr className="my-10" />

              {/* Success Numbers */}
              <h3 className="mb-6 text-3xl font-semibold">
                Success In Numbers
              </h3>

              <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <p className="text-5xl font-bold text-mainColor1">30,500</p>
                  <p className="text-lg">Visitors</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-mainColor1">600+</p>
                  <p className="text-lg">Exhibitors</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-mainColor1">160+</p>
                  <p className="text-lg">Speakers</p>
                </div>
                <div>
                  <p className="text-5xl font-bold text-mainColor1">50+</p>
                  <p className="text-lg">Countries Represented</p>
                </div>
              </div>

              {/* Image */}
              <div className="mt-14 flex justify-center">
                <img
                  src="https://cdn.itegroupnews.com/image_20_55bd04064d.png"
                  alt="Post Show Report"
                  className="w-1/2"
                />
              </div>
            </div>

            {/* -------- RIGHT FORM -------- */}
            <div>
              <PostShowReportForm />
            </div>

          </div>
        </SectionContainer>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="py-20">
        <SectionContainer>
          <PartnersSection />
        </SectionContainer>
      </section>

    </main>
  )
}
