'use client'

import { useState, useRef, useEffect } from 'react'
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline'

export default function HeroSection() {
  const VIDEO_ID = 'eRisU7tEOWU'
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Direct YouTube iframe URL approach (Simpler and more reliable)
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
      showinfo: '0',
      iv_load_policy: '3',
      background: '1',
      enablejsapi: '1',
    })
    return `https://www.youtube.com/embed/${VIDEO_ID}?${params.toString()}`
  }

  const handlePlayPause = () => {
    if (!iframeRef.current?.contentWindow) return
    
    // Send play/pause commands to iframe
    const message = isPlaying ? 
      '{"event":"command","func":"pauseVideo","args":""}' : 
      '{"event":"command","func":"playVideo","args":""}'
    
    iframeRef.current.contentWindow.postMessage(message, '*')
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    if (!iframeRef.current?.contentWindow) return
    
    const message = isMuted ? 
      '{"event":"command","func":"unMute","args":""}' : 
      '{"event":"command","func":"mute","args":""}'
    
    iframeRef.current.contentWindow.postMessage(message, '*')
    setIsMuted(!isMuted)
  }

  // Handle iframe load
  const handleIframeLoad = () => {
    console.log('YouTube iframe loaded successfully')
  }

  return (
    <section
      id="heroSection"
      className="relative w-full h-screen min-h-[700px] overflow-hidden text-white"
    >
      {/* BACKGROUND VIDEO CONTAINER - FIXED FOR FULL HEIGHT */}
      <div className="absolute inset-0 w-full h-full bg-black">
        {/* Direct YouTube iframe with proper styling */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            ref={iframeRef}
            src={getIframeUrl()}
            className="absolute w-full h-full object-cover scale-125"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1.25)',
              minWidth: '100%',
              minHeight: '100%',
              width: '177.77777778vh', /* 100 * 16 / 9 */
              height: '56.25vw', /* 100 * 9 / 16 */
              pointerEvents: 'none',
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="DIEMEX 2026 Background Video"
            onLoad={handleIframeLoad}
            loading="eager"
          />
        </div>
        
        {/* Fallback image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url(https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg)`,
            opacity: isPlaying ? 0 : 1,
            zIndex: isPlaying ? -1 : 10,
          }}
        />
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
      </div>

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto h-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
          <div className="flex h-full flex-col justify-end gap-5 pb-8 pt-16 lg:pb-16 lg:pt-0">

            {/* CONTROLS */}
            <div className="relative z-30 mb-6 flex gap-3 lg:relative">
              <button
                onClick={handlePlayPause}
                className="rounded-full bg-black/60 p-3 backdrop-blur transition hover:bg-black/80 hover:scale-105"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <PauseIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <PlayIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>

              <button
                onClick={handleMute}
                className="rounded-full bg-black/60 p-3 backdrop-blur transition hover:bg-black/80 hover:scale-105"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <SpeakerXMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <SpeakerWaveIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>

            {/* MAIN HEADING */}
            <h1 className="font-parabolica text-[48px] font-bold leading-[0.85] tracking-tight sm:text-[70px] md:text-[100px] lg:text-[120px] xl:text-[150px] 2xl:text-[170px]">
              DIEMEX <span className="text-[#82C6EB]">2026</span>
            </h1>

            {/* CONTENT */}
            <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end">
              <div className="lg:max-w-5xl">
                <h2 className="font-parabolica mb-3 text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
                  Where global die & mould leaders meet India's manufacturers.
                </h2>

                <ul className="space-y-2 text-sm leading-snug sm:text-base lg:text-lg">
                  <li className="flex items-start gap-2">
                    <span className="mt-[2px] text-[#33A8DF]">•</span>
                    <span>
                      3rd Edition of the International Exhibition for Die & Mould, Tooling, and Precision Manufacturing Technologies
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 shrink-0 lg:ml-auto lg:mt-0">
                <a href="/exhibiting-enquiry">
                  <button className="w-full rounded-full bg-[#004D9F] px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#33A8DF]/40 sm:w-auto sm:px-12 sm:py-4 sm:text-lg">
                    Book Your Stand
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}