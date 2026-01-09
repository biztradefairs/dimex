// app/why-visit/page.tsx
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import SectionContainer from "@/components/UI/SectionContainer"

export default function WhyVisit() {
  return (
    <>
      {/* <NavBar /> */}
      <main className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 lg:py-20">
          <SectionContainer>
            <div className="">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 mt-10">Why Visit TransRussia</h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl">
                Join over 30,500 visitors coming together to explore over 580 leading companies showcase the full spectrum of logistics and warehouse innovation.
              </p>
              <div className="flex items-center">
                <div className="bg-white text-blue-900 px-6 py-2 rounded font-bold mr-4">17 - 19 March 2026</div>
                <div className="text-lg">Crocus Expo, Moscow</div>
              </div>
            </div>
          </SectionContainer>
        </div>

        {/* Main Content */}
        <div className="py-12 lg:py-20">
          <SectionContainer>
            {/* Industry Under One Roof */}
            <div className="mb-16 lg:mb-20">
              <div className="flex items-start mb-8">
                <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-lg font-bold text-lg mr-4">T</div>
                <div>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-4">
                    The Entire Warehouse and Logistics Industry Brought Under One Roof
                  </h2>
                  <p className="text-gray-600 text-lg max-w-4xl mb-6">
                    As business opportunities grow in the country, TransRussia provides a perfect place for the entire logistics and warehouse industry to come together and meet potential partners, open up network opportunities to regional and international suppliers, expand your knowledge, and discover the latest industry innovations.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">30,500</div>
                  <div className="text-gray-600 font-medium">Visitors</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">600+</div>
                  <div className="text-gray-600 font-medium">Exhibitors</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">50+</div>
                  <div className="text-gray-600 font-medium">Countries Represented</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">13</div>
                  <div className="text-gray-600 font-medium">Event Sectors</div>
                </div>
              </div>
            </div>

            {/* Global Logistics Network */}
            <div className="mb-16 lg:mb-20 py-12 border-t border-b border-gray-200">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-6">Connect with a Global Logistics Network at TransRussia</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-4xl">
                TransRussia unites leading solution providers from the logistics and warehousing sectors worldwide, creating a dynamic platform for networking and business over three action-packed days.
              </p>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Explore the Exhibitor list
              </button>

              {/* Flags Row */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 mt-10 pt-6 border-t border-gray-200">
                {['Kazakhstan', 'Turkey', 'United Arab Emirates', 'South Korea', 'India', 'Belarus', 'Armenia', 'Azerbaijan', 'China'].map((country) => (
                  <div key={country} className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <span>{country}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Attend Grid */}
            <div className="mb-16 lg:mb-20">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-10 text-center">Why Attend TransRussia</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Card 1 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 text-3xl mb-4">👥</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-3">Connect With Key Players</h3>
                  <p className="text-gray-600 text-base lg:text-lg">
                    TransRussia is an exhibition for you to meet suppliers from within the region and beyond, allowing you to connect with the right people for your organisation.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 text-3xl mb-4">💡</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-3">Discover The Latest Innovations</h3>
                  <p className="text-gray-600 text-base lg:text-lg">
                    As the world progresses forward, the warehouse and logistics industry is no exception. Visit TransRussia to see the latest innovations in the industry and how they can benefit you.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 text-3xl mb-4">💰</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-3">Get The Best Deals</h3>
                  <p className="text-gray-600 text-base lg:text-lg">
                    Talk directly to negotiate the best prices and sign contracts on the spot with manufacturers and suppliers that will be useful for your organization for years to come.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-blue-600 text-3xl mb-4">📈</div>
                  <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-3">Stay Ahead Of Trends</h3>
                  <p className="text-gray-600 text-base lg:text-lg">
                    Learn about the latest trends and insights in the industry through the event's conference program that allows visitors like yourself to learn from the best in the industry.
                  </p>
                </div>
              </div>
            </div>

            {/* E-Brochure Section */}
            <div className="mb-16 lg:mb-20 bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Download Your E-Brochure</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Packed with details of what to expect at the show, make sure you download your copy of the event brochure today.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-flex items-center">
                    Download Now
                    <span className="ml-2">→</span>
                  </button>
                </div>
                <div className="lg:w-1/3">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📘</div>
                      <div className="text-blue-900 font-bold text-lg mb-2">Event Brochure</div>
                      <div className="text-gray-500">Latest Edition</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proven Success Stats */}
            <div className="mb-16 lg:mb-20">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Proven Success: What Visitors Say About TransRussia</h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                  At TransRussia, we prioritise delivering value and creating impactful experiences for our visitors. Our commitment to excellence is reflected in the numbers.
                </p>
                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Download Your Post-Show Report
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">98%</div>
                  <div className="text-gray-600 font-medium text-lg">Were Satisfied with the Exhibition</div>
                </div>
                <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">18%</div>
                  <div className="text-gray-600 font-medium text-lg">Only Attended TransRussia Among Similar Exhibitions</div>
                </div>
                <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">18%</div>
                  <div className="text-gray-600 font-medium text-lg">Sourced New Clients and Partners</div>
                </div>
                <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                  <div className="text-4xl lg:text-5xl font-bold text-blue-900 mb-2">63%</div>
                  <div className="text-gray-600 font-medium text-lg">Generated Quality Leads at the Show</div>
                </div>
              </div>

              <div className="text-center mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 max-w-2xl mx-auto">
                <div className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">SkaldTech</div>
                <div className="text-gray-600 text-lg">Among Similar Exhibitions for Logistics</div>
              </div>
            </div>

            {/* Two Column Layout: Who is it for and Who You Will Meet */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
              {/* Left Column - Who is TransRussia for */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">Who is TransRussia for?</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {['Supply Chain Directors', 'Logistics Strategy Managers', 'Freight Forwarders', 'Shipping Line Executives', 'Railway Logistics Managers', 'Cargo Train Operators', 'Customs and Border Control Officials'].map((item) => (
                      <div key={item} className="flex items-center">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    {['E-commerce Logistics Managers', 'Cargo Shipping Managers', 'Trucking Company Owners', 'Airline Cargo Management Teams', 'Manufacturing Supply Chain Managers', 'Last-Mile Delivery Strategists', 'Distribution Center Managers'].map((item) => (
                      <div key={item} className="flex items-center">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Who You Will Meet */}
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">Who You Will Meet</h2>
                
                {/* Company Logos Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                  {['SWIFT', 'DHL', 'FedEx', 'UPS', 'Maersk', 'FESCO'].map((company) => (
                    <div key={company} className="bg-gray-100 h-20 rounded-lg flex items-center justify-center">
                      <div className="text-gray-400 font-bold">{company}</div>
                    </div>
                  ))}
                </div>
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  View The 2026 Exhibitor List
                </button>
              </div>
            </div>

            {/* Event Sectors */}
            <div className="mb-16 lg:mb-20">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-8 text-center">Event Sectors On Display</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                {[
                  'Equipment Suppliers',
                  'IT-Solutions',
                  'Outsize & Heavy Lift Carriage (Breakbulk)',
                  'Ports & Terminals, Freight Handling Services In Ports',
                  'Logistics, Distribution Centers & Terminals',
                  'Complex Logistics Services & Freight Forwarding',
                  'E-commerce Logistics',
                  'Air Freight',
                  'Rail Freight'
                ].map((sector) => (
                  <div key={sector} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="font-bold text-blue-900 mb-2">{sector}</div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Explore All the Event Sectors
                </button>
              </div>
            </div>

            {/* More Than Just an Exhibition */}
            <div className="mb-16 lg:mb-20 bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">More Than Just an Exhibition</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-3xl">
                A blended experience of warehouse and logistics exhibition with learning and staying on top of trends through experts and industry leaders
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">Conference Programme</h3>
                  <p className="text-blue-100 mb-4 text-base lg:text-lg">
                    6 industry conferences with the most useful and relevant information to help solve your business problems, all the way from trends taking place in the industry to the prospects of development of the warehouse, transport and logistics industry.
                  </p>
                  <button className="bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                    Learn More
                  </button>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl lg:text-2xl font-bold mb-4">TransRussia Summit</h3>
                  <p className="text-blue-100 mb-4 text-base lg:text-lg">
                    A platform that brings market professionals and leading analysts on one stage to help everyone in the warehouse, transport and logistics industry to stay on top of trends of a dynamically changing industry.
                  </p>
                  <button className="bg-white text-blue-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Countdown and CTA Section */}
            <div className="mb-16 lg:mb-20">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12 text-center">
                <div className="text-2xl lg:text-3xl font-bold mb-6">Countdown to TransRussia 2026</div>
                <div className="flex justify-center items-center space-x-4 lg:space-x-6 mb-10">
                  <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl lg:text-4xl font-bold">67</div>
                    <div className="text-sm lg:text-base">Days</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl lg:text-4xl font-bold">23</div>
                    <div className="text-sm lg:text-base">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl lg:text-4xl font-bold">16</div>
                    <div className="text-sm lg:text-base">Mins</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
                  <div className="bg-white text-blue-900 rounded-xl p-6">
                    <div className="text-3xl mb-4">🏢</div>
                    <h3 className="font-bold text-lg mb-3">Become an Exhibitor</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Connect with 30,500+ logistics professionals across 3 days for unparalleled networking opportunities.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-sm lg:text-base transition-colors w-full">
                      Book a Stand
                    </button>
                  </div>
                  
                  <div className="bg-white text-blue-900 rounded-xl p-6">
                    <div className="text-3xl mb-4">📥</div>
                    <h3 className="font-bold text-lg mb-3">Download Your Event Brochure</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Find out who we are, what we do, and how best we can help you achieve your strategic business goals.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-sm lg:text-base transition-colors w-full">
                      Download Now
                    </button>
                  </div>
                  
                  <div className="bg-white text-blue-900 rounded-xl p-6">
                    <div className="text-3xl mb-4">📞</div>
                    <h3 className="font-bold text-lg mb-3">Contact Us</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Not ready to become an exhibitor? Why not visit the exhibition for free and find out what to expect.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-sm lg:text-base transition-colors w-full">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* When and Where */}
            <div className="mb-16 lg:mb-20">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-8">When and Where</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <div className="mb-8">
                    <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-4">Venue</h3>
                    <p className="text-gray-600 text-lg">
                      Russia, Moscow, Crocus Expo IEC, Pavilion 3
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-4">Opening Hours</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="font-medium w-40">17, 18 March 2026:</span>
                        <span className="text-gray-600">10:00 - 18:00</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-40">19 March 2026:</span>
                        <span className="text-gray-600">10:00 - 16:00</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-4">
                  {/* Map placeholder */}
                  <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🗺️</div>
                      <div className="text-gray-600 font-semibold">Map View</div>
                      <div className="text-gray-500 text-sm">Crocus Expo, Moscow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Moscow */}
            <div className="mb-16 lg:mb-20 bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">Explore Moscow Beyond the Exhibition</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-3xl">
                Discover the vibrant city of Moscow with its rich history, cultural attractions, and modern amenities. Make the most of your visit by exploring everything the capital has to offer.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl mb-3">🏛️</div>
                  <div className="font-bold text-blue-900">Cultural Sites</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl mb-3">🍽️</div>
                  <div className="font-bold text-blue-900">Restaurants</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl mb-3">🛍️</div>
                  <div className="font-bold text-blue-900">Shopping</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-3xl mb-3">🏨</div>
                  <div className="font-bold text-blue-900">Hotels</div>
                </div>
              </div>
            </div>

            {/* Final About Section */}
            <div className="bg-blue-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
              <div className="flex items-start mb-6">
                <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold mr-4 text-lg">T25</div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-4">TransRussia is Eurasia's leading international exhibition</h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    for transport and logistics services, warehouse equipment, and IT solutions. It brings together shippers, carriers, freight forwarders, and technology providers to explore innovations, build partnerships, and optimise supply chains across Eurasia and beyond.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <div>
                      <h3 className="font-bold text-blue-900 mb-3 text-lg">Contact Us</h3>
                      <div className="text-gray-600">+7-(495)-799-55-85</div>
                      <div className="text-gray-600">marketing@transrussia.com</div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-blue-900 mb-3 text-lg">Venue</h3>
                      <div className="text-gray-600">Crocus Expo IEC, Russia, Moscow, Pavilion 3</div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-blue-900 mb-3 text-lg">Quick Links</h3>
                      <div className="space-y-1">
                        <div className="text-blue-600 hover:text-blue-800 cursor-pointer">Become an Exhibitor</div>
                        <div className="text-blue-600 hover:text-blue-800 cursor-pointer">Download the post-show report</div>
                        <div className="text-blue-600 hover:text-blue-800 cursor-pointer">Download event brochure</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}