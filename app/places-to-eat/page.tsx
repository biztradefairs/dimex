"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'


export default function PlacesToEatPage() {
  return (
    <div className="page-spacing-wrapper font-parabolica">
      {/* Hero Section */}
{/* Hero Section */}
<div className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end">
  
  {/* Background Image */}
  <Image
    src="/images/culinary.jpg"
    alt="Moscow's Culinary Delights"
    fill
    priority
    className="object-cover z-0"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

  {/* Content */}
  <div className="relative z-20 container pb-10 text-white">
    <h2 className="title-72 text-white drop-shadow-lg">
      Pune&apos;s Culinary Delights
    </h2>
    <p className="max-w-6xl py-5 text-white/90 drop-shadow">
      Pune’s culinary scene is a treat for food lovers, offering a blend of traditional Maharashtrian flavors and global cuisines. Enjoy local favorites like misal pav, vada pav, and puran poli, along with a wide variety of modern cafés and international dining options
    </p>
  </div>

</div>


      {/* Top 2 Restaurants in Pune */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container">
            <h2 className="title-72 text-black mb-10">Top 2 Restaurants</h2>
            <div className="grid size-full grid-cols-1 gap-5 md:grid-cols-2">
              {/* Tao-fu */}
              <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 before:content-[''] text-white before:absolute before:inset-0 before:z-[1] before:from-black before:bg-gradient-to-b hover:before:opacity-90 transition-all duration-300 group">
                <Image
                  src="/images/toofu.jpg"
                  alt="Tao-fu"
                  fill
                  className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="flex flex-col z-[1] gap-5">
                  <h2 className="title-40 font-semibold text-white group-hover:text-mainColor2 transition-colors duration-300">Tao-fu</h2>
                  <div className="flex w-full flex-wrap gap-5"></div>
                </div>
              </div>

              {/* Evviva Sky Lounge */}
              <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 before:content-[''] text-white before:absolute before:inset-0 before:z-[1] before:from-black before:bg-gradient-to-b hover:before:opacity-90 transition-all duration-300 group">
                <Image
                  src="/images/eviva.jpg"
                  alt="Evviva Sky Lounge"
                  fill
                  className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="flex flex-col z-[1] gap-5">
                  <h2 className="title-40 font-semibold text-white group-hover:text-mainColor2 transition-colors duration-300">Evviva Sky Lounge</h2>
                  <div className="flex w-full flex-wrap gap-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Casual Dining Must Visits Section */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container">
            <h2 className="title-72 text-black mb-10">Casual Dining Must Visits</h2>
            <div className="grid size-full grid-cols-1 gap-5">
              <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col z-[1] gap-5">
                  <div className="rte-style [&_h1]:lg:text-4xl [&_h2]:lg:text-3xl [&_h3]:lg:text-2xl [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_blockquote]:relative [&_blockquote]:italic [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:text-xl [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:p-5 [&_blockquote]:ml-5">
                    <ul className="space-y-4">
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Spice Kitchen

</strong> - All day, multi-cuisine restaurant, which includes buffets for breakfast, lunch, dinner and Sunday brunches as well as an all day à la carte menu to enhance your dining options.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Chingari</strong> - Adjacent to the outdoor swimming pool, Chingari is an idyllic place to explore the exotic flavours of North India while enjoying the cool breeze that sweeps over the rooftop every evening.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Koji</strong> - Koji, the Asian specialty restaurant, serves the best of Japanese, Chinese and Thai cuisine. Designed by Spin, the renowned Japanese interior design company, the stunning restaurant features a dramatic live kitchen, extensive sushi bar and an exclusive private dining area with dedicated teppan grill.

                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Wah Marathi</strong> - Through Wah! Marathi we intend to honor the cuisine that has its roots spread deep into the Great Maharashtrian heritage. The underscore of “WAH! MARATHI” remains the assortment of delicacies from all over Maharashtra presented in a vogue ambience with contemporary elements.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Cobbler & Crew</strong> - Pune's only bar on India's 30 Best Bars list! Cocktail bar with a global food program | Live music every Wednesday | Cocktail masterclasses

                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Feast</strong> - Enjoy bountiful breakfast buffets and an extensive à la carte menu at Feast, the trendy yet informal restaurant at our Pune, Maharashtra hotel.

                      </li>
                    </ul>
                  </div>
                  <div className="flex w-full flex-wrap gap-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Back to Top Button */}
      <div className="fixed bottom-3 right-3 lg:bottom-10 lg:right-2 z-50 transition-all duration-300">
        <button
          aria-label="Back to top"
          className="m-0 rounded-full border-none bg-white p-0 outline-none drop-shadow-lg hover:bg-mainColor1 hover:scale-110 transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="size-10 fill-mainColor1 text-mainColor1 hover:fill-white hover:text-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  )
}