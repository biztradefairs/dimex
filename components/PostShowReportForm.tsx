"use client"

import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ThankYouPopup from '@/components/ThankYouPopup';
import ReCAPTCHA from 'react-google-recaptcha';

interface Country {
  name: string;
}

interface State {
  name: string;
}

interface City {
  name: string;
}

export default function PostShowReportForm() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    website: '',
    jobTitle: '',
    country: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    standSize: '',
    hearAbout: '',
    sector: '',
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';

  const sectors = [
    "Additive Manufacturing - 3D Printing",
    "CNC Milling / Machining Centre, EDM",
    "Cutting Tools",
    "Heat Treatment",
    "Hot Runner System",
    "Injection Moulding Machine",
    "Inspection and Quality Systems, CMM",
    "Machine Tools & Accessories for Dies and Moulds",
    "Mechanical Presses for Sheet Metal Components",
    "Raw Material Suppliers (Tool Steel)",
    "Texturizing, Polishing & Plating",
    "CAD/CAM/CAE, Simulation",
    "Mould Base",
    "Tool Room - Die Casting Dies & Rubber Moulds",
    "Tool Room - Jig, Fixture and Gauges",
    "Tool Room - Sheet Metal Dies / Sheet metal Components",
  ];

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesLoading(true);
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();
        const sortedCountries = data
          .map((c: any) => ({ name: c.name.common }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries", error);
        toast.error("Failed to load countries");
      } finally {
        setCountriesLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!formData.country) {
        setStates([]);
        setFormData(prev => ({ ...prev, state: '', city: '' }));
        return;
      }

      try {
        setStatesLoading(true);
        
        const response = await fetch(
          'https://countriesnow.space/api/v0.1/countries/states',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country: formData.country }),
          }
        );

        const result = await response.json();
        
        if (result.data && result.data.states) {
          const sortedStates = result.data.states
            .map((state: any) => ({ name: state.name }))
            .sort((a: State, b: State) => a.name.localeCompare(b.name));
          
          setStates(sortedStates);
        } else {
          setStates([]);
        }
        
        setFormData(prev => ({ ...prev, state: '', city: '' }));
      } catch (error) {
        console.error("Failed to fetch states", error);
        toast.error("Failed to load states");
        setStates([]);
      } finally {
        setStatesLoading(false);
      }
    };

    fetchStates();
  }, [formData.country]);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (!formData.country || !formData.state) {
        setCities([]);
        setFormData(prev => ({ ...prev, city: '' }));
        return;
      }

      try {
        setCitiesLoading(true);
        
        const response = await fetch(
          'https://countriesnow.space/api/v0.1/countries/state/cities',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              country: formData.country,
              state: formData.state 
            }),
          }
        );

        const result = await response.json();
        
        if (result.data && result.data.length > 0) {
          const sortedCities = result.data
            .map((city: string) => ({ name: city }))
            .sort((a: City, b: City) => a.name.localeCompare(b.name));
          
          setCities(sortedCities);
        } else {
          setCities([]);
        }
        
        setFormData(prev => ({ ...prev, city: '' }));
      } catch (error) {
        console.error("Failed to fetch cities", error);
        toast.error("Failed to load cities");
        setCities([]);
      } finally {
        setCitiesLoading(false);
      }
    };

    fetchCities();
  }, [formData.country, formData.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'post-show-report',
          captchaToken,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Request submitted successfully!');
        setShowThankYou(true);
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          website: '',
          jobTitle: '',
          country: '',
          city: '',
          state: '',
          phone: '',
          email: '',
          standSize: '',
          hearAbout: '',
          sector: '',
        });
        
        // Reset states and cities
        setStates([]);
        setCities([]);
        
        setCaptchaToken(null);
      } else {
        toast.error(result.message || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#004D9F]">Download Post-Show Report</h3>
          <p className="mt-1 text-gray-600">Fill in your details to get the complete report</p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            First Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Type your first name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Last Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Type your last name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Company Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Company Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Job Title<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Job title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Country<span className="ml-1 text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300 bg-white cursor-pointer"
          >
            <option value="">
              {countriesLoading ? "Loading countries..." : "Select Country"}
            </option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              State<span className="ml-1 text-red-500">*</span>
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              disabled={!formData.country || statesLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300 bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {statesLoading 
                  ? "Loading states..." 
                  : !formData.country 
                    ? "Select country first" 
                    : "Select State"}
              </option>
              {states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              City<span className="ml-1 text-red-500">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={!formData.state || citiesLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300 bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">
                {citiesLoading 
                  ? "Loading cities..." 
                  : !formData.state 
                    ? "Select state first" 
                    : "Select City"}
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Phone<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Phone number"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Work Email<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Preferred Stand Size</label>
          <select
            name="standSize"
            value={formData.standSize}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select size</option>
            <option value="Up to 50 sqm">Up to 50 sqm</option>
            <option value="50 – 100 sqm">50 – 100 sqm</option>
            <option value="100+ sqm">100+ sqm</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">How Did You Hear About Us?</label>
          <select
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select option</option>
            <option value="Website">Website</option>
            <option value="Email">Email</option>
            <option value="Social Media">Social Media</option>
            <option value="Partner">Partner</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="pt-2">
          <label className="mb-2 block text-sm font-semibold">
            Product Sector<span className="ml-1 text-red-500">*</span>
          </label>
          <div className="space-y-3 max-h-60 overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {sectors.map((sector) => (
              <label key={sector} className="flex items-center">
                <input
                  type="radio"
                  name="sector"
                  value={sector}
                  checked={formData.sector === sector}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{sector}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !captchaToken}
          className={`mt-4 w-full rounded-lg px-6 py-3 font-semibold text-white transition ${
            isSubmitting || !captchaToken
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-[#004D9F] hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Download Report'}
        </button>

        <p className="mt-4 text-xs text-gray-600">
          By submitting this form, you agree to receive marketing communications.
          You can unsubscribe anytime. Read our{' '}
          <a
            href="/privacy-policy"
            target="_blank"
            className="font-semibold text-blue-600 hover:underline"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>.
        </p>
      </form>

      <ThankYouPopup
        isVisible={showThankYou}
        onClose={() => setShowThankYou(false)}
        name={formData.firstName}
        // formType="post-show-report"
      />
    </>
  );
}