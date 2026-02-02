import React from "react"
import Image from "next/image"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

const EcosystemSection = () => {
  const ecosystemItems = [
    {
      number: "01",
      title: "The Exhibition",
      description: `At the heart of the ecosystem is the annual DIEMEX exhibition in Pune, India. It brings together the entire die & mould and tooling value chain, offering a high-impact platform to::

- Establish direct, face-to-face business connections with OEMs, toolroom owners, and senior decision-makers.
- Showcase advanced die & mould solutions, including tooling technologies, design & engineering software, automation, materials, and Industry 4.0 innovations.
- Engage with thousands of qualified buyers and technical professionals from automotive, EV, plastics, aerospace, and industrial manufacturing sectors—all in one place from 8–10 October 2026.`,
      image: "https://cdn.itegroupnews.com/TR_2025_159_0d4f744777.jpg",
      link: "/about-transrussia",
      buttonText: "Know More",
    },
    {
      number: "02",
      title: "Conference",
      description: `Alongside the exhibition, DIEMEX 2026 features a comprehensive conference programme comprising technical conferences, expert forums, and industry-led sessions. These are carefully curated to encourage meaningful dialogue around die & mould technologies, tooling innovation, manufacturing trends, and future-ready production strategies.

- Gain insights from industry experts on the latest developments, challenges, and opportunities in die & mould and precision manufacturing.
- Explore emerging technologies, including advanced tooling, materials, automation, digital design, and Industry 4.0 applications.
- Build valuable professional connections with OEMs, toolroom heads, engineers, buyers, and decision-makers from across the manufacturing ecosystem.`,
      image: "https://cdn.itegroupnews.com/TR_2025_161_da551e1607.jpg",
      link: "/conference-programme",
      buttonText: "Conference Programme",
    },
    {
      number: "03",
      title: "Molding Trends",
      description: `Molding Trends is an online platform designed to keep the industry connected before, during, and after the exhibition. Through Molding Trends, participants can::
- Network year-round with buyers, OEMs, toolrooms, technology providers, and industry peers.
- Access curated content, including industry news, technical insights, exhibitor updates, and market trends.
- Schedule meetings, manage contacts, and follow up on business leads seamlessly through a single digital platform.`,
      image: "http://cdn.itegroupnews.com/Untitled_design_92_3f5e8a1454.png",
      link: "/connect",
      buttonText: "Join Molding Trends",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* CONTENT LAYER */}
      <div className="relative z-10">
        <SectionContainer>
          {/* HEADER */}
          <div className="mb-14 flex max-w-8xl flex-col gap-6">
            <h2 className="title-72 text-black">
              DIEMEX: A Year-Round Die & Mould Manufacturing Ecosystem
            </h2>

            <p className="text-lg text-black/70">
              DIEMEX is India’s leading international exhibition for die & mould manufacturing, tooling, and precision engineering technologies. With a strong legacy and deep industry trust, it plays a pivotal role in connecting toolrooms, OEMs, material suppliers, and advanced manufacturing solution providers from India and global markets—before, during, and beyond the exhibition dates.
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
  <img
    src={item.image}
    alt={item.title}
    className="h-full w-full object-cover"
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
