import React from 'react';
import Link from 'next/link';

const BecomeDelegate = () => {
  const delegatePackages = [
    {
      id: 1,
      title: "BASIC",
      price: "75,000 RUB",
      features: [
        "Participation in the conference program",
        "Access to coffee breaks and lunches",
        "Access to the closed conference participants group",
        "Participation in the evening cocktail on October 20"
      ],
      cardLink: "/summit-basic-form/",
      invoiceLink: "/summit-invoice-form/"
    },
    {
      id: 2,
      title: "BUSINESS",
      price: "105,000 RUB",
      features: [
        "Participation in the conference program",
        "Access to coffee breaks and lunches",
        "Access to the closed conference participants group",
        "Participation in the evening cocktail on October 20",
        "Presentation materials",
        "Participation in the VIP reception on October 19"
      ],
      cardLink: "/summit-business-form/",
      invoiceLink: "/summit-invoice-form/"
    },
    {
      id: 3,
      title: "VIP",
      price: "135,000 RUB",
      features: [
        "Participation in the conference program",
        "Access to coffee breaks and lunches",
        "Access to the closed conference participants group",
        "Participation in the evening cocktail on October 20",
        "Presentation materials",
        "Participation in the VIP reception on October 19",
        "Seating in the VIP section with speakers",
        "Access to the VIP lounge with speakers",
        "Lunch in the VIP lounge",
        "Individual parking space",
        "Separate registration desk"
      ],
      cardLink: "/summit-vip-form/",
      invoiceLink: "/summit-invoice-form/"
    }
  ];

  return (
    <>
      {/* Section Header */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container">
            <h2 className="title-40 md:title-48 lg:title-72 text-black mb-6 md:mb-10">Become a Delegate</h2>
            <div className="rte-style text-sm md:text-base lg:text-lg">
              <p>Prices include VAT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container mt-10 md:mt-16 lg:mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {delegatePackages.map((pkg) => (
                <div key={pkg.id} className="relative flex size-full min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex-col bg-sky-50 p-4 md:p-6 lg:p-10">
                  <div className="relative z-10 flex flex-col gap-3 md:gap-5">
                    <h2 className="text-2xl md:text-3xl lg:title-40 font-semibold">{pkg.title}</h2>
                    
                    <ul className="space-y-2 md:space-y-3">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="mr-2 mt-1 flex-shrink-0"
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.6667 5L7.50004 14.1667L3.33337 10"
                              stroke="#003771"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-xs md:text-sm lg:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 md:pt-5">
                      <p className="text-xl md:text-2xl lg:text-35 font-bold mb-3 md:mb-5">{pkg.price}</p>
                      
                      <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
                        <Link href={pkg.cardLink} className="flex-1 min-w-[120px]">
                          <button className="w-full flex justify-center items-center group gap-2 overflow-hidden rounded-full bg-[#004D9F] px-4 py-2 md:px-6 md:py-3 font-jakarta text-xs md:text-sm font-semibold text-white transition-all hover:bg-mainColor4">
                            PAY BY CARD
                          </button>
                        </Link>
                        
                        <Link href={pkg.invoiceLink} className="flex-1 min-w-[120px]">
                          <button className="w-full flex justify-center items-center group gap-2 overflow-hidden rounded-full bg-[#004D9F] px-4 py-2 md:px-6 md:py-3 font-jakarta text-xs md:text-sm font-semibold text-white transition-all hover:bg-mainColor4">
                            PAY BY INVOICE
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeDelegate;