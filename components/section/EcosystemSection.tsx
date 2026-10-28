import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  Sparkles,
  Cpu,
  Layers,
  Settings,
  Wrench,
  Boxes,
  Flame,
  Monitor,
  CheckCircle2,
  Car,
  Factory,
  Plane,
  Users,
  Target,
  Megaphone,
  ArrowRight,
  ArrowUpRight,
  Award,
  Network,
} from "lucide-react"
import SectionContainer from "../UI/SectionContainer"

const diemexEditions = [
  {
    number: "01",
    year: "DIEMEX 2023",
    city: "Bangalore",
    venue: "KTPO Convention Centre",
    dates: "27–29 October 2023",
    status: "Completed Edition",
    icon: Calendar,
  },
  {
    number: "02",
    year: "DIEMEX 2025",
    city: "Chennai",
    venue: "Chennai Trade Centre",
    dates: "20–22 November 2025",
    status: "Upcoming Edition",
    icon: Calendar,
  },
  {
    number: "03",
    year: "DIEMEX 2027",
    city: "Pune",
    venue: "Auto Cluster Exhibition Centre",
    dates: "24–26 March 2027",
    status: "Flagship Edition",
    highlight: true,
    icon: Sparkles,
  },
]

const whatYouWillSee = [
  {
    number: "01",
    title: "CNC Machining & Milling",
    description: "CNC machining centres and high-speed precision milling machines.",
    icon: Cpu,
  },
  {
    number: "02",
    title: "EDM Machines & Wire Cut",
    description: "EDM machines, wire cut and spark erosion equipment.",
    icon: Settings,
  },
  {
    number: "03",
    title: "3D Printing & Additive",
    description: "3D printing and industrial additive manufacturing technologies.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Cutting Tools & Tooling",
    description: "Cutting tools, tooling solutions, holders and standard mould bases.",
    icon: Wrench,
  },
  {
    number: "05",
    title: "Hot Runner & Injection",
    description: "Hot runner systems and high-precision injection moulding machines.",
    icon: Boxes,
  },
  {
    number: "06",
    title: "Heat & Surface Treatment",
    description: "Heat treatment, advanced surface treatment, coating and polishing.",
    icon: Flame,
  },
  {
    number: "07",
    title: "CAD / CAM / CAE Software",
    description: "CAD/CAM/CAE systems, tool design and advanced simulation software.",
    icon: Monitor,
  },
  {
    number: "08",
    title: "Inspection & CMM Systems",
    description: "Inspection equipment, CMM metrology and precision quality systems.",
    icon: CheckCircle2,
  },
]

const whoShouldAttend = [
  {
    number: "01",
    title: "Tool Room & Mould Makers",
    description: "Tool room owners, die & mould manufacturers, and precision pattern shops.",
    icon: Factory,
  },
  {
    number: "02",
    title: "Automotive & Auto-Component",
    description: "Automotive OEMs and Tier-1/Tier-2 auto-component manufacturing companies.",
    icon: Car,
  },
  {
    number: "03",
    title: "Plastics & Sheet Metal",
    description: "Plastics processors, injection moulding specialists and sheet metal firms.",
    icon: Boxes,
  },
  {
    number: "04",
    title: "Aerospace, Defence & Medical",
    description: "Aerospace, medical technology, defence and precision electronics manufacturers.",
    icon: Plane,
  },
  {
    number: "05",
    title: "Purchase, Design & R&D Heads",
    description: "Purchase heads, design engineers, production leads and R&D decision-makers.",
    icon: Users,
  },
]

const whyExhibitReasons = [
  {
    number: "01",
    title: "Meet Qualified Buyers Directly",
    description: "Connect face-to-face with verified decision-makers, OEMs, and toolroom heads.",
    icon: Users,
  },
  {
    number: "02",
    title: "Launch & Demonstrate Live",
    description: "Launch new machinery and present live demonstrations to an active buying audience.",
    icon: Monitor,
  },
  {
    number: "03",
    title: "Build Your Industry Brand",
    description: "Elevate brand authority and establish visibility in a dedicated, high-intent market.",
    icon: Megaphone,
  },
  {
    number: "04",
    title: "Generate Multi-Sector Leads",
    description: "Capture qualified leads across automotive, plastics, engineering, and tooling sectors.",
    icon: Target,
  },
]

