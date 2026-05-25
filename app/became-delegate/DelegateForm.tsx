"use client"
import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ThankYouPopup from '@/components/ThankYouPopup';
import ReCAPTCHA from 'react-google-recaptcha';

export default function DelegateForm() {
  type Country = {
    name: string;
  };

  type State = {
    name: string;
  };

  type City = {
    name: string;
  };

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  // Create a ref for the reCAPTCHA component
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    package: '',
    notRobot: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setCountriesLoading(true);
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
        const data = await res.json();

        // Sort alphabetically
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.notRobot) {
      toast.error("Please confirm that you are not a robot.");
      setIsSubmitting(false);
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Use your Render backend URL
      const response = await fetch('https://diemex-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'delegate-registration',
          captchaToken,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Delegate registration submitted successfully!');
        setShowThankYou(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          jobTitle: '',
          email: '',
          phone: '',
          country: '',
          state: '',
          city: '',
          package: '',
          notRobot: false
        });
        
        // Reset states and cities
        setStates([]);
        setCities([]);
        
        // Reset captcha token
        setCaptchaToken(null);
        
        // Reset reCAPTCHA using the ref
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        toast.error(result.message || 'Failed to submit registration.');
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
      
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[#004D9F]">
          Register as Delegate
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              First Name<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="First name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Last Name<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Company Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Job Title<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Job title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Work Email<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Phone number"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Country<span className="ml-1 text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition hover:border-blue-300 bg-white cursor-pointer"
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

        {/* State & City - Now as Dropdowns */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         outline-none transition hover:border-blue-300 bg-white cursor-pointer
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         outline-none transition hover:border-blue-300 bg-white cursor-pointer
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
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

        {/* Package Selection */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Select Package<span className="ml-1 text-red-500">*</span>
          </label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       outline-none transition hover:border-blue-300 bg-white cursor-pointer"
          >
            <option value="">Choose Delegate Category</option>
            <option value="student">STUDENT - ₹3,500</option>
            <option value="general">GENERAL - ₹6,000</option>
            <option value="group">GROUP 3 - ₹15,000</option>
          </select>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="notRobot"
            checked={formData.notRobot}
            onChange={(e) => setFormData(prev => ({ ...prev, notRobot: e.target.checked }))}
            required
            className="mt-1"
          />
          <label className="text-sm text-gray-700">
            I confirm that I am not a robot<span className="ml-1 text-red-500">*</span>
          </label>
        </div>

        {/* reCAPTCHA */}
        <div className="rounded border bg-gray-50 p-4">
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 w-fit rounded bg-[#004D9F] px-6 py-2 text-sm font-medium text-white hover:opacity-90 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Register as Delegate'}
        </button>

        <p className="text-[11px] leading-relaxed text-gray-600">
          By submitting this form, you agree to receive marketing
          communications. You can unsubscribe anytime. Read our{' '}
          <a
            href="/privacy-policy"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>.
        </p>
      </form>

      {/* Thank You Popup */}
      <ThankYouPopup
        isVisible={showThankYou}
        onClose={() => setShowThankYou(false)}
        name={formData.firstName}
        // formType="delegate-registration"
      />
    </>
  );
}