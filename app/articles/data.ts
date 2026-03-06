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
   Articles with FULL HTML Content
================================ */

export const articles: Article[] = [
  {
 id: "97",
  attributes: {
    Title: "How Automation Is Transforming Modern Tool Rooms",
    Slug: "how-e-commerce-logistics-is-redefining-fast-and-flexible-delivery",
    Excerpt:
      "Automation technologies are transforming modern tool rooms by improving precision, productivity, and manufacturing efficiency.",
    Content: `
    <p><strong>Automation in tool rooms</strong> is transforming the way dies and moulds are designed, manufactured, and maintained. With increasing demand for precision components in automotive, electronics, and consumer products, manufacturers are integrating advanced automation technologies to improve efficiency and accuracy.</p>

    <h2>The Shift Toward Smart Tool Rooms</h2>
    <p>Modern tool rooms are increasingly adopting automated CNC machining centers, robotic part handling systems, and advanced inspection technologies. These systems help reduce human error while significantly increasing production speed.</p>

    <h2>Key Technologies Driving Automation</h2>
    <ul>
      <li>High-speed 5-axis CNC machining centers</li>
      <li>Automated EDM and wire-cut machines</li>
      <li>Robotic tool loading and pallet systems</li>
      <li>Integrated CAD/CAM manufacturing workflows</li>
      <li>AI-driven quality inspection systems</li>
    </ul>

    <h2>Benefits for Tooling Manufacturers</h2>
    <p>Automation allows tooling manufacturers to produce complex dies and moulds with consistent quality while reducing production cycle times. It also helps companies meet growing global demand while maintaining competitive costs.</p>

    <p>Industry platforms such as <strong>DIEMEX – International Die & Mould Expo</strong> showcase the latest automation solutions helping tool rooms move toward Industry 4.0 manufacturing.</p>
    `,
    PublishedDate: "2026-02-15T03:30:00.000Z",
    Image: {
      data: {
        attributes: {
          url: "/images/article1.jpg"
          }
        }
      }
    }
  },
  {
    id: "96",
  attributes: {
    Title: "The Role of Precision Tooling in Modern Manufacturing",
    Slug: "the-role-of-freight-forwarders-in-managing-complex-supply-chains",
    Excerpt:
      "Precision tooling plays a critical role in enabling high-quality manufacturing across automotive, electronics, and consumer industries.",
    Content: `
    <p><strong>Precision tooling</strong> forms the backbone of modern manufacturing. From automotive body panels to plastic consumer products, high-quality dies and moulds are essential for producing complex components with consistent accuracy.</p>

    <h2>Importance of Tooling in Industrial Production</h2>
    <p>Every mass-produced product begins with a precisely engineered die or mould. Manufacturers rely on these tools to ensure repeatability, dimensional accuracy, and surface finish.</p>

    <h2>Key Industries Driving Tooling Demand</h2>
    <ul>
      <li>Automotive and electric vehicles</li>
      <li>Electronics and semiconductor packaging</li>
      <li>Medical devices and healthcare products</li>
      <li>Consumer goods and packaging</li>
    </ul>

    <h2>Advancements in Tooling Technology</h2>
    <p>Advanced simulation software, high-speed machining, and additive manufacturing are enabling tooling companies to produce more complex designs while reducing development time.</p>

    <p>Events such as <strong>DIEMEX 2026</strong> bring together tooling manufacturers, technology providers, and industrial buyers to explore these innovations.</p>
    `,
    PublishedDate: "2026-02-01T03:30:00.000Z",
    Image: {
      data: {
        attributes: {
          url: "/images/article2.jpg"
          }
        }
      }
    }
  },
  {
    id: "83",
  attributes: {
    Title: "The Rise of India as a Global Die & Mould Manufacturing Hub",
    Slug: "why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026",
    Excerpt:
      "India is rapidly emerging as a competitive global force in precision tooling and mould manufacturing.",
    Content: `
    <h2>India’s Transformation in Tooling Excellence</h2>

    <p>The <strong>die and mould manufacturing industry in India</strong> has experienced remarkable growth over the past decade. Rapid expansion in automotive, electronics, and medical device manufacturing has increased demand for high-precision tooling.</p>

    <h2>Drivers of Industry Growth</h2>
    <ul>
      <li>Government initiatives such as Make in India</li>
      <li>Growth of electric vehicle manufacturing</li>
      <li>Increased adoption of 5-axis CNC machining</li>
      <li>Rising exports to Europe and Southeast Asia</li>
    </ul>

    <h2>Future Opportunities</h2>
    <p>India is becoming a preferred sourcing destination for global OEMs seeking cost-effective and high-quality tooling solutions. Continued investment in automation and digital manufacturing will further strengthen the country’s global competitiveness.</p>
    `,
    PublishedDate: "2025-11-20T03:30:00.000Z",
    Image: {
      data: {
        attributes: {
          url: "/images/article3.jpg"
          }
        }
      }
    }
  },
  {
   id: "82",
  attributes: {
    Title: "How Smart Manufacturing Is Reshaping the Tooling Industry",
    Slug: "how-are-ports-preparing-for-increased-freight-handling-demands-in-2026",
    Excerpt:
      "Smart manufacturing technologies are reshaping the global die and mould industry.",
    Content: `
    <p><strong>Smart manufacturing</strong> is transforming the global die and mould industry by integrating digital technologies into traditional machining and toolmaking processes.</p>

    <h2>Industry 4.0 in Tooling</h2>
    <p>Tool manufacturers are adopting connected machines, real-time production monitoring, and predictive maintenance systems to improve productivity and reduce downtime.</p>

    <h2>Key Technologies</h2>
    <ul>
      <li>Industrial IoT sensors</li>
      <li>Digital twins for tooling simulation</li>
      <li>AI-driven machining optimization</li>
      <li>Cloud-based production management</li>
    </ul>

    <p>These technologies are helping tooling companies improve manufacturing precision while reducing production costs.</p>
    `,
    PublishedDate: "2025-11-05T04:15:00.000Z",
    Image: {
      data: {
        attributes: {
          url: "/images/article4.jpg"
          }
        }
      }
    }
  },
  {
   id: "85",
  attributes: {
    Title: "Key Technologies Driving Innovation in Die & Mould Manufacturing",
    Slug: "sklad-tech-2026-participants-and-sections",
    Excerpt:
      "Explore the latest technologies transforming die and mould manufacturing worldwide.",
    Content: `
    <p>The die and mould industry is undergoing rapid technological transformation. New machining technologies and digital engineering tools are enabling manufacturers to produce more complex components with improved precision.</p>

    <h2>Emerging Technologies</h2>
    <ul>
      <li>High-speed CNC machining centers</li>
      <li>Advanced EDM and wire-cut technology</li>
      <li>3D printing for rapid tooling</li>
      <li>Simulation-driven mould design</li>
      <li>Automated quality inspection systems</li>
    </ul>

    <p>These innovations allow tooling manufacturers to reduce production time, improve quality, and remain competitive in global markets.</p>

    <p><strong>DIEMEX 2026 – International Die & Mould Expo</strong> will showcase these technologies and connect global tooling suppliers with buyers and manufacturers.</p>
    `,
    PublishedDate: "2025-12-24T06:00:00.000Z",
    Image: {
      data: {
        attributes: {
          url: "/images/article5.jpg"
          }
        }
      }
    }
  },
  {
    id: "84",
  attributes: {
    Title: "Future Trends in the Global Die & Mould Industry",
    Slug: "happy-new-year-and-merry-christmas",
    Excerpt:
      "Discover the key trends shaping the future of the global die and mould manufacturing industry.",
    Content: `
    <p>The global <strong>die and mould industry</strong> is evolving rapidly as manufacturers adopt new materials, digital engineering tools, and automated production systems.</p>

    <h2>Major Industry Trends</h2>
    <ul>
      <li>Increased adoption of electric vehicle component tooling</li>
      <li>Growth in precision plastic moulding</li>
      <li>Integration of additive manufacturing with traditional machining</li>
      <li>Expansion of smart factories and digital tool rooms</li>
    </ul>

    <h2>Global Market Outlook</h2>
    <p>Demand for advanced tooling solutions will continue to grow as industries require lightweight components, higher precision, and faster product development cycles.</p>

    <p>International industry events such as <strong>DIEMEX</strong> provide a platform for manufacturers and technology providers to explore new partnerships and innovations.</p>
    `,
    PublishedDate: "2025-12-26T09:15:00.000Z",
    Image: {
      data: {
        attributes: {
          url: "/images/article6.jpg"
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
      "Stay up to date with the latest trends, innovations, and developments shaping the die,mould and tooling industry."
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