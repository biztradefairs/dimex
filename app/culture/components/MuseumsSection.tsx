import React from 'react';

const museums = [
  {
    id: 1,
    title: "State Tretyakov Gallery",
    description: "Immerse yourself in Russian art at State Tretyakov Gallery, a premier museum and home to an extensive collection of masterpieces.",
    image: "https://cdn.itegroupnews.com/Securika_600_x_650_7_edc7cbf1b7.png"
  },
  {
    id: 2,
    title: "Garage Museum of Contemporary Art",
    description: "Engage with contemporary art through innovative exhibitions, lectures, and cultural events at Garage Museum of Contemporary Art.",
    image: "https://cdn.itegroupnews.com/Securika_600_x_650_6_15e82cc9b5.png"
  },
  {
    id: 3,
    title: "Moscow Museum of Modern Art (MMOMA)",
    description: "Explore cutting-edge exhibitions showcasing both Russian and international contemporary artists at MMOMA.",
    image: "https://cdn.itegroupnews.com/Securika_600_x_650_5_bcec892b02.png"
  }
];

const MuseumsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-10">
          MUSEUMS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {museums.map((museum) => (
            <div 
              key={museum.id}
              className="relative flex flex-col min-h-[500px] p-5 lg:p-10 text-white group cursor-pointer overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <img 
                src={museum.image} 
                alt={museum.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="relative z-10 flex flex-col gap-5 mt-auto">
                <h3 className="text-3xl md:text-4xl font-semibold text-white transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                  {museum.title}
                </h3>
                <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">
                  <p className="text-lg">{museum.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MuseumsSection;