import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sectorDatabase, allSectorSlugs } from "../data";
import SectionContainer from "@/components/UI/SectionContainer";
import Link from "next/link";
import WhyExhibitCard from "../components/WhyExhibitCard";
import ServiceCard from "../components/ServiceCard";
import BackToTop from "@/app/exhibitor-resource-center/component/BackToTop";
import { pageMeta, SITE_URL } from "@/lib/pageMetadata";
import { EV_DIE_CASTING_TOOLING } from "@/lib/structuredData";

const SPECIFIC_SECTOR_ARTICLE_SCHEMAS: Record<string, unknown> = {
  'ev-die-casting-and-tooling-in-india-key-trends': EV_DIE_CASTING_TOOLING,
  'ev-die-casting-tooling-india': EV_DIE_CASTING_TOOLING,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === 'ev-die-casting-and-tooling-in-india-key-trends') {
    return pageMeta(
      'EV Die Casting and Tooling in India: Key Trends',
      'How EV growth is reshaping die casting and tooling in India: giga-casting, new capacity in Pune, and what toolmakers need. See it at DIEMEX 2027.',
      `/sectors/${slug}`,
    );
  }

  if (slug === 'precision-moulds') {
    return pageMeta(
      'Precision Die & Mould Solutions | DIEMEX 2027 Exhibition',
      'Explore precision die and mould solutions, injection moulds, die-casting tools and advanced tooling technologies at DIEMEX 2027 in Pune.',
      `/sectors/${slug}`,
    );
  }

  if (slug === 'tooling-mould-base') {
    return pageMeta(
      'Tooling & Mould Base Solutions | DIEMEX 2027 Exhibition',
      'Explore tooling and mould base solutions, precision components and advanced manufacturing technologies at DIEMEX 2027 in Pune, India.',
      `/sectors/${slug}`,
    );
  }

  if (slug === 'precision-machining-automation') {
    return pageMeta(
      'Precision Machining & Automation | DIEMEX 2027 India Expo',
      'Discover precision machining, CNC technology and automation solutions for advanced manufacturing at DIEMEX 2027 in Pune, India.',
      `/sectors/${slug}`,
    );
  }

  if (slug === 'machining-finishing-solutions') {
    return pageMeta(
      'Machining & Finishing Solutions | DIEMEX 2027 India Expo',
      'Discover machining and finishing technologies, surface treatment solutions and precision manufacturing innovations at DIEMEX 2027 in Pune, India.',
      `/sectors/${slug}`,
    );
  }

  if (slug === 'automation-industry-solutions') {
    return pageMeta(
      'Automation Industry Solutions | DIEMEX 2027 India Expo',
      'Explore industrial automation, smart manufacturing technologies and advanced production solutions at DIEMEX 2027 in Pune, India.',
      `/sectors/${slug}`,
    );
  }

  if (slug === 'CAD/CAM-solutions-for-die-mould') {
    return pageMeta(
      'CAD/CAM Solutions for Die & Mould | DIEMEX 2027 India',
      'Discover CAD/CAM software, 3D modelling and design technologies for precision die and mould manufacturing at DIEMEX 2027 in Pune, India.',
      `/sectors/${slug}`,
    );
  }

  if (slug === 'tool-steel-solutions-materials') {
    return pageMeta(
      'Tool Steel Solutions & Materials | DIEMEX 2027 India Expo',
      'Explore tool steel, mould materials and advanced solutions for die and mould manufacturing at DIEMEX 2027 in Pune, India.',
      `/sectors/${slug}`,
    );
  }

  const databaseKey = getDatabaseKeyFromSlug(slug);
  const displayName = getDisplayNameFromSlug(slug);
  const sectorData = sectorDatabase[databaseKey as keyof typeof sectorDatabase] || getDefaultSectorContent(slug, displayName);

  const title = `${sectorData.title || displayName} | DIEMEX 2027`;
  const description = sectorData.description || `Explore ${displayName} solutions at DIEMEX 2027 Exhibition in Pune, India.`;

  return pageMeta(title, description, `/sectors/${slug}`);
}

