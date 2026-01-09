// components/SectorsSection.tsx - FIXED
import SectionContainer from './UI/SectionContainer'

export default function SectorsSection() {
  const sectors = [
    { title: 'Road Freight', slug: 'road', image: '/images/image.png' },
    { title: 'Rail Freight', slug: 'rail', image: '/images/image.png' },
    { title: 'Air Freight', slug: 'air', image: '/images/image.png' },
    { title: 'Sea Freight', slug: 'sea', image: '/images/image.png' },
    { title: 'Warehouse Tech', slug: 'warehouse', image: '/images/image.png' },
    { title: 'Logistics IT', slug: 'logistics-it', image: '/images/image.png' },
  ];

  return (
    <section className="bg-white py-32">
      <SectionContainer>
        {/* ================= HEADER ================= */}
        <div className="mb-12 lg:mb-15 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}
          <div className="max-w-3xl">
            {/* LABEL */}
            <div className="mb-5 flex items-center gap-3">
              <img
                src="/images/logo-icon-3.png"
                alt="Sectors"
                className="h-6 w-6"
              />
              <span className="text-sm font-medium text-gray-700">
                Sectors
              </span>
            </div>

            {/* TITLE */}
            <h2 className="
              text-4xl 
              lg:text-5xl 
              xl:text-6xl
              font-[600] 
              leading-[0.95]
              tracking-tight
            ">
              Discover 13 Product Sectors In-Demand
            </h2>
          </div>

          {/* RIGHT BUTTON */}
          <div className="mt-6 lg:mt-0">
            <a href="/sectors">
              <button className="
                rounded-full 
                bg-[#005EB8] 
                px-8 lg:px-10 
                py-3 lg:py-4 
                text-white 
                font-semibold 
                transition 
                hover:bg-[#0074D9]
              ">
                Explore Sectors
              </button>
            </a>
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <a
              key={i}
              href={`/sectors/${sector.slug}`}
              className="group relative h-[400px] lg:h-[460px] overflow-hidden"
            >
              {/* IMAGE */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${sector.image})` }}
              />

              {/* DARK GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* TEXT */}
              <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  {sector.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}