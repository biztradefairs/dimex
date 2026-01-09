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
      title: 'Connect with over 30,000 industry professionals',
      description:
        'Access a highly targeted audience of transport and logistics professionals, including decision-makers actively seeking new solutions and partnerships.',
      icon: '👥',
    },
    {
      number: '02',
      title: 'Expand your market presence at TransRussia',
      description:
        'Gain a market share the 12 countries part of the CIS region by showcasing your brand to a selected and highly engaged audience.',
      icon: '🌍',
    },
    {
      number: '03',
      title: 'Meet decision-makers and build instantly trust',
      description:
        'Showcase your innovative solutions and establish your brand as a market leader in this rapidly growing sector.',
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
            className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white 
                       leading-[0.85] tracking-tight opacity-0"
          >
            Why choose{" "}
            <span className="text-[#82c6eb]">TransRussia 2026</span>
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
                    <h3 className="text-3xl lg:text-4xl font-bold text-[#0092D7]">
                      {reason.number}
                    </h3>
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">
                    {reason.title}
                  </h4>
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
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