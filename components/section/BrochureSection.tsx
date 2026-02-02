'use client';

import React from 'react';
import SectionContainer from '@/components/UI/SectionContainer';
import Image from 'next/image';

const BrochureSection = () => {
  return (
    <SectionContainer>
      <div className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-4">
          
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071A33] to-[#0A2446] px-6 py-10 lg:px-12 lg:py-14 text-white">
            
            {/* TOP-RIGHT BROCHURE IMAGE */}
            <img
              src="https://cdn.itegroupnews.com/Brochure_Mockup_8_f53822fd4a.png"
              alt="Event Brochure"
              width={420}
              height={420}
              className="absolute -top-50 right-0 lg:-top-28 lg:right-6 w-[280px] lg:w-[420px] pointer-events-none select-none"
            />

            {/* CONTENT */}
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                Download Your Event Brochure
              </h2>

              <p className="text-white/90 text-sm lg:text-base mb-6">
                Make sure you grab your copy of the event brochure to learn more about the show and explore your participation opportunities.
              </p>

              <button className="bg-white text-blue-900 font-medium px-6 py-2.5 rounded-full hover:bg-gray-100 transition">
                Download Now
              </button>
            </div>

            {/* BOTTOM-RIGHT DECORATIVE CIRCLES */}
            <div className="absolute bottom-0 right-0">
              <div className="absolute bottom-[-40px] right-[-40px] w-44 h-44 rounded-full bg-[#0092D7]/20" />
              <div className="absolute bottom-6 right-6 w-32 h-32 rounded-full bg-[#0092D7]/30" />
            </div>

          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default BrochureSection;
