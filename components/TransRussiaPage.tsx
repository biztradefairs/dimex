// components/TransRussiaPage.tsx
"use client"
import React, { useState, useEffect } from 'react';
import SectionContainer from './UI/SectionContainer';
import ReCAPTCHA from 'react-google-recaptcha';
import PartnersSection from './section/PartnersSection';

// Types
interface TextLink {
  id: string;
  Text: string;
  LinkTo: string;
  NewTab: boolean;
}

interface NavData {
  id: string;
  Title: string;
  LinkTo: string | null;
  MenuAttached: boolean;
  Links: TextLink[];
}

interface Button {
  id: string;
  Text: string;
  Theme: string;
  LinkTo: string;
  NewTab: boolean;
}

interface Partner {
  id: string;
  attributes: {
    Name: string;
    Logo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    Slug: string;
  };
}

interface FooterColumnData {
  id: string;
  Title: string | null;
  Content: {
    Content: string;
  };
  Socials: Array<{
    LogoORBanner: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    Link: string;
    Target: string;
  }>;
}

interface FooterColumn {
  id: string;
  Data: FooterColumnData[];
}

interface Props {
  navbarData: {
    NavText: {
      Text1: string;
      Text2: string;
    };
    Data: NavData[];
    Buttons: Button[];
    Copyright: string;
    EndLinks: TextLink[];
  };
  pageData: {
    Header: {
      Title: string;
      Content: string;
    };
    Sections: Array<{
      __typename: string;
      id: string;
      Data?: string;
      Partners?: {
        data: Partner[];
      };
      PartnersSectionTitle?: string;
    }>;
  };
  footerData: {
    FooterColumns: FooterColumn[];
    CopyrightText: string;
    EndLinks: TextLink[];
  };
}

const TransRussiaPage: React.FC<Props> = ({ navbarData, pageData, footerData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [email, setEmail] = useState("");
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 🔗 API integration later
    setTimeout(() => {
      alert("Registration submitted successfully!");
      setLoading(false);
      setEmail("");
    }, 1000);
  };

  return (
    <div id="__next">
      <noscript>
        <div>
          <img
            alt=""
            loading="lazy"
            width="1"
            height="1"
            decoding="async"
            className="pointer-events-none invisible absolute"
            style={{ color: 'transparent' }}
            src="/watch/15004633"
          />
        </div>
      </noscript>

      <div className="relative min-h-screen font-parabolica antialiased __variable_646807 __variable_2c6616">
        {/* Intro Loader */}
        <div id="intro" className="fixed inset-0 z-[100] grid place-content-center bg-mainColor1">
          <div className="loader"></div>
        </div>

        {/* Back to Top Button */}
        <div
          className={`fixed bottom-3 right-3 lg:bottom-10 lg:right-2 z-50 transition-all duration-300 ${
            showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <button
            aria-label="Back to top"
            onClick={scrollToTop}
            className="m-0 rounded-full border-none bg-white p-0 outline-none drop-shadow-lg"
          >
            <svg className="size-10 fill-mainColor1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z" />
            </svg>
          </button>
        </div>

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
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Designation <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Your job title/position"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Your company/organization name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              placeholder="ex: #20, 4th cross, RK Road"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
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
              {/* Add more countries as needed */}
            </select>
          </div>

          {/* State and City Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="">Select State</option>
                <option value="Moscow">Moscow</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Delhi">Delhi</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Istanbul">Istanbul</option>
                <option value="Ankara">Ankara</option>
                <option value="Beijing">Beijing</option>
                <option value="Berlin">Berlin</option>
                <option value="California">California</option>
                {/* Add more states as needed */}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
              >
                <option value="">Select City</option>
                <option value="Moscow">Moscow</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Istanbul">Istanbul</option>
                <option value="Beijing">Beijing</option>
                <option value="Berlin">Berlin</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Almaty">Almaty</option>
                <option value="Minsk">Minsk</option>
                {/* Add more cities as needed */}
              </select>
            </div>
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pin Code / Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter your postal code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
                required
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Profile Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please choose your Profile <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
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
              placeholder="Enter promo code if available"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
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
              required
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
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
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <div className="py-4">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={
  loading ||
  (Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) && !captchaToken)
}

              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  <PartnersSection/>
</section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransRussiaPage;