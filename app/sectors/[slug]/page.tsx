import { notFound } from "next/navigation";
import { sectorDatabase, allSectorSlugs } from "../data";
import SectionContainer from "@/components/UI/SectionContainer";
import QuickNavigation from "@/components/QuickNavigation";
import PartnersSection from "@/components/section/PartnersSection";
import Link from "next/link";
import WhyExhibitCard from "../components/WhyExhibitCard";
import ServiceCard from "../components/ServiceCard";
import FAQCard from "../components/FAQCard";
import BackToTop from "@/app/exhibitor-resource-center/component/BackToTop";

interface PageProps {
  params: Promise<{ slug: string }>;
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

Whether you're looking for new partnerships, seeking to optimize your operations, or exploring the latest trends, the ${displayName} sector provides unparalleled access to the people and technologies driving the industry forward.`,
    heroImage: '/images/image.png',
    stats: {
      visitors: '10,000+',
      exhibitors: '200+',
      countries: '10+'
    },
    whyExhibit: [
      {
        title: "Connect with Industry Leaders",
        icon: "🤝",
        description: `Engage with key decision-makers and professionals in the ${displayName.toLowerCase()} sector.`
      },
      {
        title: "Showcase Your Solutions",
        icon: "🚀",
        description: `Present your ${displayName.toLowerCase()} solutions to a targeted audience of industry professionals.`
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
  let sectorData = sectorDatabase[databaseKey as keyof typeof sectorDatabase];

  // If no data found, use default content
  if (!sectorData) {
    console.log(`No data found for slug: ${slug}, databaseKey: ${databaseKey}, using default content`);
    sectorData = getDefaultSectorContent(slug, displayName);
  }

  return (
    <>
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
                  .map((paragraph, index) => (
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
              {sectorData.whyExhibit.map((item, index) => (
                <WhyExhibitCard key={index} item={item} index={index} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/exhibiting-enquiry">
                <button className="px-8 py-4 bg-[#004D9F] text-white rounded-full">
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
              {sectorData.services.map((service, index) => (
                <ServiceCard key={index} service={service} index={index} />
              ))}
            </div>
          </SectionContainer>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <SectionContainer>
            <h2 className="text-4xl font-bold text-center mb-16">
              FAQs for {displayName}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {sectorData.faqs.map((faq, index) => (
                <FAQCard
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                />
              ))}
            </div>
          </SectionContainer>
        </section>

        <QuickNavigation />
        <PartnersSection />
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params Promise
  const { slug } = await params;
  const databaseKey = getDatabaseKeyFromSlug(slug);
  const displayName = getDisplayNameFromSlug(slug);
  const sectorData = sectorDatabase[databaseKey as keyof typeof sectorDatabase];

  if (!sectorData) {
    return {
      title: `${displayName} | Diemex 2026`,
      description: `Explore ${displayName.toLowerCase()} solutions at Diemex 2026. Connect with industry leaders and discover innovative solutions.`,
    };
  }

  return {
    title: `${sectorData.title} | Diemex 2026`,
    description: sectorData.description,
    openGraph: {
      title: `${sectorData.title} | Diemex 2026`,
      description: sectorData.description,
      images: [sectorData.heroImage],
    },
  };
}