// app/articles/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockPageData } from './data';
// import PartnersSection from '@/components/section/PartnersSection';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';
import SectionContainer from '@/components/UI/SectionContainer';

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
    <div className="min-h-screen bg-white">
      <main className='font-parabolica'>
        {/* Hero Section */}
      <motion.section
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-gradient-to-r from-blue-50 to-gray-50 py-6 sm:py-8 md:py-22"
>
  <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 sm:mt-6 md:mt-8 mb-3 sm:mb-4"
    >
      {pageData.Header?.Title || "Industry Insights"}
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl"
    >
      {pageData.Header?.Content || "Latest news and insights from the logistics industry"}
    </motion.p>
  </div>
</motion.section>

        <SectionContainer className="mt-10 sm:mt-14 md:mt-16">
          <div className="animated-block">
            <div className="animated-block-target">
              {/* Container with proper padding for left and right gaps */}
              <div className="container mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-30">
                {/* Responsive Grid with gaps between cards - increased top padding */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {articles.map((article) => (
                    <Link 
                      key={article.id} 
                      href={`/articles/${article.attributes.Slug}`}
                      className="group block h-full"
                    >
                      <article className="bg-white overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                        {/* Image container with no border */}
                        <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 w-full overflow-hidden flex-shrink-0">
                          <SafeImage
                            src={article.attributes.Image?.data?.attributes?.url}
                            alt={article.attributes.Title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Content container with no border */}
                        <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <time className="text-xs sm:text-sm text-gray-500">
                              {new Date(article.attributes.PublishedDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                          
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2">
                            {article.attributes.Title}
                          </h3>
                          
                          <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-3 sm:mb-4 flex-grow">
                            {article.attributes.Excerpt}
                          </p>
                          
                          {/* Read Article link - only visible on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center text-[#1E3B75] font-semibold text-xs sm:text-sm">
                              <span>Read Article</span>
                              <svg 
                                className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Placeholder to maintain layout when Read Article is hidden */}
                          <div className="opacity-0 group-hover:opacity-0 h-0">
                            <div className="flex items-center text-[#1E3B75] font-semibold text-xs sm:text-sm">
                              <span>Read Article</span>
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
        
        {/* <PartnersSection/> */}
        <BackToTop/>
      </main>
    </div>
  );
}