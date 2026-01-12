// app/about-ite/page.tsx
import React from 'react';
import SectionContainer from "@/components/UI/SectionContainer"

const AboutITEPage: React.FC = () => {
  return (
    <>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative flex flex-col justify-end bg-gray-100 ">
          <SectionContainer>
            <div className="flex flex-col justify-end pt-0 pb-10 mt-40">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4">
                About ITE Group
              </h1>
              <p className="max-w-6xl text-lg lg:text-xl text-gray-700 py-5">
                Organising Eurasia's largest industry exhibitions since 1991
              </p>
            </div>
          </SectionContainer>
        </section>

{/* About Us Section */}
<section className="relative min-h-screen flex items-center py-16 lg:py-24">
  
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <div
      className="h-full w-full bg-cover bg-center grayscale"
      style={{ backgroundImage: "url(/images/image.png)" }}
    />
  </div>

  <SectionContainer>
    <div className="relative z-10 ml-auto w-full max-w-5xl rounded-3xl bg-white px-10 py-12 lg:px-14 lg:py-14 shadow-2xl">
      
      {/* Heading */}
      <h2 className="mb-6 text-5xl lg:text-6xl font-bold text-black">
        About Us
      </h2>

      {/* Description */}
      <div className="space-y-6 text-gray-700 text-base lg:text-lg leading-relaxed">
        <p>
          ITE Group is a business events organiser that has been operating in the
          Eurasian market since 1991. Every year, we host more than 30 of the
          largest industry events, including exhibitions, summits, and
          conferences. Powered by the Connect digital platform, the ITE ecosystem
          offers unique hybrid solutions for industry communities in Eurasia, the
          CIS countries, and beyond.
        </p>

        <p>
          With over 100 agents and hundreds of associations and partners spanning
          150 countries and 5 continents, our global network seamlessly connects
          clients to opportunities around the world.
        </p>

        <p>
          ITE events contribute to business success and development, unlock the
          export potential of countries and regions, provide access to a broad
          target audience, and offer effective, innovative solutions for
          networking, growth, and professional development. They ensure dialogue
          between the business community and government.
        </p>

        <p>
          ITE offices are located in Moscow, Dubai, Beijing, and New Delhi.
        </p>
      </div>

      {/* Button */}
      <a
        href="https://ite.group/en/calendar/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-8"
      >
        <button className="rounded-full bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition">
          Explore Our Event Calendar
        </button>
      </a>

{/* Stats Section – HARD FIX */}
<div className="mt-12 flex gap-x-32">

  {/* LEFT COLUMN */}
  <div className="flex w-1/2 flex-col gap-10">
    <div>
      <h3 className="text-4xl font-bold text-black">2 Mil+</h3>
      <p className="text-gray-600">Database</p>
    </div>

    <div>
      <h3 className="text-4xl font-bold text-black">500,000+</h3>
      <p className="text-gray-600">Visitors Per Year</p>
    </div>

    <div>
      <h3 className="text-4xl font-bold text-black">10,000+</h3>
      <p className="text-gray-600">Exhibitors Per Year</p>
    </div>
  </div>

  {/* RIGHT COLUMN */}
  <div className="flex w-1/2 flex-col gap-10">
    <div>
      <h3 className="text-4xl font-bold text-black">1,700+</h3>
      <p className="text-gray-600">Media in Attendance</p>
    </div>

    <div>
      <h3 className="text-4xl font-bold text-black">30</h3>
      <p className="text-gray-600">Events</p>
    </div>

    <div>
      <h3 className="text-4xl font-bold text-black">20+</h3>
      <p className="text-gray-600">Industry Sectors</p>
    </div>
  </div>

</div>





    </div>
  </SectionContainer>
</section>


        {/* Mission, Vision, Values Carousel */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="mb-10 lg:mb-16">
              <div className="lg:flex lg:justify-between lg:items-end">
                <div className="lg:basis-2/3">
                  <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4">
                    Working for Your Success
                  </h2>
                  <p className="whitespace-pre-line text-gray-700 text-base lg:text-lg leading-relaxed">
                    At ITE Group, our goal is to empower businesses by creating impactful events that drive industry growth and foster valuable connections. We are dedicated to supporting our clients' success and facilitating meaningful opportunities for professionals worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Our Mission",
                  description: "To create unique and valuable events for the success of your business and the development of industries and economies.",
                  image: "/images/image.png"
                },
                {
                  title: "Our Vision",
                  description: "Connecting businesses year-round, both online and in person, allowing professionals to establish long-term business partnerships.",
                  image: "/images/image.png"
                },
                {
                  title: "Our Values",
                  description: "Entrepreneurship, Integrity, Excellence, Positive Thinking, Commitment to Result",
                  image: "/images/image.png"
                }
              ].map((card, index) => (
                <div key={index} className="flex flex-col overflow-hidden rounded-lg bg-gray-900 text-white">
                  <div className="flex flex-col gap-5 p-6">
                    <h2 className="text-2xl lg:text-3xl font-semibold line-clamp-1">
                      {card.title}
                    </h2>
                    <div className="h-36">
                      <p className="line-clamp-6 whitespace-pre-line text-gray-200 text-base lg:text-lg">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative h-64 lg:h-96">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${card.image})` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* Exhibitions Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <SectionContainer>
            <div className="flex w-full items-end justify-between gap-5 flex-wrap lg:gap-20 mb-10">
              <div>
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-6">
                  Our Exhibitions at a Glance
                </h2>
                <div className="mt-10 flex flex-col justify-between lg:flex-row lg:items-end gap-10 lg:gap-32">
                  <div className="text-gray-700 text-base lg:text-lg leading-relaxed">
                    <p className="mb-4">Each year, we organize and host over 30 leading industry events across key sectors, including exhibitions, summits, and conferences.</p>
                    <p>Supported by the Connect digital platform, the ITE ecosystem offers innovative hybrid solutions for industry communities in Russia, the CIS, and beyond.</p>
                  </div>
                </div>
              </div>
              <a 
                href="https://ite.group/en/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <button className="flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 lg:px-10 py-3 lg:py-4 text-white font-semibold text-base lg:text-lg hover:bg-blue-700 transition-all duration-300">
                  Find Out More About Us
                </button>
              </a>
            </div>

            {/* Exhibitions Grid */}
            <div className="mt-10">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {/* Example exhibition card */}
                <div className="group flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 xl:p-7 hover:shadow-lg transition-shadow">
                  <div>
                    <div 
                      className="h-32 w-auto bg-contain bg-center bg-no-repeat mx-auto"
                      style={{ backgroundImage: "url(/images/image.png)" }}
                    />
                  </div>
                  <p className="text-gray-700 flex-grow text-base lg:text-lg">
                    The international exhibition of commercial vehicles.
                  </p>
                  <div className="text-sm text-gray-600">
                    <p><span className="font-bold">Start Date:</span> Dec 9th, 2025</p>
                    <p><span className="font-bold">End Date:</span> Dec 12th, 2025</p>
                    <p><span className="font-bold">Venue:</span> Crocus Expo, Moscow</p>
                  </div>
                  <a 
                    href="https://www.comtransexpo.ru/en/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto block"
                  >
                    <button className="flex items-center gap-2 text-blue-600 font-semibold text-base hover:text-blue-700 transition-colors p-0">
                      Visit Website
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                      </svg>
                    </button>
                  </a>
                </div>

                {/* Add more exhibition cards here */}
              </div>
            </div>
          </SectionContainer>
        </section>
      </div>
    </>
  );
};

export default AboutITEPage;