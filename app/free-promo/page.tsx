// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PartnersSection from '@/components/section/PartnersSection';
import DownloadSection from './DownloadSection';
import BackToTop from '../exhibitor-resource-center/component/BackToTop';

export default function ExhibitorPromotionPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [animatedBlocksVisible, setAnimatedBlocksVisible] = useState(false);

  useEffect(() => {
    // Hide loading overlay
    const intro = document.getElementById('intro');
    if (intro) {
      setTimeout(() => {
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        setTimeout(() => intro.remove(), 500);
      }, 1000);
    }

    // Show header animation
    setIsHeaderVisible(true);

    // Show animated blocks
    setTimeout(() => {
      setAnimatedBlocksVisible(true);
    }, 500);

    // Back to top functionality
    const handleScroll = () => {
      setBackToTopVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-spacing-wrapper font-parabolica">
      {/* Header Section - Updated with proper padding */}
      <div className="bg-[#F3F9FC] pt-48 pb-16">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px] mt-10">
          <h1 className="title-72 text-black mb-6">
            Exhibitor Promotion
          </h1>

          <p className="max-w-10xl text-lg leading-relaxed text-black/80">
            As an exhibitor at TransRussia 2026, maximise your impact by inviting your
            clients, partners, and prospects to visit your stand for free! We're
            providing you with an exclusive promo code to include in your branded
            materials, ensuring your audience can easily register and connect with you
            at the event.
          </p>
        </div>
      </div>

      {/* Section with text and image - Updated with proper padding */}
      <section className="py-20">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <div className='text-[#4D4D4D]'>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#4D4D4D] mb-6 leading-tight">
              Invite Your Clients to TransRussia 2026 with a Free Promo Code
            </h2>

            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              How It Works
            </h3>

            <ul className="list-disc pl-6 space-y-4 mb-6 text-lg lg:text-xl text-black/80">
              <li>
                Your <strong>unique promo code</strong> allows an unlimited number of
                visitors to register for a free electronic ticket.
              </li>
              <li>
                Share your promo code and direct them to register on the official
                exhibition website.
              </li>
            </ul>

            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              Maximise Your Reach
            </h3>

            <ul className="space-y-4 text-lg lg:text-xl text-black/80">
              <li>✔ Invitations – Send direct invitations</li>
              <li>✔ Email signatures – Daily visibility</li>
              <li>✔ News & Digest additions – Boost attendance</li>
            </ul>

            <a
              href="mailto:Alexandra.Kiryanova@ite.group"
              className="inline-block mt-10 rounded-full bg-[#004D9F] px-12 py-4 text-lg font-semibold text-white hover:bg-mainColor4 transition"
            >
              Request Promo Code
            </a>
          </div>

          {/* IMAGE */}
          <div>
            <img
              src="https://cdn.itegroupnews.com/TR_23_IMG_0029i_54b0b0806d.jpg"
              alt=""
              className="w-full h-[400px] lg:h-[520px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Download Materials Sections - Updated with proper padding */}
      <div
        className="animated-block"
        style={{
          opacity: animatedBlocksVisible ? 1 : 0,
          transform: `translateY(${animatedBlocksVisible ? '0' : '30px'})`,
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px]">
          {/* FORCE 2 ITEMS PER ROW */}
          <div className="grid grid-cols-2 gap-6 text-[#4D4D4D]">
            
            {/* CARD */}
            <div className="relative flex min-h-[520px] flex-col bg-sky-50 p-6 lg:p-10">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Invitation
              </h2>

              <p className="text-lg lg:text-xl leading-relaxed text-black/80 mb-6">
                Use your <strong>exclusive promo code</strong> to personally invite
                your clients, distributors, and business partners to visit your stand
                at <strong>TransRussia 2026</strong> for free. Add the promo code to
                your email invitations and formal letters to ensure they secure their
                <strong> free electronic ticket</strong>.
              </p>

              <a
                href="https://cdn.itegroupnews.com/Invitation_TRU_2026_99e491351b.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit rounded-full bg-[#004D9F] px-10 py-4 text-lg font-semibold text-white hover:bg-mainColor4 transition"
              >
                Download Your Invitation
              </a>
            </div>

            {/* CARD */}
            <div className="relative flex min-h-[520px] flex-col rounded-2xl bg-sky-50 p-6 lg:p-10">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Personalised Banners
              </h2>

              <p className="text-lg lg:text-xl leading-relaxed text-black/80 mb-6">
                Enhance your marketing materials by integrating your
                <strong> promo code</strong> into <strong>custom banners</strong> for
                digital campaigns, social media ads, and website promotions. These
                banners help visitors register easily using your
                <strong> free access code</strong>.
              </p>

              <a
                href="https://cdn-ite.prismetic.com/Trans_Russia_Personalized_Banners_2aafdd6055.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit rounded-full bg-[#004D9F] px-10 py-4 text-lg font-semibold text-white hover:bg-mainColor4 transition"
              >
                Download Your Personalised Banners
              </a>
            </div>

            {/* CARD */}
            <div className="relative flex min-h-[520px] flex-col rounded-2xl bg-sky-50 p-6 lg:p-10">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                Announcement Template
              </h2>

              <p className="text-lg lg:text-xl leading-relaxed text-black/80 mb-6">
                Announce your participation in the exhibition on your company website.
                Share your stand number, product information, and invite visitors to
                meet you at <strong>TransRussia 2026</strong>.
              </p>

              <a
                href="https://cdn.itegroupnews.com/Announcement_Temp_TRU_2026_2392c6a28a.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit rounded-full bg-[#004D9F] px-10 py-4 text-lg font-semibold text-white hover:bg-mainColor4 transition"
              >
                Download Announcement Template
              </a>
            </div>

            {/* CARD */}
            <div className="relative flex min-h-[520px] flex-col rounded-2xl bg-sky-50 p-6 lg:p-10">
              <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
                News Promotion
              </h2>

              <p className="text-lg lg:text-xl leading-relaxed text-black/80 mb-6">
                Promote your <strong>product launches</strong> through company
                newsletters, industry publications, and press releases to maximise
                visibility and encourage visitors to attend
                <strong> TransRussia 2026</strong>.
              </p>

              <a
                href="https://cdn-ite.prismetic.com/Trans_Russia_Sklad_Tech_2025_news_en_5830ff14f4.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit rounded-full bg-[#004D9F] px-10 py-4 text-lg font-semibold text-white hover:bg-mainColor4 transition"
              >
                Requirements to News Promotion
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Email Signature Section - Updated with proper padding */}
      <div
        className="animated-block"
        style={{
          opacity: animatedBlocksVisible ? 1 : 0,
          transform: `translateY(${animatedBlocksVisible ? '0' : '30px'})`,
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-6">
            <div className="relative flex min-h-[520px] flex-col rounded-2xl text-[#4D4D4D] p-6 lg:p-10">
              <div className="flex flex-col gap-6">

                {/* BIG HEADING */}
                <h2 className="text-3xl lg:text-4xl font-semibold">
                  INVITATION IN EMAIL SIGNATURE
                </h2>

                {/* BIG BODY TEXT */}
                <div className="space-y-6 text-lg lg:text-xl leading-relaxed text-black/80">
                  <p>
                    Download the exhibition logo and place it in your email signature
                    with a link to the ticket pickup page, attaching your personal link
                    to the ticket pickup page. Change the word <strong>PROMOCODE</strong>{" "}
                    in the link to your real promo code.
                  </p>

                  <img
                    src="https://storage.yandexcloud.net/assets.ite.group/sites/transrussia.ru/pages/ru/exhibit/free-promo/logo_transrussia.png"
                    alt="TransRussia logo"
                    className="max-w-[260px]"
                  />

                  <p className="font-semibold text-black">
                    TransRussia | Skladtech 2025
                  </p>

                  <p>
                    March 18–20, 2025, Moscow, Crocus Expo
                    <br />
                    <br />
                    We invite you to visit our stand No. ___
                    <br />
                    Get an electronic ticket &gt;&gt; (your personal link)
                    <br />
                    Promo code: ___
                  </p>
                </div>

                {/* BUTTON */}
                <a
                  href="https://cdn-ite.prismetic.com/Trans_Russia_Sklad_Tech_logos_2992e07778.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit rounded-full bg-[#004D9F] px-12 py-4 text-lg font-semibold text-white hover:bg-mainColor4 transition"
                >
                  Download Logo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners & Sponsors Section - Updated with proper padding */}
      <div className="animated-block" style={{ opacity: animatedBlocksVisible ? 1 : 0, transform: `translateY(${animatedBlocksVisible ? '0' : '30px'})`, transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px]" role="region" aria-roledescription="carousel">
          <div className="mb-10 flex flex-col items-center">
            {/* <h2 className="title-72 text-black mt-5">Partners &amp; Sponsors</h2> */}
          </div>
          <PartnersSection />
        </div>
      </div>

      {/* Back to Top Button */}
      <div
        className="fixed bottom-3 right-3 lg:bottom-10 lg:right-2 z-50 transition-all duration-300 pointer-events-none"
        style={{
          opacity: backToTopVisible ? 1 : 0,
          transform: backToTopVisible ? 'translateY(0)' : 'translateY(10px)',
          pointerEvents: backToTopVisible ? 'auto' : 'none',
        }}
      >
        <button
          aria-label="Back to top"
          onClick={handleBackToTop}
          className="m-0 rounded-full border-none bg-white p-0 outline-none drop-shadow-lg hover:scale-105 transition-transform"
        >
          <svg
            className="size-10 fill-mainColor1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
          </svg>
        </button>
      </div>
      <BackToTop/>
    </div>
  );
}