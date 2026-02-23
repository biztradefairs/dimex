/* ===================== TYPES ===================== */

export interface Partner {
  name: string;
  slug: string;
  role: string;
  logo: string;
  websiteLink?: string;
  description?: string;
}

export type PartnersData = Record<string, Partner[]>;

/* ===================== DATA ===================== */

export const partnersData: PartnersData = {
  supportingPartner2026: [
    {
      name: '',
      slug: 'icib',
      role: 'Supporting Partner',
      logo: '',
      websiteLink: '',
      description: ``,
    },
  ],

  officialMediaPartner2026: [
    {
      name: '',
      slug: 'cargo-insights',
      role: 'Official Media Partner',
      logo: '',
      websiteLink: '',
      description: ``,
    },
  ],

  transRussiaOfficialBank: [
    {
      name: '',
      slug: 'vtb-bank',
      role: 'TransRussia Official Bank',
      logo: '',
      websiteLink: '',
      description: ``,
    },
  ],

  wifiPartner: [
    {
      name: '',
      slug: 'rzd-business-asset',
      role: 'Wi-Fi Partner',
      logo: '',
      websiteLink: '',
      description: ``,
    },
  ],

  coOrganizer: [
    {
      name: '',
      slug: 'icctt',
      role: 'Co-organizer',
      logo: '',
      websiteLink: '',
      description: ``,
    },
  ],

  businessProgramPartner: [
    {
      name: '',
      slug: 'council-of-supply-chain-professionals',
      role: 'Business Programme Partner',
      logo: '',
      websiteLink: '',
      description: ``,
    },
  ],

  mediaPartners: [
    {
      name: '',
      slug: 'the-business-year',
      role: 'Media Partner',
      logo: '',
      websiteLink: '',
      description: ``,
    },
    {
      name: '',
      slug: 'itln',
      role: 'Media Partner',
      logo: '',
      websiteLink: '',
      description: ``,
    },
    {
      name: '',
      slug: 'apace-digital-cargo',
      role: 'Media Partner',
      logo: '',
      websiteLink: '',
      description: ``,
    },
  ],
};