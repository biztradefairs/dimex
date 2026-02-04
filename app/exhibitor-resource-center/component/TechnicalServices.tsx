import Link from 'next/link';

export default function TechnicalServices() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="title-72 text-black mb-10">Technical Services</h2>
          <div className="grid size-full grid-cols-1 gap-5">
            {/* Service Order Forms */}
            <div className="relative z-[1] flex size-full min-h-[500px] flex-col bg-amber-50 p-5 lg:p-10">
              <div className="z-[1] flex flex-col gap-5">
                <h2 className="title-40 font-semibold">Technical Service Order Forms</h2>
                <div className="flex w-full flex-wrap gap-5">
                  <Link
                    href="https://cdn.itegroupnews.com/Technical_forms_Trans_Russia_Sklad_Tech_2026_EUR_d2771a7e2c.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-[#004D9F] text-white hover:bg-mainColor4">
                      Download Technical Service Form
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Technical Information */}
            <div className="relative z-[1] flex size-full min-h-[500px] flex-col bg-mainColor5 p-5 lg:p-10">
              <div className="z-[1] flex flex-col gap-5">
                <h2 className="title-40 font-semibold">Technical Information</h2>
                <div className="flex w-full flex-wrap gap-5">
                  <Link
                    href="https://cdn.itegroupnews.com/Information_form_046b13d7dc.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="flex-center group w-fit gap-2 overflow-hidden rounded-full px-10 py-3 font-jakarta text-[16px] font-semibold global-transition bg-mainColor2 text-white hover:bg-mainColor4">
                      Download Technical Information Forms
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}