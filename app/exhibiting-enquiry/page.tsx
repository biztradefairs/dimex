"use client"
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const TransRussiaExhibitPage: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    interestLevel: '',
    firstName: '',
    lastName: '',
    companyName: '',
    companyWebsite: '',
    jobTitle: '',
    country: '',
    phone: '',
    email: '',
    standSize: '',
    hearAboutUs: '',
    productSector: [] as string[],
    notRobot: false
  });

  const countries = [
    'Russia', 'USA', 'China', 'Germany', 'France', 'UK', 'Japan', 'South Korea',
    'India', 'Brazil', 'Italy', 'Spain', 'Canada', 'Australia', 'Netherlands',
    'Switzerland', 'UAE', 'Singapore', 'Turkey', 'Poland', 'Other'
  ];

  const standSizes = [
    '9 sqm (3x3)',
    '12 sqm (3x4)',
    '15 sqm (3x5)',
    '18 sqm (3x6)',
    '20 sqm (4x5)',
    '24 sqm (4x6)',
    '30 sqm (5x6)',
    '36 sqm (6x6)',
    'Custom Size'
  ];

  const hearAboutOptions = [
    'Search Engine (Google, Yandex, etc.)',
    'Social Media',
    'Email Newsletter',
    'Industry Publication',
    'Colleague/Partner Recommendation',
    'Previous Exhibition',
    'Other'
  ];

  const productSectors = [
    'Air Freight',
    'Complex Logistics Services & Freight Forwarding',
    'Equipment Supplies',
    'Logistics, Distribution Centers & Terminals',
    'Outside & Heavy Lift Carriage (Break Bulk)',
    'Rail Freight',
    'Warehouse Equipment & Technology SkladTech',
    'Associated Services',
    'E-commerce Logistics',
    'IT Solutions',
    'Maritime & Inland Waterway Transport',
    'Ports & Terminals, Freight Handling Services in Ports',
    'Road Freight Transportation',
    'Industrial Unions & Media'
  ];

  useEffect(() => {
    // Simulate intro loader removal
    const timer = setTimeout(() => {
      if (introRef.current) {
        introRef.current.style.display = 'none';
      }
    }, 1000);

    // Back to top functionality
    const handleScroll = () => {
      if (backToTopRef.current) {
        if (window.scrollY > 300) {
          backToTopRef.current.style.opacity = '1';
          backToTopRef.current.style.transform = 'translateY(0)';
          backToTopRef.current.style.pointerEvents = 'auto';
        } else {
          backToTopRef.current.style.opacity = '0';
          backToTopRef.current.style.transform = 'translateY(10px)';
          backToTopRef.current.style.pointerEvents = 'none';
        }
      }
    };

    // Scroll to top functionality
    const handleBackToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleScroll);
    if (backToTopRef.current) {
      backToTopRef.current.addEventListener('click', handleBackToTop);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      if (backToTopRef.current) {
        backToTopRef.current.removeEventListener('click', handleBackToTop);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'notRobot') {
        setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
      } else {
        // For product sector checkboxes
        const sectorName = checkbox.name;
        if (checkbox.checked) {
          setFormData(prev => ({
            ...prev,
            productSector: [...prev.productSector, sectorName]
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            productSector: prev.productSector.filter(sector => sector !== sectorName)
          }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, interestLevel: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your enquiry! We will contact you soon.');
  };

  const partners = [
    { name: 'Apace Digital Cargo', logo: '/APACE_Digital_Cargo_523bc2c2a2.webp', slug: 'apace-digital-cargo' },
    { name: 'Cargo Insights', logo: '/Cargo_Insights_e965193be1.webp', slug: 'cargo-insights' },
    { name: 'International Coordinating Council for Trans-Eurasian Transportation', logo: '/International_Coordinating_for_Trans0_Eurasian_Transportation_965b26881c.webp', slug: 'international-coordinating-council-for-trans-eurasian-transportation' },
    { name: 'LOGIRUS', logo: '/LOGIRUS_34da1707d5.webp', slug: 'logirus' },
    { name: 'CargoTalk', logo: '/Cargo_Talk_ME_logo_final_ff5213a4fd.jpg', slug: 'cargo-talk' },
    { name: 'Logistics 360 Magazine', logo: '/Logisics_360_magazine_a74756752e.webp', slug: 'logistics-360-magazine' },
    { name: 'BizToday', logo: '/Logo_Biz_Today_International_JPG_dd5d3adcb2.jpg', slug: 'trans-russia-partner-1' },
    { name: 'Logistics.ru', logo: '/Logistics_ru_12a920fd01.webp', slug: 'logistics-ru' },
    { name: 'TravTalkME', logo: '/Trav_Talk_6aedd6c627.webp', slug: 'trav-talk-me' },
    { name: 'The Council of Supply Chain Professionals', logo: '/Council_of_Supply_Chain_Professinoals_03e79f3b06.webp', slug: 'the-council-of-supply-chain-professionals' },
    { name: 'Moneta Tanitim', logo: '/Moneta_Tanitim_184cdc84c1.png', slug: 'trans-russia-partner-Moneta-Tanitim' },
    { name: 'Utikad', logo: '/Utikad_2dea1b273c.webp', slug: 'utikad' },
    { name: 'VTB', logo: '/VTB_16f0fc5875.webp', slug: 'vtb' },
    { name: 'Urban Transport News', logo: '/Urban_Transport_News_Logo_2bf4a1812c.png', slug: 'trans-russia-partner-2' },
    { name: 'WIFFA', logo: '/wiffa_1_971b62e54d.jpg', slug: 'trans-russia-partner-WIFFA' },
    { name: 'UND', logo: '/UND_f47b714866.webp', slug: 'und' },
    { name: 'RZD-Partner', logo: '/RZD_Partner_0ac7d0f0a3.webp', slug: 'rzd-partner' },
    { name: 'RZD Business Asset', logo: '/RZD_Business_Asset_aca7ff2f81.webp', slug: 'rzd-business-asset' },
    { name: 'Asia MH', logo: '/Asis_MH_dabd0b8a7b.webp', slug: 'asia-mh' },
    { name: 'The Business Year', logo: '/The_Business_Year_e20d1c0f9f.png', slug: 'the-business-year' },
    { name: 'ICIB', logo: '/thumbnail_ICIB_Logo_24_834a8e19c7.jpg', slug: 'trans-russia-partner-3' },
    { name: 'ATI.SU', logo: '/ati_su_b4828c6c22.webp', slug: 'ati-su' },
    { name: 'ACU Logo', logo: '/air_cargo_update_619deee571.webp', slug: 'acu-logo' },
    { name: 'CCL Logistics', logo: '/CCL_Logistics_03f22ff0ec.webp', slug: 'ccl-logistics' },
    { name: 'Delo', logo: '/delo_8f41577290.webp', slug: 'delo' },
    { name: 'Industry Outlook', logo: '/Industry_Outlook_675c960053.webp', slug: 'industry-outlook' },
    { name: 'Rail Analysis', logo: '/Rail_Analysis_4f6be2dfa1.webp', slug: 'rail-analysis' },
    { name: 'Plant & Equipment', logo: '/Plan_and_Equipment_e86fc0b547.webp', slug: 'plant-and-equipment' },
    { name: 'Indian Transport & Logistics News (ITLN)', logo: '/logo_bedd7fc0a0.png', slug: 'indian-transport-and-logistics-news-itln' },
    { name: 'ECARGOLOG', logo: '/Trans_Russia_Media_Partners_Logo_3_786e33bc12.png', slug: 'ecargolog' },
    { name: 'Northern Lights Communications', logo: '/Trans_Russia_Media_Partners_Logo_5_32b91a53eb.png', slug: 'northern-lights-communications' },
    { name: 'Dubai Exporters', logo: '/Trans_Russia_Media_Partners_Logo_2_643306cd6f.png', slug: 'dubai-exporters' },
    { name: 'Transport Advancement', logo: '/Trans_Russia_Media_Partners_Logo_1_472363416a.png', slug: 'transport-advancement' },
    { name: 'OEM Update', logo: '/Trans_Russia_Media_Partners_Logo_4_4f9087bdc6.png', slug: 'oem-update' },
    { name: 'Logistics Insider', logo: '/Insider_logistics_6983a0e400.png', slug: 'trans-russia-partner-logisitics-insider' }
  ];

  return (
    <>
      <Head>
        <title>Logistics Trade Show Expo | Exhibit at TransRussia</title>
        <meta name="description" content="Interested in exhibiting at TransRussia 2025? Complete the form for more information on exhibiting opportunities at Russia's premier logistics trade show expo." />
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <meta property="og:title" content="Logistics Trade Show Expo | Exhibit at TransRussia" />
        <meta property="og:description" content="Interested in exhibiting at TransRussia 2025? Complete the form for more information on exhibiting opportunities at Russia's premier logistics trade show expo." />
        <link rel="canonical" href="/index.htm" />
      </Head>

      <div id="__next">
        <noscript>
          <div>
            <img
              alt=""
              loading="lazy"
              width="1"
              height="1"
              style={{ color: 'transparent' }}
              src="/watch/15004633"
            />
          </div>
        </noscript>

        <div className="relative min-h-screen font-parabolica antialiased __variable_646807 __variable_2c6616">
          {/* Intro Loader */}
          <div
            ref={introRef}
            id="intro"
            className="fixed inset-0 z-[100] grid place-content-center bg-mainColor1"
          >
            <div className="loader"></div>
          </div>

          {/* Back to Top Button */}
          <div className="fixed bottom-3 right-3 lg:bottom-10 lg:right-2 z-50 transition-all duration-300 opacity-0 translate-y-10 pointer-events-none">
            <button
              ref={backToTopRef}
              aria-label="Back to top"
              className="m-0 rounded-full border-none bg-white p-0 outline-none drop-shadow-lg"
            >
              <svg className="size-10 fill-mainColor1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div>
            <div className="page-spacing-wrapper">
              <div className="relative z-[1] flex flex-col justify-end bg-mainColor5 !pt-48">
                <div className="container flex flex-col justify-end !pt-0 !pb-10">
                  <h2 className="title-72 text-black">Enquiry to Exhibit</h2>
                  <p className="max-w-6xl whitespace-pre-line py-5">
                    If you'd like to exhibit at TransRussia 2026 or would like more information about exhibiting opportunities, please complete the form below and a member of our team will be in touch with you in the coming week.
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className="animated-block">
                <div className="animated-block-target">
                  <div className="relative overflow-hidden">
                    <div className="container py-20">
                      <div className="grid gap-10 lg:grid-cols-2">
                        {/* Left Column */}
                        <div className="flex flex-col">
                          <div>
                            <h3 className="text-3xl font-semibold my-5 title-mainColor2 lg:text-6xl">
                              Be Part of Eurasia's Leading Transport & Logistics Exhibition
                            </h3>
                          </div>
                          <div>
                            <div className="rte-style [&amp;_h1]:lg:text-4xl [&amp;_h2]:lg:text-3xl [&amp;_h3]:lg:text-2xl [&amp;_ul]:list-disc [&amp;_ul]:pl-5 [&amp;_ol]:list-decimal [&amp;_ol]:pl-5 [&amp;_a]:underline [&amp;_blockquote]:relative [&amp;_blockquote]:italic [&amp;_blockquote]:bg-[#f9f9f9] [&amp;_blockquote]:text-xl [&amp;_blockquote]:w-fit [&amp;_blockquote]:border-l-4 [&amp;_blockquote]:border-black [&amp;_blockquote]:p-5 [&amp;_blockquote]:ml-5 my-5">
                              <p>Showcase your freight, logistics, transport, and supply chain solutions to the companies driving Eurasia's <strong>$110B+</strong> logistics market.</p>
                              <p>&nbsp;</p>
                              <p>From freight forwarding and warehousing to digital platforms and smart supply chain technologies, TransRussia is the gateway to connect with buyers seeking partners to strengthen and expand their logistics networks.</p>
                              <p>&nbsp;</p>
                              <p>Position your business at the heart of Eurasia's transport corridors and unlock new growth opportunities.</p>
                              <p>&nbsp;</p>
                              <hr />
                            </div>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                              <div className="font-semibold">
                                <h4 className="text-mainColor1 mb-2 text-3xl lg:text-5xl">30,500</h4>
                                <p className="text-xl">Visitors</p>
                              </div>
                              <div className="font-semibold">
                                <h4 className="text-mainColor1 mb-2 text-3xl lg:text-5xl">600+</h4>
                                <p className="text-xl">Exhibitors</p>
                              </div>
                              <div className="font-semibold">
                                <h4 className="text-mainColor1 mb-2 text-3xl lg:text-5xl">160+</h4>
                                <p className="text-xl">Speakers</p>
                              </div>
                              <div className="font-semibold">
                                <h4 className="text-mainColor1 mb-2 text-3xl lg:text-5xl">50+</h4>
                                <p className="text-xl">Countries Represented</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="rte-style [&amp;_h1]:lg:text-4xl [&amp;_h2]:lg:text-3xl [&amp;_h3]:lg:text-2xl [&amp;_ul]:list-disc [&amp;_ul]:pl-5 [&amp;_ol]:list-decimal [&amp;_ol]:pl-5 [&amp;_a]:underline [&amp;_blockquote]:relative [&amp;_blockquote]:italic [&amp;_blockquote]:bg-[#f9f9f9] [&amp;_blockquote]:text-xl [&amp;_blockquote]:w-fit [&amp;_blockquote]:border-l-4 [&amp;_blockquote]:border-black [&amp;_blockquote]:p-5 [&amp;_blockquote]:ml-5 my-5">
                              <p>&nbsp;</p>
                              <hr />
                              <p>&nbsp;</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-3xl font-semibold my-5 title-mainColor2 lg:text-5xl">Who You'll Meet?</h3>
                            <div className="rte-style [&amp;_h1]:lg:text-4xl [&amp;_h2]:lg:text-3xl [&amp;_h3]:lg:text-2xl [&amp;_ul]:list-disc [&amp;_ul]:pl-5 [&amp;_ol]:list-decimal [&amp;_ol]:pl-5 [&amp;_a]:underline [&amp;_blockquote]:relative [&amp;_blockquote]:italic [&amp;_blockquote]:bg-[#f9f9f9] [&amp;_blockquote]:text-xl [&amp;_blockquote]:w-fit [&amp;_blockquote]:border-l-4 [&amp;_blockquote]:border-black [&amp;_blockquote]:p-5 [&amp;_blockquote]:ml-5 my-5">
                              <ul>
                                <li>Freight Forwarders &amp; Transport Operators<br />&nbsp;</li>
                                <li>Logistics Service Providers &amp; 3PLs<br />&nbsp;</li>
                                <li>Warehousing &amp; Distribution Companies<br />&nbsp;</li>
                                <li>Retailers, Manufacturers &amp; Importers<br />&nbsp;</li>
                                <li>Customs Brokers &amp; Trade Agents<br />&nbsp;</li>
                                <li>IT &amp; Digital Supply Chain Solution Providers<br />&nbsp;</li>
                                <li>Government &amp; Infrastructure Decision-Makers</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="flex flex-col">
                          <div className="container form-style !py-0">
                            <form onSubmit={handleSubmit} className="space-y-6">
                              {/* Your level of interest */}
                              <div>
                                <label className="block text-lg font-semibold mb-3 text-gray-900">
                                  Your level of interest *
                                </label>
                                <div className="space-y-2">
                                  {['Ready to book my stand', 'Looking for more information', 'Looking for sponsorship opportunities'].map((option) => (
                                    <div key={option} className="flex items-center">
                                      <input
                                        type="radio"
                                        id={option.replace(/\s+/g, '-').toLowerCase()}
                                        name="interestLevel"
                                        value={option}
                                        checked={formData.interestLevel === option}
                                        onChange={handleRadioChange}
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                        required
                                      />
                                      <label htmlFor={option.replace(/\s+/g, '-').toLowerCase()} className="ml-3 block text-gray-700">
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* First Name */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  First Name *
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                  placeholder="Type your first name"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  required
                                />
                              </div>

                              {/* Last Name */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Last Name *
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  placeholder="Type your last name"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  required
                                />
                              </div>

                              {/* Company Name */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Company Name *
                                </label>
                                <input
                                  type="text"
                                  name="companyName"
                                  value={formData.companyName}
                                  onChange={handleInputChange}
                                  placeholder="Type your Company Name"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  required
                                />
                              </div>

                              {/* Company Website */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Company Website *
                                </label>
                                <input
                                  type="url"
                                  name="companyWebsite"
                                  value={formData.companyWebsite}
                                  onChange={handleInputChange}
                                  placeholder="Company Website"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  required
                                />
                              </div>

                              {/* Job Title */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Job Title *
                                </label>
                                <input
                                  type="text"
                                  name="jobTitle"
                                  value={formData.jobTitle}
                                  onChange={handleInputChange}
                                  placeholder="Type your Job Title"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  required
                                />
                              </div>

                              {/* Country */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Country *
                                </label>
                                <select
                                  name="country"
                                  value={formData.country}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                  required
                                >
                                  <option value="">Select Country</option>
                                  {countries.map(country => (
                                    <option key={country} value={country}>{country}</option>
                                  ))}
                                </select>
                              </div>

                              {/* Phone */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Phone *
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  placeholder="Type your phone number"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  required
                                />
                              </div>

                              {/* Work Email */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Work Email *
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  placeholder="Type your email"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                  required
                                />
                              </div>

                              {/* Preferred Stand Size */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Preferred Stand Size *
                                </label>
                                <select
                                  name="standSize"
                                  value={formData.standSize}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                  required
                                >
                                  <option value="">Select Stand Size</option>
                                  {standSizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                  ))}
                                </select>
                              </div>

                              {/* How Did You Hear About Us? */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  How Did You Hear About Us? *
                                </label>
                                <select
                                  name="hearAboutUs"
                                  value={formData.hearAboutUs}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                  required
                                >
                                  <option value="">Select Option</option>
                                  {hearAboutOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              </div>

                              {/* Product Sector */}
                              <div>
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Product Sector *
                                </label>
                                <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-4 space-y-2">
                                  {productSectors.map((sector, index) => (
                                    <div key={index} className="flex items-center">
                                      <input
                                        type="checkbox"
                                        id={`sector-${index}`}
                                        name={sector}
                                        checked={formData.productSector.includes(sector)}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                      />
                                      <label htmlFor={`sector-${index}`} className="ml-3 block text-gray-700">
                                        {sector}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Verification */}
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="block text-lg font-semibold mb-2 text-gray-900">
                                  Please verify your request.
                                </label>
                                <div className="flex items-center mb-3">
                                  <input
                                    type="checkbox"
                                    id="notRobot"
                                    name="notRobot"
                                    checked={formData.notRobot}
                                    onChange={handleInputChange}
                                    className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                                    required
                                  />
                                  <label htmlFor="notRobot" className="ml-3 block text-gray-700">
                                    I'm not a robot
                                  </label>
                                </div>
                                <p className="text-sm text-gray-600">
                                  By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
                                </p>
                              </div>

                              {/* Submit Button */}
                              <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                              >
                                Submit Enquiry
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partners & Sponsors Section */}
              <div className="animated-block">
                <div className="animated-block-target">
                  <div>
                    <div className="relative container" role="region" aria-roledescription="carousel">
                      <div className="mb-10 flex flex-col items-center">
                        <h2 className="title-72 text-black mt-5">Partners & Sponsors</h2>
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex -ml-4 items-stretch">
                          {partners.map((partner, index) => (
                            <div
                              key={index}
                              role="group"
                              aria-roledescription="slide"
                              className="min-w-0 shrink-0 grow-0 basis-full pl-4 h-auto md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                            >
                              <Link
                                href={`/partner/${partner.slug}`}
                                className="flex w-full flex-col items-center gap-5 text-center"
                              >
                                <div className="h-40 w-full overflow-hidden rounded-lg px-10 py-5 shadow-lg">
                                  <Image
                                    alt="TransRussia©24"
                                    width={500}
                                    height={500}
                                    className="size-full object-contain"
                                    style={{ color: 'transparent' }}
                                    src={partner.logo}
                                  />
                                </div>
                                <small className="text-sm">{partner.name}</small>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransRussiaExhibitPage;