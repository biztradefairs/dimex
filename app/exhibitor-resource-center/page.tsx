
import BackToTop from './component/BackToTop';
import HeroSection from './component/HeroSection';
import ExploreOpportunities from './component/ExploreOpportunities';
import BusinessObjectives from './component/BusinessObjectives';
import SelectionMadeSimple from './component/SelectionMadeSimple';
import LogisticsMarketing from './component/LogisticsMarketing';
import TechnicalServices from './component/TechnicalServices';
import CeilingSuspension from './component/CeilingSuspension';
import ApplicationDeadline from './component/ApplicationDeadline';
import ContactInformation from './component/ContactInformation';
import AttentionSection from './component/AttentionSection';
// import PartnersSection from '@/components/section/PartnersSection';

export const metadata = {
  title: 'Exhibitor Resource Center | TransRussia',
  description: 'Discover essential resources for exhibitors at the TransRussia Expo. Access guidelines, marketing materials, and support to help you prepare for the event.',
  canonical: 'https://trstexpo.com/exhibitor-resource-center/',
};

export default function ExhibitorResourceCenterPage() {
  return (
    <>
      <main>
        <HeroSection />
        <ExploreOpportunities />
        <BusinessObjectives />
        <SelectionMadeSimple />
        <LogisticsMarketing />
        {/* <TechnicalServices /> */}
        {/* <CeilingSuspension /> */}
        {/* <ApplicationDeadline /> */}
        <ContactInformation />
        <AttentionSection />
        {/* <PartnersSection /> */}
      </main>
    
      <BackToTop />
    </>
  );
}