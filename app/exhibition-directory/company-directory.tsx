// app/exhibition-directory/page.tsx
'use client'

import { useState, useEffect } from 'react'
import CompanyGrid from './company-grid'
import { mockCompanies } from '@/lib/mock-data'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, Filter, X } from 'lucide-react'

export default function CompanyDirectory() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'gallery' | 'list'>('grid')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const companiesPerPage = isMobile ? 12 : 24

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Filter by search and alphabet
  const filteredCompanies = mockCompanies.filter((company) => {
    const matchesSearch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.pavilion.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLetter = !selectedLetter || 
      company.name?.toUpperCase().startsWith(selectedLetter)
    
    return matchesSearch && matchesLetter
  })

  // Pagination Logic
  const totalCompanies = filteredCompanies.length
  const totalPages = Math.ceil(totalCompanies / companiesPerPage)
  const startIndex = (currentPage - 1) * companiesPerPage

  const displayedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + companiesPerPage
  )

  const handleProductBrochure = (companyId: number, companyName: string) => {
    const slug = companyName.toLowerCase().replace(/\s+/g, '-')
    router.push(`/exhibitor/${companyId}/brochures/${slug}`)
  }

  // Pagination range
  const getPaginationRange = () => {
    if (isMobile) {
      // Show only 2 pages on mobile
      const start = Math.max(1, currentPage - 1)
      const end = Math.min(totalPages, start + 1)
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    } else {
      // Show up to 5 pages on desktop
      const maxPages = 5
      let start = Math.max(1, currentPage - Math.floor(maxPages / 2))
      let end = Math.min(totalPages, start + maxPages - 1)
      
      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1)
      }
      
      return Array.from({ length: Math.min(maxPages, totalPages) }, (_, i) => start + i)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation and View Toggle - Fixed for mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              aria-label="Filter options"
            >
              <Filter size={20} />
            </button>

            {/* View Toggles */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Grid view"
              >
                <GridIcon />
              </button>

              <button
                onClick={() => setViewMode('gallery')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'gallery'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Gallery view"
              >
                <GalleryIcon />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="List view"
              >
                <ListIcon />
              </button>
            </div>

            {/* Search on desktop */}
            <div className="hidden md:flex flex-1 max-w-xs ml-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Mobile search */}
          <div className="mt-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Filter content */}
            <div className="space-y-6">
             
            </div>
          </div>
        </div>
      )}

      <main className="pt-24 sm:pt-28 md:pt-32 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alphabetical Filter */}
        <div className="mb-6 md:mb-8 mt-10">
       

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
            <button
              onClick={() => {
                setSelectedLetter(null)
                setCurrentPage(1)
              }}
              className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                !selectedLetter
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              All
            </button>

            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter)
                    setCurrentPage(1)
                  }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded text-sm font-medium transition-colors border flex items-center justify-center ${
                    selectedLetter === letter
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-slate-600 mt-4">
            Showing {totalCompanies} companies {selectedLetter && `starting with "${selectedLetter}"`}
          </div>
        </div>

        {/* Companies Grid */}
        <CompanyGrid 
          companies={displayedCompanies} 
          viewMode={viewMode}
          onProductBrochureClick={handleProductBrochure}
        />

        {/* Pagination - Enhanced for mobile */}
        {totalCompanies > 0 && (
          <div className="mt-8 md:mt-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-600">
                Showing {Math.min(startIndex + 1, totalCompanies)} to{' '}
                {Math.min(startIndex + companiesPerPage, totalCompanies)} of{' '}
                {totalCompanies} companies
              </div>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    currentPage === 1
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ChevronLeft  />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {getPaginationRange().map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                        currentPage === page
                          ? 'bg-slate-900 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    currentPage === totalPages
                      ? 'text-slate-400 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight  />
                </button>
              </div>
            </div>

            {/* Mobile quick navigation */}
            {isMobile && totalPages > 2 && (
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {totalCompanies === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedLetter(null)
                setCurrentPage(1)
              }}
              className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

// Update the icons to be responsive
function GridIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h16v16H4V4zm2 4v8l6-4-6-4z" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="2" />
      <rect x="3" y="11" width="18" height="2" />
      <rect x="3" y="18" width="18" height="2" />
    </svg>
  )
}

function ChevronLeft() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}