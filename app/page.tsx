// app/page.tsx
'use client';

import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import WhyChooseSection from '@/components/WhyChooseSection'
import DiscoverSection from '@/components/DiscoverSection'
import ImpactSection from '@/components/ImpactSection'
import SectorsSection from '@/components/SectorsSection'
import CountriesSection from '@/components/CountriesSection'
import ConnectSection from '@/components/ConnectSection'
import ArticlesSection from '@/components/ArticlesSection'
import NewsletterSection from '@/components/NewsletterSection'
import ExploreMoscowSection from '@/components/ExploreMoscowSection'
import PartnersSection from '@/components/section/PartnersSection'
import VideoSection from '@/components/videoSection';
import BackToTop from './exhibitor-resource-center/component/BackToTop';

export default function Home() {
  return (
    <>
    <main className="font-parabolica antialiased overflow-hidden">
      <HeroSection />
      <AboutSection />
      <VideoSection/>
      <WhyChooseSection />
      <DiscoverSection />
      <ImpactSection />
      <SectorsSection  />
      <CountriesSection />
      <ConnectSection />
      <ArticlesSection />
      <NewsletterSection />
      <ExploreMoscowSection />
      <div>
         <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 w-fit mx-auto shadow-sm">
            <img
              src="/images/logo-icon-3.png"
              alt="TransRussia"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-900">
              Partners & Sponsors
            </span>
          </div>
        <PartnersSection />
      </div>
      
    </main>
    <BackToTop/>
    </>
  )
}