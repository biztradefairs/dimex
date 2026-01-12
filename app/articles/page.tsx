import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types
interface Article {
  id: string;
  attributes: {
    Title: string;
    Slug: string;
    Excerpt: string;
    PublishedDate: string;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface Partner {
  id: string;
  attributes: {
    Name: string;
    Slug: string;
    Logo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

interface PageData {
  Header: {
    Title: string;
    Content: string;
  };
  Sections: Array<{
    __typename: string;
    id: string;
    Articles?: Article[];
    PartnersSectionTitle?: string;
    Partners?: {
      data: Partner[];
    };
  }>;
}

// Safe Image component that handles missing config
const SafeImage = ({ src, alt, ...props }: any) => {
  if (!src) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image</span>
      </div>
    );
  }
  
  // Check if it's a remote image from configured domains
  const isRemoteImage = src.startsWith('http');
  
  if (isRemoteImage) {
    // Use regular img tag for now, or configure next.config.js
    return (
      <img
        src={src}
        alt={alt}
        {...props}
      />
    );
  }
  
  // Use Next.js Image for local images
  return <Image src={src} alt={alt} {...props} />;
};

// Mock data
const mockPageData: PageData = {
  Header: {
    Title: "Industry Insights and News",
    Content: "Stay up to date with the current trends and latest innovations driving the warehousing and logistics industry forward."
  },
  Sections: [
    {
      __typename: "ComponentTransRussiaArticlesList",
      id: "2",
      Articles: [
        {
          id: "83",
          attributes: {
            Title: "Why Is Rail Freight Becoming a Stronger Alternative for Long-Haul Cargo in 2026?",
            Slug: "why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026",
            Excerpt: "Rail freight for long-haul cargo offers reliable schedules, lower emissions, and optimized corridor operations. Digital planning, terminal upgrades, and sea–land integration help shippers move goods efficiently across Eurasia in 2026.",
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
        {
          id: "82",
          attributes: {
            Title: "How Are Ports Preparing for Increased Freight Handling Demands in 2026?",
            Slug: "how-are-ports-preparing-for-increased-freight-handling-demands-in-2026",
            Excerpt: "Freight handling in ports is evolving with infrastructure upgrades, digital operations, and sea–land integration. Ports in Eurasia enhance berth productivity, reduce dwell, and ensure reliable inland handoffs to meet growing 2026 cargo demands.",
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
      ]
    },
    {
      __typename: "ComponentTransRussiaPartnersSection",
      id: "3",
      PartnersSectionTitle: "Partners & Sponsors",
      Partners: {
        data: [
          {
            id: "27",
            attributes: {
              Name: "Apace Digital Cargo",
              Slug: "apace-digital-cargo",
              Logo: {
                data: {
                  attributes: {
                    url: "https://cdn.itegroupnews.com/APACE_Digital_Cargo_523bc2c2a2.webp"
                  }
                }
              }
            }
          }
        ]
      }
    }
  ]
};

async function getPageData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPageData;
}

export default async function ArticlesPage() {
  const pageData = await getPageData();
  
  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error loading content</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const articles = pageData.Sections?.find(section => section.__typename === 'ComponentTransRussiaArticlesList')?.Articles || [];
  const partnersSection = pageData.Sections?.find(section => section.__typename === 'ComponentTransRussiaPartnersSection');

  return (
    <div className="min-h-screen bg-white">
      <main className=''>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 mt-10">
              {pageData.Header?.Title || "Industry Insights"}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
              {pageData.Header?.Content || "Latest news and insights from the logistics industry"}
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Link href={`/articles/${article.attributes.Slug}`} className="block">
                    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                      <SafeImage
                        src={article.attributes.Image?.data?.attributes?.url}
                        alt={article.attributes.Title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        fill
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          Logistics
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {article.attributes.Title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {article.attributes.Excerpt}
                      </p>
                      <div className="flex items-center text-blue-600 font-semibold group">
                        <span>Read Article</span>
                        <svg 
                          className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Load More Articles
              </button>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        {partnersSection && partnersSection.Partners && (
          <section className="py-12 md:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                {partnersSection.PartnersSectionTitle || "Our Partners"}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {partnersSection.Partners.data.map((partner) => (
                  <div
                    key={partner.id}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
                  >
                    <Link
                      href={`/partner/${partner.attributes.Slug}`}
                      className="flex flex-col items-center gap-4 w-full"
                    >
                      <div className="h-24 w-full flex items-center justify-center p-2">
                        <SafeImage
                          src={partner.attributes.Logo?.data?.attributes?.url}
                          alt={partner.attributes.Name}
                          className="max-h-full max-w-full object-contain"
                          width={120}
                          height={80}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 text-center hover:text-blue-600 transition-colors">
                        {partner.attributes.Name}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}