'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import ExhibitorLogo from '@/components/ExhibitorLogo';
import VisitorRegistrationForm from './visitor-registration-form';

interface CompanyCardProps {
  company: { id: string; name: string; company: string; pavilion: string; stand: string; country: string; logo?: string; logoInitials: string; countryCode?: string; location?: string; sector?: string[] };
  onProductBrochureClick: (companyId: string, companyName: string) => void;
}
export default function CompanyCard({ company, onProductBrochureClick }: CompanyCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();
  const location = company.location || (company.country !== 'Not specified' ? company.country : '');
  const sectors = (company.sector || []).filter(sector => sector !== 'General');
  return (
    <>
      <article onClick={event => { if (!(event.target as HTMLElement).closest('button, a')) router.push('/exhibition-directory/' + company.id); }} className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5">
        <div className="mb-5 flex items-start justify-between gap-3">
          <ExhibitorLogo logoUrl={company.logo} company={company.company} className="h-28 w-28 sm:h-32 sm:w-32" />
          <span className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[11px] font-semibold text-[#004A96]">{company.stand && company.stand !== 'Not assigned' ? 'Stall ' + company.stand : 'Stall details soon'}</span>
        </div>
        <Link href={'/exhibition-directory/' + company.id} className="outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-blue-500"><h3 className="min-h-12 text-base font-bold leading-6 text-slate-900 transition group-hover:text-[#004A96]">{company.company}</h3></Link>
        {company.name && company.name !== company.company && <p className="mt-2 text-xs text-slate-500">{company.name}</p>}
        {location && <p className="mt-3 flex items-start gap-1.5 text-xs leading-5 text-slate-500"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" /><span>{location}</span></p>}
        {sectors.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{sectors.slice(0, 2).map(sector => <span key={sector} className="rounded-md bg-slate-100 px-2 py-1 text-[10px] leading-4 text-slate-500">{sector}</span>)}</div>}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <button type="button" onClick={() => onProductBrochureClick(company.id, company.company)} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#004A96]">View profile<ArrowUpRight className="h-3.5 w-3.5" /></button>
          <button type="button" onClick={() => setIsFormOpen(true)} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#004A96] py-2.5 text-xs font-semibold text-white transition hover:bg-[#003875]"><MessageCircle className="h-3.5 w-3.5" />Connect</button>
        </div>
      </article>
      <VisitorRegistrationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} companyName={company.company} />
    </>
  );
}
