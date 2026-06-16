// app/visitor-registration/page.tsx
import DiemexTabbedFormWrapper from '@/components/diemextabbedform';
import SectionContainer from '@/components/UI/SectionContainer';

export default function VisitorRegistrationPage() {
  return (
    <main>

      <div className="bg-[#F4FAFF] pt-48 pb-10">
                  <SectionContainer>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black">
                      Visitor Registration
                    </h1>
                    <p className="mt-4 max-w-4xl text-lg text-gray-600">
                      Register now to access India's premier die & mould manufacturing exhibition.
                    </p>
                  </SectionContainer>
                </div>
      {/* Your page content */}
      <DiemexTabbedFormWrapper
        defaultTab="enquiry"
        headerTitle="Visitor Registration"
        headerSubtitle="Register now to access India's premier die & mould manufacturing exhibition."
      />
    </main>
  );
}