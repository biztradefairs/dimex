import PageContent from './PageContent';
import PageFaq from '@/components/PageFaq';

export default function Page() {
  return (
    <>
      <PageContent />
      <PageFaq route="/participants" />
    </>
  );
}
