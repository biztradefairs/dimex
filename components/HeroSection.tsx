"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react"

const VIDEO_ID = "3P-hRFrsXIs"

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getIframeUrl = () => {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: isMuted ? "1" : "0",
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
    })
    return `https://www.youtube.com/embed/${VIDEO_ID}?${params.toString()}`
  }

  const postVideoCommand = (func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    )
  }

  const handlePlayPause = () => {
    postVideoCommand(isPlaying ? "pauseVideo" : "playVideo")
    setIsPlaying((prev) => !prev)
  }

  const handleMute = () => {
    postVideoCommand(isMuted ? "unMute" : "mute")
    setIsMuted((prev) => !prev)
  }

  const scrollToNext = () => {
    const next = document.getElementById("heroSection")?.nextElementSibling
    next?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="heroSection"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#06162F] text-white"
    >
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          src={getIframeUrl()}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            pointerEvents: "none",
            width: "max(100%, 177.78vh)",
            height: "max(100%, 56.25vw)",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="DIEMEX 2026 Background Video"
        />
        <div className="absolute inset-0 bg-black/20 lg:bg-black/10" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06162F]/90 via-[#06162F]/70 to-[#06162F]/95 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#06162F] from-[0%] via-[#06162F]/92 via-[42%] to-transparent to-[72%] lg:block" />

      {/* ================= MOBILE / TABLET ================= */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-8 pt-[7.5rem] lg:hidden">
        <p className="max-w-[16rem] text-[11px] font-semibold uppercase leading-[1.55] tracking-[0.18em] text-[#82C6EB]">
          Die &amp; Mould · Tooling · Precision · Progress
        </p>

        <h1 className="mt-4 font-parabolica text-[52px] font-black leading-[0.86] tracking-tight xs:text-[60px]">
          DIEMEX
          <span className="mt-1 block text-[#82C6EB]">2026</span>
        </h1>

        <h2 className="mt-5 max-w-[20rem] text-[22px] font-semibold leading-snug text-white">
          Where global die &amp; mould leaders meet India&apos;s manufacturers.
        </h2>

        <p className="mt-4 max-w-[21rem] text-[13px] leading-relaxed text-white/70">
          3rd Edition of the International Exhibition for Die &amp; Mould, Tooling,
          and Precision Manufacturing Technologies
        </p>

        <p className="mt-4 flex items-center gap-2 text-[13px] text-white/80">
          <MapPin className="h-4 w-4 shrink-0 text-[#82C6EB]" />
          Auto Cluster Exhibition Centre, Pune
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Link
            href="/exhibiting-enquiry"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.45)]"
          >
            Book Your Stand
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/visitor-registration"
            className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3.5 text-[15px] font-semibold text-white"
          >
            Register to Attend
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] w-full max-w-[1600px] flex-col justify-center px-8 pb-16 pt-28 lg:flex">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#82C6EB]">
            Die &amp; Mould · Tooling · Precision · Progress
          </p>

          <h1 className="font-parabolica text-[88px] font-black leading-[0.9] tracking-tight xl:text-[104px]">
            DIEMEX <span className="text-[#82C6EB]">2026</span>
          </h1>

          <h2 className="mt-5 max-w-xl text-2xl font-semibold leading-snug text-white lg:text-[28px]">
            Where global die &amp; mould leaders meet India&apos;s manufacturers.
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
            3rd Edition of the International Exhibition for Die &amp; Mould, Tooling,
            and Precision Manufacturing Technologies
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/exhibiting-enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#004D9F] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,77,159,0.45)] transition hover:bg-[#003d7f] hover:shadow-[0_16px_36px_rgba(51,168,223,0.35)]"
            >
              Book Your Stand
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/visitor-registration"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/60 hover:bg-white/10"
            >
              Register to Attend
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-20 hidden items-center gap-3 lg:flex">
        <button
          type="button"
          onClick={scrollToNext}
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5">
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </span>
          Explore More
        </button>
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden gap-2 lg:flex">
        <button
          type="button"
          onClick={handlePlayPause}
          className="rounded-full border border-white/15 bg-black/45 p-2.5 backdrop-blur-md transition hover:bg-black/70"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={handleMute}
          className="rounded-full border border-white/15 bg-black/45 p-2.5 backdrop-blur-md transition hover:bg-black/70"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </section>
  )
}
