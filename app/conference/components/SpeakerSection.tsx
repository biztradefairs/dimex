"use client";
import { useEffect, useRef } from "react";

type Speaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  imageUrl: string;
};

type SpeakersSectionProps = {
  title: string;
  subtitle: string;
  speakers: Speaker[];
  autoScrollSpeed?: number;
  pauseOnHover?: boolean;
};

export default function SpeakersSection({
  title,
  subtitle,
  speakers,
  autoScrollSpeed = 30,
  pauseOnHover = true,
}: SpeakersSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);

  const startAutoScroll = () => {
    if (!containerRef.current || intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (!containerRef.current || isPaused.current) return;

      const el = containerRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1; // pixel based scroll
      }
    }, autoScrollSpeed);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  /* START ON MOUNT */
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  /* PAUSE ON HOVER */
  useEffect(() => {
    if (!containerRef.current || !pauseOnHover) return;

    const el = containerRef.current;

    const pause = () => (isPaused.current = true);
    const resume = () => (isPaused.current = false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [pauseOnHover]);

  /* PAUSE WHEN USER SCROLLS (MOUSE / TRACKPAD) */
  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    let timeout: NodeJS.Timeout;

    const onUserScroll = () => {
      isPaused.current = true;
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        isPaused.current = false;
      }, 1200);
    };

    el.addEventListener("wheel", onUserScroll, { passive: true });
    el.addEventListener("touchstart", onUserScroll);
    el.addEventListener("touchend", onUserScroll);

    return () => {
      el.removeEventListener("wheel", onUserScroll);
      el.removeEventListener("touchstart", onUserScroll);
      el.removeEventListener("touchend", onUserScroll);
      clearTimeout(timeout);
    };
  }, []);

  /* ORIGINAL DESIGN JSX — UNCHANGED */
  return (
    <div className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <div className="flex items-end justify-between max-md:flex-wrap md:gap-20 lg:gap-40">
            <div className="space-y-5">
              <h2 className="title-72 text-black">{title}</h2>
              <p className="whitespace-pre-line">{subtitle}</p>
            </div>
          </div>

          <div className="relative mt-20 w-full overflow-hidden">
            <div
              ref={containerRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {speakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className={`
                    flex-shrink-0 
                    pl-4 
                    w-full 
                    md:basis-1/3 lg:basis-1/4 3xl:basis-1/5
                    transition-all duration-300 ease-in-out
                    hover:scale-105
                  `}
                  style={{ minWidth: "300px" }}
                >
                  <div className="group relative h-[400px] w-full overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm text-gray-200">{speaker.company}</p>
                    </div>
                  </div>
                  <div className="p-4 text-left bg-white rounded-b-lg shadow">
                    <h5 className="font-semibold text-black text-lg mb-2">
                      {speaker.name}
                    </h5>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {speaker.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
