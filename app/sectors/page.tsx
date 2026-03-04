import SectionContainer from "@/components/UI/SectionContainer"
import QuickNavigation from "@/components/QuickNavigation"
import PartnersSection from "@/components/section/PartnersSection"
import Link from "next/link"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

// Mock data - replace with actual data
const DiemexSectors = [
  { 
    id: 1, 
    title: 'Die & Mould Manufacturing', 
    slug: 'complex-logistics', 
    image: '/images/sector1.jpg',
    description: 'Manufacturers of injection moulds, press tools, die casting dies, extrusion dies, and precision mould bases serving automotive, aerospace, electronics, medical, and consumer industries.'
  },
  { 
    id: 2, 
    title: 'Tooling & Cutting Tools', 
    slug: 'maritime-and-inland-waterway-transport', 
    image: '/images/sector2.jpg',
    description: 'Advanced cutting tools, carbide inserts, end mills, drills, tool holders, and high-performance tooling solutions designed for precision machining and high-efficiency production.'
  },
  { 
    id: 3, 
    title: 'Machine Tools & Advanced Machining', 
    slug: 'die-mould', 
    image: '/images/sector3.jpg',
    description: 'CNC machining centers, EDM, wire cutting, grinding machines, high-speed milling, and 5-axis machining technologies enabling precision die and mould production.'
  },
  { 
    id: 4, 
    title: 'Automation & Robotics', 
    slug: 'rail-freight', 
    image: '/images/sector4.jpg',
    description: 'Industrial robots, cobots, automated loading/unloading systems, palletizing solutions, and smart factory automation technologies for improved productivity and efficiency.'
  },
  { 
    id: 5, 
    title: 'Additive Manufacturing & 3D Printing', 
    slug: 'road-freight-transportation', 
    image: '/images/sector5.jpg',
    description: 'Metal and polymer 3D printing systems, rapid prototyping solutions, conformal cooling innovations, and hybrid manufacturing technologies for tool and mould development.'
  },
  { 
    id: 6, 
    title: 'Metrology & Quality Control', 
    slug: 'ports-and-terminals-freight-handling-services-in-ports', 
    image: '/images/sector6.jpg',
    description: 'CMM machines, optical measurement systems, 3D scanners, testing equipment, and precision inspection solutions ensuring dimensional accuracy and quality assurance.'
  },
  { 
    id: 7, 
    title: 'Raw Materials & Tool Steel', 
    slug: 'warehouse-technology', 
    image: '/images/sector7.jpg',
    description: 'Tool steels, alloy steels, special steels, aluminium blocks, mould bases, and advanced materials engineered for durability, strength, and high-performance tooling applications.'
  },
  { 
    id: 8, 
    title: 'Surface Treatment & Finishing', 
    slug: 'it-solutions', 
    image: '/images/sector8.jpg',
    description: 'Heat treatment, coatings, polishing technologies, surface texturing, plating, and finishing solutions that enhance tool life, wear resistance, and product aesthetics.'
  },
  { 
    id: 9, 
    title: 'Smart Manufacturing & Industry 4.0', 
    slug: 'ecommerce-logistics', 
    image: '/images/sector9.jpg',
    description: 'Digital manufacturing solutions including IoT integration, MES systems, AI-driven production monitoring, data analytics, and smart factory technologies for connected manufacturing.'
  },
  { 
    id: 10, 
    title: 'Industrial Services & Engineering Solutions', 
    slug: 'heavy-lift-carriage', 
    image: '/images/sector10.jpg',
    description: 'Design engineering, CAD/CAM software, reverse engineering, simulation services, maintenance support, retrofitting, and turnkey project solutions for the die and mould industry.'
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
    <>
    
    <div className="min-h-screen font-parabolica">
      {/* Hero Section - COMPACT */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-end">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/sectorheader.jpg)" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <SectionContainer>
          <div className="relative z-20 text-white pb-6 md:pb-10 pt-20">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
              Event Sectors
            </h1>
            <p className="text-lg lg:text-xl max-w-full text-white/90">
  DIEMEX 2026 showcases the complete spectrum of die & mould manufacturing, tooling technologies, advanced machine tools, automation, additive manufacturing, and smart factory innovations.
</p>
          </div>
        </SectionContainer>
      </section>

      {/* TransRussia Sectors - COMPACT */}
      <section className="py-16 lg:py-24">
        <SectionContainer>
          <div className="mb-6 lg:mb-8">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-3 w-full">
  DIEMEX 2026 Event Sectors
</h2>

<p className="text-gray-600 text-lg lg:text-xl w-full">
  Covers die & mould manufacturing, tooling & cutting tools, machine tools, automation & robotics, additive manufacturing, metrology, smart manufacturing, surface engineering, raw materials, and industrial engineering solutions.
</p>
          </div>
          <SectorGrid sectors={DiemexSectors} />
        </SectionContainer>
      </section>

    
      
      <QuickNavigation/>
      <PartnersSection/>
    </div>
    <BackToTop/>
    </>
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