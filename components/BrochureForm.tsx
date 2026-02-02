"use client"
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ThankYouPopup from '@/components/ThankYouPopup';
import ReCAPTCHA from 'react-google-recaptcha';

export default function BrochureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
   const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    country: '',
    notRobot: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
      if (!formData.notRobot) {
      alert("Please confirm that you are not a robot.")
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'event-brochure',
          submittedAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Brochure request submitted!');
        setShowThankYou(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          company: '',
          jobTitle: '',
          email: '',
          phone: '',
          country: '',
          notRobot: false
        });
      } else {
        toast.error(result.message || 'Failed to submit request.');
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
      
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-700">
          Download Event Brochure
        </h3>

        <div>
          <label className="mb-1 block text-sm font-medium">
            First Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type your first name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Last Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type your last name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Company Name<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Job Title<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Job title"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Work Email<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone<span className="ml-1 text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Phone number"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Country<span className="ml-1 text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select country</option>
            <option value="India">India</option>
            <option value="Russia">Russia</option>
            <option value="UAE">UAE</option>
            <option value="UK">UK</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
            <option value="China">China</option>
            <option value="Turkey">Turkey</option>
            <option value="Kazakhstan">Kazakhstan</option>
          </select>

            <div className="rounded border bg-gray-50 p-4">
       <div className="flex justify-center pt-4">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>
        </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 w-fit rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:opacity-90 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Download Brochure'}
        </button>

        <p className="text-[11px] leading-relaxed text-gray-600">
          By submitting this form, you agree to receive marketing
          communications. You can unsubscribe anytime. Read our{' '}
          <a
            href="https://ite.group/en/privacy/"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>.
        </p>
      </form>

      {/* Thank You Popup */}
      <ThankYouPopup
        isVisible={showThankYou}
        onClose={() => setShowThankYou(false)}
        name={formData.firstName}
        formType="event-brochure"
      />
    </>
  );
}