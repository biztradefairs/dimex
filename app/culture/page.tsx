"use client"

import React from 'react';
import HeroSection from './components/HeroSection';
import TheatresSection from './components/TheatresSection';
import MuseumsSection from './components/MuseumsSection';
// import PartnersSection from '@/components/section/PartnersSection';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';

const CulturePage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans antialiased bg-gray-50">
      
      <main>
        <HeroSection />
        <TheatresSection />
        <MuseumsSection />
        {/* <PartnersSection /> */}
      </main>
      <BackToTop/>
    </div>
  );
};

export default CulturePage;