"use client"

import SectionContainer from "../UI/SectionContainer"
import { useEffect, useState } from "react"

interface Stat {
  value: number
  suffix?: string
  label: string
}

const stats: Stat[] = [
  { value: 200, suffix: "+", label: "Delegates" },
  { value: 20, suffix: "+", label: "Speakers" },
  { value: 10, label: "Conference Sessions" },
  { value: 2, label: "Days" },
]

export default function ConferenceStats() {
  return (
    <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#f3f9fd] py-16">
      <SectionContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 text-center">
          {stats.map((stat) => (
            <CounterStat key={stat.label} stat={stat} />
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}

/* ---------------------------------------------
   Counter Component
---------------------------------------------- */
function CounterStat({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = stat.value
    const duration = 1200 // ms
    const frameRate = 16 // ~60fps
    const totalSteps = duration / frameRate
    const step = Math.ceil(end / totalSteps)

    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, frameRate)

    return () => clearInterval(timer)
  }, [stat.value])

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-[52px] font-bold text-[#004aad] mb-2 animate-fade-up">
        {count}
        {stat.suffix}
      </h3>

      <p className="text-base text-black/80 mb-4">
        {stat.label}
      </p>

      <div className="h-px w-36 bg-black/10 mx-auto" />
    </div>
  )
}
