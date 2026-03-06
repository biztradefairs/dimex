import React from 'react';

const museums = [
  {
    id: 1,
    title: "Raja Dinkar Kelkar Museum",
    description: "This museum is the brainchild of Dr. Dinkar G. Kelkar and it features over 20,000 artefacts that comprise weapons, musical instruments, and sculptures from the Mughal eras. The crown jewel of the museum is Mastani Mahal, the remodelled palace of the Peshwa Bajirao’s queen.",
    image: "/images/raja.jpg"
  },
  {
    id: 2,
    title: "Shree Chhatrapati Shivaji Maharaj Museum",
    description: "Chhatrapati Shivaji Maharaj Museum of Indian History is a private historical museum founded by François Gautier in 2012 under the banner of his not-for-profit organization, the Foundation For Advancement of Cultural Ties.",
    image: "/images/shivaji.jpg"
  },
  {
    id: 3,
    title: "National War Museum",
    description: "The National War Memorial Southern Command is a war memorial in the city of Pune, India, dedicated to post-Independence war martyrs. This is the only war memorial in South Asia which has been erected by citizens' contributions. The memorial was unveiled and dedicated to the nation on 15 August 1998.",
    image: "/images/national.jpg"
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