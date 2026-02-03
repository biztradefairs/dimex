// components/WhyChooseSection.tsx - FIXED
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionContainer from './UI/SectionContainer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const reasons = [
    {
      number: '01',
      title: 'Meet serious buyers from the die & mould industry',

      description:
        'Gain access to a highly focused audience of toolmakers, OEMs, component manufacturers, design engineers, and senior decision-makers actively seeking advanced die & mould solutions, precision tooling, and manufacturing partnerships.',
      icon: '👥',
    },
    {
      number: '02',
      title: 'Expand Your Market Presence at DIEMEX 2026',

      description:
        'Strengthen your footprint in India’s rapidly growing manufacturing ecosystem by showcasing your brand to a highly targeted and decision-driven audience of die & mould manufacturers, OEMs, automotive and engineering companies, and industrial buyers from across India and overseas.',
      icon: '🌍',
    },
    {
      number: '03',
      title: 'Meet Key Decision-Makers and Build Instant Credibility',

      description:
        'Showcase your cutting-edge die & mould solutions and position your brand as a trusted leader in India’s precision manufacturing and tooling industry.',
      icon: '🤝',
    },
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
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.9, rotationX: -15 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1,
            delay: 0.2 * i,
            ease: 'back.out(1.2)',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  return (
    <section ref={sectionRef} className="bg-[#F4F4F4] overflow-hidden">
      {/* Blue Header Section - Full width background */}
      <div className="bg-[#0E1C35] py-24">
        <SectionContainer>
          <h2
            ref={titleRef}
            className="font-parabolica text-5xl lg:text-6xl xl:text-7xl font-bold text-white 
                       leading-[0.85] tracking-tight opacity-0"
          >
            Why choose{" "}
            <span className="text-[#82c6eb] font-parabolica">DIEMEX 2026</span>
          </h2>
        </SectionContainer>
      </div>

      {/* White Cards Section - Using the same container */}
      <div className="relative">
        <SectionContainer>
          {/* Cards container with negative margin to overlap */}
          <div className="relative -mt-16">
            <div className="grid lg:grid-cols-3 bg-white rounded-2xl shadow-xl overflow-hidden">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  ref={addToCardsRef}
                  className={`p-8 lg:p-10 ${
                    index < reasons.length - 1 ? 'border-r border-gray-100' : ''
                  } opacity-0`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl lg:text-4xl">{reason.icon}</span>
                    <h3 className="text-3xl lg:text-4xl font-bold text-[#004D9F]">
                      {reason.number}
                    </h3>
                  </div>
                  <h4 className="font-parabolica text-xl lg:text-2xl font-bold mb-4 text-gray-800">
                    {reason.title}
                  </h4>
                  <p className="text-base lg:text-lg text-[#4D4D4D] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}