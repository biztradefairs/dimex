import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { WHY_VISIT_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.whyVisit;

export default function Page() {
  return (
    <>

      <script
        id="diemex-why-visit-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WHY_VISIT_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent />
      <PageFaq route="/why-visit" />
    </>
  );
}
