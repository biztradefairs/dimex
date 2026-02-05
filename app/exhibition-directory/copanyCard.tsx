// components/copanyCard.tsx
'use client'

import { useState } from 'react'
import VisitorRegistrationForm from './visitor-registration-form'
import Link from 'next/link'

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

  // Function to generate slug from company name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-')
  }

  return (
    <>
      <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        {/* Logo Area */}
        <div
          className={`h-28 flex items-center justify-center p-5 ${
            company.logoColor || 'bg-slate-50'
          }`}
        >
          <div className="text-3xl font-bold text-slate-400 text-center">
            {company.logo}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 border-t border-slate-200 bg-white flex-1 flex flex-col">
          <h3 className="font-bold text-slate-900 mb-2 text-sm leading-tight line-clamp-2">
            {company.name}
          </h3>

          <div className="space-y-0.5 text-xs text-slate-600 mb-4 flex-1">
            <p className="truncate">{company.pavilion}</p>
            <p className="font-semibold text-slate-900 truncate">
              Stand No - {company.stand}
            </p>
            <p className="truncate">{company.country}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 pt-4 mt-4">
            <div className="flex justify-center mb-4">
              
               
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {/* Option 1: Direct navigation with Next.js Link */}
              <Link
                href={`/exhibition-directory/${company.id}`}
                className="px-3 py-2 text-xs font-semibold text-slate-900 border border-slate-300 rounded hover:bg-slate-50 transition-colors whitespace-nowrap text-center"
              >
                Product Brochure
              </Link>

              {/* Option 2: Using onClick handler (uncomment to use) */}
              {/* <button
                onClick={() => onProductBrochureClick(company.id, company.name)}
                className="px-3 py-2 text-xs font-semibold text-slate-900 border border-slate-300 rounded hover:bg-slate-50 transition-colors whitespace-nowrap"
              >
                Product Brochure
              </button> */}

              <button
                onClick={() => setIsFormOpen(true)}
                className="px-3 py-2 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      <VisitorRegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        companyName={company.name}
      />
    </>
  )
}