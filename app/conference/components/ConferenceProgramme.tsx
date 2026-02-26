"use client";

import React, { useState } from "react";
import SectionContainer from "@/components/UI/SectionContainer";

interface SessionTopic {
  id: number;
  title: string;
}

interface Speaker {
  name: string;
  position: string;
}

interface Session {
  time: string;
  title: string;
  description?: string;
  moderator?: Speaker;
  speakers?: Speaker[];
  topics?: SessionTopic[];
}

interface DayProgram {
  day: string;
  date: string;
  description: string;
  sessions: Session[];
}

const TransRussiaSummitProgram: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const programData: DayProgram[] = [
    // {
    //   day: "VIP Reception",
    //   date: "October 08, 2026",
    //   description: "*Only for Exhibitors,Speakers,VIP's and Delegates",
    //   sessions: [
    //     {
    //       time: "18:00 – 21:00",
    //       title: "DIEMEX VIP RECEPTION",
    //       description: "A special event at the Auto Cluter Exhibition Centre, Pune"
    //     }
    //   ]
    // },
    {
      day: "Day 1 Theme : Future-ready Manufacturing – Precision & Productivity",
      date: "October 08, 2026",
      description: "*For delegates",
      sessions: [
        {
          time: "09:00 – 09:35",
          title: "Registration & Hi Tea"
        },
        {
          time: "09:35 – 09:40",
          title: "Lamp Lighting"
        },
                {
                    time: "09:40 – 9:45",
          title: 'Welcome Address"',
                   
          speakers: [
        {
              name: "Mr. Padmanabham R",
              position: "MD Maxx Business Media Pvt.Ltd.,",
            },
              ],
        },
        {
          time: "11:30 – 12:00",
          title: "Break"
        },
        {
          time: "12:00 – 13:45",
          title: 'PLENARY SESSION OF THE LARGEST CARGO OWNERS "LOGISTICS MANAGEMENT STRATEGY IN THE CONTEXT OF GEOPOLITICAL AND ECONOMIC CHANGES"',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Strategic Navigation: Russia's Logistics in the New Macro-Reality" },
            { id: 2, title: "Operational management of the transport and logistics function in modern realities: the company's goals for the next 3 years" },
            { id: 3, title: "Logistics Budgeting Strategies: Current Financial Sustainability Models" },
            { id: 4, title: "International Logistics: Risk Management When Working with Foreign Players" },
            { id: 5, title: "Complex logistics during turbulent times: access to specialized transport, rising insurance rates, and legal restrictions" },
            { id: 6, title: "Infrastructure and Equipment Shortages: Strategies for Managing Limited Resources" },
            { id: 7, title: "Digital Transformation of Logistics: From Rhetoric to ROI" },
            { id: 8, title: "Effective HR policies: finding and retaining qualified personnel in the context of the transformation of professional competencies" },
          ],
          moderator: {
            name: "Mikhail Bazhenov",
            position: "Partner, Head of Business Consulting Practice, TRUST TECHNOLOGIES",
          },
          speakers: [
            { name: "Dmitry Yalov", position: "Head of the Project Office of the National Center for Testing and Manufacturing of Products" },
            { name: "Fyodor Pavlovsky", position: "Deputy General Director and Director of Supply Chain and Logistics at Magnit, member of the company's management board" },
            { name: "Igor Kudryavtsev", position: "Managing Director of Logistics at SIBUR" },
            { name: "Vasily Berezhnoy", position: "Director of Transport Logistics at EFKO" },
            { name: "Alexander Pistun", position: "Director of the Logistics Department at MTS" },
            { name: "Anna Buzova", position: "Vice President of Procurement and Logistics at MILK LOGIC (ex. DANONE)" },
            { name: "Marat Avetisov", position: "Director of Logistics at SIBUR" },
            { name: "Ilya Ilyin", position: "Head of the Banking and Financial Markets Analysis Department at the Center for Analysis and Expertise at PSB" },
          ],
        },
        {
          time: "13:45 – 14:00",
          title: "Q&A SESSION"
        },
        {
          time: "14:00 – 15:00",
          title: "Dinner"
        },
        {
          time: "15:00 – 16:30",
          title: 'PANEL SESSION: "TRANSPARENCY, PREDICTABILITY, AUTOMATION: DIGITAL PRIORITIES FOR SHIPPERS"',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Online transportation contracting: route selection, price negotiation, deal making" },
            { id: 2, title: "Electronic document management (EDM), including electronic shipping documents recognized by third parties, smart contracts" },
            { id: 3, title: "Cargo movement traceability" },
            { id: 4, title: "A unified environment for data exchange between transport participants: a single window, interaction with government agencies, import and export" },
            { id: 5, title: "The Applicability of Latest AI Tools for Shippers" },
            { id: 6, title: "Other digital services that are important to shippers" },
          ],
          moderator: {
            name: "Anton Tochin",
            position: "Director, KEPT Strategic Consulting and Transformation Group",
          },
          speakers: [
            { name: "Polina Davydova", position: "Director of the DIGITAL TRANSPORT AND LOGISTICS Association" },
            { name: "Alexander Pistun", position: "Director of the Logistics Department at MTS" },
            { name: "Mikhail Platonov", position: "Senior Director of the Supply Chain Management and Planning Platform at PEPSIKO" },
            { name: "Elena Ermakova", position: "Deputy General Director for Commercial Activities at MOSCOW CARGO" },
            { name: "Elena Kondratva", position: "Development Director at FESCO" },
            { name: "Dmitry Udaltsov", position: "Department of Logistics and Foreign Economic Activity, Head of the Transport Logistics Group at BIOCAD" },
            { name: "Maria Popova", position: "General Director at WEVED" },
            { name: "Anton Shevchenko", position: "Head of Development of the EPD Division at SKB KONTUR" },
          ],
        },
        {
          time: "16:30 – 16:45",
          title: "Break"
        },
        {
          time: "16:45 – 17:30",
          title: 'FORESIGHT VISION "THE FUTURE OF LOGISTICS: SCENARIOS, RISKS, AND OPPORTUNITIES FOR GROWTH"',
          description: "Global and national trends shaping the logistics of the future: a 360-degree look at opportunities and threats through the lens of global foresight and big data analysis",
          speakers: [
            {
              name: "Alexander Chulok",
              position: "Russian forecaster, international foresight expert at the United Nations Development Programme, Doctor of Economics, professor, and director of the Center for Scientific and Technological Forecasting at the ISSEK, National Research University Higher School of Economics"
            }
          ],
        },
        {
          time: "17:30 – 19:00",
          title: "Evening cocktail: an informal gathering to wrap up the day",
          description: "• Networking with leaders in the logistics industry • Prize draw from summit partners • Exclusive gifts from a special speaker with an autograph • Delicious buffet and live music"
        },
      ],
    },
    {
      day: "Day 2 Theme : Sustainability & Innovation in Manufacturing",
      date: "October 9, 2026",
      description: "*For delegates of all categories",
      sessions: [
        {
          time: "09:00 – 10:00",
          title: "Welcome coffee"
        },
        {
          time: "10:00 – 11:00",
          title: "HOW TO TURN ANY CONTACT INTO A LONG-TERM PARTNERSHIP",
          description: "Topics of the speech:",
          topics: [
            { id: 1, title: "Strategic approach to working with people: intelligence methods" },
            { id: 2, title: "Ways to reach key business players" },
            { id: 3, title: "Customer acquisition and retention" },
            { id: 4, title: "Ability to understand and convince any person" },
            { id: 5, title: "Techniques for conducting successful negotiations" },
            { id: 6, title: "Master professional networking skills for business success!" },
          ],
          speakers: [
            {
              name: "Elena Vavilova",
              position: "retired colonel of the Foreign Intelligence Service, expert on interpersonal communication"
            }
          ],
        },
        {
          time: "11:00 – 11:30",
          title: "Break"
        },
        {
          time: "11:30 – 13:00",
          title: 'PANEL SESSION FOR LEADERS OF ONLINE STORES AND MARKETPLACES "E-COM LOGISTICS: BALANCE BETWEEN OPERATIONAL EFFICIENCY AND CUSTOMER EXPERIENCE"',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "The Evolution of E-Commerce Logistics: Trends and Forecasts for 2026" },
            { id: 2, title: "Optimizing Delivery Speed and Cost: Digital and Technological Solutions" },
            { id: 3, title: "Supply Chain Risk Management: From Losses to Returns" },
            { id: 4, title: "Business Resilience During Growth: Effective Operational Process Strategies" },
            { id: 5, title: "Last Mile Economy: Balancing Price and Service" },
            { id: 6, title: "Premium service in logistics: who is willing to pay for it?" },
          ],
          moderator: {
            name: "Ekaterina Antsiferova",
            position: "Deputy General Director for Commerce, DALLI Delivery Service",
          },
          speakers: [
            { name: "Anastasia Sorokoumova", position: "Director of Logistics at PODRUZHKA" },
            { name: "Alexey Nikonov", position: "Founder of the BRENDOSS Furniture Factory" },
            { name: "Maria Trifonova", position: "Head of B2B at LAMODA" },
            { name: "Sergey Manukyan", position: "Founder of the BUREAU MODERN RETAIL PROJECT" },
            { name: "Vadim Kuzmin", position: "Head of the E-Commerce Department at HTS RUSSIA" },
            { name: "Oleg Proposhin", position: "General Director of MPZ BOGORODSKY LLC, OKRAINA TM" },
            { name: "Alexander Semenov", position: "Senior Client Manager, Development Department at YANDEX ROUTING" },
          ],
        },
        {
          time: "13:00 – 14:00",
          title: "Dinner"
        },
        {
          time: "14:00 – 15:30",
          title: 'LOGISTICS DIRECTORS PANEL SESSION "WAREHOUSE AS AN ASSET: SOLUTIONS IN THE EVENT OF A SHORTAGE OF WAREHOUSE SPACE"',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Russian Warehouse Real Estate Market, Q3 2025 Results. Observed Market Trends" },
            { id: 2, title: "Investing in warehouse real estate: the right strategy or a necessary measure?" },
            { id: 3, title: "How has the role of the warehouse in the supply chain of cargo owners changed in the current market conditions?" },
            { id: 4, title: "Shortage of quality premises: scaling strategies and alternative models" },
            { id: 5, title: "Optimizing Inventory Management: How Accurate Forecasting Can Reduce Warehouse Space Needs" },
          ],
          moderator: {
            name: "Alexander Perfiliev",
            position: "Partner and Director of the Warehouse and Industrial Real Estate Department at INVEST7, author of the @Skladexpert Telegram channel",
          },
          speakers: [
            { name: "Viktor Afanasenko", position: "Regional Director of the Warehouse and Industrial Real Estate Department at Nikoliers" },
            { name: "Ruslan Yashkanov", position: "Federal Logistics Manager at DNS" },
            { name: "Alexander Shultz", position: "Director of Logistics at PETROVICH" },
            { name: "Sergey Vereshchagin", position: "General Director of LogLab Group" },
            { name: "Alexander Shamaev", position: "Head of Development and Projects at ASCON" },
            { name: "Natalia Khazova", position: "Director of Procurement and Logistics at SYMRISE" },
          ],
        },
        {
          time: "15:30 – 16:00",
          title: "Break"
        },
        {
          time: "16:00 – 17:30",
          title: 'PANEL SESSION FOR LOGISTICS DIRECTORS OF RETAIL COMPANIES "LOGISTICS MANAGEMENT IN RETAIL: STRATEGIES, TECHNOLOGIES, EFFICIENCY"',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "How can retailers balance cost and reliability in the face of rising tariffs?" },
            { id: 2, title: "Which technological solutions (AI, WMS, TMS) provide the greatest impact in optimizing supply chains?" },
            { id: 3, title: "How to build partnerships with suppliers to reduce risks?" },
            { id: 4, title: "Fulfillment as a Service for Retail: Is It Worth Outsourcing Key Operations?" },
            { id: 5, title: "How to measure the ROI of digital transformation in logistics?" },
            { id: 6, title: "How to Avoid Empty Shelves Due to Labeling Errors: Best Practices" },
            { id: 7, title: "How to choose and compare forecasting, planning, and promotional tools for large chains?" },
          ],
          moderator: {
            name: "Igor Shatsky",
            position: "Director of Logistics at O'KEY",
          },
          speakers: [
            { name: "Denis Gurov", position: "Director of the Logistics Department, DETSKY MIR" },
            { name: "Mikhail Smirnov", position: "Director of the Logistics Department, BEELINE" },
            { name: "Alexey Kazennov", position: "Director of Integrated Planning, HOFF" },
            { name: "Denis Shashkov", position: "Head of Supplier Development and Supply Chain Management, AUCHAN" },
            { name: "Olga Tolmacheva", position: "Head of the Operational Logistics Division, METRO" },
          ],
        },
        {
          time: "17:30 – 18:30",
          title: "Networking over a glass of sparkling wine"
        },
      ],
    },
  ];

