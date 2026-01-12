import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ConferenceSection = () => {
  const stats = [
    "2,800+ Delegates",
    "160+ Speakers",
    "6 Conferences",
    "3 Days"
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="grid min-h-[600px] overflow-hidden rounded-2xl lg:grid-cols-2 shadow-xl">
          {/* Left Content Section */}
          <div className="relative bg-gradient-to-br from-blue-900 to-blue-950 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6">
                  Conference Programme
                </h2>
                <p className="text-white/90 text-lg lg:text-xl leading-relaxed">
                  Each year, TransRussia Moscow presents a comprehensive three-day conference program filled with forums, analytical and practical sessions, plenary discussions, lectures, and more—delivering the latest insights and trends in the industry.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-blue-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </div>
                    <span className="text-white text-lg lg:text-xl font-semibold">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="pt-4 lg:pt-6">
                <Link href="/conference-details">
                  <button className="inline-flex items-center justify-center bg-white text-blue-900 font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0">
                    View Conference Details
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-2" 
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
          </div>

          {/* Right Image Section */}
          <div className="relative min-h-[400px] lg:min-h-auto">
            <Image
              src="/tr24_03_ae1805dc94.jpg"
              alt="Conference attendees networking and participating in sessions"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent lg:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceSection;