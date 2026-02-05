// components/DownloadLinks.tsx
import Link from 'next/link';

interface DownloadLinksProps {
  programLink: string;
  printVersionLink: string;
}

export default function DownloadLinks({ programLink, printVersionLink }: DownloadLinksProps) {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container relative z-[1] w-full space-y-5 overflow-hidden">
          <div className="flex flex-wrap gap-5">
            <Link
              href={programLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-[1] flex items-center gap-5 overflow-hidden rounded-full py-3 ps-3 pe-5 shadow-lg"
            >
              <div className="global-transition absolute -left-5 z-[-1] aspect-square w-5 rounded-full bg-mainColor1 !duration-1000 group-hover:w-[150%] group-hover:opacity-100"></div>
              <div className="flex-center relative size-10 rounded-full bg-mainColor1">
                <img
                  alt="Download icon"
                  src="https://regional-cdn.itegroupnews.com/download_f7c6b2782d.png"
                  className="size-5 object-cover"
                  width={500}
                  height={500}
                />
              </div>
              <p className="global-transition text-mainColor4 group-hover:text-white">Download Program</p>
            </Link>
            <Link
              href={printVersionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-[1] flex items-center gap-5 overflow-hidden rounded-full py-3 ps-3 pe-5 shadow-lg"
            >
              <div className="global-transition absolute -left-5 z-[-1] aspect-square w-5 rounded-full bg-mainColor1 !duration-1000 group-hover:w-[150%] group-hover:opacity-100"></div>
              <div className="flex-center relative size-10 rounded-full bg-mainColor1">
                <img
                  alt="Download icon"
                  src="https://regional-cdn.itegroupnews.com/download_f7c6b2782d.png"
                  className="size-5 object-cover"
                  width={500}
                  height={500}
                />
              </div>
              <p className="global-transition text-mainColor4 group-hover:text-white">Download Print Version</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}