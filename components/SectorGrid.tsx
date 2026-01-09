// components/SectorGrid.tsx
import Image from 'next/image'
import Link from 'next/link'
import SectionContainer from './UI/SectionContainer'

interface Sector {
  id: number
  title: string
  slug: string
  image: string
  shortText?: string
}

interface SectorGridProps {
  sectors: Sector[]
}

export default function SectorGrid({ sectors }: SectorGridProps) {
  return (
    <SectionContainer>
      <div className="my-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
    </SectionContainer>
  )
}