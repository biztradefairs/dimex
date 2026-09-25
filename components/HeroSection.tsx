"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Cog,
  Globe,
  Handshake,
  Lightbulb,
  LineChart,
  MapPin,
  Pause,
  Play,
  Rocket,
  Users,
  Volume2,
  VolumeX,
} from "lucide-react"

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
  fs: "0",
  disablekb: "1",
  iv_load_policy: "3",
  enablejsapi: "1",
}).toString()}`

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Industry Visitors",
  },
  {
    icon: Building2,
    value: "300+",
    label: "Exhibitors",
  },
  {
    icon: Globe,
    value: "20+",
    label: "Countries",
  },
  {
    icon: Cog,
    value: "Latest",
    label: "Technologies",
  },
]

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
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const postVideoCommand = (func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args: [],
      }),
      "*"
    )
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "listening",
        }),
        "*"
      )

      if (isPlaying) {
        postVideoCommand("playVideo")
      }
    }, 2500)

    return () => window.clearInterval(timer)
  }, [isPlaying])

  return (
    <section
      id="heroSection"
      className="relative isolate overflow-hidden bg-[#003b75] text-white"
    >
      {/* =========================================================
          HERO
      ========================================================= */}
      <div className="relative overflow-hidden lg:h-[680px] xl:h-[700px]">
        {/* =======================================================
            BASE BLUE BACKGROUND
        ======================================================= */}

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                ellipse 55% 85% at 44% 60%,
                rgba(0,105,202,.55) 0%,
                rgba(0,82,161,.28) 42%,
                transparent 72%
              ),
              linear-gradient(
                110deg,
                #003568 0%,
                #004486 34%,
                #0056a6 65%,
                #0062b9 100%
              )
            `,
          }}
        />

        {/* =======================================================
            SUBTLE DOT PATTERN
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[82px]
            left-[27%]
            z-[2]
            hidden
            h-[155px]
            w-[250px]
            opacity-[0.09]
            lg:block
          "
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 2px, transparent 2.5px)",
            backgroundSize: "11px 11px",
          }}
        />

        {/* =======================================================
            RIGHT VIDEO

            Important:
            The video itself is clipped into a large ellipse.
            There is NO solid blue ellipse covering the video.
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            z-[3]
            hidden
            w-[58%]
            overflow-hidden
            lg:block
          "
          style={{
            clipPath: "ellipse(72% 96% at 76% 48%)",
          }}
        >
          <iframe
            ref={iframeRef}
            src={IFRAME_SRC}
            title="DIEMEX 2027 Exhibition"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="
              absolute
              left-1/2
              top-1/2
              h-full
              w-[178%]
              -translate-x-[48%]
              -translate-y-1/2
              scale-[1.03]
            "
            style={{
              pointerEvents: "none",
            }}
          />

          {/* Blue fade on left of video */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  rgba(0,61,122,.56) 0%,
                  rgba(0,72,143,.30) 14%,
                  rgba(0,81,157,.10) 27%,
                  transparent 42%
                )
              `,
            }}
          />

          {/* Subtle bottom fade */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[28%]
              bg-gradient-to-t
              from-[#003d78]/35
              via-[#003d78]/10
              to-transparent
            "
          />
        </div>

        {/* =======================================================
            MAIN CURVED VIDEO BORDER

            These are outlines only, not filled shapes.
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            right-[-16.5%]
            top-[-22%]
            z-[4]
            hidden
            h-[145%]
            w-[74%]
            rounded-[50%]
            border-l-[3px]
            border-[#00a5f5]/90
            lg:block
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-15.4%]
            top-[-21%]
            z-[4]
            hidden
            h-[143%]
            w-[72.5%]
            rounded-[50%]
            border-l
            border-white/20
            lg:block
          "
        />

        {/* =======================================================
            LEFT-TO-VIDEO SOFT TRANSITION
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-[40%]
            right-[38%]
            z-[5]
            hidden
            lg:block
          "
          style={{
            background: `
              linear-gradient(
                90deg,
                rgba(0,82,160,.98) 0%,
                rgba(0,82,160,.78) 30%,
                rgba(0,82,160,.34) 62%,
                transparent 100%
              )
            `,
          }}
        />

        {/* =======================================================
            BOTTOM DECORATIVE CURVES
        ======================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-390px]
            left-[31%]
            z-[2]
            hidden
            h-[690px]
            w-[760px]
            rounded-[50%]
            border-[2px]
            border-[#078fe2]/65
            lg:block
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-420px]
            left-[34%]
            z-[2]
            hidden
            h-[720px]
            w-[740px]
            rounded-[50%]
            border
            border-[#14a3ef]/30
            lg:block
          "
        />

        {/* =======================================================
            CONTENT CONTAINER
        ======================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            h-full
            w-full
            max-w-[1600px]
            px-6
            sm:px-10
            lg:px-[72px]
            xl:px-[74px]
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ===================================================== */}

          <div
            className="
              relative
              z-20
              flex
              max-w-[650px]
              flex-col
              pt-[132px]
              lg:max-w-[620px]
              lg:pt-[156px]
              xl:max-w-[680px]
              xl:pt-[162px]
            "
          >
            <p
              className="
                text-[11px]
                font-bold
                uppercase
                leading-relaxed
                tracking-[0.14em]
                text-white/80
                sm:text-[13px]
                sm:tracking-[0.22em]
                lg:tracking-[0.28em]
              "
            >
              3rd Edition of the International Exhibition
            </p>

            {/* DIEMEX 2027 */}

            <h1
              className="
                mt-3
                flex
                flex-wrap
                items-baseline
                gap-x-3
                text-[42px]
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.045em]
                sm:mt-[16px]
                sm:gap-x-[16px]
                sm:text-[68px]
                sm:tracking-[-0.055em]
                lg:text-[80px]
                xl:text-[94px]
              "
            >
              <span>DIEMEX</span>

              <span className="text-[#ff0613]">2027</span>
            </h1>

            {/* HEADING */}

            <h2
              className="
                mt-4
                max-w-[610px]
                text-[22px]
                font-extrabold
                leading-[1.2]
                tracking-[-0.025em]
                sm:mt-[25px]
                sm:text-[28px]
                lg:text-[30px]
                xl:text-[33px]
              "
            >
              Where global die &amp; mould leaders
              <br className="hidden sm:block" /> meet India&apos;s
              manufacturers.
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-[17px]
                max-w-[590px]
                text-[15px]
                leading-[1.5]
                text-white/80
                sm:text-[16px]
                xl:text-[17px]
              "
            >
              International Exhibition for Die &amp; Mould, Tooling, and
              Precision
              <br className="hidden xl:block" /> Manufacturing Technologies
            </p>

            {/* ===================================================
                DATE + LOCATION
            =================================================== */}

            <div
              className="
                mt-5
                flex
                flex-col
                gap-4
                sm:mt-[28px]
                sm:flex-row
                sm:items-center
                sm:gap-8
              "
            >
              {/* Date */}

              <div className="flex items-center gap-[15px]">
                <CalendarDays
                  strokeWidth={2.2}
                  className="h-[34px] w-[34px] shrink-0 text-[#ff1020]"
                />

                <div>
                  <p className="text-[15px] font-bold sm:text-[16px]">
                    24 – 26 March 2027
                  </p>

                  <p className="mt-1 text-[14px] font-medium text-white/90">
                    10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              {/* Separator */}

              <div className="hidden h-[43px] w-px bg-white/35 sm:block" />

              {/* Location */}

              <div className="flex items-center gap-[15px]">
                <MapPin
                  strokeWidth={2.3}
                  className="h-[34px] w-[34px] shrink-0 text-[#ff1020]"
                />

                <div>
                  <p className="text-[15px] font-bold sm:text-[16px]">
                    Auto Cluster Exhibition Centre
                  </p>

                  <p className="mt-1 text-[14px] font-medium text-white/90">
                    Pune, India
                  </p>
                </div>
              </div>
            </div>

            {/* ===================================================
                CTA BUTTONS
            =================================================== */}

            <div className="mt-5 flex flex-col gap-3 sm:mt-[27px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-[18px]">
              <Link
                href="/visitor-registration"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#ff0713]
                  px-7
                  py-3.5
                  sm:w-auto
                  sm:min-w-[205px]
                  sm:py-[17px]
                  text-[14px]
                  font-bold
                  text-white
                  transition
                  duration-200
                  hover:bg-[#db0010]
                "
              >
                Register Now

                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>

              <Link
                href="/exhibiting-enquiry"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border-[1.5px]
                  border-white
                  bg-[#003e79]/30
                  px-7
                  py-3.5
                  sm:w-auto
                  sm:min-w-[220px]
                  sm:py-[16px]
                  text-[14px]
                  font-bold
                  text-white
                  backdrop-blur-sm
                  transition
                  duration-200
                  hover:bg-white
                  hover:text-[#004A96]
                "
              >
                Exhibit With Us

                <ArrowRight className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </div>

          {/* =====================================================
              STAT CARDS
          ===================================================== */}

          <div
            className="
              relative
              z-30
              mt-8
              grid
              grid-cols-2
              gap-2.5
              pb-6
              sm:mt-10
              sm:grid-cols-4
              sm:gap-3
              sm:pb-8
              lg:absolute
              lg:bottom-[34px]
              lg:right-[48px]
              lg:mt-0
              lg:w-[720px]
              lg:gap-[14px]
              lg:pb-0
              xl:right-[58px]
              xl:w-[760px]
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="
                    flex
                    h-[112px]
                    flex-col
                    items-center
                    justify-center
                    rounded-[16px]
                    border
                    border-[#65a6d6]/55
                    bg-[#003d79]/65
                    px-2
                    text-center
                    shadow-[0_10px_28px_rgba(0,25,65,.22)]
                    backdrop-blur-[8px]
                    sm:h-[140px]
                    sm:px-3
                    lg:h-[160px]
                  "
                >
                  <Icon
                    strokeWidth={1.9}
                    className="
                      mb-2
                      h-6
                      w-6
                      text-[#00d8ff]
                      sm:mb-[14px]
                      sm:h-[34px]
                      sm:w-[34px]
                    "
                  />

                  <p
                    className="
                      text-[18px]
                      font-extrabold
                      leading-none
                      tracking-[-0.03em]
                      text-white
                      sm:text-[22px]
                      lg:text-[25px]
                    "
                  >
                    {stat.value}
                  </p>

                  <p
                    className="
                      mt-1.5
                      text-[12px]
                      font-medium
                      leading-tight
                      text-white/80
                      sm:mt-[9px]
                      sm:text-[14px]
                    "
                  >
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* =======================================================
            VIDEO CONTROLS
        ======================================================= */}

        <div
          className="
            absolute
            right-5
            top-[132px]
            z-40
            lg:top-[140px]
            hidden
            gap-2
            lg:flex
          "
        >
          {/* Play / Pause */}

          <button
            type="button"
            onClick={() => {
              postVideoCommand(isPlaying ? "pauseVideo" : "playVideo")
              setIsPlaying((value) => !value)
            }}
            className="
              rounded-full
              border
              border-white/20
              bg-black/30
              p-2.5
              backdrop-blur-md
              transition
              hover:bg-black/60
            "
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>

          {/* Mute */}

          <button
            type="button"
            onClick={() => {
              postVideoCommand(isMuted ? "unMute" : "mute")
              setIsMuted((value) => !value)
            }}
            className="
              rounded-full
              border
              border-white/20
              bg-black/30
              p-2.5
              backdrop-blur-md
              transition
              hover:bg-black/60
            "
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================
          BOTTOM WHITE FEATURE BAR
      ========================================================= */}

      <div
        className="
          relative
          z-40
          rounded-t-[28px]
          bg-white
          text-[#123867]
          shadow-[0_-5px_20px_rgba(0,0,0,.06)]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            grid-cols-1
            px-6
            py-[20px]
            sm:grid-cols-2
            sm:px-10
            lg:grid-cols-4
            lg:px-[72px]
          "
        >
          {highlights.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className={`
                  relative
                  flex
                  min-h-[74px]
                  items-center
                  gap-[18px]
                  py-3
                  lg:px-[30px]
                  lg:py-0
                  ${index === 0 ? "lg:pl-0" : ""}
                `}
              >
                {/* Separator */}

                {index !== 0 && (
                  <div
                    className="
                      absolute
                      left-0
                      top-1/2
                      hidden
                      h-[55px]
                      w-px
                      -translate-y-1/2
                      bg-[#d8e1ea]
                      lg:block
                    "
                  />
                )}

                {/* Icon */}

                <div
                  className={`
                    flex
                    h-[64px]
                    w-[64px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${item.iconBg}
                  `}
                >
                  <Icon
                    strokeWidth={2}
                    className={`h-[29px] w-[29px] ${item.iconColor}`}
                  />
                </div>

                {/* Content */}

                <div>
                  <h3
                    className="
                      text-[15px]
                      font-extrabold
                      leading-tight
                      text-[#123867]
                      xl:text-[16px]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-[4px]
                      max-w-[220px]
                      text-[13px]
                      leading-[1.35]
                      text-[#365575]
                      xl:text-[14px]
                    "
                  >
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