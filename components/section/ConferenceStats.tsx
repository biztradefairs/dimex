"use client"
import SectionContainer from "../UI/SectionContainer"

const ConferenceStats = () => {
  const stats = [
    { value: "2,800+", label: "Delegates" },
    { value: "160+", label: "Speakers" },
    { value: "6", label: "Conferences" },
    { value: "3", label: "Days" },
  ]

  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#f3f9fd] py-16">
      <SectionContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h3 className="text-[52px] font-extrabold text-[#004aad] mb-2">
                {stat.value}
              </h3>
              <p className="text-base text-black/80 mb-4">
                {stat.label}
              </p>
              <div className="h-px w-36 bg-black/10" />
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}

export default ConferenceStats
