import React from "react"
import Image from "next/image"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

const EcosystemSection = () => {
  const ecosystemItems = [
    {
      number: "01",
      title: "The Exhibition",
      description: `At the heart of the ecosystem is the annual TransRussia exhibition in Moscow. It brings together the full spectrum of the transport and logistics sector, offering a high-impact platform to:

- Establish direct, face-to-face business connections.
- Showcase advanced solutions in video surveillance, access control, cybersecurity, fire safety, and perimeter protection.
- Meet thousands of security integrators, installers, distributors, and corporate buyers all in one place from 17 - 19 March 2026.`,
      image: "/TR_2025_161_da551e1607.jpg",
      link: "/about-transrussia",
      buttonText: "Know More",
    },
    {
      number: "02",
      title: "Conference and Summit",
      description: `Throughout the exhibition and beyond, the ecosystem includes a robust program of conferences, forums, and summits. These events are curated to foster dialogue around logistics innovations, policy, and market trends.

- Gain insights from experts on the latest logistics trends and market challenges.
- Explore innovative transport solutions, supply chain technologies, and infrastructure developments.
- Build valuable professional connections with industry peers, freight owners, and decision-makers.`,
      image: "/TR_2025_159_0d4f744777.jpg",
      link: "/conference-programme",
      buttonText: "Conference Programme",
    },
    {
      number: "03",
      title: "TransRussia Connect",
      description: `TransRussia Connect is the ecosystem's digital layer — an online platform designed to keep the conversation going before, during, and after the exhibition. Through Connect, participants can:

- Network with buyers, suppliers, and industry peers 365 days a year.
- Access curated content, market news, and exhibitor updates.
- Schedule meetings and follow up on new business leads online.`,
      image: "/Untitled_design_92_3f5e8a1454.png",
      link: "/connect",
      buttonText: "Join Connect",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* CONTENT LAYER */}
      <div className="relative z-10">
        <SectionContainer>
          {/* HEADER */}
          <div className="mb-14 flex max-w-4xl flex-col gap-6">
            <h2 className="title-72 text-black">
              TransRussia Moscow: A Year-Round Logistics Ecosystem
            </h2>

            <p className="text-lg text-black/70">
              TransRussia is Eurasia&apos;s leading international exhibition for
              transport and logistics services. With a strong track record and
              industry trust, it plays a key role in connecting logistics
              providers, freight forwarders, cargo owners, and infrastructure
              operators from across Eurasia.
            </p>

            {/* LINK AS BUTTON – NO <button> */}
            <Link
              href="/why-exhibit"
              className="inline-block w-fit rounded-full bg-blue-600 px-10 py-4 font-semibold text-white transition hover:bg-mainColor4"
            >
              Why Exhibit
            </Link>
          </div>

          {/* CARDS */}
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {ecosystemItems.map((item, index) => (
              <div
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg"
              >
                {/* IMAGE + NUMBER */}
                <div className="p-6 pb-0 xl:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="relative size-16 overflow-hidden rounded-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <span className="text-2xl font-semibold text-black/60">
                      {item.number}
                    </span>
                  </div>

                  <h4 className="title-32 mb-4 font-semibold text-black">
                    {item.title}
                  </h4>
                </div>

                {/* DESCRIPTION */}
                <div className="flex-1 px-6 xl:px-8">
                  <p className="whitespace-pre-line leading-relaxed text-black/80">
                    {item.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-auto p-6 pt-4 xl:p-8">
                  <Link
                    href={item.link}
                    className="block w-full rounded-full bg-blue-800 px-8 py-4 text-center text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mainColor4 hover:shadow-lg"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* BACKGROUND SHAPE (CAN'T BLOCK CLICKS) */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <Image
          src="/imgs/shape.png"
          alt="Decorative Shape"
          width={900}
          height={900}
          className="object-contain"
        />
      </div>
    </section>
  )
}

export default EcosystemSection
