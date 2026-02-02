"use client"

import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import ReCAPTCHA from "react-google-recaptcha"
import ThankYouPopup from "@/components/ThankYouPopup"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    enquiryType: "general",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaToken) {
      toast.error("Please verify that you are not a robot.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          captchaToken, // sent to backend (optional)
          formType: "contact",
          submittedAt: new Date().toISOString(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Message sent successfully!")
        setShowThankYou(true)

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          jobTitle: "",
          enquiryType: "general",
          message: "",
        })

        setCaptchaToken(null)
      } else {
        toast.error(result.message || "Submission failed.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <input
            name="firstName"
            placeholder="First Name *"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
          <input
            name="lastName"
            placeholder="Last Name *"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
          <input
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <select
          name="enquiryType"
          value={formData.enquiryType}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="general">General Enquiry</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="partnership">Partnership</option>
          <option value="media">Media Enquiry</option>
        </select>

        <textarea
          name="message"
          placeholder="Your message *"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-3"
        />

        {/* ✅ GOOGLE IMAGE CAPTCHA */}
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full rounded-lg py-4 font-semibold text-white ${
            isSubmitting
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Processing..." : "Send Message"}
        </button>

        <p className="text-center text-xs text-gray-500">
          By submitting this form you agree to our{" "}
          <a href="/privacy-policy" className="text-blue-600 underline">
            Privacy Policy
          </a>
        </p>
      </form>

      <ThankYouPopup
        isVisible={showThankYou}
        onClose={() => setShowThankYou(false)}
        name={formData.firstName}
        formType="contact"
      />
    </>
  )
}
