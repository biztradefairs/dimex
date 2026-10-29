"use client";

import Link from "next/link";
import Image from "next/image";

type ExhibitNavbarProps = {
  onBookStall?: () => void;
};

function NavArrow() {
  return (
    <svg
      className="h-[45%] w-[45%] fill-none stroke-[#121c4e] stroke-[2.5]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="h-[45%] w-[45%] fill-none stroke-[#121c4e] stroke-[2.5]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4v11m0 0l-4-4m4 4l4-4M4 19h16"
      />
    </svg>
  );
}

export default function ExhibitNavbar({ onBookStall }: ExhibitNavbarProps) {
  const handleBookStall = () => {
    if (onBookStall) {
      onBookStall();
    } else {
      const el =
        document.getElementById("stall-enquiry") ||
        document.getElementById("hero-lead-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const marqueeText = (
    <span className="flex items-center">
      <span className="mx-2.5 sm:mx-4 font-bold tracking-wide">
        🚨 DIEMEX 2027 EXHIBITOR BOOKINGS OPEN!
      </span>
      <span className="text-white/50">|</span>
      <span className="mx-2.5 sm:mx-4 font-bold tracking-wide">
        🎁 EARLY BOOKING OFFERS AVAILABLE
      </span>
      <span className="text-white/50">|</span>
      <span className="mx-2.5 sm:mx-4 font-bold tracking-wide">
        📍 ENQUIRE EARLY FOR PREFERRED STALL LOCATIONS
      </span>
      <span className="text-white/50">|</span>
      <span className="mx-2.5 sm:mx-4 font-bold tracking-wide">
        📅 24–26 MARCH 2027, PUNE
      </span>
      <span className="text-white/50">|</span>
      <span className="mx-2.5 sm:mx-4 font-extrabold text-amber-300 drop-shadow-sm">
        ⚡ BOOK YOUR STALL TODAY!
      </span>
      <span className="mx-2.5 sm:mx-4 text-white/50">|</span>
    </span>
  );

  return (
    <header className="sticky top-0 z-[999] w-full font-parabolica">
      {/* Continuous Moving Announcement Marquee */}
      <div
        onClick={handleBookStall}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleBookStall();
          }
        }}
        title="Click to Book Your Stall"
        className="relative flex h-[30px] sm:h-[34px] items-center overflow-hidden text-white cursor-pointer select-none"
        style={{
          background:
            "linear-gradient(105deg, #ff0713 0%, #f50d1c 24%, #c51d3d 48%, #63315f 72%, #004b92 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent" />

        {/* Continuous Infinite Moving Stream */}
        <div className="relative z-10 flex w-full overflow-hidden">
          <div className="animate-exhibit-marquee flex w-max items-center hover:[animation-play-state:paused]">
            {[0, 1].map((setIdx) => (
              <div
                key={setIdx}
                className="flex shrink-0 items-center text-[11px] sm:text-[12.5px] leading-none whitespace-nowrap"
              >
                {[0, 1].map((copyIdx) => (
                  <span key={copyIdx} className="flex items-center">
                    {marqueeText}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main White Navbar - Compact and Sleek */}
      <div className="border-b border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex h-[56px] max-w-[1600px] items-center justify-between gap-2 px-3 sm:h-[64px] sm:gap-3 sm:px-4 lg:h-[76px] xl:h-[80px] lg:px-8">
          {/* Logo & Supported By Branding */}
          <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2.5">
            <Link
              href="/"
              className="group flex shrink-0 items-center"
              aria-label="DIEMEX Home"
            >
              <Image
                src="/images/diemex3.png"
                alt="DIEMEX"
                width={200}
                height={60}
                priority
                className="h-8 w-auto max-w-[110px] object-contain object-left transition-opacity group-hover:opacity-80 sm:h-10 sm:max-w-[140px] lg:h-12 xl:h-[50px] lg:max-w-none"
              />
            </Link>

            <div className="hidden h-7 w-px shrink-0 bg-[#e0e0e0] sm:block lg:h-9" />

            <div className="hidden min-w-0 flex-col justify-center sm:flex">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-[7.5px] leading-none font-bold tracking-wider text-[#020202] uppercase sm:text-[9px] lg:text-[10px]">
                  Supported By
                </span>
                <img
                  src="/images/idemi.png"
                  alt="IDEMI"
                  className="h-5 w-auto max-w-[44px] object-contain sm:h-6 sm:max-w-[60px] lg:h-7 lg:max-w-[76px]"
                />
              </div>
              <span className="hidden text-[10px] leading-[1.1] font-normal text-black uppercase sm:block lg:text-[11px]">
                Pune, India • 24 – 26 March 2027
              </span>
            </div>
          </div>

          {/* Right Action Buttons: Book Your Stall & Download Brochure */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2.5 lg:gap-3">
            <button
              type="button"
              onClick={handleBookStall}
              className="group inline-flex h-[36px] items-center gap-1.5 rounded-full bg-[#004A96] pr-1 pl-3 text-[11px] leading-none font-bold tracking-wide text-white uppercase transition hover:-translate-y-px hover:bg-[#003875] sm:h-[40px] sm:pr-1.5 sm:pl-4 sm:text-xs lg:h-[44px] xl:h-[46px] lg:pr-1.5 lg:pl-5 lg:text-[13px] xl:text-[14px] cursor-pointer shadow-sm"
            >
              <span>Book Your Stall</span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ebebeb] transition group-hover:bg-white sm:h-7 sm:w-7 lg:h-8 lg:w-8">
                <NavArrow />
              </span>
            </button>

            <Link
              href="/register?t=brochure"
              className="group hidden sm:inline-flex h-[36px] items-center gap-1.5 rounded-full bg-[#004A96] pr-1 pl-3 text-[11px] leading-none font-bold tracking-wide text-white uppercase transition hover:-translate-y-px hover:bg-[#003875] sm:h-[40px] sm:pr-1.5 sm:pl-4 sm:text-xs lg:h-[44px] xl:h-[46px] lg:pr-1.5 lg:pl-5 lg:text-[13px] xl:text-[14px] cursor-pointer shadow-sm"
            >
              <span>Download Brochure</span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ebebeb] transition group-hover:bg-white sm:h-7 sm:w-7 lg:h-8 lg:w-8">
                <DownloadIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes exhibitMarqueeAnim {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-exhibit-marquee {
          animation: exhibitMarqueeAnim 32s linear infinite !important;
          will-change: transform;
        }
        .animate-exhibit-marquee:hover {
          animation-play-state: paused !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-exhibit-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </header>
  );
}
