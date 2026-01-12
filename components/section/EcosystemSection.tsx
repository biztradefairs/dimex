import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  ];

  return (
    <section className="relative overflow-hidden py-24">
      <div className="container">
        {/* HEADER */}
        <div className="mb-14 flex flex-col gap-6 max-w-4xl">
          <h2 className="title-72 text-black">
            TransRussia Moscow: A Year-Round Logistics Ecosystem
          </h2>

          <p className="text-lg text-black/70">
            TransRussia is Eurasia's leading international exhibition for
            transport and logistics services. With a strong track record and
            industry trust, it plays a key role in connecting logistics
            providers, freight forwarders, cargo owners, and infrastructure
            operators from across Eurasia.
          </p>

          {/* WHY EXHIBIT BUTTON */}
          <Link href="/why-exhibit" className="w-fit">
            <button className="rounded-full bg-mainColor2 px-10 py-4 text-white font-semibold transition hover:bg-mainColor4">
              Why Exhibit
            </button>
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {ecosystemItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col h-full rounded-2xl border border-black/10 bg-white shadow-lg overflow-hidden"
            >
              {/* IMAGE + NUMBER ROW */}
              <div className="p-6 xl:p-8 pb-0">
                <div className="mb-6 flex items-center justify-between">
                  <div className="relative size-16 rounded-full overflow-hidden">
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

                {/* CONTENT */}
                <h4 className="title-32 font-semibold text-black mb-4">
                  {item.title}
                </h4>
              </div>

              {/* DESCRIPTION WITH SCROLL IF NEEDED */}
              <div className="px-6 xl:px-8 py-0 flex-1">
                <div className="h-full overflow-y-auto pr-2">
                  <p className="whitespace-pre-line text-black/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* BUTTON AT BOTTOM */}
              <div className="p-6 xl:p-8 pt-4 mt-auto">
                <Link href={item.link} className="block">
                  <button className="w-full rounded-full bg-blue-800 px-8 py-4 text-white font-semibold text-lg transition-all duration-300 hover:bg-mainColor4 hover:shadow-lg transform hover:-translate-y-0.5">
                    {item.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BACKGROUND SHAPE */}
      <div className="absolute right-0 top-0 z-[-1] hidden lg:block">
        <Image
          src="/imgs/shape.png"
          alt="Shape"
          width={900}
          height={900}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default EcosystemSection;