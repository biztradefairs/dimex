import SectionContainer from "@/components/UI/SectionContainer"
import QuickNavigation from "@/components/QuickNavigation"
import PartnersSection from "@/components/section/PartnersSection"
import Link from "next/link"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

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
      <div className="min-h-screen">
        {/* Hero Section - COMPACT */}
      <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-end">
  
  {/* Background Image */}
  <div
    className="absolute inset-0 z-0 bg-cover bg-center"
    style={{ backgroundImage: "url(/images/image.png)" }}
  />

  {/* Gradient Overlay */}
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
    <BackToTop/>
    </>
  )
}

// SectorGrid Component
function SectorGrid({ sectors }: { sectors: Array<{id: number, title: string, slug: string, image: string}> }) {
  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-3">
      {sectors.map((sector) => (
        <Link
          key={sector.id}
          href={`/sectors/${sector.slug}`}
          className="group relative h-[320px] overflow-hidden rounded-lg"
        >
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${sector.image})` } as React.CSSProperties}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>

          {/* Content */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
            <h3 className="text-xl font-semibold leading-snug">
              {sector.title}
            </h3>

            {/* Blue underline */}
            <div className="mt-3 h-[3px] w-10 bg-blue-500 group-hover:w-16 transition-all duration-300"></div>
          </div>
        </Link>
      ))}
    </div>
  )
}
