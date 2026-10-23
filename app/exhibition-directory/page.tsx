import PageFaq from '@/components/PageFaq';
import CompanyDirectory from "./company-directory";
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { EXHIBITION_DIRECTORY_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.exhibitionDirectory;

export default function Home() {
  return (
    <>

      <script
        id="diemex-exhibition-directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EXHIBITION_DIRECTORY_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      {<CompanyDirectory />}
      <PageFaq route="/exhibition-directory" />
    </>
  )
}