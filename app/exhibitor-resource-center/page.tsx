import PageFaq from '@/components/PageFaq';
import BackToTop from './component/BackToTop';
import HeroSection from './component/HeroSection';
import ExploreOpportunities from './component/ExploreOpportunities';
import BusinessObjectives from './component/BusinessObjectives';
import SelectionMadeSimple from './component/SelectionMadeSimple';
import LogisticsMarketing from './component/LogisticsMarketing';
import ContactInformation from './component/ContactInformation';
import AttentionSection from './component/AttentionSection';

export default function ExhibitorResourceCenterPage() {
  return (
    <>
      {(
    <>
      <main>
        <HeroSection />
        <ExploreOpportunities />
        <BusinessObjectives />
        <SelectionMadeSimple />
        <LogisticsMarketing />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ContactInformation />
            <AttentionSection />
          </div>
        </section>

      </main>

      <BackToTop />
    </>
  )}
      <PageFaq route="/exhibitor-resource-center" />
    </>
  );
}