// Complete mapping function to convert URL slug to database key
function getDatabaseKeyFromSlug(slug: string): string {
  const slugToKeyMap: Record<string, string> = {
    // TransRussia Sectors - Map to existing TransRussia sectors in database
    'complex-logistics': 'complex-logistics',
    'maritime-and-inland-waterway-transport': 'maritime-and-inland-waterway-transport',
    'air-freight': 'air-freight',
    'rail-freight': 'rail-freight',
    'road-freight-transportation': 'road-freight-transportation',
    'ports-and-terminals-freight-handling-services-in-ports': 'ports-and-terminals-freight-handling-services-in-ports',
    'warehouse-technology': 'warehouse-technology',
    'it-solutions': 'it-solutions',
    'ecommerce-logistics': 'ecommerce-logistics',
    'heavy-lift-carriage': 'heavy-lift-carriage',

    // SkladTech Sectors
    'warehousing-systems': 'warehousing-systems',
    'material-handling': 'material-handling',
    'automation-robotics': 'automation-robotics',
    'packaging-systems': 'packaging-systems',
    'inventory-management': 'inventory-management',

    // DIEMEX Sectors - Map to existing DIEMEX sectors in database
    'die-mould-manufacturing': 'die & mould manufacturing',
    'tooling-tool-rom-technologies': 'tooling & cutting tools',
    'cnc-machines': 'machine tools & advanced machining',
    'automation-industry': 'automation & robotics',
    'precision-moulds': 'precision-moulds',
    'ev-die-casting-and-tooling-in-india-key-trends': 'ev-die-casting-and-tooling-in-india-key-trends',
    'tooling-mould-base': 'tooling-mould-base',
    'machining-finishing': 'machining-finishing',
    'cad-cam': 'cad-cam',
    'tool-steel': 'tool-steel',
    'surface-treatment': 'surface-treatment',
    'materials-steels-alloys': 'materials-steels-alloys',
    'die-casting': 'die-casting',
  };

  return slugToKeyMap[slug] || slug;
}

