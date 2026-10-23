import type { Metadata } from 'next';
import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';
import { PAGE_META } from '@/lib/pageMetadata';
import { WHY_EXHIBIT_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.whyExhibit;

export default function Page() {
  return (
    <>
      <script
        id="diemex-why-exhibit-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WHY_EXHIBIT_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent />
      <PageFaq route="/why-exhibit" />
    </>
  );
}
