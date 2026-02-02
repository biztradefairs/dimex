// components/TransRussiaPage.tsx
"use client"
import React, { useState, useEffect } from 'react';
import SectionContainer from './UI/SectionContainer';
import dynamic from 'next/dynamic';
import PartnersSection from './section/PartnersSection';



type TransRussiaPageProps = {
  navbarData?: any;
  pageData: {
    Header: {
      Title: string;
    };
  };
  footerData?: any;
};

// Dynamically import ReCAPTCHA to avoid SSR issues
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => <div className="h-20 w-full bg-gray-100 rounded-lg animate-pulse"></div>
});

// Types (keep your existing types)

const TransRussiaPage: React.FC<TransRussiaPageProps> = ({
  navbarData,
  pageData,
  footerData,
}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    email: '',
    mobile: '',
    profile: '',
    promocode: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle dropdown
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    
    // Validate CAPTCHA if site key exists
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !captchaToken) {
      alert("Please complete the CAPTCHA verification");
      return;
    }
    
    setLoading(true);

    // 🔗 API integration later
    setTimeout(() => {
      alert("Registration submitted successfully!");
      setLoading(false);
      // Reset form
      setFormData({
        name: '',
        designation: '',
        company: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        email: '',
        mobile: '',
        profile: '',
        promocode: ''
      });
      setTermsAccepted(false);
      setCaptchaToken(null);
    }, 1500);
  };

  return (
    <div id="__next">
      {/* ... (keep existing JSX for intro loader, back to top button, etc.) ... */}

      {/* Main Content */}
      <div>
        <div className="page-spacing-wrapper">
          {/* Page Header */}
          <div className="relative z-[1] flex flex-col justify-end bg-gradient-to-b from-blue-50 to-white !pt-48">
            <SectionContainer>
              <div className="flex flex-col justify-end !pt-0 !pb-16">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 mt-15">
                  {pageData.Header.Title}
                </h1>
                <p className="text-lg text-gray-600 max-w-8xl">
                  Register now to access Eurasia's premier transport and logistics exhibition. Connect with industry leaders, discover innovations, and expand your network.
                </p>
              </div>
            </SectionContainer>
          </div>

          <section className="py-16 lg:py-24 bg-blue-50/30">
            <SectionContainer>
              <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                    Get Your Visitor Pass
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Register for TransRussia 2026
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Join 30,500+ industry professionals and 600+ exhibitors at the heart of Eurasia's logistics innovation.
                  </p>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-xl p-6 lg:p-8 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Visitor Registration Form</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300"
                      />
                    </div>

                    {/* Designation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        required
                        placeholder="Your job title/position"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300"
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        placeholder="Your company/organization name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        placeholder="ex: #20, 4th cross, RK Road"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300 resize-none"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300 bg-white cursor-pointer"
                      >
                        <option value="">Select Country</option>
                        <option value="India">India</option>
                        <option value="Russia">Russia</option>
                        <option value="Turkey">Turkey</option>
                        <option value="China">China</option>
                        <option value="Germany">Germany</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="UAE">United Arab Emirates</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Belarus">Belarus</option>
                      </select>
                    </div>

                    {/* State and City Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
  {/* State */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      State <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleInputChange}
      required
      placeholder="Enter your state"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 outline-none transition hover:border-blue-300"
    />
  </div>

  {/* City */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      City <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleInputChange}
      required
      placeholder="Enter your city"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 outline-none transition hover:border-blue-300"
    />
  </div>

</div>


                    {/* Pin Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pin Code / Zip Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your postal code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        We'll send your registration confirmation and updates to this email.
                      </p>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                          <span className="text-gray-700">+91</span>
                        </div>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your mobile number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300"
                        />
                      </div>
                    </div>

                    {/* Profile Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Please choose your Profile <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="profile"
                        value={formData.profile}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300 bg-white cursor-pointer"
                      >
                        <option value="">Select your industry profile</option>
                        <option value="Automotive">Automotive (Auto OE Ms, Auto Ancillary)</option>
                        <option value="Consumer Appliances">Consumer Appliances</option>
                        <option value="Electricals">Electricals</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Plastic Processing">Plastic Processing</option>
                        <option value="Visitors">Visitors Visitor Registration</option>
                        <option value="Logistics">Logistics & Supply Chain</option>
                        <option value="Warehousing">Warehousing & Storage</option>
                        <option value="Transport">Transport Services</option>
                        <option value="IT Solutions">IT Solutions</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail & E-commerce</option>
                        <option value="Consulting">Consulting Services</option>
                      </select>
                    </div>

                    {/* Promo Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Promo Code (Optional)
                      </label>
                      <input
                        type="text"
                        name="promocode"
                        value={formData.promocode}
                        onChange={handleInputChange}
                        placeholder="Enter promo code if available"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Enter your promo code to get discounted or free registration.
                      </p>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        required
                        className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 cursor-pointer"
                      />
                      <label htmlFor="terms" className="ml-3 text-sm text-gray-600 cursor-pointer select-none">
                        I agree to receive marketing communications, updates, and promotional materials from TransRussia. 
                        I can unsubscribe anytime by clicking the "unsubscribe" link in emails. 
                        For more information on how we handle your data, please refer to our{' '}
                        <a 
                          href="https://ite.group/en/privacy/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </a>.
                      </label>
                    </div>

                    {/* CAPTCHA */}
                    <div className="py-4">
                      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                        <ReCAPTCHA
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          onChange={(token) => setCaptchaToken(token)}
                          onExpired={() => setCaptchaToken(null)}
                          className="recaptcha-container"
                        />
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={
                          loading || 
                          !termsAccepted ||
                          (Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) && !captchaToken)
                        }
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Complete Registration'
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center text-gray-600">
                  <p className="text-sm">
                    Need assistance with registration? Contact us at{' '}
                    <a href="mailto:info@transrussia.ru" className="text-blue-600 hover:underline">
                      info@transrussia.ru
                    </a>
                  </p>
                </div>
              </div>
            </SectionContainer>
            <PartnersSection />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TransRussiaPage;