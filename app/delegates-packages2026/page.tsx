'use client'

import SectionContainer from "@/components/UI/SectionContainer" // Adjust the import path

export default function DelegatesPackagesPage() {
  return (
    <div className="min-h-screen font-parabolica bg-white">

      {/* PAGE HEADER */}
      <section className="bg-sky-50 pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-[72px] leading-none text-black">
            Become a Delegate
          </h1>
          <p className="mt-5 text-lg">
            Prices are inclusive of VAT
          </p>
        </SectionContainer>
      </section>

      {/* PACKAGES */}
      <SectionContainer className="py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {/* BASIC */}
          <div className="relative min-h-[500px] bg-sky-50 p-5 lg:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <h2 className="text-[40px] font-semibold">BASIC</h2>

              <ul className="list-disc pl-5 space-y-2 text-[21px]">
                <li>Access to the conference sessions</li>
                <li>Access to coffee breaks and lunches</li>
                <li>Access to the private conference participants group</li>
                <li>Participation in the evening cocktail on October 20</li>
              </ul>

              <p className="pt-16 text-[35px] font-bold">
                75,000 RUB
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <a href="/summit-basic-form/" target="_blank">
                <button className="rounded-full bg-[#004D9F] px-10 py-3 font-jakarta font-semibold text-white transition hover:bg-[#004D9F]">
                  PAY BY CARD
                </button>
              </a>
              <a href="/summit-invoice-form/" target="_blank">
                <button className="rounded-full bg-[#004D9F] px-10 py-3 font-jakarta font-semibold text-white transition hover:bg-[#004D9F]">
                  PAY BY INVOICE
                </button>
              </a>
            </div>
          </div>

          {/* BUSINESS */}
          <div className="relative min-h-[500px] bg-sky-50 p-5 lg:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <h2 className="text-[40px] font-semibold">BUSINESS</h2>

              <ul className="list-disc pl-5 space-y-2 text-[21px]">
                <li>Access to the conference sessions</li>
                <li>Access to coffee breaks and lunches</li>
                <li>Access to the private conference participants group</li>
                <li>Participation in the evening cocktail on October 20</li>
              </ul>

              <p className="text-center text-[21px] font-bold">+</p>

              <ul className="list-disc pl-5 space-y-2 text-[21px]">
                <li>Presentation materials from speakers</li>
                <li>Participation in the VIP reception on October 19</li>
              </ul>

              <p className="pt-10 text-[35px] font-bold">
                105,000 RUB
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <a href="/summit-business-form/" target="_blank">
                <button className="rounded-full bg-[#004D9F] px-10 py-3 font-jakarta font-semibold text-white transition hover:bg-[#004D9F]">
                  PAY BY CARD
                </button>
              </a>
              <a href="/summit-invoice-form/" target="_blank">
                <button className="rounded-full bg-[#004D9F] px-10 py-3 font-jakarta font-semibold text-white transition hover:bg-[#004D9F]">
                  PAY BY INVOICE
                </button>
              </a>
            </div>
          </div>

          {/* VIP */}
          <div className="relative min-h-[500px] bg-sky-50 p-5 lg:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <h2 className="text-[40px] font-semibold">VIP</h2>

              <ul className="list-disc pl-5 space-y-2 text-[21px]">
                <li>Access to the conference sessions</li>
                <li>Access to coffee breaks and lunches</li>
                <li>Access to the private conference participants group</li>
                <li>Participation in the evening cocktail on October 20</li>
              </ul>

              <p className="text-center text-[21px] font-bold">+</p>

              <ul className="list-disc pl-5 space-y-2 text-[21px]">
                <li>Presentation materials from speakers</li>
                <li>Participation in the VIP reception on October 19</li>
              </ul>

              <p className="text-center text-[21px] font-bold">+</p>

              <ul className="list-disc pl-5 space-y-2 text-[21px]">
                <li>Reserved seating in the VIP area with speakers</li>
                <li>Access to the VIP lounge together with speakers</li>
                <li>Lunch in the VIP lounge</li>
                <li>Individual parking space</li>
                <li>Dedicated registration desk</li>
              </ul>

              <p className="pt-10 text-[35px] font-bold">
                135,000 RUB
              </p>
            </div>

            <div className="flex flex-wrap gap-5">
              <a href="/summit-vip-form/" target="_blank">
                <button className="rounded-full bg-[#004D9F] px-10 py-3 font-jakarta font-semibold text-white transition hover:bg-[#004D9F]">
                  PAY BY CARD
                </button>
              </a>
              <a href="/summit-invoice-form/" target="_blank">
                <button className="rounded-full bg-[#004D9F] px-10 py-3 font-jakarta font-semibold text-white transition hover:bg-[#004D9F]">
                  PAY BY INVOICE
                </button>
              </a>
            </div>
          </div>

        </div>
      </SectionContainer>
    </div>
  )
}