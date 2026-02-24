'use client'

// import { Metadata } from "next"
import Image from "next/image"
import { useState, useEffect } from "react"
import SectionContainer from "@/components/UI/SectionContainer"
import DelegateForm from "./DelegateForm"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"


export default function DelegatesPackagesPage() {
  return (
    <main className="bg-white font-parabolica">
      {/* PAGE HEADER */}
      <div className="bg-sky-50 pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
            Become a Delegate
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Prices are inclusive of VAT
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

                <h3 className="mb-8 text-3xl font-semibold text-gray-900">
                  Why Attend?
                </h3>

                <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                  <div>
                    <p className="text-5xl font-bold text-[#4D4D4D]">500+</p>
                    <p className="mt-2 text-xl text-gray-700">Industry Professionals</p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-[#4D4D4D]">50+</p>
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

                <div className="mt-20 flex justify-center">
                  <div className="relative">
                    <img
                      src="https://cdn.itegroupnews.com/summit_event_mockup.png"
                      alt="Summit Event Preview"
                      width={420}
                      height={420}
                      className="rotate-[-8deg] transform shadow-2xl rounded-lg"
                    />
                  </div>
                </div>
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