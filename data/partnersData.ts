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
  supportingPartner: [
    {
      name: 'IDEMI',
      slug: 'idemi',
      role: 'Supporting Partner',
      logo: 'images/partners/idemi.png',
      websiteLink: 'https://www.idemi.org/',
      description: `IDEMI is an Organization established by the Government Of India Society in the year 1969 as a service to Instrument Industry Organisation. The main objective of setting up this Institute was to gear up the growth potential of indigenous instrument industry and hence to meet the ever growing instrumentation needs of the country by augmenting productivity quality control in industrial sector – be it in Electrical, Electronics or Process Control Instruments. The Institute is looked upon a nodal centre in view of its multifarious activities offered to suit various needs of instrument industry.`,
    },
  ],

  officialMediaPartner: [
    {
      name: '',
      slug: 'cargo-insights',
      role: 'Official Media Partner',
      logo: 'images/partners/idemi.png',
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