"use client";

import PartnersSection from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import Link from "next/link"
import { motion } from 'framer-motion'
import Image from "next/image";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi"
import BrochureSection from "@/components/section/BrochureSection";
import BackToTop from "../exhibitor-resource-center/component/BackToTop";

 const countries = [
    { name: 'China', flag: 'https://cdn.itegroupnews.com/Flag_icons_3e3608eca2.png' },
    { name: 'India', flag: 'https://cdn.itegroupnews.com/India_77390bec7a.webp' },
    { name: 'Japan', flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACtCAMAAABhsvGqAAAAb1BMVEX///+8AC27ACq3AAC6ACG7ACa6ACO5ABi5ABy7ACj9+fq4ABS4ABC4AAu3AAP14OTcl6D78fPPbnnakZrpv8W+IDfw0dbJU2LBLkPUe4blsrnsxszWhY7eoKbmt7z46OvFRlXhqq/OZnPKW2fDO00P6eL9AAAER0lEQVR4nO3d23aqMBAGYEkChJMUVCoeCrZ9/2fcoNtltVUQMyTR/7vsFTMLJ5NJtJMJAAAAAAAAAAAAAAAAAAAAAMDTC7O02EuzUPezaBAWu/J9GXM+TRpTzuPle7krXicVYbH99mNfuIHzQ+CK5o/120skoigXXLrOFa7ki7LQ/Yy0qrcFF+xaBg6Y4M6s0v2kZNJc+h0Z+J8HKfNU99OSSHMu+mTgQPDP50tDVt6TgkMaykz3U6u1c+V9KWhJd6f7uRWq6qRXLbjEkvppKuRKekNS0PLkSvfTq5HzoSlo8Vz38ytQLQdUg5/k0vqPRMqudod9uczyxXKdBN1Rdgmma91xPGI+bFW4xJK57kiGU5QDq7NQPLQsnOOWfiJSqeg9aDFpZXXMmIKaeBIwG3cS9Z0bpi6i1h3R/TaR2hw4TrTRHdO91gqL4tHUsiUicxUWxSPm2lUWcsUF4UBYtZlaTylyYFm3sFS6Op4ES92R9beNaXLQrBBb3bH1FfpUOXAc35YDqtmDY5SbSZjpjq6fMCBYHo9YYMersFXeK/5kSVVwCF+E5lVwdMfXx5psaTiIbegVPgcfMvTjfeqOsFtI/CI0VcH80rgiT0Js/qHU18PnDF3cL90xdslo14YWc0zfURcJdQ4cJzH9UhNly3wkTW+da/KS0BSFWneUHcjXhlasO8rbUoL56m/c7IOYOenm6Sgye+y8HaEuNpXR7J1kSTJlviRK3XHeRN8vtgzvGWuiMfNFEmrdcd5ENWs/Z/bkPVyQ7xxabGnybnqsJCyQBCQBSbAjCWOtDiYnYaQ+Iah1x3kTOsZGTnzocOCZfWNljOma8fO1FeHVhBPf7JOHguiy0rmp2ePmcJzxmtEr5GQyRrfEFrqj7DDGaMnwwdJk8jHCzD3+0B1lh2qMEyjjvx5Hv3swe660R98uGd4qtejPoAw/f9r7Jv48BN+6I+xhR9w5+zb8nkBGfBwZmX5PZY/mCx9HlnzxIyW9sZNYUBZbX4STFc/sodIJ5Sppw/p48ElWFYQFd3r/q8hWSd/4bcPJjCgLtnzv5WBB0jYGpk9TztHMGo2/ynqhJOgbI9MnSr98Kz+Lcm3YOZ2rIsUjVxZZtDIczRW3TNzsG5xXbJXuIRKzL3BeVSqcPMfWFcWjXNkSEdnTLv+iKguRHUOEK3IldSGxOgeTyUZBFhLrflbn0o4/2C8wbum68FPBHho0eYFlG4a/Ze8PlMfo3cI+8U9vfOBGwuVvup9dnaqOB1QGFj/PLxbvrcTdB7VS2HDWdJdw5t/z+4xM+hvDbyYNkm3cfj/q36TAdzdWnLYNkG0d7nXmgXnc2T5rCvaK3Ilv/ZsLJmInf4rO4KZwXi7iSPyxaLoiip1y/oyl4C/pR1lLnvhSCK8hhPQTLutyZc0hmyJhVax2mzJvlJvdqqhe5Q0AAAAAAAAAAAAAAAAAAAAAgNf1D53+Qj8zo+6sAAAAAElFTkSuQmCC' },
    { name: 'Taiwan', flag: 'data:image/png;base64,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' },
    { name: 'Germany', flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACcCAMAAACulCWiAAAAElBMVEUAAAD/zgDdAADrAADZAAD/3AApfWWWAAAAz0lEQVR4nO3QwVEDQBAEsZu1yT9lqI6ChxSC3gMAAAAAAAAAAAAAAAD4xz583nESTkIknIRIOAmRcBIi4SREwkmIhJMQCSchEk5CJJyESDgJkXASIuEkRMJJiISTEAknIRJOQiSchEg4CZFwEiLhJETCSYiEkxAJJyES/rwv3/fDzxuTMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAn5BcTHpY30S2AzAAAAAElFTkSuQmCC' },
  ]

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
      <main className="bg-white overflow-hidden font-parabolica">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh] flex items-end">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://cdn.itegroupnews.com/Why_visit_header_58ece0089d.webp)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
          <SectionContainer>
            <div className="relative z-10 pb-8 sm:pb-12 md:pb-16 lg:pb-24 px-4 sm:px-0">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 max-w-4xl"
              >
                Why Visit DIEMEX 2026
              </motion.h1>
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="
    text-base sm:text-lg lg:text-xl 
    text-white/90 
    mb-6 sm:mb-8 
    max-w-10xl
    line-clamp-2 lg:line-clamp-none
  "
>
  Discover a focused B2B platform bringing together die & mould manufacturers,
  tooling suppliers, and precision manufacturing technology providers. DIEMEX
  offers visitors the opportunity to explore new solutions, connect directly
  with exhibitors, and gain insights into trends shaping India's manufacturing
  and automotive sectors.
</motion.p>


              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-white"
              >
                <div className="flex items-center gap-2">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="size-5 shrink-0 fill-blue-800 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"></path></svg>
                  <span className="text-sm sm:text-lg font-medium">08 – 10 October 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="size-5 shrink-0 fill-blue-800 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"></path></svg>
                  <span className="text-sm sm:text-lg font-medium">Auto Cluster Exhibition Centre, Pune, India</span>
                </div>
              </motion.div>
            </div>
          </SectionContainer>
        </section>

        {/* Main Content */}
        <div className="py-8 sm:py-12 lg:py-20">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="bg-white py-12 sm:py-16 lg:py-28"
          >
            <SectionContainer>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 max-w-10xl leading-tight">
                The Entire Die & Mould and Precision Manufacturing Ecosystem
                Brought Together Under One Roof
              </h2>

              <p className="text-gray-700 text-sm sm:text-base md:text-[10] max-w-10xl mb-6 sm:mb-10 leading-relaxed">
                As India's manufacturing sector continues to grow, DIEMEX provides a focused platform for the die & mould, tooling, and precision engineering community to connect, collaborate, and do business. The exhibition enables manufacturers, OEMs, and technology providers to meet potential partners, expand regional and international networks, exchange knowledge, and discover the latest innovations shaping the future of manufacturing.
              </p>
              <Link href='/contact-us'>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#004D9F] hover:bg-blue-800 text-white px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all duration-300 w-full sm:w-auto"
                >
                  Contact Us
                </motion.button>
              </Link>
            </SectionContainer>
          </motion.section>

          {/* Stats Grid */}
          <section className="bg-blue-50 py-12 sm:py-16 lg:py-20">
            <SectionContainer>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16"
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
                    className="p-4 sm:p-6 rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#004D9F] mb-2 sm:mb-4 hover:text-blue-800 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-800 mb-4 sm:mb-6">{stat.label}</p>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-px bg-[#004D9F]"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* GLOBAL LOGISTICS NETWORK */}
          <section className="relative bg-blue-50 py-12 sm:py-16 lg:py-28 overflow-hidden">
            <div
              className="absolute inset-0 bg-no-repeat bg-center opacity-20 bg-contain sm:bg-cover"
              style={{ backgroundImage: "url(/images/world-map-dotted.png)" }}
            />

            <SectionContainer>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-0"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight">
                  Connect with the Die & Mould Manufacturing
                  <br className="hidden sm:block" />
                  Community at DIEMEX
                </h2>

                <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-10 leading-relaxed">
                  DIEMEX brings together die & mould manufacturers, tooling suppliers, and precision manufacturing solution providers from India and abroad, creating a focused platform for networking, collaboration, and business over three action-packed days.
                </p>
                <Link href="/exhibition-directory">
                 <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#004D9F] hover:bg-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 mb-6 sm:mb-0 w-full sm:w-auto"
                >
                  Explore the Exhibitor list
                </motion.button>
                </Link>
               

                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-14">
                  {countries.map((country, index) => (
                    <motion.div
                      key={country.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{
                        scale: 1.08,
                        y: -3,
                        backgroundColor: "#eff6ff",
                      }}
                      className="
                        flex items-center gap-2 sm:gap-3 
                        bg-white px-3 sm:px-4 py-1 sm:py-2 
                        rounded-full shadow-sm 
                        text-xs sm:text-sm text-gray-800 
                        transition-all duration-300 
                        cursor-pointer
                      "
                    >
                      {/* Flag */}
                      <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                        <Image
                          src={`${country.flag}`}
                          alt={country.name}
                          fill
                          className="rounded-full object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Country Name */}
                      <span className="font-parabolica whitespace-nowrap">{country.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </SectionContainer>
          </section>

          {/* WHY ATTEND DIEMEX */}
          <section className="py-12 sm:py-16 lg:py-28 bg-white">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center sm:text-left"
              >
                Why Attend DIEMEX 2026
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
              >
                {[
                  {
                    image: "https://cdn.itegroupnews.com/why_visit_1_b9ef94bf3b.webp",
                    title: "Connect with Key Industry Players",
                    text: "DIEMEX offers a focused platform to meet die & mould manufacturers, tooling suppliers, and precision manufacturing solution providers from India and international markets—helping you connect with the right partners for your business."
                  },
                  {
                    image: "https://cdn.itegroupnews.com/why_visit_2_231ef95a51.webp",
                    title: "Discover The Latest Innovations",
                    text: "Visit DIEMEX to explore the newest developments in die & mould, tooling, and precision manufacturing technologies—and understand how they can enhance productivity, quality, and competitiveness."
                  },
                  {
                    image: "https://cdn.itegroupnews.com/1_41fae57627.jpg",
                    title: "Build the Right Business Deals",
                    text: "Engage directly with manufacturers and technology suppliers to discuss requirements, evaluate solutions, and establish long-term business partnerships."
                  },
                  {
                    image: "https://cdn.itegroupnews.com/Why_visit_4_418c67c8b2.webp",
                    title: "Stay Ahead of Industry Trends",
                    text: "Gain insights into emerging technologies, market developments, and best practices through DIEMEX's conference sessions led by industry experts."
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                    }}
                    className="relative h-64 sm:h-[280px] lg:h-[320px] xl:h-[360px] overflow-hidden rounded-lg transition-all duration-300"
                    style={{ backgroundImage: `url(${card.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
                    <div className="absolute bottom-0 p-4 sm:p-6 lg:p-8 text-white max-w-md">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 hover:text-blue-300 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {card.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* E-Brochure Section */}
      <BrochureSection/>

          {/* Proven Success Stats */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="bg-white py-12 sm:py-16 lg:py-28"
            >
              <SectionContainer>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 max-w-12xl leading-tight">
                  Proven Success: What Visitors Say About DIEMEX
                </h2>

                <p className="text-gray-700 text-sm sm:text-base md:text-[10] max-w-8xl mb-6 sm:mb-10 leading-relaxed">
                  Here are DIEMEX 2026–aligned rewrites, keeping the same tone and intent but suited to a growing, credibility-focused exhibition. The first option is recommended.
                </p>
                <Link href='/post-show-report'>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#004D9F] hover:bg-blue-800 text-white px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-medium transition-all duration-300 w-full sm:w-auto"
                  >
                    Download Your Post-Show Report
                  </motion.button>
                </Link>
              </SectionContainer>
            </motion.section>

            <section className="bg-blue-50 py-8 sm:py-10">
              <SectionContainer>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16"
                >
                  {[
                    { value: "98%", label: "Were Satisfied with the Exhibition" },
                    { value: "78%", label: "A focused exhibition with a highly relevant industry audience." },
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
                      className="p-4 sm:p-6 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#004D9F] mb-2 sm:mb-4 hover:text-blue-800 transition-colors duration-300">
                        {stat.value}
                      </div>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-800 mb-4 sm:mb-6">{stat.label}</p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-px bg-[#004D9F]"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </SectionContainer>
            </section>
          </div>

          {/* WHO IS DIEMEX FOR */}
          <section className="py-12 sm:py-16 lg:py-28 bg-white">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center sm:text-left"
              >
                Who is DIEMEX for?
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {[
                  [
                    "Die & Mould Manufacturers",
                    "Tooling & Tool Room Owners",
                    "Automotive OEMs & Tier-1 / Tier-2 Suppliers",
                    "Production & Manufacturing Heads",
                    "Design, CAD / CAM & R&D Engineers",
                    "Injection Moulding & Casting Professionals",
                    "Press Tool & Sheet Metal Component Manufacturers"
                  ],
                  [
                    "CNC Machining & Precision Engineering Companies",
                    "Industrial Automation & Robotics Professionals",
                    "Materials, Steel & Special Alloy Suppliers",
                    "Quality, Testing & Metrology Professionals",
                    "Maintenance, Tooling & Plant Managers",
                    "Procurement & Strategic Sourcing Heads",
                    "New Product Development (NPD) Teams"
                  ],
                  [
                    "MSME & Large Manufacturing Enterprise Owners",
                    "Industry Consultants & Technology Advisors",
                    "Academic Institutions & Skill Development Bodies",
                    "Industry Associations & Government Bodies",
                    "Export-Oriented Manufacturing Professionals",
                    "Transportation Infrastructure Planners",
                    "Finance, Leasing & Industrial Service Providers"
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
                    className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-lg transition-all duration-300"
                  >
                    <ul className="space-y-2 sm:space-y-4 text-gray-800">
                      {list.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.05 }}
                          whileHover={{ x: 5, color: "#1d4ed8" }}
                          className="flex items-start sm:items-center gap-2 transition-all duration-300 cursor-pointer text-sm sm:text-base"
                        >
                          <span className="text-blue-600 mt-1 sm:mt-0">▪</span>
                          <span className="flex-1">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </SectionContainer>
          </section>

          {/* A SNAPSHOT OF EXHIBITORS */}
          <section className="py-12 sm:py-16 lg:py-24">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center sm:text-left"
              >
                Who You Will Meet
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 mb-4 sm:mb-6"
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
                    className="bg-gray-100 p-3 sm:p-4 rounded-lg h-16 sm:h-20 flex items-center justify-center transition-all duration-300 cursor-pointer"
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
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 mb-6 sm:mb-8"
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
                    className="bg-gray-100 p-3 sm:p-4 rounded-lg h-16 sm:h-20 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  >
                    <div className="text-xs text-gray-500">Logo {i}</div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center sm:text-left">
                <Link href="/exhibition-directory">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#004D9F] hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 w-full sm:w-auto"
                >
                  View Top 2025 Exhibitor List
                </motion.button>
                </Link>
              </div>
            </SectionContainer>
          </section>

          {/* EVENT SECTORS ON DISPLAY */}
          <section className="py-12 sm:py-16 lg:py-28 bg-white">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center sm:text-left"
              >
                Event Sectors On Display
              </motion.h2>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
              >
                {[
                  {
                    title: "Die & Mould Manufacturing – Injection moulds, die casting dies, press tools, blow moulds, extrusion dies",
                    slug: "die-mould-manufacturing",
                    image: "/images/image.png"
                  },
                  { 
                    title: "Tooling & Tool Room Technologies - Cutting tools, jigs & fixtures, gauges, tool holders",
                    slug: "tooling-tool-rom-technologies", 
                    image: "/images/image.png" 
                  },
                  { 
                    title: "Automation, Robotics & Smart Manufacturing - Industrial automation, robotics, Industry 4.0 solutions", 
                    slug: "automation-robotics", 
                    image: "/images/image.png" 
                  },
                  { 
                    title: "CNC Machines & Precision Engineering - Machining centres, turning, grinding, EDM, VMCs & HMCs", 
                    slug: "cnc-machines", 
                    image: "/images/image.png" 
                  },
                  { 
                    title: "Surface Treatment & Heat Treatment-Coatings, finishing, hardening, thermal processes", 
                    slug: "surface-treatment", 
                    image: "/images/image.png" 
                  },
                  { 
                    title: "Materials, Steels & Alloys - Tool steels, special alloys, polymers, consumables",
                    slug: "materials-steels-alloys",
                    image: "/images/image.png" 
                  },
                  { 
                    title: "CAD / CAM / CAE & Design Solutions - Design software, simulation, reverse engineering", 
                    slug: "cad-cam", 
                    image: "/images/image.png" 
                  },
                  { 
                    title: "Injection Moulding & Casting Technologies - Plastics, rubber, die casting, metal forming solutions",
                    slug: "die-casting", 
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
                        y: -5,
                        scale: 1.02,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                      }}
                      className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden transition-all duration-300 cursor-pointer h-full"
                    >
                      <div className="h-32 sm:h-36 lg:h-44 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 sm:p-4">
                        <p className="text-gray-900 text-xs sm:text-sm font-medium leading-snug hover:text-blue-600 transition-colors duration-300 line-clamp-3">
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
                    className="bg-[#004D9F] hover:bg-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 w-full sm:w-auto"
                  >
                    Explore All the Event Sectors
                  </motion.button>
                </Link>
              </div>
            </SectionContainer>
          </section>

          {/* MORE THAN JUST AN EXHIBITION */}
          <section className="py-12 sm:py-16 lg:py-28 bg-white">
            <SectionContainer>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-start justify-between mb-8 sm:mb-12 gap-4 sm:gap-0"
              >
                <div className="max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                    More Than Just an Exhibition
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
                    A focused die & mould and precision manufacturing exhibition that combines live technology showcases with expert-led knowledge sharing.
                  </p>
                </div>

                <div className="flex gap-3 self-start sm:self-center">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#dbeafe" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center transition-all duration-300"
                  >
                    ←
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#1d4ed8" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#004D9F] text-white flex items-center justify-center transition-all duration-300"
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
              >
                {[
                  {
                    title: "Conference Programme",
                    text: "2 Days focused industry conference delivering practical insights to address real business challenges — from emerging die & mould technologies and tooling innovations to future trends shaping precision manufacturing.",
                    image: "https://cdn.itegroupnews.com/Business_Programme_9f14587238.webp"
                  },
                  {
                    title: "MOLDING TRENDS Summit",
                    text: "A knowledge-driven platform bringing industry professionals and leading experts together to share insights, helping the die & mould and tooling community stay ahead in a rapidly evolving manufacturing landscape.",
                    image: "https://cdn.itegroupnews.com/18_6c90079699.jpg"
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                    }}
                    className="rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 transition-all duration-300"
                  >
                    <div className="bg-[#0E1C35] text-white p-4 sm:p-6 lg:p-8">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 hover:text-blue-300 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {card.text}
                      </p>
                    </div>
                    <div className="h-48 sm:h-56 lg:h-64 xl:h-72 overflow-hidden">
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
          <section className="py-12 sm:py-16 lg:py-24">
            <SectionContainer>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-2"
              >
                Quick Navigation
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-xs sm:text-sm text-[#4D4D4D] mb-1 sm:mb-2"
              >
                Simplifying Your Participation Journey
              </motion.h3>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {[
                  {
                    icon: "📦",
                    number: "01",
                    title: "Become an Exhibitor",
                    description: "Showcase your die & mould, tooling, and manufacturing solutions over three focused business days and connect with a rapidly growing base of qualified buyers and decision-makers.",
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
                      y: -5,
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      backgroundColor: "#f8fafc"
                    }}
                    className="border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#004D9F] rounded-full flex items-center justify-center">
                        <span className="text-lg sm:text-xl lg:text-2xl">{card.icon}</span>
                      </div>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-300"
                      >
                        {card.number}
                      </motion.span>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 hover:text-blue-600 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 line-clamp-3">{card.description}</p>
                    <Link href={card.href}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#004D9F] hover:bg-blue-700 text-white py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base"
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
          <section className="py-12 sm:py-16 lg:py-24">
            <SectionContainer>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12"
              >
                When and Where
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(37, 99, 235, 0.1)" }}
                  className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-lg transition-all duration-300"
                >
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#4D4D4D] mb-2 sm:mb-4">Venue</h3>
                  <p className="text-gray-800 font-medium text-sm sm:text-base lg:text-lg">Auto Cluster Exhibition Centre, Pune, India</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(37, 99, 235, 0.1)" }}
                  className="bg-blue-50 p-4 sm:p-6 lg:p-8 rounded-lg transition-all duration-300"
                >
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#4D4D4D] mb-2 sm:mb-4">Opening Hours</h3>
                  <p className="text-gray-800 font-medium text-sm sm:text-base lg:text-lg">08-10 October 2026, 10:00 - 18:00</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                className="bg-gray-200 rounded-lg h-48 sm:h-56 lg:h-64 xl:h-80 overflow-hidden transition-all duration-300"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4110.374496455856!2d73.7990458754672!3d18.638844465550328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84992d04bbd%3A0x9f1c44fb853ba461!2sAuto%20Cluster%20Exhibition%20Center%2C%20Chinchwad%2C%20Pune!5e1!3m2!1sen!2sin!4v1768501548011!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </SectionContainer>
          </section>

          <section className="py-12 sm:py-16 lg:py-24">
            <SectionContainer>
              <PartnersSection />
            </SectionContainer>
          </section>
        </div>
      </main>
      <BackToTop/>
    </>
  )
}