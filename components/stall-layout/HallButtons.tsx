'use client'

import { ALL_HALLS_ID, type Hall } from '@/lib/stallLayout'

type Props = {
  halls: Hall[]
  value: string
  onChange: (hallId: string) => void
  counts?: Record<string, number>
  showFullHall?: boolean
}

function btnClass(active: boolean) {
  return `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
    active ? 'bg-[#004A96] text-white shadow-sm' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-slate-50'
  }`
}

export default function HallButtons({ halls, value, onChange, counts, showFullHall = true }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {halls.map((hall) => (
        <button key={hall.id} type="button" onClick={() => onChange(hall.id)} className={btnClass(value === hall.id)}>
          {hall.name}
          {counts ? (
            <span className={`ml-1.5 text-xs font-medium ${value === hall.id ? 'text-white/80' : 'text-gray-400'}`}>
              {counts[hall.id] || 0}
            </span>
          ) : null}
        </button>
      ))}
      {showFullHall && (
        <button type="button" onClick={() => onChange(ALL_HALLS_ID)} className={btnClass(value === ALL_HALLS_ID)}>
          Full hall
          {counts ? (
            <span className={`ml-1.5 text-xs font-medium ${value === ALL_HALLS_ID ? 'text-white/80' : 'text-gray-400'}`}>
              {counts[ALL_HALLS_ID] || 0}
            </span>
          ) : null}
        </button>
      )}
    </div>
  )
}
