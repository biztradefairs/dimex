import React from 'react';
import SectionContainer from '@/components/UI/SectionContainer';
import Link from 'next/link';

const QuickNavigationSection = () => {
  return (
    <SectionContainer className="py-16 lg:py-24">
      
      

      <h2 className="text-6xl lg:text-7xl font-bold mb-4">
        Quick Navigation
      </h2>
      <h3 className="text-sm text-gray-600 font-semibold mb-3">
        Simplifying Your Participation Journey
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="border border-gray-200 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <span className="text-3xl font-bold text-gray-300">01</span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold mb-3">
            Become an Exhibitor
          </h3>

          <p className="text-gray-600 mb-6">
            Join 200+ exhibitors in presenting your solutions for 3 days for unmatched networking opportunities.
          </p>

          <Link href="/exhibiting-enquiry">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
              Book a Stand
            </button>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="border border-gray-200 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">📘</span>
            </div>
            <span className="text-3xl font-bold text-gray-300">02</span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold mb-3">
            Download Event Brochure
          </h3>

          <p className="text-gray-600 mb-6">
            Find out who we are, what we do, and how best we can help you achieve your business goals.
          </p>

          <Link href="/event-brochure">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
              Download Now
            </button>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="border border-gray-200 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <span className="text-3xl font-bold text-gray-300">03</span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold mb-3">
            Become a Visitor
          </h3>

          <p className="text-gray-600 mb-6">
            Visit the exhibition for free and discover what to expect at the upcoming edition.
          </p>

          <Link href="/visitor-registration">
            <button className="w-full bg-[#004D9F] hover:bg-blue-700 text-white py-3 rounded-full font-medium">
              Visitor Registration
            </button>
          </Link>
        </div>

      </div>
    </SectionContainer>
  );
};

export default QuickNavigationSection;
