import React from 'react';
import SectionContainer from '@/components/UI/SectionContainer';

const MapSection = () => {
  return (
    <SectionContainer className="py-16 lg:py-24">
      
      <h2 className="text-3xl lg:text-4xl font-bold mb-12">
        Here's Where You Can Find Us!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Venue */}
        <div className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">
            Venue
          </h3>
          <p className="text-gray-800 font-medium text-lg">
            Auto Cluster Exhibition Centre, Pune, India
          </p>
        </div>

        {/* Opening Hours */}
        <div className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">
            Opening Hours
          </h3>
          <p className="text-gray-800 font-medium text-lg">
            08–10 October 2026, 10:00 – 18:00
          </p>
        </div>
      </div>

      {/* Map */}
      <div className="bg-gray-200 rounded-xl h-64 lg:h-80 overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4651.861093715675!2d73.79904587592934!3d18.638844465549226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84992d04bbd%3A0x9f1c44fb853ba461!2sAuto%20Cluster%20Exhibition%20Center%2C%20Chinchwad%2C%20Pune!5e1!3m2!1sen!2sin!4v1768825009655!5m2!1sen!2sin"
        />
      </div>

    </SectionContainer>
  );
};

export default MapSection;
