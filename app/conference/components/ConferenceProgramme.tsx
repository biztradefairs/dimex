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
          title: 'Inaugural Keynote – India’s Roadmap for Advanced Manufacturing 2030',
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
          title: 'Panel Discussion : Digital Transformation in Die, Mould & Plastic Processing',
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
          title: 'Technical Session 1 : High-Performance Materials for Tooling & Moulding',
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
          title: 'Technical Session 1 : High-Performance Materials for Tooling & Moulding',
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
          description: "•This session can cover breakthroughs and challenges unique to toy mold design, including safety regulations, rapid product cycles, and creative flexibility"
        },
        {
          time: "13:00 – 14:00",
          title: "Networking Lunch"
        },

{
          time: "14:00 – 14:30",
          title: 'Technical Session 3 : Surface Finishing, Coatings & Wear Protection"',
          description: "1. PVD, CVD, DLC coatings 2. Improving mould surface quality",
          speakers: [
            {
              name: "",
              position: ""
            }
          ],
        },

        {
          time: "14:30 – 15:30",
          title: 'Panel Discussion : Automation & Industry 4.0 in Moulding and Tool Rooms',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Robotics in injection moulding" },
            { id: 2, title: "Lights-out manufacturing for tool shops" },
            { id: 3, title: "Reducing cycle times through smart automation" },
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
          time: "15:30 – 16:00",
          title: "Networking Hi Tea"
        },
{
          time: "16:30 – 16:30",
          title: "Fireside Chat : AI, Simulation & Smart Manufacturing – Digitalizing the Mold Shop",
          description: "• AI-driven mold flow and simulation for zero-defect molding.• Use of digital twins & predictive maintenance in tool rooms • From manual know-how to knowledge-driven digital workflows"
        },
{
          time: "16:30 – 17:00",
          title: 'Technical Session 4 : Design for Manufacturability (DFM) in Tooling & Plastic Parts',
          description: "• Optimising part geometry for efficiency  • Reducing rework & scrap",
          speakers: [
            {
              name: "",
              position: ""
            }
          ],
        },
{
          time: "17:00 – 17:10",
          title: 'Closing Remarks"',
          speakers: [
            { name: "", position: "" },
                 ],
        },



      ],
    },
    {

      day: "Day 2 Theme : Sustainability & Innovation in Manufacturing",
      date: "October 9, 2026",
      description: "*For delegates of all categories",
      sessions: [
        {
          time: "09:30 – 10:00",
          title: "Registration & Hi Tea"
        },
                    {
          time: "10:00 – 11:00",
          title: 'Panel Discussion : Sustainable Materials & Circular Economy in Plastics',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Biodegradable polymers" },
            { id: 2, title: "Recycling technologies" },
            { id: 3, title: "Regulatory compliance & EPR norms" },
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
          time: "11:00 – 11:30",
          title: 'Technical Session 5 : Conformal Cooling in Mould Design',
          topics: [
            { id: 1, title: "3D printing for optimised cooling channels" },
            { id: 2, title: "Energy savings & cycle time reduction" },
                                 ],
          speakers: [
            {
              name: "",
              position: ""
            }
          ],
        },
        {
          time: "11:30 – 12:00",
          title: "Fireside Chat : Material Evolution: Navigating New Plastics and Sustainability Demands",
          description: "• Recycled and high-performance polymers for safety-critical and mass-market goods • Influence of global supply chains on material availability • Circular economy pilots: What works across sectors?."
        },
         {
          time: "12:00 – 12:30",
          title: 'Technical Session 6 : Advanced Simulation & Flow Analysis',
          topics: [
            { id: 1, title: "Reducing warpage & shrinkage in moulded parts" },
            { id: 2, title: "Case studies from automotive & electronics" },
                                 ],
          speakers: [
            {
              name: "",
              position: ""
            }
          ],
        },
           {
          time: "12:30 – 13:00",
          title: 'Technical Session 7 : AI-Driven Process Optimisation in Moulding',
          topics: [
            { id: 1, title: "Data-driven cycle time reduction" },
            { id: 2, title: "Predictive defect prevention" },
                                 ],
          speakers: [
            {
              name: "",
              position: ""
            }
          ],
        },
        
        {
          time: "13:00 – 14:00",
          title: "Networking Lunch"
        },


        {
          time: "14:00 – 15:00",
          title: 'Panel Discussion : Global Trends in Die & Mould Manufacturing',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Competing with China & Europe" },
            { id: 2, title: "Export opportunities & standards compliance" },
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
          time: "15:00 – 15:30",
          title: "Networking Hi Tea"
        },
{
          time: "15:30 – 16:00",
          title: "Fireside Chat : The Future is Collaborative: Cross-Industry Lessons in Mold Use",
          description: "• Best practices in tooling partnerships.• Open innovation: When an idea from medical is adopted in aerospace, etc. • Workforce and upskilling for converging technologies."
        },
{
          time: "16:00 – 16:30",
          title: 'Technical Session 8 : Hot Runner vs Cold Runner Technologies',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "Performance, cost & waste considerations" },
            
                          ],
          moderator: {
            name: "",
            position: "",
          },
          speakers: [
            { name: "", position: "" },
     
          ],
        },


        {
          time: "16:30 – 17:00",
          title: 'Technical Session 9 : Automation in Quality Inspection',
          description: "Session Topics:",
          topics: [
            { id: 1, title: "CMM, laser scanning & AI-based defect detection" },
            
                          ],
          moderator: {
            name: "",
            position: "",
          },
          speakers: [
            { name: "", position: "" },
         
       
          ],
        },
{
          time: "17:00 – 17:10",
          title: 'Closing Remarks"',
          speakers: [
            { name: "", position: "" },
                 ],
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
