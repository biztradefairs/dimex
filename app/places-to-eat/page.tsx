"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'


export default function PlacesToEatPage() {
  return (
    <div className="page-spacing-wrapper">
      {/* Hero Section */}
{/* Hero Section */}
<div className="relative flex flex-col justify-end min-h-[90vh]">
  
  {/* Background Image */}
  <Image
    src="/images/image.png"
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
      Moscow&apos;s Culinary Delights
    </h2>
    <p className="max-w-6xl py-5 text-white/90 drop-shadow">
      Moscow's culinary scene is a feast for the senses, offering a mix of traditional Russian flavors and international cuisines. Dive into hearty classics like borscht, pelmeni, and blini.
    </p>
  </div>

</div>


      {/* Top 2 Michelin Stars Section */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container">
            <h2 className="title-72 text-black mb-10">Top 2 Michelin Stars</h2>
            <div className="grid size-full grid-cols-1 gap-5 md:grid-cols-2">
              {/* White Rabbit */}
              <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 before:content-[''] text-white before:absolute before:inset-0 before:z-[1] before:from-black before:bg-gradient-to-b hover:before:opacity-90 transition-all duration-300 group">
                <Image
                  src="/images/image.png"
                  alt="White Rabbit"
                  fill
                  className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="flex flex-col z-[1] gap-5">
                  <h2 className="title-40 font-semibold text-white group-hover:text-mainColor2 transition-colors duration-300">White Rabbit</h2>
                  <div className="flex w-full flex-wrap gap-5"></div>
                </div>
              </div>

              {/* Twin Garden */}
              <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 before:content-[''] text-white before:absolute before:inset-0 before:z-[1] before:from-black before:bg-gradient-to-b hover:before:opacity-90 transition-all duration-300 group">
                <Image
                  src="/images/image.png"
                  alt="Twin Garden"
                  fill
                  className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="flex flex-col z-[1] gap-5">
                  <h2 className="title-40 font-semibold text-white group-hover:text-mainColor2 transition-colors duration-300">Twin Garden</h2>
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
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Cafe Pushkin</strong> - Savor traditional Russian cuisine in the elegant, old-Moscow ambiance of this famous Cafe Pushkin.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Restaurant Beluga</strong> - Experience modern Russian cuisine in a sophisticated setting at Restaurant Beluga.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Depot</strong> - Taste flavors from around the globe at the bustling culinary market Depot filled with diverse restaurants and cafes.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Restaurant Varenichnaya No. 1</strong> - Indulge in authentic Russian pelmeni and vareniki at the delightful eatery.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Danilovsky</strong> - Offers a mix of fresh produce, authentic Russian dishes, and international street food.
                        <br />&nbsp;
                      </li>
                      <li>
                        <strong className="text-mainColor1 hover:text-mainColor2 transition-colors duration-300">Depo Moscow</strong> - A bustling foodie hub with over 75 cuisines to explore.
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