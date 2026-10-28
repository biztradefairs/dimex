// components/QuickNavigation.tsx - FIXED
import Link from "next/link"
import SectionContainer from './UI/SectionContainer'

const quickNavItems = [
  {
    id: 1,
    title: 'Exhibit at DIEMEX 2027',
    description: 'Showcase your machines, tooling and technology to [10,000+] die, mould and manufacturing professionals over three days in Pune. Meet OEMs and decision-makers, run live demos and generate qualified leads.',
    image: '/images/exhibitor.jpg',
    cta: {
      text: 'Book A Stand',
      href: '/exhibiting-enquiry'
    },
    number: '01'
  },
  {
    id: 2,
    title: 'Download the DIEMEX 2027 Brochure',
    description: 'See who attends, the sectors we serve, visitor profiles and stall options. Learn how DIEMEX can grow your presence in India’s die, mould and precision engineering market.',
    image: '/images/brochure.jpg',
    cta: {
      text: 'Download Brochure',
      href: '/event-brochure'
    },
    number: '02'
  },
  {
    id: 3,
    title: 'Visit DIEMEX 2027: Register Free',
    description: 'Not exhibiting? Register as a visitor to see CNC, EDM and 3D printing technology, tooling innovations, automation and advanced manufacturing solutions under one roof.',
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
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-3">Quick Navigation: Exhibit, Download the Brochure or Visit DIEMEX 2027</h2>
          <p className="text-lg text-gray-600">
            Choose how you want to take part in India’s die and mould exhibition, 24-26 March 2027, Pune.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickNavItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-[#004A96] flex items-center justify-center">
                  <span className="text-white text-xl lg:text-2xl font-bold">{item.number}</span>
                </div>
              </div>

              <h4 className="text-xl lg:text-2xl font-bold text-black mb-4">{item.title}</h4>
              <p className="mb-8 lg:mb-10 text-gray-600 text-base lg:text-lg">{item.description}</p>

              <div className="mt-auto">
                <Link
                  href={item.cta.href}
                  className="block w-full rounded-full bg-[#004A96] text-white text-center font-semibold py-3 px-6 hover:bg-[#003875] transition-colors text-sm lg:text-base"
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