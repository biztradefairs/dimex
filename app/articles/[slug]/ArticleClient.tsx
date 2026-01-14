// app/articles/[slug]/ArticleClient.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Article, mockArticles } from '../data';

// Safe Image component - FIXED
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

interface ArticleClientProps {
  article: Article;
}

export default function ArticleClient({ article }: ArticleClientProps) {
  const router = useRouter();
  
  // Get all other articles for related articles section
  const allArticles = Object.values(mockArticles);
  const relatedArticles = allArticles
    .filter(a => a && a.attributes && a.attributes.Slug !== article.attributes.Slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <main>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 md:h-[500px] overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <SafeImage
              src={article.attributes.Image?.data?.attributes?.url}
              alt={article.attributes.Title}
              className="w-full h-full object-cover"
              fill
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 mb-4"
                  >
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded-full"
                    >
                      Logistics
                    </motion.span>
                    <time className="text-white/90 text-sm">
                      {new Date(article.attributes.PublishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
                  >
                    {article.attributes.Title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-white/90"
                  >
                    {article.attributes.Excerpt}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  href="/articles" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group"
                >
                  <motion.svg 
                    animate={{ x: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </motion.svg>
                  Back to Articles
                </Link>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="prose prose-lg max-w-none article-content"
              >
                {article.attributes.Content ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: article.attributes.Content }}
                  />
                ) : (
                  <p>Content coming soon...</p>
                )}
              </motion.div>

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex gap-4">
                  {['facebook', 'twitter', 'linkedin'].map((platform) => (
                    <motion.button
                      key={platform}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {platform === 'facebook' && (
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        )}
                        {platform === 'twitter' && (
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        )}
                        {platform === 'linkedin' && (
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        )}
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
            >
              Related Articles
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {relatedArticles.map((relatedArticle) => (
                relatedArticle && relatedArticle.attributes ? (
                  <motion.div
                    key={relatedArticle.id}
                    variants={scaleIn}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  >
                    <Link 
                      href={`/articles/${relatedArticle.attributes.Slug}`}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 block"
                    >
                      <div className="relative h-40 w-full overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <SafeImage
                            src={relatedArticle.attributes.Image?.data?.attributes?.url}
                            alt={relatedArticle.attributes.Title}
                            className="w-full h-full object-cover"
                            fill
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {relatedArticle.attributes.Title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {relatedArticle.attributes.Excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ) : null
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}