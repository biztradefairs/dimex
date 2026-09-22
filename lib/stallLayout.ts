import { calculateStallPayment, GST_PERCENT_DEFAULT } from './stallPayment'

export type StallStatus = 'available' | 'booked'

export const ALL_HALLS_ID = 'all'

export type Hall = {
  id: string
  name: string
}

export const DEFAULT_HALLS: Hall[] = [
  { id: 'hall-a', name: 'Hall A' },
  { id: 'hall-b', name: 'Hall B' },
  { id: 'hall-c', name: 'Hall C' },
]

export type StallBox = {
  id: string
  stallNo: string
  widthM: number
  heightM: number
  x: number
  y: number
  status: StallStatus
  companyName?: string
  price?: number
  discount?: number
  gstPercent?: number
  bookedBy?: string
  hallId?: string
}

export type StallLayout = {
  availableColor: string
  bookedColor: string
  scale: number
  canvasWidth: number
  canvasHeight: number
  halls: Hall[]
  stalls: StallBox[]
}

export const defaultStallLayout = (): StallLayout => ({
  availableColor: '#16a34a',
  bookedColor: '#dc2626',
  scale: 32,
  canvasWidth: 1100,
  canvasHeight: 720,
  halls: DEFAULT_HALLS.map((hall) => ({ ...hall })),
  stalls: [],
})

export function normalizeStallLayout(raw: Partial<StallLayout> = {}): StallLayout {
  const base = defaultStallLayout()
  const halls =
    Array.isArray(raw.halls) && raw.halls.length
      ? raw.halls
          .map((hall, index) => ({
            id: String(hall?.id || `hall-${index + 1}`),
            name: String(hall?.name || `Hall ${index + 1}`).trim() || `Hall ${index + 1}`,
          }))
          .filter((hall, index, list) => list.findIndex((item) => item.id === hall.id) === index)
      : base.halls
  const fallbackHall = halls[0]?.id || 'hall-a'
  const stalls = Array.isArray(raw.stalls)
    ? raw.stalls.map((stall) => ({
        ...stall,
        hallId: halls.some((hall) => hall.id === stall.hallId) ? stall.hallId : fallbackHall,
      }))
    : []
  return {
    ...base,
    ...raw,
    halls,
    stalls,
  }
}

export function stallHallId(stall: StallBox, fallback = 'hall-a') {
  return stall.hallId || fallback
}

export function hallName(layout: StallLayout, hallId?: string) {
  return layout.halls.find((hall) => hall.id === hallId)?.name || 'Hall'
}

export function hallCounts(layout: StallLayout) {
  const counts: Record<string, number> = { [ALL_HALLS_ID]: layout.stalls.length }
  for (const hall of layout.halls) counts[hall.id] = 0
  for (const stall of layout.stalls) {
    const id = stallHallId(stall, layout.halls[0]?.id)
    counts[id] = (counts[id] || 0) + 1
  }
  return counts
}

export function nextStallNo(stalls: StallBox[], hall: Hall) {
  const match = hall.name.match(/hall\s*([a-z0-9]+)/i)
  const letter = (match?.[1] || hall.name.replace(/\s+/g, '').slice(-1) || 'S').toUpperCase()
  const used = new Set(
    stalls
      .filter((stall) => stallHallId(stall) === hall.id)
      .map((stall) => stall.stallNo.trim().toUpperCase())
  )
  let n = 1
  while (used.has(`${letter}${String(n).padStart(2, '0')}`)) n += 1
  return `${letter}${String(n).padStart(2, '0')}`
}

export const STALL_PRESETS = [
  { label: '3 × 3 m', widthM: 3, heightM: 3 },
  { label: '3 × 6 m', widthM: 3, heightM: 6 },
  { label: '6 × 6 m', widthM: 6, heightM: 6 },
  { label: '6 × 9 m', widthM: 6, heightM: 9 },
]

export function stallPixels(stall: StallBox, scale: number) {
  return {
    width: Math.max(48, stall.widthM * scale),
    height: Math.max(40, stall.heightM * scale),
  }
}

export type HallViewLabel = { id: string; name: string; x: number; y: number; width: number }
export type HallViewItem = { stall: StallBox; x: number; y: number }

export function getHallView(layout: StallLayout, hallId: string = ALL_HALLS_ID, combine = false) {
  const fallback = layout.halls[0]?.id || 'hall-a'
  if (hallId !== ALL_HALLS_ID) {
    const stalls = layout.stalls
      .filter((stall) => stallHallId(stall, fallback) === hallId)
      .map((stall) => ({ stall, x: stall.x, y: stall.y }))
    return {
      stalls,
      labels: [] as HallViewLabel[],
      canvasWidth: layout.canvasWidth,
      canvasHeight: layout.canvasHeight,
    }
  }

  if (!combine) {
    return {
      stalls: layout.stalls.map((stall) => ({ stall, x: stall.x, y: stall.y })),
      labels: [] as HallViewLabel[],
      canvasWidth: layout.canvasWidth,
      canvasHeight: layout.canvasHeight,
    }
  }

  const gap = 72
  const labelH = 36
  let offsetX = 16
  let maxBottom = layout.canvasHeight
  const stalls: HallViewItem[] = []
  const labels: HallViewLabel[] = []

  for (const hall of layout.halls) {
    const hallStalls = layout.stalls.filter((stall) => stallHallId(stall, fallback) === hall.id)
    if (!hallStalls.length) continue
    const minX = Math.min(...hallStalls.map((stall) => stall.x))
    const minY = Math.min(...hallStalls.map((stall) => stall.y))
    const maxX = Math.max(
      ...hallStalls.map((stall) => stall.x + stallPixels(stall, layout.scale).width)
    )
    const maxY = Math.max(
      ...hallStalls.map((stall) => stall.y + stallPixels(stall, layout.scale).height)
    )
    const width = Math.max(160, maxX - minX)
    labels.push({ id: hall.id, name: hall.name, x: offsetX, y: 8, width })
    for (const stall of hallStalls) {
      stalls.push({
        stall,
        x: stall.x - minX + offsetX,
        y: stall.y - minY + labelH,
      })
    }
    offsetX += width + gap
    maxBottom = Math.max(maxBottom, maxY - minY + labelH + 24)
  }

  return {
    stalls,
    labels,
    canvasWidth: Math.max(layout.canvasWidth, offsetX),
    canvasHeight: maxBottom,
  }
}

export const SHELL_RATE = 11000
export const BARE_RATE = 10000

export function stallArea(stall: StallBox) {
  return Math.round(((Number(stall.widthM) || 0) * (Number(stall.heightM) || 0)) * 100) / 100
}

export function stallCostForType(stall: StallBox, type: 'raw-space' | 'shell-space') {
  if (Number(stall.price) > 0) {
    return Math.round((Number(stall.price) || 0) * 100) / 100
  }
  const rate = type === 'shell-space' ? SHELL_RATE : BARE_RATE
  return Math.round(stallArea(stall) * rate * 100) / 100
}

export function stallListedTotals(stall: Pick<StallBox, 'price' | 'discount' | 'gstPercent'>) {
  return calculateStallPayment({
    stallCost: Number(stall.price) || 0,
    discount: Number(stall.discount) || 0,
    gstPercent: Number(stall.gstPercent) > 0 ? Number(stall.gstPercent) : GST_PERCENT_DEFAULT,
  })
}

export function formatStallPrice(amount?: number) {
  if (amount === undefined || amount === null || Number.isNaN(Number(amount))) return ''
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0)
}
