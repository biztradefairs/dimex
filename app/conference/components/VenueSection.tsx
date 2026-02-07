export default function VenueSection() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="title-48 md:title-72 mb-6 md:mb-10 text-black">Venue</h2>
          <div className="rte-style [&_a]:underline [&_blockquote]:relative [&_blockquote]:ml-5 [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:p-5 [&_blockquote]:italic [&_h1]:lg:text-4xl [&_h2]:lg:text-3xl [&_h3]:lg:text-2xl [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
            <figure className="table w-full">
              <table className="ck-table-resized w-full">
                <colgroup>
                  <col className="w-[60px] md:w-[12.54%]" />
                  <col className="w-auto md:w-[87.46%]" />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="py-2 md:py-4 align-top">
                      <figure className="image image-style-side image_resized mx-auto md:mx-0" style={{ width: '50px', maxWidth: '75px', margin: '0 auto' }}>
                        <img
                          style={{ aspectRatio: '328/328' }}
                          src="https://regional-cdn.itegroupnews.com/location_dot_solid_full_c0b9c622bf.png"
                          alt="location-dot-solid-full.png"
                          width={328}
                          height={328}
                          className="w-full h-auto"
                        />
                      </figure>
                    </td>
                    <td className="py-2 md:py-4 pl-2 md:pl-4 align-top">
                      <span style={{ fontFamily: 'Proxima, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif', fontSize: '18px', lineHeight: '1.4' }} className="md:text-[22px] lg:text-[27px]">
                        <strong>Hyatt Regency Moscow Petrovsky Park</strong>
                      </span>
                      <br />
                      <span style={{ fontFamily: 'Proxima, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif', fontSize: '16px', lineHeight: '1.4' }} className="md:text-[20px] lg:text-[27px]">
                        Moscow, Leningradsky Prospekt, 36 bldg. 33
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </figure>
            <p className="hidden md:block">&nbsp;</p>
            <figure className="table w-full mt-6 md:mt-8">
              <table className="ck-table-resized w-full">
                <colgroup>
                  <col className="w-full md:w-[32.84%]" />
                  <col className="w-full md:w-[33.5%]" />
                  <col className="w-full md:w-[33.66%]" />
                </colgroup>
                <tbody>
                  <tr className="flex flex-col md:table-row gap-4 md:gap-0">
                    <td className="md:pr-2">
                      <figure className="image image_resized w-full">
                        <img
                          style={{ aspectRatio: '940/627' }}
                          src="https://regional-cdn.itegroupnews.com/hyatt_a33630c7be.jpg"
                          alt="hyatt.jpg"
                          width={940}
                          height={627}
                          className="w-full h-auto rounded-lg"
                        />
                      </figure>
                    </td>
                    <td className="md:px-2">
                      <figure className="image image_resized w-full mt-4 md:mt-0">
                        <img
                          style={{ aspectRatio: '4000/2667' }}
                          src="https://regional-cdn.itegroupnews.com/02_6deba748f3.jpg"
                          alt="02.jpg"
                          width={4000}
                          height={2667}
                          className="w-full h-auto rounded-lg"
                        />
                      </figure>
                    </td>
                    <td className="md:pl-2">
                      <figure className="image image_resized w-full mt-4 md:mt-0">
                        <img
                          style={{ aspectRatio: '4000/2667' }}
                          src="https://regional-cdn.itegroupnews.com/VAO_03626_f5adfc79ac.jpg"
                          alt="VAO03626.jpg"
                          width={4000}
                          height={2667}
                          className="w-full h-auto rounded-lg"
                        />
                      </figure>
                    </td>
                  </tr>
                </tbody>
              </table>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}