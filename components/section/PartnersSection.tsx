"use client"

import Link from "next/link"
import SectionContainer from "../UI/SectionContainer"

export type Partner = {
  name: string
  logo: string
  link: string
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
    link: "hhttps://www.99businessmedia.com",
  },
  {
    name: "UDYAM PRAKASHAN",
    logo: "/images/dhatukam.png",
    link: "https://dhatukam.udyamprakashan.in/",
  },
]

const PartnersSection = () => {
  return (
    <SectionContainer>
      <div className="space-y-10 py-10">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-4xl font-bold text-black lg:text-6xl">Exhibitors</h2>
        </div>

        <ul className="grid grid-cols-4 gap-3 sm:gap-5">
          {partners.map((partner) => (
            <li key={partner.name}>
              <Link
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block text-center"
              >
                <div className="flex h-[88px] items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-white p-2 shadow-md transition group-hover:shadow-lg sm:h-32 sm:p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="font-parabolica mt-3 text-xs font-medium leading-snug text-gray-800 sm:text-sm">
                  {partner.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default PartnersSection