const whyVisitReasons = [
  {
    number: "01",
    title: "Free Trade Registration",
    description: "Enjoy hassle-free, complimentary access for trade visitors and industry professionals.",
    icon: Award,
  },
  {
    number: "02",
    title: "Compare Tech in One Visit",
    description: "Compare machines, cutting tools, materials, and suppliers side-by-side under one roof.",
    icon: CheckCircle2,
  },
  {
    number: "03",
    title: "Learn New Technology",
    description: "Stay ahead with innovations in moulding, smart tooling, precision engineering, and automation.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Network with Industry Peers",
    description: "Build relationships and network with engineers, manufacturers, and industry pioneers.",
    icon: Network,
  },
]

const EcosystemSection = () => {
  const ecosystemItems = [
    {
      number: "01",
      title: "The Exhibition",
      description: `At the heart of the ecosystem is the annual DIEMEX exhibition in Pune, India. It brings together the entire die & mould and tooling value chain, offering a high-impact platform to::

- Establish direct, face-to-face business connections with OEMs, toolroom owners, and senior decision-makers.
- Showcase advanced die & mould solutions, including tooling technologies, design & engineering software, automation, materials, and Industry 4.0 innovations.
- Engage with thousands of qualified buyers and technical professionals from automotive, EV, plastics, aerospace, and industrial manufacturing sectors—all in one place from 24–26 March 2027.`,
      image: "/images/expo-about-diemex.JPG",
      link: "/about-diemex",
      buttonText: "Know More",
    },
    {
      number: "02",
      title: "Conference",
      description: `Alongside the exhibition, DIEMEX 2027 features a comprehensive conference programme comprising technical conferences, expert forums, and industry-led sessions. These are carefully curated to encourage meaningful dialogue around die & mould technologies, tooling innovation, manufacturing trends, and future-ready production strategies.

- Gain insights from industry experts on the latest developments, challenges, and opportunities in die & mould and precision manufacturing.
- Explore emerging technologies, including advanced tooling, materials, automation, digital design, and Industry 4.0 applications.
- Build valuable professional connections with OEMs, toolroom heads, engineers, buyers, and decision-makers from across the manufacturing ecosystem.`,
      image: "/images/conference-about-diemex.JPG",
      link: "/conference",
      buttonText: "Conference Programme",
    },
    {
      number: "03",
      title: "Tooling Trends",
      description: `Tooling Trends is an online platform designed to keep the industry connected before, during, and after the exhibition. Through Molding Trends, participants can::
- Network year-round with buyers, OEMs, toolrooms, technology providers, and industry peers.
- Access curated content, including industry news, technical insights, exhibitor updates, and market trends.
- Schedule meetings, manage contacts, and follow up on business leads seamlessly through a single digital platform.`,
      image: "/images/tooling-about-diemex.png",
      link: "https://toolingtrends.com",
      buttonText: "Join Tooling Trends",
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* CONTENT LAYER */}
      <div className="relative z-10">
        <SectionContainer>
          {/* HEADER */}
          <div className="mb-14 flex max-w-8xl flex-col gap-6">
            {/* 1. WHAT IS DIEMEX */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-[#132D49] sm:text-4xl lg:text-5xl">
                What is <span className="text-[#004A96]">DIEMEX?</span>
              </h2>
              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-black/70">
                DIEMEX is a three-day trade exhibition for the die, mould and tooling industry. It showcases machines, software, materials and services used to design and manufacture dies, moulds, jigs and fixtures. Visitors see live technology, meet manufacturers face to face and find new suppliers in one place.
              </p>
            </div>

            {/* 2. DIEMEX EDITIONS */}
            <div className="pt-6">
              <h2 className="text-3xl font-bold tracking-tight text-[#132D49] sm:text-4xl lg:text-5xl">
                DIEMEX <span className="text-[#004A96]">Editions</span>
              </h2>
              <p className="mt-2 text-lg text-black/70">
                The show has grown across India’s key manufacturing regions:
              </p>

              <div className="mt-6 grid auto-rows-fr gap-5 md:grid-cols-3">
                {diemexEditions.map((edition) => {
                  const Icon = edition.icon
                  return (
                    <article
                      key={edition.number}
                      className={`group relative flex h-full flex-col rounded-3xl border p-6 transition-[border-color,box-shadow,translate] duration-300 sm:p-8 ${edition.highlight
                        ? "border-[#004A96] bg-[#004A96] text-white shadow-[0_12px_32px_rgba(0,74,150,0.18)]"
                        : "border-[#004A96]/10 bg-white text-black shadow-[0_4px_24px_rgba(19,45,73,0.03)] hover:border-[#004A96]/25 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] motion-safe:hover:-translate-y-1"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors ${edition.highlight
                            ? "border-white/20 bg-white/10 text-white"
                            : "border-[#004A96]/10 bg-[#EDF4FB] text-[#004A96] group-hover:border-[#004A96] group-hover:bg-[#004A96] group-hover:text-white"
                            }`}
                        >
                          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                        </span>
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.12em] ${edition.highlight ? "text-white/80" : "text-[#8594A5]"
                            }`}
                        >
                          {edition.status}
                        </span>
                      </div>
                      <h3
                        className={`mb-2 mt-6 text-xl font-bold tracking-tight sm:text-2xl ${edition.highlight ? "text-white" : "text-[#132D49]"
                          }`}
                      >
                        {edition.year}
                      </h3>
                      <p
                        className={`font-semibold ${edition.highlight ? "text-white/90" : "text-[#004A96]"
                          }`}
                      >
                        {edition.city}
                      </p>
                      <p
                        className={`mt-2 text-sm leading-relaxed ${edition.highlight ? "text-white/80" : "text-black/70"
                          }`}
                      >
                        {edition.venue}
                      </p>

                      <div
                        className={`mt-4 pt-4 border-t text-sm font-medium ${edition.highlight
                          ? "border-white/20 text-white"
                          : "border-black/10 text-black/80"
                          }`}
                      >
                        {edition.dates}
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/register?t=visitor"
                  className="inline-block w-fit rounded-full bg-[#004A96] px-10 py-4 font-semibold text-white transition hover:bg-[#003875]"
                >
                  Register Free
                </Link>

                <Link
                  href="/register?t=exhibitor"
                  className="inline-block w-fit rounded-full bg-[#004A96] px-10 py-4 font-semibold text-white transition hover:bg-[#003875]"
                >
                  Book a Stall
                </Link>
              </div>
            </div>

            {/* 3. WHAT YOU WILL SEE AT DIEMEX */}
            <div className="pt-8">
              <h2 className="text-3xl font-bold tracking-tight text-[#132D49] sm:text-4xl lg:text-5xl">
                What you will see at <span className="text-[#004A96]">DIEMEX?</span>
              </h2>

              <div className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {whatYouWillSee.map((item) => {
                  const Icon = item.icon
                  return (
                    <article
                      key={item.number}
                      className="group flex h-full flex-col rounded-3xl border border-[#004A96]/10 bg-white p-6 shadow-[0_4px_24px_rgba(19,45,73,0.03)] transition-[border-color,box-shadow,translate] duration-300 hover:border-[#004A96]/25 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] motion-safe:hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#004A96]/10 bg-[#EDF4FB] text-[#004A96] transition-colors group-hover:border-[#004A96] group-hover:bg-[#004A96] group-hover:text-white">
                          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                        </span>

                      </div>
                      <h3 className="mb-2 mt-5 text-lg font-semibold leading-snug tracking-tight text-[#132D49]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#526174]">
                        {item.description}
                      </p>
                    </article>
                  )
                })}
              </div>
            </div>

            {/* 4. WHO SHOULD ATTEND */}
            <div className="pt-8">
              <h2 className="text-3xl font-bold tracking-tight text-[#132D49] sm:text-4xl lg:text-5xl">
                Who should <span className="text-[#004A96]">attend?</span>
              </h2>

              <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
                {whoShouldAttend.map((item) => {
                  const Icon = item.icon
                  return (
                    <article
                      key={item.number}
                      className="group flex h-full flex-col rounded-3xl border border-[#004A96]/10 bg-white p-6 shadow-[0_4px_24px_rgba(19,45,73,0.03)] transition-[border-color,box-shadow,translate] duration-300 hover:border-[#004A96]/25 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] motion-safe:hover:-translate-y-1 sm:p-8"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#004A96]/10 bg-[#EDF4FB] text-[#004A96] transition-colors group-hover:border-[#004A96] group-hover:bg-[#004A96] group-hover:text-white">
                          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                        </span>

                      </div>
                      <h3 className="mb-3 mt-6 text-xl font-semibold leading-snug tracking-tight text-[#132D49]">
                        {item.title}
                      </h3>
                      <p className="text-base leading-relaxed text-[#526174]">
                        {item.description}
                      </p>
                    </article>
                  )
                })}

                {/* CTA Card */}
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#004A96] bg-[#004A96] p-6 text-white shadow-[0_12px_32px_rgba(0,74,150,0.15)] sm:p-8">
                  <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
                  <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
                  <div className="relative flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                      <ArrowUpRight aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                    </span>
                    <span className="text-right text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                      Reserve Space
                    </span>
                  </div>
                  <h3 className="relative mb-3 mt-6 text-2xl font-semibold leading-snug tracking-tight">
                    Showcase at<br />DIEMEX 2027.
                  </h3>
                  <p className="relative mb-6 text-sm leading-relaxed text-white/80">
                    Position your business directly in front of active decision-makers.
                  </p>
                  <Link
                    href="/register?t=exhibitor"
                    className="group relative mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#004A96] transition-colors hover:bg-[#E8F1F8]"
                  >
                    <span>Book a Stall</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
                  </Link>
                </article>
              </div>
            </div>

            {/* 5. INDUSTRIES SERVED */}
            <div className="pt-8">
              <div className="relative overflow-hidden rounded-3xl border border-[#004A96]/15 bg-gradient-to-br from-[#F4F7FB] to-white p-8 sm:p-10 shadow-[0_4px_24px_rgba(19,45,73,0.03)]">
                <h2 className="text-2xl font-bold tracking-tight text-[#132D49] sm:text-3xl">
                  Industries <span className="text-[#004A96]">Served</span>
                </h2>
                <p className="mt-4 max-w-4xl text-base sm:text-lg leading-relaxed text-[#526174]">
                  Die and mould makers supply automotive, industrial machinery, aerospace, medical equipment, defence and railways. DIEMEX connects these buyers with the technology providers they depend on.
                </p>
              </div>
            </div>

            {/* 6. WHY EXHIBIT AT DIEMEX */}
            <div className="pt-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-[#132D49] sm:text-4xl lg:text-5xl">
                  Why exhibit at <span className="text-[#004A96]">DIEMEX?</span>
                </h2>
              </div>

              <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {whyExhibitReasons.map((reason) => {
                  const Icon = reason.icon
                  return (
                    <article
                      key={reason.number}
                      className="group flex h-full flex-col rounded-3xl border border-[#004A96]/10 bg-white p-6 shadow-[0_4px_24px_rgba(19,45,73,0.03)] transition-[border-color,box-shadow,translate] duration-300 hover:border-[#004A96]/25 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] motion-safe:hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#004A96]/10 bg-[#EDF4FB] text-[#004A96] transition-colors group-hover:border-[#004A96] group-hover:bg-[#004A96] group-hover:text-white">
                          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                        </span>

                      </div>
                      <h3 className="mb-2 mt-5 text-lg font-semibold leading-snug tracking-tight text-[#132D49]">
                        {reason.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#526174]">
                        {reason.description}
                      </p>
                    </article>
                  )
                })}
              </div>
            </div>

            {/* 7. WHY VISIT */}
            <div className="pt-8">
              <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-[#132D49] sm:text-4xl lg:text-5xl">
                  Why <span className="text-[#004A96]">visit?</span>
                </h2>
              </div>

              <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {whyVisitReasons.map((reason) => {
                  const Icon = reason.icon
                  return (
                    <article
                      key={reason.number}
                      className="group flex h-full flex-col rounded-3xl border border-[#004A96]/10 bg-white p-6 shadow-[0_4px_24px_rgba(19,45,73,0.03)] transition-[border-color,box-shadow,translate] duration-300 hover:border-[#004A96]/25 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] motion-safe:hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#004A96]/10 bg-[#EDF4FB] text-[#004A96] transition-colors group-hover:border-[#004A96] group-hover:bg-[#004A96] group-hover:text-white">
                          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                        </span>

                      </div>
                      <h3 className="mb-2 mt-5 text-lg font-semibold leading-snug tracking-tight text-[#132D49]">
                        {reason.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#526174]">
                        {reason.description}
                      </p>
                    </article>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/why-visit"
                  className="inline-block w-fit rounded-full bg-[#004A96] px-10 py-4 font-semibold text-white transition hover:bg-[#003875]"
                >
                  Why visit
                </Link>
              </div>
            </div>
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
                    className="block w-full rounded-full bg-[#004A96] px-8 py-4 text-center text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#003875] hover:shadow-lg"
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
      {/* <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <Image
          src="/imgs/shape.png"
          alt="Decorative Shape"
          width={900}
          height={900}
          className="object-contain"
        />
      </div> */}
    </section>
  )
}

export default EcosystemSection
