'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { ExhibitionCompany } from './api';
import CompanyCard from './copanyCard';
import ExhibitorLogo from '@/components/ExhibitorLogo';

interface CompanyGridProps {
  companies: ExhibitionCompany[];
  viewMode: 'grid' | 'gallery' | 'list';
  onProductBrochureClick: (companyId: string, companyName: string) => void;
}
export default function CompanyGrid({ companies, viewMode, onProductBrochureClick }: CompanyGridProps) {
  if (viewMode !== 'list') return (
    <div className={'grid gap-5 sm:gap-6 ' + (viewMode === 'gallery' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3')}>
      {companies.map(company => <CompanyCard key={company.id} company={{ id: company.id, name: company.name, company: company.company, pavilion: company.pavilion, stand: company.standNumber, country: company.country, logo: company.logo, logoInitials: company.company.slice(0, 2).toUpperCase(), countryCode: company.countryCode, location: company.fullAddress, sector: company.sector }} onProductBrochureClick={onProductBrochureClick} />)}
    </div>
  );
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-400"><tr><th scope="col" className="px-5 py-4 font-semibold">Company</th><th scope="col" className="hidden px-5 py-4 font-semibold md:table-cell">Location</th><th scope="col" className="px-5 py-4 font-semibold">Stall</th><th scope="col" className="hidden px-5 py-4 font-semibold lg:table-cell">Sector</th><th scope="col" className="px-4 py-4"><span className="sr-only">Profile</span></th></tr></thead>
        <tbody className="divide-y divide-slate-100">{companies.map(company => <tr key={company.id} className="transition hover:bg-blue-50/30">
          <td className="px-5 py-4"><div className="flex items-center gap-3"><ExhibitorLogo logoUrl={company.logo} company={company.company} /><div><Link href={'/exhibition-directory/' + company.id} className="font-semibold leading-5 text-slate-900 hover:text-[#004A96]">{company.company}</Link>{company.name && company.name !== company.company && <p className="mt-1 text-xs text-slate-400">{company.name}</p>}</div></div></td>
          <td className="hidden px-5 py-4 text-xs text-slate-500 md:table-cell">{company.fullAddress || (company.country !== 'Not specified' ? company.country : '-')}</td>
          <td className="px-5 py-4"><span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-[#004A96]"><MapPin className="h-3 w-3" />{company.standNumber}</span></td>
          <td className="hidden max-w-60 px-5 py-4 text-xs leading-5 text-slate-500 lg:table-cell">{company.sector.filter(sector => sector !== 'General').join(', ') || '-'}</td>
          <td className="px-4 py-4"><Link aria-label={'View ' + company.company} href={'/exhibition-directory/' + company.id} className="inline-flex rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-[#004A96]"><ArrowUpRight className="h-4 w-4" /></Link></td>
        </tr>)}</tbody>
      </table>
    </div>
  );
}
