import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SectorsSection = () => {
  const sectors = [
    {
      title: "Air Freight",
      description: "Air transportation is crucial for fast delivery of time-sensitive cargo like perishables, medicines, and e-commerce, overcoming topographical limitations that affect road or rail.",
      image: "/images/image.png",
      link: "/sectors/air-freight"
    },
    {
      title: "Maritime & Inland Waterway Transport",
      description: "Maritime cargo transportation offers cost-effective, high-capacity solutions for intercontinental shipments of diverse cargo types.",
      image: "/images/image.png",
      link: "/sectors/maritime-and-inland-waterway-transport"
    },
    {
      title: "Ports & Terminals, Freight Handling Services In Ports",
      description: "Discover expert stevedoring, logistics, and storage solutions for seamless port operations at TransRussia.",
      image: "/images/image.png",
      link: "/sectors/ports-and-terminals-freight-handling-services-in-ports"
    }
  ];

  return (
    <div className="container">
      <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-9">
          <h2 className="title-72 text-black my-3">13 Event Sectors Housing the Entire Logistics Value Chain</h2>
        </div>
        <div className="flex lg:col-span-3 lg:justify-end">
          <Link href="/sectors" className="block">
            <button className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4">
              Explore All Our Event Sector
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-10 grid max-md:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sectors.map((sector, index) => (
          <Link 
            key={index} 
            href={sector.link} 
            className="group relative flex min-h-[600px] w-full flex-col justify-end overflow-hidden p-5 text-white"
          >
            <Image 
              src={sector.image} 
              alt={sector.title} 
              fill
              className="absolute inset-0 z-[-2] size-full object-cover"
            />
            <div className="absolute inset-0 z-[-2] bg-gradient-to-t from-black/90 from-10%"></div>
            <h5 className="title-32 font-semibold">{sector.title}</h5>
            <p className="global-transition line-clamp-2 lg:h-0 lg:opacity-0 group-hover:lg:h-[60px] group-hover:lg:opacity-100">
              {sector.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectorsSection;