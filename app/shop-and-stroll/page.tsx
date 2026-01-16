import PartnersSection from '@/components/section/PartnersSection';
import React from 'react';

const ShopAndStroll: React.FC = () => {
  // Shopping destinations data
  const shoppingDestinations = [
    {
      title: "TSUM",
      description: "Don't miss TSUM, the iconic Central Department Store.",
      image: "https://cdn.itegroupnews.com/15_0ab2aa82ec.png"
    },
    {
      title: "Tverskaya Street",
      description: "Discover luxury on Tverskaya Street, lined with boutiques and renowned brand shops.",
      image: "https://cdn.itegroupnews.com/16_4c12988a8e.png"
    },
    {
      title: "Kuznetsky Most",
      description: "Explore Kuznetsky Most, a vibrant street known for its high-end boutiques featuring Russian and international designers.",
      image: "https://cdn.itegroupnews.com/17_264319f150.png"
    },
    {
      title: "Fashion Quarter on Stoleshnikov Lane",
      description: "Shop unique clothing and accessories at cozy stores and concept shops in the charming Fashion Quarter.",
      image: "https://cdn.itegroupnews.com/18_b27a580cac.png"
    }
  ];

  return (
    <div className="min-h-screen font-sans antialiased">
      {/* Hero Section */}
      <div className="relative z-[1] flex flex-col justify-end bg-gray-100 pt-96">
        <div className="container mx-auto px-4 flex flex-col justify-end pt-0 pb-10 text-white">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5">Shop and Stroll</h2>
          <p className="max-w-6xl whitespace-pre-line py-5 text-lg">
            For a blend of luxury and tradition, explore the historic GUM Department Store or the trendy boutiques of the Patriarch Ponds area. Antique markets and souvenir shops offer a chance to take a piece of Moscow home with you.
          </p>
        </div>
        <div className="absolute inset-0 z-[-1] w-full h-full py-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
          <img 
            alt="Moscow Shopping"
            src="https://cdn.itegroupnews.com/Untitled_design_56_9d84bd6621.png"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Shopping Destinations Grid */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {shoppingDestinations.map((destination, index) => (
              <div 
                key={index}
                className="relative flex flex-col min-h-[500px] p-5 lg:p-10 text-white group overflow-hidden rounded-lg"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                
                {/* Background Image */}
                <img 
                  alt={destination.title}
                  src={destination.image}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Content */}
                <div className="relative z-[2] flex flex-col gap-5 mt-auto">
                  <h2 className="text-3xl md:text-4xl font-semibold text-white group-hover:text-white/90 transition-colors duration-300">
                    {destination.title}
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/90 group-hover:text-white transition-colors duration-300">
                      {destination.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PartnersSection/>
    </div>
  );
};

export default ShopAndStroll;