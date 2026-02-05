'use client';

import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "When will TransRussia Summit take place?",
      answer: "October 19-21, 2026."
    },
    {
      id: 2,
      question: "Can I participate in TransRussia Summit online?",
      answer: "No. TransRussia Summit will be held offline at the Hyatt Regency Petrovsky Park Hotel."
    },
    {
      id: 3,
      question: "Will there be recordings of the business program?",
      answer: "No. However, delegates with 'Business' and 'VIP' ticket categories will be able to receive presentation materials. Materials are provided with speaker approval."
    },
    {
      id: 4,
      question: "Can I get a ticket refund?",
      answer: "Yes, but only within specified deadlines. Refund rules depend on how close the cancellation is to the event start date."
    },
    {
      id: 5,
      question: "Can I upgrade my ticket category?",
      answer: "Yes, you can upgrade your ticket category. We will issue a new or additional invoice."
    },
    {
      id: 6,
      question: "Can I pay for tickets by card?",
      answer: "Yes. Select the card payment option on the website under the 'Become a Delegate' section."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="text-6xl font-bold text-black mb-12 border-b border-black/20 pb-10">
            FAQ
          </h2>

          <div className="space-y-6">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={item.id} className="border-b border-black/20 pb-6 last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    {/* Question */}
                    <h4 className="text-3xl md:text-4xl font-semibold leading-snug flex-1 pr-6">
                      {item.question}
                    </h4>

                    {/* Icon */}
                    <span
                      className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-black' : 'rotate-0 text-gray-500'
                      }`}
                    >
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Answer - FIXED */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pb-4 pt-2">
                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;