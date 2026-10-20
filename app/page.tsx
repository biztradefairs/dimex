import PageContent from './PageContent';
import LatestBlogsSection from '@/components/blogs/LatestBlogsSection';
import PageFaq from '@/components/PageFaq';
import { HOME_STRUCTURED_DATA } from '@/lib/structuredData';

export default function Page() {
  return (
    <>
      <script
        id="diemex-home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HOME_STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <PageContent blogsPreview={<LatestBlogsSection />} />
      <PageFaq route="/" />
    </>
  );
}
