// components/AboutSection.tsx - UPDATED with proper alignment only
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionContainer from './UI/SectionContainer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<HTMLParagraphElement[]>([]);
  const statsRefs = useRef<HTMLDivElement[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const stats = [
    { value: '10,000', label: 'Visitors' },
    { value: '200+', label: 'Exhibitors' },
    { value: '5+', label: 'Countries' },
    { value: '10', label: 'Event Sectors' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      textRefs.current.forEach((text, i) => {
        gsap.fromTo(
          text,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.1 * i,
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
            },
          }
        );
      });

      statsRefs.current.forEach((stat, i) => {
        const valueElement = stat.querySelector('h3');
        const targetValue = stats[i].value.replace(/,/g, '');

        gsap.fromTo(
          stat,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.1 * i,
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%',
            },
          }
        );

        if (valueElement && !targetValue.includes('+')) {
          gsap.fromTo(
            valueElement,
            { innerText: 0 },
            {
              innerText: parseInt(targetValue),
              duration: 2,
              delay: 0.5 + 0.1 * i,
              scrollTrigger: {
                trigger: stat,
                start: 'top 90%',
              },
              snap: { innerText: 1 },
            }
          );
        }
      });

      gsap.fromTo(
        buttonRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToTextRefs = (el: HTMLParagraphElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addToStatsRefs = (el: HTMLDivElement | null) => {
    if (el && !statsRefs.current.includes(el)) {
      statsRefs.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      {/* Wrap entire content in SectionContainer for proper alignment */}
      <SectionContainer>
        <div className="flex flex-col gap-6">
          <h2
            ref={titleRef}
            className="max-w-[1400px] font-parabolica text-5xl lg:text-6xl font-[500] leading-[0.9] tracking-tight text-black opacity-0"
          >
            India&apos;s Leading Die & Mould Manufacturing Exhibition
          </h2>

          <div className="max-w-[1500px] space-y-4">
            <p
              ref={addToTextRefs}
              className="font-parabolica text-lg md:text-xl leading-relaxed text-[#4D4D4D] opacity-0"
            >
              DIEMEX 2026 is India&apos;s premier international exhibition for die & mould manufacturing, tooling solutions, 
              precision engineering, and advanced manufacturing technologies. Scheduled from 8–10 October 2026 at the 
              Auto Cluster Exhibition Centre, Pune, India, the exhibition brings together industry leaders, OEMs, 
              toolmakers, and technology innovators from India and overseas.
            </p>

            <p
              ref={addToTextRefs}
              className="font-parabolica text-lg md:text-xl leading-relaxed text-[#4D4D4D] opacity-0"
            >
            Whether you are looking to connect with new buyers, strengthen existing business partnerships, 
            or discover next-generation die & mould technologies, DIEMEX 2026 is the definitive platform 
            where precision manufacturing meets opportunity.
            </p>
          </div>

          {/* BUTTON — BELOW TEXT */}
          <a href="/about-diemex" className="mt-4 w-fit">
            <button
              ref={buttonRef}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0092D7] to-[#33A8DF] px-10 py-4 text-[16px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#33A8DF]/30 opacity-0"
            >
              Learn More
              <svg
                className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </a>
        </div>
      </SectionContainer>

      {/* STATS SECTION - Also wrapped in SectionContainer */}
      <div className="mt-32 bg-[#F4F4F4] py-20">
        <SectionContainer>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={addToStatsRefs}
                className="flex flex-col items-center opacity-0"
              >
                <div className="border-b border-black/10 pb-5 text-center">
                  <h3 className="mb-2 text-5xl md:text-6xl font-parabolica font-bold leading-none text-[#0092D7]">
                    {stat.value}
                  </h3>
                  <p className="text-lg md:text-xl font-medium text-black/80">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}