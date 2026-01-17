// app/page.tsx
'use client';

import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkladTechSection from '@/components/SkladTechSection'
import WhyChooseSection from '@/components/WhyChooseSection'
import DiscoverSection from '@/components/DiscoverSection'
import ImpactSection from '@/components/ImpactSection'
import SectorsSection from '@/components/SectorsSection'
import CountriesSection from '@/components/CountriesSection'
import ConnectSection from '@/components/ConnectSection'
import ArticlesSection from '@/components/ArticlesSection'
import NewsletterSection from '@/components/NewsletterSection'
import ExploreMoscowSection from '@/components/ExploreMoscowSection'
import PartnersSection from '@/components/PartnersSection'

export default function Home() {
  return (
    <main className="font-parabolica antialiased overflow-hidden">
      <HeroSection />
      <AboutSection />
      {/* <SkladTechSection /> */}
      <WhyChooseSection />
      <DiscoverSection />
      <ImpactSection />
      <SectorsSection />
      <CountriesSection />
      <ConnectSection />
      <ArticlesSection />
      <NewsletterSection />
      <ExploreMoscowSection />
      <PartnersSection />
    </main>
  )
}