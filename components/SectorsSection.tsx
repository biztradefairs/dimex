// components/SectorsSection.tsx - WITH HOVER DESCRIPTION
'use client';

import SectionContainer from './UI/SectionContainer';
import { useState } from 'react';
import Link from 'next/link';

export default function SectorsSection() {
  const sectors = [
    { 
      title: 'Precision Die & Mould Solutions',

      slug: 'precision-moulds', 
      image: '/images/image.png',
      description: 'Comprehensive die & mould manufacturing, tooling systems, design engineering, and end-to-end production solutions supporting high-precision industrial applications.'
    },
    { 
      title: 'Tooling, Mould Bases & Standard Components',

      slug: 'tooling-mould-base', 
      image: '/images/image.png',
      description: 'High-quality mould bases, precision components, hot runner systems, and standard tooling elements supporting efficient and reliable die & mould production.'
    },
    { 
      title: 'Machining & Finishing Technologies',

      slug: 'machining-finishing', 
      image: '/images/image.png',
      description: 'High-precision CNC machining, EDM, wire-cut, surface finishing, and polishing solutions for toolroom operations.'
    },
    { 
      title: 'Automation & Industry 4.0 Solutions',

      slug: 'automation-industry', 
      image: '/images/image.png',
      description: 'Smart automation, robotics, digital manufacturing, and smart factory technologies for modern die & mould production.'
    },
    { 
      title: 'Design, CAD/CAM & Engineering Software', 
      slug: 'cad-cam', 
      image: '/images/image.png',
      description: 'Advanced design, simulation, and manufacturing software enabling accurate tooling development and reduced time-to-market.'
    },
    { 
      title: 'Tool Steel & Advanced Materials', 
      slug: 'tool-steel', 
      image: '/images/image.png',
      description: 'High-performance tool steels, alloy steels, special metals, and advanced materials engineered for durability, precision, and long tool life in die & mould applications.'
    },
  ];

  return (
    <section className="bg-white py-32">
      <SectionContainer>
        {/* ================= HEADER ================= */}
        <div className="mb-12 lg:mb-15 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* LABEL */}
            <div className="mb-5 flex items-center gap-3">
              <img
                src="/images/logo-icon-3.png"
                alt="Sectors"
                className="h-6 w-6"
              />
              <span className="text-sm font-medium text-gray-700">
                Sectors
              </span>
            </div>

            {/* TITLE */}
            <h2 className="
              text-4xl 
              lg:text-5xl 
              xl:text-6xl
              font-[600] 
              leading-[0.95]
              tracking-tight
            ">
              Discover In-Demand Product Sectors at DIEMEX
            </h2>
          </div>

          {/* RIGHT BUTTON */}
          <div className="mt-6 lg:mt-0">
            <Link href="/sectors">
              <button className="
                rounded-full 
                bg-[#005EB8] 
                px-8 lg:px-10 
                py-3 lg:py-4 
                text-white 
                font-semibold 
                transition 
                hover:bg-[#0074D9]
              ">
                Explore Sectors
              </button>
            </Link>
          </div>
        </div>

        {/* ================= CARDS WITH HOVER EFFECTS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <SectorCard key={i} sector={sector} index={i} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

// Separate client component for sector card with hover effects
function SectorCard({ sector, index }: { sector: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/sectors/${sector.slug}`}
      className="group relative h-[400px] lg:h-[460px] overflow-hidden block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE WITH ZOOM EFFECT */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${sector.image})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* GRADIENT OVERLAY - CHANGES ON HOVER */}
      <div className="absolute inset-0 transition-all duration-500"
        style={{
          background: isHovered 
            ? 'linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5))'
            : 'linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.4))'
        }}
      />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 transition-all duration-500"
        style={{
          transform: isHovered ? 'translateY(0)' : 'translateY(0)',
          paddingBottom: isHovered ? '5rem' : '1.5rem',
        }}
      >
        {/* TITLE */}
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 transition-all duration-300"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(0)'
          }}>
          {sector.title}
        </h3>

        {/* DESCRIPTION - SLIDES UP ON HOVER */}
        <div className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: isHovered ? '100px' : '0',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <p className="text-white/80 text-base lg:text-lg leading-relaxed pt-2">
            {sector.description}
          </p>
          
          {/* EXPLORE BUTTON - APPEARS ON HOVER */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-blue-300 font-medium">Explore Sector</span>
            <svg 
              className="w-5 h-5 text-blue-300 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* HOVER INDICATOR LINE */}
      <div className="absolute bottom-0 left-6 lg:left-8 h-1 bg-blue-500 transition-all duration-300"
        style={{
          width: isHovered ? '80px' : '40px',
          opacity: isHovered ? 1 : 0.7,
        }}
      />
    </Link>
  );
}