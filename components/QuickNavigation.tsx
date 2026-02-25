// components/QuickNavigation.tsx - FIXED
import Link from "next/link"
import SectionContainer from './UI/SectionContainer'

const quickNavItems = [
  {
    id: 1,
    title: 'Become an Exhibitor',
    description: 'Connect with 10,000+ manufacturing professionals, OEMs, and decision-makers over 3 power-packed days of business, networking, and technology showcase at DIEMEX 2026.',
    image: '/images/exhibitor.jpg',
    cta: {
      text: 'Book A Stand',
      href: '/exhibiting-enquiry'
    },
    number: '01'
  },
  {
    id: 2,
    title: 'Download Diemex 2026 Event Brochure',
    description: 'Discover who we are, the industries we serve, visitor profiles, sector highlights, and how DIEMEX can help you expand your footprint in India’s rapidly growing die, mould, and precision engineering market — all in one comprehensive brochure.',
    image: '/images/brochure.jpg',
    cta: {
      text: 'Download Now',
      href: '/event-brochure'
    },
    number: '02'
  },
  {
    id: 3,
    title: 'Become a Visitor',
    description: 'Not ready to exhibit? Register as a visitor and explore cutting-edge machine tools, tooling innovations, automation technologies, and advanced manufacturing solutions — all under one roof.',
    image: '/images/visitor.jpg',
    cta: {
      text: 'Register Now',
      href: '/visitor-registration'
    },
    number: '03'
  }
]

export default function QuickNavigation() {
  return (
    <section className="py-32">
      <SectionContainer>
        <div className="mb-12 lg:mb-14">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-3">Quick Navigation</h2>
          <p className="text-lg text-gray-600">
            Simplifying Your Participation Journey
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickNavItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#004D9F] flex items-center justify-center">
                  <span className="text-white text-xl lg:text-2xl font-bold">{item.number}</span>
                </div>
                <span className="text-2xl font-bold text-gray-300">{item.number}</span>
              </div>
              
              <h4 className="text-xl lg:text-2xl font-bold text-black mb-4">{item.title}</h4>
              <p className="mb-8 lg:mb-10 text-gray-600 text-base lg:text-lg">{item.description}</p>
              
              <div className="mt-auto">
                <Link 
                  href={item.cta.href}
                  className="block w-full rounded-full bg-[#004D9F] text-white text-center font-semibold py-3 px-6 hover:bg-[#0074D9] transition-colors text-sm lg:text-base"
                >
                  {item.cta.text}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}