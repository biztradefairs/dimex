import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Types
interface Article {
  id: string;
  attributes: {
    Title: string;
    Slug: string;
    Excerpt: string;
    Content?: string;
    PublishedDate: string;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Author?: {
      data: {
        attributes: {
          name: string;
          avatar?: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

// Mock data for individual article
const mockArticles: Record<string, Article> = {
  "why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026": {
    id: "83",
    attributes: {
      Title: "Why Is Rail Freight Becoming a Stronger Alternative for Long-Haul Cargo in 2026?",
      Slug: "why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026",
      Excerpt: "Rail freight for long-haul cargo offers reliable schedules, lower emissions, and optimized corridor operations.",
      Content: `
        <h2>The Rise of Rail Freight in 2026</h2>
        <p>Rail freight is experiencing a significant resurgence as a viable alternative for long-haul cargo transportation. With increasing pressure on supply chains and growing environmental concerns, many logistics companies are turning to rail as a sustainable and efficient solution.</p>
        
        <h3>Key Advantages</h3>
        <ul>
          <li><strong>Environmental Sustainability:</strong> Rail transport produces significantly fewer emissions compared to road transport.</li>
          <li><strong>Cost Efficiency:</strong> Lower fuel consumption and higher capacity make rail more economical for long distances.</li>
          <li><strong>Reliability:</strong> Less affected by traffic congestion and weather conditions.</li>
          <li><strong>Capacity:</strong> Ability to move large volumes of goods in single journeys.</li>
        </ul>
        
        <p>As we move through 2026, we expect to see even greater adoption of rail freight solutions across Eurasia and other major trade corridors.</p>
      `,
      PublishedDate: "2025-11-20T03:30:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/shutterstock_506661664_119ee222ac.webp"
          }
        }
      }
    }
  },
  "how-are-ports-preparing-for-increased-freight-handling-demands-in-2026": {
    id: "82",
    attributes: {
      Title: "How Are Ports Preparing for Increased Freight Handling Demands in 2026?",
      Slug: "how-are-ports-preparing-for-increased-freight-handling-demands-in-2026",
      Excerpt: "Freight handling in ports is evolving with infrastructure upgrades, digital operations, and sea–land integration.",
      Content: `
        <h2>Port Infrastructure Evolution</h2>
        <p>Major ports worldwide are undergoing significant transformations to accommodate the growing demands of global trade in 2026.</p>
        
        <h3>Digital Transformation</h3>
        <p>Ports are implementing advanced digital systems including:</p>
        <ul>
          <li>AI-powered container management</li>
          <li>Automated guided vehicles (AGVs)</li>
          <li>Real-time tracking systems</li>
          <li>Blockchain for documentation</li>
        </ul>
        
        <h3>Infrastructure Upgrades</h3>
        <p>Physical enhancements include:</p>
        <ul>
          <li>Deep-water berths for mega-ships</li>
          <li>Expanded storage facilities</li>
          <li>Improved rail and road connectivity</li>
          <li>Renewable energy integration</li>
        </ul>
      `,
      PublishedDate: "2025-11-05T04:15:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/russian_transport_logistics_1_1c8e93c332.webp"
          }
        }
      }
    }
  }
};

// Safe Image component
const SafeImage = ({ src, alt, ...props }: any) => {
  if (!src) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image</span>
      </div>
    );
  }
  
  const isRemoteImage = src.startsWith('http');
  
  if (isRemoteImage) {
    const style = props.fill ? { position: 'absolute', width: '100%', height: '100%' } : {};
    return (
      <img
        src={src}
        alt={alt}
        style={style}
        className={props.className}
        {...props}
      />
    );
  }
  
  return <Image src={src} alt={alt} {...props} />;
};

async function getArticle(slug: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles[slug] || null;
}

// Generate static params for ISR/SSG
export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(mockArticles).map(slug => ({ slug }));
}


export default async function ArticlePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // ✅ unwrap params

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white ">
      <main>
        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <SafeImage
            src={article.attributes.Image?.data?.attributes?.url}
            alt={article.attributes.Title}
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0">
              <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm px-3 py-1 bg-blue-600 text-white rounded-full">
                      Logistics
                    </span>
                    <time className="text-white/90 text-sm">
                      {new Date(article.attributes.PublishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {article.attributes.Title}
                  </h1>
                  <p className="text-lg text-white/90">
                    {article.attributes.Excerpt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Back Button - FIXED: Changed from /insights to /articles */}
              <Link 
                href="/articles" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group"
              >
                <svg 
                  className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Articles
              </Link>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {article.attributes.Content ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: article.attributes.Content }}
                    className="article-content"
                  />
                ) : (
                  <p>Content coming soon...</p>
                )}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex gap-4">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles - FIXED: Changed from /insights to /articles */}
        <section className="py-12 bg-gray-50">
          <div className="mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(mockArticles)
                .filter(a => a.attributes.Slug !== article.attributes.Slug)
                .map((relatedArticle) => (
                  <Link 
                    key={relatedArticle.id} 
                    href={`/articles/${relatedArticle.attributes.Slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <SafeImage
                        src={relatedArticle.attributes.Image?.data?.attributes?.url}
                        alt={relatedArticle.attributes.Title}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedArticle.attributes.Title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {relatedArticle.attributes.Excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}