// Function to get display name from slug
function getDisplayNameFromSlug(slug: string): string {
  const displayNameMap: Record<string, string> = {
    // TransRussia
    'complex-logistics': 'Complex Logistics',
    'maritime-and-inland-waterway-transport': 'Maritime Transport',
    'air-freight': 'Air Freight',
    'rail-freight': 'Rail Freight',
    'road-freight-transportation': 'Road Freight',
    'ports-and-terminals-freight-handling-services-in-ports': 'Ports',
    'warehouse-technology': 'Warehouse Tech',
    'it-solutions': 'IT Solutions',
    'ecommerce-logistics': 'E-commerce',
    'heavy-lift-carriage': 'Heavy Lift',

    // SkladTech
    'warehousing-systems': 'Warehousing',
    'material-handling': 'Material Handling',
    'automation-robotics': 'Automation',
    'packaging-systems': 'Packaging',
    'inventory-management': 'Inventory',

    // DIEMEX
    'die-mould-manufacturing': 'Die & Mould',
    'tooling-tool-rom-technologies': 'Tooling',
    'cnc-machines': 'Machine Tools',
    'automation-industry': 'Automation',
    'precision-moulds': 'Precision Moulds',
    'ev-die-casting-and-tooling-in-india-key-trends': 'EV Die Casting & Tooling',
    'tooling-mould-base': 'Tooling Components',
    'machining-finishing': 'Machining',
    'cad-cam': 'CAD/CAM',
    'tool-steel': 'Tool Steel',
    'surface-treatment': 'Surface Treatment',
    'materials-steels-alloys': 'Materials',
    'die-casting': 'Die Casting',
  };

  return displayNameMap[slug] || slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Default content for sectors that don't have specific data
function getDefaultSectorContent(slug: string, displayName: string) {
  return {
    title: `${displayName} Solutions`,
    description: `Comprehensive ${displayName.toLowerCase()} solutions for modern logistics and supply chain operations.`,
    mainDescription: `The ${displayName} sector at DIEMEX showcases the latest innovations and solutions in ${displayName.toLowerCase()}. This sector brings together industry leaders, technology providers, and service specialists who are shaping the future of logistics and supply chain management.

Visitors can explore cutting-edge solutions, connect with experts, and discover new opportunities for growth and efficiency. From established players to innovative startups, this sector represents the complete ecosystem of ${displayName.toLowerCase()} solutions.

Whether you're looking for new partnerships, seeking to optimize your operations, or exploring the latest technological advancements, this sector offers valuable insights and business opportunities.`,
    heroImage: '/images/image.png',
    stats: {
      visitors: '10,000+',
      exhibitors: '200+',
      countries: '5+'
    },
    whyExhibit: [
      {
        title: "Meet Target Audience",
        icon: "👥",
        description: `Connect directly with key decision-makers and professionals in the ${displayName.toLowerCase()} industry.`
      },
      {
        title: "Showcase Innovations",
        icon: "💡",
        description: `Present your latest products, technologies, and services to an engaged professional audience.`
      },
      {
        title: "Expand Your Network",
        icon: "🌍",
        description: `Build valuable connections with partners, suppliers, and customers from around the world.`
      }
    ],
    services: [
      "Consulting & Advisory Services",
      "Technology Solutions",
      "Equipment & Machinery",
      "Software & Digital Tools",
      "Training & Support",
      "Maintenance & Repair",
      "Spare Parts & Consumables",
      "Project Management",
      "Quality Assurance",
      "Regulatory Compliance"
    ],
    faqs: [
      {
        question: "What types of companies exhibit in this sector?",
        answer: `Service providers, manufacturers, technology companies, and consultants specializing in ${displayName.toLowerCase()}.`
      },
      {
        question: "Who visits this sector?",
        answer: "Logistics managers, supply chain professionals, operations directors, and procurement specialists."
      },
      {
        question: "What are the key trends?",
        answer: "Digital transformation, sustainability, automation, and integrated supply chain solutions."
      }
    ]
  };
}

export default async function SectorPage({ params }: PageProps) {
  // Await the params Promise
  const { slug } = await params;

  // Get the correct database key for this slug
  const databaseKey = getDatabaseKeyFromSlug(slug);

  // Get display name for the sector
  const displayName = getDisplayNameFromSlug(slug);

  // Try to get the sector data using the mapped key
  let sectorData: any = sectorDatabase[databaseKey as keyof typeof sectorDatabase];

  // If no data found, use default content
  if (!sectorData) {
    sectorData = getDefaultSectorContent(slug, displayName);
  }

  // Schema structured data for the page
  const structuredData = SPECIFIC_SECTOR_ARTICLE_SCHEMAS[slug] || {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${SITE_URL}/sectors/${slug}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}/sectors/${slug}`,
        },
        headline: sectorData.title,
        description: sectorData.description || undefined,
        url: `${SITE_URL}/sectors/${slug}`,
        datePublished: '2026-10-20',
        dateModified: '2026-10-20',
        author: { '@type': 'Organization', name: 'DIEMEX Editorial Team' },
        publisher: {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: 'DIEMEX',
          url: `${SITE_URL}/`,
        },
        inLanguage: 'en-IN',
        articleSection: displayName || 'Manufacturing',
        ...(sectorData.heroImage ? { image: [`${SITE_URL}${sectorData.heroImage}`] } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/sectors/${slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Sectors', item: `${SITE_URL}/sectors` },
          { '@type': 'ListItem', position: 3, name: sectorData.title, item: `${SITE_URL}/sectors/${slug}` },
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'DIEMEX',
        url: `${SITE_URL}/`,
      },
    ],
  };

  return (
    <>
      {structuredData && (
        <script
          id={`diemex-sector-schema-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      )}

      <main className="bg-white">
        {/* HERO SECTION */}
        <section className="pt-20 pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[40px] md:text-[52px] font-bold text-black mt-10">
              {sectorData.title}
            </h1>

            <p className="mt-4 text-lg text-gray-600 max-w-3xl">
              {sectorData.description}
            </p>

            <div className="mt-10 relative w-full h-[420px] rounded-lg overflow-hidden">
              <img
                src={sectorData.heroImage}
                alt={sectorData.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Drive Excellence with {displayName} Solutions
              </h2>

              <div className="space-y-6 text-gray-700 text-[17px]">
                {sectorData.mainDescription
                  ?.split("\n\n")
                  .map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>

              {/* STATS */}
              <div className="flex gap-14 mt-14">
                <div>
                  <p className="text-4xl font-bold text-gray-500">
                    {sectorData.stats.visitors}
                  </p>
                  <p className="text-gray-600">Visitors</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-500">
                    {sectorData.stats.exhibitors}
                  </p>
                  <p className="text-gray-600">Exhibitors</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-500">
                    {sectorData.stats.countries}
                  </p>
                  <p className="text-gray-600">Countries</p>
                </div>
              </div>
            </div>

            <div>
              <img
                src={sectorData.heroImage}
                alt={sectorData.title}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* WHY EXHIBIT */}
        <section className="py-16 bg-gray-50">
          <SectionContainer>
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Exhibit in {displayName} Sector?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {sectorData.whyExhibit?.map((item: any, index: number) => (
                <WhyExhibitCard key={index} item={item} index={index} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/exhibiting-enquiry">
                <button className="px-8 py-4 bg-[#004A96] text-white rounded-full">
                  Enquire to Exhibit
                </button>
              </Link>
            </div>
          </SectionContainer>
        </section>

        {/* SERVICES */}
        <section className="py-16 bg-gray-50">
          <SectionContainer>
            <h2 className="text-4xl font-bold text-center mb-16">
              Key Services on Display
            </h2>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {sectorData.services?.map((service: string, index: number) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* FAQ */}
        <section aria-labelledby="page-faq-heading" className="border-t border-slate-200 bg-slate-50 py-12 font-parabolica sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#004A96]">Help Center</p>
              <h2 id="page-faq-heading" className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                Explore exhibiting and sourcing opportunities for your business in the {displayName} sector.
              </p>
            </div>

            <div className="space-y-3">
              {sectorData.faqs?.map((faq: any, index: number) => (
                <details
                  key={faq.question}
                  name="diemex-page-faq"
                  open={index === 0}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white open:border-[#004A96]/30"
                >
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-slate-900 transition-colors hover:text-[#004A96] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#004A96] sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5 shrink-0 text-[#004A96] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                    >
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
                    <p className="max-w-4xl text-base leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BackToTop />
    </>
  );
}

export function generateStaticParams() {
  return allSectorSlugs.map((slug) => ({
    slug,
  }));
}
