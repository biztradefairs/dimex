// app/exhibitor/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, Eye, Download, MapPin, Building, Package, Tag, File, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { companies } from '../data'; // Adjust import path as needed

export default function ExhibitorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'about' | 'products' | 'brands' | 'brochures'>('about');
  const [company, setCompany] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (params.id) {
      const companyId = params.id as string;
      const foundCompany = companies.find(c => c.id === companyId);
      setCompany(foundCompany);
      
      // Find current index for navigation
      const index = companies.findIndex(c => c.id === companyId);
      setCurrentIndex(index);
    }
  }, [params.id]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevCompany = companies[currentIndex - 1];
      router.push(`/exhibition-directory/${prevCompany.id}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < companies.length - 1) {
      const nextCompany = companies[currentIndex + 1];
      router.push(`/exhibition-directory/${nextCompany.id}`);
    }
  };

  const handleClose = () => {
    router.push('/exhibition-directory');
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-[#F5F8FB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  // Generate logo text from company name
  const getLogoText = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  // Get logo color based on country
  const getLogoColor = (countryCode: string) => {
    const colors: Record<string, string> = {
      'TR': 'bg-red-100',    // Turkey
      'RU': 'bg-blue-100',   // Russia
      'CN': 'bg-red-100',    // China
      'IN': 'bg-orange-100', // India
      'KZ': 'bg-sky-100',    // Kazakhstan
    };
    return colors[countryCode] || 'bg-gray-100';
  };

  // Mock products data - in real app, this would come from API
  const mockProducts = [
    {
      id: 1,
      title: `${company.shortName || company.name} Services`,
      description: `Comprehensive ${company.sector.join(', ')} services provided by ${company.name}.`
    },
    {
      id: 2,
      title: 'International Logistics Solutions',
      description: 'Global logistics and transportation solutions tailored to your needs.'
    },
    {
      id: 3,
      title: 'Customized Supply Chain',
      description: 'End-to-end supply chain management and optimization services.'
    }
  ];

  // Mock brochures data
  const mockBrochures = [
    {
      id: 1,
      name: `${company.name} - Company Overview`,
      description: 'Complete overview of services and capabilities'
    }
  ];

  // Mock brands data
  const mockBrands = [
    company.name,
    company.shortName
  ].filter(Boolean);

  return (
    <div className="bg-[#F5F8FB] min-h-screen mt-40">

      {/* TOP NAV */}
      <div className="bg-white border-b">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center">
    
    {/* Right aligned actions */}
    <div className="flex items-center gap-4">

      {/* Previous */}
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-semibold ${
          currentIndex === 0
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#4D4D4D] hover:bg-gray-50'
        }`}
      >
        <ChevronLeft size={16} /> PREV
      </button>

      {/* Back */}
      <Link
        href="/exhibition-directory"
        className="px-6 py-2 bg-gray-100 rounded-md font-semibold text-sm hover:bg-gray-200 transition-colors"
      >
        BACK TO EXHIBITOR LIST
      </Link>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentIndex === companies.length - 1}
        className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-semibold ${
          currentIndex === companies.length - 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-[#4D4D4D] hover:bg-gray-50'
        }`}
      >
        NEXT <ChevronRight size={16} />
      </button>

      {/* Close */}
      <button
        onClick={handleClose}
        className="p-2 hover:bg-gray-100 rounded-md"
        aria-label="Close"
      >
        <X size={20} />
      </button>

    </div>
  </div>
</div>


      {/* COMPANY HEADER */}
      <div className="max-w-7xl mx-auto px-6 py-10 bg-white mt-6 rounded-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LOGO AREA */}
          <div className="flex flex-col items-center">
            <div className={`w-64 h-64 ${getLogoColor(company.countryCode)} rounded-xl border flex items-center justify-center`}>
              <div className="text-5xl font-bold text-gray-600">
                {getLogoText(company.name)}
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">Company Logo</p>
          </div>

          {/* INFO */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
              {company.shortName && (
                <p className="text-gray-600 italic mt-1">({company.shortName})</p>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Building size={18} className="text-gray-500" />
                <span className="text-gray-700">{company.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-500" />
                <span className="text-gray-700">
                  Pavilion {company.pavilion}, Hall {company.hall}
                </span>
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-900 text-lg">
                Stand No - {company.standNumber}
              </p>
            </div>

            {/* Sector Tags */}
            <div className="flex flex-wrap gap-2">
              {company.sector.map((sector: string, index: number) => (
                <span
                  key={index}
                  className="bg-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-medium"
                >
                  {sector}
                </span>
              ))}
            </div>

            {/* Mock website */}
            <div className="pt-4">
              <a
                href={`https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 hover:underline"
              >
                <Globe size={18} />
                https://{company.name.toLowerCase().replace(/\s+/g, '')}.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'about', label: 'About the company', icon: Building },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'brands', label: 'Brands', icon: Tag },
            { id: 'brochures', label: 'Brochures', icon: File }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-semibold border flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-8 border shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                {company.name} is a leading company in the {company.sector.join(' and ')} sector, 
                headquartered in {company.country}. With a strong presence at Pavilion {company.pavilion}, 
                Hall {company.hall}, Stand {company.standNumber}, the company provides comprehensive 
                solutions and services to clients worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Location Details</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <MapPin size={18} className="text-gray-500 mt-0.5" />
                    <span>Pavilion: {company.pavilion}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Building size={18} className="text-gray-500 mt-0.5" />
                    <span>Hall: {company.hall}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">Stand: {company.standNumber}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sectors & Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {company.sector.map((sector: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex justify-center mb-4">
                  <div className={`w-32 h-32 ${getLogoColor(company.countryCode)} rounded-lg flex items-center justify-center`}>
                    <div className="text-2xl font-bold text-gray-600">
                      {getLogoText(company.name)}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                  {product.title}
                </h3>
                <p className="text-gray-700 text-center">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* BRANDS TAB */}
        {activeTab === 'brands' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBrands.map((brand, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${getLogoColor(company.countryCode)} rounded-lg flex items-center justify-center`}>
                    <div className="text-lg font-bold text-gray-600">
                      {brand.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{brand}</h3>
                    <p className="text-gray-600 text-sm">Brand of {company.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BROCHURES TAB */}
        {activeTab === 'brochures' && (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-gray-700 font-semibold">Featured Brochure Image</th>
                    <th className="p-4 text-left text-gray-700 font-semibold">Brochure Name</th>
                    <th className="p-4 text-left text-gray-700 font-semibold">Brochure PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBrochures.map((brochure) => (
                    <tr key={brochure.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <div className="w-20 h-28 bg-gray-100 border rounded-lg flex items-center justify-center">
                          <File size={24} className="text-gray-400" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{brochure.name}</p>
                          <p className="text-sm text-gray-600 mt-1">{brochure.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2 hover:bg-gray-700 transition-colors">
                            <Eye size={16} /> View
                          </button>
                          <button className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2 hover:bg-gray-700 transition-colors">
                            <Download size={16} /> Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {mockBrochures.length === 0 && (
              <div className="text-center py-12">
                <File size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No brochures available for this company.</p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-white rounded-xl p-6 border shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold ${
                  currentIndex === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={16} /> Previous Company
              </button>
              
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">
                Company {currentIndex + 1} of {companies.length}
              </span>
              
              <button
                onClick={handleNext}
                disabled={currentIndex === companies.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold ${
                  currentIndex === companies.length - 1
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Next Company <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}