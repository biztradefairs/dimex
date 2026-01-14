// app/articles/data.ts - REMOVE "use client" FROM HERE
export interface Article {
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

export interface Partner {
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

export interface PageData {
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

// Mock data for individual articles
export const mockArticles: Record<string, Article> = {
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
  },
  "the-future-of-autonomous-trucks-in-logistics": {
    id: "84",
    attributes: {
      Title: "The Future of Autonomous Trucks in Logistics",
      Slug: "the-future-of-autonomous-trucks-in-logistics",
      Excerpt: "Autonomous trucks are set to revolutionize long-haul transportation with improved safety and efficiency.",
      Content: `
        <h2>Autonomous Truck Revolution</h2>
        <p>The logistics industry is on the brink of a major transformation with the adoption of autonomous truck technology.</p>
        
        <h3>Benefits of Autonomous Trucks</h3>
        <ul>
          <li><strong>24/7 Operation:</strong> No driver fatigue limitations</li>
          <li><strong>Fuel Efficiency:</strong> Optimized driving patterns</li>
          <li><strong>Safety:</strong> Reduced human error</li>
          <li><strong>Cost Savings:</strong> Lower labor costs</li>
        </ul>
        
        <p>By 2026, we expect to see significant deployment of autonomous trucks on major logistics corridors.</p>
      `,
      PublishedDate: "2025-10-15T08:00:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/autonomous_truck_tech.webp"
          }
        }
      }
    }
  },
  "warehouse-automation-trends-2026": {
    id: "85",
    attributes: {
      Title: "Warehouse Automation Trends for 2026",
      Slug: "warehouse-automation-trends-2026",
      Excerpt: "AI and robotics are transforming warehouse operations with unprecedented efficiency gains.",
      Content: `
        <h2>Next-Generation Warehouse Automation</h2>
        <p>Warehouse automation is evolving rapidly with new technologies that promise to reshape inventory management and order fulfillment.</p>
        
        <h3>Key Trends</h3>
        <ul>
          <li><strong>AI-Powered Inventory Management:</strong> Real-time tracking and optimization</li>
          <li><strong>Collaborative Robotics:</strong> Human-robot collaboration</li>
          <li><strong>IoT Integration:</strong> Smart warehouse ecosystems</li>
          <li><strong>Predictive Analytics:</strong> Demand forecasting and optimization</li>
        </ul>
        
        <p>These technologies are making warehouses smarter, faster, and more efficient than ever before.</p>
      `,
      PublishedDate: "2025-09-28T10:30:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/warehouse_automation.webp"
          }
        }
      }
    }
  }
};

// Mock data for articles listing page
export const mockPageData: PageData = {
  Header: {
    Title: "Industry Insights and News",
    Content: "Stay up to date with the current trends and latest innovations driving the warehousing and logistics industry forward."
  },
  Sections: [
    {
      __typename: "ComponentTransRussiaArticlesList",
      id: "2",
      Articles: [
        mockArticles["why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026"],
        mockArticles["how-are-ports-preparing-for-increased-freight-handling-demands-in-2026"],
        mockArticles["the-future-of-autonomous-trucks-in-logistics"],
        mockArticles["warehouse-automation-trends-2026"]
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
          },
          {
            id: "28",
            attributes: {
              Name: "Global Logistics Network",
              Slug: "global-logistics-network",
              Logo: {
                data: {
                  attributes: {
                    url: "https://cdn.itegroupnews.com/global_logistics_partner.webp"
                  }
                }
              }
            }
          },
          {
            id: "29",
            attributes: {
              Name: "Supply Chain Solutions Inc.",
              Slug: "supply-chain-solutions",
              Logo: {
                data: {
                  attributes: {
                    url: "https://cdn.itegroupnews.com/supply_chain_partner.webp"
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

// Helper function to get all article slugs for static generation
export function getAllArticleSlugs(): string[] {
  return Object.keys(mockArticles);
}

// Helper function to get article by slug
export function getArticleBySlug(slug: string): Article | null {
  return mockArticles[slug] || null;
}

// Helper function to get all articles for listing
export function getAllArticles(): Article[] {
  return Object.values(mockArticles);
}