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
                    time: "09:45 – 9:55",
          title: 'Chief Guest Address"',
                   
          speakers: [
        {
              name: "",
              position: "",
            },
              ],
        },
 {
                    time: "09:55 – 10:05",
          title: 'Guest of Honour Address"',
                   
          speakers: [
        {
              name: "",
              position: "",
            },
              ],
        },

         {
                    time: "10:05 – 10:15",
          title: 'Guest of Honour Address"',
                   
          speakers: [
        {
              name: "",
              position: "",
            },
              ],
        },
      
        {
          time: "10:15 – 10:25",
          title: 'Inaugural Keynote – India’s Roadmap for Advanced Manufacturing 2030"',
          speakers: [
            { name: "", position: "" },
                 ],
        },

        {
          time: "10:25 – 10:30",
          title: 'Vote of Thanks"',
          speakers: [
            { name: "Director", position: "Maxx Business Media Pvt.Ltd.," },
                 ],
        },
            {
          time: "10:30 – 11:30",
          title: 'Panel Discussion : Digital Transformation in Die, Mould & Plastic Processing"',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Integrating CAD/CAM, AI, IoT & Robotics" },
            { id: 2, title: "Digital twin applications for faster prototyping" },
            { id: 3, title: "Predictive maintenance in high-volume production" },
                     ],
          moderator: {
            name: "",
            position: "",
          },
          speakers: [
            { name: "", position: "" },
            { name: "", position: "" },
            { name: "", position: "" },
            { name: "", position: "" },
       
          ],
        },
               {
          time: "11:30 – 12:00",
          title: 'Technical Session 1 : High-Performance Materials for Tooling & Moulding"',
          description: "",
          speakers: [
            {
              name: "",
              position: ""
            }
          ],
        },
        {
          time: "12:00 – 12:30",
          title: "Technical Session 2 : Precision Machining for Complex Geometries",
          description: "• High-speed milling, EDM, micro-machining • Accuracy & repeatability in mould inserts"
        },
         {
          time: "11:30 – 12:00",
          title: 'Technical Session 1 : High-Performance Materials for Tooling & Moulding"',
          description: "",
          speakers: [
            {
              name: "",
              position: ""
            }
          ],
        },
        {
          time: "12:30 – 13:00",
          title: "Fireside Chat : Designing for Fun and Safety: Mold Innovations in the Toy Industry",
          description: "• This session can cover breakthroughs and challenges unique to toy mold design, • tability in mould inserts"
        },
        {
          time: "13:00 – 14:00",
          title: "Networking Lunch"
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
