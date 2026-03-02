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
      Title: "How E-Commerce Logistics Is Redefining Fast and Flexible Delivery",
      Slug: "how-e-commerce-logistics-is-redefining-fast-and-flexible-delivery",
      Excerpt:
        "Explore how e-commerce logistics drives fast, flexible delivery models and transforms fulfilment strategies across global supply chains.",
      Content: `<p><strong>E-commerce logistics&nbsp;</strong>is shifting toward faster, more flexible delivery by redesigning fulfilment to prioritise speed, accuracy, and dependable delivery slots. This shift relies on denser warehouse networks closer to demand, tighter cut-off times, and greater use of automation. Automated picking, real-time transport visibility, and carrier orchestration across road, rail, air, and last-mile networks now define competitive delivery performance. For operators serving Russia, the CIS, and wider Eurasian corridors, the result is a measurable, manageable delivery promise: stable transit milestones, fewer failed handovers, and clearer cost-to-serve by channel and region.</p>
<p>&nbsp;</p>
<h2>Why Delivery Expectations Are Forcing a Logistics Reset</h2>
<p>&nbsp;</p>
<p>Fast delivery is no longer a premium feature reserved for major cities. Marketplaces and D2C brands have trained customers to expect short lead times, narrow delivery windows, and proactive updates when issues arise. That expectation is scaling alongside online demand. A Yakov &amp; Partners study estimates Russia's e-commerce market expanded around 7.5x between 2019 and 2024, reaching RUB 12.6 trillion.</p>
<p>&nbsp;</p>
<p>For logistics leaders, this growth shifts the operating model in three ways:</p>
<ul>
<li><strong>Inventory needs to move closer to demand</strong>, raising the bar for multi-node replenishment and inter-warehouse transfer control.<br /><br />&nbsp;</li>
<li><strong>Order profiles skew smaller and more frequent</strong>, with higher packaging, picking, and returns workloads per rouble of revenue.<br /><br />&nbsp;</li>
<li><strong>Failure becomes visible immediately</strong>, since customers track parcels and escalate quickly when milestones slip.<br /><br />&nbsp;</li>
</ul>
<h2>From Central Dcs to&nbsp; Distributed Fulfilment Networks</h2>
<p>&nbsp;</p>
<p>Traditional hub-and-spoke distribution still matters for import flows and bulk replenishment, yet e-commerce delivery performance is increasingly determined by the "last 100 kilometres": local stock levels, cut-off discipline, and carrier injection timing.</p>
<h3>Micro-fulfilment, dark stores, and cross-docks</h3>
<p>Regional networks are adopting smaller fulfilment sites to compress lead times and reduce last-mile mileage. Cross-docks and sortation points support fast reallocation between carriers and routes when demand shifts. The trade-off is a more complex inventory control, where A Warehouse Management System (<strong>WMS</strong>) accuracy and replenishment cadence decide service levels.</p>
<h3>Flex capacity for peaks without breaking service levels</h3>
<p>Promotional spikes create sudden volume surges, so operators are designing flex capacity through temporary labour plans, overflow space, and carrier buffers. The aim is not "more capacity"; it is capacity that can be activated without degrading pick accuracy or delivery reliability.</p>
<p>&nbsp;</p>
<h2>Transport Orchestration: Speed Needs Mode Choice, Not Mode Loyalty</h2>
<p>&nbsp;</p>
<p>E-commerce volumes do not move in a single direction. They move on the mode that hits the promised delivery window at an acceptable cost-to-serve, with workable risk.</p>
<ul>
<li>Roads underpin regional distribution and the last mile, where route density, driver availability, and delivery appointment scheduling determine outcomes.</li>
<li>Air supports time-critical lanes and high-value parcels where missed cut-offs are expensive.</li>
<li>Rail and sea remain relevant for longer replenishment legs and containerised inbound, where schedule planning and terminal dwell drive downstream availability.</li>
<li>Multimodal planning matters because congestion, weather, and capacity constraints now change weekly rather than annually.</li>
</ul>
<p>Digital performance measurement is moving from "best effort tracking" to shipment-speed benchmarking. The World Bank's 2023 Logistics Performance Index (<a href="https://lpi.worldbank.org/"><strong>LPI</strong></a>) reflects this shift by measuring trade speed using large-scale shipment data.</p>
<p>&nbsp;</p>
<h2>Warehouse Execution: Where Fast Delivery Is Won or Lost</h2>
<p>&nbsp;</p>
<p>For most e-commerce operations, delivery promises are set inside the warehouse long before a parcel reaches a vehicle. The key constraint is time: picking, packing, labelling, and sortation must be completed before carrier cut-offs, with minimal error.</p>
<p>For warehouse operators, SkladTech-relevant priorities show up clearly in day-to-day KPIs:</p>
<h3>Automation that targets bottlenecks</h3>
<p>Automation pays back fastest when it removes a recurring constraint, such as manual sortation during peak or slow replenishment to pick faces. Common focus areas include:</p>
<ul>
<li>Conveyors and sorters to stabilise outbound throughput</li>
<li>Pick-to-light and voice picking to reduce mis-picks</li>
<li>Automated storage and retrieval for high-density SKU profiles</li>
<li>Dimensioning and weighing to cut billing disputes and rework</li>
</ul>
<h3>Systems that turn ETA into labour and dock plans</h3>
<p>WMS and intralogistics control systems matter most when they support operational decisions: staffing, wave planning, dock appointments, and exception routing. Data accuracy becomes a cost issue, since poor master data drives mis-slots, failed deliveries, and return inflation.</p>
<p>&nbsp;</p>
<h2>Cost Control Without Sacrificing Service Levels</h2>
<p>&nbsp;</p>
<p>Fast delivery can erode margins if the cost-to-serve is not visible at the lane, region, and order profile levels. Leaders are moving towards granular cost models tied to service commitments. Market growth in same-day delivery underlines why: Grand View Research estimates the global same-day delivery market was about USD 9.9 billion in 2024 and projects strong growth through 2030.</p>
<p>A practical way to frame e-commerce delivery design is to link the customer promise to the operational levers that support it:</p>
<p>&nbsp;</p>
<figure class="table">
<table class="ck-table-resized">
<colgroup>
<col style="width:33.33%;" />
<col style="width:33.33%;" />
<col style="width:33.34%;" />
</colgroup>
<tbody>
<tr>
<td><strong>Delivery promise</strong></td>
<td><strong>What must be true operationally?</strong></td>
<td><strong>What gets measured</strong></td>
</tr>
<tr>
<td>Next day in key regions</td>
<td>Late cut-off, fast pick/pack, reliable carrier injection</td>
<td>Cut-off hit rate; on-time despatch</td>
</tr>
<tr>
<td>Two-day nationwide</td>
<td>Regional stock placement, stable trunking, controlled dwell</td>
<td>Linehaul punctuality; dwell time</td>
</tr>
<tr>
<td>Predictable time slots</td>
<td>Route density, appointment control, proactive exception handling</td>
<td>First-attempt success; slot adherence</td>
</tr>
<tr>
<td>Low-cost standard</td>
<td>Consolidation, carrier mix, packaging discipline</td>
<td>Cost per order; damage rate</td>
</tr>
</tbody>
</table>
</figure>
<h2>&nbsp;</h2>
<h2>Connect With Buyers Shaping Next-Generation Fulfilment</h2>
<p>&nbsp;</p>
<p>TransRussia &amp; SkladTech 2026 (<i>17–19 March 2026, Crocus Expo, Pavilion 3</i>) brings together shippers, forwarders, carriers, and technology providers across transport and warehousing, giving buyers a single environment for technical validation and peer exchange. "As a&nbsp;<a href="https://trstexpo.com/"><strong>transport and logistics exhibition</strong></a> focused on procurement-led conversations, TransRussia &amp; SkladTech brings together 30,500+ visitors, including procurement teams actively sourcing partners and logistics equipment.</p>
<p>Submit a&nbsp;<a href="https://trstexpo.com/exhibiting-enquiry/"><strong>logistics exhibit enquiry</strong></a> to connect with buyers shaping the future of fulfilment.</p>`,
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
      Content: `<p><strong>Freight forwarders</strong> have evolved from simple intermediaries to strategic partners in global supply chain management. In today's complex logistics environment, they provide essential coordination across multiple transport modes, customs regimes, and regulatory frameworks.</p>

<p>&nbsp;</p>

<h2>The Evolving Role of Freight Forwarders</h2>

<p>&nbsp;</p>

<p>Modern freight forwarders act as orchestrators of complex supply chains, integrating digital documentation, customs expertise, and carrier management to optimize cross-border flows. Their role has expanded significantly as supply chains become more interconnected and subject to disruption.</p>

<p>&nbsp;</p>

<p>Key responsibilities of contemporary freight forwarders include:</p>

<ul>
<li><strong>Multimodal transport coordination</strong> - Selecting and managing optimal combinations of road, rail, air, and sea freight to balance cost, speed, and reliability.</li>
<li><strong>Customs compliance and documentation</strong> - Navigating complex international trade regulations and ensuring all documentation meets destination country requirements.</li>
<li><strong>Risk mitigation</strong> - Identifying potential disruptions and developing contingency plans to maintain supply chain continuity.</li>
<li><strong>Carrier relationship management</strong> - Maintaining networks of reliable carriers and negotiating competitive rates across different lanes.</li>
</ul>

<p>&nbsp;</p>

<h2>Digital Transformation in Freight Forwarding</h2>

<p>&nbsp;</p>

<p>The freight forwarding industry is undergoing significant digital transformation. Forwarders are investing in:</p>

<ul>
<li><strong>Transport Management Systems (TMS)</strong> for real-time shipment visibility</li>
<li><strong>Digital documentation platforms</strong> to streamline customs clearance</li>
<li><strong>Predictive analytics</strong> for route optimization and disruption forecasting</li>
<li><strong>Customer portals</strong> providing end-to-end shipment tracking</li>
</ul>

<p>&nbsp;</p>

<h2>Strategic Value Addition</h2>

<p>&nbsp;</p>

<p>Beyond operational coordination, forwarders now provide strategic value through:</p>

<ul>
<li><strong>Supply chain consulting</strong> - Advising on network optimization and mode selection</li>
<li><strong>Trade finance solutions</strong> - Offering payment protection and working capital support</li>
<li><strong>Sustainability reporting</strong> - Calculating and reporting carbon emissions across supply chains</li>
<li><strong>Market intelligence</strong> - Providing insights on trade flows, capacity, and rate trends</li>
</ul>

<p>&nbsp;</p>

<p>As supply chains continue to grow in complexity, the freight forwarder's role as a trusted advisor and operational expert becomes increasingly valuable for shippers seeking to navigate global trade corridors efficiently.</p>`,
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
      Content: `<p><strong>Rail freight</strong> is experiencing a renaissance as shippers seek reliable, sustainable, and cost-effective alternatives for long-haul cargo movements. In 2026, rail has emerged as a compelling option for many supply chains, particularly across the Eurasian landmass.</p>

<p>&nbsp;</p>

<h2>Key Drivers of Rail Freight Growth</h2>

<p>&nbsp;</p>

<p>Several factors are contributing to the increasing attractiveness of rail freight:</p>

<ul>
<li><strong>Infrastructure investments</strong> - Modernization of rail networks, including double-tracking, electrification, and improved terminal facilities, has enhanced capacity and reliability.</li>
<li><strong>Predictable transit times</strong> - Rail offers consistent schedules less affected by weather and road congestion, enabling more reliable supply chain planning.</li>
<li><strong>Sustainability benefits</strong> - Rail produces significantly lower carbon emissions per ton-kilometer compared to road or air freight, helping companies meet ESG targets.</li>
<li><strong>Cost competitiveness</strong> - For distances over 500 kilometers, rail often provides lower costs than road transport, with particularly strong economics on major corridors.</li>
</ul>

<p>&nbsp;</p>

<h2>Eurasian Rail Corridors</h2>

<p>&nbsp;</p>

<p>The Eurasian landmass offers particularly strong rail opportunities:</p>

<ul>
<li><strong>China-Europe rail services</strong> have matured into reliable alternatives to ocean and air freight, offering transit times of 15-20 days.</li>
<li><strong>North-South corridors</strong> connecting Russia, Central Asia, and the Persian Gulf are seeing increased investment and utilization.</li>
<li><strong>Domestic Russian rail networks</strong> provide essential connectivity across the world's largest country, moving everything from raw materials to consumer goods.</li>
</ul>

<p>&nbsp;</p>

<h2>Technological Advancements</h2>

<p>&nbsp;</p>

<p>Technology is enhancing rail freight competitiveness:</p>

<ul>
<li><strong>Real-time tracking</strong> provides shippers with visibility throughout the rail journey</li>
<li><strong>Automated terminals</strong> reduce handling times and improve transfer efficiency</li>
<li><strong>Digital platforms</strong> simplify booking, documentation, and rate comparison</li>
<li><strong>Predictive maintenance</strong> minimizes disruptions and improves reliability</li>
</ul>

<p>&nbsp;</p>

<h2>Intermodal Integration</h2>

<p>&nbsp;</p>

<p>The growth of rail freight is closely tied to effective intermodal integration:</p>

<ul>
<li><strong>First and last mile connectivity</strong> via road transport extends rail's reach</li>
<li><strong>Containerized solutions</strong> enable seamless transfers between modes</li>
<li><strong>Dedicated intermodal terminals</strong> facilitate efficient mode changes</li>
</ul>

<p>&nbsp;</p>

<p>As shippers increasingly prioritize supply chain resilience and sustainability, rail freight's combination of reliability, environmental performance, and cost efficiency positions it as an increasingly important component of multimodal logistics strategies.</p>`,
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
      Content: `<p><strong>Global ports</strong> are facing unprecedented demands as trade volumes grow and supply chains evolve. In response, port authorities and operators are implementing comprehensive modernization programs to enhance capacity, efficiency, and resilience.</p>

<p>&nbsp;</p>

<h2>Infrastructure Modernization</h2>

<p>&nbsp;</p>

<p>Ports are investing heavily in physical infrastructure:</p>

<ul>
<li><strong>Automated container terminals</strong> with robotic cranes and automated guided vehicles (AGVs) that operate 24/7 with minimal human intervention</li>
<li><strong>Deepened channels and berths</strong> to accommodate larger vessels, including the latest generation of ultra-large container ships</li>
<li><strong>Expanded container yards</strong> with higher stacking density to maximize limited waterfront real estate</li>
<li><strong>Enhanced rail and road connectivity</strong> ensuring efficient movement of cargo between ports and inland destinations</li>
</ul>

<p>&nbsp;</p>

<h2>Digital Transformation</h2>

<p>&nbsp;</p>

<p>Digital technologies are revolutionizing port operations:</p>

<ul>
<li><strong>Port Community Systems</strong> connect all stakeholders on a single digital platform, streamlining documentation and coordination</li>
<li><strong>AI-powered optimization</strong> improves berth scheduling, yard planning, and equipment deployment</li>
<li><strong>IoT sensors and tracking</strong> provide real-time visibility of cargo and equipment throughout the port</li>
<li><strong>Digital twins</strong> enable simulation and optimization of port operations before implementation</li>
</ul>

<p>&nbsp;</p>

<h2>Sustainability Initiatives</h2>

<p>&nbsp;</p>

<p>Environmental considerations are driving significant changes:</p>

<ul>
<li><strong>Shore power</strong> allows vessels to plug into electrical grids while docked, reducing emissions</li>
<li><strong>Electrification of handling equipment</strong> replaces diesel-powered cranes, trucks, and yard equipment</li>
<li><strong>Green corridors</strong> initiatives promote sustainable shipping routes and practices</li>
<li><strong>Carbon footprint monitoring</strong> and reporting becoming standard practice</li>
</ul>

<p>&nbsp;</p>

<h2>Resilience Planning</h2>

<p>&nbsp;</p>

<p>Recent disruptions have highlighted the need for resilience:</p>

<ul>
<li><strong>Diversified terminal operators</strong> reduce single-point-of-failure risks</li>
<li><strong>Emergency response protocols</strong> for natural disasters, cyber incidents, and operational disruptions</li>
<li><strong>Flexible labor arrangements</strong> to handle volume surges and maintain operations during disruptions</li>
<li><strong>Strategic backup capacity</strong> through contingency plans and alternative routing options</li>
</ul>

<p>&nbsp;</p>

<p>The transformation of ports is essential for meeting the demands of modern supply chains. Through infrastructure investment, digital innovation, sustainability initiatives, and resilience planning, ports are positioning themselves as efficient, reliable nodes in global trade networks.</p>`,
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
      Content: `<p><strong>SkladTech 2026</strong>, co-located with TransRussia, returns to Crocus Expo with the most comprehensive showcase of warehousing equipment, automation solutions, and intralogistics technology in Eurasia. The exhibition brings together suppliers, logistics providers, and retailers to explore innovations shaping the future of warehousing and distribution.</p>

<p>&nbsp;</p>

<h2>Exhibition Sections</h2>

<p>&nbsp;</p>

<p>SkladTech 2026 features specialized sections covering the full spectrum of warehouse operations:</p>

<h3>Warehouse Automation & Robotics</h3>
<ul>
<li>Automated Storage and Retrieval Systems (AS/RS)</li>
<li>Autonomous Mobile Robots (AMRs) and Automated Guided Vehicles (AGVs)</li>
<li>Robotic picking and packing systems</li>
<li>Sortation and conveyor systems</li>
<li>Warehouse control software and WMS integration</li>
</ul>

<h3>Storage Systems & Racking</h3>
<ul>
<li>Pallet racking and shelving systems</li>
<li>High-bay warehouses and automated storage</li>
<li>Mezzanine floors and platform systems</li>
<li>Container and bin storage solutions</li>
<li>Cold storage and specialized environment solutions</li>
</ul>

<h3>Material Handling Equipment</h3>
<ul>
<li>Forklifts and lift trucks (electric, diesel, and hybrid)</li>
<li>Pallet jacks and stackers</li>
<li>Cranes and hoists</li>
<li>Loading bay equipment and dock levelers</li>
<li>Bulk material handling systems</li>
</ul>

<h3>Warehouse IT & Software</h3>
<ul>
<li>Warehouse Management Systems (WMS)</li>
<li>Inventory optimization software</li>
<li>Labor management and task interleaving</li>
<li>Supply chain visibility platforms</li>
<li>IoT and real-time location systems</li>
</ul>

<h3>Packaging & Labeling</h3>
<ul>
<li>Automated packaging systems</li>
<li>Labeling and identification solutions</li>
<li>Pallet wrapping and securing</li>
<li>Sustainable packaging materials</li>
<li>Dimensioning and weighing equipment</li>
</ul>

<p>&nbsp;</p>

<h2>Featured Participants for 2026</h2>

<p>&nbsp;</p>

<p>SkladTech 2026 welcomes leading international and Russian suppliers including:</p>

<ul>
<li><strong>Jungheinrich</strong> - Material handling equipment and automation</li>
<li><strong>SSI Schaefer</strong> - Automated storage and intralogistics solutions</li>
<li><strong>Mecalux</strong> - Racking systems and warehouse software</li>
<li><strong>KION Group</strong> - Forklifts and supply chain solutions</li>
<li><strong>Daifuku</strong> - Material handling and automation systems</li>
<li><strong>Hyster-Yale</strong> - Lift trucks and handling equipment</li>
<li><strong>TOYOTA Material Handling</strong> - Forklifts and warehouse solutions</li>
<li><strong>ULMA Handling Systems</strong> - Automated storage and palletizing</li>
</ul>

<p>&nbsp;</p>

<h2>Visitor Profile</h2>

<p>&nbsp;</p>

<p>SkladTech attracts decision-makers from across the logistics and supply chain spectrum:</p>

<ul>
<li>Warehouse and distribution center managers</li>
<li>Supply chain directors and logistics executives</li>
<li>Operations and fulfillment managers</li>
<li>E-commerce and retail logistics professionals</li>
<li>Procurement and facility management teams</li>
<li>3PL and contract logistics providers</li>
</ul>

<p>&nbsp;</p>

<p>With the continued growth of e-commerce and the increasing complexity of supply chains, SkladTech 2026 provides an essential platform for discovering technologies and solutions that improve warehouse efficiency, accuracy, and scalability.</p>`,
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
      Content: `<p><strong>As 2025 draws to a close</strong>, the TransRussia and SkladTech team reflects on a remarkable year of growth, innovation, and collaboration with the logistics community.</p>

<p>&nbsp;</p>

<div style="text-align: center; margin: 3rem 0;">
  <img src="https://cdn.itegroupnews.com/TR_NY_Postcard_02preview_e50c14384f.webp" alt="Happy New Year and Merry Christmas" style="max-width: 100%; border-radius: 1rem;" />
</div>

<p>&nbsp;</p>

<h2>A Year of Achievement</h2>

<p>&nbsp;</p>

<p>2025 has been a landmark year for the transport and logistics industry. We've witnessed:</p>

<ul>
<li><strong>Record attendance</strong> at TransRussia and SkladTech 2025, with thousands of professionals connecting and conducting business</li>
<li><strong>Groundbreaking innovations</strong> in warehouse automation, digital logistics, and sustainable transport solutions</li>
<li><strong>Strengthened partnerships</strong> across the Eurasian logistics community, building resilience and capability</li>
<li><strong>Meaningful conversations</strong> about the future of supply chains and the technologies that will shape them</li>
</ul>

<p>&nbsp;</p>

<h2>Looking Forward to 2026</h2>

<p>&nbsp;</p>

<p>As we look ahead to 2026, we're excited about:</p>

<ul>
<li><strong>TransRussia & SkladTech 2026</strong> (17-19 March, Crocus Expo, Pavilion 3) - Our most ambitious event yet</li>
<li><strong>Expanded exhibition space</strong> featuring more exhibitors and innovations</li>
<li><strong>Enhanced networking opportunities</strong> connecting logistics professionals from across Eurasia and beyond</li>
<li><strong>New conference programs</strong> addressing the most pressing challenges and opportunities in transport and warehousing</li>
</ul>

<p>&nbsp;</p>

<h2>Season's Greetings</h2>

<p>&nbsp;</p>

<p>To our valued exhibitors, partners, and visitors:</p>

<p>We extend our warmest wishes for the holiday season. May your celebrations be filled with joy, and may the coming year bring prosperity, successful partnerships, and continued growth.</p>

<p>Thank you for being part of the TransRussia and SkladTech community. Your participation, insights, and commitment make our events the premier gathering place for the logistics industry.</p>

<p>&nbsp;</p>

<p><strong>Happy Holidays and a prosperous New Year!</strong></p>

<p>&nbsp;</p>

<p><em>The TransRussia & SkladTech Team</em></p>

<p>&nbsp;</p>

<hr />

<p>&nbsp;</p>

<p>We look forward to welcoming you to <strong>TransRussia & SkladTech 2026</strong> – 17-19 March at Crocus Expo, Pavilion 3. <a href="https://trstexpo.com/visitor-registration/"><strong>Register your interest</strong></a> to stay updated on event news and announcements.</p>`,
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