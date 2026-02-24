'use client'

import React from "react"
import { useState, useEffect } from 'react'
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface VisitorRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  companyName?: string
}

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina',
  'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh',
  'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Chile',
  'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
  'Czechia', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'DR Congo', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
  'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
  'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
  'Guatemala', 'Guinea', 'Guyana', 'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
  'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
  'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania',
  'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
  'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Republic of the Congo', 'Romania', 'Russia',
  'Rwanda', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia',
  'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain',
  'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
  'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
]

// API Base URL - Change this to your deployed backend URL
const API_BASE_URL = 'https://diemex-backend.onrender.com/api';

export default function VisitorRegistrationForm({
  isOpen,
  onClose,
  companyName,
}: VisitorRegistrationFormProps) {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: companyName || '',
    address: '',
    country: '',
    state: '',
    city: '',
    pinCode: '',
    email: '',
    mobile: '',
  })
  const [otp, setOtp] = useState('')

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('form')
        setFormData({
          name: '',
          designation: '',
          company: companyName || '',
          address: '',
          country: '',
          state: '',
          city: '',
          pinCode: '',
          email: '',
          mobile: '',
        })
        setOtp('')
        setOtpSent(false)
        setError('')
        setSuccessMessage('')
        setResendTimer(0)
      }, 300)
    }
  }, [isOpen, companyName])

  // Update company name when prop changes
  useEffect(() => {
    if (companyName) {
      setFormData(prev => ({ ...prev, company: companyName }))
    }
  }, [companyName])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('') // Clear error on input change
  }

  const validateForm = () => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    // Mobile validation (10 digits)
    const mobileRegex = /^\d{10}$/
    if (!mobileRegex.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number')
      return false
    }

    // Pin code validation
    if (formData.pinCode.length < 4) {
      setError('Please enter a valid pin code')
      return false
    }

    return true
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/visitors/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          mobile: formData.mobile,
          company: formData.company
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send OTP')
      }

      setOtpSent(true)
      setStep('otp')
      setSuccessMessage(`Verification code sent to ${formData.email}`)
      
      // Start resend timer
      setResendTimer(60)
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

    } catch (error: any) {
      setError(error.message || 'Error sending OTP. Please try again.')
      console.error('Error sending OTP:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendTimer > 0) return

    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/visitors/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to resend OTP')
      }

      setSuccessMessage(`New verification code sent to ${formData.email}`)
      setResendTimer(60)
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

    } catch (error: any) {
      setError(error.message || 'Error resending OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/visitors/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          otp: otp
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to verify OTP')
      }

      // Registration successful
      setStep('success')
      setSuccessMessage('Registration completed successfully! Check your email for confirmation.')
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)

    } catch (error: any) {
      setError(error.message || 'Error verifying OTP. Please try again.')
      console.error('Error verifying OTP:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6 md:py-0">
      <div className="bg-white rounded-lg w-full max-w-lg md:max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 bg-white gap-2 sticky top-0 z-10">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">
            {step === 'form' && 'Visitor Registration Form'}
            {step === 'otp' && 'Email Verification'}
            {step === 'success' && 'Registration Successful!'}
          </h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mx-4 md:mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {successMessage && step !== 'success' && (
          <div className="mx-4 md:mx-6 mt-4 p-3 bg-green-50 border border-green-200 rounded flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {step === 'form' && (
            <form onSubmit={handleSendOtp} className="space-y-4 md:space-y-5">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                  placeholder="Enter your designation"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  disabled={loading || !!companyName}
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                  placeholder="Enter company name"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  rows={2}
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed resize-none"
                  placeholder="Enter your address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Enter state"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Enter city"
                  />
                </div>

                {/* Pin Code */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                    Pin Code / Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    maxLength={10}
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Enter pin code"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                  placeholder="Enter email address"
                />
                <p className="text-xs text-slate-500 mt-1">
                  We'll send a verification code to this email.
                </p>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="+91"
                    disabled
                    className="w-14 md:w-16 px-2 md:px-4 py-2 md:py-2.5 bg-slate-100 border border-slate-300 rounded text-slate-900 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className="flex-1 px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>

              <p className="text-xs text-center text-slate-500 mt-4">
                By registering, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  We've sent a verification code to
                </p>
                <p className="text-sm font-medium text-slate-900 mb-4">
                  {formData.email}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Verification Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  disabled={loading}
                  maxLength={6}
                  pattern="[0-9]{6}"
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-center tracking-widest text-lg disabled:bg-slate-100 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full px-4 py-3 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Complete Registration'
                )}
              </button>

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  disabled={loading}
                  className="px-4 py-2.5 text-slate-900 font-medium rounded border border-slate-300 hover:bg-slate-50 transition-colors text-sm md:text-base flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back to Form
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading || resendTimer > 0}
                  className="px-4 py-2.5 text-slate-900 font-medium rounded border border-slate-300 hover:bg-slate-50 transition-colors text-sm md:text-base flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                </button>
              </div>

              <p className="text-xs text-center text-slate-500 mt-4">
                Didn't receive the code? Check your spam folder or try resending.
              </p>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Registration Successful!
              </h3>
              <p className="text-slate-600 mb-6">
                Thank you for registering. A confirmation email has been sent to {formData.email}
              </p>
              <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium text-slate-900 mb-2">Registration Details:</h4>
                <p className="text-sm text-slate-600"><span className="font-medium">Name:</span> {formData.name}</p>
                <p className="text-sm text-slate-600"><span className="font-medium">Company:</span> {formData.company}</p>
                <p className="text-sm text-slate-600"><span className="font-medium">Email:</span> {formData.email}</p>
                <p className="text-sm text-slate-600"><span className="font-medium">Mobile:</span> {formData.mobile}</p>
              </div>
              <p className="text-sm text-slate-500">
                This window will close automatically in 3 seconds...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}