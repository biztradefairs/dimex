import { PAGE_META } from '@/lib/pageMetadata';

export const metadata = PAGE_META.articles;

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
