import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const QuickNavigationSection = () => {
  const navigationItems = [
    {
      number: "01",
      title: "Become an Exhibitor",
      description: "Connect with 30,000+ logistics professionals across 3 days for unparalleled networking opportunities.",
      image: "/TR_24_IMG_1001i_81aab0ef5c.jpg",
      link: "/exhibiting-enquiry",
      buttonText: "Book a Stand"
    },
    {
      number: "02",
      title: "Download Your Event Brochure",
      description: "Find out who we are, what we do, and how best we can help you achieve your strategic business goals all wrapped up in our concise event brochure.",
      image: "/Untitled_500_x_500_px_309_x_274_px_ff2199315c.png",
      link: "/event-brochure",
      buttonText: "Download Now"
    },
    {
      number: "03",
      title: "Contact Us",
      description: "Not ready to become an exhibitor? Why not visit the exhibition for free and find out what to expect for the following edition",
      image: "/TR_24_IMG_0683i_0b1dc919c3.jpg",
      link: "/contact-us",
      buttonText: "Contact Us"
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
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
      </div>
    </section>
  );
};

export default QuickNavigationSection;