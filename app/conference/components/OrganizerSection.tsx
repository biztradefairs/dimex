export default function OrganizerSection() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="title-48 md:title-72 mb-6 md:mb-10 text-black">Organizer</h2>
          <div className="rte-style [&_a]:underline [&_blockquote]:relative [&_blockquote]:ml-5 [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:p-5 [&_blockquote]:italic [&_h1]:lg:text-4xl [&_h2]:lg:text-3xl [&_h3]:lg:text-2xl [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
            <p className="mb-4">
              <span className="text-base md:text-lg lg:text-[27px]">
                TransRussia Summit is held under the auspices of the largest{' '}
                <a href="https://transrussia.ru/ru/">
                  <span className="text-gray-700">
                    international exhibition of transport and logistics services TransRussia
                  </span>
                </a>{' '}
                in Russia and CIS countries. In 2025, the exhibition was visited by{' '}
                <strong>over 30,000 people</strong>, with <strong>597 companies from 20 countries</strong> participating.
              </span>
            </p>
            <p className="mb-4 hidden md:block">&nbsp;</p>
            <p>
              <span className="text-base md:text-lg lg:text-[27px]">
                TransRussia Summit is organized by <strong>ITE Group</strong>, which has been organizing major industry exhibitions and business events since 1991. Currently, ITE Group organizes over 30 major industry events, including exhibitions, summits, and conferences. Thanks to the Connect digital platform, the ITE ecosystem offers unique hybrid solutions for industry communities in Russia, CIS countries, and beyond.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}