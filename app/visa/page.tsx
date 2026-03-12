// app/visa/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      "Here is everything you need to know about visa information. Our official travel partner offers a comprehensive range of services to foreign exhibitors, partners, and visitors.",
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
            '<p>You should contact the Russian consulate in your country of residence to determine if you need a visa to visit Russia.<br />&nbsp;</p><p>If a visa is necessary, please contact our official partner, <a href="https://visa-russian.ru/index_eng.php">Visa-Russian.ru</a>, for guidance on the appropriate type of invitation and visa for your visit and the latest entry requirements for Russia.<br />&nbsp;</p><p>Exhibitors and visitors typically apply for a business or tourist invitation. Once the invitation is prepared, you can independently apply for a Russian visa at your local consulate.<br />&nbsp;</p><p>Your document package should also include medical insurance covering your entire stay in the Russian Federation, which can also be obtained through <a href="https://visa-russian.ru/index_eng.php">Visa-Russian.ru</a>.</p><p>&nbsp;</p>',
          Button1: {
            Text: "Visit our Travel Partner Website",
            Theme: "Primary",
            LinkTo: "https://visa-russian.ru/index_eng.php",
            Target: "New_Tab",
          },
          Button2: null,
          Image: {
            data: {
              attributes: {
                url: "https://cdn.itegroupnews.com/Visa_5bceffab8a.webp",
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
                url: "https://cdn.itegroupnews.com/Visa_5bceffab8a.webp",
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
            '<p>A regular business visa is ideal for business visits to Russia, including negotiations, contract signings, and participation in exhibitions, conferences, or other business-related meetings and events.</p><p>&nbsp;</p><ul style="list-style-type:square;"><li>This type of visa is issued on behalf of a legal entity registered in the Russian Federation. Through a cooperation agreement with ITE, Visa-Russian.ru, represented by Travelmart Service LLC, can serve as the inviting organization for exhibitors, visitors, and partners of ITE exhibitions.<br />&nbsp;</li><li>The most common business invitation is for a double-entry visa, valid for up to 90 days.<br />&nbsp;</li><li>Processing a business invitation takes 20 business days, after which you should apply for the visa at the Russian Federation Consulate.</li></ul>',
          Button1: {
            Text: "Visit our Travel Partner Website",
            Theme: "Primary",
            LinkTo: "https://visa-russian.ru/index_eng.php",
            Target: "New_Tab",
          },
          Button2: null,
          Image: { data: null },
        },
        {
          id: "618",
          Title: "Invitation for a Tourist Visa",
          Content:
            '<p style="margin-left:0px;">A tourist visa is the simplest and quickest way to obtain entry into the Russian Federation.</p><p style="margin-left:0px;">&nbsp;</p><ul style="list-style-type:square;"><li><p style="margin-left:0px;">A visa voucher can be issued within just one (1) business day and allows for a stay of up to 30 days in Russia, with the right to a single entry.</p></li><li><p style="margin-left:0px;">It is mandatory to book accommodation for the entire duration of your stay in Russia through Visa-Russian.ru.</p><p style="margin-left:0px;">&nbsp;</p></li></ul><p style="margin-left:0px;"><a href="https://visa-russian.ru/">Visa-Russian.ru</a> specializes in providing comprehensive visa support for both tourists and business travelers. Their services include issuing invitations and medical insurance, <a href="https://ite.group/en/hotels-transport/">booking hotel accommodations</a>, providing <a href="https://ite.group/en/hotels-transport/">transport services</a>, and <a href="https://ite.group/en/excursions/">organizing tours and cultural programs</a>.</p><p style="margin-left:0px;">&nbsp;</p><p style="margin-left:0px;">For more detailed information, please visit <a href="https://visa-russian.ru/">Visa-Russian.ru</a>, submit a request, or contact them directly:</p><p style="margin-left:0px;">&nbsp;</p><ul style="list-style-type:square;"><li><p style="margin-left:0px;">Phone: <a href="#"><u>+7 (495) 935-83-85</u></a></p></li><li><p style="margin-left:0px;"><a href="https://api.whatsapp.com/send?phone=79035460935"><strong><u>WhatsApp</u></strong></a></p></li><li><p style="margin-left:0px;">Email: <a href="mailto:visa@visa-russian.ru"><strong>visa@visa-russian.ru</strong></a></p></li></ul>',
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
    <div className="page-spacing-wrapper">
      {/* Hero Section */}
      <div className="relative z-1 flex flex-col justify-end bg-[#f5f7fa] pt-48!">
        <div className="container flex flex-col justify-end pt-0! pb-10!">
          <h2 className="title-72 text-black">{visaPageData.hero.title}</h2>
          <p className="max-w-6xl whitespace-pre-line py-5">
            {visaPageData.hero.description}
          </p>
        </div>
      </div>

      {/* First Block - Support Info */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container">
            <div className="grid size-full grid-cols-1 gap-5 md:grid-cols-2">
              {visaPageData.blocks[0]?.DynamicTextBlockData?.map(
                (block, index) => (
                  <div
                    key={block.id || index}
                    className="z-1 relative flex size-full min-h-[500px] flex-col p-5 lg:p-10 bg-[#f5f7fa]"
                  >
                    {block.Image?.data && index === 1 ? (
                      <>
                        <Image
                          src={block.Image.data.attributes.url}
                          alt="TransRussia Visa Support"
                          fill
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
          </div>
        </div>
      </div>

      {/* Second Block - Invitations */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="container">
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
          </div>
        </div>
      </div>

      {/* Partners Carousel */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div>
            <div className="relative container" role="region">
              <div className="mb-10 flex flex-col items-center">
                <h2 className="title-72 text-black mt-5">
                  {visaPageData.partners.title}
                </h2>
              </div>
              <div className="overflow-hidden">
                <div className="flex -ml-4 items-stretch">
                  {visaPageData.partners.items.map((partner) => (
                    <div
                      key={partner.id}
                      role="group"
                      className="min-w-0 shrink-0 grow-0 basis-full pl-4 h-auto md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <Link
                        href={`/partner/${partner.slug}`}
                        className="flex w-full flex-col items-center gap-5 text-center"
                      >
                        <div className="h-40 w-full overflow-hidden rounded-lg px-10 py-5 shadow-lg">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={500}
                            height={500}
                            className="size-full object-contain"
                          />
                        </div>
                        <small className="text-sm">{partner.name}</small>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}