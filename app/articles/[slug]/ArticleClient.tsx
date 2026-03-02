"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Article, articles } from "../data";
import BackToTop from "@/app/exhibitor-resource-center/component/BackToTop";

const SafeImage = ({ src, alt, fill, ...props }: any) => {
  if (!src) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image</span>
      </div>
    );
  }

  const isRemoteImage = src.startsWith("http");

  if (isRemoteImage) {
    if (fill) {
      return (
        <img
          src={src}
          alt={alt}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          className={props.className}
        />
      );
    }
    return <img src={src} alt={alt} {...props} />;
  }

  return <Image src={src} alt={alt} fill={fill} {...props} />;
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

interface ArticleClientProps {
  article: Article;
}

export default function ArticleClient({ article }: ArticleClientProps) {
  const relatedArticles = articles
    .filter((a) => a.attributes.Slug !== article.attributes.Slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <main className="font-parabolica">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] min-h-[500px] w-full overflow-hidden pt-32 md:pt-36 lg:pt-40"
        >
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <SafeImage
              src={article.attributes.Image?.data?.attributes?.url}
              alt={article.attributes.Title}
              className="w-full h-full object-cover"
              fill
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent w-full">
            <div className="absolute bottom-0 left-0 right-0 w-full">
              <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="max-w-7xl mx-auto">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm px-3 py-1 bg-blue-600 text-white rounded-full">
                        Logistics
                      </span>
                      <time className="text-white/90 text-sm">
                        {new Date(article.attributes.PublishedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      {article.attributes.Title}
                    </h1>

                    <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
                      {article.attributes.Excerpt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <article className="py-16 md:py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              
              <Link
                href="/articles"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-10 group"
              >
                <span className="transform group-hover:-translate-x-1 transition-transform text-lg">
                  ←
                </span>
                <span className="ml-2 text-lg">Back to Articles</span>
              </Link>

              <div className="w-full">
                {article.attributes.Content ? (
                  <div 
                    className="article-content"
                    dangerouslySetInnerHTML={{
                      __html: article.attributes.Content,
                    }}
                  />
                ) : (
                  <p className="text-lg text-gray-600">Content coming soon...</p>
                )}
              </div>

              <div className="mt-16 pt-10 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Share this article
                </h3>

                <div className="flex flex-wrap gap-3">
                  {["Facebook", "Twitter", "LinkedIn", "Email"].map((platform) => (
                    <button
                      key={platform}
                      className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 capitalize font-medium text-sm"
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="py-20 bg-gray-50 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <motion.div
                    key={relatedArticle.id}
                    variants={scaleIn}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Link
                      href={`/articles/${relatedArticle.attributes.Slug}`}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 block group h-full"
                    >
                      <div className="relative h-56 w-full overflow-hidden">
                        <SafeImage
                          src={relatedArticle.attributes.Image?.data?.attributes?.url}
                          alt={relatedArticle.attributes.Title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          fill
                        />
                      </div>

                      <div className="p-6">
                        <time className="text-sm text-gray-500 mb-3 block">
                          {new Date(relatedArticle.attributes.PublishedDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedArticle.attributes.Title}
                        </h3>

                        <p className="text-gray-600 line-clamp-3 leading-relaxed">
                          {relatedArticle.attributes.Excerpt}
                        </p>

                        <div className="mt-4 text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Read More →
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <BackToTop />

 <style jsx global>{`
  .article-content {
    font-family: 'Parabolica', sans-serif;
    color: #4D4D4D;
    line-height: 1.5; /* reduced */
    font-size: 1.125rem;
    width: 100%;
  }

  .article-content p {
    margin-bottom: 0.8rem; /* reduced */
    color: #4D4D4D;
    line-height: 1.5;
    font-size: 1.125rem;
  }

  .article-content h1 {
    font-size: 2.25rem;
    font-weight: 600;
    margin-top: 1.5rem; /* reduced */
    margin-bottom: 0.6rem; /* reduced */
    color: #4D4D4D;
    line-height: 1.3;
  }

  .article-content h2 {
    font-size: 1.875rem;
    font-weight: 600;
    margin-top: 1.3rem; /* reduced */
    margin-bottom: 0.5rem; /* reduced */
    color: #4D4D4D;
    line-height: 1.3;
  }

  .article-content h3 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 1.2rem; /* reduced */
    margin-bottom: 0.4rem; /* reduced */
    color: #4D4D4D;
    line-height: 1.4;
  }

  .article-content ul,
  .article-content ol {
    margin: 0.8rem 0; /* reduced */
    padding-left: 1.5rem;
  }

  .article-content li {
    margin-bottom: 0.3rem; /* reduced */
    line-height: 1.5;
  }

  .article-content img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0; /* reduced */
  }

.article-content figure.table {
  display: flex;
  justify-content: center;
  mrgin: 1.5rem;
}
}
  @media (max-width: 768px) {
    .article-content {
      font-size: 1rem;
      line-height: 1.5;
    }

    .article-content p {
      font-size: 1rem;
      margin-bottom: 0.7rem;
    }

    .article-content h1 {
      font-size: 1.9rem;
    }

    .article-content h2 {
      font-size: 1.5rem;
    }

    .article-content h3 {
      font-size: 1.25rem;
    }
  }
`}</style>
    </div>
  );
}