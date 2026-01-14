// app/articles/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockPageData } from './data';

// Safe Image component that handles missing config - FIXED
const SafeImage = ({ src, alt, fill, ...props }: any) => {
  if (!src) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image</span>
      </div>
    );
  }
  
  const isRemoteImage = src.startsWith('http');
  
  if (isRemoteImage) {
    if (fill) {
      return (
        <img
          src={src}
          alt={alt}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          className={props.className}
          {...props}
        />
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        {...props}
      />
    );
  }
  
  return <Image src={src} alt={alt} fill={fill} {...props} />;
};

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

export default function ArticlesPage() {
  const pageData = mockPageData;
  const articles = pageData.Sections?.find(section => section.__typename === 'ComponentTransRussiaArticlesList')?.Articles || [];
  const partnersSection = pageData.Sections?.find(section => section.__typename === 'ComponentTransRussiaPartnersSection');

  return (
    <div className="min-h-screen bg-white pt-20">
      <main className=''>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-gray-50 py-12 md:py-20"
        >
          <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              {pageData.Header?.Title || "Industry Insights"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-700 max-w-3xl"
            >
              {pageData.Header?.Content || "Latest news and insights from the logistics industry"}
            </motion.p>
          </div>
        </motion.section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                  custom={index}
                >
                  <Link href={`/articles/${article.attributes.Slug}`} className="block">
                    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <SafeImage
                          src={article.attributes.Image?.data?.attributes?.url}
                          alt={article.attributes.Title}
                          className="w-full h-full object-cover"
                          fill
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <time className="text-sm text-gray-500">
                          {new Date(article.attributes.PublishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                        >
                          Logistics
                        </motion.span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                        {article.attributes.Title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {article.attributes.Excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 font-semibold group">
                        <span>Read Article</span>
                        <motion.svg 
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>

            {/* Load More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
              >
                Load More Articles
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        {partnersSection && partnersSection.Partners && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-12 md:py-16 bg-gray-50"
          >
            <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12"
              >
                {partnersSection.PartnersSectionTitle || "Our Partners"}
              </motion.h2>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
              >
                {partnersSection.Partners.data.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    variants={scaleIn}
                    whileHover={{ 
                      y: -5,
                      scale: 1.05,
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                      transition: { duration: 0.3 }
                    }}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center"
                    custom={index}
                  >
                    <Link
                      href={`/partner/${partner.attributes.Slug}`}
                      className="flex flex-col items-center gap-4 w-full"
                    >
                      <div className="h-24 w-full flex items-center justify-center p-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SafeImage
                            src={partner.attributes.Logo?.data?.attributes?.url}
                            alt={partner.attributes.Name}
                            className="max-h-full max-w-full object-contain"
                            width={120}
                            height={80}
                          />
                        </motion.div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center hover:text-blue-600 transition-colors duration-300">
                        {partner.attributes.Name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}