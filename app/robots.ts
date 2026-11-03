import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/pageMetadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin', '/dashboard', '/api/', '/passes', '/scanner',
        '/login', '/forgot-password', '/register/thank-you',
      ],
    },
    sitemap: SITE_URL + '/sitemap.xml',
  };
}
