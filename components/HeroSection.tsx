"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ChevronDown,
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
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#06162F] text-white"
    >
      <div className="absolute inset-0">
        <iframe
          ref={iframeRef}
          src={getIframeUrl()}
          className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="DIEMEX 2026 Background Video"
        />
        <div className="absolute inset-0 bg-black/25 lg:bg-black/10" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06162F]/80 via-[#06162F]/55 to-[#06162F]/90 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#06162F] from-[0%] via-[#06162F]/92 via-[42%] to-transparent to-[72%] lg:block" />

      {/* <div className="pointer-events-none absolute right-[7%] top-[28%] hidden w-44 xl:block">
        <div className="rotate-0 rounded-2xl bg-[#0B4FA8]/90 px-5 py-8 shadow-2xl backdrop-blur-sm">
          <p className="text-[11px] font-bold uppercase leading-[1.35] tracking-[0.22em] text-white">
            Tools
            <br />
            Moulds
            <br />
            Technology
            <br />
            Tomorrow
          </p>
          <span className="mt-5 block h-px w-10 bg-white/50" />
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70">
            A stronger manufacturing ecosystem
          </p>
        </div>
      </div> */}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-4 pb-8 pt-28 sm:px-6 sm:pt-32 lg:justify-center lg:px-8 lg:pb-16 lg:pt-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#82C6EB] sm:text-xs">
            Die & Mould · Tooling · Precision · Progress
          </p>

          <h1 className="font-parabolica text-[42px] font-black leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px]">
            DIEMEX <span className="text-[#82C6EB]">2026</span>
          </h1>

          <h2 className="mt-5 max-w-xl text-xl font-semibold leading-snug text-white sm:text-2xl lg:text-[28px]">
            Where global die & mould leaders meet India&apos;s manufacturers.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            3rd Edition of the International Exhibition for Die & Mould, Tooling,
            and Precision Manufacturing Technologies
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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

      <div className="absolute bottom-6 left-4 z-20 flex items-center gap-3 sm:left-8 lg:bottom-8">
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

      <div className="absolute bottom-6 right-4 z-20 flex gap-2 sm:right-8 lg:bottom-8">
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