import { Metadata } from "next"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Privacy Policy | DIEMEX",
  description: "DIEMEX Privacy Policy - Learn how we collect, use, store, and protect your personal data in accordance with applicable laws.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white font-parabolica">
      {/* HERO SECTION */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl font-bold text-black">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Our commitment to protecting your personal data and privacy.
          </p>
        </SectionContainer>
      </section>

      {/* PRIVACY POLICY CONTENT SECTION */}
      <section className="relative py-16 font-parabolica">
        <SectionContainer>
          <div className="max-w-10xl mx-auto">
            
              {/* Introduction Section */}
              <div className="mb-8 pb-6 border-b">
                <h2 className="text-2xl font-bold text-[#004D9F] mb-4">
                  Policy for Processing and Security of Personal Data
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h3>
                    <p>
                      This Policy for Processing and Security of Personal Data ("Policy") explains how DIEMEX ("we", "our", "us") collects, uses, stores, and protects personal data obtained through the DIEMEX website and related digital platforms. DIEMEX is committed to safeguarding personal data and handling it responsibly in accordance with applicable Indian laws, including the Digital Personal Data Protection Act, 2023.
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Scope of the Policy</h3>
                  <p className="text-gray-700">
                    This Policy applies to all personal data collected from website visitors, exhibitors, visitors, delegates, partners, vendors, and other users who interact with the DIEMEX website or provide personal information in connection with DIEMEX exhibitions and events.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Categories of Personal Data</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>We may collect and process the following categories of personal data:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Name, designation, and company name</li>
                      <li>Email address, phone number, and business contact details</li>
                      <li>Registration, enquiry, and subscription information</li>
                      <li>Professional and business-related information</li>
                      <li>Technical data such as IP address, browser type, and website usage data</li>
                    </ul>
                    <p className="pt-2">
                      We do not knowingly collect sensitive personal data unless required by law or explicitly provided by the user.
                    </p>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Purpose of Personal Data Processing</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Personal data is collected and processed for the following purposes:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Visitor, exhibitor, and delegate registration</li>
                      <li>Event communication and coordination</li>
                      <li>Marketing, newsletters, and promotional updates related to DIEMEX</li>
                      <li>Customer support and enquiry handling</li>
                      <li>Website administration and improvement</li>
                      <li>Legal and regulatory compliance</li>
                    </ul>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Legal Basis for Processing</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Personal data is processed based on:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Consent provided by the data subject</li>
                      <li>Performance of contractual or pre-contractual obligations</li>
                      <li>Legitimate business interests related to event organisation</li>
                      <li>Compliance with applicable legal obligations</li>
                    </ul>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Consent of the Data Subject</h3>
                  <p className="text-gray-700">
                    By submitting personal information through the DIEMEX website, users provide their free, informed, and specific consent to the processing of their personal data in accordance with this Policy. Consent may be withdrawn at any time by contacting DIEMEX.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Processing, Storage, and Retention of Data</h3>
                  <p className="text-gray-700">
                    Personal data is processed using secure systems and stored only for as long as necessary to fulfil the purposes outlined in this Policy or as required by applicable laws. Data may be retained for legitimate business, legal, or regulatory reasons.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Confidentiality and Data Sharing</h3>
                  <p className="text-gray-700">
                    All personal data is treated as confidential. DIEMEX does not sell or misuse personal data. Data may be shared only with trusted service providers, event partners, or authorities where necessary for event operations or where required by law, subject to appropriate confidentiality obligations.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Data Security Measures</h3>
                  <p className="text-gray-700">
                    DIEMEX implements appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, loss, or destruction. These measures include secure servers, access controls, and regular system monitoring.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">10. Rights of Data Subjects</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>Data subjects have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Access their personal data</li>
                      <li>Request correction or updating of inaccurate data</li>
                      <li>Request deletion of personal data, subject to legal requirements</li>
                      <li>Withdraw consent for data processing</li>
                    </ul>
                    <p className="pt-2">
                      Requests related to these rights may be submitted by email to DIEMEX.
                    </p>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">11. Obligations of DIEMEX</h3>
                  <p className="text-gray-700">
                    DIEMEX is responsible for ensuring that personal data is processed lawfully, fairly, and transparently, and that adequate safeguards are in place to protect such data.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">12. Updates to This Policy</h3>
                  <p className="text-gray-700">
                    DIEMEX reserves the right to update or revise this Policy at any time. Any changes will be published on the website. Continued use of the website indicates acceptance of the updated Policy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Information</h3>
                  <p className="text-gray-700 mb-4">
                    For any questions, concerns, or requests related to personal data processing, please contact:
                  </p>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-[#004D9F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <span className="font-medium">Email: info@diemex.in</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Updated Info */}
              <div className="mt-12 pt-6 border-t">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">Last Updated: {new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      This Privacy Policy is effective immediately and applies to all users of the DIEMEX website.
                    </p>
                  </div>
                </div>
              </div>
            

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#004D9F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Your privacy and data security are our top priorities</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                We are committed to maintaining the confidentiality, integrity, and security of your personal information. 
                If you have any concerns about your privacy, please don't hesitate to contact us.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>
      
      <BackToTop/>
    </main>
  )
}