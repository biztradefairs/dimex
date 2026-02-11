'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import PartnersSection from '@/components/section/PartnersSection';
import SectionContainer from '@/components/UI/SectionContainer';

const mediaItems = [
  {
    id: 1,
    title: "TransRussia 2025 Conference Program",
    href: "/media-gallery/transrussia-2025-conference-program/",
    image: "https://cdn.itegroupnews.com/DSC_6960_retouched_d7ae158197.webp"
  },
  {
    id: 2,
    title: "TransRussia 2025. Exhibition",
    href: "/media-gallery/trans-russia-2025-exhibition/",
    image: "https://cdn.itegroupnews.com/TR_2025_337_e76336212a.webp"
  },
  {
    id: 3,
    title: "TransRussia 2024 Exhibition",
    href: "/media-gallery/trans-russia-2024-exhibition/",
    image: "https://cdn.itegroupnews.com/TR_24_IMG_2499i_dc444c9640.webp"
  },
  {
    id: 4,
    title: "TransRussia Summit 4-5 December 2024",
    href: "/media-gallery/trans-russia-summit-4-5-december-2024/",
    image: "https://cdn.itegroupnews.com/19_32d833764b.webp"
  },
  {
    id: 5,
    title: "TransRussia 2024 Conference Programme",
    href: "/media-gallery/trans-russia-2024-conference-programme/",
    image: "https://cdn.itegroupnews.com/tr24_15_194638d1ef.webp"
  },
  {
    id: 6,
    title: "TransRussia 2024 Awards Ceremony",
    href: "/media-gallery/trans-russia-2024-awards-ceremony/",
    image: "https://cdn.itegroupnews.com/TR_24_IMG_3023i_cbdb39d5ea.webp"
  },
  {
    id: 7,
    title: "TransRussia 2023 Exhibition",
    href: "/media-gallery/trans-russia-2023-exhibition/",
    image: "https://cdn.itegroupnews.com/TR_23_MUH_2553i_bcf08a1176.webp"
  },
  {
    id: 8,
    title: "TransRussia 2023 Conference Programme",
    href: "/media-gallery/trans-russia-2023-conference-programme/",
    image: "https://cdn.itegroupnews.com/TR_23_IMG_3094i_f602090d20.webp"
  },
  {
    id: 9,
    title: "TransRussia 2022 Exhibition",
    href: "/media-gallery/trans-russia-2022-exhibition/",
    image: "https://cdn.itegroupnews.com/tr2022_022_f714843e07.webp"
  },
  {
    id: 10,
    title: "TransRussia 2022 Conference Programme",
    href: "/media-gallery/trans-russia-2022-conference-programme/",
    image: "https://cdn.itegroupnews.com/transrussia22_bp_33_73e55dcf6a.webp"
  },
  {
    id: 11,
    title: "TransRussia 2022 Awards Ceremony",
    href: "/media-gallery/trans-russia-2022-awards-ceremony/",
    image: "https://cdn.itegroupnews.com/1_196c1de625.webp"
  },
  {
    id: 12,
    title: "TransRussia 2021 Exhibition",
    href: "/media-gallery/trans-russia-2021-exhibition/",
    image: "https://cdn.itegroupnews.com/108_d40b77d3a3.webp"
  },
  {
    id: 13,
    title: "TransRussia 2021 Conference Programme",
    href: "/media-gallery/trans-russia-2021-conference-programme/",
    image: "https://cdn.itegroupnews.com/bp049_790eb559dc.webp"
  },
  {
    id: 14,
    title: "TransRussia 2019",
    href: "/media-gallery/trans-russia-2019/",
    image: "https://cdn.itegroupnews.com/2019_36_d7d12ee1e5.webp"
  },
  {
    id: 15,
    title: "TransRussia 2018",
    href: "/media-gallery/trans-russia-2018/",
    image: "https://cdn.itegroupnews.com/photo_49_011f89357e.webp"
  }
];

