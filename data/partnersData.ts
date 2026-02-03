/* ===================== TYPES ===================== */

export interface Partner {
  name: string;
  slug: string;
  role: string;
  logo: string;
  websiteLink?: string;
  description?: string;
}

export type PartnersData = Record<string, Partner[]>;

/* ===================== DATA ===================== */

export const partnersData: PartnersData = {
  supportingPartner2026: [
    {
      name: 'ICIB',
      slug: 'icib',
      role: 'Supporting Partner',
      logo: 'https://cdn.itegroupnews.com/thumbnail_ICIB_Logo_24_834a8e19c7.jpg',
      websiteLink: 'http://www.icib.org.in/',
      description: `The Indian Chamber of International Business (ICIB) is a premier trade promotion organization dedicated to fostering international business relations and enhancing global trade opportunities. With a focus on creating meaningful business connections, ICIB facilitates cross-border partnerships, organizes trade delegations, and provides strategic guidance to businesses looking to expand internationally. Their expertise in international trade policies and market access makes them a valuable partner for companies seeking to navigate the complexities of global commerce.`,
    },
  ],

  officialMediaPartner2026: [
    {
      name: 'Cargo Insights',
      slug: 'cargo-insights',
      role: 'Official Media Partner',
      logo: 'https://cdn.itegroupnews.com/Cargo_Insights_e965193be1.webp',
      websiteLink: 'https://cargoinsights.co/',
      description: `Cargo Insights stands as a leading voice in the logistics and supply chain industry, providing comprehensive coverage of the latest trends, innovations, and developments shaping global trade. Through its multi-platform approach including a monthly magazine, digital news portal, and video content, Cargo Insights delivers in-depth analysis and timely information to logistics professionals worldwide. The organization goes beyond reporting by organizing industry events and recognition programs that bring together key stakeholders to discuss challenges and opportunities in the evolving logistics landscape.`,
    },
  ],

  transRussiaOfficialBank: [
    {
      name: 'VTB Bank',
      slug: 'vtb-bank',
      role: 'TransRussia Official Bank',
      logo: 'https://cdn.itegroupnews.com/VTB_16f0fc5875.webp',
      websiteLink: 'https://www.vtb.ru/',
      description: `VTB Bank, one of Russia's leading financial institutions, provides comprehensive banking services and financial solutions to support international trade and business operations. As the Official Bank of TransRussia, VTB offers specialized financial products tailored to the needs of logistics and transportation companies, facilitating smooth cross-border transactions and trade finance operations. With extensive experience in international markets, VTB plays a crucial role in supporting the financial infrastructure that enables global supply chains to function efficiently.`,
    },
  ],

  wifiPartner: [
    {
      name: 'RZD Business Asset',
      slug: 'rzd-business-asset',
      role: 'Wi-Fi Partner',
      logo: 'https://cdn.itegroupnews.com/RZD_Business_Asset_aca7ff2f81.webp',
      websiteLink: 'https://www.rzd-partner.ru/',
      description: `RZD Business Asset specializes in providing digital connectivity and communication solutions for major transportation and logistics events. As the Wi-Fi Partner, they ensure seamless digital connectivity throughout the exhibition, enabling attendees to stay connected, access information, and network effectively. Their expertise in event technology solutions enhances the overall experience for exhibitors and visitors alike, supporting the digital transformation of the logistics industry through reliable and high-speed connectivity services.`,
    },
  ],

  coOrganizer: [
    {
      name: 'ICCTT',
      slug: 'icctt',
      role: 'Co-organizer',
      logo: 'https://cdn.itegroupnews.com/International_Coordinating_for_Trans0_Eurasian_Transportation_965b26881c.webp',
      websiteLink: 'https://icctt.com/',
      description: `The International Coordinating Council on Trans-Eurasian Transportation (ICCTT) plays a pivotal role in developing and promoting international transport corridors across Eurasia. As a co-organizer, ICCTT brings extensive expertise in cross-border transportation coordination, policy development, and international logistics cooperation. Their involvement ensures that TransRussia addresses the most pressing challenges and opportunities in Eurasian transportation, facilitating dialogue between government authorities, transportation companies, and industry experts to advance regional connectivity.`,
    },
  ],

  businessProgramPartner: [
    {
      name: 'Council of Supply Chain Professionals',
      slug: 'council-of-supply-chain-professionals',
      role: 'Business Programme Partner',
      logo: 'https://cdn.itegroupnews.com/Council_of_Supply_Chain_Professinoals_03e79f3b06.webp',
      websiteLink: 'https://scmpro.ru/',
      description: `The Council of Supply Chain Professionals is a leading industry association dedicated to advancing excellence in supply chain management through education, professional development, and knowledge sharing. As Business Programme Partner, they contribute valuable insights and expertise in developing conference sessions that address current industry challenges and future trends. Their network of supply chain experts ensures that the conference programme delivers practical, actionable knowledge that helps professionals enhance their skills and adapt to the rapidly changing logistics environment.`,
    },
  ],

  mediaPartners: [
    {
      name: 'The Business Year',
      slug: 'the-business-year',
      role: 'Media Partner',
      logo: 'https://cdn.itegroupnews.com/The_Business_Year_e20d1c0f9f.png',
      websiteLink: 'https://thebusinessyear.com/',
      description: `The Business Year is an international media group that provides in-depth economic intelligence and business insights through its publications, digital platforms, and research services. With a global network of journalists and analysts, they deliver comprehensive coverage of economic developments and business opportunities across various sectors, including logistics and transportation. Their partnership brings valuable media coverage and analytical perspectives to TransRussia, helping to highlight the event's significance in the global trade and logistics landscape.`,
    },
    {
      name: 'ITLN – Indian Transport & Logistics News',
      slug: 'itln',
      role: 'Media Partner',
      logo: 'https://cdn.itegroupnews.com/logo_bedd7fc0a0.png',
      websiteLink: 'https://www.itln.in/',
      description: `Indian Transport & Logistics News (ITLN) is India's premier publication covering the transportation, logistics, and supply chain sectors. With a focus on the rapidly growing Indian market, ITLN provides insights into infrastructure development, policy changes, technological innovations, and business opportunities in the region. Their coverage extends to international partnerships and cross-border trade developments, making them a valuable media partner for connecting the Indian logistics community with global opportunities presented at TransRussia.`,
    },
    {
      name: 'APACE Digital Cargo',
      slug: 'apace-digital-cargo',
      role: 'Media Partner',
      logo: 'https://cdn.itegroupnews.com/APACE_Digital_Cargo_523bc2c2a2.webp',
      websiteLink: 'https://apacedigitalcargo.com/',
      description: `APACE Digital Cargo is a specialized digital media platform focusing on air cargo, freight forwarding, and digital transformation in logistics. Through their online publications and industry reports, they provide timely information about market trends, technological innovations, and business strategies in the air cargo sector. Their expertise in digital logistics and commitment to covering emerging technologies in transportation make them an important media partner for highlighting the digital innovations and air cargo developments featured at TransRussia.`,
    },
  ],
};