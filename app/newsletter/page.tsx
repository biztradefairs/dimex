"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import PartnersSection from '@/components/section/PartnersSection';

interface FormData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  consent: boolean;
}

interface Partner {
  id: string;
  name: string;
  logo: string;
  link: string;
}

const NewsletterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const partners: Partner[] = [
    { id: '1', name: 'Apace Digital Cargo', logo: '../APACE_Digital_Cargo_523bc2c2a2.webp', link: '../partner/apace-digital-cargo/index.htm' },
    { id: '2', name: 'Cargo Insights', logo: '../Cargo_Insights_e965193be1.webp', link: '../partner/cargo-insights/index.htm' },
    { id: '3', name: 'International Coordinating Council for Trans-Eurasian Transportation', logo: '../International_Coordinating_for_Trans0_Eurasian_Transportation_965b26881c.webp', link: '../partner/international-coordinating-council-for-trans-eurasian-transportation/index.htm' },
    { id: '4', name: 'LOGIRUS', logo: '../LOGIRUS_34da1707d5.webp', link: '../partner/logirus/index.htm' },
    { id: '5', name: 'CargoTalk', logo: '../Cargo_Talk_ME_logo_final_ff5213a4fd.jpg', link: '../partner/cargo-talk/index.htm' },
    { id: '6', name: 'Logistics 360 Magazine', logo: '../Logisics_360_magazine_a74756752e.webp', link: '../partner/logistics-360-magazine/index.htm' },
    { id: '7', name: 'BizToday', logo: '../Logo_Biz_Today_International_JPG_dd5d3adcb2.jpg', link: '../partner/trans-russia-partner-1/index.htm' },
    { id: '8', name: 'Logistics.ru', logo: '../Logistics_ru_12a920fd01.webp', link: '../partner/logistics-ru/index.htm' },
    { id: '9', name: 'TravTalkME', logo: '../Trav_Talk_6aedd6c627.webp', link: '../partner/trav-talk-me/index.htm' },
    { id: '10', name: 'The Council of Supply Chain Professionals', logo: '../Council_of_Supply_Chain_Professinoals_03e79f3b06.webp', link: '../partner/the-council-of-supply-chain-professionals/index.htm' },
    { id: '11', name: 'Moneta Tanitim', logo: '../Moneta_Tanitim_184cdc84c1.png', link: '../partner/trans-russia-partner-Moneta-Tanitim/index.htm' },
    { id: '12', name: 'Utikad', logo: '../Utikad_2dea1b273c.webp', link: '../partner/utikad/index.htm' },
    { id: '13', name: 'VTB', logo: '../VTB_16f0fc5875.webp', link: '../partner/vtb/index.htm' },
    { id: '14', name: 'Urban Transport News', logo: '../Urban_Transport_News_Logo_2bf4a1812c.png', link: '../partner/trans-russia-partner-2/index.htm' },
    { id: '15', name: 'WIFFA', logo: '../wiffa_1_971b62e54d.jpg', link: '../partner/trans-russia-partner-WIFFA/index.htm' },
    { id: '16', name: 'UND', logo: '../UND_f47b714866.webp', link: '../partner/und/index.htm' },
    { id: '17', name: 'RZD-Partner', logo: '../RZD_Partner_0ac7d0f0a3.webp', link: '../partner/rzd-partner/index.htm' },
    { id: '18', name: 'RZD Business Asset', logo: '../RZD_Business_Asset_aca7ff2f81.webp', link: '../partner/rzd-business-asset/index.htm' },
    { id: '19', name: 'Asia MH', logo: '../Asis_MH_dabd0b8a7b.webp', link: '../partner/asia-mh/index.htm' },
    { id: '20', name: 'The Business Year', logo: '../The_Business_Year_e20d1c0f9f.png', link: '../partner/the-business-year/index.htm' },
    { id: '21', name: 'ICIB', logo: '../thumbnail_ICIB_Logo_24_834a8e19c7.jpg', link: '../partner/trans-russia-partner-3/index.htm' },
    { id: '22', name: 'ATI.SU', logo: '../ati_su_b4828c6c22.webp', link: '../partner/ati-su/index.htm' },
    { id: '23', name: 'ACU Logo', logo: '../air_cargo_update_619deee571.webp', link: '../partner/acu-logo/index.htm' },
    { id: '24', name: 'CCL Logistics', logo: '../CCL_Logistics_03f22ff0ec.webp', link: '../partner/ccl-logistics/index.htm' },
    { id: '25', name: 'Delo', logo: '../delo_8f41577290.webp', link: '../partner/delo/index.htm' },
    { id: '26', name: 'Industry Outlook', logo: '../Industry_Outlook_675c960053.webp', link: '../partner/industry-outlook/index.htm' },
    { id: '27', name: 'Rail Analysis', logo: '../Rail_Analysis_4f6be2dfa1.webp', link: '../partner/rail-analysis/index.htm' },
    { id: '28', name: 'Plant & Equipment', logo: '../Plan_and_Equipment_e86fc0b547.webp', link: '../partner/plant-and-equipment/index.htm' },
    { id: '29', name: 'Indian Transport & Logistics News (ITLN)', logo: '../logo_bedd7fc0a0.png', link: '../partner/indian-transport-and-logistics-news-itln/index.htm' },
    { id: '30', name: 'ECARGOLOG', logo: '../Trans_Russia_Media_Partners_Logo_3_786e33bc12.png', link: '../partner/ecargolog/index.htm' },
    { id: '31', name: 'Northern Lights Communications', logo: '../Trans_Russia_Media_Partners_Logo_5_32b91a53eb.png', link: '../partner/northern-lights-communications/index.htm' },
    { id: '32', name: 'Dubai Exporters', logo: '../Trans_Russia_Media_Partners_Logo_2_643306cd6f.png', link: '../partner/dubai-exporters/index.htm' },
    { id: '33', name: 'Transport Advancement', logo: '../Trans_Russia_Media_Partners_Logo_1_472363416a.png', link: '../partner/transport-advancement/index.htm' },
    { id: '34', name: 'OEM Update', logo: '../Trans_Russia_Media_Partners_Logo_4_4f9087bdc6.png', link: '../partner/oem-update/index.htm' },
    { id: '35', name: 'Logistics Insider', logo: '../Insider_logistics_6983a0e400.png', link: '../partner/trans-russia-partner-logisitics-insider/index.htm' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would normally send the data to your backend
      // const response = await fetch('/api/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // For now, simulate successful submission
      console.log('Form submitted:', formData);
      setSubmitMessage('Thank you for subscribing to our newsletter!');
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Subscribe to TransRussia Expo Newsletter | Stay Updated</title>
        <meta name="description" content="Stay informed with the latest news, event updates, and insights by subscribing to the TransRussia Expo newsletter. Never miss an important update!" />
        <meta property="og:title" content="Subscribe to TransRussia Expo Newsletter | Stay Updated" />
        <meta property="og:description" content="Stay informed with the latest news, event updates, and insights by subscribing to the TransRussia Expo newsletter. Never miss an important update!" />
        <link rel="canonical" href="https://trstexpo.com/newsletter/" />
      </Head>

      <div className="relative min-h-screen font-parabolica antialiased">
        {/* Main Content */}
        <div className="page-spacing-wrapper">
          {/* Hero Section */}
          <div className="relative z-[1] flex flex-col justify-end bg-mainColor5 !pt-48">
            <div className="container flex flex-col justify-end !pt-0 !pb-10">
              <h1 className="title-72 text-black">Sign Up to Our Newsletter</h1>
              <p className="max-w-6xl whitespace-pre-line py-5">
                For any questions or additional support, we are here to help.
              </p>
            </div>
          </div>

          {/* Newsletter Form Section */}
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="container form-style !py-0">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-12">
                  {submitMessage ? (
                    <div className="text-center py-12">
                      <div className="text-green-600 text-4xl mb-4">✓</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Subscription Successful!
                      </h3>
                      <p className="text-gray-600">{submitMessage}</p>
                      <button
                        onClick={() => setSubmitMessage('')}
                        className="mt-6 bg-mainColor2 hover:bg-mainColor4 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
                      >
                        Subscribe Another Email
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor2 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor2 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor2 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your company name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mainColor2 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          required
                          className="mt-1 h-5 w-5 text-mainColor2 focus:ring-mainColor2"
                        />
                        <label htmlFor="consent" className="text-sm text-gray-600">
                          By subscribing to the TransRussia newsletter, you agree to receive marketing communications, 
                          updates, and promotional materials from us. You can unsubscribe anytime by clicking the 
                          &quot;unsubscribe&quot; link in our emails. For more information on how we handle your data, 
                          please refer to our{' '}
                          <a 
                            href="https://ite.group/en/privacy/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-mainColor2 hover:underline"
                          >
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.consent}
                        className={`w-full flex justify-center items-center gap-2 overflow-hidden rounded-full font-jakarta text-[16px] font-semibold global-transition px-5 py-4 w-fit grow-0 ${
                          isSubmitting || !formData.consent
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-mainColor2 text-white hover:bg-mainColor4'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Subscribing...
                          </>
                        ) : (
                          'Subscribe Now'
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <PartnersSection/>
        </div>
      </div>
    </>
  );
};

export default NewsletterPage;