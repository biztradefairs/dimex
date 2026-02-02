// app/why-exhibit/page.tsx - UPDATED WITH NEW LAYOUT
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PartnersSection from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import Image from "next/image";
import Link from "next/link"
import { motion } from 'framer-motion'
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi"
import BrochureSection from "@/components/section/BrochureSection"

const data = [
  {
    title: 'Want to grow internationally?',
    text: 'Connect with buyers, OEMs, and sourcing partners from India and overseas who attend DIEMEX to discover advanced die & mould, tooling, and manufacturing solutions.',
    image: 'https://cdn.itegroupnews.com/social_impact_16871280_aa26919271.png',
  },
  {
    title: 'Struggling to Measure Exhibition ROI?',
    text: 'DIEMEX delivers measurable results—from qualified leads and RFQs to confirmed orders and long-term partnerships.',
    image: 'https://cdn.itegroupnews.com/buyer_2640543_cf26288352.png',
  },
  {
    title: 'Facing Challenges Entering New Manufacturing Markets?',
    text: 'Gain direct access to decision-makers, including toolroom heads, plant managers, procurement leaders, and engineering teams across India’s precision manufacturing sectors.',
    image: 'https://cdn.itegroupnews.com/filtering_17929669_e485cd3789.png',
  },
  {
    title: 'Concerned About Cost, Quality & Lead Times?',
    text: 'Meet trusted suppliers and technology partners who help optimize tooling costs, improve quality, and reduce production cycles.',
    image: 'https://cdn.itegroupnews.com/conversion_12914581_4afbefb14b.png',
  },
  {
    title: 'Need better lead generation?',
    text: 'Build a strong pipeline from automotive, EV, plastics, die casting, aerospace, and industrial manufacturing sectors.',
    image: 'https://cdn.itegroupnews.com/opportunity_12031315_930cd3c845.png',
  },
  {
    title: 'Is your brand struggling to get noticed?',
    text: 'Showcase your unique technologies and capabilities to a highly targeted, decision-driven audience.',
    image: 'https://cdn.itegroupnews.com/worldwide_750473_9e738dea0d.png',
  },
];

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
<section className="relative h-[50vh] lg:h-[70vh] overflow-hidden">
  {/* Background */}
  <motion.div
    initial={{ scale: 1.1 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url(https://cdn.itegroupnews.com/Trans_Russia_heading_c711a6e7b3.webp)",
    }}
  />

  {/* Left gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />

  <SectionContainer>
    <div className="relative z-10 h-full grid grid-cols-12 items-end pb-20 lg:pb-28">
      
      {/* LEFT CONTENT */}
      <div className="col-span-12 lg:col-span-6 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-parabolica text-4xl lg:text-5xl xl:text-6xl font-bold lg:whitespace-nowrap mt-60"
        >
          Unlock New Opportunities at DIEMEX
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-base lg:text-lg text-white/90 lg:whitespace-nowrap"
        >
          Discover new possibilities at DIEMEX 2026—where industry leaders connect, collaborate, and innovate.
        </motion.p>

       <div className="flex flex-wrap gap-6 mt-6 text-white/90">
  <span className="flex items-center gap-2">
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="size-5 shrink-0 fill-blue-800 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"></path></svg>
    08 – 10 October 2026
  </span>

  <span className="flex items-center gap-2">
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="size-5 shrink-0 fill-blue-800 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"></path></svg>
    Pune, India
  </span>
</div>


        <Link href="/exhibiting-enquiry">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-medium"
          >
            Enquire to Exhibit
          </motion.button>
        </Link>
      </div>

      <div className="hidden lg:block col-span-6" />
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
              className="font-parabolica grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold">Where the Die & Mould Industry Comes Together</h2>
                <p className="text-[#4D4D4D] mb-6 text-lg">
                  DIEMEX is a powerful gateway to tap into India’s rapidly expanding die & mould, tooling, and precision manufacturing ecosystem—one of the world’s fastest-growing industrial markets.
                </p>
                <p className="text-[#4D4D4D] mb-8 text-lg">
                  With India’s strong automotive, EV, aerospace, electronics, and industrial manufacturing base, supported by large-scale localisation and “Make in India” initiatives, the country offers significant growth opportunities for companies aiming to expand operations, enter new markets, and build long-term manufacturing partnerships.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
                    <motion.span
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="text-[#4D4D4D] text-[30px] cursor-pointer"
                    >
                      <strong>10,000 Visitors</strong>
                    </motion.span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-[#4D4D4D] font-bold text-[30px] leading-none">•</span>
                    <motion.span
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="text-[#4D4D4D] text-[30px] cursor-pointer"
                    >
                      <strong>200+ Exhibitors</strong>
                    </motion.span>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
                    <motion.span
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="text-[#4D4D4D] text-[30px] cursor-pointer"
                    >
                      <strong>5+ Countries</strong>
                    </motion.span>
                  </li>
                </ul>

                <Link href="/exhibiting-enquiry">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="font-parabolica bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                  >
                    Enquire to Exhibit
                  </motion.button>
                </Link>
              </div>

              <motion.div
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                className="relative h-120 overflow-hidden transition-all duration-300"
              >
                <img
                  src="https://cdn.itegroupnews.com/Trans_Russia_670_x_500_4_86ec0c31db.webp"
                  alt="Conference"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white font-parabolica text-3xl font-bold"
                  >
                    Conference Highlights
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          </SectionContainer>
        </section>

        {/* REASONS TO EXHIBIT */}
        <section className="py-16 lg:py-24 bg-gray-50 font-parabolica">
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

            <p className="text-gray-700 mb-8 max-w-8xl text-lg">
              DIEMEX offers a powerful platform for die & mould manufacturers, tooling suppliers, material specialists, and advanced manufacturing solution providers to showcase innovative technologies to a highly qualified audience of OEMs, toolroom heads, engineers, and senior decision-makers.
            </p>
            <p className="text-gray-700 mb-12 max-w-8xl text-lg">
              With active capital investment and sourcing budgets focused on capacity expansion, localisation, quality improvement, and production efficiency, exhibiting at DIEMEX enables you to build high-value business connections, form long-term strategic partnerships, and accelerate growth in India’s competitive precision manufacturing market.
            </p>

  <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{
                y: -6,
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                transition: { duration: 0.25 },
              }}
              className="bg-white border border-gray-200 rounded-lg p-6 flex flex-row h-full"
            >
              {/* ICON */}


              {/* TITLE */}
              <div className="grid">
                    <h3 className="font-semibold text-lg mb-3 text-gray-900 leading-snug">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.text}
              </p>

              </div>
          
                            
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-10 w-auto"
                />
            
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

        {/* WHY EXPAND TO DIEMEX */}
        <section className="py-16 lg:py-24 bg-gray-50 font-parabolica">
          <SectionContainer>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold mb-12"
            >
              Why Expand in India’s Die & Mould Market?
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
                  title: "A Fast-Growing Manufacturing Economy",
                  text: "India is one of the world’s fastest-growing manufacturing hubs, supported by strong GDP growth and major investments in automotive, EVs, aerospace, electronics, and industrial manufacturing—all key drivers of die & mould demand."
                },
                {
                  title: "Rising Demand for Precision Tooling",
                  text: "With increasing localisation, shorter product life cycles, and higher quality standards, there is growing demand for advanced dies, moulds, tooling systems, and high-performance materials across industries."
                },
                {
                  title: "Long-Term Growth & Investment Potential",
                  text: "India’s die & mould and tooling sector is poised for sustained expansion through 2026 and beyond, driven by capacity expansion, technology upgrades, automation, and global sourcing shifts—creating strong opportunities for technology providers, material suppliers, and solution partners."
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
<section className="py-16 lg:py-24 bg-gray-50 font-parabolica">
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
        <h2 className="text-4xl lg:text-6xl font-[450] max-w-7xl">
          Discover the Core Sectors Powering Die & Mould Manufacturing
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
          slug: "complex-logistics", 
          image:"https://cdn.itegroupnews.com/Untitled_design_16_ff2396a005.png"
        },
        { 
          title: "Maritime & Inland Waterway Transport", 
          slug: "maritime-and-inland-waterway-transport" ,
          image:"https://cdn.itegroupnews.com/TRU_Sectors_Images_7_c75137da32.png"
        },
        { 
          title: "Air Freight", 
          slug: "air-freight" ,
          image: "https://cdn.itegroupnews.com/TRU_Sectors_Images_3_9089d75ec1.png"
        },
        { 
          title: "Rail Freight", 
          slug: "rail-freight" ,
          image: "https://cdn.itegroupnews.com/httpstransrussia_preview_prismetic_comterms_of_visiting_1200_x_490_px_a78a81f1aa.png"
        },
        { 
          title: "Road Freight Transportation", 
          slug: "road-freight-transportation" ,
          image:"https://cdn.itegroupnews.com/TRU_Sectors_Images_5_46a97403ad.png"
        },
        { 
          title: "Warehouse Technology", 
          slug: "warehouse-technology" ,
          image:"https://cdn.itegroupnews.com/TRU_Sectors_Images_4_b89e6f82a3.png"
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
              style={{ backgroundImage: `url(${sector.image})` }}
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
<BrochureSection/>


        {/* TESTIMONIALS */}
        <section className="py-20 lg:py-28 bg-white font-parabolica">
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
        <section className="bg-white font-parabolica">
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
                Discover the professionals shaping the future of die & mould manufacturing and precision engineering. DIEMEX attracts a highly targeted audience of decision-makers, industry leaders, and technology innovators from India and international markets.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 text-xl max-w-8xl mb-10 leading-relaxed"
              >
                From OEM procurement heads and plant managers to toolroom owners, design engineers, and manufacturing specialists, DIEMEX visitors arrive with clear objectives—to source advanced tooling solutions, evaluate new technologies, build strategic partnerships, and drive manufacturing competitiveness.
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
                  { value: "48%", label: "Die & Mould Manufacturers, Toolrooms & Tooling Companies" },
                  { value: "40%", label: "OEMs, Component Manufacturers, Automotive, EV, Plastics & Industrial Companies" },
                  { value: "31%", label: "Senior Decision-Makers & Department Heads"},

                  { value: "12%", label: "Design Software Providers, Automation & Industry 4.0 Solutions, Material Suppliers & Technical Consultants" }
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
        <section className="py-16 lg:py-24 font-parabolica">
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
              View Top 2025 Exhibitor List
            </motion.button>
          </SectionContainer>
        </section>

        {/* JOURNEY CTA */}
        <section className="font-parabolica py-16 lg:py-24 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
          <SectionContainer>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Your Journey Starts Here: Essential Travel Info for DIEMEX 2026
              </h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                Whether you are travelling from across India or from overseas, find all the essential information you need to ensure a smooth, comfortable, and hassle-free visit to DIEMEX 2026 at the Auto Cluster Exhibition Centre, Pune, India.
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
        <section className="font-parabolica py-16 lg:py-24">
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
                  description: "Join 200+ exhibitors in presenting your solutions for 3 days for unmatched networking opportunities.",
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
        <section className="font-parabolica py-16 lg:py-24">
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
                <p className="text-gray-800 font-medium text-lg"> Auto Cluster Exhibition Centre, Pune, India</p>
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
                <p className="text-gray-800 font-medium text-lg">08-10 October 2026, 10:00 -18:00</p>
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
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.5601269562317!2d73.79904587592934!3d18.638844465549226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84992d04bbd%3A0x9f1c44fb853ba461!2sAuto%20Cluster%20Exhibition%20Center%2C%20Chinchwad%2C%20Pune!5e0!3m2!1sen!2sin!4v1768810852287!5m2!1sen!2sin"
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
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