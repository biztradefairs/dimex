import React from "react";

export default function WhyAttendSection() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-10 text-black">
  Why Attend DIEMEX Conference 2026
</h2>
          <div className="rte-style [&_a]:underline [&_blockquote]:relative [&_blockquote]:ml-5 [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:p-5 [&_blockquote]:italic [&_h1]:lg:text-4xl [&_h2]:lg:text-3xl [&_h3]:lg:text-2xl [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
            <div className="overflow-x-auto">
              <figure className="table min-w-[300px] w-full">
                <table className="ck-table-resized w-full">
                  <colgroup>
                    <col className="w-[60px] md:w-[8.45%]" />
                    <col className="w-auto md:w-[91.55%]" />
                  </colgroup>
                  <tbody>
                    {[
                      {
                        icon: "info_1ac9f9903c.png",
                        title: "Stay Updated on Key Industry Developments",
                        description: "Delegates will gain valuable insights into the latest trends in die & mould, tooling, automation, and precision manufacturing. Hear directly from industry experts, technology leaders, and OEM decision-makers, and get practical answers to your most pressing technical and business challenges."
                      },
                      {
                        icon: "profits_7bf2b98a13.png",
                        title: "Insights for Business Growth",
                        description: "Each delegate will discover new opportunities for business expansion, including advanced tooling capabilities, emerging manufacturing technologies, new industry applications, and expanded service offerings across automotive, aerospace, plastics, and precision engineering sectors."
                      },
                      {
                        icon: "chat_6c367bef7a.png",
                        title: "Networking opportunities",
                        description: "Participating in the DIEMEX Conference offers a powerful platform to connect with die & mould manufacturers, tooling experts, OEM leaders, and precision engineering professionals. Exchange ideas, share best practices, and build strategic partnerships that drive long-term business growth."
                      },
                      {
                        icon: "sales_348ae8dd98.png",
                        title: "Additional Opportunities for DIEMEX Exhibitors",
                        description: "For DIEMEX exhibitors, conference insights help sharpen exhibition strategies, align product positioning with market trends, and maximise ROI. By understanding emerging technologies and buyer expectations, exhibitors can present stronger, more targeted solutions."
                      }
                    ].map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td className="py-2 md:py-4 align-top">
                            <figure className="image image-style-side image_resized mx-auto md:mx-0" style={{ width: '40px', maxWidth: '75px', margin: '0 auto' }}>
                              <img
                                style={{ aspectRatio: '512/512' }}
                                src={`https://regional-cdn.itegroupnews.com/${item.icon}`}
                                alt={item.icon}
                                width={512}
                                height={512}
                                className="w-full h-auto"
                              />
                            </figure>
                          </td>
                          <td className="py-2 md:py-4 pl-2 md:pl-4 align-top">
                            <strong className="text-sm md:text-base lg:text-lg">{item.title}</strong>
                            <br />
                            <span className="text-xs md:text-sm lg:text-base">{item.description}</span>
                          </td>
                        </tr>
                        {index < 3 && (
                          <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
