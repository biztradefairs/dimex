'use client';

import { useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import SectionContainer from './UI/SectionContainer';

const PHOTOS = [
  { src: '/images/media-gallery/20205IN_15.webp', alt: 'Lamp lighting at the DIEMEX 2025 inauguration' },
  { src: '/images/media-gallery/EX25_1.webp', alt: 'Visitors exploring tooling displays at DIEMEX 2025' },
  { src: '/images/why-exhibit-header.JPG', alt: 'Die and mould technologies at the Raj Tools exhibition stand' },
  { src: '/images/media-gallery/EX25_4.webp', alt: 'Industry professionals meeting at the Pawan exhibition stand' },
  { src: '/images/media-gallery/EX25_8.webp', alt: 'Exhibitors and visitors discussing manufacturing solutions' },
  { src: '/images/media-gallery/AW_1.webp', alt: 'An exhibitor receiving a DIEMEX 2025 award' },
  { src: '/images/media-gallery/20205IN_10.webp', alt: 'Exhibition guests beside the ceremonial lamp at DIEMEX 2025' },
  { src: '/images/media-gallery/EX25_2.webp', alt: 'Die and tooling displays on the DIEMEX 2025 show floor' },
  { src: '/images/media-gallery/EX25_10.webp', alt: 'International visitors exploring die and mould exhibits' },
];

const STATS = [
  { value: '10,000', label: 'Visitors' },
  { value: '200+', label: 'Exhibitors' },
  { value: '5+', label: 'Countries' },
  { value: '10', label: 'Event Sectors' },
];

function AboutPhotoStack() {
  const [activePhoto, setActivePhoto] = useState(0);
  const nextPhoto = () => setActivePhoto((current) => (current + 1) % PHOTOS.length);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        nextPhoto();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setActivePhoto((current) => (current - 1 + PHOTOS.length) % PHOTOS.length);
        break;
      case 'Home':
        event.preventDefault();
        setActivePhoto(0);
        break;
      case 'End':
        event.preventDefault();
        setActivePhoto(PHOTOS.length - 1);
        break;
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="DIEMEX exhibition highlights"
      onKeyDown={handleKeyDown}
      className="relative min-w-0"
    >
      <div className="relative pb-6 pr-8 [--card-step-x:14px] [--card-step-y:10px] sm:pb-[30px] sm:pr-[52px] sm:[--card-step-x:26px] sm:[--card-step-y:15px]">
        <div className="relative aspect-[3/2] w-full">
          {[2, 1, 0].map((layer) => {
            const photo = PHOTOS[(activePhoto + layer) % PHOTOS.length];
            return (
              <div
                key={photo.src}
                aria-hidden={layer !== 0}
                className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-xl shadow-[#003875]/15 ring-1 ring-[#004A96]/10 motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:ease-out sm:rounded-3xl"
                style={{
                  zIndex: 3 - layer,
                  transform: `translateX(calc(var(--card-step-x) * ${layer})) translateY(calc(var(--card-step-y) * ${layer})) scale(${1 - layer * 0.05}) rotate(${layer * 2.6}deg)`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={layer === 0 ? photo.alt : ''}
                  fill
                  sizes="(min-width: 1536px) 680px, (min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white motion-safe:transition-opacity motion-safe:duration-500"
                  style={{ opacity: layer === 0 ? 0 : layer === 1 ? 0.67 : 0.89 }}
                />
              </div>
            );
          })}
          <button
            type="button"
            onClick={nextPhoto}
            aria-label={`${PHOTOS[activePhoto].alt}. Show next photo.`}
            className="absolute inset-0 z-10 cursor-pointer rounded-2xl bg-transparent focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#E0161D] sm:rounded-3xl"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center" aria-label="Choose an exhibition photo">
          {PHOTOS.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActivePhoto(index)}
              aria-label={`Show photo ${index + 1} of ${PHOTOS.length}`}
              aria-current={index === activePhoto}
              className="group flex h-10 w-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004A96]"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full motion-safe:transition-all motion-safe:duration-300 ${index === activePhoto ? 'w-6 bg-[#004A96]' : 'w-1.5 bg-[#004A96]/20 group-hover:bg-[#E0161D]'}`}
              />
            </button>
          ))}
        </div>
        <p aria-live="polite" aria-atomic="true" className="shrink-0 text-xs font-medium tabular-nums text-[#526174]">
          <span className="text-[#004A96]">{String(activePhoto + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" className="mx-1.5 text-[#E0161D]">/</span>
          <span className="sr-only">of </span>
          {String(PHOTOS.length).padStart(2, '0')}
        </p>
      </div>
      <p className="mt-1 text-sm text-[#526174]">Highlights from DIEMEX 2025</p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about-diemex"
      aria-labelledby="about-diemex-heading"
      className="relative scroll-mt-28 overflow-hidden bg-white py-16 font-parabolica sm:py-20 lg:scroll-mt-44 lg:py-24"
    >
      <SectionContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <AboutPhotoStack />

          <div className="min-w-0">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#526174] sm:text-sm">
              <span aria-hidden="true" className="h-0.5 w-9 bg-[#E0161D]" />
              Discover DIEMEX 2027
            </p>

            <h1
              id="about-diemex-heading"
              className="text-[2.125rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[#132D49] sm:text-[2.625rem] xl:text-[3rem] 2xl:text-[3.25rem]"
            >
              <span className="block">Discover Innovation.</span>{' '}
              <span className="block">Connect with Industry.</span>{' '}
              <span className="block text-[#004A96]">Build Business Opportunities.</span>
            </h1>

            <div className="mt-6 space-y-4 text-base leading-[1.8] text-[#526174] sm:text-lg">
              <p>
                Join <strong className="font-semibold text-[#132D49]">DIEMEX 2027</strong>,
                the International Die &amp; Mould Exhibition in India, bringing together
                industry professionals and businesses across die manufacturing, mould
                making, tooling, precision engineering and advanced manufacturing.
              </p>
              <p>
                Explore manufacturing technologies, connect with industry stakeholders,
                discover innovative solutions and build valuable business relationships
                at a dedicated platform for the die, mould and tooling industry.
              </p>
            </div>

            <dl className="mt-6 grid gap-5 border-y border-[#004A96]/10 py-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#004A96]" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#526174]">Date</dt>
                  <dd className="mt-1 text-sm font-semibold leading-relaxed text-[#132D49] sm:text-base">
                    <time dateTime="2027-03-24">24</time>
                    &ndash;<time dateTime="2027-03-26">26 March 2027</time>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#E0161D]" />
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#526174]">Venue</dt>
                  <dd className="mt-1 text-sm font-semibold leading-relaxed text-[#132D49] sm:text-base">
                    Auto Cluster Exhibition Centre,<br />
                    <span className="font-normal text-[#526174]">Pune, India</span>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/register?t=exhibitor"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#004A96] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#E0161D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004A96]"
              >
                Register as an Exhibitor
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about-diemex"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#004A96]/25 px-5 py-3.5 text-sm font-semibold text-[#004A96] transition-colors hover:border-[#004A96] hover:bg-[#004A96]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#004A96]"
              >
                Explore DIEMEX 2027
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

        <ul
          aria-label="DIEMEX at a glance"
          className="mt-12 grid grid-cols-2 border-t border-[#E1E8EF] pt-6 sm:mt-14 sm:grid-cols-4 sm:pt-8 lg:mt-16"
        >
          {STATS.map((stat) => (
            <li
              key={stat.label}
              className="py-4 pr-4 sm:border-l sm:border-[#E1E8EF] sm:px-6 sm:first:border-l-0 sm:first:pl-0 lg:px-10"
            >
              <p className="text-4xl font-bold leading-none tracking-tight text-[#004A96] sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-medium text-[#526174] sm:text-base">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  );
}
