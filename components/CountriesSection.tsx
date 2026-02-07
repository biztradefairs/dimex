// components/CountriesSection.tsx
import SectionContainer from './UI/SectionContainer'

export default function CountriesSection() {
  const countries = [
    { name: 'China', flag: 'https://cdn.itegroupnews.com/Flag_icons_3e3608eca2.png' },
    { name: 'India', flag: 'https://cdn.itegroupnews.com/India_77390bec7a.webp' },
    { name: 'Japan', flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACtCAMAAABhsvGqAAAAb1BMVEX///+8AC27ACq3AAC6ACG7ACa6ACO5ABi5ABy7ACj9+fq4ABS4ABC4AAu3AAP14OTcl6D78fPPbnnakZrpv8W+IDfw0dbJU2LBLkPUe4blsrnsxszWhY7eoKbmt7z46OvFRlXhqq/OZnPKW2fDO00P6eL9AAAER0lEQVR4nO3d23aqMBAGYEkChJMUVCoeCrZ9/2fcoNtltVUQMyTR/7vsFTMLJ5NJtJMJAAAAAAAAAAAAAAAAAAAAAMDTC7O02EuzUPezaBAWu/J9GXM+TRpTzuPle7krXicVYbH99mNfuIHzQ+CK5o/120skoigXXLrOFa7ki7LQ/Yy0qrcFF+xaBg6Y4M6s0v2kZNJc+h0Z+J8HKfNU99OSSHMu+mTgQPDP50tDVt6TgkMaykz3U6u1c+V9KWhJd6f7uRWq6qRXLbjEkvppKuRKekNS0PLkSvfTq5HzoSlo8Vz38ytQLQdUg5/k0vqPRMqudod9uczyxXKdBN1Rdgmma91xPGI+bFW4xJK57kiGU5QDq7NQPLQsnOOWfiJSqeg9aDFpZXXMmIKaeBIwG3cS9Z0bpi6i1h3R/TaR2hw4TrTRHdO91gqL4tHUsiUicxUWxSPm2lUWcsUF4UBYtZlaTylyYFm3sFS6Op4ES92R9beNaXLQrBBb3bH1FfpUOXAc35YDqtmDY5SbSZjpjq6fMCBYHo9YYMersFXeK/5kSVVwCF+E5lVwdMfXx5psaTiIbegVPgcfMvTjfeqOsFtI/CI0VcH80rgiT0Js/qHU18PnDF3cL90xdslo14YWc0zfURcJdQ4cJzH9UhNly3wkTW+da/KS0BSFWneUHcjXhlasO8rbUoL56m/c7IOYOenm6Sgye+y8HaEuNpXR7J1kSTJlviRK3XHeRN8vtgzvGWuiMfNFEmrdcd5ENWs/Z/bkPVyQ7xxabGnybnqsJCyQBCQBSbAjCWOtDiYnYaQ+Iah1x3kTOsZGTnzocOCZfWNljOma8fO1FeHVhBPf7JOHguiy0rmp2ePmcJzxmtEr5GQyRrfEFrqj7DDGaMnwwdJk8jHCzD3+0B1lh2qMEyjjvx5Hv3swe660R98uGd4qtejPoAw/f9r7Jv48BN+6I+xhR9w5+zb8nkBGfBwZmX5PZY/mCx9HlnzxIyW9sZNYUBZbX4STFc/sodIJ5Sppw/p48ElWFYQFd3r/q8hWSd/4bcPJjCgLtnzv5WBB0jYGpk9TztHMGo2/ynqhJOgbI9MnSr98Kz+Lcm3YOZ2rIsUjVxZZtDIczRW3TNzsG5xXbJXuIRKzL3BeVSqcPMfWFcWjXNkSEdnTLv+iKguRHUOEK3IldSGxOgeTyUZBFhLrflbn0o4/2C8wbum68FPBHho0eYFlG4a/Ze8PlMfo3cI+8U9vfOBGwuVvup9dnaqOB1QGFj/PLxbvrcTdB7VS2HDWdJdw5t/z+4xM+hvDbyYNkm3cfj/q36TAdzdWnLYNkG0d7nXmgXnc2T5rCvaK3Ilv/ZsLJmInf4rO4KZwXi7iSPyxaLoiip1y/oyl4C/pR1lLnvhSCK8hhPQTLutyZc0hmyJhVax2mzJvlJvdqqhe5Q0AAAAAAAAAAAAAAAAAAAAAgNf1D53+Qj8zo+6sAAAAAElFTkSuQmCC' },
    { name: 'Taiwan', flag: 'data:image/png;base64,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' },
    { name: 'Germany', flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACcCAMAAACulCWiAAAAElBMVEUAAAD/zgDdAADrAADZAAD/3AApfWWWAAAAz0lEQVR4nO3QwVEDQBAEsZu1yT9lqI6ChxSC3gMAAAAAAAAAAAAAAAD4xz583nESTkIknIRIOAmRcBIi4SREwkmIhJMQCSchEk5CJJyESDgJkXASIuEkRMJJiISTEAknIRJOQiSchEg4CZFwEiLhJETCSYiEkxAJJyES/rwv3/fDzxuTMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAmRMAn5BcTHpY30S2AzAAAAAElFTkSuQmCC' },
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
            href="/exhibition-directory"
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
