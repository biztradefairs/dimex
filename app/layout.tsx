import type { Metadata } from 'next';
import Script from 'next/script';
import { parabolica } from '@/lib/fonts';
import './globals.css';
import AppShell from '@/components/AppShell';
import { PAGE_META, SITE_URL } from '@/lib/pageMetadata';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...PAGE_META.home,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={parabolica.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGKLPLYCF9"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CGKLPLYCF9', {
                send_page_view: true,
                page_title: document.title,
                page_location: window.location.href
              });

              function trackUTMParameters() {
                const urlParams = new URLSearchParams(window.location.search);
                const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
                const utmData = {};
                
                utmParams.forEach(param => {
                  const value = urlParams.get(param);
                  if (value) {
                    utmData[param] = value;
                  }
                });

                if (Object.keys(utmData).length > 0) {
                  gtag('set', 'user_properties', utmData);
                  gtag('event', 'utm_parameters_detected', {
                    ...utmData,
                    page_path: window.location.pathname
                  });
                }
              }

              if (document.readyState === 'complete') {
                trackUTMParameters();
              } else {
                window.addEventListener('load', trackUTMParameters);
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-parabolica">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
