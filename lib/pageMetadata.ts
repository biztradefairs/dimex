import type { Metadata } from 'next';

export const SITE_URL = 'https://www.diemex.in';

export function pageMeta(title: string, description: string, route = '/'): Metadata {
  const url = new URL(route, SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export const PAGE_META = {
  home: pageMeta(
    "DIEMEX 2027 Pune | Die & Mould Exhibition, 24-26 March",
    "DIEMEX 2027, India's die and mould exhibition, 24-26 March in Pune. Explore CNC, EDM, 3D printing and tooling. Register free or book a stall.",
    "/",
  ),
  aboutDiemex: pageMeta(
    "About DIEMEX | India's Die & Mould Exhibition by Maxx Business Media",
    "DIEMEX is India's international die and mould manufacturing exhibition, organised by Maxx Business Media. Held in Bangalore, Chennai and Pune for toolmakers, OEMs and buyers.",
    "/about-diemex",
  ),
  aboutOrganizer: pageMeta(
    "About the Organizer | Maxx Business Media, DIEMEX Exhibition Organiser",
    "Maxx Business Media Pvt. Ltd., Bangalore, organises DIEMEX, India's die and mould exhibition, plus B2B trade shows and conferences. Contact us to exhibit or visit.",
    "/about-organizer",
  ),
  whyExhibit: pageMeta(
    "Why Exhibit at DIEMEX | Die & Mould Exhibition India | Book a Stall",
    "Exhibit at DIEMEX, India's die and mould exhibition. Meet toolmakers, OEMs and buyers, demo live, and book your stall. Next show: Pune, 24-26 March 2027.",
    "/why-exhibit",
  ),
  exhibitorRegister: pageMeta(
    "Exhibitor Registration | DIEMEX 2027 Die & Mould Exhibition, India",
    "Register as an exhibitor at DIEMEX 2027, India's die and mould exhibition. Enquire about stalls, get the brochure and meet toolmakers, OEMs and buyers.",
    "/register?t=exhibitor",
  ),
  sectors: pageMeta(
    "Sectors at DIEMEX 2027 | Auto, Plastics, Aerospace Die & Mould Industries",
    "Explore sectors served by DIEMEX 2027: automotive, plastics, industrial machinery, defence, railways, medical and aerospace tooling. Register to visit or exhibit.",
    "/sectors",
  ),
  planYourTravel: pageMeta(
    "Plan Your Travel to DIEMEX 2027 | Venue, Hotels, How to Reach",
    "Plan your trip to DIEMEX 2027 at [Venue], [City]. Get venue address, nearest airport and railway station, hotels and local travel tips for visitors and exhibitors.",
    "/plan-your-travel",
  ),
  exhibitionDirectory: pageMeta(
    "DIEMEX 2027 Exhibitor List | Die & Mould Companies Exhibiting in India",
    "Browse the DIEMEX 2027 exhibitor directory. Find CNC, EDM, 3D printing, hot runner and tooling suppliers exhibiting at India's die and mould exhibition.",
    "/exhibition-directory",
  ),
  exhibitorResource: pageMeta(
    "DIEMEX 2027 Exhibitor Resource Center | Manual, Floor Plan, Forms",
    "Exhibitor resources for DIEMEX 2027: exhibitor manual, floor plan, stall forms, deadlines, branding kit and contacts. Everything to prepare for India's die and mould show.",
    "/exhibitor-resource-center",
  ),
  freePromo: pageMeta(
    "Free Promotion for DIEMEX 2027 Exhibitors | Get Listed and Promoted",
    "Claim free promotion at DIEMEX 2027, India's die and mould exhibition. Get your company featured to toolmakers, OEMs and buyers before the show. Apply today.",
    "/free-promo",
  ),
  floorPlan: pageMeta(
    "DIEMEX 2027 Floor Plan | Hall Layout and Stall Map, Pune",
    "View the DIEMEX 2027 floor plan and hall layout at  Auto Cluster Exhibition Centre, Pune, India.check availability & book your space at India's die & mould show.",
    "/layout",
  ),
  whyVisit: pageMeta(
    "Why Visit DIEMEX 2027 | Die & Mould Exhibition India | Register Free",
    "Visit DIEMEX 2027 to see CNC, EDM, 3D printing and tooling technology, meet suppliers and source partners. Trade-only, India's die and mould exhibition. Register now.",
    "/why-visit",
  ),
  participants: pageMeta(
    "DIEMEX Participants | Companies That Exhibit at India's Die & Mould Show",
    "See who participates in DIEMEX, India's die and mould exhibition: tooling, CNC, EDM, 3D printing and moulding companies. Join them at DIEMEX 2027.",
    "/participants",
  ),
  brochure: pageMeta(
    "Download DIEMEX 2027 Brochure | Die & Mould Exhibition India",
    "Download the DIEMEX 2027 brochure for stall options, floor plan, sectors and show highlights. India's die and mould exhibition. Free PDF.",
    "/register?t=brochure",
  ),
  articles: pageMeta(
    "Die & Mould Industry Articles and Insights | DIEMEX India",
    "Read DIEMEX articles on die and mould making, CNC, EDM, 3D printing, hot runners and tooling trends in India. Insights for toolmakers and manufacturers.",
    "/articles",
  ),
  postShowReport: pageMeta(
    "DIEMEX 2025 Post-Show Report | Chennai Die & Mould Exhibition Results",
    "Download the DIEMEX 2025 post-show report: visitor and exhibitor statistics, success metrics and feedback from the Chennai die and mould exhibition, 20-22 Nov 2025.",
    "/post-show-report",
  ),
  mediaGallery: pageMeta(
    "DIEMEX Media Gallery | Photos, Videos & Highlights",
    "Explore photos and video highlights from DIEMEX. See opening ceremonies, award functions, exhibition showcases, and technical sessions.",
    "/media-gallery",
  ),
  contact: pageMeta(
    "Contact DIEMEX Team | Organizers & Venue",
    "Get in touch with Maxx Business Media Pvt. Ltd. for DIEMEX 2027 enquiries, stall bookings, and venue details at Auto Cluster, Pune.",
    "/contact-us",
  ),
  register: pageMeta(
    'Register | DIEMEX 2027',
    'Register for DIEMEX 2027 ? visitor registration, exhibitor enquiry, partnership, or brochure download.',
    '/register',
  ),
} as const;
