import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { PLAN_YOUR_TRAVEL_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.sectors;

export default function Page() {
  return (
    <>

      <script
        id="diemex-plan-your-travel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PLAN_YOUR_TRAVEL_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent />
      <PageFaq route="/plan-your-travel" />
    </>
  );
}
