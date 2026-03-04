'use client'

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ThankYouPopup from '@/components/ThankYouPopup';
import ReCAPTCHA from 'react-google-recaptcha';

export default function PartnerRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phone: '',
    companyName: '',
    gstin: '',
    address: '',
    website: '',
    marketingConsent: false,
    privacyConsent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const validatePhoneNumber = (phone: string) => {
    // Validate 10-digit Indian phone number
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate phone number
    if (!validatePhoneNumber(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      setIsSubmitting(false);
      return;
    }

    // Check privacy consent
    if (!formData.privacyConsent) {
      toast.error("Please accept the Privacy Policy to continue");
      setIsSubmitting(false);
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://diemex-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'partner-registration',
          captchaToken,
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Partner registration submitted successfully!');
        setShowThankYou(true);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          jobTitle: '',
          email: '',
          phone: '',
          companyName: '',
          gstin: '',
          address: '',
          website: '',
          marketingConsent: false,
          privacyConsent: false
        });
        
        // Reset captcha token
        setCaptchaToken(null);
        
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        toast.error(result.message || 'Failed to submit registration.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="max-w-3xl mx-auto rounded-2xl bg-[#F4FAFD] p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Partner Registration Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid for first two rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="Enter your last name"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="Enter your job title"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="example@company.com"
              />
            </div>
          </div>

          {/* Mobile Phone - India +91 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Phone <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-3 rounded-l-lg border-r-0">
                <span className="text-gray-700 font-medium">+91</span>
                <img
                  src="https://flagcdn.com/w40/in.png"
                  alt="IND"
                  className="h-4 w-6 object-cover rounded"
                />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="9876543210"
                maxLength={10}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
          </div>

          {/* Company Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="Enter company name"
              />
            </div>

            {/* GSTIN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GSTIN
              </label>
              <input 
                type="text" 
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="22AAAAA0000A1Z5 (Optional)"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="Enter company address"
              />
            </div>

            {/* Company Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Website
              </label>
              <input 
                type="url" 
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-6 pt-4">
            {/* Checkbox 1 - Marketing */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
              <input 
                type="checkbox" 
                id="marketing" 
                name="marketingConsent"
                checked={formData.marketingConsent}
                onChange={handleChange}
                className="mt-1 h-5 w-5 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
              />
              <label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                I want to stay informed about exhibitions organized by
                <strong> Maxx Business Media Pvt. Ltd.</strong>, and be the first to
                receive information about exhibition stand sales, business program
                events, advertising and sponsorship opportunities.
              </label>
            </div>

            {/* Checkbox 2 - Privacy Consent */}
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
              <input 
                type="checkbox" 
                id="consent" 
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleChange}
                required
                className="mt-1 h-5 w-5 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
              />
              <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                I hereby give consent to <strong>Maxx Business Media Pvt. Ltd.</strong>
                for automated and mixed processing of my personal data in accordance
                with the <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline font-medium">Personal Data Policy</a>.
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="rounded-lg bg-white p-4 border border-gray-200">
            <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Processing...' : 'Register as Partner'}
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              All fields marked with <span className="text-red-500">*</span> are required
            </p>
          </div>
        </form>
      </div>

      {/* Thank You Popup */}
      <ThankYouPopup
        isVisible={showThankYou}
        onClose={() => setShowThankYou(false)}
        name={formData.firstName}
        formType="partner-registration"
      />
    </>
  );
}