"use client"

import Image from "next/image"
import { Handshake, Lightbulb, LineChart, Rocket } from "lucide-react"

const VIDEO_ID = "3P-hRFrsXIs"

const IFRAME_SRC = `https://www.youtube.com/embed/${VIDEO_ID}?${new URLSearchParams({
  autoplay: "1",
  mute: "1",
  controls: "0",
  loop: "1",
  playlist: VIDEO_ID,
  modestbranding: "1",
  rel: "0",
  playsinline: "1",
}).toString()}`

const highlights = [
  {
    icon: Rocket,
    iconColor: "text-[#0878E5]",
    iconBg: "bg-[#e7f3ff]",
    title: "Discover Innovation",
    text: "Explore the latest die & mould technologies.",
  },
  {
    icon: Handshake,
    iconColor: "text-[#ff122b]",
    iconBg: "bg-[#fff0f2]",
    title: "Build Partnerships",
    text: "Connect with global industry leaders.",
  },
  {
    icon: Lightbulb,
    iconColor: "text-[#04c59e]",
    iconBg: "bg-[#ddfaf3]",
    title: "Gain Insights",
    text: "Attend expert sessions and conferences.",
  },
  {
    icon: LineChart,
    iconColor: "text-[#6d32e5]",
    iconBg: "bg-[#f0eaff]",
    title: "Grow Your Business",
    text: "Unlock new opportunities in manufacturing.",
  },
]

export default function HeroSection() {
  return (
    // AppShell owns the fixed-header offset on every public page.
    <section
      id="heroSection"
      aria-labelledby="hero-heading"
      className="relative w-full bg-[#004A96] text-white"
    >
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10 lg:px-[72px]">
          <div className="relative z-20 min-w-0 py-9 sm:py-12 lg:flex lg:min-h-[500px] lg:w-[58%] lg:flex-col lg:justify-center lg:py-14 xl:min-h-[520px] xl:py-16">
            <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] leading-relaxed font-medium tracking-[0.08em] uppercase min-[375px]:text-sm sm:gap-x-4 sm:text-base xl:text-lg">
              <span className="whitespace-nowrap">
                <time dateTime="2027-03-24">24</time>
                {" \u2013 "}
                <time dateTime="2027-03-26">26 March 2027</time>
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-white/50" />
              <span className="whitespace-nowrap">Pune, India</span>
            </p>

            <h1
              id="hero-heading"
              className="m-0 max-w-[760px] text-[clamp(1.75rem,7.5vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.02em] text-white uppercase lg:text-[clamp(2.5rem,4.2vw,4.6rem)]"
            >
              <span className="block">
                Where global die &amp; mould leaders
              </span>
              <span className="mt-2 block sm:mt-3">
                meet India&apos;s manufacturers.
              </span>
            </h1>

            <p className="mt-5 max-w-[600px] text-sm leading-[1.7] font-medium text-white/95 min-[375px]:text-[15px] sm:mt-6 sm:text-base xl:text-lg">
              International Exhibition for Die &amp; Mould, Tooling, and
              Precision Manufacturing Technologies.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative z-10 h-[clamp(180px,50vw,360px)] w-full overflow-hidden rounded-tl-[64px] bg-[#003875] sm:rounded-tl-[120px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[62%] lg:rounded-none lg:[clip-path:ellipse(78%_140%_at_100%_120%)]"
        >
          <Image
            src="/images/vmc.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 [container-type:size]">
            <iframe
              // Crop 72px from the player edges to hide YouTube's title overlay.
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
              style={{
                width: "calc(max(100cqw, 177.78cqh) + 256px)",
                height: "calc(max(100cqh, 56.25cqw) + 144px)",
              }}
              src={IFRAME_SRC}
              title="DIEMEX 2027 Exhibition"
              allow="autoplay; fullscreen"
              allowFullScreen
              tabIndex={-1}
            />
          </div>
        </div>
      </div>

      <div className="relative bg-[#F4F4F4] text-[#123867] shadow-[0_-5px_20px_rgba(0,0,0,.06)]">
        <ul className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-4 gap-y-7 px-5 py-7 sm:gap-x-7 sm:px-10 sm:py-8 lg:grid-cols-4 lg:gap-0 lg:px-[72px]">
          {highlights.map((item, index) => {
            const Icon = item.icon

            return (
              <li
                key={item.title}
                className={`flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:gap-4 lg:px-5 xl:px-6 ${
                  index === 0
                    ? "lg:pl-0 xl:pl-0"
                    : "lg:border-l lg:border-[#d8e1ea]"
                } ${index === highlights.length - 1 ? "lg:pr-0 xl:pr-0" : ""}`}
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 xl:h-16 xl:w-16 ${item.iconBg}`}>
                  <Icon
                    aria-hidden="true"
                    strokeWidth={2}
                    className={`h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7 ${item.iconColor}`}
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm leading-snug font-extrabold text-[#123867] sm:text-base xl:text-[17px]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#365575] sm:text-sm xl:text-[15px]">
                    {item.text}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}