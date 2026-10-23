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
} as const;


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
} as const;

export const EXHIBITOR_RESOURCE_CENTER_STRUCTURED_DATA = {
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
} as const;

export const FLOOR_PLAN_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/layout#webpage",
      "url": "https://www.diemex.in/layout",
      "name": "Exhibition Layout | DIEMEX 2027",
      "description": "Explore the exhibition layout for DIEMEX 2027, the International Die & Mould Exhibition in India, and review the venue layout to plan your exhibition participation.",
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
        "@id": "https://www.diemex.in/layout#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/layout#breadcrumb",
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
          "name": "Exhibition Layout",
          "item": "https://www.diemex.in/layout"
        }
      ]
    }
  ]
} as const;

export const WHY_VISIT_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/why-visit#webpage",
      "url": "https://www.diemex.in/why-visit",
      "name": "Why Visit DIEMEX 2027? | International Die & Mould Exhibition",
      "description": "Discover why to visit DIEMEX 2027 in Pune, India. Explore die and mould manufacturing, tooling, precision engineering and advanced manufacturing technologies, and connect with industry professionals.",
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
        "@id": "https://www.diemex.in/why-visit#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/why-visit#breadcrumb",
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
          "name": "Why Visit",
          "item": "https://www.diemex.in/why-visit"
        }
      ]
    }
  ]
} as const;

export const BROCHURE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/register?t=brochure#webpage",
      "url": "https://www.diemex.in/register?t=brochure",
      "name": "Request the DIEMEX 2027 Brochure",
      "description": "Request the DIEMEX 2027 exhibition brochure to learn more about the International Die & Mould Exhibition in India, its industry focus and participation opportunities.",
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
        "name": "Request the DIEMEX Brochure",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.diemex.in/register?t=brochure",
          "actionPlatform": [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform"
          ]
        }
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/register?t=brochure#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/register?t=brochure#breadcrumb",
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
          "name": "Brochure Registration",
          "item": "https://www.diemex.in/register?t=brochure"
        }
      ]
    }
  ]
} as const;

export const ARTICLES_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.diemex.in/articles#webpage",
      "url": "https://www.diemex.in/articles",
      "name": "Articles | DIEMEX 2027",
      "description": "Explore articles from DIEMEX covering die and mould manufacturing, tooling, precision engineering, industrial technologies and advanced manufacturing trends.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.diemex.in/#organizer",
        "name": "Maxx Business Media Pvt. Ltd.",
        "url": "https://www.maxxbusinessmedia.com/"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/articles#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/articles#breadcrumb",
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
          "name": "Articles",
          "item": "https://www.diemex.in/articles"
        }
      ]
    }
  ]
} as const;


export const BLOGS_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.diemex.in/blogs#webpage",
      "url": "https://www.diemex.in/blogs",
      "name": "DIEMEX Blogs | Die & Mould Manufacturing Insights",
      "description": "Read DIEMEX blogs on die and mould manufacturing, tooling technologies, precision engineering, industrial exhibitions and advanced manufacturing trends in India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.diemex.in/#organizer",
        "name": "Maxx Business Media Pvt. Ltd.",
        "url": "https://www.maxxbusinessmedia.com/"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/blogs#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/blogs#breadcrumb",
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
          "name": "Blogs",
          "item": "https://www.diemex.in/blogs"
        }
      ]
    }
  ]
} as const;

export const POST_SHOW_REPORT_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/post-show-report#webpage",
      "url": "https://www.diemex.in/post-show-report",
      "name": "Post Show Report | DIEMEX",
      "description": "Explore the DIEMEX post show report for exhibition highlights, industry participation and key insights from the event. Learn more about DIEMEX and its role in the die and mould manufacturing industry.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.diemex.in/#organizer",
        "name": "Maxx Business Media Pvt. Ltd.",
        "url": "https://www.maxxbusinessmedia.com/"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/post-show-report#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/post-show-report#breadcrumb",
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
          "name": "Post Show Report",
          "item": "https://www.diemex.in/post-show-report"
        }
      ]
    }
  ]
} as const;

