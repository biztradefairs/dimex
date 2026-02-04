'use client'

import { useState } from 'react'
import VisitorRegistrationForm from './visitor-registration-form'

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
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)

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
              <svg
                className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {/* <button className="px-3 py-2 text-xs font-semibold text-slate-900 border border-slate-300 rounded hover:bg-slate-50 transition-colors whitespace-nowrap">
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
