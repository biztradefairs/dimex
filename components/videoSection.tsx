import SectionContainer from "./UI/SectionContainer"

export default function VideoSection() {
  return (
    <section className="bg-white py-10">
      <SectionContainer>
        <div className="relative overflow-hidden rounded-3xl aspect-video bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/sC_vmTk98eI?start=25&autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0"
            title="Diemex 2026"
            frameBorder="0"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Overlay Text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-[#2BB7A8]/90 px-10 py-4 rounded-md">
              <span className="text-white text-2xl md:text-4xl font-bold tracking-wide">
                SUPPLY CHAINS DISRUPTED
              </span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
