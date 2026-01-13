"use client"
import SectionContainer from "../UI/SectionContainer"

const KeyTopics = () => {
  const topics = [
    "Logistics Infrastructure Development",
    "International Transport Corridors",
    "Multimodal Container Transport",
    "Global Air Cargo Market Recovery",
    "Changing Warehouse Logistics Business Requirements",
  ]

  return (
    <section className="bg-white py-24">
      <SectionContainer>
        <h2 className="text-[48px] font-bold text-black mb-10">
          Key Topics of Congress 2025
        </h2>

        <ul className="space-y-5 text-lg text-black/80 list-disc pl-6">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </SectionContainer>
    </section>
  )
}

export default KeyTopics
