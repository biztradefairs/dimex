import { notFound } from 'next/navigation';
import SectionContainer from '@/components/UI/SectionContainer';
import { partnersData } from '@/data/partnersData';

// Type for params
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PartnerDetailPage({ params }: PageProps) {
  // Await the params Promise to get the actual values
  const { slug } = await params;

  // Flatten all partners
  const allPartners = Object.values(partnersData).flat();
  
  // Find the partner by slug
  const partner = allPartners.find(p => p.slug === slug);

  if (!partner) return notFound();

  return (
    <div className="bg-white mt-50">
      {/* HEADER */}
      <SectionContainer>
        <h1 className="mt-24 text-4xl lg:text-5xl font-semibold text-black">
          {partner.name}
        </h1>
      </SectionContainer>

      {/* LOGO */}
      <SectionContainer>
        <div className="mt-12 flex items-center">
          <img
            src={partner.logo}
            alt={partner.name}
            className="h-28 object-contain"
          />
        </div>
      </SectionContainer>

      {/* ROLE */}
      <SectionContainer>
        <h2 className="mt-10 text-2xl font-semibold text-[#0E1C35]">
          {partner.role}
        </h2>
      </SectionContainer>

      {/* DESCRIPTION */}
      <SectionContainer>
        <div className="mt-6 rounded-2xl bg-[#F4F9FF] p-6 lg:p-10 shadow-md">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {partner.description}
          </p>
        </div>
      </SectionContainer>

      {/* CTA */}
      {partner.websiteLink && (
        <SectionContainer>
          <div className="mt-10">
            <a
              href={partner.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-blue-700 px-8 py-3 text-white font-semibold hover:bg-blue-800 transition"
            >
              Visit Website
            </a>
          </div>
        </SectionContainer>
      )}

      <div className="h-24" />
    </div>
  );
}