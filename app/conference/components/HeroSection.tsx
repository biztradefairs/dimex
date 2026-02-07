'use client'

import { useState, useRef } from 'react'
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Button from '@/components/UI/Button'

export default function HeroSection() {
  const VIDEO_ID = 'eRisU7tEOWU'
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getIframeUrl = () => {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: isMuted ? '1' : '0',
      controls: '0',
      loop: '1',
      playlist: VIDEO_ID,
      modestbranding: '1',
      rel: '0',
      playsinline: '1',
      fs: '0',
      disablekb: '1',
      iv_load_policy: '3',
      enablejsapi: '1',
    })

    return `https://www.youtube.com/embed/${VIDEO_ID}?${params.toString()}`
  }

  const handlePlayPause = () => {
    if (!iframeRef.current?.contentWindow) return

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: isPlaying ? 'pauseVideo' : 'playVideo',
      }),
      '*'
    )

    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    if (!iframeRef.current?.contentWindow) return

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: 'command',
        func: isMuted ? 'unMute' : 'mute',
      }),
      '*'
    )

    setIsMuted(!isMuted)
  }

  return (
    <section className="relative h-screen min-h-[600px] md:min-h-[700px] w-full overflow-hidden text-white">
      {/* ================= BACKGROUND VIDEO ================= */}
      <div className="hero-video-wrapper bg-black absolute inset-0">
        <iframe
          ref={iframeRef}
          src={getIframeUrl()}
          title="DIEMEX 2026 Background Video"
          className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full scale-125 -translate-x-1/2 -translate-y-1/2 pointer-events-none object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            width: '177.77vh',
            height: '56.25vw',
          }}
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />

        {/* Fallback image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
            opacity: isPlaying ? 0 : 1,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex h-full w-full items-end px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="mx-auto w-full max-w-[1440px] pb-6 md:pb-10 lg:pb-16">
          {/* Controls */}
          <div className="mb-4 md:mb-6 flex gap-2 md:gap-3">
            <button
              onClick={handlePlayPause}
              className="relative z-50 rounded-full bg-black/60 p-2 md:p-3 backdrop-blur transition hover:scale-105 hover:bg-black/80 pointer-events-auto"
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <PlayIcon className="h-4 w-4 md:h-6 md:w-6" />
              )}
            </button>

            <button
              onClick={handleMute}
              className="relative z-50 rounded-full bg-black/60 p-2 md:p-3 backdrop-blur transition hover:scale-105 hover:bg-black/80 pointer-events-auto"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-4 w-4 md:h-6 md:w-6" />
              ) : (
                <SpeakerWaveIcon className="h-4 w-4 md:h-6 md:w-6" />
              )}
            </button>
          </div>

          {/* Heading */}
          <h1 className="font-parabolica text-[32px] font-bold leading-[0.85] tracking-tight sm:text-[48px] md:text-[80px] lg:text-[100px] xl:text-[160px]">
            DIEMEX <span className="text-[#82C6EB]">2026</span>
          </h1>

          {/* Sub content */}
          <div className="mt-4 md:mt-6 flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <h2 className="mb-2 md:mb-3 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">
                Where global die & mould leaders meet India's manufacturers.
              </h2>

              <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                3rd Edition of the International Exhibition for Die & Mould,
                Tooling, and Precision Manufacturing Technologies
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-4 lg:mt-0 lg:ml-auto flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                onClick={() => window.location.href = '/delegates-packages2026'}
                className="text-sm md:text-base px-4 py-2 md:px-6 md:py-3 lg:px-10 lg:py-4"
              >
                Become a delegate
              </Button>

              <Link href="/become-partner">
                <button className="relative z-50 rounded-full bg-[#004D9F] px-6 py-3 md:px-8 md:py-3 lg:px-10 lg:py-4 text-sm md:text-base lg:text-lg font-semibold transition hover:scale-105 hover:shadow-2xl hover:shadow-[#33A8DF]/40 pointer-events-auto">
                  Become a partner
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}