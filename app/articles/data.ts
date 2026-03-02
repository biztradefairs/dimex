// app/articles/data.ts

export interface Article {
  id: string;
  attributes: {
    Title: string;
    Slug: string;
    Excerpt: string;
    Content: string;
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

export interface PageData {
  Header: {
    Title: string;
    Content: string;
  };
  Sections: Array<{
    __typename: string;
    id: string;
    Articles?: Article[];
  }>;
}

/* ================================
   Articles (ONLY 6 WITH FULL DATA)
================================ */

export const articles: Article[] = [
  {
    id: "97",
    attributes: {
      Title: "How E-Commerce Logistics Is Redefining Fast and Flexible Delivery",
      Slug: "how-e-commerce-logistics-is-redefining-fast-and-flexible-delivery",
      Excerpt:
        "Explore how e-commerce logistics drives fast, flexible delivery models and transforms fulfilment strategies across global supply chains.",
      Content:
        "E-commerce logistics continues to reshape global trade by accelerating last-mile innovation, micro-fulfilment centres, and automated warehousing systems. Companies are investing in real-time tracking, predictive inventory management, and regional distribution hubs to meet rising customer expectations for speed and transparency. As demand grows, logistics providers are embracing technology-driven solutions to improve scalability and cost-efficiency.",
      PublishedDate: "2026-02-15T03:30:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/shutterstock_2060451893_5cd959fc52.webp"
          }
        }
      }
    }
  },
  {
    id: "96",
    attributes: {
      Title: "The Role of Freight Forwarders in Managing Complex Supply Chains",
      Slug: "the-role-of-freight-forwarders-in-managing-complex-supply-chains",
      Excerpt:
        "Freight forwarders play a critical role in coordinating multimodal transport and ensuring seamless cross-border logistics operations.",
      Content:
        "Modern freight forwarders act as strategic partners, integrating digital documentation, customs expertise, and carrier management to optimize cross-border flows. With supply chains becoming more interconnected, forwarders provide risk mitigation, route optimization, and compliance support across Eurasian trade corridors.",
      PublishedDate: "2026-02-01T03:30:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/shutterstock_2471682929_d7e3484915.webp"
          }
        }
      }
    }
  },
  {
    id: "83",
    attributes: {
      Title: "Why Is Rail Freight Becoming a Stronger Alternative for Long-Haul Cargo in 2026?",
      Slug: "why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026",
      Excerpt:
        "Rail freight offers reliability, sustainability, and cost efficiency for long-haul cargo across Eurasia.",
      Content:
        "Rail freight is gaining momentum due to improved infrastructure, predictable transit times, and lower carbon emissions compared to road transport. Investments in intermodal hubs and digital rail tracking have strengthened reliability, making rail a competitive solution for long-distance cargo movements in 2026.",
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
      Excerpt:
        "Ports are modernizing infrastructure and digital systems to meet rising cargo volumes.",
      Content:
        "To address increased freight volumes, ports are investing in automated cranes, digital cargo management systems, and inland connectivity upgrades. Enhanced berth productivity and integrated rail-road networks ensure efficient cargo turnover while minimizing dwell time.",
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
  {
    id: "85",
    attributes: {
      Title: "SkladTech 2026 — Participants and Sections",
      Slug: "sklad-tech-2026-participants-and-sections",
      Excerpt:
        "Discover the exhibitors and industry segments participating in SkladTech 2026.",
      Content:
        "SkladTech 2026 will showcase advanced warehouse automation, robotics, storage systems, and fulfilment innovations. The exhibition connects suppliers, logistics providers, and retailers to explore technologies shaping the future of warehousing and distribution.",
      PublishedDate: "2025-12-24T06:00:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/TR_2025_061_c602a7d767.webp"
          }
        }
      }
    }
  },
  {
    id: "84",
    attributes: {
      Title: "Happy New Year and Merry Christmas!",
      Slug: "happy-new-year-and-merry-christmas",
      Excerpt:
        "The team extends warm holiday wishes to exhibitors, partners, and visitors.",
      Content:
        "As the year concludes, we thank our exhibitors, partners, and visitors for their continued trust and collaboration. We look forward to welcoming the global logistics community again in the coming year with new opportunities, innovations, and partnerships.",
      PublishedDate: "2025-12-26T09:15:00.000Z",
      Image: {
        data: {
          attributes: {
            url: "https://cdn.itegroupnews.com/TR_NY_Postcard_02preview_e50c14384f.webp"
          }
        }
      }
    }
  }
];

/* ================================
   Page Data
================================ */

export const mockPageData: PageData = {
  Header: {
    Title: "Industry Insights and News",
    Content:
      "Stay up to date with the latest trends, innovations, and developments shaping the warehousing and logistics industry."
  },
  Sections: [
    {
      __typename: "ComponentTransRussiaArticlesList",
      id: "2",
      Articles: articles
    }
  ]
};

/* ================================
   Helper Functions
================================ */

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  return articles.find(article => article.attributes.Slug === slug) || null;
}

export function getAllArticleSlugs(): string[] {
  return articles.map(article => article.attributes.Slug);
}