// App.tsx or AboutITEPage.tsx
import React from 'react';

const AboutITEPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative z-[1] flex flex-col justify-end bg-gray-100 pt-48">
        <div className="container mx-auto flex flex-col justify-end px-4 md:px-6 lg:px-8 pt-0 pb-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4">
            About ITE Group
          </h1>
          <p className="max-w-6xl text-lg md:text-xl text-gray-700 py-5">
            Organising Eurasia's largest industry exhibitions since 1991
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 z-[-1] h-full w-full object-cover">
          <img 
            src="https://cdn.itegroupnews.com/Untitled_1200_x_800_px_bd0f80bf98.jpg" 
            alt="ITE Group background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="ml-auto flex max-w-6xl flex-col gap-5 rounded-3xl bg-white p-6 md:p-8 lg:p-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4">
              About Us
            </h2>
            <div className="whitespace-pre-line text-gray-700 text-base md:text-lg leading-relaxed">
              {`ITE Group is a business events organiser that has been operating in the Eurasian market since 1991. Every year, we host more than 30 of the largest industry events, including exhibitions, summits, and conferences. Powered by the Connect digital platform, the ITE ecosystem offers unique hybrid solutions for industry communities in Eurasia, the CIS countries, and beyond.

With over 100 agents and hundreds of associations and partners spanning 150 countries and 5 continents, our global network seamlessly connects clients to opportunities around the world.

ITE events contribute to business success and development, unlock the export potential of countries and regions, provide access to a broad target audience, and offer effective, innovative solutions for networking, growth, and professional development. They ensure dialogue between the business community and government.

ITE offices are located in Moscow, Dubai, Beijing, and New Delhi.`}
            </div>
            
            <a 
              href="https://ite.group/en/calendar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-fit mt-6"
            >
              <button className="group flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 md:px-10 py-3 text-white font-semibold text-base md:text-lg hover:bg-blue-700 transition-all duration-300 w-fit">
                Explore Our Event Calendar
              </button>
            </a>

            {/* Stats Grid */}
            <div className="mt-8 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {[
                { value: "2 Mil+", label: "Database" },
                { value: "500,000+", label: "Visitors Per Year" },
                { value: "10,000+", label: "Exhibitors Per Year" },
                { value: "1,700+", label: "Media in Attendance" },
                { value: "30", label: "Events" },
                { value: "20+", label: "Industry Sectors" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </h3>
                  <h4 className="text-gray-600 text-sm md:text-base">
                    {stat.label}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 lg:mb-16">
            <div className="lg:flex lg:justify-between lg:items-end">
              <div className="lg:basis-2/3">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4">
                  Working for Your Success
                </h2>
                <p className="whitespace-pre-line text-gray-700 text-base md:text-lg leading-relaxed">
                  At ITE Group, our goal is to empower businesses by creating impactful events that drive industry growth and foster valuable connections. We are dedicated to supporting our clients' success and facilitating meaningful opportunities for professionals worldwide.
                </p>
              </div>
              {/* Navigation buttons would go here */}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Our Mission",
                description: "To create unique and valuable events for the success of your business and the development of industries and economies.",
                image: "https://cdn.itegroupnews.com/Trans_Russia_670_x_500_6_0c18132e2e.webp"
              },
              {
                title: "Our Vision",
                description: "Connecting businesses year-round, both online and in person, allowing professionals to establish long-term business partnerships.",
                image: "https://cdn.itegroupnews.com/Trans_Russia_670_x_500_4_86ec0c31db.webp"
              },
              {
                title: "Our Values",
                description: "Entrepreneurship, Integrity, Excellence, Positive Thinking, Commitment to Result",
                image: "https://cdn.itegroupnews.com/businessman_placing_five_simple_blank_wooden_cut_circles_blue_wooden_background_06cc2692ad.jpg"
              }
            ].map((card, index) => (
              <div key={index} className="flex flex-col overflow-hidden rounded-lg bg-gray-900 text-white">
                <div className="flex flex-col gap-5 p-5">
                  <h2 className="text-2xl md:text-3xl font-semibold line-clamp-1">
                    {card.title}
                  </h2>
                  <div className="h-36">
                    <p className="line-clamp-6 whitespace-pre-line text-gray-200">
                      {card.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="relative h-64 lg:h-96">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exhibitions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex w-full items-end justify-between gap-5 flex-wrap lg:gap-20 mb-10">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
                Our Exhibitions at a Glance
              </h2>
              <div className="mt-10 flex flex-col justify-between lg:flex-row lg:items-end gap-10 lg:gap-32">
                <div className="text-gray-700 text-base md:text-lg leading-relaxed">
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
              <button className="flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 md:px-10 py-3 text-white font-semibold text-base md:text-lg hover:bg-blue-700 transition-all duration-300">
                Find Out More About Us
              </button>
            </a>
          </div>

          {/* Exhibitions Grid */}
          <div className="mt-10">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {/* Example exhibition card - you can map through your data */}
              <div className="group flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 xl:p-7 hover:shadow-lg transition-shadow">
                <div>
                  <img 
                    src="https://cdn.itegroupnews.com/comtrans_92db3bfebf.webp" 
                    alt="Comtrans Exhibition"
                    className="h-32 w-auto object-contain mx-auto"
                  />
                </div>
                <p className="text-gray-700 flex-grow">
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

              {/* Add more exhibition cards here following the same pattern */}
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Sponsors Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mt-5 text-center">
              Partners & Sponsors
            </h2>
          </div>

          {/* Partners Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* Example partner logo */}
            <a 
              href="/partner/apace-digital-cargo/" 
              className="flex w-full flex-col items-center gap-5 text-center"
            >
              <div className="h-40 w-full overflow-hidden rounded-lg bg-white px-10 py-5 shadow-lg flex items-center justify-center">
                <img 
                  src="https://cdn.itegroupnews.com/APACE_Digital_Cargo_523bc2c2a2.webp" 
                  alt="Apace Digital Cargo"
                  className="w-full h-full object-contain"
                />
              </div>
              <small className="text-sm font-medium text-gray-700">
                Apace Digital Cargo
              </small>
            </a>

            {/* Add more partner logos here */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutITEPage;