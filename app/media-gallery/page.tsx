import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { MEDIA_GALLERY_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.mediaGallery;

export default function Page() {
  return (
    <>
      <script
        id="diemex-mediagallery-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(MEDIA_GALLERY_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent />
      <PageFaq route="/media-gallery" />
    </>
  );
}
