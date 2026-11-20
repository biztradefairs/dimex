import { PAGE_META } from '@/lib/pageMetadata';
import PageContent from './PageContent';

export const metadata = PAGE_META.visitorPass;

export default function Page() {
  return <PageContent />;
}
