import React from 'react';

const theatres = [
  {
    id: 1,
    title: "Bolshoi Theatre",
    description: "A class of Russian theater. You should definitely visit the opera or ballet.",
    image: "https://cdn.itegroupnews.com/Securika_600_x_650_4_3b35e9e245.png"
  },
  {
    id: 2,
    title: "Taganka Theatre",
    description: "Known for its experimental productions and unique approach to classical works.",
    image: "https://cdn.itegroupnews.com/Securika_600_x_650_8_5ce1052c63.png"
  },
  {
    id: 3,
    title: "Chekhov Moscow Art Theatre",
    description: "One of the most famous theatres in the country with a rich history and high-class productions.",
    image: "https://cdn.itegroupnews.com/Securika_600_x_650_9_5dbd40a82a.png"
  }
];

const TheatresSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-10">
          THEATRES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {theatres.map((theatre) => (
            <div 
              key={theatre.id}
              className="relative flex flex-col min-h-[500px] p-5 lg:p-10 text-white group cursor-pointer overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <img 
                src={theatre.image} 
                alt={theatre.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="relative z-10 flex flex-col gap-5 mt-auto">
                <h3 className="text-3xl md:text-4xl font-semibold text-white transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                  {theatre.title}
                </h3>
                <div className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">
                  <p className="text-lg">{theatre.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheatresSection;