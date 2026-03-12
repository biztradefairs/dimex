// components/ArticlesSection.tsx - RESPONSIVE VERSION
import SectionContainer from './UI/SectionContainer'

export default function ArticlesSection() {
  const articles = [
    {
      title:
        'Why Is Rail Freight Becoming a Stronger Alternative for Long-Haul Cargo in 2026?',
      slug:
        'why-is-rail-freight-becoming-a-stronger-alternative-for-long-haul-cargo-in-2026',
      excerpt:
        'Rail freight for long-haul cargo offers reliable schedules, lower emissions, and optimized corridor operations. Digital planning, terminal upgrades, and sea–land integration help shippers move goods efficiently across Eurasia in 2026.',
      image: '/images/image.png',
      date: 'November 20, 2025',
    },
    {
      title:
        'How Are Ports Preparing for Increased Freight Handling Demands in 2026?',
      slug:
        'how-are-ports-preparing-for-increased-freight-handling-demands-in-2026',
      excerpt:
        'Freight handling in ports is evolving with infrastructure upgrades, digital operations, and sea–land integration. Ports in Eurasia enhance berth productivity, reduce dwell, and ensure reliable inland handoffs to meet growing 2026 cargo demands.',
      image: '/images/image.png',
      date: 'November 05, 2025',
    },
    {
      title:
        'What\'s Next for Oversized Cargo Handling in the Global Logistics Industry?',
      slug:
        'what-s-next-for-oversized-cargo-handling-in-the-global-logistics-industry',
      excerpt:
        'Oversized cargo handling is evolving with digital planning, IoT monitoring, and coordinated sea–land operations. Operators reduce risk, improve speed, and ensure predictable delivery for turbines, bridge spans, and other large project freight across Eurasia.',
      image: '/images/image.png',
      date: 'October 23, 2025',
    },
  ]

  return (
    <section className="bg-[#F4F4F4] py-16 sm:py-20 lg:py-24 xl:py-32">
      <SectionContainer>
        {/* HEADER */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold tracking-tight text-black">
            Event Insights & Industry Trends
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <p className="max-w-3xl text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700">
              Stay up to date with the latest in the industry and the show
            </p>

            <a href="/articles">
              <button className="rounded-full bg-[#004D9F] px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-[#0A66C2] transition">
                View all articles
              </button>
            </a>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* LEFT FEATURED */}
          <div>
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[420px] w-full rounded-xl sm:rounded-2xl object-cover"
            />

            <span className="mt-4 sm:mt-6 block text-xs sm:text-sm font-medium text-[#0054A6]">
              {articles[0].date}
            </span>

            <a href={`/articles/${articles[0].slug}`}>
              <h3 className="mt-2 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight text-black hover:text-[#0054A6] transition">
                {articles[0].title}
              </h3>
            </a>

            <p className="mt-3 sm:mt-4 max-w-[680px] text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 line-clamp-2">
              {articles[0].excerpt}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 max-w-[520px]">
            {articles.slice(1).map((article, index) => (
              <div key={index} className="flex gap-4 sm:gap-6 items-start">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-[120px] sm:h-[150px] lg:h-[180px] xl:h-[200px] w-[140px] sm:w-[180px] lg:w-[220px] xl:w-[250px] rounded-lg sm:rounded-xl object-cover flex-shrink-0"
                />

                <div>
                  <span className="block text-xs sm:text-sm font-medium text-[#0054A6]">
                    {article.date}
                  </span>

                  <a href={`/articles/${article.slug}`}>
                    <h4 className="mt-1 text-sm sm:text-base lg:text-lg xl:text-xl font-semibold leading-snug text-black hover:text-[#0054A6] transition">
                      {article.title}
                    </h4>
                  </a>

                  <p className="mt-2 text-xs sm:text-sm lg:text-base leading-relaxed text-gray-700 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}