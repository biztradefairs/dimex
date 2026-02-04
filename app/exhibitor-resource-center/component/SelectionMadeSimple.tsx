'use client';

import { useState } from 'react';
import SectionContainer from '@/components/UI/SectionContainer';
import Image from 'next/image';
import Link from 'next/link';

const standOptions = [
  {
    title: 'Individual Construction',
    description: 'Choosing an individual project stand is highly recommended as it allows for an effective presentation of your company, highlights your high status, emphasizes your unique style, and attracts more clients.',
    image: 'https://cdn.itegroupnews.com/1_4_baf40205d9.jpg',
    link: '/exhibiting-enquiry',
  },
  {
    title: 'Standard Shell Scheme',
    description: 'Standard Shell Scheme is suitable for the construction of the exhibition area from 11 to 60 sq. m. The stand kit depends on the construction area. Standard Shell Scheme may be amended with standard decorative elements.',
    image: 'https://cdn.itegroupnews.com/Screenshot_2025_02_21_120405_38e02b53c3.png',
    link: '/exhibiting-enquiry',
  },
  {
    title: 'Premium Shell Scheme',
    description: 'Premium Shell Scheme is suitable for the construction of the exhibition area from 12 to 60 sq. m. You can choose the color of decorative elements, and order additional equipment and furniture. The height of structures from 3.5 m to 5 m will make the stands look more voluminous and spacious',
    image: 'https://cdn.itegroupnews.com/1_2_992df162af.jpg',
    link: '/exhibiting-enquiry',
  },
];

export default function SelectionMadeSimple() {
  const [activeTab, setActiveTab] = useState('Stand Options');

  return (
    <section className="py-16">
      <SectionContainer>
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-200">
            <div>
              <h2 className="title-72 text-black">Selection Made Simple</h2>
            </div>
            
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              <button
                type="button"
                className={`inline-flex rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'Stand Options'
                    ? 'bg-[#004D9F] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('Stand Options')}
              >
                Stand Options
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {standOptions.map((option, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 bg-white rounded-xl shadow-sm">
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative w-64 h-64">
                  <img
                    src={option.image}
                    alt={option.title}
                    
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-6">
                <h3 className="text-2xl font-semibold text-black mb-4">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </div>
              
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <Link href={option.link}>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#004D9F] p-4 text-white transition-all duration-300 hover:bg-mainColor4">
                    <svg
                      stroke="white"
                      fill="white"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="size-5"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}