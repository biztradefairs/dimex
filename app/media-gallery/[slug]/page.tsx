'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Complete media details with all slugs
const mediaDetails = [
  {
    id: 1,
    slug: "diemex-2025-inauguration",
    title: "Diemex 2025 Inauguration",
    shortText: "Diemex2025 Inauguration Ceremony",
    images: [
      { src: "/images/media-gallery/20205IN_1.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_2.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_3.jpg", alt: "Diemex©25 Inauguration" },     
      { src: "/images/media-gallery/20205IN_4.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_5.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_6.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_7.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_8.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_9.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_10.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_11.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_12.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_13.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_14.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_15.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_16.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_17.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_18.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_19.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_20.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_21.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_22.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_23.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_24.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_25.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_26.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_27.jpg", alt: "Diemex©25 Inauguration" }, 
      { src: "/images/media-gallery/20205IN_28.jpg", alt: "Diemex©25 Inauguration" },
      { src: "/images/media-gallery/20205IN_29.jpg", alt: "Diemex©25 Inauguration" },
    ]
  },
  {
    id: 2,
    slug: "diemex-2025-exhibition",
    title: "Diemex 2025 Exhibition",
    shortText: "Diemex2025 Exhibition Highlights",
    images: [
      // You'll need to check what your exhibition files are named
      // They might be 20205EX_1.jpg etc or you might need to add them
      { src: "/images/media-gallery/20205IN_1.jpg", alt: "Diemex 2025 Exhibition" },
      { src: "/images/media-gallery/20205IN_2.jpg", alt: "Diemex 2025 Exhibition" },
    ]
  },
  {
    id: 3,
    slug: "diemex-2025-awards",
    title: "Diemex 2025 Awards Ceremony",
    shortText: "Diemex2025 Awards Ceremony",
    images: [
      // You'll need to check what your awards files are named
      { src: "/images/media-gallery/20205IN_1.jpg", alt: "Diemex 2025 Awards" },
      { src: "/images/media-gallery/20205IN_2.jpg", alt: "Diemex 2025 Awards" },
    ]
  },
  // For 2023 galleries, you'll need to check those filenames too
  {
    id: 4,
    slug: "diemex-2023-inauguration",
    title: "Diemex 2023 Inauguration",
    shortText: "Diemex2023 Inauguration Ceremony",
    images: [
      { src: "/images/media-gallery/2023IN_1.jpg", alt: "Diemex 2023 Inauguration" },
      // Add more 2023 images based on your actual files
    ]
  },
  {
    id: 5,
    slug: "diemex-2023-exhibition",
    title: "Diemex 2023 Exhibition",
    shortText: "Diemex2023 Exhibition Highlights",
    images: [
      { src: "/images/media-gallery/2023EX_1.jpg", alt: "Diemex 2023 Exhibition" },
      // Add more 2023 images based on your actual files
    ]
  },
  {
    id: 6,
    slug: "diemex-2023-awards",
    title: "Diemex 2023 Awards Ceremony",
    shortText: "Diemex2023 Awards Ceremony",
    images: [
      { src: "/images/media-gallery/2023AW_1.jpg", alt: "Diemex 2023 Awards" },
      // Add more 2023 images based on your actual files
    ]
  }
];

// Lightbox/Modal Component (keep this exactly as you had it)
function LightboxModal({ 
  isOpen, 
  onClose, 
  images, 
  currentIndex, 
  onNext, 
  onPrev 
}: {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 text-white text-3xl z-[1001] p-2 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all duration-200"
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        className="fixed left-6 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full backdrop-blur-sm z-[1001] transition-all duration-200"
        aria-label="Previous image"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button
        onClick={onNext}
        className="fixed right-6 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full backdrop-blur-sm z-[1001] transition-all duration-200"
        aria-label="Next image"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      {/* Image Counter */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white text-lg bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm z-[1001]">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main Image */}
      <div className="relative w-full h-full max-w-7xl mx-auto p-4">
        <div className="relative w-full h-full">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function MediaGallerySlugPage() {
  const params = useParams();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mediaItem, setMediaItem] = useState<any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    // Find the media item based on the slug
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const item = mediaDetails.find(item => item.slug === slug);
    setMediaItem(item);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [params.slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (mediaItem) {
      setLightboxIndex((prev) => (prev + 1) % mediaItem.images.length);
    }
  };

  const prevImage = () => {
    if (mediaItem) {
      setLightboxIndex((prev) => (prev - 1 + mediaItem.images.length) % mediaItem.images.length);
    }
  };

  if (!mediaItem) {
    return (
      <div className="min-h-screen font-parabolica antialiased flex items-center justify-center">
        <div className="text-center">
          <h2 className="title-72 text-black mb-4">Media Item Not Found</h2>
          <Link href="/media-gallery" className="text-mainColor1 hover:underline">
            Back to Media Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-parabolica antialiased">
      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        images={mediaItem.images}
        currentIndex={lightboxIndex}
        onNext={nextImage}
        onPrev={prevImage}
      />

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
      <div className="page-spacing-wrapper">
        {/* Header Section */}
        <div className="container pb-10 pt-48 mt-10">
          <h2 className="title-72 text-black">{mediaItem.title}</h2>
          <div className="mt-10 flex flex-col justify-between lg:flex-row lg:items-end gap-10 lg:gap-32">
            <div className="rte-style">
              <p className="text-gray-600">{mediaItem.shortText}</p>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="container my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mediaItem.images.map((image: { src: string; alt: string }, index: number) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <div
                    className="global-transition size-full cursor-pointer focus:outline-none"
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                {/* Optional overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm truncate">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="container mb-20 mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link
              href="/media-gallery"
              className="flex items-center text-mainColor1 hover:underline px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Media Gallery
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-mainColor1 hover:underline px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}