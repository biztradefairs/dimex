import SectionContainer from "./UI/SectionContainer"

export default function VideoSection() {
  // --- VIDEO ID FROM YOUR LINK: https://www.youtube.com/watch?v=wJcae3DLXc0 ---
  const VIDEO_ID = "3P-hRFrsXIs";
  // ---

  const embedUrl = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&loop=1&playlist=${VIDEO_ID}`;

  return (
    <section className="bg-white py-10">
      <SectionContainer>
        <div className="relative overflow-hidden rounded-3xl aspect-video bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title="2nd Edition DIEMEX International Die & Mould Exhibition 2025"
            frameBorder="0"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Overlay Text */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="bg-[#2BB7A8]/90 px-10 py-4 rounded-md">
              <span className="text-white text-2xl md:text-4xl font-bold tracking-wide">
                DIEMEX 2025 HIGHLIGHTS
              </span>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}