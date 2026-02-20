'use client';

import { ExhibitionCompany } from './api';
import CompanyCard from './copanyCard';

interface CompanyGridProps {
  companies: ExhibitionCompany[];
  viewMode: 'grid' | 'gallery' | 'list';
  onProductBrochureClick: (companyId: string, companyName: string) => void;
}

export default function CompanyGrid({ companies, viewMode, onProductBrochureClick }: CompanyGridProps) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={{
              id: company.id, // ← USE THE ORIGINAL STRING ID, NOT parseInt!
              name: company.name,
              pavilion: company.pavilion,
              stand: company.standNumber,
              country: company.country,
              logo: company.name.substring(0, 2).toUpperCase(),
              logoColor: `bg-${company.countryCode?.toLowerCase()}-50`
            }}
            onProductBrochureClick={(id, name) => onProductBrochureClick(id, name)} // id is already string
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
              id: company.id, // ← USE THE ORIGINAL STRING ID
              name: company.name,
              pavilion: company.pavilion,
              stand: company.standNumber,
              country: company.country,
              logo: company.name.substring(0, 2).toUpperCase(),
              logoColor: `bg-${company.countryCode?.toLowerCase()}-50`
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
              onClick={() => onProductBrochureClick(company.id, company.name)} // ← company.id is already string
              className="border-t hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <td className="p-4">
                <div className="font-medium text-slate-900">{company.name}</div>
                <div className="text-sm text-slate-600 md:hidden">
                  {company.pavilion} • Stand {company.standNumber}
                </div>
              </td>
              <td className="p-4 hidden md:table-cell text-slate-600">
                {company.country} • {company.pavilion}
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}