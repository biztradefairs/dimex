'use client';

import React from 'react';
import SectionContainer from '@/components/UI/SectionContainer';
import Link from 'next/link'

const BrochureSection = () => {
  return (
    <SectionContainer className="py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#004A96] to-[#003875] px-6 py-10 lg:px-12 lg:py-14 text-white">
        
        {/* TOP-RIGHT BROCHURE IMAGE */}
        <img
          src="/images/Why-Exhibit/brochure.png"
          alt="Event Brochure"
          width={420}
          height={420}
          className="absolute -top-24 right-0 lg:-top-28 lg:right-6 w-[280px] lg:w-[420px] pointer-events-none select-none"
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            Download Your Event Brochure
          </h2>

          <p className="text-white/90 text-sm lg:text-base mb-6">
            Make sure you grab your copy of the event brochure to learn more about the show and explore your participation opportunities.
          </p>
          <Link href="/event-brochure">
            <button className="bg-white text-[#004A96] font-medium px-6 py-2.5 rounded-full hover:bg-[#E0161D] hover:text-white transition">
            Download Now
          </button>
          </Link>
        
        </div>

        {/* DECORATIVE CIRCLES */}
     

      </div>
    </SectionContainer>
  );
};

export default BrochureSection;
