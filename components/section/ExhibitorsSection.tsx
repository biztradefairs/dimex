import React from 'react';
import Link from 'next/link';

const ExhibitorsSection = () => {
  const exhibitors = [
    "Trans Net.",
    "AL BAYAN",
    "MARMED CONTAINER SERVICES",
    "Eagleway Cargo",
    "BORERS",
    "GillcoScal, L. Calymonte",
    "SONTIZAR",
    "康泽远",
    "SARIAK",
    "CONTAINER LINES OF MARRISTSELL SISTERS",
    "1KARGO",
    "PROJECTS, EXPOINT ORGANICS",
    "AERO FREIGHT",
    "pak.shahcen (Prt.) Ltd.",
    "CARAVAN LOGISTICS",
    "ONE TOUCH TOUCH & MOUNTERS",
    "ACT PARBO",
    "PTC HOLDING"
  ];

  return (
    <div className="container py-16 lg:py-24">
      <h2 className="title-72 text-black mb-6">A Glimpse of Our 2026 Exhibitors</h2>
      <p className="title-40 font-semibold text-gray-700 mb-12 lg:mb-16">
        Participating in TransRussia Boosts Your Business Growth and Visibility
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-12 lg:mb-16">
        {exhibitors.map((exhibitor, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 flex items-center justify-center min-h-[100px] transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-mainColor2"
          >
            <div className="text-center">
              <span className="text-gray-800 font-medium text-sm md:text-base">
                {exhibitor}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/exhibitor-list" target="_blank" rel="noopener noreferrer">
          <button className="flex-start group w-fit gap-3 overflow-hidden rounded-full px-10 py-4 font-jakarta text-[18px] font-semibold global-transition bg-blue-700 text-white hover:bg-mainColor4 hover:shadow-xl">
            View Our 2026 Exhibitor List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ExhibitorsSection;