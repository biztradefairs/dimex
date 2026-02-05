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
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden text-white">
      {/* ================= BACKGROUND VIDEO ================= */}
    <div className="hero-video-wrapper bg-black">
        <iframe
          ref={iframeRef}
          src={getIframeUrl()}
          title="DIEMEX 2026 Background Video"
          className="absolute left-1/2 top-1/2 h-full w-full scale-125 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
        <div className="mx-auto w-full max-w-[1440px] pb-10 lg:pb-16">
          {/* Controls */}
          <div className="mb-6 flex gap-3">
            <button
              onClick={handlePlayPause}
              className="relative z-50 rounded-full bg-black/60 p-3 backdrop-blur transition hover:scale-105 hover:bg-black/80 pointer-events-auto"
            >
              {isPlaying ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </button>

            <button
              onClick={handleMute}
              className="relative z-50 rounded-full bg-black/60 p-3 backdrop-blur transition hover:scale-105 hover:bg-black/80 pointer-events-auto"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Heading */}
          <h1 className="font-parabolica text-[48px] font-bold leading-[0.85] tracking-tight sm:text-[80px] md:text-[120px] xl:text-[160px]">
            DIEMEX <span className="text-[#82C6EB]">2026</span>
          </h1>

          {/* Sub content */}
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <h2 className="mb-3 text-xl font-semibold sm:text-2xl lg:text-3xl">
                Where global die & mould leaders meet India’s manufacturers.
              </h2>

              <p className="text-sm sm:text-base lg:text-lg">
                3rd Edition of the International Exhibition for Die & Mould,
                Tooling, and Precision Manufacturing Technologies
              </p>
            </div>

            {/* Buttons */}
            <div className="ml-auto flex flex-col gap-4 sm:flex-row">
             <Button
  onClick={() => window.location.href = '/delegates-packages2026'}
>
  Become a delegate
</Button>


              <Link href="/become-partner">
                <button className="relative z-50 rounded-full bg-[#004D9F] px-10 py-4 text-lg font-semibold transition hover:scale-105 hover:shadow-2xl hover:shadow-[#33A8DF]/40 pointer-events-auto">
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
