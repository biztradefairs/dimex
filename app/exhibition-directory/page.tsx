import PageFaq from '@/components/PageFaq';
import CompanyDirectory from "./company-directory";
import { fetchInitialCompanyDirectory } from '@/lib/publicExhibitors';
import type { Metadata } from 'next';
import { PAGE_META } from '@/lib/pageMetadata';
import { EXHIBITION_DIRECTORY_STRUCTURED_DATA } from '@/lib/structuredData';

export const metadata: Metadata = PAGE_META.exhibitionDirectory;

export const revalidate = 60;

export default async function Home() {
  const { companies, totalPages, total } = await fetchInitialCompanyDirectory();
  return (
    <>

      <script
        id="diemex-exhibition-directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EXHIBITION_DIRECTORY_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <CompanyDirectory initialCompanies={companies} initialTotalPages={totalPages} initialTotal={total} />
      <PageFaq route="/exhibition-directory" />
    </>
  )
}