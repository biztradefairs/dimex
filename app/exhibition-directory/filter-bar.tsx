'use client'

import { Search, ChevronDown } from 'lucide-react'

export default function FilterBar() {
  return (
    <div className="space-y-3 bg-white p-4 md:p-6 rounded-lg border border-slate-200">
      {/* Search - Full Width */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
      </div>

      {/* Dropdowns Row 1 - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <select className="px-4 py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer pr-8">
          <option>Country</option>
          <option>Russia</option>
          <option>Turkey</option>
          <option>Kazakhstan</option>
          <option>China</option>
          <option>India</option>
        </select>

        <select className="px-4 py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer pr-8">
          <option>Product Sector</option>
          <option>Logistics</option>
          <option>Transportation</option>
          <option>Warehousing</option>
        </select>

        <select className="px-4 py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer pr-8">
          <option>Transportation geog...</option>
          <option>Air Freight</option>
          <option>Road Freight</option>
          <option>Rail Freight</option>
          <option>Maritime</option>
        </select>
      </div>

      {/* Dropdowns Row 2 - Type and Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-end">
        <select className="px-4 py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer pr-8">
          <option>Type of transported...</option>
          <option>Electronics</option>
          <option>Chemicals</option>
          <option>Food</option>
          <option>General Cargo</option>
        </select>

        {/* Language Switcher - Right Aligned */}
        <div className="flex gap-2 col-span-1 sm:col-span-1 md:col-span-2 justify-start sm:justify-end">
          <button className="px-3 py-1.5 text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2 border border-slate-300 rounded whitespace-nowrap">
            <span className="text-xs">🇬🇧</span>
            <span>EN</span>
          </button>
          <button className="px-3 py-1.5 text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors border border-slate-300 rounded whitespace-nowrap">
            <span>RU</span>
          </button>
        </div>
      </div>
    </div>
  )
}
