import React from "react";

export default function WhyAttendSection() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="title-48 md:title-72 mb-6 md:mb-10 text-black">Why Attend TransRussia Summit 2026</h2>
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
                        title: "Stay updated on key market changes",
                        description: "Delegates will receive current information about changes in transport and logistics services and can get answers to their questions from market experts"
                      },
                      {
                        icon: "profits_7bf2b98a13.png",
                        title: "Insights for business development",
                        description: "Each delegate will identify new prospects for company development, including expanding types of cargo transportation and range of services offered"
                      },
                      {
                        icon: "chat_6c367bef7a.png",
                        title: "Networking opportunities",
                        description: "Participation provides a simple way to join the business community, exchange ideas and experiences, and establish useful partnerships"
                      },
                      {
                        icon: "sales_348ae8dd98.png",
                        title: "Additional opportunities for TransRussia exhibition participants",
                        description: "For delegates whose companies plan to participate in the upcoming exhibition, the knowledge gained allows adapting participation concepts to market situations"
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