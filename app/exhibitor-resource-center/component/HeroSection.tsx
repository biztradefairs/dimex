import SectionContainer from '@/components/UI/SectionContainer';

export default function HeroSection() {
  return (
    <section className="relative h-[55vh] md:h-[65vh] flex items-end overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <img
        src="https://cdn.itegroupnews.com/Exhibitor_Resource_Center_5ee614ab47.webp"
        alt="TransRussia©24"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* STRONG GRADIENT FOR TEXT VISIBILITY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* CONTENT */}
      <SectionContainer>
        <div className="relative z-10 flex h-full items-end pb-14 text-white">
          <div>
            <h2 className="title-72">
              Exhibitor Resource Center
            </h2>

            <p className="mt-4 max-w-3xl text-lg text-white/90">
              Streamline your decision-making and onboarding process.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
