import React from 'react';

const theatres = [
  {
    id: 1,
    title: "Parvati Hill",
    description: "Standing at 2,100 feet, Parvati Hill is home to the 17th-century Parvati Temple, which was built by the Peshwas, and other ancient temples. The hill has a breathtaking view of the city of Pune and serves as a pilgrimage and tourism spot for people around the world.",
    image: "/images/parvathi.jpg"
  },
  {
    id: 2,
    title: "Pataleshwar Cave Temple ",
    description: "Pataleshwar Cave Temple, dedicated to Lord Shiva, is an 8th-century temple made out of solid rock and showcases exemplary cut stone work. The intricately carved sculptures feature a majestic Nandi Mandap and multi-detailed stone pillars.",
    image: "/images/pataleshwar.jpg"
  },
  {
    id: 3,
    title: "Shrimant Dagdusheth Halwai Ganpati Mandir",
    description: "The Dagadusheth Halwai Ganapati Temple is a Hindu temple dedicated to the Hindu god Ganesha in the city of Pune, India. The temple is visited by over one hundred thousand devotees every year. A large number of devotees visit the temple during the annual ten-day public Ganeshotsav festival.",
    image: "/images/dadu.jpg"
  }
];

const TheatresSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-10">
          TEMPLES
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