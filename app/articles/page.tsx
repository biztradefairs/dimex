import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { ARTICLES_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.articles;

export default function Page() {
  return (
    <>

      <script
        id="diemex-articles-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ARTICLES_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent />
      <PageFaq route="/articles" />
    </>
  );
}
