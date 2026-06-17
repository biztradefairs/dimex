// app/layout.tsx

"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { parabolica } from "@/lib/fonts";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { UTMProvider } from "@/components/UTMProvider";
import { getUTMParams, UTMData } from "@/lib/utmTracker";
import { UTMDebugger } from "@/components/UTMDebugger";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/exhibition-directory/");

  // Track page views on route change with UTM data
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag && !hideLayout) {
      // Get UTM parameters
      const utmData = getUTMParams();

      // Prepare page view data
      const pageData: any = {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      };

      // Add UTM parameters to tracking if they exist
      if (utmData.utm_source) pageData.utm_source = utmData.utm_source;
      if (utmData.utm_medium) pageData.utm_medium = utmData.utm_medium;
      if (utmData.utm_campaign) pageData.utm_campaign = utmData.utm_campaign;
      if (utmData.utm_term) pageData.utm_term = utmData.utm_term;
      if (utmData.utm_content) pageData.utm_content = utmData.utm_content;
      if (utmData.utm_id) pageData.utm_id = utmData.utm_id;

      // Send to Google Analytics
      (window as any).gtag('config', 'G-CGKLPLYCF9', pageData);

      console.log(`📊 Page view tracked: ${pathname}`, utmData);
    }
  }, [pathname, hideLayout]);

  return (
    <html lang="en" className={parabolica.variable}>
      <head>
        {/* Google Analytics - First script loads the library */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CGKLPLYCF9"
          strategy="afterInteractive"
        />

        {/* Google Analytics - Second script initializes it */}
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

              // Function to track UTM parameters as user properties
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
                  // Set user properties for UTM data
                  gtag('set', 'user_properties', utmData);
                  
                  // Also send as an event for better tracking
                  gtag('event', 'utm_parameters_detected', {
                    ...utmData,
                    page_path: window.location.pathname
                  });
                }
              }

              // Track UTM parameters on page load
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
        {/* UTM provider tree must be in Suspense for Next 16 */}
        <Suspense fallback={null}>
          <UTMProvider>
            {!hideLayout && <NavBar />}
            <main className="flex-grow w-full">{children}</main>
            {!hideLayout && <Footer />}
            <UTMDebugger />
          </UTMProvider>
        </Suspense>
      </body>
    </html>
  );
}