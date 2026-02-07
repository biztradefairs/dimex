'use client'

import React from "react"
import { useState } from 'react'
import { X } from 'lucide-react'

interface VisitorRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
  companyName?: string
}

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'DR Congo',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Guatemala',
  'Guinea',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Republic of the Congo',
  'Romania',
  'Russia',
  'Rwanda',
  'Samoa',
  'San Marino',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]

export default function VisitorRegistrationForm({
  isOpen,
  onClose,
  companyName,
}: VisitorRegistrationFormProps) {
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    userType: 'visitor',
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
  const [otpSent, setOtpSent] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate sending OTP to email
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOtpSent(true)
      setStep('otp')
    } catch (error) {
      console.error('Error sending OTP:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Registration successful
      console.log('[v0] Registration successful:', formData)
      onClose()
      setStep('form')
      setFormData({
        userType: 'visitor',
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
    } catch (error) {
      console.error('Error verifying OTP:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6 md:py-0">
      <div className="bg-white rounded-lg w-full max-w-lg md:max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-200 bg-white gap-2 sticky top-0 z-10">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">
            {step === 'form' ? 'Visitor Registration Form' : 'Email Verification'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              
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
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
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
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
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
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1 md:mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
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
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none cursor-pointer"
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
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
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
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
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
                    className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
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
                  className="w-full px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Enter email address"
                />
                <p className="text-xs text-slate-500 mt-1">
                  We'll send your registration confirmation and updates to this email.
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
                    maxLength={10}
                    className="flex-1 px-3 py-2 md:px-4 md:py-2.5 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <p className="text-sm text-slate-600 mb-4">
                  We've sent a verification code to <strong>{formData.email}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Verification Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-center tracking-widest"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-900 text-white font-medium rounded hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
              >
                {loading ? 'Verifying...' : 'Verify & Complete Registration'}
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full px-4 py-2.5 text-slate-900 font-medium rounded border border-slate-300 hover:bg-slate-50 transition-colors text-sm md:text-base"
              >
                Back to Form
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}