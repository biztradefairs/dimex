'use client'

import { useState } from 'react'
import VisitorRegistrationForm from './visitor-registration-form'
import { useRouter } from 'next/navigation'
import { ExternalLink, MessageCircle } from 'lucide-react'

interface CompanyCardProps {
  company: {
    id: string  // ← Change from number to string
    name: string
    pavilion: string
    stand: string
    country: string
    logo: string
    logoColor?: string
  }
  onProductBrochureClick: (companyId: string, companyName: string) => void
}

export default function CompanyCard({ company, onProductBrochureClick }: CompanyCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const router = useRouter()

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on the Connect button or its children
    const target = e.target as HTMLElement
    if (
      target.closest('button') || 
      target.closest('a') ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'A'
    ) {
      return
    }
    
    // Navigate to company page using Next.js router
    router.push(`/exhibition-directory/${company.id}`)
  }

  const handleConnectClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFormOpen(true)
  }

  const handleBrochureClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onProductBrochureClick(company.id, company.name)
  }

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
      >
        {/* Logo Area */}
        <div
          className={`h-32 sm:h-40 md:h-48 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${
            company.logoColor || 'bg-gradient-to-br from-slate-50 to-slate-100'
          } group-hover:from-slate-100 group-hover:to-slate-200`}
        >
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 text-center">
            {company.logo}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-slate-100 bg-white">
          {/* Company Name */}
          <h3 className="font-bold text-slate-900 mb-3 text-base sm:text-lg md:text-xl leading-tight line-clamp-2">
            {company.name}
          </h3>

          {/* Details */}
          <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900 min-w-[70px] sm:min-w-[80px]">Pavilion:</span>
              <span className="text-slate-700">{company.pavilion}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900 min-w-[70px] sm:min-w-[80px]">Stand:</span>
              <span className="text-slate-700 font-semibold">#{company.stand}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900 min-w-[70px] sm:min-w-[80px]">Country:</span>
              <span className="text-slate-700">{company.country}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-2 gap-2 sm:gap-3 pt-4 border-t border-slate-200"
          >
            {/* Product Brochure Button */}
            <button
              onClick={handleBrochureClick}
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:border-slate-400 hover:shadow-sm flex items-center justify-center gap-2"
            >
              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
              <span>Product</span>
            </button>

            {/* Connect Button */}
            <button
              onClick={handleConnectClick}
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg hover:from-slate-800 hover:to-slate-600 transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} className="sm:w-4 sm:h-4" />
              <span>Connect</span>
            </button>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <VisitorRegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        companyName={company.name}
      />
    </>
  )
}