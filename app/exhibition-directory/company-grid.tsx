// components/company-grid.tsx
'use client'

import CompanyCard from "./copanyCard"

interface Company {
  id: number
  name: string
  pavilion: string
  stand: string
  country: string
  logo: string
  logoColor?: string
}

interface CompanyGridProps {
  companies: Company[]
  viewMode: 'grid' | 'gallery' | 'list'
  onProductBrochureClick: (companyId: number, companyName: string) => void
}

export default function CompanyGrid({ companies, viewMode, onProductBrochureClick }: CompanyGridProps) {
  return (
    <div
      className={`grid gap-3 md:gap-4 my-6 md:my-8 ${
        viewMode === 'grid'
          ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          : viewMode === 'gallery'
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
          : 'grid-cols-1'
      }`}
    >
      {companies.map((company) => (
        <CompanyCard 
          key={company.id} 
          company={company} 
          onProductBrochureClick={onProductBrochureClick}
        />
      ))}
    </div>
  )
}