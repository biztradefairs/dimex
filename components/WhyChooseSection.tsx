'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Boxes, Handshake, Megaphone, Target, UsersRound } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionContainer from './UI/SectionContainer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    number: '01',
    title: 'Showcase Your Products and Technologies',
    description:
      'Present your products, services, machinery and manufacturing solutions to an industry-focused audience.',
    icon: Boxes,
  },
  {
    number: '02',
    title: 'Connect with Potential Buyers',
    description:
      'Build connections with manufacturers, OEMs, purchasing professionals, engineers and other industry stakeholders.',
    icon: UsersRound,
  },
  {
    number: '03',
    title: 'Generate Business Leads',
    description:
      'Introduce your solutions to prospective customers and develop new business relationships.',
    icon: Target,
  },
  {
    number: '04',
    title: 'Strengthen Your Industry Presence',
    description:
      'Increase brand visibility and position your company within the die, mould, tooling and advanced manufacturing ecosystem.',
    icon: Megaphone,
  },
  {
    number: '05',
    title: 'Explore Business Opportunities',
    description:
      'Meet industry participants, exchange ideas and discover potential partnerships and market opportunities.',
    icon: Handshake,
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('article');
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: headerRef.current, start: 'top 92%', once: true },
        }
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: gridRef.current, start: 'top 90%', once: true },
        }
      );
    }, sectionRef);

    return () => media.revert();
  }, []);

  return (
    <section
      id="why-choose-diemex"
      ref={sectionRef}
      aria-labelledby="why-choose-diemex-heading"
      className="relative scroll-mt-28 overflow-hidden bg-[#F4F7FB] py-16 font-parabolica sm:py-20 lg:scroll-mt-44 lg:py-24"
    >
      <SectionContainer>
        <div ref={headerRef} className="mb-10 lg:mb-12">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#526174] sm:text-sm">
            <span aria-hidden="true" className="h-0.5 w-9 bg-[#E0161D]" />
            For exhibitors
          </p>
          <h2
            id="why-choose-diemex-heading"
            className="whitespace-nowrap text-[clamp(1.5rem,5.5vw,3.5rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-[#132D49]"
          >
            Why choose{' '}
            <span className="text-[#004A96]">DIEMEX 2027</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <article
                key={reason.number}
                className="group flex h-full flex-col rounded-3xl border border-[#004A96]/10 bg-white p-6 shadow-[0_4px_24px_rgba(19,45,73,0.03)] transition-[border-color,box-shadow,translate] duration-300 hover:border-[#004A96]/25 hover:shadow-[0_16px_40px_rgba(19,45,73,0.08)] motion-safe:hover:-translate-y-1 motion-reduce:transition-none sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#004A96]/10 bg-[#EDF4FB] text-[#004A96] transition-colors group-hover:border-[#004A96] group-hover:bg-[#004A96] group-hover:text-white motion-reduce:transition-none">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <span aria-hidden="true" className="text-sm font-semibold tabular-nums tracking-[0.12em] text-[#8594A5]">
                    {reason.number}
                  </span>
                </div>
                <h3 className="mb-4 mt-6 text-xl font-semibold leading-snug tracking-[-0.02em] text-[#132D49] sm:min-h-14 xl:min-h-16 xl:text-2xl">
                  {reason.title}
                </h3>
                <p className="text-base leading-[1.8] text-[#526174]">
                  {reason.description}
                </p>
              </article>
            );
          })}

          <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#004A96] bg-[#004A96] p-6 text-white shadow-[0_12px_32px_rgba(0,74,150,0.15)] sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
            <div className="relative flex items-center justify-between gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <ArrowUpRight aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <span className="text-right text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                Your next step
              </span>
            </div>
            <h3 className="relative mb-4 mt-6 text-2xl font-semibold leading-snug tracking-[-0.02em] sm:min-h-14 xl:min-h-16 xl:text-3xl">
              Be part of<br />DIEMEX 2027.
            </h3>
            <p className="relative mb-7 text-base leading-[1.8] text-white/80">
              Bring your products, technologies and expertise to the exhibition.
            </p>
            <Link
              href="/register?t=exhibitor"
              className="group relative mt-auto inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-4 py-3.5 text-sm font-semibold text-[#004A96] transition-colors hover:bg-[#E8F1F8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
            >
              <span>Register as an Exhibitor</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
          </article>
        </div>
      </SectionContainer>
    </section>
  );
}
