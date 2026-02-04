import SectionContainer from '@/components/UI/SectionContainer';
import Image from 'next/image';
import Link from 'next/link';

const objectives = [
  {
    title: 'Find New Prospects',
    description: 'It should be easy to read the company\'s direction and name. Important details that you want to communicate to potential clients should be obvious and easy to remember.',
    icon: 'https://cdn.itegroupnews.com/search_f5d1ded325.png',
  },
  {
    title: 'Improve Existing Relationships',
    description: 'You need a spacious recreational area, negotiation tables, and an enclosed utility room where you will store/prepare coffee and snacks.',
    icon: 'https://cdn.itegroupnews.com/relationships_0b6f2d11f3.png',
  },
  {
    title: 'Conduct Meetings',
    description: 'Your stand should have an ideal meeting area. You can separate one "meeting room" from another or plan a couple of closed rooms where the exhibition atmosphere will not distract from the business conversation.',
    icon: 'https://cdn.itegroupnews.com/talk_3a4eb44859.png',
  },
  {
    title: 'Increase Brand Identity',
    description: 'An interesting stand design solution, supported by a high-quality demonstration of the best products will help.',
    icon: 'https://cdn.itegroupnews.com/branding_1_215a6597a0.png',
  },
  {
    title: 'Competitor Research',
    description: 'A small stand is enough, but it is worth placing it next to the business program sites to be in the thick of industry events.',
    icon: 'https://cdn.itegroupnews.com/competitive_analysis_03542a40bd.png',
  },
  {
    title: 'Showcase New Launches',
    description: 'An interesting and bright design solution, perhaps navigation in the hall, will help. The invitation and presentation schedule should be large, informative, and located in the most visible place.',
    icon: 'https://cdn.itegroupnews.com/new_5f9a05798a.png',
  },
];

export default function BusinessObjectives() {
  return (
    <section className="py-16 bg-gray-50">
      <SectionContainer>
        <div className="mb-12">
          <h2 className="title-72 text-black mb-4">Stands for your Business Objectives</h2>
          <p className="text-lg text-gray-600">Recommendations</p>
        </div>
        
        <div className="mb-12 h-px w-full bg-gray-200"></div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {objectives.map((objective, index) => (
            <div key={index} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">{objective.title}</h3>
                <img
                  src={objective.icon}
                  alt={objective.title}
                  width={40}
                  height={40}
                  className="size-10"
                />
              </div>
              <p className="text-gray-600">{objective.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="https://cdn.itegroupnews.com/ITE_Group_s_requirements_for_stand_construction_694a352e2e.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-mainColor2 px-10 py-3 font-jakarta text-[16px] font-semibold text-white transition-all duration-300 hover:bg-mainColor4">
              Stand Options & Requirements
            </button>
          </Link>
        </div>
      </SectionContainer>
    </section>
  );
}