"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionContainer from '@/components/UI/SectionContainer';

const TravelSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/image.png"
          alt="diemex exhibition backgrouund"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Enhanced overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content with SectionContainer */}
      <SectionContainer>
        <div className="relative">
          <div className="flex flex-col items-center text-center space-y-8 lg:space-y-10 py-16 lg:py-24">
            {/* Heading with better visibility */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-lg">
              DIEMEX Awaits
            </h2>
            
            {/* Description with improved contrast */}
            <div className="relative">
              <div className="absolute inset-0 bg-black/30 blur-sm rounded-lg"></div>
              <p className="relative text-white text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4 py-2">
                Whether you’re traveling from across India or overseas, we’ve got you covered. Find all the essential information to ensure a smooth, convenient, and hassle-free visit to DIEMEX 2026 at the Auto Cluster Exhibition Centre, Pune.
              </p>
            </div>

            {/* Fixed Link component */}
            <Link 
              href="/plan-your-travel" 
              className="inline-flex"
              onClick={(e) => {
                // Optional: Add any additional click handling here
                console.log('Navigating to travel planning page');
              }}
            >
              <button className="inline-flex items-center justify-center bg-[#004D9F] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 shadow-lg">
                Plan Your Travel
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-3" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default TravelSection;