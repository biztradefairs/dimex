export default function AboutSection() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="title-48 md:title-72 mb-6 md:mb-10 text-black">About the Summit</h2>
          <div className="rte-style [&_a]:underline [&_blockquote]:relative [&_blockquote]:ml-5 [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:p-5 [&_blockquote]:italic [&_h1]:lg:text-4xl [&_h2]:lg:text-3xl [&_h3]:lg:text-2xl [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
            <div className="overflow-x-auto">
              <figure className="table min-w-[300px]">
                <table className="w-full">
                  <tbody>
                    <tr className="flex flex-col md:table-row">
                      <td className="py-2 md:py-0">
                        <figure className="image image-style-side image_resized mx-auto md:mx-0" style={{ width: '50%', maxWidth: '75px', margin: '0 auto' }}>
                          <img
                            style={{ aspectRatio: '328/328' }}
                            src="https://regional-cdn.itegroupnews.com/users_solid_full_64a5e910b8.png"
                            alt="users-solid-full.png"
                            width={328}
                            height={328}
                            className="w-full h-auto"
                          />
                        </figure>
                      </td>
                      <td className="py-2 md:py-0 px-4 md:px-0">
                        <span className="text-sm md:text-base lg:text-[19px]">
                          <strong>300+ top-level delegates</strong> from leading logistics companies and cargo-owning companies
                        </span>
                      </td>
                      <td className="py-2 md:py-0">
                        <figure className="image image-style-side image_resized mx-auto md:mx-0" style={{ width: '50%', maxWidth: '75px', margin: '0 auto' }}>
                          <img
                            style={{ aspectRatio: '328/328' }}
                            src="https://regional-cdn.itegroupnews.com/microphone_lines_solid_full_ee6b12ccb8.png"
                            alt="microphone-lines-solid-full.png"
                            width={328}
                            height={328}
                            className="w-full h-auto"
                          />
                        </figure>
                      </td>
                      <td className="py-2 md:py-0 px-4 md:px-0">
                        <span className="text-sm md:text-base lg:text-[19px]">
                          <strong>30+ speakers</strong> - logistics managers of major cargo-owning companies and leading analysts
                        </span>
                      </td>
                    </tr>
                    <tr className="hidden md:table-row">
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr className="flex flex-col md:table-row">
                      <td className="py-2 md:py-0">
                        <figure className="image image_resized image-style-side mx-auto md:mx-0" style={{ width: '50%', maxWidth: '75px', margin: '0 auto' }}>
                          <img
                            style={{ aspectRatio: '329/328' }}
                            src="https://regional-cdn.itegroupnews.com/chart_simple_solid_full_12aaff66c1.png"
                            alt="chart-simple-solid-full.png"
                            width={329}
                            height={328}
                            className="w-full h-auto"
                          />
                        </figure>
                      </td>
                      <td className="py-2 md:py-0 px-4 md:px-0">
                        <span className="text-sm md:text-base lg:text-[19px]">
                          <strong>15+ hours of reliable analytics</strong> and diverse information from authoritative managers in cargo transportation
                        </span>
                      </td>
                      <td className="py-2 md:py-0">
                        <figure className="image image-style-side image_resized mx-auto md:mx-0" style={{ width: '50%', maxWidth: '75px', margin: '0 auto' }}>
                          <img
                            style={{ aspectRatio: '328/328' }}
                            src="https://regional-cdn.itegroupnews.com/comment_dots_solid_full_71c6e8b715.png"
                            alt="comment-dots-solid-full.png"
                            width={328}
                            height={328}
                            className="w-full h-auto"
                          />
                        </figure>
                      </td>
                      <td className="py-2 md:py-0 px-4 md:px-0">
                        <span className="text-sm md:text-base lg:text-[19px]">
                          <strong>8+ hours of networking</strong> for maintaining and developing business connections with professionals from transport companies, logistics organizations, and cargo-owning companies
                        </span>
                      </td>
                    </tr>
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