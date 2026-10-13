// Page-specific FAQs adapted from the supplied FAQ document and current site features.
// Event dates confirmed by the organizer: 24 to 26 March 2027.
// Fees, facilities and booking terms should follow organizer confirmation.
export type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

export type PageFaqContent = {
  subtitle: string;
  items: readonly FaqItem[];
};

export const PAGE_FAQS: Record<string, PageFaqContent> = {
  "/": {
    "subtitle": "Everything you need to know about DIEMEX 2027.",
    "items": [
      {
        "question": "What is DIEMEX 2027?",
        "answer": "DIEMEX is a B2B exhibition focused on dies, moulds, precision tooling and manufacturing technologies in India."
      },
      {
        "question": "Where and when is DIEMEX 2027 held?",
        "answer": "DIEMEX 2027 takes place from 24 to 26 March 2027 at Auto Cluster Exhibition Centre in Chinchwad, Pune, Maharashtra. Check the travel page when planning your visit.",
        "link": {
          "href": "/plan-your-travel",
          "label": "Plan your travel"
        }
      },
      {
        "question": "Who should attend DIEMEX?",
        "answer": "The event is relevant to toolmakers, automotive OEMs, plastic processors, design engineers, procurement teams and manufacturing professionals."
      },
      {
        "question": "What products and technologies does DIEMEX cover?",
        "answer": "The event covers die and mould solutions, CNC machining, EDM, tooling components, CAD/CAM, additive manufacturing and inspection technologies.",
        "link": {
          "href": "/sectors",
          "label": "Explore event sectors"
        }
      },
      {
        "question": "How can I register to visit DIEMEX?",
        "answer": "Complete the visitor registration form with your contact, company and professional details.",
        "link": {
          "href": "/register?t=visitor",
          "label": "Register as a visitor"
        }
      }
    ]
  },
  "/about-diemex": {
    "subtitle": "Learn about the exhibition and the industries it serves.",
    "items": [
      {
        "question": "What is the purpose of DIEMEX?",
        "answer": "DIEMEX connects the die and mould industry with manufacturing technologies, tooling solutions and potential business partners."
      },
      {
        "question": "Which industries is DIEMEX relevant to?",
        "answer": "Its tooling and precision manufacturing focus is relevant to automotive, plastics, aerospace, electronics, medical devices and industrial manufacturing."
      },
      {
        "question": "How does DIEMEX help OEMs explore tooling solutions?",
        "answer": "OEM teams can review the event sectors and exhibitor directory to identify companies whose products or capabilities match their sourcing requirements.",
        "link": {
          "href": "/exhibition-directory",
          "label": "Browse exhibitors"
        }
      },
      {
        "question": "Does the exhibition cover additive manufacturing?",
        "answer": "Additive manufacturing and 3D printing are part of the event product scope, alongside machining and other tooling technologies.",
        "link": {
          "href": "/sectors",
          "label": "View the product scope"
        }
      },
      {
        "question": "Where can I learn about previous DIEMEX editions?",
        "answer": "The media gallery and post-show report pages provide information about past editions and their highlights.",
        "link": {
          "href": "/post-show-report",
          "label": "View the post-show report"
        }
      }
    ]
  },
  "/about-organizer": {
    "subtitle": "Information about the team behind DIEMEX.",
    "items": [
      {
        "question": "Which company organizes DIEMEX?",
        "answer": "DIEMEX is organized by Maxx Business Media Pvt. Ltd."
      },
      {
        "question": "Where is Maxx Business Media based?",
        "answer": "The organizer is based in Bengaluru, Karnataka, India. Its office details are listed on the contact page.",
        "link": {
          "href": "/contact-us",
          "label": "View office details"
        }
      },
      {
        "question": "What kind of events does the organizer work on?",
        "answer": "Maxx Business Media organizes B2B trade exhibitions and conferences for industrial and manufacturing audiences."
      },
      {
        "question": "How can a company enquire about sponsorship?",
        "answer": "Use the sponsor registration tab to submit your company details and interest in a DIEMEX partnership.",
        "link": {
          "href": "/register?t=sponsor",
          "label": "Enquire about sponsorship"
        }
      },
      {
        "question": "How can media organizations contact the DIEMEX team?",
        "answer": "Media organizations can use the official contact page to discuss coverage, information requests and potential partnerships.",
        "link": {
          "href": "/contact-us",
          "label": "Contact the organizing team"
        }
      }
    ]
  },
  "/why-exhibit": {
    "subtitle": "Explore exhibiting opportunities for your business.",
    "items": [
      {
        "question": "Why should a tooling company exhibit at DIEMEX?",
        "answer": "DIEMEX provides a setting to present tooling solutions to manufacturing professionals and discuss their sourcing requirements."
      },
      {
        "question": "Which professionals are relevant to an exhibitor?",
        "answer": "Relevant audiences include procurement teams, tool room managers, production engineers, OEM representatives and business owners."
      },
      {
        "question": "How can exhibiting support business development?",
        "answer": "A stand can help your team introduce products, explain technical capabilities and start conversations with prospective customers. Business outcomes depend on your offering and follow-up."
      },
      {
        "question": "What should I review before enquiring about a stand?",
        "answer": "Review the event sectors and floor plan, then prepare your product details and preferred stand size for the exhibitor enquiry form.",
        "link": {
          "href": "/layout",
          "label": "View the floor plan"
        }
      },
      {
        "question": "Where can exhibitors find promotional materials?",
        "answer": "The exhibitor promotions page provides materials you can use to tell customers about your participation.",
        "link": {
          "href": "/free-promo",
          "label": "Explore promotional materials"
        }
      }
    ]
  },
  "/register?t=exhibitor": {
    "subtitle": "Answers about stand enquiries and exhibitor preparation.",
    "items": [
      {
        "question": "How do I submit a DIEMEX stand enquiry?",
        "answer": "Complete the exhibitor enquiry form on this page. The organizing team can then discuss your requirements and the next steps."
      },
      {
        "question": "What information does the exhibitor form ask for?",
        "answer": "The form asks for contact and company details, location, industry, product sectors, preferred stand size and your level of interest."
      },
      {
        "question": "Can I request a particular stand size?",
        "answer": "Yes. The form offers stand size options and a custom size option. Availability and the final allocation need confirmation from the organizing team."
      },
      {
        "question": "Where can I review the layout before booking?",
        "answer": "Use the floor plan page to review the exhibition layout, then ask the organizer about your preferred location and current availability.",
        "link": {
          "href": "/layout",
          "label": "Review the exhibition layout"
        }
      },
      {
        "question": "Where should I check booking and cancellation terms?",
        "answer": "Request the applicable agreement and booking terms from the organizer before confirming your stand.",
        "link": {
          "href": "/contact-us",
          "label": "Ask the organizing team"
        }
      }
    ]
  },
  "/sectors": {
    "subtitle": "Find technologies relevant to your tooling requirements.",
    "items": [
      {
        "question": "Which product sectors are covered by DIEMEX?",
        "answer": "The sectors include precision die and mould solutions, tooling and mould bases, machining and finishing, automation, engineering software and tool steel."
      },
      {
        "question": "Is CAD/CAM part of the event scope?",
        "answer": "Yes. Design, CAD/CAM and engineering software form a sector covering tooling design, simulation and manufacturing workflows."
      },
      {
        "question": "Are mould bases and hot runner systems included?",
        "answer": "Tooling, mould bases and standard components include mould bases, hot runner systems and related tooling elements."
      },
      {
        "question": "Which machining and finishing technologies are covered?",
        "answer": "The sector covers CNC machining, EDM, wire cutting, surface finishing and polishing for tool room applications."
      },
      {
        "question": "How can I find companies offering a specific technology?",
        "answer": "Start with the relevant sector, then browse the exhibitor directory and review individual company information.",
        "link": {
          "href": "/exhibition-directory",
          "label": "Find exhibitors"
        }
      }
    ]
  },
  "/plan-your-travel": {
    "subtitle": "Prepare for your journey to the exhibition venue.",
    "items": [
      {
        "question": "What is the DIEMEX venue location?",
        "answer": "DIEMEX 2027 takes place from 24 to 26 March 2027 at Auto Cluster Exhibition Centre in Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra. Use the venue information on this page when planning your route."
      },
      {
        "question": "How should I plan my journey from Pune Airport?",
        "answer": "Check the airport and local transport information on this page, and allow for traffic when arranging your journey to Chinchwad. Travel time depends on your route and arrival time."
      },
      {
        "question": "What should I consider when travelling by train?",
        "answer": "Compare available train services and your onward journey to the venue. Confirm your station, arrival time and local transport before travelling."
      },
      {
        "question": "How can I choose accommodation for the exhibition?",
        "answer": "Review the hotel information and choose accommodation based on your budget, booking terms and travel time to the venue. Confirm availability directly with the hotel."
      },
      {
        "question": "Who can help with venue access or travel questions?",
        "answer": "Contact the organizing team for exhibition-specific questions, including access arrangements that you need to confirm before arrival.",
        "link": {
          "href": "/contact-us",
          "label": "Ask about your visit"
        }
      }
    ]
  },
  "/exhibition-directory": {
    "subtitle": "Use the directory to prepare your supplier shortlist.",
    "items": [
      {
        "question": "What is the DIEMEX exhibitor directory?",
        "answer": "It is an online directory of participating companies, with company information available through individual listings."
      },
      {
        "question": "How can I search the exhibitor list?",
        "answer": "Use the search field to look for a company and the alphabetical controls to narrow the displayed listings."
      },
      {
        "question": "How can I read more about a listed company?",
        "answer": "Open the company listing to review its profile and the information provided for that exhibitor."
      },
      {
        "question": "How should I use the directory to plan my visit?",
        "answer": "Identify companies relevant to your requirements, review their profiles and prepare the questions you want to discuss at the show.",
        "link": {
          "href": "/sectors",
          "label": "Review event sectors"
        }
      },
      {
        "question": "How can I report incorrect directory information?",
        "answer": "Send the company name and the details that need correction to the DIEMEX organizing team through the official contact page.",
        "link": {
          "href": "/contact-us",
          "label": "Report a listing issue"
        }
      }
    ]
  },
  "/exhibitor-resource-center": {
    "subtitle": "Guidance for planning and preparing your participation.",
    "items": [
      {
        "question": "What is the DIEMEX Exhibitor Resource Center?",
        "answer": "This page brings together information to help exhibitors prepare their participation, including logistics, marketing and organizer contacts."
      },
      {
        "question": "Where should I confirm stand setup requirements?",
        "answer": "Review the exhibitor guidance and ask the organizer for the current manual and the requirements applicable to your stand."
      },
      {
        "question": "How do I confirm move-in and move-out schedules?",
        "answer": "Use the current exhibitor manual and organizer instructions for setup and dismantling timings. Confirm the schedule before arranging deliveries."
      },
      {
        "question": "How should I request additional stand services?",
        "answer": "Discuss your requirements for power, furniture or other services with the organizer and check the applicable service forms, costs and deadlines."
      },
      {
        "question": "Where can I get help preparing my participation?",
        "answer": "Use the contact information on this page or contact the DIEMEX team with your company name and stand requirements.",
        "link": {
          "href": "/contact-us",
          "label": "Contact exhibitor support"
        }
      }
    ]
  },
  "/free-promo": {
    "subtitle": "Make your DIEMEX participation easier to share.",
    "items": [
      {
        "question": "What materials are on the exhibitor promotions page?",
        "answer": "The page provides invitation and announcement materials, event news and logo resources for promoting your participation."
      },
      {
        "question": "How can I tell customers about my DIEMEX stand?",
        "answer": "Use the invitation or announcement materials and include your company name, products and confirmed stand information."
      },
      {
        "question": "Can I use the event logo in my promotional material?",
        "answer": "Use the official logo resource provided on this page and follow any usage instructions supplied with it."
      },
      {
        "question": "What should I check before sharing a promotional template?",
        "answer": "Check that the event edition, dates, venue and your stand details match your confirmed participation, especially when adapting an older template."
      },
      {
        "question": "Where should my customer invitations link?",
        "answer": "Link to the visitor registration form so customers can submit their details before planning their visit.",
        "link": {
          "href": "/register?t=visitor",
          "label": "Open visitor registration"
        }
      }
    ]
  },
  "/layout": {
    "subtitle": "Use the floor plan to prepare your exhibition visit.",
    "items": [
      {
        "question": "Where can I view the DIEMEX floor plan?",
        "answer": "The floor plan is displayed on this page when the exhibition layout is available."
      },
      {
        "question": "How can I identify companies I want to visit?",
        "answer": "Use the exhibitor directory to shortlist companies, then compare any published stand information with the floor plan.",
        "link": {
          "href": "/exhibition-directory",
          "label": "Browse the directory"
        }
      },
      {
        "question": "Does a displayed floor plan confirm stand availability?",
        "answer": "A layout helps you review the exhibition space. Ask the organizer to confirm current availability and allocation before making booking decisions."
      },
      {
        "question": "How can I enquire about a preferred stand location?",
        "answer": "Submit an exhibitor enquiry with your preferred stand size and location so the organizing team can discuss the options.",
        "link": {
          "href": "/register?t=exhibitor",
          "label": "Submit a stand enquiry"
        }
      },
      {
        "question": "Who can clarify access points or facilities on the layout?",
        "answer": "Contact the organizer for details about entrances, access arrangements and facilities that are not clear on the published plan.",
        "link": {
          "href": "/contact-us",
          "label": "Ask about the layout"
        }
      }
    ]
  },
  "/why-visit": {
    "subtitle": "Plan a visit around your manufacturing needs.",
    "items": [
      {
        "question": "Why should manufacturing professionals visit DIEMEX?",
        "answer": "The exhibition offers a way to explore tooling technologies, learn about suppliers and discuss manufacturing requirements in one event setting."
      },
      {
        "question": "Which technologies can visitors explore?",
        "answer": "Relevant technologies include CNC machining, EDM, CAD/CAM, die and mould solutions, tooling components and 3D printing."
      },
      {
        "question": "How can I make the most of my time at the show?",
        "answer": "Prepare a supplier shortlist and bring clear questions about your materials, tolerances, production volumes and tooling needs.",
        "link": {
          "href": "/exhibition-directory",
          "label": "Build your supplier shortlist"
        }
      },
      {
        "question": "Where can I check conference information?",
        "answer": "Review the conference page for published programme information and confirm any attendance requirements with the organizer.",
        "link": {
          "href": "/conference",
          "label": "View conference information"
        }
      },
      {
        "question": "What should I do before travelling to DIEMEX?",
        "answer": "Complete visitor registration and review the venue and travel information before arranging your journey.",
        "link": {
          "href": "/register?t=visitor",
          "label": "Register to visit"
        }
      }
    ]
  },
  "/participants": {
    "subtitle": "Learn about the businesses represented at DIEMEX.",
    "items": [
      {
        "question": "What can I find on the DIEMEX Participants page?",
        "answer": "This page introduces companies associated with DIEMEX participation and helps you explore the businesses represented."
      },
      {
        "question": "Which kinds of businesses are relevant participants?",
        "answer": "The exhibition is relevant to mould makers, machine tool companies, tooling component suppliers, engineering software providers and material suppliers."
      },
      {
        "question": "Where can I find detailed exhibitor profiles?",
        "answer": "Use the exhibitor directory to open company listings and review the information published for each business.",
        "link": {
          "href": "/exhibition-directory",
          "label": "View company profiles"
        }
      },
      {
        "question": "How can my company enquire about participating?",
        "answer": "Submit an exhibitor enquiry with your company details and product sectors to discuss participation with the organizer.",
        "link": {
          "href": "/register?t=exhibitor",
          "label": "Enquire about participation"
        }
      },
      {
        "question": "How can I discuss a participant listing with the organizer?",
        "answer": "Share your company name and the relevant listing with the organizing team when asking about an addition or correction.",
        "link": {
          "href": "/contact-us",
          "label": "Ask about a participant listing"
        }
      }
    ]
  },
  "/register?t=visitor": {
    "subtitle": "Help with visitor registration and attendance preparation.",
    "items": [
      {
        "question": "How do I register as a DIEMEX visitor?",
        "answer": "Complete the visitor form on this page with your business and contact details, and accept the stated terms before submitting."
      },
      {
        "question": "What details do I need for visitor registration?",
        "answer": "Prepare your name, designation, company, business address, email, mobile number, location and visitor profile."
      },
      {
        "question": "Does downloading a brochure register me as a visitor?",
        "answer": "The brochure and visitor forms serve different purposes. Use the Visitor tab to submit a visitor registration; use the Brochure tab to request event information."
      },
      {
        "question": "How do I confirm badge collection or entry instructions?",
        "answer": "Follow the instructions provided after registration. If you need clarification about a badge or entry arrangements, contact the organizer before your visit.",
        "link": {
          "href": "/contact-us",
          "label": "Ask about entry arrangements"
        }
      },
      {
        "question": "Who can help if I have a registration problem?",
        "answer": "Contact the DIEMEX team with your name, company and a description of the issue so they can advise you.",
        "link": {
          "href": "/contact-us",
          "label": "Get registration help"
        }
      }
    ]
  },
  "/articles": {
    "subtitle": "Explore the industry news and insights published on DIEMEX.",
    "items": [
      {
        "question": "What can I read in the DIEMEX Articles section?",
        "answer": "The section contains industry news and insights relevant to die and mould manufacturing, tooling and related technologies."
      },
      {
        "question": "How do I open a full article?",
        "answer": "Select an article from the listing to read its full content, including any author or publication information shown on the article page."
      },
      {
        "question": "How can I suggest a topic or send an editorial enquiry?",
        "answer": "Contact the DIEMEX team with your proposed topic and contact details. The team can advise on the appropriate editorial contact.",
        "link": {
          "href": "/contact-us",
          "label": "Send an editorial enquiry"
        }
      }
    ]
  },
  "/post-show-report": {
    "subtitle": "Find information about previous exhibition results.",
    "items": [
      {
        "question": "What is the DIEMEX Post-Show Report?",
        "answer": "It is a report about a previous exhibition edition, intended to help readers review the event and its published results. Refer to the report for the metrics it includes."
      },
      {
        "question": "How can I request the official post-show report?",
        "answer": "Complete the report request form on this page and follow the instructions provided after submission."
      },
      {
        "question": "Who may find the report useful?",
        "answer": "Potential exhibitors, sponsors and industry professionals can use it to understand a previous edition before discussing future participation.",
        "link": {
          "href": "/register?t=exhibitor",
          "label": "Discuss exhibiting opportunities"
        }
      }
    ]
  },
  "/register?t=brochure": {
    "subtitle": "Request event information before planning your participation.",
    "items": [
      {
        "question": "How do I request the official DIEMEX brochure?",
        "answer": "Complete the brochure form on this page with your name, company, contact and location details, then follow the instructions provided after submission."
      },
      {
        "question": "What can I use the brochure for?",
        "answer": "Use it to review the published event information and exhibiting opportunities. Ask the organizer to confirm current commercial terms and any details that affect your plans.",
        "link": {
          "href": "/contact-us",
          "label": "Confirm event details"
        }
      },
      {
        "question": "Is there a fee to request the DIEMEX brochure?",
        "answer": "The brochure request form does not require a payment. Submit your details through the Brochure tab to request the event information."
      }
    ]
  },
  "/media-gallery": {
    "subtitle": "Browse exhibition photos and event highlights.",
    "items": [
      {
        "question": "What does the DIEMEX Media Gallery show?",
        "answer": "The gallery contains photos and event highlights from DIEMEX editions, grouped into the collections published on the page."
      },
      {
        "question": "How can I view a gallery collection?",
        "answer": "Select a collection on this page to open the photos or other media available for that event highlight."
      },
      {
        "question": "Who should I contact about using event photographs?",
        "answer": "Ask the organizing team about permission and available files before using event images in press coverage or promotional material.",
        "link": {
          "href": "/contact-us",
          "label": "Enquire about event images"
        }
      }
    ]
  },
  "/contact-us": {
    "subtitle": "Reach the right team for your exhibition questions.",
    "items": [
      {
        "question": "How can I contact the DIEMEX organizing team?",
        "answer": "Use the official details on this page. The listed DIEMEX contact number is +91 91483 19993 and the email address is pad@diemex.in."
      },
      {
        "question": "What should I include in a stall booking enquiry?",
        "answer": "Include your company, contact details, product sectors and preferred stand size so the team can understand your requirements.",
        "link": {
          "href": "/register?t=exhibitor",
          "label": "Use the exhibitor enquiry form"
        }
      },
      {
        "question": "Where can I find the organizer office address?",
        "answer": "The organizer office details are listed on this page. Check them before arranging a visit or sending correspondence."
      },
      {
        "question": "How can I ask about exhibition venue access?",
        "answer": "Describe the access or facility information you need when contacting the organizer, and review the travel page for published venue information.",
        "link": {
          "href": "/plan-your-travel",
          "label": "Review venue information"
        }
      },
      {
        "question": "Who should I contact about brochures, reports or media requests?",
        "answer": "Send your request to the DIEMEX team using the official contact details and state which document or media information you need."
      }
    ]
  }
};
