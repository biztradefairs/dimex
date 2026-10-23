import PageFaq from '@/components/PageFaq';
import BackToTop from './component/BackToTop';
import HeroSection from './component/HeroSection';
import ExploreOpportunities from './component/ExploreOpportunities';
import BusinessObjectives from './component/BusinessObjectives';
import SelectionMadeSimple from './component/SelectionMadeSimple';
import LogisticsMarketing from './component/LogisticsMarketing';
import ContactInformation from './component/ContactInformation';
import AttentionSection from './component/AttentionSection';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { EXHIBITOR_RESOURCE_CENTER } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.exhibitorResourceCenter;

export default function ExhibitorResourceCenterPage() {
  return (
    <>
      <script
        id="diemex-exhibitor-resource-center-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EXHIBITOR_RESOURCE_CENTER).replace(/</g, '\\u003c'),
        }}
      />
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
      <PageFaq route="/exhibitor-resource-center" />
    </>
  );
}