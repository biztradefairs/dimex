'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, Eye, Download, MapPin, Building, Package, Tag, File, X, Menu, ArrowLeft, Share2, Phone, Mail, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { fetchExhibitionCompanyById, fetchExhibitorProducts, fetchExhibitorBrochures, fetchExhibitorBrands, ExhibitionCompany } from '../api';

export default function ExhibitorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'about' | 'products' | 'brands' | 'brochures'>('about');
  const [company, setCompany] = useState<ExhibitionCompany | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [brochures, setBrochures] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; name: string } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadCompanyData = async () => {
      if (!params.id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch company details
        const companyData = await fetchExhibitionCompanyById(params.id as string);
        setCompany(companyData);
        
        // Fetch related data in parallel
        const [productsData, brochuresData, brandsData] = await Promise.all([
          fetchExhibitorProducts(params.id as string),
          fetchExhibitorBrochures(params.id as string),
          fetchExhibitorBrands(params.id as string)
        ]);
        
        setProducts(productsData);
        setBrochures(brochuresData);
        setBrands(brandsData);
      } catch (err) {
        setError('Failed to load company details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, [params.id]);

  const handlePrevious = () => {
    router.back();
  };

  const handleNext = () => {
    router.forward();
  };

  const handleClose = () => {
    router.push('/exhibition-directory');
  };

  const handleViewPdf = (url: string, name: string) => {
    // For PDFs, we can open in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPdf = (url: string, name: string) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get logo color based on country
  const getLogoColor = (countryCode: string = 'INT') => {
    const colors: Record<string, string> = {
      'TR': 'bg-red-50',
      'RU': 'bg-blue-50',
      'CN': 'bg-red-50',
      'IN': 'bg-orange-50',
      'KZ': 'bg-sky-50',
      'US': 'bg-blue-50',
      'GB': 'bg-red-50',
      'DE': 'bg-yellow-50',
      'FR': 'bg-blue-50',
      'JP': 'bg-red-50',
      'KR': 'bg-blue-50',
      'AE': 'bg-green-50',
      'SA': 'bg-green-50',
      'QA': 'bg-purple-50',
    };
    return colors[countryCode] || 'bg-gray-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8FB] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-[#F5F8FB] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error || 'Company not found'}</p>
          <button
            onClick={() => router.push('/exhibition-directory')}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F8FB] min-h-screen">
      {/* TOP NAV */}
      <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile back button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => router.push('/exhibition-directory')}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Back"
              >
                <ArrowLeft size={20} />
              </button>
              <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                {company.name}
              </span>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 border-gray-300 transition-colors"
              >
                <ChevronLeft size={16} /> PREV
              </button>

              <Link
                href="/exhibition-directory"
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-sm transition-colors"
              >
                BACK TO EXHIBITOR LIST
              </Link>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 border-gray-300 transition-colors"
              >
                NEXT <ChevronRight size={16} />
              </button>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>

              <button
                onClick={handleClose}
                className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Navigation</h3>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <button
                onClick={() => {
                  router.push('/exhibition-directory');
                  setShowMobileMenu(false);
                }}
                className="w-full py-3 text-left px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
              >
                Back to Exhibitor List
              </button>
              <button
                onClick={handlePrevious}
                className="w-full py-3 text-left px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
              >
                ← Previous Company
              </button>
              <button
                onClick={handleNext}
                className="w-full py-3 text-left px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
              >
                Next Company →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg truncate">{selectedPdf.name}</h3>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1">
              <iframe
                src={`${selectedPdf.url}#toolbar=1`}
                className="w-full h-full"
                title={selectedPdf.name}
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT - with top padding for fixed nav */}
      <div className="pt-16 lg:pt-20 pb-6">
        {/* COMPANY HEADER */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div className={`w-full max-w-xs mx-auto lg:mx-0 lg:w-64 lg:h-64 ${
                    getLogoColor(company.countryCode)
                  } rounded-xl border flex items-center justify-center p-8`}>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-700">
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  {!isMobile && (
                    <p className="mt-3 text-center text-sm text-gray-500">Company Logo</p>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                      {company.name}
                    </h1>
                    {company.shortName && (
                      <p className="text-gray-600 mt-1 text-sm sm:text-base">({company.shortName})</p>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Building size={18} className="text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700 truncate">{company.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} className="text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700">
                        Pavilion {company.pavilion}, Hall {company.hall}
                      </span>
                    </div>
                  </div>

                  {/* Stand Number */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                      <span className="font-semibold text-gray-900 text-lg">Stand No:</span>
                      <span className="text-2xl font-bold text-gray-900">{company.standNumber}</span>
                    </div>
                  </div>

                  {/* Sector Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {company.sector.map((sector: string, index: number) => (
                        <span
                          key={index}
                          className="bg-teal-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Social */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4 border-t border-gray-200">
                    {company.website && (
                      <a
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                      >
                        <Globe size={18} />
                        <span className="truncate">Visit Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {[
              { id: 'about', label: 'About', icon: Building },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'brands', label: 'Brands', icon: Tag },
              { id: 'brochures', label: 'Brochures', icon: File }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 sm:px-6 sm:py-3 rounded-xl font-semibold border flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  } text-sm sm:text-base`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className={isMobile ? 'hidden sm:inline' : ''}>
                    {tab.label}
                  </span>
                  {isMobile && tab.label === 'About' && <span>About</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Company Overview</h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {company.description || `${company.name} is a leading company in the ${company.sector.join(' and ')} sector, 
                  headquartered in ${company.country}. With a strong presence at Pavilion ${company.pavilion}, 
                  Hall ${company.hall}, Stand ${company.standNumber}, the company provides comprehensive 
                  solutions and services to clients worldwide.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pavilion</p>
                        <p className="font-medium text-gray-900">{company.pavilion}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building size={20} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Hall</p>
                        <p className="font-medium text-gray-900">{company.hall}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Stand Number</p>
                        <p className="font-medium text-gray-900">{company.standNumber}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sectors & Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.sector.map((sector: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-center mb-4">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 ${getLogoColor(company.countryCode)} rounded-xl flex items-center justify-center`}>
                        <div className="text-2xl font-bold text-gray-600">
                          {company.name.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                      {product.title || product.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm sm:text-base">
                      {product.description || `${company.name} services`}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Package size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No products available</p>
                </div>
              )}
            </div>
          )}

          {/* BRANDS TAB */}
          {activeTab === 'brands' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 ${getLogoColor(company.countryCode)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <div className="text-lg font-bold text-gray-600">
                          {brand.name?.substring(0, 2).toUpperCase() || company.name.substring(0, 2).toUpperCase()}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{brand.name || company.name}</h3>
                        <p className="text-gray-600 text-sm">Brand of {company.name}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Tag size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No brands available</p>
                </div>
              )}
            </div>
          )}

          {/* BROCHURES TAB - FIXED VERSION */}
          {activeTab === 'brochures' && (
            <div className="bg-white rounded-2xl border overflow-hidden">
              {brochures.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left text-gray-700 font-semibold">Brochure</th>
                        <th className="p-4 text-left text-gray-700 font-semibold hidden sm:table-cell">Description</th>
                        <th className="p-4 text-left text-gray-700 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brochures.map((brochure) => {
                        // Get the brochure URL - check both possible field names
                        const brochureUrl = brochure.fileUrl || brochure.url;
                        const brochureName = brochure.name || brochure.title || 'Brochure';
                        
                        return (
                          <tr key={brochure.id} className="border-t hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-16 bg-gray-100 border rounded-lg flex items-center justify-center flex-shrink-0">
                                  <File size={20} className="text-gray-400" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-900 truncate">{brochureName}</p>
                                  <p className="text-sm text-gray-600 mt-1 sm:hidden">{brochure.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 hidden sm:table-cell">
                              <p className="text-gray-600">{brochure.description || 'No description available'}</p>
                            </td>
                            <td className="p-4">
                              {brochureUrl ? (
                                <div className="flex flex-col sm:flex-row gap-2">
                                  {/* View button - opens in new tab */}
                                  <a
                                    href={brochureUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                  >
                                    <Eye size={16} /> View
                                  </a>
                                  
                                  {/* Download button - using anchor tag with download attribute */}
                                  <a
                                    href={brochureUrl}
                                    download={brochureName}
                                    className="px-3 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                  >
                                    <Download size={16} /> Download
                                  </a>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">No file available</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <File size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No brochures available</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-600 text-sm">Company</p>
                <p className="text-lg font-semibold text-gray-900">{company.name}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <button
                  onClick={handleNext}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-700 bg-gray-100 hover:bg-gray-200"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}