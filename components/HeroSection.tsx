"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { MapPin, Pause, Play, Volume2, VolumeX } from "lucide-react"

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
          title="DIEMEX 2027 Background Video"
        />
        <div className="absolute inset-0 bg-black/20 lg:bg-black/10" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06162F]/90 via-[#06162F]/70 to-[#06162F]/95 lg:hidden" />
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#06162F] from-[0%] via-[#06162F]/92 via-[42%] to-transparent to-[72%] lg:block" />

      {/* ================= MOBILE / TABLET ================= */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-[8.75rem] lg:hidden">
        <h1 className="font-parabolica text-[52px] font-black leading-[0.86] tracking-tight xs:text-[60px]">
          DIEMEX
          <span className="mt-1 block text-[#82C6EB]">2027</span>
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

        <div className="mt-7 grid grid-cols-2 gap-2.5">
          <Link
            href="/visitor-registration"
            className="inline-flex items-center justify-center border border-[#82C6EB] bg-transparent px-4 py-3.5 text-[14px] font-semibold text-white"
          >
            Register Now
          </Link>
          <Link
            href="/exhibiting-enquiry"
            className="inline-flex items-center justify-center bg-[#004D9F] px-4 py-3.5 text-[14px] font-semibold text-white"
          >
            Exhibit
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] w-full max-w-[1600px] flex-col justify-center px-8 pb-16 pt-32 lg:flex">
        <div className="max-w-4xl">
          <h1 className="mt-6 font-parabolica text-[92px] font-black leading-[0.88] tracking-tight xl:text-[118px] 2xl:text-[132px]">
            DIEMEX <span className="text-[#82C6EB]">2027</span>
          </h1>

          <h2 className="mt-6 max-w-2xl text-[30px] font-semibold leading-snug text-white xl:mt-8 xl:text-[36px] 2xl:text-[40px]">
            Where global die &amp; mould leaders meet India&apos;s manufacturers.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75 xl:mt-6 xl:text-xl 2xl:text-[22px]">
            3rd Edition of the International Exhibition for Die &amp; Mould, Tooling,
            and Precision Manufacturing Technologies
          </p>

          <div className="mt-10 flex gap-3 xl:mt-12">
            <Link
              href="/visitor-registration"
              className="inline-flex items-center justify-center border border-[#82C6EB] bg-transparent px-10 py-4 text-base font-semibold text-white transition hover:bg-[#82C6EB]/10 xl:px-12 xl:py-4.5 xl:text-lg"
            >
              Register Now
            </Link>
            <Link
              href="/exhibiting-enquiry"
              className="inline-flex items-center justify-center bg-[#004D9F] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#003d7f] xl:px-12 xl:py-4.5 xl:text-lg"
            >
              Exhibit
            </Link>
          </div>
        </div>
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
