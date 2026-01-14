import { notFound } from 'next/navigation';
import { sectorDatabase, allSectorSlugs } from '../data';
import SectionContainer from "@/components/UI/SectionContainer";
import QuickNavigation from "@/components/QuickNavigation";
import PartnersSection from "@/components/section/PartnersSection";
import Image from 'next/image';
import Link from 'next/link';
import WhyExhibitCard from '../components/WhyExhibitCard';
import ServiceCard from '../components/ServiceCard';
import FAQCard from '../components/FAQCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SectorPage({ params }: PageProps) {
  const { slug } = await params;
  const sectorData = sectorDatabase[slug as keyof typeof sectorDatabase];

  if (!sectorData) {
    notFound();
  }

  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <section className="pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[40px] md:text-[52px] leading-tight font-bold text-black max-w-4xl mt-10">
            {sectorData.title}
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            {sectorData.description}
          </p>

          <div className="mt-10 relative w-full h-[420px] rounded-lg overflow-hidden">
            <Image
              src={sectorData.heroImage}
              alt={sectorData.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* DESCRIPTION + FORM */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {slug === 'ports-and-terminals-freight-handling-services-in-ports' 
                ? "Power Seamless Cargo Movement with Eurasia's Port & Terminal Logistics"
                : `Power Your Business with ${sectorData.title.split(' ')[0]} Solutions`}
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed text-[17px]">
              <p>
                {slug === 'ports-and-terminals-freight-handling-services-in-ports' 
                  ? `As Eurasia expands its role in global trade, ports and maritime terminals are becoming strategic logistics hubs—facilitating efficient import/export flows across Eurasia. The country's port logistics market is projected to surpass <strong>$61 billion USD by 2028</strong>.`
                  : `The ${sectorData.title} sector is experiencing rapid growth across Eurasia, with increasing demand for specialized solutions. The market is projected to grow significantly in the coming years.`}
              </p>

              <p>
                {slug === 'ports-and-terminals-freight-handling-services-in-ports'
                  ? `At <strong>TransRussia</strong>, the ports & maritime terminals sector brings together leading stevedores, port operators, and cargo handling specialists showcasing vessel docking, transshipment, storage, and customs support.`
                  : `At <strong>TransRussia</strong>, the ${sectorData.title} sector brings together industry leaders showcasing innovative solutions, technologies, and services.`}
              </p>

              <p>
                {slug === 'ports-and-terminals-freight-handling-services-in-ports'
                  ? `Whether managing bulk, container, or project cargo, this sector connects you to the infrastructure, technology, and services powering modern port logistics.`
                  : `Whether you're looking for cutting-edge technology or reliable service providers, this sector connects you with the expertise needed to optimize your operations.`}
              </p>
            </div>

            {/* STATS */}
            <div className="flex gap-14 mt-14">
              <div>
                <p className="text-4xl text-gray-500 font-bold">{sectorData.stats.visitors}</p>
                <p className="text-gray-600 mt-1">Visitors</p>
              </div>
              <div>
                <p className="text-4xl text-gray-500 font-bold">{sectorData.stats.exhibitors}</p>
                <p className="text-gray-600 mt-1">Exhibitors</p>
              </div>
              <div>
                <p className="text-4xl text-gray-500 font-bold">{sectorData.stats.countries}</p>
                <p className="text-gray-600 mt-1">Countries Represented</p>
              </div>
            </div>
            
            <div className="mt-10">
              <Image 
                src={sectorData.heroImage} 
                alt={sectorData.title} 
                width={800} 
                height={400} 
                className="rounded-lg" 
              />
            </div>
          </div>

          {/* ENQUIRY FORM */}
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 h-fit">
            <h3 className="text-3xl font-bold text-blue-600 mb-4">Enquiry to Exhibit</h3>
            <form className="space-y-6">
              {/* Form fields remain exactly the same */}
              <div>
                <label className="block text-gray-900 font-bold mb-3">Your level of interest</label>
                <div className="space-y-3">
                  {[
                    "Ready to book my stand",
                    "Looking for more information",
                    "Looking for sponsorship opportunities",
                  ].map((option, index) => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input type="radio" name="interest" className="w-4 h-4 text-blue-600" />
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">First Name*</label>
                  <input
                    type="text"
                    placeholder="Type your first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-bold mb-2">Last Name*</label>
                  <input
                    type="text"
                    placeholder="Type your last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">Company Name*</label>
                  <input
                  type="text"
                  placeholder="Type your Company Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">Company Website*</label>
                <input
                  type="url"
                  placeholder="Company Website"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">Job Title*</label>
                <input
                  type="text"
                  placeholder="Type your Job Title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">Country*</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option>Select a country</option>
                  <option>Russia</option>
                  <option>Kazakhstan</option>
                  <option>Uzbekistan</option>
                  <option>China</option>
                  <option>Germany</option>
                  <option>Turkey</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">Phone*</label>
                <input
                  type="tel"
                  placeholder="Type your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-bold mb-2">Work Email*</label>
                <input
                  type="email"
                  placeholder="Type your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Why Exhibit Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <SectionContainer>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
            Why Exhibit in {sectorData.title.split(' ')[0]} Sector?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sectorData.whyExhibit.map((item, index) => (
              <WhyExhibitCard key={index} item={item} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href='/exhibiting-enquiry'>
              <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition">
                Enquire to Exhibit
              </button>
            </Link>
          </div>
        </SectionContainer>
      </section>

      {/* Key Services Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gray-50">
        <SectionContainer>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">Key Services on Display:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {sectorData.services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
        <SectionContainer>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">FAQs for {sectorData.title.split(' ')[0]} Sector</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {sectorData.faqs.map((faq, index) => (
              <FAQCard key={index} question={faq.question} answer={faq.answer} index={index} />
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* READY TO EXHIBIT CTA */}
      <section className="px-4 md:px-8 py-20">
        <div className="relative max-w-7xl mx-auto h-[180px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[#111827]">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1f2937_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="absolute left-0 top-0 h-full w-[160px] bg-blue-500 clip-arrow" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full gap-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Exhibit in {sectorData.title.split(' ')[0]}?
            </h2>
            <Link href='/visitor-registration'>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-8 py-3 rounded-md">
                Book Your Stand
                <span className="text-xl">→</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      <QuickNavigation />
      <PartnersSection />
    </main>
  );
}
// Add this CSS for the clip-arrow effect
const styles = `
  .clip-arrow {
    clip-path: polygon(0 0, 100% 50%, 0 100%);
  }
`;

// Add this function for static generation
export async function generateStaticParams() {
  return allSectorSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sectorData = sectorDatabase[slug as keyof typeof sectorDatabase];
  
  if (!sectorData) {
    return {
      title: 'Sector Not Found',
      description: 'The requested sector page does not exist.'
    };
  }
  
  return {
    title: `${sectorData.title} | TransRussia 2026`,
    description: sectorData.description,
    openGraph: {
      title: `${sectorData.title} | TransRussia 2026`,
      description: sectorData.description,
      images: [sectorData.heroImage]
    }
  };
}