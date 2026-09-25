// app/terms-of-visiting/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionContainer from "@/components/UI/SectionContainer";

// Types
interface Partner {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

interface DynamicBlockData {
  id: string;
  Title: string | null;
  Content: string | null;
  Button1?: {
    Text: string;
    Theme: string;
    LinkTo: string;
    Target: string;
  } | null;
  Button2?: any;
  Image?: {
    data: {
      attributes: {
        url: string;
      };
    } | null;
  };
  BackgroundColor?: string;
}

interface DynamicTextBlock {
  __typename: string;
  DynamicTextBlockTitle: string | null;
  DynamicTextBlockColumns: string;
  DynamicTextBlockData: DynamicBlockData[];
}

// Mock Data (in a real app, this would come from an API)
const termsOfVisitingPageData = {
  hero: {
    title: "Before you visit...",
    description:
      "Find all the important information, guidelines, and terms you need before attending DIEMEX 2026 – International Die & Mould Expo.",
  },
  blocks: [
    {
      __typename: "ComponentSharedDynamicTextBlock",
      DynamicTextBlockTitle: null,
      DynamicTextBlockColumns: "One",
      DynamicTextBlockData: [
        {
          id: "614",
          Title: "Terms of Visiting",
          Content: `
            <p>VISITING RULES APPLICABLE TO THE EVENTS ORGANIZED BY MAXX BUSINESS MEDIA PVT. LTD.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>These visiting rules outline the guidelines for admission and conduct of visitors attending DIEMEX 2026 – International Die & Mould Expo. All visitors are required to read and comply with these terms while attending the exhibition.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>1. INTRODUCTION</p>
            <p>&nbsp;</p>
            <p>1.1. These rules define the procedures for admission and conduct of visitors at DIEMEX 2026, organized by Maxx Business Media Pvt. Ltd. (hereinafter referred to as the “Organizer”).</p>
            <p>&nbsp;</p>
            <p>1.2. Entry to the exhibition is permitted only after visitors have read and accepted these visiting rules.</p>
            <p>&nbsp;</p>
            <p>1.3. Visitors must also follow the rules and regulations of the exhibition venue management where the event is held.</p>
            <p>&nbsp;</p>
            <p>2. ADMISSION TO EVENTS</p>
            <p>&nbsp;</p>
            <p>2.1. All visitors must possess a valid visitor badge to enter the exhibition premises.</p>
            <p>&nbsp;</p>
            <p>2.2. Visitor badges can be obtained through the following methods:</p>
            <p>&nbsp;</p>
            <p>2.3.1. Online Registration: Visitors who register on the official DIEMEX website can download or print their badge.;</p>
            <p>&nbsp;</p>
            <p>2.3.2. On-site Registration: Visitors may register at the registration counters at the venue and receive their badge.</p>
            <p>&nbsp;</p>
            <p>2.3.The badge will contain the visitor’s name and organization details and must be worn visibly at all times inside the exhibition halls.</p>
            <p>&nbsp;</p>
            <p>2.4. Media representatives must complete the official media accreditation process prior to attending the event.</p>
            <p>&nbsp;</p>
            <p>2.5. Students from relevant technical institutions may be allowed entry subject to prior approval from the organizer and must be accompanied by a faculty representative.</p>
            <p>&nbsp;</p>
            <p>2.6. Visitors must scan their badge at the entry gates to access the exhibition halls.</p>
            <p>&nbsp;</p>
            <p>2.7. Badges are non-transferable and must not be shared with other individuals.</p>
            <p>&nbsp;</p>
            <p>2.8. Lost badges should be reported immediately at the registration help desk for replacement.</p>
            <p>&nbsp;</p>
            <p>3. AGE RESTRICTIONS</p>
            <p>&nbsp;</p>
            <p>3.1. Visitors under the age of 18 years may enter the exhibition only when accompanied by an adult.</p>
            <p>&nbsp;</p>
            <p>3.2. Certain conferences or business sessions may apply age restrictions where required.</p>
            <p>&nbsp;</p>
            <p>3.3. The organizer reserves the right to request valid identification proof to verify age when necessary.</p>
            <p>&nbsp;</p>
            <p>4. RULES OF CONDUCT</p>
            <p>&nbsp;</p>
            <p>4.1. Visitors attending DIEMEX 2026 are expected to maintain professional behavior at all times.</p>
            <p>&nbsp;</p>
            <p>4.2. Visitors are not permitted to:</p>
            <p>&nbsp;</p>
            <p>4.2.1. To bring weapons, hazardous materials, or flammable substances into the venue;</p>
            <p>&nbsp;</p>
            <p>4.2.2. To bring or consume alcohol, narcotics, or illegal substances within the exhibition premises.;</p>
            <p>&nbsp;</p>
            <p>4.2.3. To bring and consume alcoholic beverages, narcotic and psychotropic substances within the premises where the Event is held, as well as to attend the Event being intoxicated by alcohol, drugs or toxic substances;</p>
            <p>&nbsp;</p>
            <p>4.2.4. To enter the exhibition halls while intoxicated;</p>
            <p>&nbsp;</p>
            <p>4.2.5. To bring animals or pets into the venue;</p>
            <p>&nbsp;</p>
            <p>4.2.6. To bring outside food or beverages unless permitted by the venue;</p>
            <p>&nbsp;</p>
            <p>4.2.7. To distribute promotional materials, flyers, or advertisements without written permission from the organizer;</p>
            <p>&nbsp;</p>
            <p>4.2.8. To conduct unauthorized promotions, demonstrations, or marketing activities;</p>
            <p>&nbsp;</p>
            <p>4.2.9. To damage exhibition property, displays, or equipment;</p>
            <p>&nbsp;</p>
            <p>4.2.10. To litter or create disturbances inside the venue;</p>
            <p>&nbsp;</p>
            <p>4.2.11. To smoke within exhibition halls except in designated smoking areas;</p>
            <p>&nbsp;</p>
            <p>4.2.12. Follow instructions from event staff, security personnel, and venue management;</p>
            <p>&nbsp;</p>
            <p>4.2.13. Report any suspicious activity or unattended items to event officials immediately;</p>
            <p>&nbsp;</p>
            <p>4.2.14. Follow all safety and emergency procedures if required;</p>
           
            <p>&nbsp;</p>
            <p>5. LIABILITY</p>
            <p>&nbsp;</p>
            <p>5.1. The organizer reserves the right to deny entry or remove visitors from the exhibition premises without refund if they:</p>
            <p>&nbsp;</p>
            <p>5.1.1. Do not possess a valid visitor badge;</p>
            <p>&nbsp;</p>
            <p>5.1.2. Refuse security checks or inspections;</p>
            <p>&nbsp;</p>
            <p>5.1.3. Attempt to bring prohibited items into the venue;</p>
            <p>&nbsp;</p>
            <p>5.1.4. Violate event rules or disrupt public order;</p>
            <p>&nbsp;</p>
                      
            <p>5.2. Visitors involved in unlawful activities may be reported to law enforcement authorities.</p>
            <p>&nbsp;</p>
            <p>5.3. Any damage caused to the property of the organizer, exhibitors, or the venue will be charged to the responsible individual in accordance with applicable laws.</p>
          `,
          Button1: null,
          Button2: null,
          BackgroundColor: "#F3F9FF",
          Image: { data: null },
        },
      ],
    },
  ],
  partners: {
    title: "Partners & Sponsors",
    items: [
      {
        id: "27",
        name: "Apace Digital Cargo",
        slug: "apace-digital-cargo",
        logo: "https://cdn.itegroupnews.com/APACE_Digital_Cargo_523bc2c2a2.webp",
      },
      {
        id: "38",
        name: "Cargo Insights",
        slug: "cargo-insights",
        logo: "https://cdn.itegroupnews.com/Cargo_Insights_e965193be1.webp",
      },
      {
        id: "31",
        name: "International Coordinating Council for Trans-Eurasian Transportation",
        slug: "international-coordinating-council-for-trans-eurasian-transportation",
        logo: "https://cdn.itegroupnews.com/International_Coordinating_for_Trans0_Eurasian_Transportation_965b26881c.webp",
      },
      {
        id: "17",
        name: "LOGIRUS",
        slug: "logirus",
        logo: "https://cdn.itegroupnews.com/LOGIRUS_34da1707d5.webp",
      },
      {
        id: "40",
        name: "CargoTalk",
        slug: "cargo-talk",
        logo: "https://cdn.itegroupnews.com/Cargo_Talk_ME_logo_final_ff5213a4fd.jpg",
      },
      {
        id: "34",
        name: "Logistics 360 Magazine",
        slug: "logistics-360-magazine",
        logo: "https://cdn.itegroupnews.com/Logisics_360_magazine_a74756752e.webp",
      },
      {
        id: "43",
        name: "BizToday",
        slug: "trans-russia-partner-1",
        logo: "https://cdn.itegroupnews.com/Logo_Biz_Today_International_JPG_dd5d3adcb2.jpg",
      },
      {
        id: "23",
        name: "Logistics.ru",
        slug: "logistics-ru",
        logo: "https://cdn.itegroupnews.com/Logistics_ru_12a920fd01.webp",
      },
    ],
  },
};

// Helper function to render HTML content safely
function RenderHTML({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function TermsOfVisitingPage() {
  if (!termsOfVisitingPageData) {
    notFound();
  }

  return (
    <div className="page-spacing-wrapper font-parabolica">
      {/* Hero Section */}
      <div className="relative z-1 flex flex-col justify-end bg-[#004A96] pt-48!">
        <SectionContainer className="flex flex-col justify-end pt-0! pb-10!">
          <h2 className="title-72 text-white">{termsOfVisitingPageData.hero.title}</h2>
          <p className="max-w-6xl whitespace-pre-line py-5 text-white/80">
            {termsOfVisitingPageData.hero.description}
          </p>
        </SectionContainer>
      </div>

      {/* Terms Content Block */}
      <div className="animated-block">
        <div className="animated-block-target">
          <SectionContainer>
            <div className="grid size-full grid-cols-1 gap-5 mt-5">
              {termsOfVisitingPageData.blocks[0]?.DynamicTextBlockData?.map((block) => (
                <div
                  key={block.id}
                  className="z-1 relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 text-gray-500"
                  style={block.BackgroundColor ? { backgroundColor: block.BackgroundColor } : {}}
                >
                  <div className="flex flex-col z-1 gap-5">
                    {block.Title && (
                      <h2 className="title-40 font-semibold title-40 text-gray-500">{block.Title}</h2>
                    )}
                    {block.Content && (
                      <div className="rte-style text-gray-500 lg:[&_h1]:text-4xl lg:[&_h2]:text-3xl lg:[&_h3]:text-2xl [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_a]:text-gray-500 [&_blockquote]:relative [&_blockquote]:italic [&_blockquote]:bg-[#e6f0ff] [&_blockquote]:text-gray-500 [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-gray-500 [&_blockquote]:p-5 [&_blockquote]:ml-5">
                        <RenderHTML html={block.Content} />
                      </div>
                    )}
                    {block.Button1 && (
                      <div className="flex w-full flex-wrap gap-5"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      </div>
    </div>
  );
}