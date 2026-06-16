// app/exhibiting-enquiry/page.tsx
import DiemexTabbedFormWrapper from '@/components/diemextabbedform';
import SectionContainer from '@/components/UI/SectionContainer';

export default function ExhibitorEnquiryPage() {
  return (
    <main className="bg-white font-parabolica">
      {/* HEADER */}
      <div className="bg-[#F4FAFF] pt-48 pb-10">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
            Enquiry to Exhibit
          </h1>
          <p className="mt-4 max-w-4xl text-lg text-gray-600">
            Please complete the form below and our team will contact you regarding DIEMEX 2026 exhibiting opportunities.
          </p>
        </SectionContainer>
      </div>

      {/* FORM - With max width constraint */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
          <DiemexTabbedFormWrapper
            defaultTab="exhibitor"
            headerTitle="Enquire about exhibiting at our event"
            headerSubtitle="Please fill in the details below and our team will get in touch with you."
          />
        </div>
      </section>
    </main>
  );
}