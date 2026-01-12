// app/why-exhibit/page.tsx - UPDATED WITH NEW LAYOUT
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import PartnersSection from "@/components/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import Image from "next/image";

export default function WhyExhibit() {
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const testimonials = [
    {
      logo: "🎯",
      text: "We participate and will continue to participate at TransRussia because of the year-on-year growth",
      author: "ALEXEY KRAVCHENKO",
      company: "Sales Director, FESCO",
    },
  ]

  return (
    <>
      <main className="bg-white">
        {/* HERO SECTION */}
        <section
          className="relative min-h-screen bg-cover bg-center flex items-center justify-start"
          style={{
            backgroundImage: "url(/images/image.png)",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <SectionContainer>
            <div className="relative z-10 text-white pt-32 mt-70">
              <h1 className="text-5xl lg:text-6xl xl:text-5xl font-bold mb-6 leading-tight">Unlock New Opportunities at TransRussia</h1>
              <p className="text-[10] text-white mb-4 max-w-3xl">
                Discover new possibilities at TransRussia 2026. Be where the logistics industry gathers to innovate,
                collaborate, and be at the forefront of logistics excellence.
              </p>
              <div className="flex items-center gap-4 text-white">
                <span className="flex items-center gap-2">📅 17 - 19 March 2026</span>
                <span className="flex items-center gap-2">📍 Crocus Expo, Moscow</span>
              </div>
              <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
                Enquire to Exhibit
              </button>
            </div>
          </SectionContainer>
        </section>

        {/* WHERE TRANSPORT COMES TOGETHER */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">Where the Transport & Logistics Industry Comes Together</h2>
                <p className="text-gray-700 mb-6 text-lg">
                  TransRussia is a prime gateway to tap into the thriving logistics and transport sector within one of the
                  world's largest economies.
                </p>
                <p className="text-gray-700 mb-8 text-lg">
                  With Russia's strategic location and a market size of over 145 million people, the country presents
                  significant growth potential for companies looking to expand their operations and optimize supply
                  chains.
                </p>

                <ul className="space-y-4 mb-8">
  <li className="flex items-start gap-3">
    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
    <span className="text-[#4D4D4D] text-[20px]">
      <strong>30,500 Visitors</strong>
    </span>
  </li>

  <li className="flex items-start gap-3">
    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
    <span className="text-[#4D4D4D] text-[20px]">
      <strong>600+ Exhibitors</strong>
    </span>
  </li>

  <li className="flex items-start gap-3">
    <span className="text-[#4D4D4D] font-bold text-[20px] leading-none">•</span>
    <span className="text-[#4D4D4D] text-[20px]">
      <strong>50+ Countries Represented</strong>
    </span>
  </li>
</ul>


                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
                  Enquire to Exhibit
                </button>
              </div>

  <div className="relative h-96 rounded-lg overflow-hidden">
  <img
    src="/images/image.png"
    alt="Conference"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h2 className="text-white text-3xl font-bold">Conference Highlights</h2>
  </div>
</div>

            </div>
          </SectionContainer>
        </section>


                {/* REASONS TO EXHIBIT - UPDATED WITH NEW LAYOUT */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <SectionContainer>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
              <div className="mb-8 lg:mb-0">
                <h3 className="text-sm text-blue-600 font-semibold mb-2">Key Benefits</h3>
                <h2 className="text-4xl lg:text-5xl font-bold">Reasons Why You Should Exhibit</h2>
              </div>
            </div>

            <p className="text-gray-700 mb-8 max-w-7xl text-lg">
              TransRussia provides an unmatched platform for professionals in the transportation and logistics sector to
              present cutting-edge solutions to a qualified audience of industry leaders and decision-makers.
            </p>
            <p className="text-gray-700 mb-12 max-w-7xl text-lg">
              With budgets dedicated to optimising supply chains and expanding operational efficiency, exhibiting at
              TransRussia offers you the opportunity to make valuable connections, establish strategic partnerships, and
              drive growth in a competitive market.
            </p>

            {/* NEW GRID LAYOUT WITH 2-COLUMN ROWS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Row 1 */}
              <div className="bg-white p-8 border-gray-200">
                <h3 className="font-bold text-xl lg:text-2xl mb-4">Want to grow internationally?</h3>
                <p className="text-gray-600 text-lg">
                  Connect with buyers and partners from over 50 countries who attend TransRussia to discover global
                  solutions.
                </p>
              </div>
              <div className="bg-white p-8 border-gray-200">
                <h3 className="font-bold text-xl lg:text-2xl mb-4">Struggling to measure impact?</h3>
                <p className="text-gray-600 text-lg">
                  TransRussia delivers tangible results, from new leads to direct sales and strengthened partnerships.
                </p>
              </div>

              {/* Row 2 */}
              <div className="bg-white p-8 border-gray-200">
                <h3 className="font-bold text-xl lg:text-2xl mb-4">Facing challenges entering the market?</h3>
                <p className="text-gray-600 text-lg">
                  Gain direct access to decision-makers and partners across Eurasia's logistics and transportation sectors.
                </p>
              </div>
              <div className="bg-white p-8 border-gray-200">
                <h3 className="font-bold text-xl lg:text-2xl mb-4">
                  Concerned about the cost and complexity of logistics in Eurasia?
                </h3>
                <p className="text-gray-600 text-lg">
                  Meet partners to simplify your supply chain and operations.
                </p>
              </div>

              {/* Row 3 */}
              <div className="bg-white p-8 border-gray-200">
                <h3 className="font-bold text-xl lg:text-2xl mb-4">Need better lead generation?</h3>
                <p className="text-gray-600 text-lg">
                  Build a pipeline of leads from industries such as freight forwarding, manufacturing, and e-commerce logistics.
                </p>
              </div>
              <div className="bg-white p-8 border-gray-200">
                <h3 className="font-bold text-xl lg:text-2xl mb-4">Is your brand struggling to get noticed?</h3>
                <p className="text-gray-600 text-lg">
                  Showcase your unique solutions in front of a targeted audience in a competitive environment.
                </p>
              </div>
            </div>

            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
              Enquire to Exhibit
            </button>
          </SectionContainer>
        </section>



        {/* WHY EXPAND TO CIS - UPDATED WITH NEW LAYOUT */}
<section className="py-16 lg:py-24 bg-gray-50">
  <SectionContainer>
    <h2 className="text-4xl lg:text-5xl font-bold mb-12">Why Expand to the CIS?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">

      {/* Card 1 */}
      <div className="relative w-[466px] h-[500px] overflow-hidden">
        <Image
          src="/images/image.png"
          alt="Complex Logistics Services"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 p-8">
          <div className="text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">$88.38 Billion by 2024</h3>
                  <p className="text-gray-300 text-lg">
                    Russia's logistics market is on track to reach an estimated <strong>$88.38 billion</strong>, supported by a resilient economy with a GDP surpassing $2 trillion.
                  </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative w-[466px] h-[500px] overflow-hidden">
        <Image
          src="/images/image.png"
          alt="Maritime Transport"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 p-8">
          <div className="text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">Growth in Demand</h3>
                  <p className="text-gray-300 text-lg">
                    As the Russian economy rebounds and the regional security landscape becomes more complex, there's a growing need for cutting-edge solutions in surveillance.
                  </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative w-[466px] h-[500px] overflow-hidden">
        <Image
          src="/images/image.png"
          alt="Air Freight"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 p-8">
          <div className="text-white">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">$108.78 Billion by 2029</h3>
                  <p className="text-gray-300 text-lg">
                    As Russia's logistics landscape continues to expand, the market is forecasted to reach <strong>$108.78 billion by 2029</strong>, offering leading demand for investment and innovation in the world's largest projects.
                  </p>
          </div>
        </div>
      </div>

    </div>
  </SectionContainer>
</section>

        {/* EVENT SECTORS */}
  <section className="py-16 lg:py-24 bg-gray-50">
  <SectionContainer>
    {/* Header */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
      <div>
        <h3 className="text-sm text-blue-600 font-semibold mb-2">
          Event Sectors
        </h3>
        <h2 className="text-4xl lg:text-6xl font-bold max-w-4xl">
          From Freight to Technology Discover our Core Sectors
        </h2>
      </div>

<button className="mt-16 lg:mt-24 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium">
  Explore Our 13 Sectors
</button>

    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      
      {[
        "Complex Logistics Services & Freight Forwarding",
        "Maritime & Inland Waterway Transport",
        "Air Freight",
        "Rail Freight",
        "Road Freight Transportation",
        "Technology",
      ].map((title, index) => (
        <a
          key={index}
          href="#"
          className="group relative w-full min-h-[600px] overflow-hidden"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: "url(/images/image.png)" }}
          />

          {/* Bottom Gradient (EXACT like design) */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

          {/* Title */}
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-white text-xl lg:text-2xl font-bold leading-snug max-w-xs">
              {title}
            </h3>
          </div>
        </a>
      ))}

    </div>
  </SectionContainer>
</section>


        {/* DOWNLOAD BROCHURE */}
<section className="py-16 lg:py-24">
  <SectionContainer>
    <div
      className="relative rounded-2xl overflow-hidden px-8 py-12 lg:px-16 lg:py-16 text-white"
      style={{
        backgroundImage: "url(/images/brochure-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-blue-900/80"></div>

      {/* Content */}
<div className="relative flex flex-col gap-6">
  <div className="max-w-4xl">
    <h2 className="text-4xl lg:text-5xl font-bold mb-3">
      Download Your Event Brochure
    </h2>
    <p className="text-white/80 text-lg">
      Get a comprehensive look at the event's attendees, the sectors on display,
      and the key industry players present.
    </p>
  </div>

  <button className="bg-white text-blue-900 border border-white px-8 py-3 rounded-full font-medium hover:bg-gray-100 whitespace-nowrap w-fit">
    Download Now
  </button>
</div>


    </div>
  </SectionContainer>
</section>

        {/* TESTIMONIALS - RESTORED SECTION */}
{/* TESTIMONIALS */}
<section className="py-20 lg:py-28 bg-white">
  <SectionContainer>
    {/* Top label */}
    <div className="flex items-center gap-2 mb-4">
      <span className="w-4 h-4 bg-blue-600 inline-block rounded-sm" />
      <h3 className="text-sm text-gray-600 font-medium">Testimonials</h3>
    </div>

    {/* Heading + Controls */}
    <div className="flex items-center justify-between mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold">
        Trusted by Industry Leaders
      </h2>

            {/* Quote background */}
      <div className="absolute -top-10 right-0 text-[180px] text-blue-100 leading-none select-none">
        “”
      </div>
      

      <div className="flex gap-3">
        <button
          onClick={() =>
            setTestimonialIndex(
              (i) => (i - 1 + testimonials.length) % testimonials.length
            )
          }
          className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() =>
            setTestimonialIndex((i) => (i + 1) % testimonials.length)
          }
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Testimonial Card */}
    <div className="relative flex items-start gap-16">


      {/* Logo */}
      <div className="min-w-[200px]">
        <div className="text-5xl font-bold text-blue-700">
          {testimonials[testimonialIndex].logo}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl">
        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
          {testimonials[testimonialIndex].text}
        </p>
        <div className="w-full h-[1px] bg-gray-300 mb-5"></div>

        <div>
          <p className="font-bold text-gray-900 text-lg uppercase">
            {testimonials[testimonialIndex].author}
          </p>
          <p className="text-gray-600">
            {testimonials[testimonialIndex].company}
          </p>
        </div>
      </div>
    </div>
  </SectionContainer>
</section>

{/* VISITOR PROFILE */}
<section className="bg-white">
  {/* Top Content */}
  <div className="py-20 lg:py-28">
    <SectionContainer>
      <h2 className="text-5xl lg:text-6xl font-bold mb-8">
        Visitor Profile
      </h2>

      <p className="text-gray-700 text-xl max-w-8xl mb-6 leading-relaxed">
        Discover the professionals shaping the future of logistics and transportation.
        TransRussia attracts a highly targeted audience of decision-makers, industry
        leaders, and innovators from across the globe.
      </p>

      <p className="text-gray-700 text-xl max-w-8xl mb-10 leading-relaxed">
        From senior executives in freight and supply chain management to specialists in
        e-commerce logistics and technology, our visitors come with clear objectives—to
        find solutions, forge partnerships, and drive businesses forward.
      </p>

      <button className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-medium">
        Know More Insights – Download Your Post-Show Report
      </button>
    </SectionContainer>
  </div>

  {/* Bottom Stats Strip */}
  <div className="bg-blue-50 py-20">
    <SectionContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        <div>
          <div className="text-6xl font-bold text-blue-700 mb-4">48%</div>
          <p className="text-lg text-gray-800 mb-6">
            Transportation and Logistics Companies
          </p>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div>
          <div className="text-6xl font-bold text-blue-700 mb-4">40%</div>
          <p className="text-lg text-gray-800 mb-6">
            Cargo Owners, Manufacturers, Wholesales, Retail
          </p>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div>
          <div className="text-6xl font-bold text-blue-700 mb-4">31%</div>
          <p className="text-lg text-gray-800 mb-6">
            Head of Departments
          </p>
          <div className="h-px bg-gray-300 w-full" />
        </div>

        <div>
          <div className="text-6xl font-bold text-blue-700 mb-4">12%</div>
          <p className="text-lg text-gray-800 mb-6">
            IT Solutions, Insurance, Foreign Trade Agencies
          </p>
          <div className="h-px bg-gray-300 w-full" />
        </div>

      </div>
    </SectionContainer>
  </div>
</section>
        {/* A SNAPSHOT OF EXHIBITORS */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">A Snapshot of Our Exhibitors</h2>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-100 p-4 rounded-lg h-16 flex items-center justify-center">
                  <div className="text-xs text-gray-500">Logo {i}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
              {[9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                <div key={i} className="bg-gray-100 p-4 rounded-lg h-16 flex items-center justify-center">
                  <div className="text-xs text-gray-500">Logo {i}</div>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-base font-medium">
              View Top 2024 Exhibitor List
            </button>
          </SectionContainer>
        </section>

        {/* JOURNEY CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
          <SectionContainer>
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Your Journey Starts Here: Essential Travel Info for TransRussia 2026
              </h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto">
                Whether you're travelling from across the globe or are just connected. Find all the essential information to
                ensure a smooth and hassle-free trip to TransRussia Moscow 2026.
              </p>
              <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-gray-100">
                Plan Your Travel
              </button>
            </div>
          </SectionContainer>
        </section>

        {/* QUICK NAVIGATION */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <h3 className="text-sm text-blue-600 font-semibold mb-2">Simplifying Your Participation Journey</h3>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">Quick Navigation</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="border border-gray-200 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-300">01</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3">Become an Exhibitor</h3>
                <p className="text-gray-600 text-base mb-6">
                  Join 600+ exhibitors in presenting your solutions for 3 days for unmatched networking opportunities.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
                  Become an Exhibitor
                </button>
              </div>

              {/* Card 2 */}
              <div className="border border-gray-200 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📘</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-300">02</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3">Download Event Brochure</h3>
                <p className="text-gray-600 text-base mb-6">
                  Find out what we and how our brochure has the key information to prepare up to date brochure.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
                  Download Now
                </button>
              </div>

              {/* Card 3 */}
              <div className="border border-gray-200 rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <span className="text-3xl font-bold text-gray-300">03</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3">Become a Visitor</h3>
                <p className="text-gray-600 text-base mb-6">
                  Why not visit the market? Why not visit the show and what to expect for the following edition.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
                  Visitor Registration
                </button>
              </div>
            </div>
          </SectionContainer>
        </section>






        {/* WHERE & WHEN - RESTORED SECTION */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">When and Where</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
              {/* Venue */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Venue</h3>
                <p className="text-gray-800 font-medium text-lg">Rosaski, Moscov, Crocus Expo IEC, Pavilion 3</p>
              </div>

              {/* Opening Hours */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Opening Hours</h3>
                <p className="text-gray-800 font-medium text-lg">12-16 March 2026, 10:00 -18:00</p>
                <p className="text-gray-800 font-medium text-lg">19 March 2026, 10:00 -18:00</p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-gray-200 rounded-lg h-64 lg:h-80 overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.8743484199996!2d37.51654!3d55.61139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53a9e6c8c1111%3A0x1234567890ab!2sCrocus%20Expo%2C%20Moscow!5e0!3m2!1sen!2sru"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </SectionContainer>
        </section>

        {/* PARTNERS & SPONSORS */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <PartnersSection />
          </SectionContainer>
        </section>
      </main>
    </>
  )
}