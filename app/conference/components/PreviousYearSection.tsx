// components/PreviousYearSection.tsx
import Link from 'next/link';

export default function PreviousYearSection() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="relative !py-40 xl:!py-62">
          <img
            alt="TransRussia Summit"
            src="https://regional-cdn.itegroupnews.com/eksklyuzivnye_ekskursii_1e2ed3f384.png"
            className="absolute inset-0 z-[-1] size-full object-cover"
            width={500}
            height={500}
          />
          <div className="container flex max-w-[1300px] flex-col items-center justify-center gap-5 text-center text-white">
            <h2 className="title-72 text-white">How It Was</h2>
            <p className="whitespace-pre-line">TransRussia Summit 2025</p>
            <Link href="/postrelease/" className="block">
              <button className="flex-center group w-fit gap-2 overflow-hidden rounded-full bg-white px-10 py-3 font-jakarta text-sm font-semibold text-mainColor2 hover:bg-mainColor2 hover:text-white md:text-base">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}