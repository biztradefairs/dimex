import PartnersSection from "@/components/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"

export default function WhyVisit() {
  return (
    <>
      {/* <NavBar /> */}
      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-end">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/image.png)" }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />

          {/* Content */}
          <SectionContainer>
            <div className="relative z-10 pb-16 lg:pb-24">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 max-w-4xl">
                Why Visit TransRussia
              </h1>

              <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl">
                Join over 30,500 visitors coming together to explore over 580 leading
                companies showcasing the full spectrum of logistics and warehouse innovation.
              </p>

              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-lg font-medium">17 – 19 March 2026</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-lg font-medium">Crocus Expo, Moscow</span>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>


        {/* Main Content */}
        <div className="py-12 lg:py-20">

          <section className="bg-white py-20 lg:py-28">
            <SectionContainer>
              <h2 className="text-5xl lg:text-6xl font-bold mb-8 max-w-10xl leading-tight">
                The Entire Warehouse and Logistics Industry<br />
                Brought Under One Roof
              </h2>

              <p className="text-gray-700 text-[10] max-w-7xl mb-10 leading-relaxed">
                As business opportunities grow in the country, TransRussia provides a perfect
                place for the entire logistics and warehouse industry to come together and meet
                potential partners, open up network opportunities to regional and international
                suppliers, expand your knowledge, and discover the latest industry innovations.
              </p>

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-medium">
                Contact Us
              </button>
            </SectionContainer>
          </section>


          {/* Stats Grid */}
          <section className="bg-blue-50 py-20">
            <SectionContainer>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

                <div>
                  <div className="text-6xl font-bold text-blue-700 mb-4">30,500</div>
                  <p className="text-lg text-gray-800 mb-6">Visitors</p>
                  <div className="h-px bg-gray-300 w-full" />
                </div>

                <div>
                  <div className="text-6xl font-bold text-blue-700 mb-4">600+</div>
                  <p className="text-lg text-gray-800 mb-6">Exhibitors</p>
                  <div className="h-px bg-gray-300 w-full" />
                </div>

                <div>
                  <div className="text-6xl font-bold text-blue-700 mb-4">50+</div>
                  <p className="text-lg text-gray-800 mb-6">
                    Countries Represented
                  </p>
                  <div className="h-px bg-gray-300 w-full" />
                </div>

                <div>
                  <div className="text-6xl font-bold text-blue-700 mb-4">13</div>
                  <p className="text-lg text-gray-800 mb-6">Event Sectors</p>
                  <div className="h-px bg-gray-300 w-full" />
                </div>

              </div>
            </SectionContainer>
          </section>


          {/* GLOBAL LOGISTICS NETWORK */}
          <section className="relative bg-blue-50 py-20 lg:py-28 overflow-hidden">
            {/* World Map Background */}
            <div
              className="absolute inset-0 bg-no-repeat bg-center opacity-20"
              style={{ backgroundImage: "url(/images/world-map-dotted.png)" }}
            />

            <SectionContainer>
              <div className="relative z-10 text-center max-w-4xl mx-auto">

                {/* Heading */}
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-6 leading-tight">
                  Connect with a Global Logistics
                  <br />
                  Network at TransRussia
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-lg lg:text-xl mb-10 leading-relaxed">
                  TransRussia unites leading solution providers from the logistics and
                  warehousing sectors worldwide, creating a dynamic platform for
                  networking and business over three action-packed days.
                </p>

                {/* CTA */}
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full text-base font-medium transition">
                  Explore the Exhibitor list
                </button>

                {/* Countries */}
                <div className="flex flex-wrap justify-center gap-4 mt-14">
                  {[
                    "Kazakhstan",
                    "Turkey",
                    "Pakistan",
                    "United Arab Emirates",
                    "South Korea",
                    "India",
                    "Uzbekistan",
                    "Armenia",
                    "Azerbaijan",
                    "Belarus",
                    "China",
                  ].map((country) => (
                    <div
                      key={country}
                      className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm text-gray-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-gray-300" />
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </SectionContainer>
          </section>


          {/* WHY ATTEND TRANSRUSSIA */}
          <section className="py-20 lg:py-28 bg-white">
            <SectionContainer>
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-12">
                Why Attend TransRussia
              </h2>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Card 1 */}
                <div
                  className="relative h-[320px] lg:h-[360px] overflow-hidden"
                  style={{ backgroundImage: "url(/images/attend-1.jpg)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
                  <div className="absolute bottom-0 p-6 lg:p-8 text-white max-w-md">
                    <h3 className="text-2xl font-bold mb-3">
                      Connect With Key Players
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">
                      TransRussia is an exhibition for you to meet suppliers from within the
                      region and beyond, allowing you to connect with the right people for your
                      organisation.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="relative h-[320px] lg:h-[360px] overflow-hidden"
                  style={{ backgroundImage: "url(/images/attend-2.jpg)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
                  <div className="absolute bottom-0 p-6 lg:p-8 text-white max-w-md">
                    <h3 className="text-2xl font-bold mb-3">
                      Discover The Latest Innovations
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">
                      Visit TransRussia to see the latest innovations in the warehouse and
                      logistics industry and understand how they can benefit you.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div
                  className="relative h-[320px] lg:h-[360px] overflow-hidden"
                  style={{ backgroundImage: "url(/images/attend-3.jpg)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
                  <div className="absolute bottom-0 p-6 lg:p-8 text-white max-w-md">
                    <h3 className="text-2xl font-bold mb-3">
                      Get The Best Deals
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">
                      Talk directly to negotiate the best prices and sign contracts on the spot
                      with manufacturers and suppliers useful for years to come.
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div
                  className="relative h-[320px] lg:h-[360px] overflow-hidden"
                  style={{ backgroundImage: "url(/images/attend-4.jpg)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
                  <div className="absolute bottom-0 p-6 lg:p-8 text-white max-w-md">
                    <h3 className="text-2xl font-bold mb-3">
                      Stay Ahead Of Trends
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">
                      Learn about the latest trends and insights through the event’s conference
                      programme led by industry experts.
                    </p>
                  </div>
                </div>

              </div>
            </SectionContainer>
          </section>


          {/* E-Brochure Section */}
          <div className="py-16 lg:py-24">
            <SectionContainer>
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
            </SectionContainer>
          </div>

          {/* Proven Success Stats */}
          <div className="mb-16 lg:mb-20">
            <section className="bg-white py-20 lg:py-28">
              <SectionContainer>
                <h2 className="text-5xl lg:text-6xl font-bold mb-6 max-w-12xl leading-tight">
                  Proven Success: What Visitors Say About TransRussia
                </h2>

                <p className="text-gray-700 text-[10] max-w-8xl mb-10 leading-relaxed">
                  At TransRussia, we prioritise delivering value and creating impactful
                  experiences for our visitors. Our commitment to excellence is reflected
                  in the numbers.
                </p>

                <button className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-full text-lg font-medium">
                  Download Your Post-Show Report
                </button>
              </SectionContainer>
            </section>


            <section className="bg-blue-50 py-10">
              <SectionContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">

                  <div>
                    <div className="text-6xl font-bold text-blue-700 mb-4">98%</div>
                    <p className="text-lg text-gray-800 mb-6">
                      Were Satisfied with the Exhibition
                    </p>
                    <div className="h-px bg-gray-300 w-full" />
                  </div>

                  <div>
                    <div className="text-6xl font-bold text-blue-700 mb-4">78%</div>
                    <p className="text-lg text-gray-800 mb-6">
                      Only Attended TransRussia and SkaldTech Among Similar Exhibitions for Logistics
                    </p>
                    <div className="h-px bg-gray-300 w-full" />
                  </div>

                  <div>
                    <div className="text-6xl font-bold text-blue-700 mb-4">78%</div>
                    <p className="text-lg text-gray-800 mb-6">
                      Sourced New Clients and Partners
                    </p>
                    <div className="h-px bg-gray-300 w-full" />
                  </div>

                  <div>
                    <div className="text-6xl font-bold text-blue-700 mb-4">63%</div>
                    <p className="text-lg text-gray-800 mb-6">
                      Generated Quality Leads at the Show
                    </p>
                    <div className="h-px bg-gray-300 w-full" />
                  </div>

                </div>
              </SectionContainer>
            </section>
          </div>
          {/* WHO IS TRANSRUSSIA FOR */}
          <section className="py-20 lg:py-28 bg-white">
            <SectionContainer>
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-12">
                Who is TransRussia for?
              </h2>

              {/* Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Column 1 */}
                <div className="bg-blue-50 p-8">
                  <ul className="space-y-4 text-gray-800">
                    <li>▪ Supply Chain Directors</li>
                    <li>▪ Logistics Strategy Managers</li>
                    <li>▪ Freight Forwarders</li>
                    <li>▪ Cargo Shipping Managers</li>
                    <li>▪ Trucking Company Owners</li>
                    <li>▪ Fleet Management Professionals</li>
                    <li>▪ Port Authority Representatives</li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="bg-blue-50 p-8">
                  <ul className="space-y-4 text-gray-800">
                    <li>▪ Shipping Line Executives</li>
                    <li>▪ Railway Logistics Managers</li>
                    <li>▪ Cargo Train Operators</li>
                    <li>▪ Airline Cargo Management Teams</li>
                    <li>▪ Manufacturing Supply Chain Managers</li>
                    <li>▪ Logistics Technology Managers</li>
                    <li>▪ Transportation Policy Makers</li>
                  </ul>
                </div>

                {/* Column 3 */}
                <div className="bg-blue-50 p-8">
                  <ul className="space-y-4 text-gray-800">
                    <li>▪ Customs and Border Control Officials</li>
                    <li>▪ E-commerce Logistics Managers</li>
                    <li>▪ Last-Mile Delivery Strategists</li>
                    <li>▪ Distribution Center Managers</li>
                    <li>▪ Import / Export Logistics Specialists</li>
                    <li>▪ Transportation Infrastructure Planners</li>
                    <li>▪ Financial and Other Service Providers</li>
                  </ul>
                </div>

              </div>
            </SectionContainer>
          </section>

          {/* A SNAPSHOT OF EXHIBITORS */}
          <section className="py-16 lg:py-24">
            <SectionContainer>
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">Who You Will Meet</h2>

              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-gray-100 p-4 rounded-lg h-16 flex items-center justify-center">
                    <div className="text-xs text-gray-500">Logo {i}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
                {[9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                  <div key={i} className="bg-gray-100 p-4 rounded-lg h-16 flex items-center justify-center">
                    <div className="text-xs text-gray-500">Logo {i}</div>
                  </div>
                ))}
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-base font-medium">
                View Top 2024 Exhibitor List
              </button>
            </SectionContainer>
          </section>
          {/* EVENT SECTORS ON DISPLAY */}
          <section className="py-20 lg:py-28 bg-white">
            <SectionContainer>
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-12">
                Event Sectors On Display
              </h2>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

                {[
                  { title: "Equipment Suppliers", image: "/images/sectors/equipment.jpg" },
                  { title: "Ports & Terminals, Freight Handling Services In Ports", image: "/images/sectors/ports.jpg" },
                  { title: "Road Freight Transportation", image: "/images/sectors/road.jpg" },
                  { title: "Maritime & Inland Waterway Transport", image: "/images/sectors/maritime.jpg" },
                  { title: "IT-Solutions", image: "/images/sectors/it.jpg" },
                  { title: "Logistics, Distribution Centers & Terminals", image: "/images/sectors/distribution.jpg" },
                  { title: "Outsize & Heavy Lift Carriage (Breakbulk)", image: "/images/sectors/heavy.jpg" },
                  { title: "Complex Logistics Services & Freight Forwarding", image: "/images/sectors/complex.jpg" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    {/* Image */}
                    <div className="h-44 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Title */}
                    <div className="p-4">
                      <p className="text-gray-900 text-sm font-medium leading-snug">
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* CTA */}
              <div className="text-center">
                <button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full text-base font-medium">
                  Explore All the Event Sectors
                </button>
              </div>
            </SectionContainer>
          </section>

          {/* MORE THAN JUST AN EXHIBITION */}
          <section className="py-20 lg:py-28 bg-white">
            <SectionContainer>
              {/* Header */}
              <div className="flex items-start justify-between mb-12">
                <div className="max-w-3xl">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                    More Than Just an Exhibition
                  </h2>
                  <p className="text-gray-600 text-lg">
                    A blended experience of warehouse and logistics exhibition with learning
                    and staying on top of trends through experts and industry leaders
                  </p>
                </div>

                {/* Arrows */}
                <div className="hidden md:flex gap-3">
                  <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    ←
                  </button>
                  <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">
                    →
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Card 1 */}
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  {/* Top dark section */}
                  <div className="bg-blue-950 text-white p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold mb-3">
                      Conference Programme
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">
                      6 industry conferences with the most useful and relevant information
                      to help solve your business problems, all the way from trends taking
                      place in the industry to the prospects of development of the warehouse,
                      transport and logistics industry.
                    </p>
                  </div>

                  {/* Image */}
                  <div className="h-64 lg:h-72">
                    <img
                      src="/images/more/conference.jpg"
                      alt="Conference Programme"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Card 2 */}
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  {/* Top dark section */}
                  <div className="bg-blue-950 text-white p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-bold mb-3">
                      TransRussia Summit
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">
                      A platform that brings market professionals and leading analysts on one
                      stage to help everyone in the warehouse, transport and logistics industry
                      to stay on top of trends of a dynamically changing industry.
                    </p>
                  </div>

                  {/* Image */}
                  <div className="h-64 lg:h-72">
                    <img
                      src="/images/more/summit.jpg"
                      alt="TransRussia Summit"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>
            </SectionContainer>
          </section>


          <section className="py-16 lg:py-24">
            <SectionContainer>
              <h3 className="text-sm text-blue-600 font-semibold mb-2">Simplifying Your Participation Journey</h3>
              <h2 className="text-3xl lg:text-4xl font-bold mb-12">Quick Navigation</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="border border-gray-200 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                    <span className="text-3xl font-bold text-gray-300">01</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3">Become an Exhibitor</h3>
                  <p className="text-gray-600 text-base mb-6">
                    Join 600+ exhibitors in presenting your solutions for 3 days for unmatched networking opportunities.
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
                    Become an Exhibitor
                  </button>
                </div>

                {/* Card 2 */}
                <div className="border border-gray-200 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📘</span>
                    </div>
                    <span className="text-3xl font-bold text-gray-300">02</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3">Download Event Brochure</h3>
                  <p className="text-gray-600 text-base mb-6">
                    Find out what we and how our brochure has the key information to prepare up to date brochure.
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
                    Download Now
                  </button>
                </div>

                {/* Card 3 */}
                <div className="border border-gray-200 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                    <span className="text-3xl font-bold text-gray-300">03</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3">Become a Visitor</h3>
                  <p className="text-gray-600 text-base mb-6">
                    Why not visit the market? Why not visit the show and what to expect for the following edition.
                  </p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium">
                    Visitor Registration
                  </button>
                </div>
              </div>
            </SectionContainer>
          </section>


          {/* WHERE & WHEN - RESTORED SECTION */}
          <section className="py-16 lg:py-24">
            <SectionContainer>
              <h2 className="text-3xl lg:text-4xl font-bold mb-12">When and Where</h2>

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
            </SectionContainer>
          </section>
          <section className="py-16 lg:py-24">
            <SectionContainer>
              <PartnersSection />
            </SectionContainer>
          </section>


        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}