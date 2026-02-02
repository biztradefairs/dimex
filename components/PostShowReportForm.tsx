"use client"

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ThankYouPopup from '@/components/ThankYouPopup';
import ReCAPTCHA from 'react-google-recaptcha';


export default function PostShowReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    website: '',
    jobTitle: '',
    country: '',
    phone: '',
    email: '',
    standSize: '',
    hearAbout: '',
    sector: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'post-show-report',
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Request submitted successfully!');
        setShowThankYou(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          website: '',
          jobTitle: '',
          country: '',
          phone: '',
          email: '',
          standSize: '',
          hearAbout: '',
          sector: '',
        });
      } else {
        toast.error(result.message || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectors = [
    "Air Freight",
    "Rail Freight",
    "Road Freight Transportation",
    "Warehouse Equipment & Technology SkladTech",
    "Ports & Terminals",
    "E-commerce Logistics",
  ];

  return (
    <>
      <Toaster position="top-right" />
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-blue-700">Download Post-Show Report</h3>
          <p className="mt-1 text-gray-600">Fill in your details to get the complete report</p>
        </div>

        {/* First Name */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            First Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Type your first name"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Last Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Type your last name"
          />
        </div>

        {/* Company */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Company Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Company name"
          />
        </div>

        {/* Website */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Company Website
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="https://example.com"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Job Title<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Job title"
          />
        </div>

        {/* Country */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Country<span className="ml-1 text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select country</option>
            <option value="India">India</option>
            <option value="Russia">Russia</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Germany">Germany</option>
            <option value="China">China</option>
            <option value="UAE">UAE</option>
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Phone<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="Phone number"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Work Email<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            placeholder="you@company.com"
          />
        </div>

        {/* Stand Size */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Preferred Stand Size
          </label>
          <select
            name="standSize"
            value={formData.standSize}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select size</option>
            <option value="Up to 50 sqm">Up to 50 sqm</option>
            <option value="50 – 100 sqm">50 – 100 sqm</option>
            <option value="100+ sqm">100+ sqm</option>
          </select>
        </div>

        {/* How Did You Hear */}
        <div>
          <label className="mb-1 block text-sm font-semibold">
            How Did You Hear About Us?
          </label>
          <select
            name="hearAbout"
            value={formData.hearAbout}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="">Select option</option>
            <option value="Website">Website</option>
            <option value="Email">Email</option>
            <option value="Social Media">Social Media</option>
            <option value="Partner">Partner</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Product Sector */}
        <div className="pt-2">
          <label className="mb-2 block text-sm font-semibold">
            Product Sector<span className="ml-1 text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {sectors.map((sector) => (
              <label key={sector} className="flex items-center">
                <input
                  type="radio"
                  name="sector"
                  value={sector}
                  checked={formData.sector === sector}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{sector}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>
        </div>
         

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 w-full rounded-lg px-6 py-3 font-semibold text-white transition ${
            isSubmitting
              ? 'cursor-not-allowed bg-blue-400'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Download Report'}
        </button>

        {/* Terms */}
        <p className="mt-4 text-xs text-gray-600">
          By submitting this form, you agree to receive marketing communications.
          You can unsubscribe anytime. Read our{' '}
          <a
            href="https://ite.group/en/privacy/"
            target="_blank"
            className="font-semibold text-blue-600 hover:underline"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </form>

      {/* Thank You Popup */}
      <ThankYouPopup
        isVisible={showThankYou}
        onClose={() => setShowThankYou(false)}
        name={formData.firstName}
        formType="post-show-report"
      />
    </>
  );
}