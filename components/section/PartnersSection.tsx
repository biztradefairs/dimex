"use client"

import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

export type Partner = {
  name: string
  logo: string
  link: string
  linkedin?: string | null
}

export const partners: Partner[] = [
  {
    name: "RAJTOOLS AND STAMPING",
    logo: "/images/raj.png",
    link: "https://www.rajtools.co.in/",
  },
  {
    name: "RAJAMANE SOLUTIONS",
    logo: "/images/rajamane.png",
    link: "https://rajamanesolutions.com/",
  },
  {
    name: "BHAT METALS",
    logo: "/images/bhat_metals.png",
    link: "https://bhatmetals.com/",
  },
  {
    name: "SWASTIK AUTOMATION & CONTROL",
    logo: "/images/catouni.jpg",
    link: "https://www.cautoniswastikinstrument.com/",
  },
  {
    name: "HEMANAV GRAPHITES",
    logo: "/images/hemnav.png",
    link: "https://www.hemnav.com/",
  },
  {
    name: "RAINBOW TECHNOLOGIES",
    logo: "/images/rainbowtechnologies.jpg",
    link: "https://www.rainbowtechnologies.in",
  },
  {
    name: "RHEOLOGIST GAZE AND SOLUTION",
    logo: "/images/reologist.png",
    link: "https://www.rgees.in/",
  },
  {
    name: "JAI AMBAY ETCHING PROCESS",
    logo: "/images/jayambe.jpg",
    link: "https://jaiambayetchingprocess.com",
  },
  {
    name: "EXCELLENT LASERTECH",
    logo: "/images/excellent.jpg",
    link: "https://www.indiamart.com/excellent-lasertech-proto/?srsltid=AfmBOoo1XRJ320qkGlU-s_c2iMZjHXJoRy6gGqNlXmQtyP8jkCFq4n-i",
  },
  {
    name: "SENOR METALS",
    logo: "/images/senor.png",
    link: "https://senormetals.com/",
  },
  {
    name: "GOEL CARBON",
    logo: "/images/goel_carbon.png",
    link: "https://goelcarbon.com/",
  },
  {
    name: "PRIMETECH POLYMOLD",
    logo: "/images/primetech.jpg",
    link: "https://primetechpolymold.in/",
  },
  {
    name: "THRIAM MOULDS AND DIES",
    logo: "/images/thiaram.png",
    link: "https://thriam.com/",
  },
  {
    name: "HYDRALIQUE PRODUCTION SYSTEMS",
    logo: "/images/hps.jpg",
    link: "http://www.hpsindia.com/",
  },
  {
    name: "IDEMI -GOVT OF INDIA",
    logo: "/images/idemi.png",
    link: "https://www.idemi.org/",
  },
  {
    name: "OEM UPDATE",
    logo: "/images/oemupdate.jpg",
    link: "https://www.oemupdate.com/",
  },
  {
    name: "INDUSTRIAL PRODUCT MONITOR",
    logo: "/images/ipm.jpg",
    link: "https://www.instagram.com/industrialproductmonitor/",
  },
  {
    name: "99 BUSINESS MEDIA",
    logo: "/images/99media.png",
    link: "https://www.99businessmedia.com",
  },
  {
    name: "UDYAM PRAKASHAN",
    logo: "/images/dhatukam.png",
    link: "https://dhatukam.udyamprakashan.in/",
  },
  {
    name: "Engee Tech",
    logo: "/images/engeetech.png",
    link: "https://engeetech.com/",
    linkedin: "https://www.linkedin.com/company/engeetech/",
  },
  {
    name: "voestalpine",
    logo: "/images/Voestalpine.png",
    link: "https://www.voestalpine.com/group/en/",
    linkedin: "https://www.linkedin.com/company/voestalpine/",
  },
  {
    name: "KADKRAFT",
    logo: "/images/kadkraft.png",
    link: "https://www.kadkraft.com/about-us/",
    linkedin: "https://www.linkedin.com/company/kadkraftsystems/",
  },
  {
    name: "SEC ENGRAVING",
    logo: "/images/sec-logo.png",
    link: "https://secengraving.com/",
    linkedin: "https://www.linkedin.com/company/sunita-engineering-corporation/",
  },
  {
    name: "USBC STEELS",
    logo: "/images/usbcosteels.jpeg",
    link: "https://www.usbcosteels.com/",
    linkedin: "https://www.linkedin.com/company/unitedsteelandbearingco/",
  },
  {
    name: "FEBTECH",
    logo: "/images/febtech.png",
    link: "https://diecasting-automation.com/",
    linkedin: "https://www.linkedin.com/company/febtech-ind/",
  },
  {
    name: "INSTITUTE FOR INJECTION MOLDING",
    logo: "/images/institute-for-injectionmolding.png",
    link: "https://www.iimolding.com/",
    linkedin: "https://www.linkedin.com/showcase/institute-for-injection-molding/",
  },
  {
    name: "JIG ENGINEERING",
    logo: "/images/jig-engineering.png",
    link: "https://www.jigengineering.in/",
    linkedin: null,
  },
  {
    name: "JYOTI GROUP",
    logo: "/images/jyoti-group.png",
    link: "https://jyotihtgroup.com/",
    linkedin: "https://www.linkedin.com/company/jyoti-ht-group/",
  },

  {
    name: "LOGIC LOOM",
    logo: "/images/logic-loom.png",
    link: "https://logicloom.in/",
    linkedin: "https://www.linkedin.com/company/logicloomitsolutions/",
  },
  {
    name: "MECHMATRIX",
    logo: "/images/mechmatrix.png",
    link: "https://mechmatrix.in/",
    linkedin: "https://www.linkedin.com/company/mechmatrixnashik/",
  },
  {
    name: "ONEHUNDRED TECHNOLOGIES",
    logo: "/images/onehundred-technologies.png",
    link: "",
    linkedin: null,
  },
  {
    name: "PRIME GRAPHITE",
    logo: "/images/prime-graphite.png",
    link: "https://primegraphite.com/",
    linkedin: "https://www.linkedin.com/company/prime-graphite-private-limited/",
  },
  {
    name: "QUAD TOOLING",
    logo: "/images/quad.png",
    link: "https://quadtooling.com/index.html",
    linkedin: "https://www.linkedin.com/company/quad-tooling/",
  },
  {
    name: "RATTAN TRADING COMPANY",
    logo: "/images/rattan-trading-company.png",
    link: "https://rattantradingcompany.in/",
    linkedin: null,
  },
  {
    name: "SAC",
    logo: "/images/sac.png",
    link: "https://www.cautoniswastikinstrument.com/downloads",
    linkedin: "https://www.linkedin.com/company/swastik-automation-%26-control/",
  },
  {
    name: "SANI MOULDS",
    logo: "/images/sani-moulds.png",
    link: "https://www.sanimoulds.com/",
    linkedin: null,
  },
  {
    name: "STIACK",
    logo: "/images/stiack.png",
    link: "https://stiack.com/",
    linkedin: "https://www.linkedin.com/company/stiack-engineering-pvt-ltd/",
  },
  {
    name: "TOOLING TECHNOLOGY",
    logo: "/images/tooling-technology.png",
    link: "https://www.toolingtechnology.in/",
    linkedin: null,
  },

]


