import React from 'react';
import Link from 'next/link';

const BecomeDelegate = () => {
  const delegatePackages = [
    {
      id: 1,
      title: "Student",
      price: "₹ 3,500",
      features: [
        "Access to all technical conference sessions",
      "Entry to exhibition area (all 3 days)",
      "Interaction with industry experts & speakers",
      "Certificate of Participation",
      "Career guidance & mentorship interaction",
      "Internship & placement opportunity connect",
      "Digital access to conference presentation summaries",
      "Lunch & refreshments",
      ],
      cardLink: "/became-delegate",
      invoiceLink: "/summit-invoice-form/"
    },
    {
      id: 1,
      title: "General",
      price: "₹ 6,000",
      features: [
        "Full access to all conference sessions",
        "Priority seating in technical sessions",
        "Entry to exhibition area (all 3 days)",
        "Conference kit (Badge, Folder, Notepad, Pen)",
        "Access to networking lunch & tea breaks",
        "B2B networking opportunity",
        "Access to speakers’ presentation (digital copy post event)",
        "Certificate of Participation",
        "Entry to Business Networking Meet",
        "Access to post-event report & industry insights summary",
      ],
      cardLink: "/became-delegate",
      invoiceLink: "/summit-invoice-form/"
    },
    {
      id: 3,
      title: "GROUP of 3",
      price: "₹ 15,000",
      features: [
        "Full conference access (all sessions)",
"Exhibition entry (all 3 days)Reserved group seating",
"Company name recognition on delegate list",
"Access to networking lunch & tea breaks",
"Digital presentations access",
"Participation certificates for all 3",
"Group networking badge recognition",
"One complimentary company profile mention in delegate e-book",
"Priority B2B meeting assistance (pre-scheduled on request)",
      ],
      cardLink: "/became-delegate",
      invoiceLink: "/summit-invoice-form/"
    }
  ]; // ✅ ARRAY CLOSED HERE

  return (
    <>
      {/* Section Header */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold text-black mb-6 md:mb-10">
  Become a Delegate
</h2>
    <div className="w-full text-3xl text-gray-600 font-semibold">
  <p>Prices include GST</p>
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
                <div
                  key={pkg.id}
                  className="relative flex size-full min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex-col bg-sky-50 p-4 md:p-6 lg:p-10"
                >
                  <div className="relative z-10 flex flex-col gap-3 md:gap-5">
                    <h2 className="text-2xl md:text-3xl lg:title-40 font-semibold">
                      {pkg.title}
                    </h2>

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
                          <span className="text-xs md:text-sm lg:text-base">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 md:pt-5">
                      <p className="text-xl md:text-2xl lg:text-35 font-bold mb-3 md:mb-5">
                        {pkg.price}
                      </p>

                      <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3">
                        <Link href={pkg.cardLink} className="flex-1 min-w-[120px]">
                          <button className="w-full rounded-full bg-[#004D9F] px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-white transition-all hover:bg-mainColor4">
                            Register
                          </button>
                        </Link>

                        {/* <Link href={pkg.invoiceLink} className="flex-1 min-w-[120px]">
                          <button className="w-full rounded-full bg-[#004D9F] px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-white transition-all hover:bg-mainColor4">
                            PAY BY INVOICE
                          </button>
                        </Link> */}
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
