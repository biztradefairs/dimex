"use client"

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import SectionContainer from "@/components/UI/SectionContainer";
import ReCAPTCHA from "react-google-recaptcha";
import BackToTop from "../exhibitor-resource-center/component/BackToTop";
import toast, { Toaster } from 'react-hot-toast';
import ThankYouPopup from "@/components/ThankYouPopup";

interface Country {
  name: string;
}

interface State {
  name: string;
}

interface City {
  name: string;
}

const TransRussiaExhibitPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  
  const introRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const [formData, setFormData] = useState({
    interestLevel: "",
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "", 
    jobTitle: "",
    country: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    standSize: "",
    hearAboutUs: "",
    productSector: [] as string[],
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diemex-backend.onrender.com';

  const standSizes = [
    "9 sqm (3x3)", "12 sqm (3x4)", "15 sqm (3x5)",
    "18 sqm (3x6)", "20 sqm (4x5)", "24 sqm (4x6)",
    "30 sqm (5x6)", "36 sqm (6x6)", "Custom Size"
  ];

  const hearAboutOptions = [
    "Search Engine", "Social Media", "Email Newsletter",
    "Industry Publication", "Colleague Recommendation",
    "Previous Exhibition", "Other"
  ];

  const productSectors = [
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (introRef.current) introRef.current.style.display = "none";
    }, 1000);

    const handleScroll = () => {
      if (!backToTopRef.current) return;
      backToTopRef.current.style.opacity = window.scrollY > 300 ? "1" : "0";
      backToTopRef.current.style.pointerEvents = window.scrollY > 300 ? "auto" : "none";
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        productSector: (e.target as HTMLInputElement).checked
          ? [...prev.productSector, name]
          : prev.productSector.filter(s => s !== name),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA verification");
      return;
    }

    // Validate at least one product sector is selected
    if (formData.productSector.length === 0) {
      toast.error("Please select at least one product sector");
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
          formType: 'exhibitor-enquiry',
          captchaToken,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Enquiry submitted successfully! Our team will contact you soon.");
        setShowThankYou(true);
        
        // Reset form
        setFormData({
          interestLevel: "",
          firstName: "",
          lastName: "",
          companyName: "",
          companyWebsite: "",
          jobTitle: "",
          country: "",
          city: "",
          state: "",
          phone: "",
          email: "",
          standSize: "",
          hearAboutUs: "",
          productSector: [],
        });
        
        // Reset states and cities
        setStates([]);
        setCities([]);
        
        // Reset captcha
        setCaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
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
      <Head>
        <title>Enquiry to Exhibit | DIEMEX 2026</title>
      </Head>
      <Toaster position="top-right" />

      {/* INTRO LOADER */}
      <div
        ref={introRef}
        className="fixed inset-0 z-[100] grid place-content-center bg-mainColor1"
      >
        <div className="loader" />
      </div>

      <main className="page-spacing-wrapper">
        {/* ================= HERO ================= */}
        <div className="relative z-[1] bg-[#F4FAFF] pt-60">
          <SectionContainer className="!pb-10">
            <h1 className="title-72 text-black">Enquiry to Exhibit</h1>
            <p className="max-w-6xl py-5">
              Please complete the form below and our team will contact you
              regarding DIEMEX 2026 exhibiting opportunities.
            </p>
          </SectionContainer>
        </div>

        {/* CONTENT */}
        <SectionContainer className="py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              <h2 className="text-3xl lg:text-6xl font-semibold text-[#4D4D4D]">
                Be Part of India's Leading Die & Mould Manufacturing Exhibition
              </h2>
              <p className="my-5">
                Showcase your solutions to automotive, EV, plastics, aerospace
                and industrial manufacturing leaders.
              </p>
              <hr className="my-8" />
              <div className="grid grid-cols-2 gap-10">
                {[
                  ["10,000", "Visitors"],
                  ["200+", "Exhibitors"],
                  ["20+", "Speakers"],
                  ["5+", "Countries"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="text-5xl font-bold text-mainColor1">{n}</p>
                    <p className="text-xl">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div className="border rounded-xl p-6 bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Interest Level *</label>
                  {[
                    "Ready to book my stand",
                    "Looking for more information",
                    "Looking for sponsorship opportunities",
                  ].map(v => (
                    <label key={v} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="interestLevel"
                        value={v}
                        onChange={handleChange}
                        required
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{v}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    required
                    className="w-full border p-3 rounded"
                  />
                </div>

                <div>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name *"
                    required
                    className="w-full border p-3 rounded"
                  />
                </div>

                <div>
                  <input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name *"
                    required
                    className="w-full border p-3 rounded"
                  />
                </div>

                <div>
                  <input
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="Company Website"
                    className="w-full border p-3 rounded"
                  />
                </div>

                <div>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title *"
                    required
                    className="w-full border p-3 rounded"
                  />
                </div>

                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    required
                    className="w-full border p-3 rounded"
                  />
                </div>

                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className="w-full border p-3 rounded"
                  />
                </div>

                <div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-300 bg-white cursor-pointer"
                  >
                    <option value="">
                      {countriesLoading ? "Loading countries..." : "Select Country *"}
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
                            : "Select State *"}
                      </option>
                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
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
                            : "Select City *"}
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
                  <select
                    name="standSize"
                    value={formData.standSize}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                  >
                    <option value="">Preferred Stand Size *</option>
                    {standSizes.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <select
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                  >
                    <option value="">How did you hear about us? *</option>
                    {hearAboutOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Product Sector *</label>
                  <div className="border p-4 rounded max-h-60 overflow-y-auto">
                    {productSectors.map(s => (
                      <label key={s} className="flex items-center gap-2 text-sm py-1">
                        <input
                          type="checkbox"
                          name={s}
                          checked={formData.productSector.includes(s)}
                          onChange={handleChange}
                          className="h-4 w-4"
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>

                {/* CAPTCHA */}
                <div className="border rounded p-4 bg-gray-50 flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !captchaToken}
                  className={`w-full py-3 rounded font-semibold text-white transition ${
                    isSubmitting || !captchaToken
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#004D9F] hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  By submitting this form, you agree to our{' '}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </div>
          </div>
        </SectionContainer>
      </main>

      {/* Thank You Popup */}
      <ThankYouPopup
        isVisible={showThankYou}
        onClose={() => setShowThankYou(false)}
        name={formData.firstName}
        // formType="exhibitor-enquiry"
      />

      <BackToTop />
    </>
  );
};

export default TransRussiaExhibitPage;