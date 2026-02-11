import { Metadata } from "next"
// import PartnersSlider from "@/components/section/PartnersSection"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Contact Us | Diemex 2026",
  description: "Get in touch with Diemex Expo. Contact our team for sales, marketing, technical, or general exhibition enquiries.",
}

export default function ContactPage() {
  return (
    <main className="bg-white font-parabolica">
      {/* HERO SECTION */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl font-bold text-black">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Get in touch with our team for any exhibition-related enquiries.
          </p>
        </SectionContainer>
      </section>

      {/* VENUE & ORGANIZER DETAILS SECTION */}
      <section className="relative py-16 font-parabolica">
        <SectionContainer>
          {/* Intro text */}
          <div className="mb-12 text-center">
            <p className="mx-auto max-w-2xl text-lg text-gray-700">
              Have questions or need help? Contact us using the details below.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* ORGANIZER DETAILS */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg h-full">
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-[#004D9F]">
                    ORGANISED BY
                  </h2>
                  <div className="h-1 w-16 bg-[#004D9F]"></div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Maxx Business Media Pvt. Ltd.
                  </h3>
                  
                  <div className="space-y-3 text-gray-700">
                    <p>T9, 3rd Floor, Swastik Manandi Arcade,</p>
                    <p>Seshadripuram, Bangalore 560020</p>
                    
                    <div className="pt-3 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-[#004D9F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <span className="font-medium">+91 91483 19993</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-[#004D9F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <span className="font-medium">pad@diemex.in</span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            {/* VENUE DETAILS WITH MAP */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg">
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="mb-2 text-2xl font-bold text-[#004D9F]">
                      VENUE
                    </h2>
                    <div className="h-1 w-16 bg-[#004D9F]"></div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
Auto Cluster Exhibition Centre                    </h3>
                    
                    <div className="space-y-2 text-gray-700">
                      <p className="text-lg font-medium">MIDC, Chinchwad,</p>
                      <p>Pimpri-Chinchwad, ,</p>
                      <p>Pune, Maharashtra 411019.</p>
                    </div>
                  </div>

                  {/* Google Map Embed */}
                  <div className="rounded-lg overflow-hidden border border-gray-300">
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4110.374496455856!2d73.7990458754672!3d18.638844465550328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84992d04bbd%3A0x9f1c44fb853ba461!2sAuto%20Cluster%20Exhibition%20Center%2C%20Chinchwad%2C%20Pune!5e1!3m2!1sen!2sin!4v1770050921314!5m2!1sen!2sin"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Chennai Trade Centre Location"
                      className="w-full"
                    ></iframe>
                  </div>

                  {/* Map controls info */}
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>Interactive map - Zoom & explore</span>
                    </div>
                    <a
                    href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4110.374496455856!2d73.7990458754672!3d18.638844465550328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b84992d04bbd%3A0x9f1c44fb853ba461!2sAuto%20Cluster%20Exhibition%20Center%2C%20Chinchwad%2C%20Pune!5e1!3m2!1sen!2sin!4v1770050921314!5m2!1sen!2sin"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#004D9F] hover:text-blue-800 font-medium"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#004D9F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Business Hours: Mon-Sat, 10AM-6PM IST</span>
              </div>
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              For exhibition bookings, partnership opportunities, or general enquiries, 
              please reach out to us during business hours.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* PARTNERS SECTION */}
      {/* <section className="py-20 bg-gray-50">
        <SectionContainer>
          <PartnersSlider />
        </SectionContainer>
      </section> */}
      <BackToTop/>
    </main>
  )
}
