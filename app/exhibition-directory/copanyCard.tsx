// app/exhibition-directory/companyCard.tsx
'use client'

import { useState } from 'react'
import VisitorRegistrationForm from './visitor-registration-form'
import { useRouter } from 'next/navigation'
import { ExternalLink, MessageCircle, Building, MapPin, Globe } from 'lucide-react'

interface CompanyCardProps {
  company: {
    id: string
    name: string
    company: string
    pavilion: string
    stand: string
    country: string
    logo?: string
    logoInitials: string
    countryCode?: string
  }
  onProductBrochureClick: (companyId: string, companyName: string) => void
}

export default function CompanyCard({ company, onProductBrochureClick }: CompanyCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  // In companyCard.tsx, update the navigation:
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.tagName === 'BUTTON' ||
      target.tagName === 'A'
    ) {
      return
    }

    // Create slug from company name
    const slug = company.company.toLowerCase().replace(/\s+/g, '-')
    router.push(`/exhibition-directory/${slug}`)
  }

  const handleConnectClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFormOpen(true)
  }

  const handleBrochureClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onProductBrochureClick(company.id, company.company)
  }

  const getLogoColor = () => {
    const colors = [
      'bg-gradient-to-br from-blue-50 to-blue-100',
      'bg-gradient-to-br from-green-50 to-green-100',
      'bg-gradient-to-br from-purple-50 to-purple-100',
      'bg-gradient-to-br from-orange-50 to-orange-100',
      'bg-gradient-to-br from-pink-50 to-pink-100',
      'bg-gradient-to-br from-indigo-50 to-indigo-100',
      'bg-gradient-to-br from-teal-50 to-teal-100',
      'bg-gradient-to-br from-yellow-50 to-yellow-100'
    ];

    const index = company.company.length % colors.length;
    return colors[index];
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
      >
        {/* Logo Area */}
        <div
          className={`h-32 sm:h-40 md:h-48 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${getLogoColor()} group-hover:from-slate-100 group-hover:to-slate-200`}
        >
          {company.logo && !imageError ? (
            <div className="relative w-full h-full">
              <img
                src={company.logo}
                alt={company.company}
                className="w-full h-full object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 text-center">
              {company.logoInitials}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-slate-100 bg-white">
          {/* Company Name - This is the actual company name */}
          <h3 className="font-bold text-slate-900 mb-3 text-base sm:text-lg md:text-xl leading-tight line-clamp-2">
            {company.company}
          </h3>

          {/* Exhibitor/Contact Name - Optional secondary info */}
          {company.name && company.name !== company.company && (
            <p className="text-sm text-slate-500 mb-2">
              Contact: {company.name}
            </p>
          )}

          {/* Details */}
          <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Building size={16} className="text-slate-400 flex-shrink-0" />
              <span className="text-slate-700">{company.pavilion}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-slate-400 flex-shrink-0" />
              <span className="text-slate-700 font-semibold">Stand #{company.stand}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-slate-400 flex-shrink-0" />
              <span className="text-slate-700">{company.country}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-2 gap-2 sm:gap-3 pt-4 border-t border-slate-200"
          >
            <button
              onClick={handleBrochureClick}
              className="px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:border-slate-400 hover:shadow-sm flex items-center justify-center gap-2"
            >
              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
              <span>Product</span>
            </button>

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
        companyName={company.company}
      />
    </>
  )
}