// app/become-partner/page.tsx
import DiemexTabbedFormWrapper from '@/components/diemextabbedform';
import SectionContainer from '@/components/UI/SectionContainer';

export default function BecomePartnerPage() {
  return (
    <main>
      {/* Your page content */}
      <div className="bg-[#F4FAFF] pt-48 pb-10">
                  <SectionContainer>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
                      Become a Partner
                    </h1>
                    <p className="mt-4 max-w-4xl text-lg text-gray-600">
                      Partner with DIEMEX 2026 and put your brand in front of 10,000+ professionals.
                    </p>
                  </SectionContainer>
                </div>
      <DiemexTabbedFormWrapper
        defaultTab="sponsor"
        headerTitle="Become a Sponsor / Partner"
        headerSubtitle="Partner with DIEMEX 2026 and put your brand in front of 10,000+ professionals."
      />
    </main>
  );
}