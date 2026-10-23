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

export const WHY_EXHIBIT_STRUCTURED_DATA = {
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


export const BECOME_EXHIBITOR_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/register?t=exhibitor#webpage",
      "url": "https://www.diemex.in/register?t=exhibitor",
      "name": "Exhibitor Registration | DIEMEX 2027",
      "description": "Register as an exhibitor at DIEMEX 2027, the International Die & Mould Exhibition in India. Showcase your products and technologies, connect with manufacturers and OEMs, and explore business opportunities.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "about": {
        "@id": "https://www.diemex.in/#event"
      },
      "potentialAction": {
        "@type": "RegisterAction",
        "name": "Register as an Exhibitor",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.diemex.in/register?t=exhibitor",
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        },
        "object": {
          "@id": "https://www.diemex.in/#event"
        }
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/register?t=exhibitor#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/register?t=exhibitor#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.diemex.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Exhibitor Registration",
          "item": "https://www.diemex.in/register?t=exhibitor"
        }
      ]
    },
    {
      "@type": "Event",
      "@id": "https://www.diemex.in/#event",
      "name": "DIEMEX 2027 - International Die & Mould Exhibition in India",
      "startDate": "2027-03-24T10:00:00+05:30",
      "endDate": "2027-03-26T18:00:00+05:30",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "url": "https://www.diemex.in/",
      "location": {
        "@type": "Place",
        "name": "Auto Cluster Exhibition Centre",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chinchwad, Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "@id": "https://www.diemex.in/#organizer",
        "name": "Maxx Business Media Pvt. Ltd.",
        "url": "https://www.maxxbusinessmedia.com/"
      }
    }
  ],
} as const;

export const SECTORS_STRUCTRED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.diemex.in/sectors#webpage",
      "url": "https://www.diemex.in/sectors",
      "name": "Industry Sectors | DIEMEX 2027",
      "description": "Explore the industry sectors covered by DIEMEX 2027, the International Die & Mould Exhibition in India, including die and mould manufacturing, tooling, precision engineering and advanced manufacturing technologies.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Die and Mould Manufacturing"
        },
        {
          "@type": "Thing",
          "name": "Tooling Technology"
        },
        {
          "@type": "Thing",
          "name": "Precision Engineering"
        },
        {
          "@type": "Thing",
          "name": "Advanced Manufacturing"
        }
      ],
      "publisher": {
        "@id": "https://www.diemex.in/#organizer"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/sectors#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/sectors#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.diemex.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sectors",
          "item": "https://www.diemex.in/sectors"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.diemex.in/#organizer",
      "name": "Maxx Business Media Pvt. Ltd.",
      "url": "https://www.maxxbusinessmedia.com/"
    }
  ]
} as const;

export const PLAN_YOUR_TRAVEL_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/plan-your-travel#webpage",
      "url": "https://www.diemex.in/plan-your-travel",
      "name": "Plan Your Travel | DIEMEX 2027",
      "description": "Plan your visit to DIEMEX 2027 in Pune, India. Find travel information for reaching the Auto Cluster Exhibition Centre in Chinchwad and preparing for the International Die & Mould Exhibition.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website"
      },
      "about": {
        "@id": "https://www.diemex.in/#event"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/plan-your-travel#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/plan-your-travel#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.diemex.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Plan Your Travel",
          "item": "https://www.diemex.in/plan-your-travel"
        }
      ]
    }
  ]
}


export const EXHIBITION_DIRECTORY_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.diemex.in/exhibition-directory#webpage",
      "url": "https://www.diemex.in/exhibition-directory",
      "name": "Exhibition Directory | DIEMEX 2027",
      "description": "Explore the DIEMEX 2027 exhibition directory to discover exhibitors, manufacturers, suppliers and technology providers in die and mould manufacturing, tooling, precision engineering and advanced manufacturing.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "about": {
        "@id": "https://www.diemex.in/#event"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/exhibition-directory#breadcrumb"
      },
      "publisher": {
        "@id": "https://www.diemex.in/#organizer"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/exhibition-directory#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.diemex.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Exhibition Directory",
          "item": "https://www.diemex.in/exhibition-directory"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.diemex.in/#organizer",
      "name": "Maxx Business Media Pvt. Ltd.",
      "url": "https://www.maxxbusinessmedia.com/"
    },
    {
      "@type": "Event",
      "@id": "https://www.diemex.in/#event",
      "name": "DIEMEX 2027 - International Die & Mould Exhibition in India",
      "startDate": "2027-03-24T10:00:00+05:30",
      "endDate": "2027-03-26T18:00:00+05:30",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "url": "https://www.diemex.in/",
      "location": {
        "@type": "Place",
        "name": "Auto Cluster Exhibition Centre",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Chinchwad, Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@id": "https://www.diemex.in/#organizer"
      }
    }
  ]
}

export const EXHIBITOR_RESOURCE_CENTER = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/exhibitor-resource-center#webpage",
      "url": "https://www.diemex.in/exhibitor-resource-center",
      "name": "Exhibitor Resource Center | DIEMEX 2027",
      "description": "Access exhibitor resources for DIEMEX 2027, the International Die & Mould Exhibition in India. Find relevant information and resources to help prepare for exhibition participation.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "about": {
        "@id": "https://www.diemex.in/#event"
      },
      "publisher": {
        "@id": "https://www.diemex.in/#organizer"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/exhibitor-resource-center#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/exhibitor-resource-center#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.diemex.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Exhibitor Resource Center",
          "item": "https://www.diemex.in/exhibitor-resource-center"
        }
      ]
    }
  ]
}
