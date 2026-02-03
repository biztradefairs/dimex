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
      name: "DIEMEX 2023",
      image:"https://cdn.itegroupnews.com/comtrans_92db3bfebf.webp",
      description: "The international exhibition of Die & Mould Industry.",
      startDate: "Oct 27th, 2023",
      endDate: "Oct 29th, 2023",
      venue: "KTPO Convention Centre, Bengaluru",
      websiteUrl: "#"
    },
    {
      id: "2",
      name: "DIEMEX 2025",
      image:"https://cdn.itegroupnews.com/dairytech_d532416dae.webp",
      description: "The international exhibition of Die & Mould Industry.",
      startDate: "Nov 20th, 2025",
      endDate: "Nov 22nd, 2025",
      venue: "Chennai Trade Centre,Chennai",
      websiteUrl: "#"
    },
    {
      id: "3",
      name: "DIEMEX 2026",
      image:"https://cdn.itegroupnews.com/airvent_b09e1eb665.webp",
     description: "The international exhibition of Die & Mould Industry.",
      startDate: "Oct 8th, 2026",
      endDate: "Oct 10th, 2026",
      venue: "Auto Cluster Exhibition Centre, Pune",
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
         We host a portfolio of focused industry exhibitions and conferences, creating powerful business platforms for manufacturing, engineering, and technology communities.
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
