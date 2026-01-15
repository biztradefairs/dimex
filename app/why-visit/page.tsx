"use client";

import PartnersSection from "@/components/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import Link from "next/link"
import { motion } from 'framer-motion'

export default function WhyVisit() {
  // Animation variants
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

  return (
    <>
      <main className="bg-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-end">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/image.png)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
          <SectionContainer>
            <div className="relative z-10 pb-16 lg:pb-24">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 max-w-4xl"
              >
                Why Visit DIEMEX 2026
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl"
              >
               Discover a focused B2B platform bringing together die & mould manufacturers, tooling suppliers, and precision manufacturing technology providers. DIEMEX offers visitors the opportunity to explore new solutions, connect directly with exhibitors, and gain insights into trends shaping India’s manufacturing and automotive sectors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-white"
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-lg font-medium">08 – 10 October 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-lg font-medium">Auto Cluster Exhibition Centre,Pune, India</span>
                </div>
              </motion.div>
            </div>
          </SectionContainer>
        </section>

        {/* Main Content */}
        <div className="py-12 lg:py-20">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-white py-20 lg:py-28"
          >
            <SectionContainer>
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 max-w-10xl leading-tight">
                The Entire Die & Mould and Precision Manufacturing Ecosystem<br />
                Brought Together Under One Roof
              </h2>

              <p className="text-gray-700 text-[10] max-w-7xl mb-10 leading-relaxed">
               As India’s manufacturing sector continues to grow, DIEMEX provides a focused platform for the die & mould, tooling, and precision engineering community to connect, collaborate, and do business. The exhibition enables manufacturers, OEMs, and technology providers to meet potential partners, expand regional and international networks, exchange knowledge, and discover the latest innovations shaping the future of manufacturing.
              </p>
              <Link href='/contact-us'>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </SectionContainer>
          </motion.section>

          {/* Stats Grid */}
          <section className="bg-blue-50 py-20">
            <SectionContainer>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16"
              >
                {[
                  { value: "10,000", label: "Visitors" },
                  { value: "200+", label: "Exhibitors" },
                  { value: "5+", label: "Countries Represented" },
                  { value: "10", label: "Event Sectors" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "#ffffff",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }}
                    className="p-6 rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-6xl font-bold text-blue-700 mb-4 hover:text-blue-800 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <p className="text-lg text-gray-800 mb-6">{stat.label}</p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-px bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* GLOBAL LOGISTICS NETWORK */}
          <section className="relative bg-blue-50 py-20 lg:py-28 overflow-hidden">
            <div
              className="absolute inset-0 bg-no-repeat bg-center opacity-20"
              style={{ backgroundImage: "url(/images/world-map-dotted.png)" }}
            />

            <SectionContainer>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center max-w-4xl mx-auto"
              >
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 leading-tight">
                  Connect with the Die & Mould Manufacturing
                  <br />
                  Community at DIEMEX
                </h2>

                <p className="text-gray-600 text-lg lg:text-xl mb-10 leading-relaxed">
                 DIEMEX brings together die & mould manufacturers, tooling suppliers, and precision manufacturing solution providers from India and abroad, creating a focused platform for networking, collaboration, and business over three action-packed days.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300"
                >
                  Explore the Exhibitor list
                </motion.button>

                <div className="flex flex-wrap justify-center gap-4 mt-14">
                  {[
                    "JAPAN", "CHINA", "TAIWAN", "GERMANY", "INDIA"
              
                  ].map((country, index) => (
                    <motion.div
                      key={country}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -3, backgroundColor: "#eff6ff" }}
                      className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm text-gray-800 transition-all duration-300 cursor-pointer"
                    >
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                      {country}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </SectionContainer>
          </section>

          {/* WHY ATTEND TRANSRUSSIA */}
          <section className="py-20 lg:py-28 bg-white">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold mb-12"
              >
                Why Attend DIEMEX 2026
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {[
                  {
                    image: "/images/attend-1.jpg",
                    title: "Connect with Key Industry Players",
                    text: "DIEMEX offers a focused platform to meet die & mould manufacturers, tooling suppliers, and precision manufacturing solution providers from India and international markets—helping you connect with the right partners for your business."
                  },
                  {
                    image: "/images/attend-2.jpg",
                    title: "Discover The Latest Innovations",
                    text: "Visit DIEMEX to explore the newest developments in die & mould, tooling, and precision manufacturing technologies—and understand how they can enhance productivity, quality, and competitiveness."
                  },
                  {
                    image: "/images/attend-3.jpg",
                    title: "Build the Right Business Deals",
                    text: "Engage directly with manufacturers and technology suppliers to discuss requirements, evaluate solutions, and establish long-term business partnerships."
                  },
                  {
                    image: "/images/attend-4.jpg",
                    title: "Stay Ahead of Industry Trends",
                    text: "Gain insights into emerging technologies, market developments, and best practices through DIEMEX’s conference sessions led by industry experts."
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                    }}
                    className="relative h-[320px] lg:h-[360px] overflow-hidden rounded-lg transition-all duration-300"
                    style={{ backgroundImage: `url(${card.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
                    <div className="absolute bottom-0 p-6 lg:p-8 text-white max-w-md">
                      <h3 className="text-2xl font-bold mb-3 hover:text-blue-300 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* E-Brochure Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="py-16 lg:py-24"
          >
            <SectionContainer>
              <div className="relative rounded-2xl overflow-hidden px-8 py-12 lg:px-16 lg:py-16 text-white"
                style={{
                  backgroundImage: "url(/images/brochure-bg.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-blue-900/80"></div>
                <div className="relative flex flex-col gap-6">
                  <div className="max-w-4xl">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl lg:text-5xl font-bold mb-3"
                    >
                      Download Your Event Brochure
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/80 text-lg"
                    >
                      Get a comprehensive look at the event's attendees, the sectors on display,
                      and the key industry players present.
                    </motion.p>
                  </div>
                  <Link href='/event-brochure'>
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#f8fafc",
                        boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-900 border border-white px-8 py-3 rounded-full font-medium hover:bg-gray-100 whitespace-nowrap w-fit transition-all duration-300"
                    >
                      Download Now
                    </motion.button>
                  </Link>
                </div>
              </div>
            </SectionContainer>
          </motion.div>

          {/* Proven Success Stats */}
          <div className="mb-16 lg:mb-20">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white py-20 lg:py-28"
            >
              <SectionContainer>
                <h2 className="text-5xl lg:text-6xl font-bold mb-6 max-w-12xl leading-tight">
                  Proven Success: What Visitors Say About TransRussia
                </h2>

                <p className="text-gray-700 text-[10] max-w-8xl mb-10 leading-relaxed">
                  At TransRussia, we prioritise delivering value and creating impactful
                  experiences for our visitors. Our commitment to excellence is reflected
                  in the numbers.
                </p>
                <Link href='/post-show-report'>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-300"
                  >
                    Download Your Post-Show Report
                  </motion.button>
                </Link>
              </SectionContainer>
            </motion.section>

            <section className="bg-blue-50 py-10">
              <SectionContainer>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16"
                >
                  {[
                    { value: "98%", label: "Were Satisfied with the Exhibition" },
                    { value: "78%", label: "Only Attended TransRussia and SkaldTech Among Similar Exhibitions for Logistics" },
                    { value: "78%", label: "Sourced New Clients and Partners" },
                    { value: "63%", label: "Generated Quality Leads at the Show" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={scaleIn}
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#ffffff",
                        boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                      }}
                      className="p-6 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="text-6xl font-bold text-blue-700 mb-4 hover:text-blue-800 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <p className="text-lg text-gray-800 mb-6">{stat.label}</p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-px bg-gradient-to-r from-blue-400 to-blue-600"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </SectionContainer>
            </section>
          </div>

          {/* WHO IS TRANSRUSSIA FOR */}
          <section className="py-20 lg:py-28 bg-white">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold mb-12"
              >
                Who is TransRussia for?
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  [
                    "Supply Chain Directors",
                    "Logistics Strategy Managers",
                    "Freight Forwarders",
                    "Cargo Shipping Managers",
                    "Trucking Company Owners",
                    "Fleet Management Professionals",
                    "Port Authority Representatives"
                  ],
                  [
                    "Shipping Line Executives",
                    "Railway Logistics Managers",
                    "Cargo Train Operators",
                    "Airline Cargo Management Teams",
                    "Manufacturing Supply Chain Managers",
                    "Logistics Technology Managers",
                    "Transportation Policy Makers"
                  ],
                  [
                    "Customs and Border Control Officials",
                    "E-commerce Logistics Managers",
                    "Last-Mile Delivery Strategists",
                    "Distribution Center Managers",
                    "Import / Export Logistics Specialists",
                    "Transportation Infrastructure Planners",
                    "Financial and Other Service Providers"
                  ]
                ].map((list, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "#eff6ff",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }}
                    className="bg-blue-50 p-8 rounded-lg transition-all duration-300"
                  >
                    <ul className="space-y-4 text-gray-800">
                      {list.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.05 }}
                          whileHover={{ x: 5, color: "#1d4ed8" }}
                          className="flex items-center gap-2 transition-all duration-300 cursor-pointer"
                        >
                          <span className="text-blue-600">▪</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* A SNAPSHOT OF EXHIBITORS */}
          <section className="py-16 lg:py-24">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-8"
              >
                Who You Will Meet
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#f8fafc",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    }}
                    className="bg-gray-100 p-4 rounded-lg h-16 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-xs text-gray-500">Logo {i}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8"
              >
                {[9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "#f8fafc",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    }}
                    className="bg-gray-100 p-4 rounded-lg h-16 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-xs text-gray-500">Logo {i}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-300"
              >
                View Top 2024 Exhibitor List
              </motion.button>
            </SectionContainer>
          </section>

{/* EVENT SECTORS ON DISPLAY */}
<section className="py-20 lg:py-28 bg-white">
  <SectionContainer>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl lg:text-5xl font-bold mb-12"
    >
      Event Sectors On Display
    </motion.h2>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
    >
      {[
        { 
          title: "Equipment Suppliers", 
          slug: "warehouse-technology",
          image: "/images/image.png" 
        },
        { 
          title: "Ports & Terminals, Freight Handling Services In Ports", 
          slug: "ports-and-terminals-freight-handling-services-in-ports", 
          image: "/images/image.png" 
        },
        { 
          title: "Road Freight Transportation", 
          slug: "road-freight-transportation", 
          image: "/images/image.png" 
        },
        { 
          title: "Maritime & Inland Waterway Transport", 
          slug: "maritime-and-inland-waterway-transport", 
          image: "/images/image.png" 
        },
        { 
          title: "IT-Solutions", 
          slug: "it-solutions", 
          image: "/images/image.png" 
        },
        { 
          title: "Logistics, Distribution Centers & Terminals", 
          slug: "distribution-centers", // Changed to unique slug
          image: "/images/image.png" 
        },
        { 
          title: "Outsize & Heavy Lift Carriage (Breakbulk)", 
          slug: "heavy-lift-carriage", 
          image: "/images/image.png" 
        },
        { 
          title: "Complex Logistics Services & Freight Forwarding", 
          slug: "complex-logistics", 
          image: "/images/image.png" 
        }
      ].map((item, index) => (
        <Link
          key={`${item.slug}-${index}`} 
          href={`/sectors/${item.slug}`}
          className="block"
        >
          <motion.div
            variants={scaleIn}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 cursor-pointer h-full"
          >
            <div className="h-44 overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-900 text-sm font-medium leading-snug hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </p>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>

    <div className="text-center">
      <Link href='/sectors'>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-300"
        >
          Explore All the Event Sectors
        </motion.button>
      </Link>
    </div>
  </SectionContainer>
</section>

          {/* MORE THAN JUST AN EXHIBITION */}
          <section className="py-20 lg:py-28 bg-white">
            <SectionContainer>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex items-start justify-between mb-12"
              >
                <div className="max-w-3xl">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                    More Than Just an Exhibition
                  </h2>
                  <p className="text-gray-600 text-lg">
                    A blended experience of warehouse and logistics exhibition with learning
                    and staying on top of trends through experts and industry leaders
                  </p>
                </div>

                <div className="hidden md:flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-all duration-300"
                  >
                    ←
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#1d4ed8" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center transition-all duration-300"
                  >
                    →
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {[
                  {
                    title: "Conference Programme",
                    text: "6 industry conferences with the most useful and relevant information to help solve your business problems, all the way from trends taking place in the industry to the prospects of development of the warehouse, transport and logistics industry.",
                    image: "/images/more/conference.jpg"
                  },
                  {
                    title: "TransRussia Summit",
                    text: "A platform that brings market professionals and leading analysts on one stage to help everyone in the warehouse, transport and logistics industry to stay on top of trends of a dynamically changing industry.",
                    image: "/images/more/summit.jpg"
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                    }}
                    className="rounded-xl overflow-hidden border border-gray-200 transition-all duration-300"
                  >
                    <div className="bg-blue-950 text-white p-6 lg:p-8">
                      <h3 className="text-xl lg:text-2xl font-bold mb-3 hover:text-blue-300 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-base leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                    <div className="h-64 lg:h-72 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* QUICK NAVIGATION */}
          <section className="py-16 lg:py-24">
            <SectionContainer>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-sm text-blue-600 font-semibold mb-2"
              >
                Simplifying Your Participation Journey
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-12"
              >
                Quick Navigation
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  {
                    icon: "📦",
                    number: "01",
                    title: "Become an Exhibitor",
                    description: "Join 600+ exhibitors in presenting your solutions for 3 days for unmatched networking opportunities.",
                    buttonText: "Become an Exhibitor",
                    href: "/exhibiting-enquiry"
                  },
                  {
                    icon: "📘",
                    number: "02",
                    title: "Download Event Brochure",
                    description: "Find out what we and how our brochure has the key information to prepare up to date brochure.",
                    buttonText: "Download Now",
                    href: "/event-brochure"
                  },
                  {
                    icon: "👥",
                    number: "03",
                    title: "Become a Visitor",
                    description: "Why not visit the market? Why not visit the show and what to expect for the following edition.",
                    buttonText: "Visitor Registration",
                    href: "/visitor-registration"
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      backgroundColor: "#f8fafc"
                    }}
                    className="border border-gray-200 rounded-lg p-8 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">{card.icon}</span>
                      </div>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        className="text-3xl font-bold text-gray-300"
                      >
                        {card.number}
                      </motion.span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 hover:text-blue-600 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-6">{card.description}</p>
                    <Link href={card.href}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition-all duration-300"
                      >
                        {card.buttonText}
                      </motion.button>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* WHERE & WHEN */}
          <section className="py-16 lg:py-24">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-12"
              >
                When and Where
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(37, 99, 235, 0.1)" }}
                  className="bg-blue-50 p-8 rounded-lg transition-all duration-300"
                >
                  <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Venue</h3>
                  <p className="text-gray-800 font-medium text-lg">Rosaski, Moscov, Crocus Expo IEC, Pavilion 3</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(37, 99, 235, 0.1)" }}
                  className="bg-blue-50 p-8 rounded-lg transition-all duration-300"
                >
                  <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Opening Hours</h3>
                  <p className="text-gray-800 font-medium text-lg">12-16 March 2026, 10:00 -18:00</p>
                  <p className="text-gray-800 font-medium text-lg">19 March 2026, 10:00 -18:00</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                className="bg-gray-200 rounded-lg h-64 lg:h-80 overflow-hidden transition-all duration-300"
              >
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.8743484199996!2d37.51654!3d55.61139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53a9e6c8c1111%3A0x1234567890ab!2sCrocus%20Expo%2C%20Moscow!5e0!3m2!1sen!2sru"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </SectionContainer>
          </section>

          <section className="py-16 lg:py-24">
            <SectionContainer>
              <PartnersSection />
            </SectionContainer>
          </section>
        </div>
      </main>
    </>
  )
}
