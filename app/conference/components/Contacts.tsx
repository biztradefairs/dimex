import React from 'react';
import Image from 'next/image';

const Contacts = () => {
  return (
    <div className="animated-block">
      <div className="animated-block-target">
        <div className="container flex flex-col items-start gap-5 py-10 text-black">
          <h2 className="title-72 text-black mb-5">Contacts</h2>
          <div className="grid w-full gap-5 lg:grid-cols-2">
            
            {/* First Contact */}
            <div className="rounded-xl bg-mainColor5 p-5">
              <div className="rte-style">
                <p className="text-27 font-bold">
                  For participation and partnership inquiries:
                </p>
                <div className="mt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-1/5 min-w-[80px]">
                      <img
                        src="https://regional-cdn.itegroupnews.com/Irina_Kachalova_d1d70a6546.png"
                        alt="Irina Kachalova"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-27 font-bold">Irina Kachalova</p>
                      <p className="text-mainColor6 font-proxima text-27">
                        Conference Sales Director
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <a 
                    href="mailto:Irina.Kachalova@ite.group"
                    className="block text-27 font-bold hover:text-mainColor2 transition-colors"
                  >
                    Irina.Kachalova@ite.group
                  </a>
                  <a 
                    href="tel:+74951363984"
                    className="block text-27 font-bold hover:text-mainColor2 transition-colors"
                  >
                    +7 (495) 136-39-84
                  </a>
                  <a 
                    href="tel:+79684435122"
                    className="block text-27 font-bold hover:text-mainColor2 transition-colors"
                  >
                    +7 (968) 443-51-22
                  </a>
                </div>
              </div>
            </div>

            {/* Second Contact */}
            <div className="rounded-xl bg-mainColor5 p-5">
              <div className="rte-style">
                <p className="text-27 font-bold">
                  For speaking opportunities in the business program:
                </p>
                <div className="mt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-1/5 min-w-[80px]">
                      <img
                        src="https://regional-cdn.itegroupnews.com/20250714_140451615_i_OS_1_38486b167f.jpg"
                        alt="Olga Senicheva"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-27 font-bold">Olga Senicheva</p>
                      <p className="text-mainColor6 font-proxima text-27">
                        TransRussia Summit Project Manager
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <a 
                    href="mailto:Olga.Senicheva@ite.group"
                    className="block text-27 font-bold hover:text-mainColor2 transition-colors"
                  >
                    Olga.Senicheva@ite.group
                  </a>
                  <a 
                    href="tel:+79256501379"
                    className="block text-27 font-bold hover:text-mainColor2 transition-colors"
                  >
                    +7 925 650-13-79
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;