import SectionContainer from '@/components/UI/SectionContainer';

export default function AttentionSection() {
  return (
    <section className="py-16">
      <SectionContainer>
        <div className="relative">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            <h2 className="title-72 text-black mb-8">ATTENTION</h2>
            
            <div className="max-w-4xl">
              <p className="text-lg text-gray-600 mb-6">
                Design project of your stand with an indication of overall dimensions must be approved by the ITE EXPO INTERNATIONAL LLC Technical Service Department.
              </p>
              
              <p className="text-lg text-gray-600">
                Please send it via e-mail no later than 1 month before set-up. You can find the contact person information on the forms or below.
              </p>
            </div>
          </div>
          
          {/* Optional decorative element */}
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-mainColor2 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}