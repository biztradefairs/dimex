// app/about-ite/page.tsx
"use client";

import React from 'react';
import SectionContainer from "@/components/UI/SectionContainer";
import { motion, Variants } from "framer-motion";
import ExhibitionsGlance from './ExhibitionsGlance';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';

const AboutITEPage: React.FC = () => {
  // Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};


const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

  return (
    <>
      <div className="min-h-screen bg-white overflow-hidden font-parabolica">
        {/* Hero Section */}
        <section className="relative flex flex-col justify-end bg-gray-100">
          <SectionContainer>
            <div className="flex flex-col justify-end pt-0 pb-10 mt-40">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4">
                  Maxx Business Media
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p className="max-w-6xl text-lg lg:text-xl text-gray-700 py-5">
                  Organising India's largest industry exhibitions since 2019
                </p>
              </motion.div>
            </div>
          </SectionContainer>
        </section>

        {/* About Us Section */}
        <section className="relative min-h-screen flex items-center py-16 lg:py-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}

              className="h-full w-full bg-cover bg-center grayscale"
              style={{ backgroundImage: "url(/images/image.png)" }}
            />
          </div>

          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInFromRight}
              className="relative z-10 ml-auto w-full max-w-5xl rounded-3xl bg-white px-10 py-12 lg:px-14 lg:py-14 shadow-2xl hover:shadow-3xl transition-shadow duration-500"
            >
              {/* Heading */}
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 text-5xl lg:text-6xl font-bold text-black"
              >
                About Us
              </motion.h2>

              {/* Description */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-6 text-gray-700 text-base lg:text-lg leading-relaxed"
              >
                <motion.p variants={fadeInUp}>
             Maxx Business Media Pvt. Ltd. is a leading B2B business events and media company based in India, 
                  dedicated to creating powerful platforms that connect industries, innovators, and decision-makers. 
                  Since its inception, Maxx Business Media has been organizing high-impact trade exhibitions, conferences, 
                  and industry-focused initiatives across key manufacturing and emerging sectors.
                </motion.p>

                <motion.p variants={fadeInUp}>
                 Every year, we deliver multiple flagship exhibitions, summits, and industry forums that serve as 
                  catalysts for business growth, technology exchange, and market expansion. Supported by our integrated 
                  digital and media ecosystem, we offer year-round visibility and engagement opportunities for exhibitors, 
                  advertisers, and industry partners.
                </motion.p>

                <motion.p variants={fadeInUp}>
               With a strong network of international agents, industry associations, government bodies, and strategic partners, 
                  Maxx Business Media facilitates meaningful global–local connections, enabling companies to access new markets,
                  buyers, and collaborations across India and overseas.
                </motion.p>

                <motion.p variants={fadeInUp}>
Our events drive industrial development, support export growth, and provide unmatched access to targeted business audiences. 
                  By combining exhibitions, conferences, awards, digital platforms, and trade publications, we create comprehensive 
                  solutions for networking, branding, and professional advancement—while fostering constructive dialogue between industry stakeholders and policymakers.  

                  Maxx Business Media operates with a pan-India presence and an expanding international footprint, serving as a trusted partner to industries seeking sustainable growth and global relevance.
                
                </motion.p>
              </motion.div>

              {/* Stats Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-12 flex gap-x-32"
              >
                {/* LEFT COLUMN */}
                <div className="flex w-1/2 flex-col gap-10">
                  {[
                    { number: "1 Mil+", label: "Database" },
                    { number: "10,000+", label: "Visitors Per Year" },
                    { number: "500+", label: "Exhibitors Per Year" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="group cursor-pointer"
                    >
                      <h3 className="text-4xl font-bold text-black group-hover:text-blue-600 transition-colors duration-300">
                        {stat.number}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex w-1/2 flex-col gap-10">
                  {[
                    { number: "1,700+", label: "Media in Attendance" },
                    { number: "30", label: "Events" },
                    { number: "20+", label: "Industry Sectors" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, x: -5 }}
                      className="group cursor-pointer"
                    >
                      <h3 className="text-4xl font-bold text-black group-hover:text-blue-600 transition-colors duration-300">
                        {stat.number}
                      </h3>
                      <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* Mission, Vision, Values Carousel */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-10 lg:mb-16"
            >
              <div className="lg:flex lg:justify-between lg:items-end">
                <div className="lg:basis-2/3">
                  <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4">
                    Working for Your Success
                  </h2>
                  <p className="whitespace-pre-line text-gray-700 text-base lg:text-lg leading-relaxed">
At Maxx Business Media, our mission is to create powerful B2B platforms that accelerate business growth, showcase innovation, and connect industry leaders. Through , conferences, and media initiatives, we enable meaningful engagement and measurable opportunities that help our clients succeed in competitive markets.                  </p>
                </div>
              </div>
            </motion.div>

            {/* Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "Our Mission",
                  description: "To create high-impact B2B platforms that drive business success, accelerate industry growth, and contribute to the development of strong and sustainable economies.",
                  image: "/images/image.png"
                },
                {
                  title: "Our Vision",
                  description: "To be a trusted global connector, enabling businesses to engage, collaborate, and build long-term partnerships year-round—through both physical events and digital platforms.",
                  image: "/images/image.png"
                },
                {
                  title: "Our Values",
                  description: "Entrepreneurship, Integrity, Excellence, Positive Thinking, Commitment to Result",
                  image: "/images/image.png"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="flex flex-col overflow-hidden rounded-lg bg-gray-900 text-white group cursor-pointer"
                >
                  <div className="flex flex-col gap-5 p-6">
                    <motion.h2 
                      className="text-2xl lg:text-3xl font-semibold line-clamp-1 group-hover:text-blue-300 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {card.title}
                    </motion.h2>
                    <div className="h-36">
                      <p className="line-clamp-6 whitespace-pre-line text-gray-200 text-base lg:text-lg group-hover:text-white transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative h-64 lg:h-96 overflow-hidden">
                      <motion.div 
                        className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                        style={{ backgroundImage: `url(${card.image})` }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </SectionContainer>
        </section>
        <ExhibitionsGlance/>

        {/* Exhibitions Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex w-full items-end justify-between gap-5 flex-wrap lg:gap-20 mb-10"
            >
              
            </motion.div>
          </SectionContainer>
        </section>
      </div>
      <BackToTop/>
    </>
  );
};

export default AboutITEPage;