// app/visa/page.tsx
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
}

interface DynamicTextBlock {
  __typename: string;
  DynamicTextBlockTitle: string | null;
  DynamicTextBlockColumns: string;
  DynamicTextBlockData: DynamicBlockData[];
}

// Mock Data (in a real app, this would come from an API)
const visaPageData = {
  hero: {
    title: "Visa Support",
    description:
      "Here International exhibitors, partners, and visitors attending DIEMEX 2026 can find important information here regarding visa requirements and travel to India.",
  },
  blocks: [
    {
      __typename: "ComponentSharedDynamicTextBlock",
      DynamicTextBlockTitle: null,
      DynamicTextBlockColumns: "Two",
      DynamicTextBlockData: [
        {
          id: "736",
          Title: "How can our Official Travel Partner Support You?",
          Content:
            '<p>International exhibitors and visitors are advised to check with the Indian Embassy or Consulate in their country of residence to determine whether a visa is required to travel to India for DIEMEX 2026.<br />&nbsp;</p><p>Most international travelers can apply for an Indian e-Visa online through the official Government of India visa portal. Applicants should ensure that their passport is valid for at least six months from the date of arrival and that all required documents are submitted during the application process., Exhibitors and visitors attending DIEMEX typically apply for a Business Visa or Tourist Visa, depending on the purpose of their visit. It is recommended to apply well in advance to avoid delays.<br />&nbsp;</p><p>Exhibitors and visitors typically apply for a business or tourist invitation. Once the invitation is prepared, you can independently apply for a Russian visa at your local consulate.<br />&nbsp;</p><p>Visitors should also ensure they have valid travel and medical insurance covering the duration of their stay in India.</p><p>&nbsp;</p>',
          Button1: {
            Text: "Visit our Travel Partner Website",
            Theme: "Primary",
            LinkTo: "#",
            Target: "New_Tab",
          },
          Button2: null,
          Image: {
            data: {
              attributes: {
                url: "/images/visa_1.jpg",
              },
            },
          },
        },
        {
          id: "735",
          Title: null,
          Content: null,
          Button1: null,
          Button2: null,
          Image: {
            data: {
              attributes: {
                url: "/images/visa_1.jpg",
              },
            },
          },
        },
      ],
    },
    {
      __typename: "ComponentSharedDynamicTextBlock",
      DynamicTextBlockTitle: "Invitation for a Business Visa",
      DynamicTextBlockColumns: "Two",
      DynamicTextBlockData: [
        {
          id: "617",
          Title: "Invitation for a Business Visa",
          Content:
            '<p>International exhibitors and participants attending DIEMEX 2026 may apply for an Indian Business Visa or e-Business Visa if their visit involves business meetings, exhibition participation, or industry events.</p><p>&nbsp;</p><ul style="list-style-type:square;"><li>A Business Visa allows foreign nationals to visit India for activities such as attending exhibitions, conferences, meetings, and exploring business opportunities. Applicants can apply through the official Government of India visa portal or through the nearest Indian Embassy or Consulate in their country of residence.<br />&nbsp;</li><li>If required, the DIEMEX organizing team can provide an official invitation letter to support visa applications for registered exhibitors and participants.<br />&nbsp;</li><li>Visa processing times may vary depending on the applicant’s country, so visitors are advised to apply well in advance of their travel dates to ensure a smooth entry into India.</li></ul>',
          Button1: {
            Text: "Visit our Travel Partner Website",
            Theme: "Primary",
            LinkTo: "#",
            Target: "New_Tab",
          },
          Button2: null,
          Image: { data: null },
        },
        {
          id: "618",
          Title: "Invitation for a Tourist Visa",
          Content:
            '<p style="margin-left:0px;">International visitors planning to attend DIEMEX 2026 may also enter India using a Tourist Visa or e-Tourist Visa. This option is suitable for visitors attending the exhibition, networking events, or exploring business opportunities while visiting India.</p><p style="margin-left:0px;">&nbsp;</p><ul style="list-style-type:square;"><li><p style="margin-left:0px;">Many nationalities can apply for an Indian e-Tourist Visa online through the official Government of India visa portal. The e-Visa typically allows short-term stays and is issued for single or multiple entries depending on the visa category.</p></li><li><p style="margin-left:0px;">Applicants should ensure their passport is valid for at least six months from the date of arrival and that they have confirmed accommodation and return travel arrangements during their stay in India.</p><p style="margin-left:0px;">&nbsp;</p></li></ul><p style="margin-left:0px;">For detailed visa requirements and application procedures, visitors are advised to check the official website of the Indian Embassy or Consulate in their country or visit the Government of India’s e-Visa portal., submit a request, or contact them directly:</p><p style="margin-left:0px;">&nbsp;</p><ul style="list-style-type:square;"><li><p style="margin-left:0px;">Phone: <a href="#"><u>+91 9148319993</u></a></p></li><li><p style="margin-left:0px;"><a href="https://api.whatsapp.com/send?phone=9148319993"><strong><u>WhatsApp</u></strong></a></p></li><li><p style="margin-left:0px;">Email: <a href="mailto:pad@maxxmedia.in"><strong>pad@maxxmedia.in</strong></a></p></li></ul>',
          Button1: null,
          Button2: null,
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
    ],
  },
};

// Helper function to render HTML content safely
function RenderHTML({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function VisaPage() {
  if (!visaPageData) {
    notFound();
  }

  return (
    <div className="page-spacing-wrapper font-parabolica">
      {/* Hero Section - Full width with background */}
      <div className="relative z-1 flex flex-col justify-end bg-[#004A96] pt-48!">
        <SectionContainer>
          <div className="flex flex-col justify-end pt-0! pb-10!">
            <h2 className="title-72 text-white">{visaPageData.hero.title}</h2>
            <p className="max-w-6xl whitespace-pre-line py-5 text-white/80">
              {visaPageData.hero.description}
            </p>
          </div>
        </SectionContainer>
      </div>

      {/* First Block - Support Info */}
      <div className="animated-block">
        <div className="animated-block-target">
          <SectionContainer>
            <div className="grid size-full grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              {visaPageData.blocks[0]?.DynamicTextBlockData?.map(
                (block, index) => (
                  <div
                    key={block.id || index}
                    className="z-1 relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 bg-[#E8F1F8]"
                  >
                    {block.Image?.data && index === 1 ? (
                      <>
                        <img
                          src={block.Image.data.attributes.url}
                          alt="Diemex 2026 Expo Visa Support"
                          className="absolute inset-0 size-full object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="flex flex-col z-1 gap-5">
                          <div className="flex w-full flex-wrap gap-5"></div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col z-1 gap-5">
                        {block.Title && (
                          <h2 className="title-40 font-semibold">
                            {block.Title}
                          </h2>
                        )}
                        {block.Content && (
                          <div className="rte-style lg:[&_h1]:text-4xl lg:[&_h2]:text-3xl lg:[&_h3]:text-2xl [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_blockquote]:relative [&_blockquote]:italic [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:text-xl [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:p-5 [&_blockquote]:ml-5">
                            <RenderHTML html={block.Content} />
                          </div>
                        )}
                        {block.Button1 && (
                          <div className="flex w-full flex-wrap gap-5">
                            <a
                              href={block.Button1.LinkTo}
                              target={
                                block.Button1.Target === "New_Tab"
                                  ? "_blank"
                                  : "_self"
                              }
                              rel={
                                block.Button1.Target === "New_Tab"
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              <button className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-[#2a4b7c] text-white hover:bg-[#3a6ca8]">
                                {block.Button1.Text}
                              </button>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </SectionContainer>
        </div>
      </div>

      {/* Second Block - Invitations */}
      <div className="animated-block">
        <div className="animated-block-target">
          <SectionContainer>
            {visaPageData.blocks[1]?.DynamicTextBlockTitle && (
              <h2 className="title-72 text-black mb-10">
                {visaPageData.blocks[1].DynamicTextBlockTitle}
              </h2>
            )}
            <div className="grid size-full grid-cols-1 gap-5 md:grid-cols-2">
              {visaPageData.blocks[1]?.DynamicTextBlockData?.map((block) => (
                <div
                  key={block.id}
                  className="z-1 relative flex size-full min-h-[500px] flex-col p-5 lg:p-10"
                >
                  <div className="flex flex-col z-1 gap-5">
                    {block.Title && (
                      <h2 className="title-40 font-semibold">{block.Title}</h2>
                    )}
                    {block.Content && (
                      <div className="rte-style lg:[&_h1]:text-4xl lg:[&_h2]:text-3xl lg:[&_h3]:text-2xl [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_blockquote]:relative [&_blockquote]:italic [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:text-xl [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:p-5 [&_blockquote]:ml-5">
                        <RenderHTML html={block.Content} />
                      </div>
                    )}
                    {block.Button1 && (
                      <div className="flex w-full flex-wrap gap-5">
                        <a
                          href={block.Button1.LinkTo}
                          target={
                            block.Button1.Target === "New_Tab"
                              ? "_blank"
                              : "_self"
                          }
                          rel={
                            block.Button1.Target === "New_Tab"
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          <button className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-[#2a4b7c] text-white hover:bg-[#3a6ca8]">
                            {block.Button1.Text}
                          </button>
                        </a>
                      </div>
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