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
import TransRussiaSummitProgram from './components/ConferenceProgramme';

export const metadata: Metadata = {
  title: 'Diemex Conference | October 08-10, 2026, Pune',
  description: 'Annual conference for professionals in the tooling industry.',
  openGraph: {
    title: 'Diemex Conference | October 08-10, 2026, Pune',
    description: 'Annual conference for professionals in the tooling industry.',
    images: ['https://regional-cdn.itegroupnews.com/10_2c986396fa.jpg'],
  },
};
const speakersData = [
  {
    id: '1',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
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
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Technology',
    linkedinUrl: 'https://linkedin.com/in/alexander-chulok',
    description: 'International expert in foresight and strategic planning',
    session: 'Future of Logistics: Scenarios, Risks, and Opportunities for Growth',
    time: '16:45 - 17:30, Day 1',
    featured: true
  },
  {
    id: '3',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/alexey-nikonov',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '4',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Logistics',
    linkedinUrl: 'https://linkedin.com/in/igor-kudryavtsev',
    session: 'Logistics Management Strategy in Conditions of Geopolitical and Economic Changes',
    time: '12:00 - 13:45, Day 1',
    featured: true
  },
  {
    id: '5',
    name: '',
    title: '',
    company: "",
    imageUrl: '',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/igor-shatsky',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '6',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Consulting',
    linkedinUrl: 'https://linkedin.com/in/mikhail-bazhenov',
    session: 'Logistics Management Strategy in Conditions of Geopolitical and Economic Changes',
    time: '12:00 - 13:45, Day 1'
  },
  {
    id: '7',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Telecom',
    linkedinUrl: 'https://linkedin.com/in/alexander-pistun',
    session: 'Transparency, Predictability, Automation: Digital Priorities of Cargo Shippers',
    time: '15:00 - 16:30, Day 1'
  },
  {
    id: '8',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/ekaterina-antsiferova',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '9',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Shipping',
    linkedinUrl: 'https://linkedin.com/in/elena-kondratieva',
    session: 'Transparency, Predictability, Automation: Digital Priorities of Cargo Shippers',
    time: '15:00 - 16:30, Day 1'
  },
  {
    id: '10',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/alexander-shulz',
    session: 'Warehouse as an Asset: Solutions in Conditions of Warehouse Space Deficit',
    time: '14:00 - 15:30, Day 2'
  },
  {
    id: '11',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Food & Beverage',
    linkedinUrl: 'https://linkedin.com/in/vasily-berezhnoy',
    session: 'Logistics Management Strategy in Conditions of Geopolitical and Economic Changes',
    time: '12:00 - 13:45, Day 1'
  },
  {
    id: '12',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Real Estate',
    linkedinUrl: 'https://linkedin.com/in/victor-afanasenko',
    session: 'Warehouse as an Asset: Solutions in Conditions of Warehouse Space Deficit',
    time: '14:00 - 15:30, Day 2'
  },
  {
    id: '13',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Communication',
    session: 'How to Turn Any Contact into Long-Term Partnership',
    time: '10:00 - 11:00, Day 2',
    featured: true
  },
  {
    id: '14',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/anastasia-sorokoumova',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '15',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Telecom',
    linkedinUrl: 'https://linkedin.com/in/mikhail-smirnov',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '16',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/alexey-kazyonnov',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '17',
    name: '',
    title: '',
    company: "",
    imageUrl: '',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/denis-gurov',
    session: 'Logistics Management in Retail: Strategies, Technologies, Efficiency',
    time: '16:00 - 17:30, Day 2'
  },
  {
    id: '18',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'E-commerce',
    linkedinUrl: 'https://linkedin.com/in/maria-trifonova',
    session: 'Logistics E-Com: Balance Between Operational Efficiency and Customer Experience',
    time: '11:30 - 13:00, Day 2'
  },
  {
    id: '19',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: 'Retail',
    linkedinUrl: 'https://linkedin.com/in/ruslan-yashkanov',
    session: 'Warehouse as an Asset: Solutions in Conditions of Warehouse Space Deficit',
    time: '14:00 - 15:30, Day 2'
  },
  {
    id: '20',
    name: '',
    title: '',
    company: '',
    imageUrl: '',
    category: '',
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
                  title="Top speakers Diemex Conference 2026"
                  subtitle="The largest Die, Mould and Tooling leaders"
                  speakers={speakersData}
                />
              </div>
            </section>
             <section className="w-full">
              <div className="mx-auto w-full max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
                <TransRussiaSummitProgram/>
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
