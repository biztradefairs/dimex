import Link from 'next/link';

export default function CeilingSuspension() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="relative">
          <div className="container">
            <div className="grid grid-cols-12 gap-5 lg:gap-9">
              <div className="!col-span-12 relative z-[1] col-span-12 flex flex-col overflow-hidden rounded-xl bg-mainColor5 lg:col-span-6">
                <div className="flex flex-1 flex-col space-y-5 p-5 lg:p-8 xl:p-10">
                  <h3 className="text-3xl font-semibold !leading-normal">Ceiling Suspension Form</h3>
                  <div className="!mt-auto flex flex-wrap items-center gap-3 pt-5 transition-all duration-500 ease-in-out">
                    <Link
                      href="https://cdn.itegroupnews.com/T5_Suspensions_Eng_Trans_Russia_1571e9bd23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4">
                        Download Form
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}