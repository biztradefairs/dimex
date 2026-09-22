"use client"

import { useCallback, useEffect, useState } from "react"
import { CalendarClock, X } from "lucide-react"

export default function PostponedDatesPopup() {
  const [open, setOpen] = useState(true)

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    const openPopup = () => setOpen(true)
    window.addEventListener("open-postponed-popup", openPopup)
    return () => window.removeEventListener("open-postponed-popup", openPopup)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open, close])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="postponed-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#06162F]/70 backdrop-blur-sm"
        aria-label="Close announcement"
        onClick={close}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_rgba(6,22,47,0.35)]">
        <div className="bg-gradient-to-r from-[#06162F] to-[#004D9F] px-6 pb-8 pt-7 text-center text-white">
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 rounded-full p-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <CalendarClock className="h-7 w-7 text-[#82C6EB]" />
          </div>

          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#82C6EB]">
            Important Update
          </p>
          <h2
            id="postponed-title"
            className="mt-2 font-parabolica text-2xl font-black tracking-tight sm:text-[28px]"
          >
            DIEMEX 2026 Dates Rescheduled
          </h2>
        </div>

        <div className="px-6 py-6 text-center">
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            <p>
              Due to unavoidable circumstances, the earlier announced dates have been{" "}
              <span className="font-semibold text-[#06162F]">rescheduled</span>.
            </p>
            <p className="font-semibold text-[#06162F]">
              New dates: 24, 25 & 26 March 2027
            </p>
            <p>
              Thank you for your{" "}
              <span className="font-semibold text-[#06162F]">
                continued support and understanding
              </span>
              .
            </p>
            <p className="pt-1 text-[13px] font-medium italic text-slate-500">
              — Team DIEMEX 2026
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#004D9F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#003d7f]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
