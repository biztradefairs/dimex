// app/exhibition-directory/page.tsx
'use client'

import { useState } from 'react'
// import KeySectors from './keySector'
import CompanyGrid from './company-grid'
import { mockCompanies } from '@/lib/mock-data'
import { useRouter } from 'next/navigation'

export default function CompanyDirectory() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'gallery' | 'list'>('grid')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  const companiesPerPage = 24

  // 🔹 Alphabetical Filter
  const filteredCompanies = selectedLetter
    ? mockCompanies.filter((company) =>
        company.name?.toUpperCase().startsWith(selectedLetter)
      )
    : mockCompanies

  // 🔹 Pagination Logic
  const totalCompanies = filteredCompanies.length
  const totalPages = Math.ceil(totalCompanies / companiesPerPage)
  const startIndex = (currentPage - 1) * companiesPerPage

  const displayedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + companiesPerPage
  )

  const handleProductBrochure = (companyId: number, companyName: string) => {
    // Create a slug from company name (lowercase, replace spaces with hyphens)
    const slug = companyName.toLowerCase().replace(/\s+/g, '-')
    
    // Navigate to the product brochure page with the company slug
    router.push(`/exhibitor/${companyId}/brochures/${slug}`)
    
    // Alternatively, if you want to navigate to a page that shows all brochures:
    // router.push(`/exhibitor/${companyId}/brochures`)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation and View Toggle */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-end gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Grid view"
          >
            <GridIcon />
          </button>

          <button
            onClick={() => setViewMode('gallery')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'gallery'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-label="Gallery view"
          >
            <GalleryIcon />
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            aria-label="List view"
          >
            <ListIcon />
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 mt-20">
        {/* Alphabetical Filter */}
        <div className="my-5 md:my-6 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setSelectedLetter(null)
              setCurrentPage(1)
            }}
            className={`px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-medium
              ${
                !selectedLetter
                  ? 'text-slate-900 font-semibold'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
          >
            All
          </button>

          <div className="flex gap-0.5 md:gap-1 flex-wrap">
            {Array.from({ length: 26 }, (_, i) =>
              String.fromCharCode(65 + i)
            ).map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter)
                  setCurrentPage(1)
                }}
                className={`w-6 h-6 md:w-8 md:h-8 rounded text-xs font-medium
                  transition-colors border flex items-center justify-center
                  ${
                    selectedLetter === letter
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'text-slate-700 hover:bg-slate-200 border-slate-300'
                  }`}
              >
                {letter}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setSelectedLetter(null)
              setCurrentPage(1)
            }}
            className="px-3 md:px-4 py-1.5 md:py-2 bg-slate-900 text-white
              text-xs md:text-sm font-medium rounded hover:bg-slate-800"
          >
            Reset All
          </button>
        </div>

        {/* Companies */}
        <CompanyGrid 
          companies={displayedCompanies} 
          viewMode={viewMode}
          onProductBrochureClick={handleProductBrochure}
        />

        {/* Pagination */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs md:text-sm text-slate-600">
            Showing {startIndex + 1} to{' '}
            {Math.min(startIndex + companiesPerPage, totalCompanies)} of{' '}
            {totalCompanies}
          </span>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 md:w-8 md:h-8 rounded text-xs md:text-sm
                    font-medium flex items-center justify-center transition-colors
                    ${
                      currentPage === page
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

/* ================= ICONS ================= */

function GridIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="2" />
      <rect x="3" y="11" width="18" height="2" />
      <rect x="3" y="18" width="18" height="2" />
    </svg>
  )
}