"use client"

import { Metadata } from 'next';
import SectionContainer from '@/components/UI/SectionContainer';
import PartnersSection from '@/components/section/PartnersSection';
import Image from 'next/image';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: "Logistics & Transport Exhibition Trade Show | TransRussia",
//   description: "Join TransRussia 2026, the premier transport and logistics exhibition at Crocus Expo. Network with global industry leaders and explore cutting-edge solutions.",
//   openGraph: {
//     title: "Logistics & Transport Exhibition Trade Show | TransRussia",
//     description: "Join TransRussia 2026, the premier transport and logistics exhibition at Crocus Expo. Network with global industry leaders and explore cutting-edge solutions.",
//     images: ["https://cdn.itegroupnews.com/TRU_Sectors_Images_1_c2980dbd37.png"]
//   }
// };

export default function ExploreMoscowPage() {
  return (
    <main className="relative min-h-screen font-sans antialiased">
      {/* Hero Section */}
      <section className="relative z-10 flex flex-col justify-end bg-[#005EB8] pt-96">
        <SectionContainer className="pt-0 pb-10 text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            Explore Moscow
          </h1>
          <p className="mt-5 max-w-6xl whitespace-pre-line text-lg">
            A City of Timeless Wonders
          </p>
        </SectionContainer>
        
        {/* Background Image with Gradient */}
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-t from-black" />
          <img
            src="/images/image.png"
            alt="Moscow river with Kremlin in the evening"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* A Unique Guide Section */}
      <section className="relative py-16 overflow-hidden">
        <SectionContainer>
          <div className="mb-14 flex flex-wrap justify-between gap-10 lg:items-end">
            <div className="lg:basis-2/3">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black my-3">
                A Unique Guide
              </h2>
              <p className="whitespace-pre-line text-gray-700 text-lg">
                Welcome to Moscow, a city where history and modernity intertwine to create an unforgettable experience. 
                As the heart of Russia, Moscow offers something for every traveler—whether you're here for MITT or exploring beyond. 
                This guide highlights must-visit attractions in the city center and beyond, including shopping, dining, museums, and theaters.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {/* Card 1: Discover Iconic Landmarks */}
            <div className="group flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 xl:p-7 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <div className="flex justify-between items-start">
                <div className="mb-5 w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="https://cdn.itegroupnews.com/nutshell_boats_explore_writing_near_travel_stuff_17e4a9e0e0.jpg"
                    alt="Travel exploration"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-3xl font-bold text-gray-300 group-hover:text-blue-500 transition-colors">01</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-semibold text-black group-hover:text-blue-600 transition-colors">
                Discover Iconic Landmarks
              </h3>
              
              <p className="mb-10 whitespace-pre-line text-gray-600 leading-relaxed">
                Moscow is home to some of the world's most famous landmarks. Start your journey at the Red Square, 
                a UNESCO World Heritage Site and the cultural epicenter of the city. Marvel at the colorful domes 
                of St. Basil's Cathedral, the imposing walls of the Kremlin, and the grandeur of the State Historical Museum. 
                Don't forget to witness the solemn beauty of the Lenin Mausoleum, a symbol of Soviet history.
              </p>
              
              <Link 
                href="/iconic-landmarks" 
                className="mt-auto w-full"
              >
                <button className="group/btn flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#005EB8] text-white hover:bg-[#004494] px-10 py-3 font-semibold text-base transition-all duration-300 w-full">
                  Explore More
                  <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </button>
              </Link>
            </div>

            {/* Card 2: Immerse Yourself in Culture */}
            <div className="group flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 xl:p-7 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <div className="flex justify-between items-start">
                <div className="mb-5 w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="/images/image.png"
                    alt="People walking in Red Square"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-3xl font-bold text-gray-300 group-hover:text-blue-500 transition-colors">02</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-semibold text-black group-hover:text-blue-600 transition-colors">
                Immerse Yourself in Culture
              </h3>
              
              <p className="mb-10 whitespace-pre-line text-gray-600 leading-relaxed">
                Dive into Moscow's rich cultural scene with a visit to the Bolshoi Theatre, where world-class ballet 
                and opera performances captivate audiences. Art lovers will find inspiration at the Tretyakov Gallery 
                and the Pushkin Museum of Fine Arts, showcasing masterpieces that span centuries.
              </p>
              
              <Link 
                href="/culture" 
                className="mt-auto w-full"
              >
                <button className="group/btn flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#005EB8] text-white hover:bg-[#004494] px-10 py-3 font-semibold text-base transition-all duration-300 w-full">
                  Explore More
                  <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </button>
              </Link>
            </div>

            {/* Card 3: Savor Moscow's Culinary Delights */}
            <div className="group flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 xl:p-7 transition-all duration-300 hover:shadow-xl hover:border-blue-200">
              <div className="flex justify-between items-start">
                <div className="mb-5 w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="/images/image.png"
                    alt="Russian soup"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-3xl font-bold text-gray-300 group-hover:text-blue-500 transition-colors">03</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-semibold text-black group-hover:text-blue-600 transition-colors">
                Savor Moscow's Culinary Delights
              </h3>
              
              <p className="mb-10 whitespace-pre-line text-gray-600 leading-relaxed">
                From traditional Russian dishes to international flavors, Moscow's dining scene is as diverse as its culture. 
                Indulge in borscht, pelmeni, and blini at a cozy café, or enjoy contemporary cuisine at one of the city's 
                Michelin-starred restaurants.
              </p>
              
              <Link 
                href="/places-to-eat" 
                className="mt-auto w-full"
              >
                <button className="group/btn flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#005EB8] text-white hover:bg-[#004494] px-10 py-3 font-semibold text-base transition-all duration-300 w-full">
                  Explore More
                  <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </button>
              </Link>
            </div>

            {/* Card 4: Shop and Stroll */}
            <div className="group flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5 xl:p-7 transition-all duration-300 hover:shadow-xl hover:border-blue-200 md:col-span-2 xl:col-span-1">
              <div className="flex justify-between items-start">
                <div className="mb-5 w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="https://cdn.itegroupnews.com/two_girls_walking_with_shopping_city_streets_208e2abb3e.jpg"
                    alt="Shopping in Moscow"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-3xl font-bold text-gray-300 group-hover:text-blue-500 transition-colors">04</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-semibold text-black group-hover:text-blue-600 transition-colors">
                Shop and Stroll
              </h3>
              
              <p className="mb-10 whitespace-pre-line text-gray-600 leading-relaxed">
                For a blend of luxury and tradition, explore the historic GUM Department Store or the trendy boutiques 
                of the Patriarch Ponds area. Antique markets and souvenir shops offer a chance to take a piece of Moscow home with you.
              </p>
              
              <Link 
                href="/shop-and-stroll" 
                className="mt-auto w-full"
              >
                <button className="group/btn flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#005EB8] text-white hover:bg-[#004494] px-10 py-3 font-semibold text-base transition-all duration-300 w-full">
                  Explore More
                  <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Decorative Shape Image */}
          <img
            src="https://cdn.itegroupnews.com/imgs/shape.png"
            alt="Decorative shape"
            width={900}
            height={900}
            className="absolute right-0 top-0 -z-10 hidden xl:block"
          />
        </SectionContainer>
      </section>

      {/* Getting Around Section */}
      <section className="relative z-10 mx-auto overflow-hidden bg-[#0A2B57] text-white">
        <SectionContainer>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex h-fit flex-col gap-5 lg:col-span-7 lg:border-l lg:border-white/20 lg:pl-10 xl:pl-12 2xl:pl-14">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                Getting Around
              </h2>
              
              <p className="whitespace-pre-line text-white/90 text-lg leading-relaxed">
                Moscow's efficient metro system is a marvel in itself, with stations that are often called "underground palaces." 
                Easy to navigate and beautifully designed, it's the best way to experience the city like a local.
              </p>
              
              <Link 
                href="/travel-guide" 
                className="mt-10"
              >
                <button className="group/btn flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#005EB8] text-white hover:bg-[#004494] px-10 py-3 font-semibold text-base transition-all duration-300">
                  Explore More
                  <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </button>
              </Link>
            </div>
            
            <div className="grid min-h-[300px] place-content-center lg:col-span-5">
              <img
                src="https://cdn.itegroupnews.com/Securika_600_x_650_68bb4c89e8.png"
                alt="Transportation illustration"
                width={500}
                height={500}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Contact/Visa Section */}
      <section className="py-16">
        <SectionContainer>
          <div className="rounded-xl bg-[#F0F4F8] p-5">
            <div className="prose max-w-none text-black">
              <p>
                For detailed information, visit the website{' '}
                <a 
                  href="https://visa-russian.ru/for-exhibition-participants.php" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visa-Russian.ru
                </a>
                , leave a request or contact in any convenient way:
              </p>
              
              <p>
                <a 
                  href="https://api.whatsapp.com/send?phone=79035460935" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                {' '}- +7 (495) 935-83-85
              </p>
              
              <p>
                <a 
                  href="mailto:visa@visa-russian.ru" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  visa@visa-russian.ru
                </a>
              </p>
              
              <p>
                <a 
                  href="https://visa-russian.ru/call.php" 
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Feedback form
                </a>
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Partners & Sponsors Section */}
      <PartnersSection />
    </main>
  );
}