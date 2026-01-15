// app/partners-and-sponsors/page.tsx
'use client';

import React from 'react';
import SectionContainer from "@/components/UI/SectionContainer"
import { motion } from 'framer-motion';

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
  index: number;
}

interface PartnersSectionProps {
  title: string;
  partners: Partner[];
  sectionKey: string;
}

/* ===================== ANIMATION VARIANTS ===================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

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

  const PartnerCard: React.FC<PartnerCardProps> = ({ partner, index }) => {
    return (
      <motion.div
        variants={scaleIn}
        whileHover={{ 
          y: -10,
          boxShadow: "0 20px 40px rgba(37, 99, 235, 0.15)",
          transition: { duration: 0.3 }
        }}
        className="flex flex-col overflow-hidden rounded-xl border border-blue-600 transition-all duration-300 lg:flex-row"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex h-48 w-full items-center justify-center border-b border-blue-600 py-8 lg:h-auto lg:w-1/3 lg:border-b-0 lg:border-r bg-white"
        >
          <div className="h-32 w-32 lg:h-40 lg:w-40">
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              className="h-full w-full object-contain p-2 transition-transform duration-300 hover:scale-110"
            />
          </div>
        </motion.div>

        <div className="flex grow flex-col justify-between bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white lg:p-8">
          <div>
            <motion.h3 
              whileHover={{ scale: 1.02 }}
              className="text-xl lg:text-2xl font-semibold line-clamp-2 hover:text-blue-100 transition-colors duration-300"
            >
              {partner.name}
            </motion.h3>
            {partner.description && (
              <p className="mt-2 text-sm lg:text-base opacity-90">
                {partner.description}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={partner.exploreLink}
            >
              <button className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg">
                Explore
              </button>
            </motion.a>

            {partner.websiteLink && (
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={partner.websiteLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg">
                  Visit Website
                </button>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const PartnersSection: React.FC<PartnersSectionProps> = ({
    title,
    partners,
    sectionKey
  }) => {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-12 lg:py-20"
      >
        <SectionContainer>
          <motion.h2
            whileHover={{ scale: 1.01 }}
            className="mb-10 text-3xl lg:text-4xl xl:text-5xl font-semibold text-black"
          >
            {title}
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {partners.map((partner, index) => (
              <PartnerCard
                key={`${sectionKey}-${index}`}
                partner={partner}
                index={index}
              />
            ))}
          </motion.div>
        </SectionContainer>
      </motion.section>
    );
  };

  /* ===================== RENDER ===================== */

  return (
    <div className="">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-gray-50 to-white py-16 lg:py-24 mb-12"
      >
        <SectionContainer>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 mt-20 text-4xl lg:text-4xl xl:text-5xl font-[600]"
          >
            The organisations that power DIEMEX

          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl text-lg lg:text-xl text-gray-500"
          >
Discover our valued sponsors and partners who help make DIEMEX a success.          </motion.p>
        </SectionContainer>
      </motion.section>

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
  );
};

export default PartnersSponsorsPage;
