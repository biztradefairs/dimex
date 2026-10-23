import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { FLOOR_PLAN_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.planYourTravel;

export default function Page() {
  return (

    <>

      <script
        id="diemex-floor-plan-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FLOOR_PLAN_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent />
      <PageFaq route="/layout" />
    </>
  );
}
