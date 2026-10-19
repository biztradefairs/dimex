import { PAGE_META, SITE_URL } from '@/lib/pageMetadata';

const HOME_URL = new URL('/', SITE_URL).toString();

// Keep this graph on the homepage, which describes this single event edition.
export const HOME_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${HOME_URL}#org`,
      name: 'Maxx Business Media Pvt. Ltd.',
      alternateName: 'DIEMEX',
      url: HOME_URL,
      logo: new URL('/images/diemex3.png', SITE_URL).toString(),
      email: 'info@diemex.in',
      telephone: '+91-9742711211',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'T9, 3rd Floor, Swastik Manandi Arcade, Seshadripuram',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560020',
        addressCountry: 'IN',
      },
      sameAs: ['https://www.linkedin.com/company/diemex-india/'],
    },
    {
      '@type': 'Event',
      '@id': `${HOME_URL}#event`,
      name: 'DIEMEX 2027 - International Die & Mould Exhibition',
      url: HOME_URL,
      description: PAGE_META.home.description,
      startDate: '2027-03-24',
      endDate: '2027-03-26',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Auto Cluster Exhibition Centre',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Plot No. C-181, H-Block, MIDC, Chinchwad',
          addressLocality: 'Pune',
          addressRegion: 'Maharashtra',
          postalCode: '411019',
          addressCountry: 'IN',
        },
      },
      image: [new URL('/images/why-exhibit-header.JPG', SITE_URL).toString()],
      organizer: { '@id': `${HOME_URL}#org` },
      offers: {
        '@type': 'Offer',
        name: 'Free visitor registration',
        url: new URL('/register?t=visitor', SITE_URL).toString(),
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    },
  ],
} as const;
