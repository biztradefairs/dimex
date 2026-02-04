// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import PartnersSection from '@/components/section/PartnersSection';
import DownloadSection from './DownloadSection';

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
      {/* Header Section */}
<div className="bg-[#F3F9FC] pt-48 pb-16">
  <div className="container">
    <h1 className="title-72 text-black mb-6">
      Exhibitor Promotion
    </h1>

    <p className="max-w-6xl text-lg leading-relaxed text-black/80">
      As an exhibitor at TransRussia 2026, maximise your impact by inviting your
      clients, partners, and prospects to visit your stand for free! We’re
      providing you with an exclusive promo code to include in your branded
      materials, ensuring your audience can easily register and connect with you
      at the event.
    </p>
  </div>
</div>


<section className="py-20">
  <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    {/* TEXT */}
    <div>
      <h2 className="title-48 mb-6">
        Invite Your Clients to TransRussia 2026 with a Free Promo Code
      </h2>

      <h3 className="text-xl font-semibold mb-3">How It Works</h3>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-black/80">
        <li>
          Your <strong>unique promo code</strong> allows an unlimited number of
          visitors to register for a free electronic ticket.
        </li>
        <li>
          Share your promo code and direct them to register on the official
          exhibition website.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">Maximise Your Reach</h3>

      <ul className="space-y-3 text-black/80">
        <li className="flex gap-2">✔ Invitations – Send direct invitations</li>
        <li className="flex gap-2">✔ Email signatures – Daily visibility</li>
        <li className="flex gap-2">
          ✔ News & Digest additions – Boost attendance
        </li>
      </ul>

      <a
        href="mailto:Alexandra.Kiryanova@ite.group"
        className="inline-block mt-8 rounded-full bg-mainColor2 px-10 py-3 text-white font-semibold hover:bg-mainColor4 transition"
      >
        Request Promo Code
      </a>
    </div>

    {/* IMAGE */}
    <div>
      <img
        src="https://cdn.itegroupnews.com/TR_23_IMG_0029i_54b0b0806d.jpg"
        alt=""
        className="w-full rounded-xl object-cover"
      />
    </div>
  </div>
</section>


      {/* Download Materials Sections */}
      <div className="animated-block" style={{ opacity: animatedBlocksVisible ? 1 : 0, transform: `translateY(${animatedBlocksVisible ? '0' : '30px'})`, transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
        <div className="container">
          <div className="grid size-full grid-cols-1 gap-5 md:grid-cols-2">
            {/* Invitation */}
            <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 bg-mainColor5">
              <div className="flex flex-col z-[1] gap-5">
                <h2 className="title-40 font-semibold">Invitation</h2>
                <div className="rte-style">
                  <p>
                    Use your <strong>exclusive promo code</strong> to personally invite your clients, distributors, and business partners to visit your stand at <strong>TransRussia 2026</strong> for free. Add the promo code to your email invitations and formal letters to ensure they secure their <strong>free electronic ticket</strong> and meet you at the exhibition.
                  </p>
                </div>
                <div className="flex w-full flex-wrap gap-5">
                  <a
                    href="https://cdn.itegroupnews.com/Invitation_TRU_2026_99e491351b.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4"
                  >
                    Download Your Invitation
                  </a>
                </div>
              </div>
            </div>

            {/* Personalized Banners */}
            <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 bg-mainColor5">
              <div className="flex flex-col z-[1] gap-5">
                <h2 className="title-40 font-semibold">Personalised Banners</h2>
                <div className="rte-style">
                  <p>
                    Enhance your marketing materials by integrating your <strong>promo code</strong> into <strong>custom banners</strong> for digital campaigns, social media ads, and website promotions. These banners can drive more traffic to your stand by making it easy for potential visitors to register with your <strong>free access code</strong>.
                  </p>
                </div>
                <div className="flex w-full flex-wrap gap-5">
                  <a
                    href="https://cdn-ite.prismetic.com/Trans_Russia_Personalized_Banners_2aafdd6055.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4"
                  >
                    Download Your Personalised Banners
                  </a>
                </div>
              </div>
            </div>

            {/* Announcement Template */}
            <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 bg-mainColor5">
              <div className="flex flex-col z-[1] gap-5">
                <h2 className="title-40 font-semibold">Announcement Template</h2>
                <div className="rte-style">
                  <p>
                    Announce your participation in the exhibition on your company's website. Provide your stand number, information about your products, and place an announcement on your company's website.
                  </p>
                </div>
                <div className="flex w-full flex-wrap gap-5">
                  <a
                    href="https://cdn.itegroupnews.com/Announcement_Temp_TRU_2026_2392c6a28a.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4"
                  >
                    Download Announcement Template
                  </a>
                </div>
              </div>
            </div>

            {/* News Promotion */}
            <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 bg-mainColor5">
              <div className="flex flex-col z-[1] gap-5">
                <h2 className="title-40 font-semibold">News Promotion</h2>
                <div className="rte-style">
                  <p>
                    Include your <strong>company product launches</strong> in <strong>company newsletters, industry publications, and press releases</strong> to spread the word about your participation at <strong>TransRussia 2026</strong>. This ensures <strong>maximum visibility</strong> among potential clients, reinforcing your presence at the exhibition and encouraging attendance.
                  </p>
                </div>
                <div className="flex w-full flex-wrap gap-5">
                  <a
                    href="https://cdn-ite.prismetic.com/Trans_Russia_Sklad_Tech_2025_news_en_5830ff14f4.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4"
                  >
                    Requirements to News Promotion
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Signature Section */}
      <div className="animated-block" style={{ opacity: animatedBlocksVisible ? 1 : 0, transform: `translateY(${animatedBlocksVisible ? '0' : '30px'})`, transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
        <div className="container">
          <div className="grid size-full grid-cols-1 gap-5">
            <div className="z-[1] relative flex size-full min-h-[500px] flex-col p-5 lg:p-10">
              <div className="flex flex-col z-[1] gap-5">
                <h2 className="title-40 font-semibold title-40">INVITATION IN EMAIL SIGNATURE</h2>
                <div className="rte-style">
                  <p style={{ marginLeft: '0px' }}>
                    Download the exhibition logo and place it in your email signature with a link to the ticket pickup page, attaching your personal link to the ticket pickup page. Change the word PROMOCODE in the link to your real promo code.
                    <br />&nbsp;
                  </p>
                  <p style={{ marginLeft: '0px' }}>
                    <img
                      src="https://storage.yandexcloud.net/assets.ite.group/sites/transrussia.ru/pages/ru/exhibit/free-promo/logo_transrussia.png"
                      alt="TransRussia logo"
                      className="max-w-full h-auto"
                    />
                    <br />&nbsp;
                  </p>
                  <p style={{ marginLeft: '0px' }}>
                    <strong>TransRussia | Skladtech 2025</strong>
                    <br />&nbsp;
                  </p>
                  <p style={{ marginLeft: '0px' }}>
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
                <div className="flex w-full flex-wrap gap-5">
                  <a
                    href="https://cdn-ite.prismetic.com/Trans_Russia_Sklad_Tech_logos_2992e07778.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4"
                  >
                    Download Logo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners & Sponsors Section */}
      <div className="animated-block" style={{ opacity: animatedBlocksVisible ? 1 : 0, transform: `translateY(${animatedBlocksVisible ? '0' : '30px'})`, transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
        <div className="container" role="region" aria-roledescription="carousel">
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
    </div>
  );
}