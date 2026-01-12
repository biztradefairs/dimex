// app/about-skladtech/page.tsx
import PartnersSection from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import Link from "next/link"

export default function AboutSkladTechPage() {
    const exhibitors = [
    "Trans Net.",
    "AL BAYAN",
    "MARMED CONTAINER SERVICES",
    "Eagleway Cargo",
    "BORERS",
    "GillcoScal, L. Calymonte",
    "SONTIZAR",
    "康泽远",
    "SARIAK",
    "CONTAINER LINES OF MARRISTSELL SISTERS",
    "1KARGO",
    "PROJECTS, EXPOINT ORGANICS",
    "AERO FREIGHT",
    "pak.shahcen (Prt.) Ltd.",
    "CARAVAN LOGISTICS",
    "ONE TOUCH TOUCH & MOUNTERS",
    "ACT PARBO",
    "PTC HOLDING"
  ];
  return (
    <>

      <div className="min-h-screen">
        {/* Hero Section */}
   <section className="relative">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url(/images/image.png)" }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40" />

  <SectionContainer>
<div className="relative z-10 min-h-[600px] flex flex-col justify-end pb-24 text-white">
  <h1 className="mt-5 text-4xl lg:text-5xl xl:text-6xl font-bold">
    About SkladTech
  </h1>
  <p className="text-xl lg:text-2xl text-white/90">
    The Commercial Heart of Warehousing Solutions.
  </p>
</div>

  </SectionContainer>
</section>


        {/* Where Warehousing Solutions Come to Life */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="max-w-8xl">
              <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
                Where Warehousing Solutions Come to Life
              </h2>
              <p className="mb-8 text-lg lg:text-xl text-gray-700">
                SkladTech is Eurasia's premier exhibition dedicated to advanced warehouse equipment and technologies. Held alongside TransRussia, the country's largest transport and logistics exhibition, SkladTech serves as a specialized platform for showcasing cutting-edge solutions in storage systems, material handling, automation, and inventory management.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium">
                Enquire to Exhibit
              </button>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 py-12">
              <div className="text-center">
                <div className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600">13,900+</div>
                <p className="text-lg">Attendees</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600">7,300+</div>
                <p className="text-lg">First Time Attendees</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600">34</div>
                <p className="text-lg">Countries Represented</p>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Exhibiting Sectors */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="max-w-8xl">
              <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
                Exhibiting Sectors
              </h2>
              <p className="mb-12 text-lg lg:text-xl text-gray-700">
                SkladTech showcases automation, robotics, inventory systems, and supply chain optimization, bringing cutting-edge solutions to warehousing. Explore advanced storage, IoT tech, and sustainable logistics while connecting with industry leaders shaping the future.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {sectors.map((sector, index) => (
                <a
                  key={index}
                  href={sector.href}
                  className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative h-64 lg:h-80">
                    <div 
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${sector.image})` }}
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-white p-4">
                    <h3 className="font-semibold text-lg">{sector.title}</h3>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium">
                Explore Our Event Sectors
              </button>
            </div>
          </SectionContainer>
        </section>

        {/* Download Event Brochure */}
       <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4">
        <div
          className="relative rounded-2xl overflow-hidden px-8 py-12 lg:px-16 lg:py-16 text-white"
          style={{
            backgroundImage: "url(/images/brochure-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-blue-900/80"></div>

          {/* Content */}
          <div className="relative flex flex-col gap-6">
            <div className="max-w-4xl">
              <h2 className="text-4xl lg:text-5xl font-bold mb-3">
                Download Your Event Brochure
              </h2>
              <p className="text-white/80 text-lg">
                Get a comprehensive look at the event's attendees, the sectors on display,
                and the key industry players present.
              </p>
            </div>

            <button className="bg-white text-blue-900 border border-white px-8 py-3 rounded-full font-medium hover:bg-gray-100 whitespace-nowrap w-fit">
              Download Now
            </button>
          </div>
        </div>
      </div>
    </div>

        {/* Meet the Visionaries */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="max-w-8xl">
              <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
                Meet the Visionaries Transforming Warehousing and Logistics
              </h2>
              <p className="mb-8 text-lg lg:text-xl text-gray-700">
                SkladTech unites decision-makers, industry leaders, and innovators in warehouse technology and logistics. Attendees explore cutting-edge solutions, forge partnerships, and optimize operations—shaping the future of warehousing.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium">
                Discover Key Visitor Insights – Download the Post-Show Report
              </button>
            </div>

            {/* Visitor Stats */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 py-12">
              <div className="text-center">
                <div className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600">48%</div>
                <p className="text-lg">Transportation, Forwarding, Storage</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600">40%</div>
                <p className="text-lg">Cargo owners (manufacturing, wholesale trade, retail)</p>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl lg:text-6xl font-bold text-blue-600">12%</div>
                <p className="text-lg">IT-solutions, Insurance, Foreign Trade Agencies, Industry Ministries, Associations, Mass Media</p>
              </div>
            </div>
          </SectionContainer>
        </section>
           <div className="container py-16 lg:py-24">
      <h2 className="title-72 text-black mb-6">A Snapshot of Our 2025 Exhibitors</h2>
      <p className="title-40 font-semibold text-gray-700 mb-12 lg:mb-16">
        Participating in TransRussia Boosts Your Business Growth and Visibility
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 mb-12 lg:mb-16">
        {exhibitors.map((exhibitor, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 flex items-center justify-center min-h-[100px] transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-mainColor2"
          >
            <div className="text-center">
              <span className="text-gray-800 font-medium text-sm md:text-base">
                {exhibitor}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/exhibitor-list" target="_blank" rel="noopener noreferrer">
          <button className="flex-start group w-fit gap-3 overflow-hidden rounded-full px-10 py-4 font-jakarta text-[18px] font-semibold global-transition bg-blue-700 text-white hover:bg-mainColor4 hover:shadow-xl">
            View Our 2026 Exhibitor List
          </button>
        </Link>
      </div>
    </div>


        {/* When and Where */}
       <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12">Here's Where You Can Find Us!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Venue */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Venue</h3>
            <p className="text-gray-800 font-medium text-lg">Rosaski, Moscov, Crocus Expo IEC, Pavilion 3</p>
          </div>

          {/* Opening Hours */}
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-lg lg:text-xl font-semibold text-blue-600 mb-4">Opening Hours</h3>
            <p className="text-gray-800 font-medium text-lg">12-16 March 2026, 10:00 -18:00</p>
            <p className="text-gray-800 font-medium text-lg">19 March 2026, 10:00 -18:00</p>
          </div>
        </div>

        {/* Map */}
        <div className="bg-gray-200 rounded-lg h-64 lg:h-80 overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.8743484199996!2d37.51654!3d55.61139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53a9e6c8c1111%3A0x1234567890ab!2sCrocus%20Expo%2C%20Moscow!5e0!3m2!1sen!2sru"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

        {/* Travel Section */}
       <section className="relative py-40">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url(/images/image.png)" }}
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  <SectionContainer>
    <div className="relative z-10 text-center text-white">
      <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
        SkladTech Awaits
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-lg lg:text-xl text-white/90">
        Whether you're traveling from across the globe or nearby, we've got you covered. 
        Find all the essential information to ensure a smooth and hassle-free trip to SkladTech 2026.
      </p>
      <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium">
        Plan Your Travel
      </button>
    </div>
  </SectionContainer>
</section>


        {/* Quick Navigation */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="mb-14">
              <div className="max-w-2xl">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                  <span className="font-semibold">TransRussia / Skladtech</span>
                </div>
                <h2 className="mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
                  Quick Navigation
                </h2>
                <p className="text-lg lg:text-xl text-gray-700">
                  Simplifying Your Participation Journey
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navigationCards.map((card, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                    <span className="text-2xl font-bold">0{index + 1}</span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
                  <p className="mb-6 text-gray-600 text-lg">{card.description}</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
                    {card.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </SectionContainer>
        </section>
        <PartnersSection/>
      </div>

    </>
  )
}

// Data
const sectors = [
  {
    title: "Engineering Systems and Service Equipment",
    href: "/sectors/engineering-systems-and-service-equipment",
    image: "/images/image.png",
  },
  {
    title: "Lifting and Transporting Equipment",
    href: "/sectors/lifting-and-transporting-equipment",
    image: "/images/image.png",
  },
  {
    title: "Packaging and Order Picking",
    href: "/sectors/packaging-and-order-picking",
    image: "/images/image.png",
  },
  {
    title: "Warehouse Automation Systems",
    href: "/sectors/warehouse-automation",
    image: "/images/image.png",
  },
  {
    title: "Warehousing and Shelving Systems",
    href: "/sectors/warehousing-systems",
    image: "/images/image.png",
  },
]

const navigationCards = [
  {
    title: "Become an Exhibitor",
    description: "Connect with 30,000+ logistics professionals across 3 days for unparalleled networking opportunities.",
    buttonText: "Book a Stand",
    href: "/exhibiting-enquiry",
  },
  {
    title: "Download Your Event Brochure",
    description: "Find out who we are, what we do, and how best we can help you achieve your strategic business goals all wrapped up in our concise event brochure.",
    buttonText: "Download Now",
    href: "/event-brochure",
  },
  {
    title: "Become a Visitor",
    description: "Not ready to become an exhibitor? Why not visit the exhibition for free and find out what to expect for the following edition",
    buttonText: "Visitor Registration",
    href: "/visitor-registration",
  },
]