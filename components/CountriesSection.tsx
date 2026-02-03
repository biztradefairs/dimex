// components/CountriesSection.tsx
import SectionContainer from './UI/SectionContainer'

export default function CountriesSection() {
  const countries = [
    { name: 'China', flag: 'https://cdn.itegroupnews.com/Flag_icons_3e3608eca2.png' },
    { name: 'India', flag: 'https://cdn.itegroupnews.com/India_77390bec7a.webp' },
    { name: 'Russia', flag: 'https://cdn.itegroupnews.com/russia_dc66ea4a45.png' },
    { name: 'Türkiye', flag: 'https://cdn.itegroupnews.com/Turkey_2818f8c3f0.png' },
    { name: 'United Arab Emirates', flag: 'https://cdn.itegroupnews.com/UAE_b6a7e65500.png' },
  ]

  return (
    <section className="bg-[#F4F4F4] py-32">
      <SectionContainer>
        {/* Header */}
        <div className="mb-20 flex flex-col gap-10 text-center">
          {/* Pill */}
          <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 w-fit mx-auto shadow-sm">
            <img
              src="/images/logo-icon-3.png"
              alt="TransRussia"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-gray-900">
              Countries
            </span>
          </div>

          {/* Heading – SAME TEXT */}
          <h2 className="text-5xl lg:text-7xl font-bold text-black leading-[0.9] tracking-tight">
            Discover the Global Reach of <br /> DIEMEX
          </h2>

          {/* Paragraph – SAME TEXT */}
          <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            DIEMEX brings together die & mould manufacturers, tooling suppliers,
            material specialists, and advanced manufacturing 
            solution providers from across the globe to connect, collaborate,
            and conduct business over three focused days of the exhibition.
          </p>

          {/* Button – SAME TEXT */}
          <a
            href="https://catalogue.ite-expo.ru/ru-RU/exhibitorlist.aspx?project_id=535"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto"
          >
            <button className="rounded-full px-8 lg:px-10 py-3 lg:py-4 text-base font-semibold bg-[#004D9F] text-white hover:bg-[#33A8DF] transition-all duration-300">
              Explore the 2025 Exhibitor List
            </button>
          </a>
        </div>

        {/* Countries chips */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-md hover:shadow-lg transition"
            >
              <img
                src={country.flag}
                alt={country.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm lg:text-base font-medium text-gray-900">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
