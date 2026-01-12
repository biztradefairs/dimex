import React from 'react';

const MapSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12">Here's Where You Can Find Us!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Venue */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Venue</h3>
            <p className="text-gray-800 font-medium text-lg">Rosaski, Moscov, Crocus Expo IEC, Pavilion 3</p>
          </div>

          {/* Opening Hours */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Opening Hours</h3>
            <p className="text-gray-800 font-medium text-lg">12-16 March 2026, 10:00 -18:00</p>
            <p className="text-gray-800 font-medium text-lg">19 March 2026, 10:00 -18:00</p>
          </div>
        </div>

        {/* Map */}
        <div className="bg-gray-200 rounded-lg h-64 lg:h-80 overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.8743484199996!2d37.51654!3d55.61139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53a9e6c8c1111%3A0x1234567890ab!2sCrocus%20Expo%2C%20Moscow!5e0!3m2!1sen!2sru"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;