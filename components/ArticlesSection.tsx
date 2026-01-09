// components/ArticlesSection.tsx - FIXED
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
  ];

  return (
    <section className="bg-[#F4F4F4] py-32">
      <SectionContainer>
        {/* ================= HEADER ================= */}
        <div className="mb-16 lg:mb-20">
          {/* TITLE */}
          <h2 className="mb-6 text-3xl lg:text-5xl xl:text-6xl font-[600] leading-[0.85] tracking-tight text-black">
            Event Insights & Industry Trends
          </h2>

          {/* SUBTEXT + BUTTON */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-3xl text-lg lg:text-xl leading-relaxed text-gray-700">
              Stay up to date with the latest in the industry and the show
            </p>

            <a href="/articles" className="w-fit">
              <button className="flex items-center justify-center gap-2 rounded-full bg-[#0092D7] px-8 lg:px-10 py-3 lg:py-4 text-[16px] font-semibold text-white transition-all duration-300 hover:bg-[#33A8DF]">
                View all articles
              </button>
            </a>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid gap-8 lg:gap-12 xl:grid-cols-2">
          {/* FEATURED ARTICLE */}
          <div className="flex flex-col gap-6">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="h-[320px] lg:h-[420px] w-full rounded-2xl object-cover"
            />

            <span className="text-base font-medium text-[#33A8DF]">
              {articles[0].date}
            </span>

            <a
              href={`/articles/${articles[0].slug}`}
              className="text-black"
            >
              <h4 className="mb-4 text-2xl lg:text-3xl font-bold leading-tight transition-colors hover:text-[#0092D7]">
                {articles[0].title}
              </h4>
            </a>

            <p className="text-lg leading-relaxed text-gray-700">
              {articles[0].excerpt}
            </p>
          </div>

          {/* TWO SMALLER ARTICLES */}
          <div className="flex flex-col gap-8">
            {articles.slice(1).map((article, index) => (
              <div
                key={index}
                className="grid gap-6 lg:gap-8 rounded-2xl bg-white p-6 lg:grid-cols-2"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-48 w-full rounded-xl object-cover"
                />

                <div className="flex flex-col gap-4">
                  <span className="text-base font-medium text-[#33A8DF]">
                    {article.date}
                  </span>

                  <a
                    href={`/articles/${article.slug}`}
                    className="text-black"
                  >
                    <h4 className="text-xl lg:text-2xl font-bold leading-tight transition-colors hover:text-[#0092D7]">
                      {article.title}
                    </h4>
                  </a>

                  <p className="text-base leading-relaxed text-gray-700">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}