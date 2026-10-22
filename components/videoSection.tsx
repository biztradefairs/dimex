'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Play } from 'lucide-react';
import SectionContainer from './UI/SectionContainer';

const VIDEO_ID = '3P-hRFrsXIs';
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&playsinline=1&rel=0&controls=1`;

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isPlaying) playerRef.current?.focus();
  }, [isPlaying]);

  return (
    <section
      id="diemex-highlights"
      aria-labelledby="diemex-highlights-heading"
      className="scroll-mt-28 bg-white pb-16 pt-4 font-parabolica sm:pb-20 sm:pt-6 lg:scroll-mt-44 lg:pb-24 lg:pt-8"
    >
      <SectionContainer>
        <div className="rounded-3xl border border-[#004A96]/10 bg-[#F4F7FB] p-6 sm:rounded-[2rem] sm:p-8 lg:p-10 xl:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-12 lg:gap-y-6 xl:gap-x-16">
            <header className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
              <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#526174] sm:text-sm">
                <span aria-hidden="true" className="h-0.5 w-9 shrink-0 bg-[#E0161D]" />
                The DIEMEX experience
              </p>
              <h2
                id="diemex-highlights-heading"
                className="text-[2rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[#132D49] sm:text-[2.625rem] xl:text-[3rem] 2xl:text-[3.25rem]"
              >
                See DIEMEX{' '}
                <span className="block text-[#004A96]">in action.</span>
              </h2>
            </header>

            <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <figure className="overflow-hidden rounded-2xl border border-[#004A96]/10 bg-white shadow-[0_12px_36px_rgba(0,56,117,0.08)] sm:rounded-3xl">
                <div className="relative aspect-video overflow-hidden bg-[#E7EEF6]">
                  {isPlaying ? (
                    <iframe
                      ref={playerRef}
                      id="diemex-highlights-player"
                      className="absolute inset-0 h-full w-full border-0"
                      src={EMBED_URL}
                      title="DIEMEX 2025 International Die & Mould Exhibition highlights"
                      allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play DIEMEX 2025 exhibition highlights"
                      className="group absolute inset-0 h-full w-full cursor-pointer overflow-hidden text-left focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-white"
                    >
                      <Image
                        src="/images/media-gallery/EX25_8.webp"
                        alt="Exhibitors and industry visitors meeting at DIEMEX 2025"
                        fill
                        sizes="(min-width: 1536px) 720px, (min-width: 1024px) 48vw, 100vw"
                        className="object-cover object-[center_45%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#132D49]/65 via-transparent to-transparent" />
                      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#004A96] shadow-xl ring-8 ring-white/25 transition-colors group-hover:bg-[#004A96] group-hover:text-white motion-reduce:transition-none sm:h-20 sm:w-20">
                          <Play className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" strokeWidth={1.5} />
                        </span>
                      </span>
                      <span aria-hidden="true" className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white sm:bottom-6 sm:left-6 sm:text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E0161D]" />
                        DIEMEX 2025
                      </span>
                    </button>
                  )}
                </div>
                <figcaption className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
                  <p className="min-w-0 text-sm font-semibold leading-snug text-[#132D49]">DIEMEX 2025 highlights</p>
                  <a
                    href={VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Watch DIEMEX highlights on YouTube"
                    className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-xs font-semibold text-[#004A96] transition-colors hover:text-[#E0161D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004A96] motion-reduce:transition-none sm:text-sm"
                  >
                    YouTube
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </figcaption>
              </figure>

              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-[#004A96]/10 pt-5 sm:gap-5">
                <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                  <CalendarDays aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#004A96] sm:h-5 sm:w-5" />
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526174] sm:text-xs">Next edition</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-[#526174] sm:text-sm">
                      <span className="block font-semibold text-[#132D49]">DIEMEX 2027</span>
                      <time dateTime="2027-03-24">24</time>-<time dateTime="2027-03-26">26 March 2027</time>
                    </dd>
                  </div>
                </div>
                <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#E0161D] sm:h-5 sm:w-5" />
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#526174] sm:text-xs">Venue</dt>
                    <dd className="mt-1 text-xs font-medium leading-relaxed text-[#132D49] sm:text-sm">
                      Auto Cluster Exhibition Centre,<br />
                      <span className="font-normal text-[#526174]">Pune</span>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start">
              <div className="space-y-4 text-base leading-[1.8] text-[#526174]">
                <p>
                  <strong className="font-semibold text-[#132D49]">DIEMEX 2025 highlights:</strong>{' '}
                  watch India’s die, mould, tooling and advanced manufacturing exhibition
                  in action. See machine tool displays, CNC and EDM technologies, 3D
                  printing, metrology and inspection systems, and the manufacturers,
                  OEMs, toolmakers and buyers who came together to network and generate
                  business leads.
                </p>
                <p>
                  Whether you are looking for die and mould suppliers, precision tooling
                  solutions, or a platform to showcase your products to automotive, EV
                  and engineering buyers, DIEMEX is where the industry meets.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link
                  href="/register?t=visitor"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#004A96] px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#E0161D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004A96] motion-reduce:transition-none sm:px-6"
                >
                  <span>Register free as a visitor</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/register?t=exhibitor"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#004A96]/25 bg-white px-4 py-3.5 text-center text-sm font-semibold text-[#004A96] transition-colors hover:border-[#004A96] hover:bg-[#004A96]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004A96] motion-reduce:transition-none sm:px-6"
                >
                  <span>Book a stall</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
