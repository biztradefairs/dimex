// components/PartnersSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionContainer from './UI/SectionContainer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const partners = [
    { name: 'Apace Digital Cargo', logo: '/images/partner1.png', url: '#' },
    { name: 'Cargo Insights', logo: '/images/partner2.png', url: '#' },
    { name: 'International Coordinating Council for Trans-Eurasian Transportation', logo: '/images/partner3.png', url: '#' },
    { name: 'LOGIRUS', logo: '/images/partner4.png', url: '#' },
    { name: 'CargoTalk', logo: '/images/partner5.png', url: '#' },
    { name: 'Logistics 360 Magazine', logo: '/images/partner6.png', url: '#' },
    { name: 'BizToday', logo: '/images/partner7.png', url: '#' },
    { name: 'Logistics.ru', logo: '/images/partner8.png', url: '#' },
    { name: 'TravTalkME', logo: '/images/partner9.png', url: '#' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white/5" />

      {/* CONTENT */}
      <SectionContainer>
        {/* HEADER */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div
            ref={subtitleRef}
            className="mb-8 flex w-fit items-center gap-3 rounded-full bg-blue-50 px-4 py-2 opacity-0"
          >
            <span className="h-2 w-2 rounded-full bg-[#33A8DF]" />
            <span className="text-sm font-medium text-[#003366]">
              Partners & Sponsors
            </span>
          </div>

          <h2
            ref={titleRef}
            className="text-5xl lg:text-6xl font-[600] leading-[0.85] tracking-tight text-black opacity-0"
          >
            Driving Success Together
          </h2>
        </div>

        {/* DESKTOP SWIPER */}
        <div className="hidden lg:block -mx-6 xl:-mx-10">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            spaceBetween={30}
            loop
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            grabCursor={true}
            simulateTouch={true}
            touchRatio={1}
            className="cursor-grab active:cursor-grabbing px-6 xl:px-10"
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {partners.map((partner, index) => (
              <SwiperSlide className='select-none' key={index}>
                <a
                  href={partner.url}
                  className="partner-card block"
                  target="_blank"
                >
                  <div className="h-48 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8 shadow-lg transition hover:shadow-xl">
                    <div className="flex h-full flex-col items-center justify-center gap-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-inner text-2xl font-bold text-[#003366]">
                        {partner.name
                          .split(' ')
                          .map(w => w[0])
                          .join('')
                          .slice(0, 3)}
                      </div>
                      <span className="text-center text-sm font-medium text-gray-700">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* MOBILE GRID */}
        <div className="grid grid-cols-2 gap-6 lg:hidden">
          {partners.slice(0, 6).map((partner, index) => (
            <div
              key={index}
              className="h-40 rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 shadow-lg"
            >
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white shadow-inner text-lg font-bold text-[#003366]">
                  {partner.name
                    .split(' ')
                    .map(w => w[0])
                    .join('')
                    .slice(0, 3)}
                </div>
                <span className="text-center text-xs font-medium text-gray-700">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}