import React from 'react';
import Image from 'next/image';

const ConnectSection = () => {
  return (
    <div className="relative z-[1] overflow-hidden bg-mainColor1 text-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div className="grid gap-0 lg:grid-cols-3 lg:gap-20">
          <div className="flex flex-col gap-5 py-10 lg:col-span-2 lg:py-32">
            <h2 className="text-4xl lg:text-6xl font-bold text-white">TransRussia Connect</h2>
            <p className="whitespace-pre-line text-lg">
              TransRussia Connect is a community platform designed for business networking between exhibitors, visitors from Eurasia and abroad, media, professional associations, and industry experts.

              Easily scan badges to exchange contact info—no business cards needed. All data is stored in one place for seamless access.

              It's free! Download via QR code and start connecting.
            </p>
          </div>
          <div className="flex-center relative z-[-1] my-10 h-[450px] lg:h-[450px]">
            <Image 
              src="/Untitled_design_92_3f5e8a1454.png" 
              alt="TransRussia Connect" 
              width={500}
              height={500}
              className="size-auto"
            />
            <div className="circles flex-center absolute z-[-1] aspect-square w-full scale-150">
              <div className="absolute size-full rounded-full bg-mainColor2 opacity-30"></div>
              <div className="absolute size-2/3 rounded-full bg-mainColor2 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;