'use client';

import PartnersSection from '@/components/section/PartnersSection';
import React, { ReactNode, useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  target?: '_self' | '_blank';
  rel?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'icon';
}

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

interface GuideItem {
  title: string;
  content: string;
  imageSrc: string;
  link: string;
  linkText?: string;
}

interface HotelItem {
  name: string;
  description: string;
  imageSrc: string;
  bookingLink: string;
  locationLink: string;
}

// Button Component
const Button: React.FC<ButtonProps> = ({
  children,
  href,
  target = '_self',
  rel,
  className = '',
  onClick,
  variant = 'primary'
}) => {
  const baseClasses = "flex-center group gap-2 overflow-hidden rounded-full font-jakarta text-[16px] font-semibold global-transition px-5 py-2 w-fit";
  
  const variantClasses = {
    primary: "bg-mainColor2 text-white hover:bg-mainColor4",
    secondary: "bg-white text-mainColor2 hover:bg-mainColor2 hover:text-white",
    icon: "bg-mainColor2 text-white hover:bg-mainColor4 aspect-square rounded-full !p-4"
  };
  
  const buttonClass = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClass}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

// Image Component
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  width = 500,
  height = 500
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`size-auto object-contain ${className}`}
      style={{ color: 'transparent' }}
    />
  );
};

// Hero Section (Server Component)
const HeroSection: React.FC = () => {
  return (
    <div className="page-spacing-wrapper">
      <div className="relative z-[1] flex flex-col justify-end bg-mainColor5 !pt-96">
        <div className="container flex flex-col justify-end !pt-0 !pb-10 text-white">
          <h2 className="title-72 text-white">Plan Your Travel</h2>
          <p className="max-w-6xl whitespace-pre-line py-5">
            Plan your journey with ease with our comprehensive guide to visas, hotels, and bookings, 
            designed to ensure a seamless exhibition experience, all in one place.
          </p>
        </div>
        <div className="absolute inset-0 z-[-1] size-full !py-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black"></div>
          <Image
            src="/images/image.png"
            alt="TransRussia©24"
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

// Introduction Section (Server Component)
const IntroductionSection: React.FC = () => {
  return (
    <div className="animated-block">
      <div className="animated-block-target">
        <div className="container overflow-hidden">
          <div className="mb-14 flex flex-wrap justify-between gap-10 lg:items-end">
            <div className="lg:basis-2/3">
              <div className="flex-center w-fit gap-2 py-2 pe-5 pl-1 capitalize">
                <Image
                  src="/imgs/logo-icon-3.png"
                  alt="TransRussia©24"
                  className="size-auto w-5"
                />
                <span>TransRussia</span>
              </div>
              <h2 className="title-72 text-black my-3">
                Combine Business with Moscow's Rich Culture at TransRussia
              </h2>
              <p className="whitespace-pre-line">
                Join thousands of warehousing and logistics industry leaders and peers to forge 
                valuable connections, discover cutting-edge trends in the industry, and immerse 
                yourself in the rich history and vibrant culture of Moscow—a city that blends 
                innovation with timeless charm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Guide Item Component (Server Component)
const GuideItemComponent: React.FC<GuideItem & { index: number }> = ({
  title,
  content,
  imageSrc,
  link,
  linkText = "Read more",
  index
}) => {
  return (
    <div className="grid grid-cols-1 items-center gap-5 xl:grid-cols-7">
      <div className="flex-center size-[250px] xl:col-span-2">
        <Image
          src={imageSrc}
          alt={title}
          className="size-full object-contain"
        />
      </div>
      <h5 className="title-24 text-black xl:col-span-2">{title}</h5>
      <p className="whitespace-pre-line xl:col-span-2">{content}</p>
      <div className="grid xl:place-content-center">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button variant="icon">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" 
              className="size-4 lg:size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </svg>
          </Button>
        </a>
      </div>
    </div>
  );
};

// Guide Section with Tabs (Client Component - needs useState)
const GuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exhibitors' | 'visitors'>('exhibitors');
  
  const exhibitorItems: GuideItem[] = [
    {
      title: "Visa",
      content: "A regular business visa is suitable for business visits to Russia aimed at negotiating, concluding contracts, participating in exhibitions, conferences, or other business meetings and events.",
      imageSrc: "/images/image.png",
      link: "/visa"
    },
    {
      title: "Freight, Handling & Customs",
      content: "We recommend DMW EXPO for shipping your products, equipment, materials, or displays. Their reliable service ensures timely and safe delivery for your stand allowing you to focus on your stand.",
      imageSrc: "/images/image.png",
      link: "/exhibitor-resource-center"
    },
    {
      title: "Preparation Checklist",
      content: "To make your experience as seamless as possible, we have put together a checklist for you, to keep track of all the necessary requirements you will need to keep note of leading up to the event.",
      imageSrc: "/images/image.png",
      link: "/exhibitor-resource-center",
      linkText: "Checklist"
    }
  ];

  const visitorItems: GuideItem[] = [
    // Add visitor items here if needed
  ];

  return (
    <div className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <div className="flex-between mb-10 flex-wrap !items-end gap-5 border-b border-mainColor1 pb-10">
            <div>
              <div className="flex-center w-fit gap-2 py-2 pe-5 pl-1 capitalize">
                <Image
                  src="/imgs/logo-icon-3.png"
                  alt="TransRussia©24"
                  className="size-auto w-5"
                />
                <span>Plan Your Travel</span>
              </div>
              <h2 className="title-72 text-black mt-5">The Information You Need Before Traveling</h2>
            </div>
            
            <div className="inline-flex p-1 text-muted-foreground size-fit rounded-full bg-mainColor5">
              <button
                onClick={() => setActiveTab('exhibitors')}
                className={`inline-flex text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 m-0 rounded-full px-5 py-3 font-bold transition-all duration-700 ease-in-out ${
                  activeTab === 'exhibitors' 
                    ? 'bg-mainColor2 text-white' 
                    : 'bg-transparent text-gray-700'
                }`}
              >
                Exhibitors
              </button>
              <button
                onClick={() => setActiveTab('visitors')}
                className={`inline-flex text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 m-0 rounded-full px-5 py-3 font-bold transition-all duration-700 ease-in-out ${
                  activeTab === 'visitors' 
                    ? 'bg-mainColor2 text-white' 
                    : 'bg-transparent text-gray-700'
                }`}
              >
                Visitors
              </button>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-1">
            {activeTab === 'exhibitors' && (
              exhibitorItems.map((item, index) => (
                <GuideItemComponent key={index} {...item} index={index} />
              ))
            )}
            {activeTab === 'visitors' && (
              visitorItems.length > 0 ? (
                visitorItems.map((item, index) => (
                  <GuideItemComponent key={index} {...item} index={index} />
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No visitor information available at this time.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hotel Component (Server Component)
const HotelComponent: React.FC<HotelItem> = ({
  name,
  description,
  imageSrc,
  bookingLink,
  locationLink
}) => {
  return (
    <div className="flex flex-col gap-10 rounded-xl px-5 lg:flex-row lg:gap-20 lg:px-10">
      <div className="size-[240px] shrink-0">
        <Image
          src={imageSrc}
          alt={name}
          className="size-full object-contain"
        />
      </div>
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="mt-5 whitespace-pre-line">{description}</p>
        <div className="mt-5 flex w-full flex-wrap gap-5">
          <Button 
            href={bookingLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="max-lg:w-full"
          >
            Book your stay
          </Button>
          <Button 
            href={locationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            variant="secondary"
            className="max-lg:w-full"
          >
            View Location
          </Button>
        </div>
      </div>
    </div>
  );
};

// Hotels Section (Server Component)
const HotelsSection: React.FC = () => {
  const hotels: HotelItem[] = [
    {
      name: "Art Moscow 4*",
      description: `The modern Hotel Art Moscow Voykovskaya 4* is a 25-minute drive from Crocus Expo, Sheremetyevo Airport, and the city center. The Voykovskaya metro station, Baltiyskaya MCC, Krasny Baltiets MCC are a 10-minute walk away.

The hotel has a stylish interior and an elaborate infrastructure, including a restaurant, a bar and conference rooms. Buffet breakfast, free Wi-Fi and parking are at guests' disposal. All rooms are equipped with all the amenities you need for maximum comfort, including a mini-fridge and LCD TV, a tea station and toiletries. Book a room at Art Moscow and experience an atmosphere of coziness and inspiration.`,
      imageSrc: "/images/image.png",
      bookingLink: "https://artmoscowhotel.ru/en/",
      locationLink: "https://yandex.ru/maps/org/art_moskva/88116514898/?ll=37.511617%2C55.815313&source=wizbiz_new_map_single&z=14"
    },
    {
      name: "Penta Hotel",
      description: `The hotel is located in the famous building "The Book", 2 km from the Red Square, 500 m from Arbatskaya metro station, direct metro line to Crocus Expo. In the hotel: 228 designer rooms with panoramic views of the Old and New Arbat Streets; buffet breakfast at Pentaloft Art Restaurant (24/7 room service); Pentalounge with bar, a la carte restaurant and billiards; a full range of conference services in contemporary spaces; free Wi-Fi throughout the hotel; free gym for hotel guests and a cozy library for business talks. Pentahotel Arbat is your home away from home.`,
      imageSrc: "/images/image.png",
      bookingLink: "https://reservations.pentahotels.com/108144?identifier=EXPO#/guestsandrooms",
      locationLink: "https://yandex.ru/maps/org/pentahotel_moscow_arbat/17323657526/?ll=37.592512%2C55.752185&source=wizbiz_new_map_single&z=16"
    },
    {
      name: "Hotel Peter I - 5*",
      description: `Hotel Peter I is located in the historical center of Moscow, within walking distance of Red Square, Bolshoi, and Maly Theaters, as well as stores - TSUM and GUM. The hotel offers room service, wi-fi, a club floor, a Romanov restaurant with Russian and European cuisine, conference halls, a fitness center with a swimming pool, a Jacuzzi, and a Turkish bath. Several metro stations are within walking distance from the hotel: Kuznetsky Most, Okhotny Ryad, Teatralnaya, Ploshchad Revolutsii, and Trubnaya.`,
      imageSrc: "/images/image.png",
      bookingLink: "https://www.hotel-peter1.ru/",
      locationLink: "https://yandex.ru/maps/org/petr_i/1014459869/?ll=37.619774%2C55.763544&source=wizbiz_new_map_single&z=14"
    },
    // Add more hotels as needed
  ];

  return (
    <div className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="title-72 text-black">
            20% Off When You Book at the Hotel Website Using the Promo Code "EXPO"
          </h2>
          <div className="shrink-0 mt-5 h-px w-full bg-mainColor1"></div>
          
          <div className="mt-10 flex flex-col gap-10">
            {hotels.map((hotel, index) => (
              <HotelComponent key={index} {...hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// City Guide Section (Server Component)
const CityGuideSection: React.FC = () => {
  return (
    <div className="animated-block">
      <div className="animated-block-target">
        <div className="relative z-[1] overflow-hidden">
          <div className="container">
            <div className="flex flex-col gap-5">
              <h2 className="title-72 text-black">Explore Moscow Beyond the Exhibition</h2>
              <a href="/explore-moscow" className="block">
                <Button>City Guide</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// Main Page Component - Marked as Client Component
const PlanYourTravelPage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <IntroductionSection />
      <GuideSection />
      <HotelsSection />
      <CityGuideSection />
      <PartnersSection />
    </div>
  );
};

export default PlanYourTravelPage;