import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BrochureSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div
          className="relative rounded-2xl overflow-hidden px-8 py-12 lg:px-16 lg:py-16 text-white"
          style={{
            backgroundImage: "url(/images/brochure-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-blue-900/80"></div>

          {/* Content */}
          <div className="relative flex flex-col gap-6">
            <div className="max-w-4xl">
              <h2 className="text-4xl lg:text-5xl font-bold mb-3">
                Download Your Event Brochure
              </h2>
              <p className="text-white/80 text-lg">
                Get a comprehensive look at the event's attendees, the sectors on display,
                and the key industry players present.
              </p>
            </div>

            <button className="bg-white text-blue-900 border border-white px-8 py-3 rounded-full font-medium hover:bg-gray-100 whitespace-nowrap w-fit">
              Download Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureSection;