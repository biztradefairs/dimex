import Button from './UI/Button'
import Card from './UI/Card'

const quickNavItems = [
  {
    id: 1,
    title: 'Become an Exhibitor',
    description: 'Connect with 30,000+ logistics professionals across 3 days for unparalleled networking opportunities.',
    image: '/images/exhibitor.jpg',
    cta: {
      text: 'Book A Stand',
      href: '/exhibiting-enquiry'
    },
    number: '01'
  },
  {
    id: 2,
    title: 'Download Your Event Brochure',
    description: 'Find out who we are, what we do, and how best we can help you achieve your strategic business goals all wrapped up in our concise event brochure.',
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
    description: 'Not ready to become an exhibitor? Why not visit the exhibition for free and find out what to expect for the following edition',
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
    <div className="container overflow-hidden">
      <div className="mb-14 flex flex-wrap justify-between gap-10 lg:items-end">
        <div className="lg:basis-2/3">
          <h2 className="title-72 text-black my-3">Quick Navigation</h2>
          <p className="whitespace-pre-line text-lg text-gray-600">
            Simplifying Your Participation Journey
          </p>
        </div>
      </div>
      
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {quickNavItems.map((item) => (
          <Card key={item.id}>
            <div className="flex-between">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-blue-600 mb-5"></div>
              <h4 className="title-32">{item.number}</h4>
            </div>
            
            <h4 className="title-32 font-semibold text-black mb-4">{item.title}</h4>
            <p className="mb-10 whitespace-pre-line text-gray-600">{item.description}</p>
            
            <div className="mt-auto">
              <Button href={item.cta.href} fullWidth>
                {item.cta.text}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="absolute right-0 top-0 z-[-1] h-225 w-225 opacity-10">
        <div className="h-full w-full bg-linear-to-br from-blue-100 to-transparent rounded-full"></div>
      </div>
    </div>
  )
}