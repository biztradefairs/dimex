"use client"

import React, { useEffect, useRef, useState } from "react"
import Head from "next/head"
import SectionContainer from "@/components/UI/SectionContainer"
import PartnersSection from "@/components/section/PartnersSection"
import ReCAPTCHA from "react-google-recaptcha"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

const TransRussiaExhibitPage: React.FC = () => {
  type Country = {
  name: string;
};

const [countries, setCountries] = useState<Country[]>([]);
const [countriesLoading, setCountriesLoading] = useState(false);

  const introRef = useRef<HTMLDivElement>(null)
  const backToTopRef = useRef<HTMLButtonElement>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

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
    notRobot: false,
  })


  const standSizes = [
    "9 sqm (3x3)","12 sqm (3x4)","15 sqm (3x5)",
    "18 sqm (3x6)","20 sqm (4x5)","24 sqm (4x6)",
    "30 sqm (5x6)","36 sqm (6x6)","Custom Size"
  ]

  const hearAboutOptions = [
    "Search Engine","Social Media","Email Newsletter",
    "Industry Publication","Colleague Recommendation",
    "Previous Exhibition","Other"
  ]

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
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (introRef.current) introRef.current.style.display = "none"
    }, 1000)

    const handleScroll = () => {
      if (!backToTopRef.current) return
      backToTopRef.current.style.opacity = window.scrollY > 300 ? "1" : "0"
      backToTopRef.current.style.pointerEvents =
        window.scrollY > 300 ? "auto" : "none"
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement

    if (type === "checkbox" && name !== "notRobot") {
      setFormData(prev => ({
        ...prev,
        productSector: checked
          ? [...prev.productSector, name]
          : prev.productSector.filter(s => s !== name),
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.notRobot) {
      alert("Please confirm that you are not a robot.")
      return
    }

    console.log("Submitted Data:", formData)
    alert("Form submitted successfully!")
  }
  useEffect(() => {
  const fetchCountries = async () => {
    try {
      setCountriesLoading(true);

      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();

      // Sort alphabetically
      const sortedCountries = data
        .map((c: any) => ({ name: c.name.common }))
        .sort((a: Country, b: Country) =>
          a.name.localeCompare(b.name)
        );

      setCountries(sortedCountries);
    } catch (error) {
      console.error("Failed to fetch countries", error);
    } finally {
      setCountriesLoading(false);
    }
  };

  fetchCountries();
}, []);


  return (
    <>
      <Head>
        <title>Enquiry to Exhibit | DIEMEX 2026</title>
      </Head>

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
                Be Part of India’s Leading Die & Mould Manufacturing Exhibition
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
                {[
                  "Ready to book my stand",
                  "Looking for more information",
                  "Looking for sponsorship opportunities",
                ].map(v => (
                  <label key={v} className="flex gap-2">
                    <input
                      type="radio"
                      name="interestLevel"
                      value={v}
                      onChange={handleChange}
                      required
                    />
                    {v}
                  </label>
                ))}

                {[
                  "firstName",
                  "lastName",
                  "companyName",
                  "companyWebsite",
                  "jobTitle",
                  "phone",
                  "email",
                ].map(f => (
                  <input
                    key={f}
                    name={f}
                    placeholder={f}
                    onChange={handleChange}
                    required
                    className="w-full border p-3 rounded"
                  />
                ))}

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
{/* State & City */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* State */}
  <div>
    <label className="mb-1 block text-sm font-medium">
      State<span className="ml-1 text-red-500">*</span>
    </label>
    <input
      type="text"
      name="state"
      value={formData.state}
      onChange={handleChange}
      required
      placeholder="Enter your state"
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
                 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  {/* City */}
  <div>
    <label className="mb-1 block text-sm font-medium">
      City<span className="ml-1 text-red-500">*</span>
    </label>
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleChange}
      required
      placeholder="Enter your city"
      className="w-full rounded border border-gray-300 px-3 py-2 text-sm 
                 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
</div>



                <select name="standSize" onChange={handleChange} required className="w-full border p-3 rounded">
                  <option value="">Preferred Stand Size</option>
                  {standSizes.map(s => <option key={s}>{s}</option>)}
                </select>

                <select name="hearAboutUs" onChange={handleChange} required className="w-full border p-3 rounded">
                  <option value="">How did you hear about us?</option>
                  {hearAboutOptions.map(o => <option key={o}>{o}</option>)}
                </select>

                <div className="border p-4 rounded max-h-60 overflow-y-auto">
                  {productSectors.map(s => (
                    <label key={s} className="flex gap-2 text-sm">
                      <input type="checkbox" name={s} onChange={handleChange} />
                      {s}
                    </label>
                  ))}
                </div>

                {/* NOT ROBOT */}
                <div className="border rounded p-4 bg-gray-50">
                 <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
                </div>

                <button className="w-full bg-[#004D9F] text-white py-3 rounded font-semibold">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </SectionContainer>

        <PartnersSection />
      </main>
      <BackToTop/>
    </>
  )
}

export default TransRussiaExhibitPage
