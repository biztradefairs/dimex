'use client';

import React from 'react';
import SectionContainer from "@/components/UI/SectionContainer"
import { motion } from 'framer-motion';
import { partnersData, Partner as PartnerType } from '@/data/partnersData';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';

/* ===================== TYPES ===================== */

interface PartnerCardProps {
  partner: PartnerType;
  index: number;
}

interface PartnersSectionProps {
  title: string;
  partners: PartnerType[];
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

      <div className="flex grow flex-col justify-between bg-[#0E1C35] p-6 text-white lg:p-8">
        <div>
          <motion.h3 
            whileHover={{ scale: 1.02 }}
            className="text-xl lg:text-2xl font-semibold line-clamp-2 hover:text-blue-100 transition-colors duration-300"
          >
            {partner.name}
          </motion.h3>
          {partner.description && (
            <p className="mt-2 text-sm lg:text-base opacity-90 line-clamp-3">
              {partner.description.split('\n')[0]}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`/partner/${partner.slug}`}
          >
            <button className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 hover:bg-[#004D9F] hover:text-white transition-all duration-300 hover:shadow-lg">
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
              <button className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-[#004D9F] hover:text-white hover:shadow-lg">
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

/* ===================== MAIN COMPONENT ===================== */

const PartnersSponsorsPage: React.FC = () => {
  /* ===================== DATA ===================== */

  const sections = [
    {
      title: "Supporting Partner 2026",
      partners: partnersData.supportingPartner2026,
      key: "supporting"
    },
    {
      title: "Official Media Partner 2026",
      partners: partnersData.officialMediaPartner2026,
      key: "official-media"
    },
    {
      title: "TransRussia Official Bank",
      partners: partnersData.transRussiaOfficialBank,
      key: "official-bank"
    },
    {
      title: "Wi-Fi Partner",
      partners: partnersData.wifiPartner,
      key: "wifi"
    },
    {
      title: "Co-organizer of the TransRussia International Conference",
      partners: partnersData.coOrganizer,
      key: "co-organizer"
    },
    {
      title: "Business Programme Partner",
      partners: partnersData.businessProgramPartner,
      key: "business-program"
    },
    {
      title: "Media Partners",
      partners: partnersData.mediaPartners,
      key: "media-partners"
    },
  ];

  /* ===================== RENDER ===================== */

  return (
    <>
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
            className="mb-4 mt-20 text-4xl lg:text-4xl xl:text-5xl font-[600] text-black"
          >
            The organisations that power DIEMEX
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl text-lg lg:text-xl text-gray-600"
          >
            Discover our valued sponsors and partners who help make DIEMEX a success.
          </motion.p>
        </SectionContainer>
      </motion.section>

      {/* PARTNER SECTIONS */}
      {sections.map((section) => (
        <PartnersSection
          key={section.key}
          title={section.title}
          partners={section.partners}
          sectionKey={section.key}
        />
      ))}
    </div>
    <BackToTop/>
    </>
  );
};

export default PartnersSponsorsPage;