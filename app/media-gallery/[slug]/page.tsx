// app/media-gallery/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// This would typically come from an API or database
const mediaDetails = [
  {
    id: 1,
    slug: "transrussia-2025-conference-program",
    title: "TransRussia 2025 Conference Program",
    shortText: "TransRussia",
    images: [
      { src: "https://cdn.itegroupnews.com/DSC_6960_retouched_d7ae158197.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_6924_retouched_2b8cd2d094.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2772_retouched_32583e8d73.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2469_retouched_c78625a3b2.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0978_retouched_5225904453.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_9120_1_retouched_90e3e585e6.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3850_retouched_7089e1da39.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3572_retouched_a6e560c066.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2476_8003cf2d49.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_6938_retouched_2611f38c86.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1438_dbdb7a30f2.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2394_retouched_529ded36cb.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_8079_retouched_ede783d49e.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0030_20250318_11_22_12_6cc117ae00.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3120_e2195826d6.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3460_retouched_1c69872678.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0264_20250318_15_36_27_c9bc2ddac8.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2581_retouched_01c8361ac7.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0278_20250318_15_45_03_94896c9f38.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0310_2115cc1211.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2017_retouched_e2e9d34927.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0142_20250318_13_49_47_3a9de942b2.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2628_51ac0eb044.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_8014_retouched_11d8afbd8d.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1290_retouched_957a1f4b7a.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3160_5190a4196e.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3454_5fc9f0e8c3.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_6601_retouched_36f7071a77.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1145_retouched_bf5007a3a8.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_4465_retouched_6762b22073.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0296_20250318_16_24_12_e500d85b2c.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_6571_retouched_63d3cb65fe.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1202_retouched_8e8cc86d44.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_7981_retouched_cf3d4a6633.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0479_retouched_557989d6a8.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1086_retouched_ba0bfb38c7.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3893_retouched_542d3e3e24.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3065_retouched_3dcbf25ef7.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2597_retouched_9411ad2aba.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0238_05962432c4.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0325_20250318_16_50_09_e06d0faa88.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0534_6359be7192.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_9061_1_retouched_c4235748eb.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0794_retouched_6748bcf7d6.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0235_retouched_7359235ccb.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3147_bcaacb9963.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0122_20250318_13_34_56_d345a9fd39.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0879_5a9d662c13.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_8790_2_retouched_59e4561faf.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0039_20250318_11_28_29_7905f1a1e8.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3403_retouched_94573760bf.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3159_retouched_34773128de.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_9027_1_retouched_76ec63860d.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0336_20250318_17_00_19_65eb11d5b9.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1395_retouched_af35601627.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_9306_1_retouched_c2719fa3d8.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_8638_retouched_209f4b5889.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0457_retouched_ac67a77699.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1579_573da5a58c.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1226_retouched_4b2ce040c3.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_9374_2_retouched_f03b1cdd51.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_7167_retouched_928976fd17.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0921_retouched_814639a0d7.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3153_retouched_d72054cc8c.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2244_retouched_265401c95a.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3969_retouched_827ce6925d.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_1594_919c9cf0de.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_3925_retouched_fbe2c79b8a.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0293_retouched_19daeaab4b.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0115_20250318_13_23_10_408fd4a930.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_2107_retouched_8d934a6551.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0522_d1a05a9e83.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_4469_retouched_2e4107b70c.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0686_25f7416377.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_4277_retouched_d315ccac0a.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0081_20250318_12_24_59_6719cdfb51.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0309_20250318_16_34_22_14f1521643.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_0660_retouched_e42a734381.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/DSC_4052_retouched_084995496e.webp", alt: "TransRussia©24" },
      { src: "https://cdn.itegroupnews.com/0036_20250318_11_25_09_cd072cd9da.webp", alt: "TransRussia©24" }
    ]
  },
  // Add other media items here...
];

// Lightbox/Modal Component
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
      {/* Close Button - Fixed positioning with higher z-index */}
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
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <button
        onClick={onNext}
        className="fixed right-6 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full backdrop-blur-sm z-[1001] transition-all duration-200"
        aria-label="Next image"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    document.body.style.overflow = 'hidden'; // Prevent scrolling
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
          className="m-0 rounded-full border-none bg-white p-0 outline-none drop-shadow-lg"
        >
          <svg className="size-10 fill-mainColor1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.476-10+10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
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
              {/* Add description here if needed */}
            </div>
          </div>
        </div>

        {/* Image Grid - Updated for consistent card sizes */}
        <div className="container my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {mediaItem.images.map((image: { src: string; alt: string }, index: number) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              >
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="global-transition size-full cursor-pointer focus:outline-none"
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </button>
                </div>
                
                {/* Optional: Add caption or overlay */}
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
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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