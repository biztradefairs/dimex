// components/VenueSection.tsx
export default function VenueSection() {
  return (
    <section className="animated-block">
      <div className="animated-block-target">
        <div className="container">
          <h2 className="title-72 mb-10 text-black">Venue</h2>
          <div className="rte-style [&_a]:underline [&_blockquote]:relative [&_blockquote]:ml-5 [&_blockquote]:w-fit [&_blockquote]:border-l-4 [&_blockquote]:border-black [&_blockquote]:bg-[#f9f9f9] [&_blockquote]:p-5 [&_blockquote]:italic [&_h1]:lg:text-4xl [&_h2]:lg:text-3xl [&_h3]:lg:text-2xl [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5">
            <figure className="table" style={{ width: '100%' }}>
              <table className="ck-table-resized">
                <colgroup>
                  <col style={{ width: '12.54%' }} />
                  <col style={{ width: '87.46%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <figure className="image image-style-side image_resized" style={{ width: '75%' }}>
                        <img
                          style={{ aspectRatio: '328/328' }}
                          src="https://regional-cdn.itegroupnews.com/location_dot_solid_full_c0b9c622bf.png"
                          alt="location-dot-solid-full.png"
                          width={328}
                          height={328}
                        />
                      </figure>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'Proxima, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif', fontSize: '27px' }}>
                        <strong>Hyatt Regency Moscow Petrovsky Park</strong>
                      </span>
                      <br />
                      <span style={{ fontFamily: 'Proxima, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif', fontSize: '27px' }}>
                        Moscow, Leningradsky Prospekt, 36 bldg. 33
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </figure>
            <p>&nbsp;</p>
            <figure className="table" style={{ width: '100%' }}>
              <table className="ck-table-resized">
                <colgroup>
                  <col style={{ width: '32.84%' }} />
                  <col style={{ width: '33.5%' }} />
                  <col style={{ width: '33.66%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <figure className="image image_resized" style={{ width: '94.23%' }}>
                        <img
                          style={{ aspectRatio: '940/627' }}
                          src="https://regional-cdn.itegroupnews.com/hyatt_a33630c7be.jpg"
                          alt="hyatt.jpg"
                          width={940}
                          height={627}
                        />
                      </figure>
                    </td>
                    <td>
                      <figure className="image image_resized" style={{ width: '91.69%' }}>
                        <img
                          style={{ aspectRatio: '4000/2667' }}
                          src="https://regional-cdn.itegroupnews.com/02_6deba748f3.jpg"
                          alt="02.jpg"
                          width={4000}
                          height={2667}
                        />
                      </figure>
                    </td>
                    <td>
                      <figure className="image image_resized" style={{ width: '91.3%' }}>
                        <img
                          style={{ aspectRatio: '4000/2667' }}
                          src="https://regional-cdn.itegroupnews.com/VAO_03626_f5adfc79ac.jpg"
                          alt="VAO03626.jpg"
                          width={4000}
                          height={2667}
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