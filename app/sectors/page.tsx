// app/sectors/page.tsx
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import SectionContainer from "@/components/UI/SectionContainer"
import QuickNavigation from "@/components/QuickNavigation"
import PartnersSection from "@/components/PartnersSection"

// Mock data - replace with actual data
const transRussiaSectors = [
  { id: 1, title: 'Complex Logistics Services & Freight Forwarding', slug: 'complex-logistics', image: '/images/image.png' },
  { id: 2, title: 'Maritime & Inland Waterway Transport', slug: 'maritime', image: '/images/image.png' },
  { id: 3, title: 'Air Freight', slug: 'air-freight', image: '/images/image.png' },
  { id: 4, title: 'Rail Freight', slug: 'rail-freight', image: '/images/image.png' },
  { id: 5, title: 'Road Freight Transportation', slug: 'road-freight', image: '/images/image.png' },
  { id: 6, title: 'Ports & Terminals', slug: 'ports', image: '/images/image.png' },
  { id: 7, title: 'Warehouse Technology', slug: 'warehouse-tech', image: '/images/image.png' },
  { id: 8, title: 'IT Solutions', slug: 'it-solutions', image: '/images/image.png' },
  { id: 9, title: 'E-commerce Logistics', slug: 'ecommerce', image: '/images/image.png' },
  { id: 10, title: 'Heavy Lift Carriage', slug: 'heavy-lift', image: '/images/image.png' },
]

const skladTechSectors = [
  { id: 1, title: 'Warehousing Systems', slug: 'warehousing-systems', image: '/images/image.png' },
  { id: 2, title: 'Material Handling', slug: 'material-handling', image: '/images/image.png' },
  { id: 3, title: 'Automation & Robotics', slug: 'automation', image: '/images/image.png' },
  { id: 4, title: 'Packaging Systems', slug: 'packaging', image: '/images/image.png' },
  { id: 5, title: 'Inventory Management', slug: 'inventory', image: '/images/image.png' },
]

export default function SectorsPage() {
  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section - COMPACT */}
        <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-end">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
            <div className="h-full w-full bg-gradient-to-r from-blue-900 to-blue-700" />
          </div>
          
          <SectionContainer>
            <div className="relative z-20 text-white pb-6 md:pb-10 pt-20">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3">Event Sectors</h1>
              <p className="text-lg lg:text-xl max-w-full">
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

        {/* SkladTech Sectors - COMPACT */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <SectionContainer>
            <div className="mb-6 lg:mb-8">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-3 w-full">SkladTech Event Sectors</h2>
              <p className="text-gray-600 text-lg lg:text-xl w-full">
                Showcases automation, robotics, IoT, and sustainable logistics solutions.
              </p>
            </div>
            <SectorGrid sectors={skladTechSectors} />
          </SectionContainer>
        </section>
        <QuickNavigation/>
        <PartnersSection/>
      </div>

    </>
  )
}

// SectorGrid Component
function SectorGrid({ sectors }: { sectors: Array<{id: number, title: string, slug: string, image: string}> }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {sectors.map((sector) => (
        <a
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
        </a>
      ))}
    </div>
  )
}