import SectionContainer from "@/components/UI/SectionContainer"
import QuickNavigation from "@/components/QuickNavigation"
import PartnersSection from "@/components/section/PartnersSection"
import Link from "next/link"

// Mock data - replace with actual data
const transRussiaSectors = [
  { 
    id: 1, 
    title: 'Complex Logistics Services & Freight Forwarding', 
    slug: 'complex-logistics', 
    image: '/images/image.png',
    description: 'Comprehensive logistics solutions including freight forwarding, customs clearance, and supply chain management services.'
  },
  { 
    id: 2, 
    title: 'Maritime & Inland Waterway Transport', 
    slug: 'maritime-and-inland-waterway-transport', 
    image: '/images/image.png',
    description: 'Ocean and river transport services, shipping lines, and inland waterway logistics solutions.'
  },
  { 
    id: 3, 
    title: 'Air Freight', 
    slug: 'air-freight', 
    image: '/images/image.png',
    description: 'Air cargo services, express logistics, and aviation freight solutions.'
  },
  { 
    id: 4, 
    title: 'Rail Freight', 
    slug: 'rail-freight', 
    image: '/images/image.png',
    description: 'Rail transportation, intermodal solutions, and rail logistics across Eurasia.'
  },
  { 
    id: 5, 
    title: 'Road Freight Transportation', 
    slug: 'road-freight-transportation', 
    image: '/images/image.png',
    description: 'Trucking, LTL, FTL services, and road transport logistics.'
  },
  { 
    id: 6, 
    title: 'Ports & Terminals, Freight Handling Services In Ports', 
    slug: 'ports-and-terminals-freight-handling-services-in-ports', 
    image: '/images/image.png',
    description: 'Port operations, terminal services, stevedoring, and maritime infrastructure solutions.'
  },
  { 
    id: 7, 
    title: 'Warehouse Technology', 
    slug: 'warehouse-technology', 
    image: '/images/image.png',
    description: 'Warehouse management systems, automation, and storage technology solutions.'
  },
  { 
    id: 8, 
    title: 'IT Solutions', 
    slug: 'it-solutions', 
    image: '/images/image.png',
    description: 'Logistics software, tracking systems, and digital supply chain solutions.'
  },
  { 
    id: 9, 
    title: 'E-commerce Logistics', 
    slug: 'ecommerce-logistics', 
    image: '/images/image.png',
    description: 'Fulfillment, last-mile delivery, and e-commerce supply chain services.'
  },
  { 
    id: 10, 
    title: 'Heavy Lift Carriage', 
    slug: 'heavy-lift-carriage', 
    image: '/images/image.png',
    description: 'Oversized cargo transport, project logistics, and specialized heavy haulage.'
  },
]

const skladTechSectors = [
  { 
    id: 1, 
    title: 'Warehousing Systems', 
    slug: 'warehousing-systems', 
    image: '/images/image.png',
    description: 'Storage systems, racking, and warehouse infrastructure solutions.'
  },
  { 
    id: 2, 
    title: 'Material Handling', 
    slug: 'material-handling', 
    image: '/images/image.png',
    description: 'Forklifts, conveyors, and material handling equipment.'
  },
  { 
    id: 3, 
    title: 'Automation & Robotics', 
    slug: 'automation-robotics', 
    image: '/images/image.png',
    description: 'Automated storage, robotics, and smart warehouse solutions.'
  },
  { 
    id: 4, 
    title: 'Packaging Systems', 
    slug: 'packaging-systems', 
    image: '/images/image.png',
    description: 'Packaging equipment, labeling, and packing solutions.'
  },
  { 
    id: 5, 
    title: 'Inventory Management', 
    slug: 'inventory-management', 
    image: '/images/image.png',
    description: 'Inventory control, stock management, and tracking solutions.'
  },
]

export default function SectorsPage() {
  return (
    <div className="min-h-screen font-parabolica">
      {/* Hero Section - COMPACT */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-end">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/image.png)" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <SectionContainer>
          <div className="relative z-20 text-white pb-6 md:pb-10 pt-20">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
              Event Sectors
            </h1>
            <p className="text-lg lg:text-xl max-w-full text-white/90">
              TransRussia and SkladTech showcase the full spectrum of logistics and warehouse innovation.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* TransRussia Sectors - COMPACT */}
      <section className="py-16 lg:py-24">
        <SectionContainer>
          <div className="mb-6 lg:mb-8">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-3 w-full">TransRussia Event Sectors</h2>
            <p className="text-gray-600 text-lg lg:text-xl w-full">
              Covers freight forwarding, transport services, warehousing, and logistics IT.
            </p>
          </div>
          <SectorGrid sectors={transRussiaSectors} />
        </SectionContainer>
      </section>

    
      
      <QuickNavigation/>
      <PartnersSection/>
    </div>
  )
}

// SectorGrid Component
function SectorGrid({ sectors }: { sectors: Array<{id: number, title: string, slug: string, image: string, description: string}> }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {sectors.map((sector) => (
        <Link
          key={sector.id}
          href={`/sectors/${sector.slug}`}
          className="group relative h-80 w-full overflow-hidden rounded-xl text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${sector.image})` }}
          ></div>
          <div className="absolute inset-0 z-20 flex items-end justify-center">
            <h3 className="w-full bg-white py-5 text-lg font-semibold transition-all duration-300 ease-in-out group-hover:bg-blue-50">
              {sector.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}