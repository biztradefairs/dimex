import { PAGE_META, SITE_URL } from '@/lib/pageMetadata';

const HOME_URL = new URL('/', SITE_URL).toString();

// Keep this graph on the homepage, which describes this single event edition.
export const HOME_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${HOME_URL}`,
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

export const ABOUT_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.diemex.in/about-diemex#webpage',
      url: 'https://www.diemex.in/about-diemex',
      name: 'About DIEMEX 2027 | International Die & Mould Exhibition',
      description:
        'Learn about DIEMEX 2027, the 3rd edition of the International Die & Mould Exhibition in India. Discover its objectives, manufacturing sectors, networking opportunities, venue and organizer.',
      inLanguage: 'en-IN',
      isPartOf: {
        '@id': 'https://www.diemex.in/#website',
      },
      about: {
        '@id': 'https://www.diemex.in/#event-2027',
      },
      breadcrumb: {
        '@id': 'https://www.diemex.in/about-diemex#breadcrumb',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.diemex.in/#website',
      url: 'https://www.diemex.in/',
      name: 'DIEMEX 2027',
      description: 'Official website of DIEMEX, the International Die & Mould Exhibition in India.',
      inLanguage: 'en-IN',
      publisher: {
        '@id': 'https://www.diemex.in/#organization',
      },
    },
    {
      '@type': 'Event',
      '@id': 'https://www.diemex.in/#event-2027',
      name: 'DIEMEX 2027 - International Die & Mould Exhibition',
      alternateName: 'DIEMEX 2027 - 3rd Edition',
      description:
        'DIEMEX 2027 is an international B2B exhibition focused on die and mould manufacturing, precision tooling, CNC machining, EDM, CAD/CAM, automation, additive manufacturing and advanced manufacturing technologies. The exhibition connects manufacturers, OEMs, suppliers, buyers and industry professionals.',
      url: 'https://www.diemex.in/',
      startDate: '2027-03-24T10:00:00+05:30',
      endDate: '2027-03-26T18:00:00+05:30',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Auto Cluster Exhibition Centre',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chinchwad, Pune',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
      organizer: {
        '@id': 'https://www.diemex.in/#organization',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.diemex.in/#organization',
      name: 'Maxx Business Media Pvt. Ltd.',
      description:
        'An Indian B2B exhibitions and business media company organizing industry-focused trade exhibitions and business events.',
      url: 'https://www.diemex.in/about-organizer',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.diemex.in/about-diemex#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.diemex.in/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About DIEMEX',
          item: 'https://www.diemex.in/about-diemex',
        },
      ],
    },
  ],
} as const;

export const ORGANIZER_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.diemex.in/about-diemex#webpage',
      url: 'https://www.diemex.in/about-diemex',
      name: 'About DIEMEX 2027 | International Die & Mould Exhibition',
      description:
        'Learn about DIEMEX 2027, the 3rd edition of the International Die & Mould Exhibition in India. Discover its objectives, manufacturing sectors, networking opportunities, venue and organizer.',
      inLanguage: 'en-IN',
      isPartOf: {
        '@id': 'https://www.diemex.in/#website',
      },
      about: {
        '@id': 'https://www.diemex.in/#event-2027',
      },
      breadcrumb: {
        '@id': 'https://www.diemex.in/about-diemex#breadcrumb',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.diemex.in/#website',
      url: 'https://www.diemex.in/',
      name: 'DIEMEX 2027',
      description: 'Official website of DIEMEX, the International Die & Mould Exhibition in India.',
      inLanguage: 'en-IN',
      publisher: {
        '@id': 'https://www.diemex.in/#organization',
      },
    },
    {
      '@type': 'Event',
      '@id': 'https://www.diemex.in/#event-2027',
      name: 'DIEMEX 2027 - International Die & Mould Exhibition',
      alternateName: 'DIEMEX 2027 - 3rd Edition',
      description:
        'DIEMEX 2027 is an international B2B exhibition focused on die and mould manufacturing, precision tooling, CNC machining, EDM, CAD/CAM, automation, additive manufacturing and advanced manufacturing technologies. The exhibition connects manufacturers, OEMs, suppliers, buyers and industry professionals.',
      url: 'https://www.diemex.in/',
      startDate: '2027-03-24T10:00:00+05:30',
      endDate: '2027-03-26T18:00:00+05:30',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Auto Cluster Exhibition Centre',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chinchwad, Pune',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
      organizer: {
        '@id': 'https://www.diemex.in/#organization',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.diemex.in/#organization',
      name: 'Maxx Business Media Pvt. Ltd.',
      description:
        'An Indian B2B exhibitions and business media company organizing industry-focused trade exhibitions and business events.',
      url: 'https://www.diemex.in/about-organizer',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.diemex.in/about-diemex#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.diemex.in/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About DIEMEX',
          item: 'https://www.diemex.in/about-diemex',
        },
      ],
    },
  ],
} as const;


