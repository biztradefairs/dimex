import React from 'react';
import Image from 'next/image';
import SectionContainer from '@/components/UI/SectionContainer';

const ConferenceSection = () => {
  const stats = [
    "200+ Delegates",
    "20+ Speakers",
    "10 Sessions",
    "2 Days",
  ];

  return (
    <SectionContainer className="py-16 lg:py-24">
      <div className="grid min-h-[600px] overflow-hidden rounded-2xl lg:grid-cols-2 shadow-xl">
        
        {/* Left Content */}
        <div className="relative bg-[#0E1C35] p-8 lg:p-12 flex flex-col justify-center">
          <div className="space-y-6 lg:space-y-8">

            <div>
              <h2 className="text-4xl lg:text-5xl xl:text-4xl font-bold text-white mb-4 lg:mb-6">
                Conference Programme
              </h2>

              <p className="text-white/90 text-lg lg:text-xl leading-relaxed">
                Each year, DIEMEX presents a comprehensive two-day conference programme
                featuring technical forums, expert panels, practical workshops, plenary
                sessions, and knowledge-led discussions—delivering the latest insights,
                innovations, and market trends shaping the die & mould, tooling, and
                precision manufacturing industry.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-400 mt-1 shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="text-white text-lg lg:text-xl font-semibold">
                    {stat}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="relative min-h-[400px] lg:min-h-full">
          <Image
            src="/images/image.png"
            alt="Conference attendees networking and participating in sessions"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent lg:hidden" />
        </div>

      </div>
    </SectionContainer>
  );
};

export default ConferenceSection;
