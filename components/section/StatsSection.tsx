import React from "react";

const StatsSection = () => {
  const stats = [
    { value: "30,500", label: "Visitors" },
    { value: "600+", label: "Exhibitors" },
    { value: "50+", label: "Countries Represented" },
    { value: "13", label: "Event Sectors" },
  ];

  return (
    <section className="relative z-[1] bg-white">
      {/* CONTENT */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl">
          <h2 className="text-[56px] leading-[1.1] font-extrabold text-black mb-6">
            Shaping the Future of Transport and Logistics
          </h2>

          <p className="text-lg leading-relaxed text-black/80 max-w-4xl mb-10">
            TransRussia is Eurasia's largest transport and logistics exhibition,
            featuring top companies across rail, road, sea, air, warehousing, and
            IT. This year, the 30th edition, held alongside SkladTech - a special
            warehouse equipment showcase will run from March 17-19, 2026, at
            Crocus Expo IEC, Pavilion 3 in Moscow.
          </p>

          <a href="/why-exhibit">
            <button className="rounded-full bg-[#0B4EA2] px-10 py-4 text-white font-semibold text-base transition hover:bg-[#083E82]">
              Why Exhibit
            </button>
          </a>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-[#F3F8FC] py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-[52px] font-extrabold text-[#0B4EA2] mb-2">
                  {stat.value}
                </h3>

                <p className="text-base text-black/80 mb-4">
                  {stat.label}
                </p>

                <div className="h-px w-36 bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
