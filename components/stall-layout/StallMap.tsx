'use client'

import { useMemo, useRef, useState } from 'react'
import {
  ALL_HALLS_ID,
  formatStallPrice,
  getHallView,
  stallPixels,
  type StallBox,
  type StallLayout,
} from '@/lib/stallLayout'

type Props = {
  layout: StallLayout
  onChange?: (layout: StallLayout) => void
  readOnly?: boolean
  selectedId?: string | null
  onSelect?: (id: string | null) => void
  highlightStallNo?: string
  hallFilter?: string
  combineHalls?: boolean
}

export default function StallMap({
  layout,
  onChange,
  readOnly,
  selectedId,
  onSelect,
  highlightStallNo,
  hallFilter = ALL_HALLS_ID,
  combineHalls = false,
}: Props) {
  const boardRef = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState<{
    id: string
    mode: 'move' | 'resize'
    startX: number
    startY: number
    origX: number
    origY: number
    origW: number
    origH: number
  } | null>(null)

  const view = useMemo(
    () => getHallView(layout, hallFilter, combineHalls),
    [layout, hallFilter, combineHalls]
  )
  const canEdit = !readOnly && !combineHalls && hallFilter !== ALL_HALLS_ID

  const updateStall = (id: string, patch: Partial<StallBox>) => {
    if (!onChange) return
    onChange({
      ...layout,
      stalls: layout.stalls.map((stall) => (stall.id === id ? { ...stall, ...patch } : stall)),
    })
  }

  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag || !canEdit) return
    const dx = event.clientX - drag.startX
    const dy = event.clientY - drag.startY
    const stall = layout.stalls.find((item) => item.id === drag.id)
    if (!stall) return

    if (drag.mode === 'move') {
      const nextX = Math.max(0, Math.min(layout.canvasWidth - stallPixels(stall, layout.scale).width, drag.origX + dx))
      const nextY = Math.max(0, Math.min(layout.canvasHeight - stallPixels(stall, layout.scale).height, drag.origY + dy))
      updateStall(drag.id, { x: Math.round(nextX), y: Math.round(nextY) })
      return
    }

    const widthPx = Math.max(48, drag.origW + dx)
    const heightPx = Math.max(40, drag.origH + dy)
    updateStall(drag.id, {
      widthM: Math.max(1, Math.round((widthPx / layout.scale) * 10) / 10),
      heightM: Math.max(1, Math.round((heightPx / layout.scale) * 10) / 10),
    })
  }

  const stopDrag = () => setDrag(null)

  return (
    <div
      ref={boardRef}
      className="relative overflow-auto rounded-xl border border-slate-300 bg-[linear-gradient(#e2e8f0_1px,transparent_1px),linear-gradient(90deg,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] bg-slate-100"
      style={{ height: Math.min(view.canvasHeight + 24, 740) }}
      onPointerMove={onPointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
      onClick={() => canEdit && onSelect?.(null)}
    >
      <div
        className="relative"
        style={{ width: view.canvasWidth, height: view.canvasHeight, minWidth: view.canvasWidth }}
      >
        {view.labels.map((label) => (
          <div
            key={label.id}
            className="absolute z-10 truncate rounded bg-slate-800/90 px-3 py-1 text-center text-xs font-semibold tracking-wide text-white"
            style={{ left: label.x, top: label.y, width: label.width }}
          >
            {label.name}
          </div>
        ))}
        {view.stalls.map(({ stall, x, y }) => {
          const size = stallPixels(stall, layout.scale)
          const color = stall.status === 'booked' ? layout.bookedColor : layout.availableColor
          const selected = selectedId === stall.id
          const mine =
            highlightStallNo &&
            stall.stallNo.trim().toLowerCase() === highlightStallNo.trim().toLowerCase()

          return (
            <div
              key={stall.id}
              className={`absolute flex cursor-pointer flex-col items-center justify-center rounded-md border-2 text-white shadow-sm select-none ${
                selected ? 'ring-4 ring-blue-400' : ''
              } ${mine ? 'ring-4 ring-yellow-300' : ''}`}
              style={{
                left: x,
                top: y,
                width: size.width,
                height: size.height,
                backgroundColor: color,
                borderColor: 'rgba(255,255,255,0.7)',
              }}
              onClick={(event) => {
                event.stopPropagation()
                onSelect?.(stall.id)
              }}
              onPointerDown={(event) => {
                if (!canEdit) return
                event.stopPropagation()
                event.currentTarget.setPointerCapture(event.pointerId)
                onSelect?.(stall.id)
                setDrag({
                  id: stall.id,
                  mode: 'move',
                  startX: event.clientX,
                  startY: event.clientY,
                  origX: stall.x,
                  origY: stall.y,
                  origW: size.width,
                  origH: size.height,
                })
              }}
            >
              <span className="px-1 text-center text-sm font-bold leading-tight drop-shadow">
                {stall.stallNo || 'Stall'}
              </span>
              <span className="text-[10px] font-medium opacity-90">
                {stall.widthM}×{stall.heightM}m
              </span>
              {!!stall.price && (
                <span className="px-1 text-[10px] font-semibold leading-tight opacity-95">
                  {formatStallPrice(stall.price)}
                </span>
              )}
              {canEdit && (
                <button
                  type="button"
                  className="absolute right-0 bottom-0 h-3.5 w-3.5 cursor-se-resize rounded-tl bg-white/80"
                  onPointerDown={(event) => {
                    event.stopPropagation()
                    event.currentTarget.setPointerCapture(event.pointerId)
                    setDrag({
                      id: stall.id,
                      mode: 'resize',
                      startX: event.clientX,
                      startY: event.clientY,
                      origX: stall.x,
                      origY: stall.y,
                      origW: size.width,
                      origH: size.height,
                    })
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
