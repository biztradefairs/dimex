import React from "react"
import Image from "next/image"
import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

const SectorsSection = () => {
  const sectors = [
    {
      title: "Air Freight",
      description:
        "Air transportation is crucial for fast delivery of time-sensitive cargo like perishables, medicines, and e-commerce, overcoming topographical limitations that affect road or rail.",
      image: "/images/image.png",
      link: "/sectors/air-freight",
    },
    {
      title: "Maritime & Inland Waterway Transport",
      description:
        "Maritime cargo transportation offers cost-effective, high-capacity solutions for intercontinental shipments of diverse cargo types.",
      image: "/images/image.png",
      link: "/sectors/maritime-and-inland-waterway-transport",
    },
    {
      title: "Ports & Terminals, Freight Handling Services In Ports",
      description:
        "Discover expert stevedoring, logistics, and storage solutions for seamless port operations at TransRussia.",
      image: "/images/image.png",
      link: "/sectors/ports-and-terminals-freight-handling-services-in-ports",
    },
  ]

  return (
    <SectionContainer className="py-16 lg:py-24">
      {/* Header */}
      <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-9">
          <h2 className="title-72 text-black ">
            10 Event Sectors Covering the Complete Die & Mould Value Chain
          </h2>
        </div>

        <div className="flex lg:col-span-3 lg:justify-end">
          <Link href="/sectors">
            <button className="flex items-center gap-2 rounded-full px-10 py-3 text-[16px] font-semibold bg-mainColor2 text-white transition hover:bg-mainColor4">
              Explore All Our Event Sector
            </button>
          </Link>
        </div>
      </div>

      {/* Sectors Grid */}
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector, index) => (
          <Link
            key={index}
            href={sector.link}
            className="group relative flex min-h-[600px] w-full flex-col justify-end overflow-hidden rounded-xl p-5 text-white"
          >
            {/* Background Image */}
            <Image
              src={sector.image}
              alt={sector.title}
              fill
              className="absolute inset-0 z-[-2] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <h5 className="title-32 font-semibold mb-2">
              {sector.title}
            </h5>

            <p className="text-sm leading-relaxed transition-all duration-300 line-clamp-2 opacity-0 group-hover:opacity-100">
              {sector.description}
            </p>
          </Link>
        ))}
      </div>
    </SectionContainer>
  )
}

export default SectorsSection
