// app/exhibition-directory/company-grid.tsx
'use client';

import { ExhibitionCompany } from './api';
import CompanyCard from './copanyCard';
import { Building, MapPin } from 'lucide-react';

interface CompanyGridProps {
  companies: ExhibitionCompany[];
  viewMode: 'grid' | 'gallery' | 'list';
  onProductBrochureClick: (companyId: string, companyName: string) => void;
}

export default function CompanyGrid({ companies, viewMode, onProductBrochureClick }: CompanyGridProps) {
  console.log('📊 CompanyGrid received companies:', companies.map(c => ({
    exhibitorName: c.name,
    companyName: c.company,
    logo: c.logo
  })));

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={{
              id: company.id,
              name: company.name,
              company: company.company,
              pavilion: company.pavilion,
              stand: company.standNumber,
              country: company.country,
              logo: company.logo,
              logoInitials: (company.company || company.name).substring(0, 2).toUpperCase(),
              countryCode: company.countryCode
            }}
            onProductBrochureClick={(id, name) => onProductBrochureClick(id, name)}
          />
        ))}
      </div>
    );
  }

  if (viewMode === 'gallery') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={{
              id: company.id,
              name: company.name,
              company: company.company,
              pavilion: company.pavilion,
              stand: company.standNumber,
              country: company.country,
              logo: company.logo,
              logoInitials: (company.company || company.name).substring(0, 2).toUpperCase(),
              countryCode: company.countryCode
            }}
            onProductBrochureClick={(id, name) => onProductBrochureClick(id, name)}
          />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left text-slate-700 font-semibold">Company</th>
            <th className="p-4 text-left text-slate-700 font-semibold hidden md:table-cell">Location</th>
            <th className="p-4 text-left text-slate-700 font-semibold hidden lg:table-cell">Stand</th>
            <th className="p-4 text-left text-slate-700 font-semibold">Sector</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              onClick={() => onProductBrochureClick(company.id, company.company)}
              className="border-t hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  {company.logo && (
                    <img
                      src={company.logo}
                      alt={company.company}
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={(e) => {
                        console.error('List view image error:', company.logo);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div>
                    <div className="font-medium text-slate-900">{company.company}</div>
                    {company.name && company.name !== company.company && (
                      <div className="text-sm text-slate-500">Contact: {company.name}</div>
                    )}
                    <div className="text-sm text-slate-600 md:hidden">
                      {company.pavilion} • Stand {company.standNumber}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4 hidden md:table-cell text-slate-600">
                <div className="flex items-center gap-2">
                  <Building size={14} className="text-slate-400" />
                  <span>{company.pavilion}</span>
                  <MapPin size={14} className="text-slate-400 ml-2" />
                  <span>{company.country}</span>
                </div>
              </td>
              <td className="p-4 hidden lg:table-cell font-medium text-slate-900">
                {company.standNumber}
              </td>
              <td className="p-4">
                <div className="flex flex-wrap gap-1">
                  {company.sector.slice(0, 2).map((s, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                  {company.sector.length > 2 && (
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                      +{company.sector.length - 2}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}