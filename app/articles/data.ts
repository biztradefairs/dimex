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
Title: "How Digital Manufacturing Is Transforming Die & Mould Production",
Slug: "how-e-commerce-logistics-is-redefining-fast-and-flexible-delivery",
Excerpt:
"Digital manufacturing technologies are transforming how dies and moulds are designed, produced, and delivered to global manufacturing industries.",
Content: `
<p><strong>The die and mould industry</strong> is undergoing a major transformation driven by digital manufacturing technologies. Advanced CAD/CAM systems, simulation software, and automation are enabling toolmakers to design and produce complex tooling solutions faster and with greater precision.</p>

<h2>The Shift Toward Smart Tool Rooms</h2>
<p>Modern tool rooms are no longer dependent solely on manual expertise. Digital integration allows manufacturers to simulate mould performance before production begins, reducing costly design errors.</p>

<ul>
<li>Integrated CAD/CAM design systems</li>
<li>Simulation-driven mould optimization</li>
<li>Automated CNC machining</li>
<li>Digital inspection and metrology</li>
</ul>

<h2>Benefits for Manufacturers</h2>
<p>Manufacturers benefit from shorter lead times, improved product quality, and faster innovation cycles. Digital manufacturing also enables collaboration between design teams and toolmakers across global supply chains.</p>

<p>As global manufacturing becomes more competitive, digital tooling capabilities will become a critical differentiator for die and mould manufacturers.</p>
`,
PublishedDate: "2026-02-15T03:30:00.000Z",
Image: {
data: {
attributes: {
url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758"
}
}
}
}
},

{
id: "96",
attributes: {
Title: "The Role of Toolmakers in Modern Manufacturing Supply Chains",
Slug: "the-role-of-freight-forwarders-in-managing-complex-supply-chains",
Excerpt:
"Toolmakers play a critical role in supporting manufacturing industries through precision dies, moulds, and tooling solutions.",
Content: `
<p><strong>Toolmakers</strong> are the backbone of modern manufacturing industries. Every automotive component, plastic product, medical device, or electronics housing requires precision tooling before production can begin.</p>

<h2>Importance of Precision Tooling</h2>
<p>Dies and moulds determine the final quality of manufactured components. Even small variations in tooling accuracy can affect product performance and consistency.</p>

<ul>
<li>Injection moulds for plastics</li>
<li>Press tools for metal forming</li>
<li>Die casting moulds for complex components</li>
<li>Precision tooling for electronics manufacturing</li>
</ul>

<h2>Technology Advancements</h2>
<p>Modern toolmakers are adopting advanced machining technologies including 5-axis machining, EDM systems, and automated polishing technologies.</p>

<p>These innovations allow manufacturers to produce complex components with higher accuracy and repeatability.</p>
`,
PublishedDate: "2026-02-01T03:30:00.000Z",
Image: {
data: {
attributes: {
url: "https://images.unsplash.com/photo-1581093458791-9d8e6b6f7c2d"
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

<p>India’s die & mould industry has evolved from a domestic-support sector into a globally competitive manufacturing powerhouse. With strong demand from automotive, electronics, medical devices, and aerospace sectors, the country is experiencing rapid growth.</p>

<h3>Key Growth Drivers</h3>

<ul>
<li>Expansion of automotive and EV manufacturing</li>
<li>Government initiatives like Make in India</li>
<li>Increasing investment in CNC and 5-axis machining</li>
<li>Growing exports to Europe and Southeast Asia</li>
</ul>

<p>As global supply chains diversify, India is becoming an important partner for international tooling requirements.</p>
`,
PublishedDate: "2025-11-20T03:30:00.000Z",
Image: {
data: {
attributes: {
url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e"
}
}
}
}
},

{
id: "82",
attributes: {
Title: "How Automation Is Transforming Tool Room Operations",
Slug: "how-are-ports-preparing-for-increased-freight-handling-demands-in-2026",
Excerpt:
"Automation technologies are helping tool rooms increase productivity and precision.",
Content: `
<p><strong>Automation</strong> is transforming tool room operations across the world. From automated machining cells to robotic polishing systems, manufacturers are improving productivity while maintaining high precision standards.</p>

<h2>Key Automation Technologies</h2>

<ul>
<li>Robotic electrode handling systems</li>
<li>Automated CNC machining cells</li>
<li>Integrated tool monitoring systems</li>
<li>Smart inspection and quality control</li>
</ul>

<p>Automation not only increases production efficiency but also reduces dependence on manual operations, enabling toolmakers to scale production capacity.</p>
`,
PublishedDate: "2025-11-05T04:15:00.000Z",
Image: {
data: {
attributes: {
url: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1"
}
}
}
}
},

{
id: "85",
attributes: {
Title: "DIEMEX 2026 – Key Industry Segments and Technology Showcase",
Slug: "sklad-tech-2026-participants-and-sections",
Excerpt:
"Explore the technology sectors and solutions that will be showcased at DIEMEX 2026.",
Content: `
<p><strong>DIEMEX 2026 – International Die & Mould Expo</strong> will showcase the latest technologies and solutions for tooling manufacturers, engineers, and production specialists.</p>

<h2>Exhibition Segments</h2>

<ul>
<li>Die & mould manufacturing technologies</li>
<li>CNC machining and high-speed milling</li>
<li>EDM and wire-cut machines</li>
<li>CAD/CAM and mould design software</li>
<li>Surface finishing and polishing technologies</li>
<li>Tool steel and raw materials</li>
<li>Metrology and quality inspection systems</li>
</ul>

<p>DIEMEX brings together tooling manufacturers, machine suppliers, and technology providers under one platform to accelerate innovation in the die and mould industry.</p>
`,
PublishedDate: "2025-12-24T06:00:00.000Z",
Image: {
data: {
attributes: {
url: "https://images.unsplash.com/photo-1581092921461-eab62e97a780"
}
}
}
}
},

{
id: "84",
attributes: {
Title: "Season’s Greetings from the DIEMEX Team",
Slug: "happy-new-year-and-merry-christmas",
Excerpt:
"The DIEMEX team extends warm holiday wishes to exhibitors, partners, and visitors.",
Content: `
<p><strong>As the year comes to a close</strong>, the DIEMEX team would like to thank our exhibitors, partners, and industry professionals for their continued support.</p>

<h2>A Year of Industry Progress</h2>

<p>The global die and mould industry continues to advance through innovation, digital manufacturing technologies, and growing international collaboration.</p>

<h2>Looking Forward to DIEMEX 2026</h2>

<p>DIEMEX 2026 will bring together tooling manufacturers, machine suppliers, and technology providers from around the world to explore the future of precision manufacturing.</p>

<p>We wish our entire industry community a successful year ahead filled with innovation, growth, and collaboration.</p>

<p><strong>Happy Holidays and a Prosperous New Year!</strong></p>
`,
PublishedDate: "2025-12-26T09:15:00.000Z",
Image: {
data: {
attributes: {
url: "https://images.unsplash.com/photo-1513151233558-d860c5398176"
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
      __typename: "ComponentDiemexaArticlesList",
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