const selectedDay = programData[activeDay];

  return (
    <SectionContainer bgColor="bg-white">
      <div className="w-full">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-black mb-10">
          Driving Precision, Performance & Sustainability in Tooling and Plastics
        </h1>

        {/* Day Toggle Buttons */}
        <div className="flex gap-6 mb-16">
          {programData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300
                ${
                  activeDay === index
                    ? "bg-[#0B3B75] text-white"
                    : "bg-[#1E63B5] text-white hover:opacity-90"
                }
              `}
            >
              {day.date.replace("Thursday, ", "").replace("Friday, ", "")}
            </button>
          ))}
        </div>

        {/* Selected Day Content */}
        <div className="border-t border-gray-300 pt-10">

          {/* Day Header */}
          <div className="mb-12">
            <p className="text-[#4D4D4D] font-semibold text-2xl mb-3">
              {selectedDay.day} • {selectedDay.date}
            </p>
          </div>

          {/* Sessions */}
          <div className="space-y-14">
            {selectedDay.sessions.map((session, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8"
              >
                {/* Time */}
                <div className="text-[#4D4D4D] text-lg font-medium">
                  {session.time}
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-2xl font-bold text-black mb-4">
                    {session.title}
                  </h2>

                  {session.description && (
                    <p className="text-[#4D4D4D] text-lg mb-4">
                      {session.description}
                    </p>
                  )}

                  {session.topics && (
                    <ul className="list-disc pl-6 space-y-2 text-[#4D4D4D] text-lg mb-4">
                      {session.topics.map((topic) => (
                        <li key={topic.id}>{topic.title}</li>
                      ))}
                    </ul>
                  )}

                  {session.speakers && (
                    <div className="space-y-2">
                      {session.speakers.map((speaker, i) => (
                        <div key={i}>
                          <p className="text-[#4D4D4D] text-base">
                            {speaker.position}
                          </p>
                          <p className="text-[#4D4D4D] text-lg">{speaker.name}</p>
                          
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SectionContainer>
  );
};

export default TransRussiaSummitProgram;
