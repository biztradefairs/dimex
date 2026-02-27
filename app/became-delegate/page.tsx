'use client'

// import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import SectionContainer from "@/components/UI/SectionContainer"
import DelegateForm from "./DelegateForm"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export default function DelegatesPackagesPage() {
  const delegatePackages = [
    {
      id: 1,
      title: "Student",
      price: "₹ 3,500",
      features: [
        "Access to all technical conference sessions",
        "Conference kit (Badge, Folder, Notepad, Pen)",
        "Entry to exhibition area (all 3 days)",
        "Interaction with industry experts & speakers",
        "Certificate of Participation",
        "Career guidance & mentorship interaction",
        "Internship & placement opportunity connect",
        "Digital access to conference presentation summaries",
        "Lunch & refreshments",
      ],
      cardLink: "/became-delegate",
      invoiceLink: "/summit-invoice-form/"
    },
    {
      id: 2,
      title: "General",
      price: "₹ 6,000",
      features: [
        "Full access to all conference sessions",
        "Entry to exhibition area (all 3 days)",
        "Conference kit (Badge, Folder, Notepad, Pen)",
        "Access to networking lunch & tea breaks",
        "B2B networking opportunity",
        "Access to speakers' presentation (digital copy post event)",
        "Certificate of Participation",
        "Entry to Business Networking Meet",
        "Access to post-event report & industry insights summary",
      ],
      cardLink: "/became-delegate",
      invoiceLink: "/summit-invoice-form/"
    },
    {
      id: 3,
      title: "GROUP of 3",
      price: "₹ 15,000",
      features: [
        "Full conference access (all sessions)",
        "Priority seating in technical sessions",
        "Exhibition entry (all 3 days) Reserved group seating",
        "Company name recognition on delegate list",
        "Access to networking lunch & tea breaks",
        "Digital presentations access",
        "Participation certificates for all 3",
        "Group networking badge recognition",
        "Priority B2B meeting assistance (pre-scheduled on request)",
      ],
      cardLink: "/became-delegate",
      invoiceLink: "/summit-invoice-form/"
    }
  ];

  return (
    <main className="bg-white font-parabolica">
      {/* PAGE HEADER */}
      <div className="bg-sky-50 pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
            Become a Delegate
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Prices are inclusive of GST
          </p>
        </SectionContainer>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-16">
        <SectionContainer>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            {/* LEFT CONTENT - PACKAGES */}
            <div>
              <div className="max-w-4xl">
                <h2 className="mt-5 text-4xl font-semibold text-[#4D4D4D] lg:text-5xl">
                  Choose Your Delegate Package
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Join industry leaders and experts at our premier summit. Select the package that best suits your 
                  needs and gain access to exclusive networking opportunities, insightful sessions, and valuable 
                  industry connections.
                </p>

                <hr className="my-10 border-gray-300" />

                {/* PACKAGE CARDS - ORIGINAL DESIGN WITH PRICE ADDED */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {delegatePackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="flex flex-col bg-sky-50 p-4 rounded-lg"
                    >
                      <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                      
                      {/* All features shown */}
                      <ul className="space-y-2 mb-4">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-700">
                            <svg
                              className="mr-2 mt-0.5 flex-shrink-0"
                              width="14"
                              height="14"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                                stroke="#003771"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price added at the bottom */}
                      <div className="mt-auto pt-3 border-t border-gray-200">
                        <div className="text-xl font-bold text-[#004D9F]">{pkg.price}</div>
                        {/* <p className="text-xs text-gray-500 mt-1">Inclusive of GST</p> */}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-10 border-gray-300" />

                <h3 className="mb-8 text-3xl font-semibold text-gray-900">
                  Why Attend?
                </h3>

                <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                  <div>
                    <p className="text-5xl font-bold text-[#4D4D4D]">500+</p>
                    <p className="mt-2 text-xl text-gray-700">Industry Professionals</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-[#4D4D4D]">20+</p>
                    <p className="mt-2 text-xl text-gray-700">Expert Speakers</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-[#4D4D4D]">3</p>
                    <p className="mt-2 text-xl text-gray-700">Networking Events</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-[#4D4D4D]">20+</p>
                    <p className="mt-2 text-xl text-gray-700">Hours of Content</p>
                  </div>
                </div>

                {/* Removed the image section */}
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="relative">
              <div className="sticky top-32">
                <DelegateForm />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
      
      <BackToTop />
    </main>
  )
}