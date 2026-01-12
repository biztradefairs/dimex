import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TravelSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/Trans_Russia_Previous_Exhibitors_1_68b0c1defd.png"
          alt="TransRussia exhibition background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex flex-col items-center text-center space-y-8 lg:space-y-10 py-16 lg:py-24">
          {/* Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
            TransRussia Awaits
          </h2>
          
          {/* Description */}
          <p className="text-white/90 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Whether you're traveling from across the globe or nearby, we've got you covered. Find all the essential information to ensure a smooth and flexible free trip to TransRussia 2026.
          </p>

          {/* Button */}
          <Link href="/plan-your-travel">
            <button className="inline-flex items-center justify-center bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0">
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
    </section>
  );
};

export default TravelSection;