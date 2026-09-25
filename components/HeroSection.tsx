"use client"

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
    <section id="heroSection" className="relative w-full bg-[#004A96] pt-[84px] text-white sm:pt-[112px] lg:pt-[168px]">
      <div className="relative flex h-[520px] items-stretch overflow-hidden max-[900px]:h-auto max-[900px]:min-h-[580px] max-[600px]:min-h-[600px]">
        <div className="absolute top-0 right-0 z-10 h-full w-[70%] bg-[#004A96] max-[1100px]:w-[56%] max-[900px]:h-full max-[900px]:w-full">
          <div className="absolute inset-0 overflow-hidden [clip-path:ellipse(78%_140%_at_100%_120%)] max-[900px]:[clip-path:ellipse(72%_60%_at_100%_100%)]">
            <iframe
              className="pointer-events-none absolute top-1/2 left-1/2 block h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 border-none bg-transparent max-[900px]:h-[450%] max-[900px]:w-[450%]"
              src={IFRAME_SRC}
              title="DIEMEX 2027 Exhibition"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>

        <div className="relative z-40 flex h-full w-[52%] items-center max-[1100px]:w-[58%] max-[900px]:w-full max-[900px]:items-start max-[900px]:pt-12 max-[900px]:pb-12 max-[600px]:pt-14 max-[600px]:pb-14">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-center px-6 sm:px-10 lg:px-[72px] max-[900px]:pr-4 max-[900px]:pl-8 max-[600px]:pl-6 max-[375px]:pl-5">
            <p className="m-0 mb-4 text-[1.2rem] font-normal tracking-[0.1em] text-white uppercase max-[375px]:text-[1.05rem] min-[600px]:text-[1.25rem] min-[600px]:tracking-[0.16em] min-[900px]:text-[1.4rem]">
              24 – 26 March 2027 &nbsp;|&nbsp; Pune, India
            </p>

            <h1 className="m-0 mb-6 max-w-[760px] text-[2.6rem] font-bold tracking-[-0.01em] text-white uppercase max-[375px]:text-[2.2rem] min-[600px]:text-[3.2rem] min-[900px]:text-[clamp(2.8rem,4.2vw,4.6rem)]">
              <span className="block leading-[1.05]">Where global die &amp; mould leaders</span>
              <span className="mt-2 block leading-[1.05] min-[600px]:mt-3">meet India&apos;s manufacturers.</span>
            </h1>

            <div className="mb-4 flex max-w-[640px] flex-col gap-3">
              <p className="m-0 text-[0.95rem] leading-[1.6] font-medium text-white/95 min-[375px]:text-[1.05rem] min-[600px]:text-[1.1rem] min-[900px]:text-[1.125rem]">
                International Exhibition for Die &amp; Mould, Tooling, and Precision Manufacturing Technologies.
              </p>
              {/* <p className="m-0 text-[0.95rem] leading-[1.6] font-medium text-white/95 min-[375px]:text-[1.05rem] min-[600px]:text-[1.1rem] min-[900px]:text-[1.125rem]">
                Connect with industry leaders, discover the latest technologies, and unlock new opportunities in manufacturing.
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-40 rounded-t-[28px] bg-white text-[#123867] shadow-[0_-5px_20px_rgba(0,0,0,.06)]">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 px-6 py-[20px] sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-[72px]">
          {highlights.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className={`relative flex min-h-[74px] items-center gap-[18px] py-3 lg:px-[30px] lg:py-0 ${
                  index === 0 ? "lg:pl-0" : ""
                }`}
              >
                {index !== 0 && (
                  <div className="absolute top-1/2 left-0 hidden h-[55px] w-px -translate-y-1/2 bg-[#d8e1ea] lg:block" />
                )}

                <div className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full ${item.iconBg}`}>
                  <Icon strokeWidth={2} className={`h-[29px] w-[29px] ${item.iconColor}`} />
                </div>

                <div>
                  <h3 className="text-[15px] leading-tight font-extrabold text-[#123867] xl:text-[16px]">{item.title}</h3>
                  <p className="mt-[4px] max-w-[220px] text-[13px] leading-[1.35] text-[#365575] xl:text-[14px]">
                    {item.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
