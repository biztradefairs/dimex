// app/about-skladtech/page.tsx
"use client";

import PartnersSection from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import Link from "next/link"
import { motion, Variants } from 'framer-motion'

export default function AboutSkladTechPage() {
  const exhibitors = [
    "Trans Net.",
    "AL BAYAN",
    "MARMED CONTAINER SERVICES",
    "Eagleway Cargo",
    "BORERS",
    "GillcoScal, L. Calymonte",
    "SONTIZAR",
    "康泽远",
    "SARIAK",
    "CONTAINER LINES OF MARRISTSELL SISTERS",
    "1KARGO",
    "PROJECTS, EXPOINT ORGANICS",
    "AERO FREIGHT",
    "pak.shahcen (Prt.) Ltd.",
    "CARAVAN LOGISTICS",
    "ONE TOUCH TOUCH & MOUNTERS",
    "ACT PARBO",
    "PTC HOLDING"
  ];

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
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
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

  const floatAnimation: Variants = {
    initial: { y: 0 },
    animate: { 
      y: [-5, 5, -5],
      transition: { 
        duration: 3, 
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}

            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/image.png)" }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />

          <SectionContainer>
            <div className="relative z-10 min-h-[600px] flex flex-col justify-end pb-24 text-white">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-5 text-4xl lg:text-5xl xl:text-6xl font-bold"
              >
                About SkladTech
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl lg:text-2xl text-white/90"
              >
                The Commercial Heart of Warehousing Solutions.
              </motion.p>
            </div>
          </SectionContainer>
        </section>

        {/* Where Warehousing Solutions Come to Life */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="max-w-8xl"
            >
              <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
                Where Warehousing Solutions Come to Life
              </h2>
              <p className="mb-8 text-lg lg:text-xl text-gray-700">
                SkladTech is Eurasia's premier exhibition dedicated to advanced warehouse equipment and technologies. Held alongside TransRussia, the country's largest transport and logistics exhibition, SkladTech serves as a specialized platform for showcasing cutting-edge solutions in storage systems, material handling, automation, and inventory management.
              </p>
              <Link href='/exhibiting-enquiry'>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium transition-all duration-300"
                >
                  Enquire to Exhibit
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 py-12 px-8 rounded-2xl"
            >
              {[
                { number: "13,900+", label: "Attendees" },
                { number: "7,300+", label: "First Time Attendees" },
                { number: "34", label: "Countries Represented" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  className="text-center p-6 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600"
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-lg text-gray-700">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </SectionContainer>
        </section>

        {/* Exhibiting Sectors */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-8xl"
            >
              <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
                Exhibiting Sectors
              </h2>
              <p className="mb-12 text-lg lg:text-xl text-gray-700">
                SkladTech showcases automation, robotics, inventory systems, and supply chain optimization, bringing cutting-edge solutions to warehousing. Explore advanced storage, IoT tech, and sustainable logistics while connecting with industry leaders shaping the future.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {sectors.map((sector, index) => (
                <motion.a
                  key={index}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                  }}
                  href={sector.href}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300"
                >
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${sector.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-white p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {sector.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Link href='/sectors'>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium transition-all duration-300"
                >
                  Explore Our Event Sectors
                </motion.button>
              </Link>
            </motion.div>
          </SectionContainer>
        </section>

        {/* Download Event Brochure */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromRight}
          className="py-16 lg:py-24"
        >
          <div className="mx-auto max-w-[1440px] px-4">
            <div
              className="relative rounded-2xl overflow-hidden px-8 py-12 lg:px-16 lg:py-16 text-white"
              style={{
                backgroundImage: "url(/images/brochure-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-blue-900/80"></div>

              {/* Content */}
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
          </div>
        </motion.div>

        {/* Meet the Visionaries */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-8xl"
            >
              <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
                Meet the Visionaries Transforming Warehousing and Logistics
              </h2>
              <p className="mb-8 text-lg lg:text-xl text-gray-700">
                SkladTech unites decision-makers, industry leaders, and innovators in warehouse technology and logistics. Attendees explore cutting-edge solutions, forge partnerships, and optimize operations—shaping the future of warehousing.
              </p>
              <Link href='post-show-report'>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium transition-all duration-300"
                >
                  Discover Key Visitor Insights – Download the Post-Show Report
                </motion.button>
              </Link>
            </motion.div>

            {/* Visitor Stats */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 py-12 px-8 rounded-2xl"
            >
              {[
                { number: "48%", label: "Transportation, Forwarding, Storage" },
                { number: "40%", label: "Cargo owners (manufacturing, wholesale trade, retail)" },
                { number: "12%", label: "IT-solutions, Insurance, Foreign Trade Agencies, Industry Ministries, Associations, Mass Media" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  className="text-center p-6 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600"
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-lg text-gray-700">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </SectionContainer>
        </section>

        {/* Exhibitors Section */}
        <div className="container py-16 lg:py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="title-72 text-black mb-6"
          >
            A Snapshot of Our 2025 Exhibitors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="title-40 font-semibold text-gray-700 mb-12 lg:mb-16"
          >
            Participating in TransRussia Boosts Your Business Growth and Visibility
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-12 lg:mb-16"
          >
            {exhibitors.map((exhibitor, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  y: -5,
                  backgroundColor: "#ffffff",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  borderColor: "#3b82f6"
                }}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 flex items-center justify-center min-h-[100px] transition-all duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <span className="text-gray-800 font-medium text-sm md:text-base hover:text-blue-600 transition-colors duration-300">
                    {exhibitor}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/exhibitor-list" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(37, 99, 235, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="flex-start group w-fit gap-3 overflow-hidden rounded-full px-10 py-4 font-jakarta text-[18px] font-semibold global-transition bg-blue-700 text-white hover:bg-mainColor4 hover:shadow-xl transition-all duration-300"
              >
                View Our 2026 Exhibitor List
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* When and Where */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold mb-12"
            >
              Here's Where You Can Find Us!
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {/* Venue */}
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

              {/* Opening Hours */}
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

            {/* Map */}
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
          </div>
        </section>

        {/* Travel Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={floatAnimation}
          className="relative py-40"
        >
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/image.png)" }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          <SectionContainer>
            <div className="relative z-10 text-center text-white">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold"
              >
                SkladTech Awaits
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mx-auto mb-8 max-w-2xl text-lg lg:text-xl text-white/90"
              >
                Whether you're traveling from across the globe or nearby, we've got you covered. 
                Find all the essential information to ensure a smooth and hassle-free trip to SkladTech 2026.
              </motion.p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#f8fafc",
                  boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium transition-all duration-300"
              >
                Plan Your Travel
              </motion.button>
            </div>
          </SectionContainer>
        </motion.section>

        {/* Quick Navigation */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-2 flex items-center gap-2"
                >
                  <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                  <span className="font-semibold">TransRussia / Skladtech</span>
                </motion.div>
                <h2 className="mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
                  Quick Navigation
                </h2>
                <p className="text-lg lg:text-xl text-gray-700">
                  Simplifying Your Participation Journey
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {navigationCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    backgroundColor: "#f8fafc"
                  }}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
                    <motion.span 
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-2xl font-bold text-blue-600"
                    >
                      0{index + 1}
                    </motion.span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
                  <p className="mb-6 text-gray-600 text-lg">{card.description}</p>
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
        <PartnersSection/>
      </div>
    </>
  )
}

// Data
const sectors = [
  {
    title: "Engineering Systems and Service Equipment",
    href: "/sectors/engineering-systems-and-service-equipment",
    image: "/images/image.png",
  },
  {
    title: "Lifting and Transporting Equipment",
    href: "/sectors/lifting-and-transporting-equipment",
    image: "/images/image.png",
  },
  {
    title: "Packaging and Order Picking",
    href: "/sectors/packaging-and-order-picking",
    image: "/images/image.png",
  },
  {
    title: "Warehouse Automation Systems",
    href: "/sectors/warehouse-automation",
    image: "/images/image.png",
  },
  {
    title: "Warehousing and Shelving Systems",
    href: "/sectors/warehousing-systems",
    image: "/images/image.png",
  },
]

const navigationCards = [
  {
    title: "Become an Exhibitor",
    description: "Connect with 30,000+ logistics professionals across 3 days for unparalleled networking opportunities.",
    buttonText: "Book a Stand",
    href: "/exhibiting-enquiry",
  },
  {
    title: "Download Your Event Brochure",
    description: "Find out who we are, what we do, and how best we can help you achieve your strategic business goals all wrapped up in our concise event brochure.",
    buttonText: "Download Now",
    href: "/event-brochure",
  },
  {
    title: "Become a Visitor",
    description: "Not ready to become an exhibitor? Why not visit the exhibition for free and find out what to expect for the following edition",
    buttonText: "Visitor Registration",
    href: "/visitor-registration",
  },
]