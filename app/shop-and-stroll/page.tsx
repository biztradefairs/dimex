import PartnersSection from '@/components/section/PartnersSection';
import React from 'react';

const ShopAndStroll: React.FC = () => {
  // Shopping destinations data
  const shoppingDestinations = [
    {
      title: "Phoenix Marketcity",
      description: "Phoenix Marketcity is a shopping mall developed by Phoenix Mills Limited, located in Pune, Maharashtra. It was opened in June 2011 and is one of the largest malls in India, with a retail area of 1.19 million square feet. It is located in the Vimannagar area of Pune.",
      image: "/images/PhoenixPune.jpg"
    },
    {
      title: "Phule Market",
      description: "Pune's largest, historic, Gothic-style retail vegetable market located in Shukrawar Peth. Built in 1886, this bustling, centrally located hub features over 500 stalls selling fresh produce, fruits, and spices. It is a major, vibrant, and crowded cultural landmark near Tulshi Baug",
      image: "/images/phule-market.jpg"
    },
    {
      title: "Tulshibag Market",
      description: "Tulshibaug Market, located in Budhwar Peth, Pune, near Vishrambaug Wada, is a bustling, iconic, and historic street shopping hub known for incredibly budget-friendly, diverse goods. It is famous for women's fashion, including traditional clothing, imitation jewellery, cosmetics, and accessories, as well as household items, Puja items, and footwear.",
      image: "/images/tulsi.jpg"
    },
    {
      title: "Seasons Mall",
      description: "Seasons Mall Pune, located in Magarpatta, is a vibrant lifestyle hub offering shopping, dining, and entertainment all in one place. From premium brands and cozy cafés to movies and fun activities, it’s the perfect destination for fashion lovers and families alike",
      image: "/images/seasons.jpg"
    }
  ];

  return (
    <div className="min-h-[60vh] lg:min-h-[70vh] font-sans antialiased">
      {/* Hero Section */}
      <div className="relative z-[1] flex flex-col justify-end bg-gray-100 pt-96">
        <div className="container mx-auto px-4 flex flex-col justify-end pt-0 pb-10 text-white">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5">Shop and Stroll</h2>
          <p className="max-w-6xl whitespace-pre-line py-5 text-lg">
            For a mix of modern retail and local charm, explore Pune’s popular shopping spots like FC Road, MG Road, and Laxmi Road. From trendy boutiques to traditional markets and souvenir shops, you can easily find something special to take home.
          </p>
        </div>
        <div className="absolute inset-0 z-[-1] w-full h-full py-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
          <img 
            alt="Pune Shopping"
            src="/images/shopping-pune.jpg"
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