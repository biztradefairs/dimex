// components/ImpactSection.tsx - FIXED
'use client';

import { useState } from 'react';
import SectionContainer from './UI/SectionContainer'

export default function ImpactSection() {
  const impacts = [
    {
      title: 'Find the Right Platform to Accelerate Your Business Growth',

      content:
        'DIEMEX offers a powerful opportunity for visitors to discover new die & mould suppliers, tooling partners, and advanced manufacturing solutions—all under one roof.',
      image: '/images/image.png',
      stat: {
        value: '76%',
        label: 'of visitors attend DIEMEX to identify new suppliers and sourcing partners',
      },
    },
    {
      title: 'Expand your business with the right partners',
      content:
        'Visitors to DIEMEX gain actionable insights, qualified leads, and direct connections with trusted die & mould manufacturers, tooling specialists, and precision engineering solution providers.',
      image: '/images/image.png',
      stat: {
        value: '72%',
        label: 'of visitors plan to purchase products or services after visiting DIEMEX',
      },
    },
    {
      title: 'Build long-term business connections',
      content:
        'Meet decision-makers and industry leaders to create long-term partnerships.',
      image: '/images/image.png',
      stat: {
        value: '68%',
        label: 'Of visitors establish new business connections',
      },
    },
    {
      title: 'Showcase innovation to the right audience',
      content:
        'Present your latest solutions to a highly targeted professional audience.',
      image: '/images/image.png',
      stat: {
        value: '81%',
        label: 'Of exhibitors achieve key business goals',
      },
    },
  ];

  const ITEMS_PER_VIEW = 2;
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex + ITEMS_PER_VIEW < impacts.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_VIEW);
    }
  };

  const prev = () => {
    if (currentIndex - ITEMS_PER_VIEW >= 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_VIEW);
    }
  };

  return (
    <section className="py-32 bg-white">
      <SectionContainer>
        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between mb-16">
          <div className="max-w-3xl">
            <div className="mb-6 flex w-fit items-center gap-3">
              <img src="/images/logo-icon-3.png" alt="Numbers" className="w-6" />
              <span className="text-sm font-medium text-gray-700">Numbers</span>
            </div>

            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-semibold mb-6">
              DIEMEX Impact
            </h2>

            <p className="text-lg text-gray-700">
              Discover the scale, influence, and industry reach of DIEMEX. From leading die & mould manufacturers 
              and technology providers to thousands of qualified industry visitors, explore the key numbers that 
              define the success of India’s premier die & mould and tooling exhibition.
            </p>
          </div>

          {/* ARROWS */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#9BB6D9] text-white disabled:opacity-40 hover:bg-[#003366] transition-colors"
            >
              ←
            </button>
            <button
              onClick={next}
              disabled={currentIndex + ITEMS_PER_VIEW >= impacts.length}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#003366] text-white disabled:opacity-40 hover:bg-[#00264d] transition-colors"
            >
              →
            </button>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="grid md:grid-cols-2 gap-8">
          {impacts
            .slice(currentIndex, currentIndex + ITEMS_PER_VIEW)
            .map((impact, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl bg-[#0b1f3f] text-white"
              >
                <div className="p-8 lg:p-10">
                  <h3 className="mb-5 text-2xl lg:text-3xl font-bold leading-tight">
                    {impact.title}
                  </h3>
                  <p className="text-lg leading-relaxed opacity-90">
                    {impact.content}
                  </p>
                </div>

                <div
                  className="h-[280px] lg:h-[320px] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${impact.image})` }}
                />

                <div className="bg-[#0b1f3f] p-6 lg:p-8">
                  <h4 className="mb-2 text-4xl lg:text-5xl font-bold">
                    {impact.stat.value}
                  </h4>
                  <p className="text-base lg:text-lg opacity-90">
                    {impact.stat.label}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </SectionContainer>
    </section>
  );
}