const partners = [
  { name: "Apace Digital Cargo", logo: "https://cdn.itegroupnews.com/APACE_Digital_Cargo_523bc2c2a2.webp", href: "/partner/apace-digital-cargo/" },
  { name: "Cargo Insights", logo: "https://cdn.itegroupnews.com/Cargo_Insights_e965193be1.webp", href: "/partner/cargo-insights/" },
  { name: "International Coordinating Council for Trans-Eurasian Transportation", logo: "https://cdn.itegroupnews.com/International_Coordinating_for_Trans0_Eurasian_Transportation_965b26881c.webp", href: "/partner/international-coordinating-council-for-trans-eurasian-transportation/" },
  { name: "LOGIRUS", logo: "https://cdn.itegroupnews.com/LOGIRUS_34da1707d5.webp", href: "/partner/logirus/" },
  { name: "CargoTalk", logo: "https://cdn.itegroupnews.com/Cargo_Talk_ME_logo_final_ff5213a4fd.jpg", href: "/partner/cargo-talk/" },
  { name: "Logistics 360 Magazine", logo: "https://cdn.itegroupnews.com/Logisics_360_magazine_a74756752e.webp", href: "/partner/logistics-360-magazine/" },
  { name: "BizToday", logo: "https://cdn.itegroupnews.com/Logo_Biz_Today_International_JPG_dd5d3adcb2.jpg", href: "/partner/trans-russia-partner-1/" },
  { name: "Logistics.ru", logo: "https://cdn.itegroupnews.com/Logistics_ru_12a920fd01.webp", href: "/partner/logistics-ru/" },
  { name: "TravTalkME", logo: "https://cdn.itegroupnews.com/Trav_Talk_6aedd6c627.webp", href: "/partner/trav-talk-me/" },
  { name: "The Council of Supply Chain Professionals", logo: "https://cdn.itegroupnews.com/Council_of_Supply_Chain_Professinoals_03e79f3b06.webp", href: "/partner/the-council-of-supply-chain-professionals/" },
  { name: "Moneta Tanitim", logo: "https://cdn.itegroupnews.com/Moneta_Tanitim_184cdc84c1.png", href: "/partner/trans-russia-partner-Moneta-Tanitim/" },
  { name: "Utikad", logo: "https://cdn.itegroupnews.com/Utikad_2dea1b273c.webp", href: "/partner/utikad/" },
  { name: "VTB", logo: "https://cdn.itegroupnews.com/VTB_16f0fc5875.webp", href: "/partner/vtb/" },
  { name: "Urban Transport News", logo: "https://cdn.itegroupnews.com/Urban_Transport_News_Logo_2bf4a1812c.png", href: "/partner/trans-russia-partner-2/" },
  { name: "WIFFA", logo: "https://cdn.itegroupnews.com/wiffa_1_971b62e54d.jpg", href: "/partner/trans-russia-partner-WIFFA/" },
  { name: "UND", logo: "https://cdn.itegroupnews.com/UND_f47b714866.webp", href: "/partner/und/" },
  { name: "RZD-Partner", logo: "https://cdn.itegroupnews.com/RZD_Partner_0ac7d0f0a3.webp", href: "/partner/rzd-partner/" },
  { name: "RZD Business Asset", logo: "https://cdn.itegroupnews.com/RZD_Business_Asset_aca7ff2f81.webp", href: "/partner/rzd-business-asset/" },
  { name: "Asia MH", logo: "https://cdn.itegroupnews.com/Asis_MH_dabd0b8a7b.webp", href: "/partner/asia-mh/" },
  { name: "The Business Year", logo: "https://cdn.itegroupnews.com/The_Business_Year_e20d1c0f9f.png", href: "/partner/the-business-year/" },
  { name: "ICIB", logo: "https://cdn.itegroupnews.com/thumbnail_ICIB_Logo_24_834a8e19c7.jpg", href: "/partner/trans-russia-partner-3/" },
  { name: "ATI.SU", logo: "https://cdn.itegroupnews.com/ati_su_b4828c6c22.webp", href: "/partner/ati-su/" },
  { name: "ACU Logo", logo: "https://cdn.itegroupnews.com/air_cargo_update_619deee571.webp", href: "/partner/acu-logo/" },
  { name: "CCL Logistics", logo: "https://cdn.itegroupnews.com/CCL_Logistics_03f22ff0ec.webp", href: "/partner/ccl-logistics/" },
  { name: "Delo", logo: "https://cdn.itegroupnews.com/delo_8f41577290.webp", href: "/partner/delo/" },
  { name: "Industry Outlook", logo: "https://cdn.itegroupnews.com/Industry_Outlook_675c960053.webp", href: "/partner/industry-outlook/" },
  { name: "Rail Analysis", logo: "https://cdn.itegroupnews.com/Rail_Analysis_4f6be2dfa1.webp", href: "/partner/rail-analysis/" },
  { name: "Plant & Equipment", logo: "https://cdn.itegroupnews.com/Plan_and_Equipment_e86fc0b547.webp", href: "/partner/plant-and-equipment/" },
  { name: "Indian Transport & Logistics News (ITLN)", logo: "https://cdn.itegroupnews.com/logo_bedd7fc0a0.png", href: "/partner/indian-transport-and-logistics-news-itln/" },
  { name: "ECARGOLOG", logo: "https://cdn.itegroupnews.com/Trans_Russia_Media_Partners_Logo_3_786e33bc12.png", href: "/partner/ecargolog/" },
  { name: "Northern Lights Communications", logo: "https://cdn.itegroupnews.com/Trans_Russia_Media_Partners_Logo_5_32b91a53eb.png", href: "/partner/northern-lights-communications/" },
  { name: "Dubai Exporters", logo: "https://cdn.itegroupnews.com/Trans_Russia_Media_Partners_Logo_2_643306cd6f.png", href: "/partner/dubai-exporters/" },
  { name: "Transport Advancement", logo: "https://cdn.itegroupnews.com/Trans_Russia_Media_Partners_Logo_1_472363416a.png", href: "/partner/transport-advancement/" },
  { name: "OEM Update", logo: "https://cdn.itegroupnews.com/Trans_Russia_Media_Partners_Logo_4_4f9087bdc6.png", href: "/partner/oem-update/" },
  { name: "Logistics Insider", logo: "https://cdn.itegroupnews.com/Insider_logistics_6983a0e400.png", href: "/partner/trans-russia-partner-logisitics-insider/" }
];

