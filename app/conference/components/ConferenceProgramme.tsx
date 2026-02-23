import React from "react";
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
  const programData: DayProgram[] = [
  {
    day: "Day 1 Theme : Future-ready Manufacturing – Precision & Productivity",
    date: "Thursday, 20 November 2025",
    description: "",
    sessions: [
      {
        time: "09:00 – 09:35",
        title: "Registration & Hi Tea",
      },
      {
        time: "09:35 – 09:40",
        title: "Lamp Lighting",
      },
      {
        time: "09:40 – 09:45",
        title: "Welcome Address",
        speakers: [
          {
            name: "MD, Maxx Business Media Pvt. Ltd.",
            position: "Speaker",
          },
        ],
      },
      {
        time: "09:45 – 09:55",
        title: "Chief Guest Address",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "09:55 – 10:05",
        title: "Guest of Honour Address",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "10:05 – 10:15",
        title: "Guest of Honour Address",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "10:15 – 10:25",
        title: "Inaugural Keynote – India’s Roadmap for Advanced Manufacturing 2030",
      },
      {
        time: "10:25 – 10:30",
        title: "Vote of Thanks",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "10:30 – 11:30",
        title:
          "Panel Discussion : Digital Transformation in Die, Mould & Plastic Processing",
        topics: [
          { id: 1, title: "Integrating CAD/CAM, AI, IoT & Robotics" },
          { id: 2, title: "Digital twin applications for faster prototyping" },
          { id: 3, title: "Predictive maintenance in high-volume production" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "11:30 – 12:00",
        title:
          "Technical Session 1 : High-Performance Materials for Tooling & Moulding",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "12:00 – 12:30",
        title:
          "Technical Session 2 : Precision Machining for Complex Geometries",
        topics: [
          { id: 1, title: "High-speed milling, EDM, micro-machining" },
          { id: 2, title: "Accuracy & repeatability in mould inserts" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "12:30 – 13:00",
        title:
          "Fireside Chat : Designing for Fun and Safety: Mold Innovations in the Toy Industry",
        description:
          "Breakthroughs and challenges unique to toy mold design, including safety regulations, rapid product cycles, and creative flexibility.",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "13:00 – 14:00",
        title: "Networking Lunch",
      },
      {
        time: "14:00 – 14:30",
        title:
          "Technical Session 3 : Surface Finishing, Coatings & Wear Protection",
        topics: [
          { id: 1, title: "PVD, CVD, DLC coatings" },
          { id: 2, title: "Improving mould surface quality" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "14:30 – 15:30",
        title:
          "Panel Discussion : Automation & Industry 4.0 in Moulding and Tool Rooms",
        topics: [
          { id: 1, title: "Robotics in injection moulding" },
          { id: 2, title: "Lights-out manufacturing for tool shops" },
          { id: 3, title: "Reducing cycle times through smart automation" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "15:30 – 16:00",
        title: "Networking Hi Tea",
      },
      {
        time: "16:00 – 16:30",
        title:
          "Fireside Chat : AI, Simulation & Smart Manufacturing – Digitalizing the Mold Shop",
        topics: [
          { id: 1, title: "AI-driven mold flow and simulation for zero-defect molding" },
          { id: 2, title: "Digital twins & predictive maintenance in tool rooms" },
          { id: 3, title: "Knowledge-driven digital workflows" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "16:30 – 17:00",
        title:
          "Technical Session 4 : Design for Manufacturability (DFM) in Tooling & Plastic Parts",
        topics: [
          { id: 1, title: "Optimising part geometry for efficiency" },
          { id: 2, title: "Reducing rework & scrap" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "17:00 – 17:10",
        title: "Closing Remarks",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
    ],
  },

  {
    day: "Day 2 Theme : Sustainability & Innovation in Manufacturing",
    date: "Friday, 21 November 2025",
    description: "",
    sessions: [
      {
        time: "09:30 – 10:00",
        title: "Networking Hi Tea",
      },
      {
        time: "10:00 – 11:00",
        title:
          "Panel Discussion : Sustainable Materials & Circular Economy in Plastics",
        topics: [
          { id: 1, title: "Biodegradable polymers" },
          { id: 2, title: "Recycling technologies" },
          { id: 3, title: "Regulatory compliance & EPR norms" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "11:00 – 11:30",
        title:
          "Technical Session 5 : Conformal Cooling in Mould Design",
        topics: [
          { id: 1, title: "3D printing for optimised cooling channels" },
          { id: 2, title: "Energy savings & cycle time reduction" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "11:30 – 12:00",
        title:
          "Fireside Chat : Material Evolution: Navigating New Plastics and Sustainability Demands",
        description:
          "Recycled & high-performance polymers, global supply chains, and circular economy pilots across sectors.",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "12:00 – 12:30",
        title:
          "Technical Session 6 : Advanced Simulation & Flow Analysis",
        topics: [
          { id: 1, title: "Reducing warpage & shrinkage in moulded parts" },
          { id: 2, title: "Case studies from automotive & electronics" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "12:30 – 13:00",
        title:
          "Technical Session 7 : AI-Driven Process Optimisation in Moulding",
        topics: [
          { id: 1, title: "Data-driven cycle time reduction" },
          { id: 2, title: "Predictive defect prevention" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "13:00 – 14:00",
        title: "Networking Lunch",
      },
      {
        time: "14:00 – 15:00",
        title:
          "Panel Discussion : Global Trends in Die & Mould Manufacturing",
        topics: [
          { id: 1, title: "Competing with China & Europe" },
          { id: 2, title: "Export opportunities & standards compliance" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "15:00 – 15:30",
        title: "Networking Hi Tea",
      },
      {
        time: "15:30 – 16:00",
        title:
          "Fireside Chat : The Future is Collaborative: Cross-Industry Lessons in Mold Use",
        topics: [
          { id: 1, title: "Best practices in tooling partnerships" },
          { id: 2, title: "Open innovation across industries" },
          { id: 3, title: "Workforce & upskilling for converging technologies" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "16:00 – 16:30",
        title:
          "Technical Session 8 : Hot Runner vs Cold Runner Technologies",
        topics: [
          { id: 1, title: "Performance, cost & waste considerations" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "16:30 – 17:00",
        title:
          "Technical Session 9 : Automation in Quality Inspection",
        topics: [
          { id: 1, title: "CMM, laser scanning & AI-based defect detection" },
        ],
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
      {
        time: "17:00 – 17:10",
        title: "Closing Remarks",
        speakers: [{ name: "TBD", position: "Speaker" }],
      },
    ],
  },

  ];

  return (
    <SectionContainer bgColor="bg-white" className="">
      <div className="w-full">
        {/* Header */}
        <h1 className="text-6xl font-bold text-black mb-4">
          Program TransRussia Summit 2025
        </h1>
        
        {/* All Program Days */}
        <div className="space-y-20">
          {programData.map((dayProgram, dayIndex) => (
            <div key={dayIndex} className="border-t border-gray-300 pt-10">
              {/* Day Header */}
              <div className="mb-12">
                <p className="text-[#4D4D4D] text-xl mb-3">
                  {dayProgram.day} • {dayProgram.date}
                </p>
                <p className="text-[#4D4D4D] text-base italic">
                  {dayProgram.description}
                </p>
              </div>

              {/* Sessions for this day */}
              <div className="space-y-16">
                {dayProgram.sessions.map((session, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8"
                  >
                    {/* Time */}
                    <div className="text-[#4D4D4D] text-lg font-medium">
                      {session.time}
                    </div>

                    {/* Content */}
                    <div>
                      <h2 className="text-2xl font-bold text-black mb-6">
                        {session.title}
                      </h2>

                      {/* Description */}
                      {session.description && (
                        <p className="text-[#4D4D4D] text-lg mb-6">
                          {session.description}
                        </p>
                      )}

                      {/* Topics */}
                      {session.topics && (
                        <ul className="list-disc pl-6 space-y-3 text-[#4D4D4D] text-lg mb-8">
                          {session.topics.map((topic) => (
                            <li key={topic.id}>{topic.title}</li>
                          ))}
                        </ul>
                      )}

                      {/* Moderator */}
                      {session.moderator && (
                        <div className="mb-8">
                          <p className="font-bold text-black text-lg mb-1">Moderator:</p>
                          <p className="text-[#4D4D4D] text-lg">{session.moderator.name}</p>
                          <p className="text-[#4D4D4D] text-base">
                            {session.moderator.position}
                          </p>
                        </div>
                      )}

                      {/* Speakers - Only show label if there are multiple speakers */}
                      {session.speakers && session.speakers.length > 1 && (
                        <div className="mb-6">
                          <p className="font-bold text-black text-lg mb-3">Speakers:</p>
                          <div className="space-y-3">
                            {session.speakers.map((speaker, i) => (
                              <div key={i}>
                                <p className="text-[#4D4D4D] text-lg">{speaker.name}</p>
                                <p className="text-[#4D4D4D] text-base">
                                  {speaker.position}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Single Speaker (no "Speakers:" label) */}
                      {session.speakers && session.speakers.length === 1 && (
                        <div className="space-y-3">
                          {session.speakers.map((speaker, i) => (
                            <div key={i}>
                              <p className="text-[#4D4D4D] text-lg">{speaker.name}</p>
                              <p className="text-[#4D4D4D] text-base">
                                {speaker.position}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default TransRussiaSummitProgram;
