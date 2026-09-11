"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { getExhibitorData, getToken } from "@/lib/exhibitorAuth";
import type { Exhibitor } from "@/lib/api/exhibitors";

function initialsFrom(exhibitor: Exhibitor | null) {
  const source = exhibitor?.name || exhibitor?.company || "EX";
  const parts = source.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

function handleLogout() {
  localStorage.removeItem("exhibitor_token");
  localStorage.removeItem("exhibitor_data");
  window.location.href = "/";
}

export default function ExhibitorNavProfile({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const [exhibitor, setExhibitor] = useState<Exhibitor | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 16 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (!getToken()) return;
    setExhibitor(
      getExhibitorData() ||
        ({
          name: "Exhibitor",
          company: "Portal",
          email: "",
        } as Exhibitor)
    );
  }, []);

  const updatePosition = () => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.bottom + 10,
      right: Math.max(8, window.innerWidth - rect.right),
    });
  };

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", updatePosition);

    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  if (!exhibitor) return null;

  const initials = initialsFrom(exhibitor);
  const isMobile = variant === "mobile";

  const menu = open && mounted
    ? createPortal(
        <div
          ref={menuRef}
          role="menu"
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#071833] text-white shadow-2xl"
          style={{
            position: "fixed",
            top: coords.top,
            right: coords.right,
            width: "min(18rem, calc(100vw - 1rem))",
            zIndex: 100000,
            animation: "exhibitorMenuIn 0.2s ease-out",
          }}
        >
          <div className="relative overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#004D9F]/40 via-transparent to-[#FF131C]/20" />
            <div className="relative flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7EB6FF] to-[#004D9F] text-xs font-bold sm:h-11 sm:w-11 sm:text-sm">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{exhibitor.name || "Exhibitor"}</p>
                <p className="truncate text-xs text-white/70">{exhibitor.company}</p>
                {exhibitor.booth ? (
                  <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#7EB6FF]">
                    Booth {exhibitor.booth}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-1 p-2">
            <Link
              href="/dashboard"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#004D9F]/80">
                <LayoutDashboard className="h-4 w-4" />
              </span>
              My Dashboard
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleLogout}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-200 transition hover:bg-red-500/15"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                <LogOut className="h-4 w-4" />
              </span>
              Logout
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div ref={wrapRef} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Exhibitor profile"
        className={`group flex items-center rounded-full border border-white/20 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 ${
          isMobile
            ? "h-9 w-9 justify-center p-0 sm:h-10 sm:w-10"
            : "h-9 gap-1.5 py-0.5 pl-0.5 pr-1 lg:h-10 xl:gap-2 xl:pr-2"
        }`}
      >
        <span
          className={`relative flex items-center justify-center ${
            isMobile ? "h-8 w-8 sm:h-9 sm:w-9" : "h-8 w-8 lg:h-9 lg:w-9"
          }`}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7EB6FF] via-[#004D9F] to-[#06162F] p-[1.5px]" />
          <span className="relative flex h-[calc(100%-3px)] w-[calc(100%-3px)] items-center justify-center rounded-full bg-[#06162F] text-[10px] font-bold tracking-wide text-white sm:text-[11px]">
            {initials}
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[#0a2b57] bg-emerald-400 sm:h-2.5 sm:w-2.5" />
        </span>
        {!isMobile && (
          <>
            <span className="hidden min-w-0 text-left leading-tight xl:block xl:max-w-[88px] 2xl:max-w-[130px]">
              <span className="block truncate text-[10px] font-semibold text-white 2xl:text-[11px]">
                {exhibitor.name || "Exhibitor"}
              </span>
              <span className="block truncate text-[8px] text-white/70 2xl:text-[9px]">
                {exhibitor.company || "Portal"}
              </span>
            </span>
            <ChevronDown
              className={`hidden h-3.5 w-3.5 text-white/80 transition-transform duration-300 xl:block ${
                open ? "rotate-180" : ""
              }`}
            />
          </>
        )}
      </button>
      {menu}
    </div>
  );
}

export function useExhibitorLoggedIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLoggedIn(!!getToken());
    setReady(true);
  }, []);

  return { loggedIn, ready };
}
