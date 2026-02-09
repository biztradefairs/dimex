import { Metadata } from "next"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Terms of Use | DIEMEX",
  description: "Terms and conditions governing the use of DIEMEX website. Read our terms of use, policies, and legal information.",
}

export default function TermsOfUsePage() {
  return (
    <main className="bg-white font-parabolica">
      {/* HERO SECTION */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl font-bold text-black">
            Terms of Use
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Please read these terms carefully before using our website.
          </p>
        </SectionContainer>
      </section>

      {/* TERMS OF USE CONTENT SECTION */}
      <section className="relative py-16 font-parabolica">
        <SectionContainer>
          <div className="max-w-10xl mx-auto">
            
              {/* Updated Content */}
              <div className="space-y-8">
                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Acceptance of Terms</h2>
                  <p className="text-gray-700">
                    The DIEMEX website ("Website") is operated by the DIEMEX Organising Team ("DIEMEX", "we", "our", "us"). The Website is offered to you subject to your acceptance, without modification, of these Terms of Use. By accessing or using this Website, you agree to be bound by all terms, conditions, and notices contained herein.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Modification of Terms</h2>
                  <p className="text-gray-700">
                    DIEMEX reserves the right to change, modify, or update these Terms of Use at any time without prior notice. Continued use of the Website following any changes constitutes acceptance of those changes.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Links to Third-Party Websites</h2>
                  <p className="text-gray-700">
                    The Website may contain links to third-party websites ("Linked Sites") provided for convenience only. DIEMEX does not control, endorse, or assume responsibility for the content, accuracy, or policies of any Linked Site. Accessing such websites is done at your own risk.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Prohibited and Unlawful Use</h2>
                  <p className="text-gray-700">
                    As a condition of using this Website, you agree not to use it for any unlawful purpose or in any way that may damage, disable, overburden, or impair the Website or interfere with other users' access. You may not attempt to gain unauthorised access to any part of the Website or to any systems or networks connected to it.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Materials Submitted to DIEMEX</h2>
                  <div className="space-y-3 text-gray-700">
                    <p>DIEMEX does not claim ownership of any materials, information, or content you submit to the Website, including enquiries, feedback, or registration details ("Submissions"). However, by submitting content, you grant DIEMEX a non-exclusive, royalty-free right to use, reproduce, display, and distribute such Submissions for exhibition-related, promotional, or operational purposes.</p>
                    <p>No compensation shall be payable for the use of such Submissions. DIEMEX reserves the right to remove any Submission at its sole discretion.</p>
                    <p>You represent and warrant that you own or have the necessary rights to submit the content provided.</p>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Disclaimer of Liability</h2>
                  <div className="space-y-3 text-gray-700">
                    <p>The information on this Website is provided for general information purposes only and may contain inaccuracies or typographical errors. DIEMEX makes no warranties regarding the accuracy, completeness, or suitability of the information, products, or services provided through the Website.</p>
                    <p>All content is provided on an "as is" and "as available" basis, without any warranties, express or implied. DIEMEX shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or related to the use or inability to use the Website.</p>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Professional Advice</h2>
                  <p className="text-gray-700">
                    Any information provided through the Website should not be considered professional, legal, medical, or financial advice. Users are encouraged to consult appropriate professionals where necessary.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Termination of Access</h2>
                  <p className="text-gray-700">
                    DIEMEX reserves the right to suspend or terminate access to the Website or any part thereof at any time, without notice, for any reason.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Governing Law and Jurisdiction</h2>
                  <p className="text-gray-700">
                    These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or related to the use of this Website shall be subject to the exclusive jurisdiction of the courts of India.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Copyright and Intellectual Property</h2>
                  <div className="space-y-3 text-gray-700">
                    <p>All content on this Website, including text, images, graphics, logos, and design elements, is protected by applicable copyright and intellectual property laws.</p>
                    <p className="font-semibold">© DIEMEX. All rights reserved.</p>
                    <p>No part of this Website may be reproduced, distributed, or transmitted in any form without prior written permission from DIEMEX, except for personal, non-commercial use.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">Contact Information</h2>
                  <p className="text-gray-700">
                    For any queries regarding these Terms of Use, please contact:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
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
                      By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.
                    </p>
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
                  <span>For urgent matters, please contact during business hours</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                These terms apply to all visitors, users, and others who access or use the Website. 
                If you do not agree with these terms, please do not use our website.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>
      
      <BackToTop/>
    </main>
  )
}