export default function MediaGalleryPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="font-parabolica antialiased">
      {/* Back to Top Button */}
      <div className={`fixed bottom-3 right-3 lg:bottom-10 lg:right-2 z-50 transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <button
          aria-label="Back to top"
          onClick={scrollToTop}
          className="m-0 rounded-full border-none bg-[#b0cbdf] p-0 outline-none drop-shadow-lg"

        >
          <svg className="size-10 fill-mainColor1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
          </svg>
        </button>
      </div>

      {/* Page Content - Aligned with navbar */}
      <div className=""> {/* Add padding-top to account for fixed navbar */}
        
        {/* Hero Section - Aligned with navbar container */}
        <div className="bg-[#F0F9FF] py-20">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 mt-15">
            <div className="flex flex-col justify-end">
              <h2 className="title-72 text-black">Explore TransRussia Over the Years</h2>
              <p className="max-w-6xl whitespace-pre-line py-5">
                Discover TransRussia through our curated gallery, featuring moments from the opening ceremony, awards, exhibition showcases, and dynamic conference sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Media Gallery Section - Aligned with navbar container */}
        <div className="py-12">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            {/* Media Grid - Three items per row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0E1C35] shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="title-18 mb-3 line-clamp-2 font-bold text-white group-hover:text-mainColor1">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section - Also aligned with navbar container */}
        {/* <PartnersSection /> */}
      </div>
    </section>
  );
}