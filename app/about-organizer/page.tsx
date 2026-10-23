import type { Metadata } from 'next';
import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';
import { PAGE_META } from '@/lib/pageMetadata';
import { ORGANIZER_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.aboutOrganizer;

export default function Page() {
  return (
    <>
      <script
        id="diemex-organizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZER_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent />
      <PageFaq route="/about-organizer" />
    </>
  );
}
