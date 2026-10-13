'use client';

import { useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { UTMProvider } from '@/components/UTMProvider';
import { getUTMParams } from '@/lib/utmTracker';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/exhibition-directory/') ||
    pathname?.startsWith('/passes') ||
    pathname?.startsWith('/scanner');

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag && !hideLayout) {
      const utmData = getUTMParams();

      const pageData: any = {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      };

      if (utmData.utm_source) pageData.utm_source = utmData.utm_source;
      if (utmData.utm_medium) pageData.utm_medium = utmData.utm_medium;
      if (utmData.utm_campaign) pageData.utm_campaign = utmData.utm_campaign;
      if (utmData.utm_term) pageData.utm_term = utmData.utm_term;
      if (utmData.utm_content) pageData.utm_content = utmData.utm_content;
      if (utmData.utm_id) pageData.utm_id = utmData.utm_id;

      (window as any).gtag('config', 'G-CGKLPLYCF9', pageData);
    }
  }, [pathname, hideLayout]);

  return (
    <Suspense fallback={null}>
      <UTMProvider>
        {!hideLayout && <NavBar />}
        <main
          className={`w-full flex-grow ${
            !hideLayout && pathname !== '/'
              ? 'pt-[84px] sm:pt-[112px] lg:pt-[168px]'
              : ''
          }`}
        >
          {children}
        </main>
        {!hideLayout && <Footer />}
      </UTMProvider>
    </Suspense>
  );
}
