// app/why-exhibit/page.tsx - UPDATED WITH NEW LAYOUT
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PartnersSection from "@/components/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import Image from "next/image";
import Link from "next/link"
import { motion } from 'framer-motion'

export default function WhyExhibit() {
  const testimonials = [
    {
      logo: "🎯",
      text: "We participate and will continue to participate at TransRussia because of the year-on-year growth",
      author: "ALEXEY KRAVCHENKO",
      company: "Sales Director, FESCO",
    },
    {
      logo: "🚢",
      text: "TransRussia delivers consistent high-quality leads and long-term partnerships.",
      author: "IVAN PETROV",
      company: "Head of Logistics, GlobalTrans",
    },
  ]
  
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

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
        {/* HERO SECTION */}
        <section className="relative min-h-screen bg-cover bg-center flex items-center justify-start">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/images/image.png)",
            }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <SectionContainer>
            <div className="relative z-10 text-white pt-32 mt-70">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl lg:text-6xl xl:text-5xl font-bold mb-6 leading-tight"
              >
                Unlock New Opportunities at TransRussia
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl text-white mb-4 max-w-4xl"
              >
                Discover new possibilities at TransRussia 2026. Be where the logistics industry gathers to innovate,
                collaborate, and be at the forefront of logistics excellence.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 text-white mb-8"
              >
                <span className="flex items-center gap-2">📅 17 - 19 March 2026</span>
                <span className="flex items-center gap-2">📍 Crocus Expo, Moscow</span>
              </motion.div>
              <Link href="/exhibiting-enquiry">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                >
                  Enquire to Exhibit
                </motion.button>
              </Link>
            </div>
          </SectionContainer>
        </section>

        {/* WHERE TRANSPORT COMES TOGETHER */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Where the Transport & Logistics Industry Comes Together</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  TransRussia is a prime gateway to tap into the thriving logistics and transport sector within one of the
                  world's largest economies.
                </p>
                <p className="text-gray-700 mb-8 text-lg">
                  With Russia's strategic location and a market size of over 145 million people, the country presents
                  significant growth potential for companies looking to expand their operations and optimize supply
                  chains.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
                    <motion.span
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="text-[#4D4D4D] text-[20px] cursor-pointer"
                    >
                      <strong>30,500 Visitors</strong>
                    </motion.span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
                    <motion.span
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="text-[#4D4D4D] text-[20px] cursor-pointer"
                    >
                      <strong>600+ Exhibitors</strong>
                    </motion.span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
                    <motion.span
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="text-[#4D4D4D] text-[20px] cursor-pointer"
                    >
                      <strong>50+ Countries Represented</strong>
                    </motion.span>
                  </li>
                </ul>

                <Link href="/exhibiting-enquiry">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                  >
                    Enquire to Exhibit
                  </motion.button>
                </Link>
              </div>

              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                className="relative h-96 rounded-lg overflow-hidden transition-all duration-300"
              >
                <img
                  src="/images/image.png"
                  alt="Conference"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white text-3xl font-bold"
                  >
                    Conference Highlights
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* REASONS TO EXHIBIT */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <SectionContainer>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12"
            >
              <div className="mb-8 lg:mb-0">
                <h3 className="text-sm text-blue-600 font-semibold mb-2">Key Benefits</h3>
                <h2 className="text-4xl lg:text-5xl font-bold">Reasons Why You Should Exhibit</h2>
              </div>
            </motion.div>

            <p className="text-gray-700 mb-8 max-w-7xl text-lg">
              TransRussia provides an unmatched platform for professionals in the transportation and logistics sector to
              present cutting-edge solutions to a qualified audience of industry leaders and decision-makers.
            </p>
            <p className="text-gray-700 mb-12 max-w-7xl text-lg">
              With budgets dedicated to optimising supply chains and expanding operational efficiency, exhibiting at
              TransRussia offers you the opportunity to make valuable connections, establish strategic partnerships, and
              drive growth in a competitive market.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            >
              {[
                {
                  title: "Want to grow internationally?",
                  text: "Connect with buyers and partners from over 50 countries who attend TransRussia to discover global solutions."
                },
                {
                  title: "Struggling to measure impact?",
                  text: "TransRussia delivers tangible results, from new leads to direct sales and strengthened partnerships."
                },
                {
                  title: "Facing challenges entering the market?",
                  text: "Gain direct access to decision-makers and partners across Eurasia's logistics and transportation sectors."
                },
                {
                  title: "Concerned about the cost and complexity of logistics in Eurasia?",
                  text: "Meet partners to simplify your supply chain and operations."
                },
                {
                  title: "Need better lead generation?",
                  text: "Build a pipeline of leads from industries such as freight forwarding, manufacturing, and e-commerce logistics."
                },
                {
                  title: "Is your brand struggling to get noticed?",
                  text: "Showcase your unique solutions in front of a targeted audience in a competitive environment."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    backgroundColor: "#ffffff",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white p-8 border-gray-200 rounded-lg transition-all duration-300 cursor-pointer"
                >
                  <h3 className="font-bold text-xl lg:text-2xl mb-4 hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <Link href='/exhibiting-enquiry'>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
              >
                Enquire to Exhibit
              </motion.button>
            </Link>
          </SectionContainer>
        </section>

        {/* WHY EXPAND TO CIS */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <SectionContainer>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-12"
            >
              Why Expand to the CIS?
            </motion.h2>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center"
            >
              {[
                {
                  title: "$88.38 Billion by 2024",
                  text: "Russia's logistics market is on track to reach an estimated $88.38 billion, supported by a resilient economy with a GDP surpassing $2 trillion."
                },
                {
                  title: "Growth in Demand",
                  text: "As the Russian economy rebounds and the regional security landscape becomes more complex, there's a growing need for cutting-edge solutions in surveillance."
                },
                {
                  title: "$108.78 Billion by 2029",
                  text: "As Russia's logistics landscape continues to expand, the market is forecasted to reach $108.78 billion by 2029, offering leading demand for investment and innovation in the world's largest projects."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                    transition: { duration: 0.3 }
                  }}
                  className="relative w-[466px] h-[500px] overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    src="/images/image.png"
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40 p-8 hover:bg-black/70 transition-all duration-300">
                    <div className="text-white h-full flex flex-col justify-end">
                      <h3 className="text-2xl lg:text-3xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-lg">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </SectionContainer>
        </section>

    {/* EVENT SECTORS */}
<section className="py-16 lg:py-24 bg-gray-50">
  <SectionContainer>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12"
    >
      <div>
        <h3 className="text-sm text-blue-600 font-semibold mb-2">Event Sectors</h3>
        <h2 className="text-4xl lg:text-6xl font-bold max-w-4xl">
          From Freight to Technology Discover our Core Sectors
        </h2>
      </div>
      <Link href="/sectors">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-16 lg:mt-24 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
        >
          Explore Our 13 Sectors
        </motion.button>
      </Link>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {[
        { 
          title: "Complex Logistics Services & Freight Forwarding", 
          slug: "complex-logistics" 
        },
        { 
          title: "Maritime & Inland Waterway Transport", 
          slug: "maritime-and-inland-waterway-transport" 
        },
        { 
          title: "Air Freight", 
          slug: "air-freight" 
        },
        { 
          title: "Rail Freight", 
          slug: "rail-freight" 
        },
        { 
          title: "Road Freight Transportation", 
          slug: "road-freight-transportation" 
        },
        { 
          title: "Warehouse Technology", 
          slug: "warehouse-technology" 
        },
      ].map((sector, index) => (
        <Link
          key={index}
          href={`/sectors/${sector.slug}`}
          className="group relative w-full min-h-[600px] overflow-hidden block"
        >
          <motion.div
            variants={scaleIn}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url(/images/image.png)" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <h3 className="absolute bottom-0 left-0 p-6 text-white text-xl lg:text-2xl font-bold leading-snug max-w-xs group-hover:text-blue-300 transition-colors duration-300">
              {sector.title}
            </h3>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  </SectionContainer>
</section>

        {/* DOWNLOAD BROCHURE */}
        <motion.section
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
                <Link href="/event-brochure">
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
        </motion.section>

        {/* TESTIMONIALS */}
        <section className="py-20 lg:py-28 bg-white">
          <SectionContainer>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-4 bg-blue-600 inline-block rounded-sm" />
              <h3 className="text-sm text-gray-600 font-medium">Testimonials</h3>
            </div>

            <div className="relative flex items-center justify-between mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold"
              >
                Trusted by Industry Leaders
              </motion.h2>

              <div className="absolute -top-10 right-0 text-[180px] text-blue-100 leading-none select-none pointer-events-none">
                " "
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#1d4ed8" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                  className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-start gap-16"
            >
              <div className="min-w-[200px]">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl font-bold text-blue-700"
                >
                  {testimonials[testimonialIndex].logo}
                </motion.div>
              </div>

              <div className="max-w-5xl">
                <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                  {testimonials[testimonialIndex].text}
                </p>
                <div className="w-full h-[1px] bg-gray-300 mb-5"></div>
                <div>
                  <p className="font-bold text-gray-900 text-lg uppercase hover:text-blue-600 transition-colors duration-300">
                    {testimonials[testimonialIndex].author}
                  </p>
                  <p className="text-gray-600">
                    {testimonials[testimonialIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* VISITOR PROFILE */}
        <section className="bg-white">
          <div className="py-20 lg:py-28">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-8"
              >
                Visitor Profile
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-700 text-xl max-w-8xl mb-6 leading-relaxed"
              >
                Discover the professionals shaping the future of logistics and transportation.
                TransRussia attracts a highly targeted audience of decision-makers, industry
                leaders, and innovators from across the globe.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 text-xl max-w-8xl mb-10 leading-relaxed"
              >
                From senior executives in freight and supply chain management to specialists in
                e-commerce logistics and technology, our visitors come with clear objectives—to
                find solutions, forge partnerships, and drive businesses forward.
              </motion.p>

              <Link href="/post-show-report">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-medium transition-all duration-300"
                >
                  Know More Insights – Download Your Post-Show Report
                </motion.button>
              </Link>
            </SectionContainer>
          </div>

          <div className="bg-blue-50 py-20">
            <SectionContainer>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16"
              >
                {[
                  { value: "48%", label: "Transportation and Logistics Companies" },
                  { value: "40%", label: "Cargo Owners, Manufacturers, Wholesales, Retail" },
                  { value: "31%", label: "Head of Departments" },
                  { value: "12%", label: "IT Solutions, Insurance, Foreign Trade Agencies" }
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
          </div>
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
              A Snapshot of Our Exhibitors
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

        {/* JOURNEY CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
          <SectionContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Your Journey Starts Here: Essential Travel Info for TransRussia 2026
              </h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                Whether you're travelling from across the globe or are just connected. Find all the essential information to
                ensure a smooth and hassle-free trip to TransRussia Moscow 2026.
              </p>
              <Link href="/plan-your-travel">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#f8fafc",
                    boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
                >
                  Plan Your Travel
                </motion.button>
              </Link>
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

        {/* PARTNERS & SPONSORS */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <PartnersSection />
          </SectionContainer>
        </section>
      </main>
    </>
  )
}