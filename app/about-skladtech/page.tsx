// app/about-skladtech/page.tsx
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import SectionContainer from "@/components/UI/SectionContainer"

export default function AboutSkladTechPage() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-black/70 to-black/20">
          <div className="absolute inset-0 z-0">
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: "url(/images/image.png)" }}
            />
          </div>
          <SectionContainer>
            <div className="relative z-10 py-40 text-white">
              <h1 className="mb-4 text-4xl lg:text-5xl xl:text-6xl font-bold">
                About SkladTech
              </h1>
              <p className="text-xl lg:text-2xl">
                The Commercial Heart of Warehousing Solutions.
              </p>
            </div>
          </SectionContainer>
        </section>

        {/* Where Warehousing Solutions Come to Life */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="max-w-6xl">
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
            <div className="max-w-6xl">
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
        <section className="py-16 lg:py-24 bg-blue-900 text-white">
          <SectionContainer>
            <div className="relative">
              <div className="max-w-2xl">
                <h2 className="mb-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
                  Download Your Event Brochure
                </h2>
                <p className="mb-8 text-lg lg:text-xl">
                  Make sure you grab your copy of the event brochure to learn more about the show and explore your participation opportunities.
                </p>
                <button className="bg-white text-blue-900 hover:bg-gray-100 px-8 lg:px-10 py-3 lg:py-4 rounded-full font-medium">
                  Download Now
                </button>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Meet the Visionaries */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <div className="max-w-6xl">
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

        {/* When and Where */}
        <section className="py-16 lg:py-24">
          <SectionContainer>
            <h2 className="mb-10 text-3xl lg:text-4xl xl:text-5xl font-bold">
              When and Where
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-xl bg-gray-50 p-8">
                <h3 className="mb-4 text-2xl font-bold">Venue</h3>
                <p className="text-lg">Russia, Moscow, Crocus Expo IEC, Pavilion 3</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-8">
                <h3 className="mb-4 text-2xl font-bold">Opening Hours</h3>
                <p className="text-lg">18, 19 March 2025: 10:00 - 18:00</p>
                <p className="text-lg">20 March 2025: 10:00 - 16:00</p>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Travel Section */}
        <section className="relative py-40">
          <div className="absolute inset-0 z-0">
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: "url(/images/image.png)" }}
            />
          </div>
          <SectionContainer>
            <div className="relative z-10 text-center text-white">
              <h2 className="mb-6 text-3xl lg:text-4xl xl:text-5xl font-bold">
                SkladTech Awaits
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg lg:text-xl">
                Whether you're traveling from across the globe or nearby, we've got you covered. Find all the essential information to ensure a smooth and hassle-free trip to SkladTech 2026.
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
      </div>
      <Footer />
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