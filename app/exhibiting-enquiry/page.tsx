"use client"

import React, { useEffect, useRef, useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import SectionContainer from "@/components/UI/SectionContainer"
import PartnersSection from "@/components/section/PartnersSection"

const TransRussiaExhibitPage: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null)
  const backToTopRef = useRef<HTMLButtonElement>(null)

  const [formData, setFormData] = useState({
    interestLevel: "",
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    country: "",
    phone: "",
    email: "",
    standSize: "",
    hearAboutUs: "",
    productSector: [] as string[],
    notRobot: false,
  })

  const countries = [
    "Russia","USA","China","Germany","France","UK","Japan","South Korea",
    "India","Brazil","Italy","Spain","Canada","Australia","Netherlands",
    "Switzerland","UAE","Singapore","Turkey","Poland","Other"
  ]

  const standSizes = [
    "9 sqm (3x3)","12 sqm (3x4)","15 sqm (3x5)","18 sqm (3x6)",
    "20 sqm (4x5)","24 sqm (4x6)","30 sqm (5x6)",
    "36 sqm (6x6)","Custom Size"
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
      if (window.scrollY > 300) {
        backToTopRef.current.style.opacity = "1"
        backToTopRef.current.style.pointerEvents = "auto"
      } else {
        backToTopRef.current.style.opacity = "0"
        backToTopRef.current.style.pointerEvents = "none"
      }
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
      setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    alert("Form submitted")
  }

  return (
    <>
      <Head>
        <title>Enquiry to Exhibit | DIEMEX 2026</title>
      </Head>

      {/* INTRO LOADER */}
      <div ref={introRef} className="fixed inset-0 z-[100] grid place-content-center bg-mainColor1">
        <div className="loader" />
      </div>

      {/* BACK TO TOP */}
      <button
        ref={backToTopRef}
        className="fixed bottom-6 right-6 z-50 opacity-0 transition"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      <main className="page-spacing-wrapper font-parabolica">

        {/* ================= HERO ================= */}
        <div className="relative z-[1] bg-[#F4FAFF] pt-48">
          <SectionContainer className="!pb-10">
            <h1 className="title-72 bg-[] text-black mt-15">Enquiry to Exhibit</h1>
            <p className="max-w-6xl py-5">
              If you'd like to exhibit at DIEMEX 2026 or would like more
              information about exhibiting opportunities, please complete the
              form below and a member of our team will be in touch with you.
            </p>
          </SectionContainer>
        </div>

        {/* ================= CONTENT ================= */}
        <SectionContainer className="py-20">
          <div className="grid gap-10 lg:grid-cols-2">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="title-mainColor2 my-5 text-3xl lg:text-6xl font-semibold">
                Be Part of India’s Leading Die & Mould Manufacturing Exhibition
              </h2>

              <p className="my-5">
                Showcase your die & mould, tooling, materials, and precision manufacturing solutions to India’s rapidly expanding automotive, EV, plastics, aerospace, and industrial manufacturing market.
              </p>

              <hr className="my-8" />

              <div className="grid grid-cols-2 gap-10">
                {[
                  ["10,000","Visitors"],
                  ["200+","Exhibitors"],
                  ["20+","Speakers"],
                  ["5+","Countries"],
                ].map(([n,l]) => (
                  <div key={l}>
                    <p className="text-mainColor1 text-5xl font-bold">{n}</p>
                    <p className="text-xl">{l}</p>
                  </div>
                ))}
              </div>

              <h3 className="title-mainColor2 my-10 text-3xl lg:text-5xl font-semibold">
                Who You'll Meet?
              </h3>

              <ul className="list-disc pl-5 space-y-2">
                <li>Die & Mould Manufacturers & Toolrooms</li>
                <li>OEMs & Component Manufacturers (Automotive, EV, Plastics, Aerospace, Industrial)</li>
                <li>Production, Toolroom & Plant Heads</li>
                <li>Design, CAD/CAM & Engineering Professionals</li>
                <li>Material, Tool Steel & Consumables Suppliers</li>
                <li>Automation, Industry 4.0 & Manufacturing Technology Providers</li>
                <li>Procurement Heads, Investors & Industry Consultants</li>
              </ul>
            </div>

            {/* RIGHT FORM */}
            <div className="form-style border-1 px-3 py-3">
              <form onSubmit={handleSubmit} className="space-y-5">

                {["Ready to book my stand","Looking for more information","Looking for sponsorship opportunities"].map(v => (
                  <label key={v} className="flex gap-2">
                    <input type="radio" name="interestLevel" value={v} onChange={handleChange} required />
                    {v}
                  </label>
                ))}

                {["firstName","lastName","companyName","companyWebsite","jobTitle","phone","email"].map(f => (
                  <input
                    key={f}
                    name={f}
                    onChange={handleChange}
                    placeholder={f}
                    className="w-full border p-3 rounded"
                    required
                  />
                ))}

                <select name="country" onChange={handleChange} className="w-full border p-3 rounded" required>
                  <option value="">Select Country</option>
                  {countries.map(c => <option key={c}>{c}</option>)}
                </select>

                <select name="standSize" onChange={handleChange} className="w-full border p-3 rounded" required>
                  <option value="">Preferred Stand Size</option>
                  {standSizes.map(s => <option key={s}>{s}</option>)}
                </select>

                <select name="hearAboutUs" onChange={handleChange} className="w-full border p-3 rounded" required>
                  <option value="">How did you hear about us?</option>
                  {hearAboutOptions.map(o => <option key={o}>{o}</option>)}
                </select>

                <div className="border p-4 rounded max-h-60 overflow-y-auto">
                  {productSectors.map(s => (
                    <label key={s} className="flex gap-2">
                      <input type="checkbox" name={s} onChange={handleChange} />
                      {s}
                    </label>
                  ))}
                </div>

                <label className="flex gap-2">
                  <input type="checkbox" name="notRobot" onChange={handleChange} required />
                  I'm not a robot
                </label>

                <button className="w-full bg-blue-600 text-white py-3 rounded">
                  Submit
                </button>
              </form>
            </div>

          </div>
        </SectionContainer>

        <PartnersSection/>

      </main>
    </>
  )
}

export default TransRussiaExhibitPage
