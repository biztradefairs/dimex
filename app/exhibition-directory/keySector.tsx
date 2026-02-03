'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'

const sectors = [
  {
    id: 1,
    name: 'Warehouse Equipment and Technology\nSkladtech',
    image: 'https://itelgroup-bucket.storage.yandexcloud.net/Production/media/2031/ST_%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D0%BE%D0%B5_%D0%BE%D0%B1%D0%BE%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%B8_%D0%B8%D0%BD%D0%B6%D0%B5%D0%BD%D0%B5%D1%80%D0%BD%D1%8B%D0%B5_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B.png',
  },
  {
    id: 2,
    name: 'Complex Logistics\nServices & Freight\nForwarding',
    image: 'https://itelgroup-bucket.storage.yandexcloud.net/Production/media/2031/TR%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81%D0%BD%D1%8B%D0%B5_%D0%BB%D0%BE%D0%B3%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5_%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8.png',
  },
  {
    id: 3,
    name: 'Air Freight',
    image: 'https://itelgroup-bucket.storage.yandexcloud.net/Production/media/2031/TR%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%B2%D1%8B%D0%B5_%D0%B0%D0%B2%D0%B8%D0%B0%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D1%87%D0%B8%D0%BA%D0%B8.png',
  },
  {
    id: 4,
    name: 'Road Freight\nTransportation',
    image: 'https://itelgroup-bucket.storage.yandexcloud.net/Production/media/2031/TR%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D0%B8%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5_%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D1%87%D0%B8%D0%BA%D0%B8.png',
  },
  {
    id: 5,
    name: 'Rail Freight',
    image: 'https://itelgroup-bucket.storage.yandexcloud.net/Production/media/2031/TR%D0%B6%D0%B5%D0%BB%D0%B5%D0%B7%D0%BD%D0%BE%D0%B4%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D1%8B%D0%B5_%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B8_%D0%B8_%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D1%8B.png',
  },
  {
    id: 6,
    name: 'Maritime and Inland\nWaterway Transport',
    image: 'https://itelgroup-bucket.storage.yandexcloud.net/Production/media/2031/TR_waterways_%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%B8%D0%B5_%D0%B8_%D1%80%D0%B5%D1%87%D0%BD%D1%8B%D0%B5_%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D0%BA%D0%B8.png',
  },
]

export default function KeySectors() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -220 : 220,
      behavior: 'smooth',
    })
  }

  return (
    <section className="border border-slate-200 bg-white">
      <div className="relative flex items-center px-6 py-6 gap-6">
        {/* Title */}
        <h2 className="text-sm font-semibold tracking-wide text-slate-900 whitespace-nowrap">
          KEY SECTORS
        </h2>

        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-40 text-slate-400 hover:text-slate-700"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-14 overflow-x-auto scrollbar-hide px-10"
        >
          {sectors.map((item) => (
            <div
              key={item.id}
              className="min-w-[140px] flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 flex items-center justify-center">
  <img
    src={item.image}
    alt={item.name}
    width={36}
    height={36}
    className="object-contain"
  />
</div>

              <p className="text-xs text-slate-700 leading-snug whitespace-pre-line">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-6 text-slate-400 hover:text-slate-700"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  )
}
