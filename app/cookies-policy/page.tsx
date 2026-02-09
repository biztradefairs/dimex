import { Metadata } from "next"
import SectionContainer from "@/components/UI/SectionContainer"
import BackToTop from "../exhibitor-resource-center/component/BackToTop"

export const metadata: Metadata = {
  title: "Cookies Policy | DIEMEX",
  description: "DIEMEX Cookies Policy - Learn how we use cookies and similar technologies on our website to enhance your browsing experience.",
}

export default function CookiesPolicyPage() {
  return (
    <main className="bg-white font-parabolica">
      {/* HERO SECTION */}
      <section className="bg-[#F4FAFF] pt-40 pb-20">
        <SectionContainer>
          <h1 className="text-5xl sm:text-6xl font-bold text-black">
            Cookies Policy
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Understanding how we use cookies to enhance your browsing experience.
          </p>
        </SectionContainer>
      </section>

      {/* COOKIES POLICY CONTENT SECTION */}
      <section className="relative py-16 font-parabolica">
        <SectionContainer>
          <div className="max-w-10xl mx-auto">
            
              {/* Introduction */}
              <div className="mb-8 pb-6 border-b">
                <p className="text-lg text-gray-700">
                  This Cookies Policy explains how DIEMEX ("we", "our", "us") uses cookies and similar technologies on the DIEMEX website ("Platform"). By using the Platform, you agree to the use of cookies in accordance with this Policy.
                </p>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">1. Notice</h2>
                  <p className="text-gray-700">
                    When you visit the DIEMEX Platform for the first time, you will be notified about the use of cookies. By continuing to browse or use the Platform without changing your cookie settings, you consent to the use of cookies as described in this Policy.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">2. What Are Cookies?</h2>
                  <p className="text-gray-700">
                    Cookies are small text files stored on your computer, mobile phone, or other devices when you visit a website. Cookies help the Platform recognise your device and store certain information such as browser type, operating system, language preferences, and other settings to enhance your browsing experience.
                  </p>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">3. Purpose of Using Cookies</h2>
                  <div className="space-y-3 text-gray-700">
                    <p>DIEMEX uses cookies for the following purposes:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>To ensure proper functioning of the Platform</li>
                      <li>To improve website performance and user experience</li>
                      <li>To remember user preferences and settings</li>
                      <li>To analyse website traffic and usage statistics</li>
                      <li>To support secure login sessions and form submissions</li>
                      <li>To personalise content, communications, and promotional messages related to DIEMEX events</li>
                    </ul>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">4. Types of Cookies Used</h2>
                  <div className="space-y-3 text-gray-700">
                    <p>The Platform may collect the following information through cookies:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Browser type and version</li>
                      <li>Operating system</li>
                      <li>IP address and general location data</li>
                      <li>Pages visited and time spent on the Platform</li>
                      <li>Session duration and navigation behaviour</li>
                    </ul>
                    <p className="pt-2 font-medium">
                      DIEMEX does not use cookies to collect sensitive personal data.
                    </p>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">5. Cookie Management and Control</h2>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      You can manage or disable cookies at any time through your browser settings. Most browsers automatically accept cookies, but you can choose to block or delete cookies or receive alerts when cookies are being sent.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-yellow-700">
                            Please note that disabling cookies may affect certain functionalities of the Platform.
                          </p>
                        </div>
                      </div>
                    </div>
                    <p>
                      If you access the Platform using multiple devices or browsers, please ensure that cookie settings are adjusted separately on each device.
                    </p>
                    <p>
                      For more information on managing cookies, please refer to the help section of your browser or device manufacturer.
                    </p>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">6. Updates to This Policy</h2>
                  <p className="text-gray-700">
                    DIEMEX reserves the right to update this Cookies Policy at any time. Any changes will be posted on this page. Continued use of the Platform constitutes acceptance of the updated Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#004D9F] mb-3">7. Contact Information</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Cookies Policy, please contact:
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

              {/* Browser Cookie Settings Guide */}
              <div className="mt-10 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-[#004D9F] mb-4">How to Manage Cookies in Different Browsers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-gray-800 mb-2">Google Chrome</h4>
                    <p className="text-gray-600">Settings → Privacy and Security → Cookies and other site data</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-gray-800 mb-2">Mozilla Firefox</h4>
                    <p className="text-gray-600">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-gray-800 mb-2">Safari</h4>
                    <p className="text-gray-600">Preferences → Privacy → Cookies and website data</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-gray-800 mb-2">Microsoft Edge</h4>
                    <p className="text-gray-600">Settings → Cookies and site permissions → Cookies and site data</p>
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
                      By continuing to use our website, you consent to our use of cookies as described in this policy.
                    </p>
                  </div>
                </div>
              </div>
            

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#004D9F]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>You can control cookie settings through your browser preferences</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Cookies help us provide you with a better browsing experience while respecting your privacy preferences. 
                You have full control over how cookies are stored and used on your devices.
              </p>
            </div>
          </div>
        </SectionContainer>
      </section>
      
      <BackToTop/>
    </main>
  )
}