const PartnersSection = () => {
  // Split exhibitors into two rows
  const midpoint = Math.ceil(partners.length / 2)

  const firstRow = partners.slice(0, midpoint)
  const secondRow = partners.slice(midpoint)

  const renderMarquee = (
    items: Partner[],
    direction: "left" | "right"
  ) => {
    return (
      <div className="group/marquee relative w-full overflow-hidden">

        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-20" />

        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-20" />

        {/* Animated track */}
        <div
          className={`flex w-max ${
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
          } group-hover/marquee:[animation-play-state:paused]`}
        >
          {/* Duplicate items for seamless infinite scrolling */}
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-start"
            >
              {items.map((partner, index) => {
                const content = (
                  <>
                    <div className="flex h-24 items-center justify-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md sm:h-28">
                      <img
                        src={partner.logo}
                        alt={copy === 0 ? partner.name : ""}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <p className="mt-3 px-1 text-center text-xs font-medium leading-snug text-gray-700 sm:text-sm">
                      {partner.name}
                    </p>
                  </>
                )

                return (
                  <div
                    key={`${copy}-${index}`}
                    className="group w-[180px] shrink-0 px-3 sm:w-[230px]"
                  >
                    {partner.link ? (
                      <Link
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={copy === 1 ? -1 : undefined}
                        className="block"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div>{content}</div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <SectionContainer>
      <section className="overflow-hidden py-12 sm:py-16">

        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-[#004A96] sm:text-4xl lg:text-5xl">
            Our Exhibitors
          </h2>

          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Connecting Industry Leaders in Die, Mould & Tooling
          </p>
        </div>

        {/* Two opposite-moving rows */}
        <div className="space-y-8">

          {/* Row 1 - Right to Left */}
          {renderMarquee(firstRow, "left")}

          {/* Row 2 - Left to Right */}
          {renderMarquee(secondRow, "right")}

        </div>
      </section>
    </SectionContainer>
  )
}

export default PartnersSection

