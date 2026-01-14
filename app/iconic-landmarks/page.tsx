// components/IconicLandmarksPage.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PartnersSection from '@/components/section/PartnersSection';

// Define types
interface Landmark {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  button1?: {
    text: string;
    link: string;
  };
  button2?: {
    text: string;
    link: string;
  };
}

interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  type?: string;
  slug: string;
}

const IconicLandmarksPage: React.FC = () => {
  // Landmarks data
  const landmarks: Landmark[] = [
    {
      id: 1,
      title: "Red Square and the Kremlin",
      description: `• Red Square is the heart of Moscow. Be sure to visit St. Basil's Cathedral with its colorful domes and the State Historical Museum.
      • The Kremlin is a historical fortress where you can see the Trinity Tower, the Grand Kremlin Palace and many cathedrals.`,
      imageUrl: "/images/image.png",
    },
    {
      id: 2,
      title: "Tsaritsyno and Kolomenskoye",
      description: `• Tsaritsyno is a beautiful park with a palace where exhibitions and cultural events are held.
      • Kolomenskoye is a historical complex with wooden buildings and beautiful views of the Moscow River.`,
      imageUrl: "/images/image.png",
    },
    {
      id: 3,
      title: "St. Basil's Cathedral",
      description: "St. Basil's Cathedral, with its vibrant, onion-shaped domes, is a symbol of Moscow and a masterpiece of Russian architecture, blending history, art, and culture.",
      imageUrl: "/images/image.png",
    },
    {
      id: 4,
      title: "GUM",
      description: "• GUM is not only a shopping center, but also an architectural masterpiece. Stroll through its galleries and enjoy the atmosphere.",
      imageUrl: "/images/image.png",
    },
    {
      id: 5,
      title: "Patriarch's Ponds",
      description: "• A cozy place for walks. Here you can enjoy the atmosphere of old Moscow and have a coffee in one of the local cafes.",
      imageUrl: "/images/image.png",
    },
    {
      id: 6,
      title: "VDNKh",
      description: "• The All-Russian Exhibition Center is a huge complex with pavilions, fountains and parks. Don't miss 'Cosmos' and 'Cosmic Harbor'.",
      imageUrl: "/images/image.png",
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-mainColor5 pt-48 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <Image
            src="/images/image.png"
            alt="Moscow Landmarks"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Iconic Landmarks
          </h1>
        </div>
      </section>

      {/* Landmarks Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landmarks.map((landmark, index) => (
              <div
                key={landmark.id}
                className="group relative h-[500px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0">
                  <Image
                    src={landmark.imageUrl}
                    alt={landmark.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-mainColor2 transition-colors duration-300">
                    {landmark.title}
                  </h3>
                  <div 
                    className="text-gray-200 text-sm lg:text-base leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                    dangerouslySetInnerHTML={{ __html: landmark.description.replace(/\n/g, '<br />') }}
                  />
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-mainColor2 rounded-xl transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection/>
    </div>
  );
};

export default IconicLandmarksPage;