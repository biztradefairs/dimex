// app/page.tsx
import { Metadata } from 'next';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import PreviousYearSection from './components/PreviousYearSection';
import SpeakersSection from './components/SpeakerSection';
// import ProgramSection from '@/components/ProgramSection';
import WhyAttendSection from './components/WhyAttendSection';
// import DelegatePackages from './components/DelegatePackages';
import VenueSection from './components/VenueSection';
import OrganizerSection from './components/OrganizerSection';
// import ContactSection from './components/ContactSection';
import FAQ from './components/FAQ';
import Footer from '@/components/Footer';
import DownloadLinks from './components/DownloadLinks';
import Contacts from './components/Contacts';
import BecomeDelegate from './components/BecomeDelegate';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';

export const metadata: Metadata = {
  title: 'TransRussia Summit | October 19-21, 2026, Moscow',
  description: 'Annual conference for professionals in the transport and logistics market.',
  openGraph: {
    title: 'TransRussia Summit | October 19-21, 2026, Moscow',
    description: 'Annual conference for professionals in the transport and logistics market.',
    images: ['https://regional-cdn.itegroupnews.com/10_2c986396fa.jpg'],
  },
};
const speakersData = [
  {
    id: '1',
    name: 'Alexander Perfiliev',
    title: 'Partner and Director of Warehouse and Industrial Real Estate Department',
    company: 'INVEST7',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Perfiliev_1_762cf27f0f.png',
    category: 'Real Estate',
    linkedinUrl: 'https://linkedin.com/in/alexander-perfiliev',
    twitterUrl: 'https://twitter.com/alexperfiliev',
    description: 'Expert in warehouse and industrial real estate with 15+ years of experience',
    session: 'Warehouse as an Asset: Solutions in Conditions of Warehouse Space Deficit',
    time: '14:00 - 15:30, Day 2',
    featured: true
  },
  {
    id: '2',
    name: 'Alexander Chulok',
    title: 'Director of the Center for Science and Technology Forecasting',
    company: 'HSE ISSEK',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Chulok_1_eef88afd74.png',
    category: 'Technology',
    linkedinUrl: 'https://linkedin.com/in/alexander-chulok',
    description: 'International expert in foresight and strategic planning',
    session: 'Future of Logistics: Scenarios, Risks, and Opportunities for Growth',
    time: '16:45 - 17:30, Day 1',
    featured: true
  },
  {
    id: '3',
    name: 'Alexey Nikonov',
    title: 'Founder',
    company: 'BRENDOSS Furniture Factory',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Nikonov_1_f5d7421b63.png',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/alexey-nikonov',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '4',
    name: 'Igor Kudryavtsev',
    title: 'Managing Director of Logistics',
    company: 'SEGEZHA GROUP',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Kudryavczev_df819f71dd.png',
    category: 'Logistics',
    linkedinUrl: 'https://linkedin.com/in/igor-kudryavtsev',
    session: 'Logistics Management Strategy in Conditions of Geopolitical and Economic Changes',
    time: '12:00 - 13:45, Day 1',
    featured: true
  },
  {
    id: '5',
    name: 'Igor Shatsky',
    title: 'Director of Logistics',
    company: "O'KEЙ",
    imageUrl: 'https://regional-cdn.itegroupnews.com/Shaczkij_1_12b275930a.png',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/igor-shatsky',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '6',
    name: 'Mikhail Bazhenov',
    title: 'Partner, Head of Business Consulting Practice',
    company: 'TRUST TECHNOLOGIES',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Bazhenov_1_6790245d33.png',
    category: 'Consulting',
    linkedinUrl: 'https://linkedin.com/in/mikhail-bazhenov',
    session: 'Logistics Management Strategy in Conditions of Geopolitical and Economic Changes',
    time: '12:00 - 13:45, Day 1'
  },
  {
    id: '7',
    name: 'Alexander Pistun',
    title: 'Director of Logistics Department',
    company: 'MTS',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Aleksandr_Pistun_f52df668a9.png',
    category: 'Telecom',
    linkedinUrl: 'https://linkedin.com/in/alexander-pistun',
    session: 'Transparency, Predictability, Automation: Digital Priorities of Cargo Shippers',
    time: '15:00 - 16:30, Day 1'
  },
  {
    id: '8',
    name: 'Ekaterina Antsiferova',
    title: 'Deputy General Director for Commerce',
    company: 'DALLI',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Ancziferova2_1_c997ee702e.png',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/ekaterina-antsiferova',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '9',
    name: 'Elena Kondratieva',
    title: 'Director of Development, Head of Electronic Transportation Documents Implementation Program',
    company: 'FESCO',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Kondrateva_1_79bf33c0ac.png',
    category: 'Shipping',
    linkedinUrl: 'https://linkedin.com/in/elena-kondratieva',
    session: 'Transparency, Predictability, Automation: Digital Priorities of Cargo Shippers',
    time: '15:00 - 16:30, Day 1'
  },
  {
    id: '10',
    name: 'Alexander Shulz',
    title: 'Director of Logistics',
    company: 'PETROVICH',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Shulcz_45477a7a66.png',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/alexander-shulz',
    session: 'Warehouse as an Asset: Solutions in Conditions of Warehouse Space Deficit',
    time: '14:00 - 15:30, Day 2'
  },
  {
    id: '11',
    name: 'Vasily Berezhnoy',
    title: 'Director of Transport Logistics Division',
    company: 'EFKO Group',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Berezhnoj_06ecdc9012.png',
    category: 'Food & Beverage',
    linkedinUrl: 'https://linkedin.com/in/vasily-berezhnoy',
    session: 'Logistics Management Strategy in Conditions of Geopolitical and Economic Changes',
    time: '12:00 - 13:45, Day 1'
  },
  {
    id: '12',
    name: 'Victor Afanasenko',
    title: 'Regional Director of Warehouse and Industrial Real Estate Department',
    company: 'Nikoliers',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Af_ANASENKO_aa06f4c268.png',
    category: 'Real Estate',
    linkedinUrl: 'https://linkedin.com/in/victor-afanasenko',
    session: 'Warehouse as an Asset: Solutions in Conditions of Warehouse Space Deficit',
    time: '14:00 - 15:30, Day 2'
  },
  {
    id: '13',
    name: 'Elena Vavilova',
    title: 'Colonel of Foreign Intelligence Service (retired), Expert in Interpersonal Communication',
    company: 'Government',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Vavilova_60556858ff.png',
    category: 'Communication',
    session: 'How to Turn Any Contact into Long-Term Partnership',
    time: '10:00 - 11:00, Day 2',
    featured: true
  },
  {
    id: '14',
    name: 'Anastasia Sorokoumova',
    title: 'Director of Supply Chains',
    company: 'PODRUZHKA',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/anastasia-sorokoumova',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '15',
    name: 'Mikhail Smirnov',
    title: 'Director of Logistics Department',
    company: 'Beeline',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Smirnov_d74097b27b.png',
    category: 'Telecom',
    linkedinUrl: 'https://linkedin.com/in/mikhail-smirnov',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '16',
    name: 'Alexey Kazyonnov',
    title: 'Director of Integrated Planning',
    company: 'HOFF',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Andrej_Kazyonov_Trans_Russia_af7fffc1f4.png',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/alexey-kazyonnov',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '17',
    name: 'Denis Gurov',
    title: 'Director of Logistics',
    company: "DETSKY MIR",
    imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/denis-gurov',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '18',
    name: 'Maria Trifonova',
    title: 'Head of B2B',
    company: 'LAMODA',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Trifonova_738a054f27.png',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/maria-trifonova',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '19',
    name: 'Ruslan Yashkanov',
    title: 'Federal Logistics Manager',
    company: 'DNS',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Yashkanov_961547b352.png',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/ruslan-yashkanov',
    session: 'Warehouse as an Asset: Solutions in Conditions of Warehouse Space Deficit',
    time: '14:00 - 15:30, Day 2'
  },
  {
    id: '20',
    name: 'Igor Kuznetsov',
    title: 'Director of Infrastructure and Project Finance Practice',
    company: 'TRUST TECHNOLOGIES',
    imageUrl: 'https://regional-cdn.itegroupnews.com/Kuzneczov_feddd81b00.png',
    category: 'Finance',
    linkedinUrl: 'https://linkedin.com/in/igor-kuznetsov',
    session: 'Risk and Opportunity Map: Strategic Navigation for Global Market Players',
    time: '09:40 - 11:30, Day 1'
  }
];
export default function HomePage() {
  return (
    <div className="relative min-h-screen font-sans antialiased bg-white">
  
      
      <main className="flex flex-col font-parabolica">
        {/* Hero Section - Full width */}
        <HeroSection />
        
        {/* Main Content with Consistent Container */}
        <div className="w-full">
          {/* All sections wrapped in consistent spacing container */}
          <div className="space-y-20 lg:space-y-32 py-10 lg:py-20">
            
            {/* About Section */}
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <AboutSection />
              </div>
            </section>
            
            {/* Previous Year Section - Full width special section */}
            {/* <PreviousYearSection /> */}
            
            {/* Speakers Section */}
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <SpeakersSection
                  title="Top speakers TransRussia Summit 2025"
                  subtitle="The largest cargo owners, experts and market leaders"
                  speakers={speakersData}
                />
              </div>
            </section>
            
            {/* Download Links */}
            {/* <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <DownloadLinks 
                  programLink="https://drive.google.com/uc?export=download&id=1YJskcvxAZ3hpyr-yVXnX9fGNDJGiHEJ2"
                  printVersionLink="https://drive.google.com/uc?export=download&id=1LR3cdgT97tPo4K7gGA18JttgF4inDU4e"
                />
              </div>
            </section> */}
            
            {/* Why Attend Section */}
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <WhyAttendSection />
              </div>
            </section>
            
           
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <BecomeDelegate />
              </div>
            </section> 
            
            {/* Venue Section */}
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <VenueSection />
              </div>
            </section>
            
            {/* Organizer Section */}
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <OrganizerSection />
              </div>
            </section>
            
            {/* Contacts Section */}
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <Contacts />
              </div>
            </section>
            
            {/* FAQ Section */}
            <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <FAQ />
              </div>
            </section>
            
          </div>
        </div>
      </main>
      
      {/* Back to Top Button */}
   <BackToTop/>
    </div>
  );
}