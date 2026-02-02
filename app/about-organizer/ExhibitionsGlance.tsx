// components/ExhibitionsGlance.tsx
import SectionContainer from '@/components/UI/SectionContainer';
import React from 'react';

interface Exhibition {
  id: string;
  name: string;
  image: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  websiteUrl: string;
}

interface ExhibitionsGlanceProps {
  exhibitions?: Exhibition[];
}

const ExhibitionsGlance: React.FC<ExhibitionsGlanceProps> = ({
  exhibitions = [
    {
      id: "1",
      name: "comtrans",
      image:"https://cdn.itegroupnews.com/comtrans_92db3bfebf.webp",
      description: "The international exhibition of commercial vehicles.",
      startDate: "Dec 9th, 2025",
      endDate: "Dec 12th, 2025",
      venue: "Crocus Expo, Moscow",
      websiteUrl: "#"
    },
    {
      id: "2",
      name: "dairy tech",
      image:"https://cdn.itegroupnews.com/dairytech_d532416dae.webp",
      description: "The international exhibition of equipment for milk and dairy production.",
      startDate: "Jan 27th, 2026",
      endDate: "Jan 29th, 2026",
      venue: "Pavilion 1, Hall 4, Crocus Expo, Moscow",
      websiteUrl: "#"
    },
    {
      id: "3",
      name: "AIRVent",
      image:"https://cdn.itegroupnews.com/airvent_b09e1eb665.webp",
      description: "The international exhibition of ventilation, air conditioning, and refrigeration equipment.",
      startDate: "Feb 3rd, 2026",
      endDate: "Feb 6th, 2026",
      venue: "Crocus Expo, Moscow",
      websiteUrl: "#"
    }
  ]
}) => {
  return (
    <section>
         <SectionContainer>
    
    <div className="max-w-10xl mx-auto px-4 py-8 font-parabolica">
      {/* Header Section */}
     
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Our Exhibitions at a Glance
        </h1>
        
        <p className="text-gray-700 max-w-10xl">
          Each year, we organize and host over 30 leading industry events across key sectors, including exhibitions, summits, and conferences. Supported by the Connect digital platform, the ITE ecosystem offers innovative hybrid solutions for industry communities in Russia, the CIS, and beyond.
        </p>
      </div>

      {/* Grid Layout - 3 boxes in one row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exhibitions.map((exhibition) => (
          <div 
            key={exhibition.id}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Exhibition Name */}
            <img
            src={exhibition.image}
            height={230}
            width={230}/>
            
            {/* Description */}
            <p className="text-gray-600 mb-4">
              {exhibition.description}
            </p>
            
            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[90px]">Start Date:</span>
                <span className="text-gray-600">{exhibition.startDate}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[90px]">End Date:</span>
                <span className="text-gray-600">{exhibition.endDate}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-700 min-w-[90px]">Venue:</span>
                <span className="text-gray-600">{exhibition.venue}</span>
              </div>
            </div>
            
            {/* Link */}
            <a 
              href={exhibition.websiteUrl}
              className="text-gray-800 hover:text-blue-800 hover:underline inline-block mt-4"
            >
              Visit Website &gt;
            </a>
          </div>
        ))}
      </div>
      
    </div>
    </SectionContainer>
    </section>
  );
};

export default ExhibitionsGlance;