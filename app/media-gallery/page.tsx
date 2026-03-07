'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const mediaItems = [
  {
    id: 1,
    title: "Diemex 2025 Exhibiton Inaguration",
    href: "/media-gallery/diemex-2025-conference-program", // Changed slug to lowercase
    image: "/images/diemex2023.JPG"
  },
  {
    id: 2,
    title: "Diemex 2025 Exhibition",
    href: "/media-gallery/diemex-2025-exhibition", // Changed slug
    image: "/images/diemex2023-2.JPG"
  },
  {
    id: 3,
   title: "Diemex 2025 Awards Ceremony",
    href: "/media-gallery/diemex-2024-exhibition", // Changed slug
    image: "/images/diemex2023-awards.JPG"
  },
  {
    id: 4,
    title: "Diemex 2023 Exhibition Inaguration",
    href: "/media-gallery/diemex-4-5-december-2024", // Changed slug
    image: "/images/image.png"
  },
  {
    id: 5,
    title: "Diemex 2023 Exhibition",
    href: "/media-gallery/diemex-2024-conference-programme", // Changed slug
    image: "/images/image.png"
  },
  {
    id: 6,
    title: "Diemex 2023 Awards Ceremony",
    href: "/media-gallery/diemex-2024-awards-ceremony", // Changed slug
    image: "/images/image.png"
  },
 
  

];

export default function MediaGalleryPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="font-parabolica antialiased">
      {/* Back to Top Button */}
      <div className={`fixed bottom-3 right-3 lg:bottom-10 lg:right-2 z-50 transition-all duration-300 ${showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <button
          aria-label="Back to top"
          onClick={scrollToTop}
          className="m-0 rounded-full border-none bg-[#b0cbdf] p-0 outline-none drop-shadow-lg"
        >
          <svg className="size-10 fill-mainColor1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
          </svg>
        </button>
      </div>

      {/* Page Content */}
      <div className="">
        {/* Hero Section */}
        <div className="bg-[#F0F9FF] py-20">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 mt-15">
            <div className="flex flex-col justify-end">
              <h2 className="title-72 text-black">Explore Diemex Over the Years</h2>
              <p className="max-w-6xl whitespace-pre-line py-5">
                Discover Diemex through our curated gallery, featuring moments from the opening ceremony, awards, exhibition showcases, and dynamic conference sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Media Gallery Section */}
        <div className="py-12">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
            {/* Media Grid - Three items per row */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative flex flex-col rounded-xl overflow-hidden bg-[#0E1C35] shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="title-18 mb-3 line-clamp-2 font-bold text-white group-hover:text-mainColor1">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}