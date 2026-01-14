import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col justify-end bg-gray-100 pt-96">
      <div className="container mx-auto flex flex-col justify-end pb-10 text-white">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4">
          Immerse in Moscow's Culture
        </h2>
        <p className="max-w-6xl whitespace-pre-line py-5"></p>
      </div>
      
      <div className="absolute inset-0 z-[-1] w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <img 
          src="https://cdn.itegroupnews.com/Untitled_design_47_330a961bb8.png" 
          alt="Moscow Culture" 
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;