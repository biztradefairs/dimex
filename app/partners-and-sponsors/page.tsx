// app/partners-and-sponsors/page.tsx
'use client';

import React from 'react';

import SectionContainer from "@/components/UI/SectionContainer"

/* ===================== TYPES ===================== */

interface Partner {
  name: string;
  role: string;
  logo: string;
  exploreLink: string;
  websiteLink?: string;
  description?: string;
}

interface PartnerCardProps {
  partner: Partner;
}

interface PartnersSectionProps {
  title: string;
  partners: Partner[];
  sectionKey: string;
}

/* ===================== MAIN COMPONENT ===================== */

const PartnersSponsorsPage: React.FC = () => {
  /* ===================== DATA ===================== */

  const partnersData: Record<string, Partner[]> = {
    supportingPartner2026: [
      {
        name: 'ICIB',
        role: 'Supporting Partner',
        logo: 'https://cdn.itegroupnews.com/thumbnail_ICIB_Logo_24_834a8e19c7.jpg',
        exploreLink: '/partner/trans-russia-partner-3/',
        websiteLink: 'http://www.icib.org.in/',
        description: 'Supporting Partner',
      },
    ],
    officialMediaPartner2026: [
      {
        name: 'Cargo Insights',
        role: 'Official Media Partner',
        logo: 'https://cdn.itegroupnews.com/Cargo_Insights_e965193be1.webp',
        exploreLink: '/partner/cargo-insights/',
        websiteLink: 'https://cargoinsights.co/',
        description: 'Official Media Partner',
      },
    ],
    transRussiaOfficialBank: [
      {
        name: 'VTB',
        role: 'TransRussia Official Bank',
        logo: 'https://cdn.itegroupnews.com/VTB_16f0fc5875.webp',
        exploreLink: '/partner/vtb/',
        websiteLink: 'https://www.vtb.ru/',
        description: 'TransRussia Official Bank',
      },
    ],
    wifiPartner: [
      {
        name: 'RZD Business Asset',
        role: 'Wi-Fi Partner',
        logo: 'https://cdn.itegroupnews.com/RZD_Business_Asset_aca7ff2f81.webp',
        exploreLink: '/partner/rzd-business-asset/',
        websiteLink: 'https://www.rzd-partner.ru/',
        description: 'General Media Partner',
      },
    ],
    coOrganizer: [
      {
        name: 'International Coordinating Council for Trans-Eurasian Transportation',
        role: 'Co-organizer',
        logo: 'https://cdn.itegroupnews.com/International_Coordinating_for_Trans0_Eurasian_Transportation_965b26881c.webp',
        exploreLink: '/partner/international-coordinating-council-for-trans-eurasian-transportation/',
        websiteLink: 'https://icctt.com/',
      },
    ],
    businessProgramPartner: [
      {
        name: 'The Council of Supply Chain Professionals',
        role: 'Business Programme Partner',
        logo: 'https://cdn.itegroupnews.com/Council_of_Supply_Chain_Professinoals_03e79f3b06.webp',
        exploreLink: '/partner/the-council-of-supply-chain-professionals/',
        websiteLink: 'https://scmpro.ru/',
        description: 'Business Programme Partner',
      },
    ],
    mediaPartners: [
      {
        name: 'The Business Year',
        role: 'Media Partner',
        logo: 'https://cdn.itegroupnews.com/The_Business_Year_e20d1c0f9f.png',
        exploreLink: '/partner/the-business-year/',
        websiteLink: 'https://thebusinessyear.com/',
      },
      {
        name: 'Indian Transport & Logistics News (ITLN)',
        role: 'Media Partner',
        logo: 'https://cdn.itegroupnews.com/logo_bedd7fc0a0.png',
        exploreLink: '/partner/indian-transport-and-logistics-news-itln/',
        websiteLink: 'https://www.itln.in/',
      },
      {
        name: 'Apace Digital Cargo',
        role: 'Media Partner',
        logo: 'https://cdn.itegroupnews.com/APACE_Digital_Cargo_523bc2c2a2.webp',
        exploreLink: '/partner/apace-digital-cargo/',
        websiteLink: 'https://apacedigitalcargo.com/',
      },
    ],
  };

  /* ===================== COMPONENTS ===================== */

  const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
    return (
      <div className="flex flex-col overflow-hidden rounded-xl border border-blue-600 transition-all duration-300 hover:shadow-xl lg:flex-row">
        <div className="flex h-48 w-full items-center justify-center border-b border-blue-600 py-8 lg:h-auto lg:w-1/3 lg:border-b-0 lg:border-r">
          <div className="h-32 w-32 lg:h-40 lg:w-40">
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              className="h-full w-full object-contain p-2"
            />
          </div>
        </div>

        <div className="flex grow flex-col justify-between bg-blue-600 p-6 text-white lg:p-8">
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold line-clamp-2">
              {partner.name}
            </h3>
            {partner.description && (
              <p className="mt-2 text-sm lg:text-base opacity-90">
                {partner.description}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={partner.exploreLink}>
              <button className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-700 hover:text-white">
                Explore
              </button>
            </a>

            {partner.websiteLink && (
              <a href={partner.websiteLink} target="_blank" rel="noopener noreferrer">
                <button className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-700 hover:text-white">
                  Visit Website
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PartnersSection: React.FC<PartnersSectionProps> = ({
    title,
    partners,
  }) => {
    return (
      <section className="py-12 lg:py-20">
        <SectionContainer>
          <h2 className="mb-10 text-3xl lg:text-4xl xl:text-5xl font-semibold text-black">
            {title}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <PartnerCard
                key={index}
                partner={partner}
              />
            ))}
          </div>
        </SectionContainer>
      </section>
    );
  };

  /* ===================== RENDER ===================== */

  return (
    <>

      <div className="">
        {/* HERO */}
        <section className="bg-gray-50 py-16 lg:py-24 mb-12">
          <SectionContainer>
            <h1 className="mb-4 mt-20 text-4xl lg:text-4xl xl:text-5xl font-[600]">
              The legendary organisations that help bring TransRussia to life
            </h1>
            <p className="max-w-4xl text-lg lg:text-xl text-gray-500">
              You find all our sponsors and partners on this page
            </p>
          </SectionContainer>
        </section>

        <PartnersSection
          title="Supporting Partner 2026"
          partners={partnersData.supportingPartner2026}
          sectionKey="supporting"
        />

        <PartnersSection
          title="Official Media Partner 2026"
          partners={partnersData.officialMediaPartner2026}
          sectionKey="official-media"
        />

        <PartnersSection
          title="TransRussia Official Bank"
          partners={partnersData.transRussiaOfficialBank}
          sectionKey="official-bank"
        />

        <PartnersSection
          title="Wi-Fi Partner"
          partners={partnersData.wifiPartner}
          sectionKey="wifi"
        />

        <PartnersSection
          title="Co-organizer of the TransRussia International Conference"
          partners={partnersData.coOrganizer}
          sectionKey="co-organizer"
        />

        <PartnersSection
          title="Business Programme Partner"
          partners={partnersData.businessProgramPartner}
          sectionKey="business-program"
        />

        <PartnersSection
          title="Media Partners"
          partners={partnersData.mediaPartners}
          sectionKey="media-partners"
        />
      </div>

    </>
  );
};

export default PartnersSponsorsPage;