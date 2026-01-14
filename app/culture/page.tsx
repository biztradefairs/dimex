"use client"

import React from 'react';
import HeroSection from './components/HeroSection';
import TheatresSection from './components/TheatresSection';
import MuseumsSection from './components/MuseumsSection';
import PartnersSection from '@/components/section/PartnersSection';

const CulturePage: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans antialiased bg-gray-50">
      
      <main>
        <HeroSection />
        <TheatresSection />
        <MuseumsSection />
        <PartnersSection />
      </main>
      
    </div>
  );
};

export default CulturePage;