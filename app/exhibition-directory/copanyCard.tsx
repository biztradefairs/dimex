// components/copanyCard.tsx
'use client'

import { useState } from 'react'
import VisitorRegistrationForm from './visitor-registration-form'
import Link from 'next/link'
import { ExternalLink, MessageCircle } from 'lucide-react'

interface CompanyCardProps {
  company: {
    id: number
    name: string
    pavilion: string
    stand: string
    country: string
    logo: string
    logoColor?: string
  }
  onProductBrochureClick: (companyId: number, companyName: string) => void
}

export default function CompanyCard({ company, onProductBrochureClick }: CompanyCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
        {/* Logo Area - Responsive */}
        <div
          className={`h-32 sm:h-40 md:h-48 flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${
            company.logoColor || 'bg-gradient-to-br from-slate-50 to-slate-100'
          } group-hover:from-slate-100 group-hover:to-slate-200`}
        >
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 text-center">
            {company.logo}
          </div>
        </div>

        {/* Content - Responsive padding */}
        <div className="p-4 sm:p-5 md:p-6 border-t border-slate-100 bg-white flex-1 flex flex-col">
          {/* Company Name - Responsive text */}
          <h3 className="font-bold text-slate-900 mb-3 text-base sm:text-lg md:text-xl leading-tight line-clamp-2 min-h-[3.5rem]">
            {company.name}
          </h3>

          {/* Details - Responsive spacing */}
          <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 flex-1">
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

          {/* Action Buttons - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-4 border-t border-slate-200">
            {/* Product Brochure Button */}
            <Link
              href={`/exhibition-directory/${company.id}`}
              className="group/btn px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-300 hover:border-slate-400 hover:shadow-sm flex items-center justify-center gap-2"
            >
              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Brochure</span>
            </Link>

            {/* Connect Button */}
            <button
              onClick={() => setIsFormOpen(true)}
              className="group/btn px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg hover:from-slate-800 hover:to-slate-600 transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} className="sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Connect</span>
            </button>
          </div>

          {/* Quick Actions - Mobile only */}
          <div className="mt-3 pt-3 border-t border-slate-200 sm:hidden">
            <button
              onClick={() => onProductBrochureClick(company.id, company.name)}
              className="w-full text-xs text-slate-500 hover:text-slate-700 text-center py-1.5"
            >
              View all products →
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