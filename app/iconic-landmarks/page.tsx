// components/IconicLandmarksPage.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import PartnersSection from '@/components/section/PartnersSection';

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
      title: "Shaniwar Wada",
      description: `Shaniwar Wada is a site that holds great importance when it comes to Pune’s history. It was built in 1732 by the Maratha Empire Peshwas. Despite being partially destroyed by fire in 1828, the place is famous for its humongous light pillars and intricate carvings. A sound and light show is held during the evenings, which helps you relive the outstanding tales of this site.`,
      imageUrl: "/images/shaniwarwada.jpg",
    },
    {
      id: 2,
      title: "Aga Khan Palace",
      description: `Due to the famous Indian independence movement, this landmark site greatly helped the Agakhan Palace in becoming a significant landmark. During the ‘Quit India Movement,’ Mahatma Gandhi and wife Kasturba Gandhi were imprisoned here. The site also comes with stunning gardens, beautiful Italian arches, and a museum that holds the belongings of Gandhi Ji.`,
      imageUrl: "/images/aghakhan.jpg",
    },
    {
      id: 3,
      title: "Sinhagad Fort ",
      description: "Sinhagad Fort was also the location of the famed battle of Sinhagad in 1670. The picturesque scenery combined with the site being placed on top of the Sahyadri hills makes it the go-to spot for trekking enthusiasts looking for a challenge.",
      imageUrl: "/images/sinhgadfort.jpg",
    },
    {
      id: 4,
      title: "Lal Mahal",
      description: "Chhatrapati Shivaji Maharaj’s father, Shahaji Bhosale, constructed Lal Mahal in 1630. Though the original structure was destroyed, Lal Mahal in Pune serves as a reminder of Shivaji’s commendable legacy. The palace showcases relics and paintings, along with the replica of Shivaji’s sword.",
      imageUrl: "/images/lalmahal.jpg",
    },
    {
      id: 5,
      title: "Vishrambaug Wada",
      description: "Vishrambaug Wada is a perfect glimpse of Maratha craftsmanship and once used to be Peshwa Bajirao II’s grandiose mansion. The intricate carvings and wooden frameworks alongside the majestic balconies allow tourists an insight into Pune’s splendid history.",
      imageUrl: "/images/vishrambaug.jpg",
    },
    {
      id: 6,
      title: "Shinde Chhatri",
      description: "Located in Pune, the monument Shinde Chhatri is devoted to the renowned Shinde family and features a temple of Lord Shiva. The monument is built in remembrance of Mahadji Shinde, who served as a general in the Maratha empire, and is known for its architectural fusion of Rajasthan and British styles.",
      imageUrl: "/images/shinde.jpg",
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] bg-mainColor5 pt-48 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <Image
            src="/images/pune5.jpg"
            alt="Pune Landmarks"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto relative z-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-40 animate-fade-in-up">
            Pune Iconic Landmarks
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

      {/* <PartnersSection/> */}
    </div>
  );
};

export default IconicLandmarksPage;