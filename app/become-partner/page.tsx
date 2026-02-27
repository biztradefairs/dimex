'use client'

import PartnerForm from './PartnerForm'

export default function BecomePartnerPage() {
  return (
    <main className="min-h-screen bg-mainColor5 font-parabolica">
      {/* PAGE HEADER */}
      <div className="relative z-[1] flex flex-col justify-end bg-sky-50 !pt-48">
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px]">
          <div className="flex flex-col justify-end !pt-0 !pb-10">
            <h2 className="title-72 text-black">
              Leave your application to participate in Diemex 2026 Conference as a partner.
            </h2>
            <p className="max-w-6xl whitespace-pre-line py-5">
              {/* Empty as per original */}
            </p>
          </div>
        </div>
      </div>

      {/* FORM + CONTENT SECTION */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="relative overflow-hidden">
            <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-[1240px] lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] py-20">
              <div className="grid gap-10 lg:grid-cols-2 lg:flex-row-reverse">
                
                {/* LEFT — CONTENT */}
                <div className="flex flex-col">
                  <div>
                    <h3 className="my-5 text-2xl font-semibold text-[#4D4D4D] lg:text-6xl">
                      Diemex 2026 Conference  
                    </h3>
                    
                    <div className="rte-style [&_h1]:lg:text-4xl [&_h2]:lg:text-3xl [&_h3]:lg:text-2xl [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:underline [&_blockquote]:relative [&_blockquote]:italic [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:text-xl [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:p-5 [&_blockquote]:ml-5 my-5">
                      <h2 style={{ marginLeft: 0 }}>
                        <strong>Partnership participation</strong>
                      </h2>
                      <p style={{ marginLeft: 0 }} >&nbsp;</p>
                      <p style={{ marginLeft: 0 }} className='text-[#4D4D4D]'>
                        <strong>DIEMEX 2026 Conference</strong> is a premier annual business platform bringing together professionals from die & mould manufacturing companies, tooling solution providers, machine tool manufacturers, automation specialists, and OEMs across the precision engineering ecosystem.
 
                      </p>
                     <p style={{ marginLeft: 0 }}>&nbsp;</p>
                      <p style={{ marginLeft: 0 }} className='text-[#4D4D4D]'>
                       If you'd like to become a summit partner, present your solutions, or advertise at the event, please fill out the form on the left—our team will contact you as soon as possible.
                      </p>
                      <p style={{ marginLeft: 0 }}>&nbsp;</p>
                      <p style={{ marginLeft: 0 }} className='text-[#4D4D4D]'>
                        <i>
For any questions regarding participation, partnership, or additional advertising opportunities, please contact the Diemex 2026 Conference management team.</i>
                      </p> 
                    </div>

                    <img
                      alt="Diemex Conference 2026"
                      src="/images/become-partner/conf2.jpg"
                      className="my-10 size-auto object-contain"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>

                {/* RIGHT — FORM */}
                <div className="flex h-fit flex-col conference-form lg:order-first">
                  <div className="form-style !py-12">
                    <PartnerForm />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}