export const MEDIA_GALLERY_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.diemex.in/media-gallery#webpage",
      "url": "https://www.diemex.in/media-gallery",
      "name": "Media Gallery | DIEMEX",
      "description": "Explore the DIEMEX media gallery featuring exhibition photos, event highlights and visuals from the die and mould manufacturing industry.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "publisher": {
        "@id": "https://www.diemex.in/#organizer"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/media-gallery#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://www.diemex.in/media-gallery#gallery"
      }
    },
    {
      "@type": "ImageGallery",
      "@id": "https://www.diemex.in/media-gallery#gallery",
      "name": "DIEMEX Media Gallery",
      "url": "https://www.diemex.in/media-gallery",
      "description": "Photos and visual highlights from DIEMEX exhibitions and related industry events."
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/media-gallery#breadcrumb",
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
          "name": "Media Gallery",
          "item": "https://www.diemex.in/media-gallery"
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

export const CONTACT_US_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.diemex.in/contact-us#webpage",
      "url": "https://www.diemex.in/contact-us",
      "name": "Contact Us | DIEMEX",
      "description": "Contact the DIEMEX team for exhibitor registration, visitor enquiries, exhibition participation and information about DIEMEX 2027, the International Die & Mould Exhibition in India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.diemex.in/#website",
        "url": "https://www.diemex.in/",
        "name": "DIEMEX"
      },
      "mainEntity": {
        "@id": "https://www.diemex.in/#organizer"
      },
      "breadcrumb": {
        "@id": "https://www.diemex.in/contact-us#breadcrumb"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/contact-us#breadcrumb",
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
          "name": "Contact Us",
          "item": "https://www.diemex.in/contact-us"
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

export const VISITOR_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.diemex.in/register?t=visitor#webpage",
      "url": "https://www.diemex.in/register?t=visitor",
      "name": "Visitor Registration | DIEMEX 2027",
      "description": "Register as a visitor for DIEMEX 2027, the International Die & Mould Exhibition in India, taking place from 24–26 March 2027 in Pune, India.",
      "breadcrumb": {
        "@id": "https://www.diemex.in/register?t=visitor#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://www.diemex.in/register?t=visitor#register-action"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/register?t=visitor#breadcrumb",
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
          "name": "Visitor Registration",
          "item": "https://www.diemex.in/register?t=visitor"
        }
      ]
    },
    {
      "@type": "RegisterAction",
      "@id": "https://www.diemex.in/register?t=visitor#register-action",
      "name": "Register as a Visitor for DIEMEX 2027",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.diemex.in/register?t=visitor",
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform"
        ]
      },
      "object": {
        "@id": "https://www.diemex.in/#event"
      }
    },
    {
      "@type": "Event",
      "@id": "https://www.diemex.in/#event",
      "name": "DIEMEX 2027 – International Die & Mould Exhibition in India",
      "description": "An international exhibition focused on die, mould, tooling and advanced manufacturing technologies.",
      "startDate": "2027-03-24T10:00:00+05:30",
      "endDate": "2027-03-26T18:00:00+05:30",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Auto Cluster Exhibition Centre",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Auto Cluster Exhibition Centre, Chinchwad",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Maxx Business Media Pvt. Ltd."
      }
    }
  ]
} as const;

export const BATTERY_HOUSING_BLOG_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://www.diemex.in/blogs/battery-housing-and-enclosure-manufacturing-tooling-challenges#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.diemex.in/blogs/battery-housing-and-enclosure-manufacturing-tooling-challenges"
      },
      "headline": "Battery Housing and Enclosure Manufacturing: Tooling Challenges",
      "description": "Explore key tooling challenges in battery housing and enclosure manufacturing, including precision, material selection, die design and production requirements.",
      "url": "https://www.diemex.in/blogs/battery-housing-and-enclosure-manufacturing-tooling-challenges",
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.diemex.in/#organization",
        "name": "DIEMEX",
        "url": "https://www.diemex.in/"
      },
      "author": {
        "@type": "Organization",
        "name": "DIEMEX Editorial Team"
      },
      "inLanguage": "en-IN",
      "articleSection": "Manufacturing",
      "keywords": [
        "battery housing manufacturing",
        "battery enclosure tooling",
        "die and mould manufacturing",
        "tooling challenges",
        "advanced manufacturing"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.diemex.in/blogs/battery-housing-and-enclosure-manufacturing-tooling-challenges#breadcrumb",
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
          "name": "Blogs",
          "item": "https://www.diemex.in/blogs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Battery Housing and Enclosure Manufacturing: Tooling Challenges",
          "item": "https://www.diemex.in/blogs/battery-housing-and-enclosure-manufacturing-tooling-challenges"
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.diemex.in/#organization",
      "name": "DIEMEX",
      "url": "https://www.diemex.in/"
    }
  ]
} as const;

export const FIRST_BLOG_STRUCTURED_DATA = BATTERY_HOUSING_BLOG_STRUCTURED_DATA;

