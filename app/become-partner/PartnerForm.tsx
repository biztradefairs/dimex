'use client'

export default function RegistrationForm() {
  return (
    <div className="max-w-3xl mx-auto rounded-2xl bg-[#F4FAFD] p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Registration Form</h2>
      <form className="space-y-6">
        {/* Grid for first two rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
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
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
              placeholder="example@company.com"
            />
          </div>
        </div>

        {/* Mobile Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Phone <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <div className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-3 rounded-l-lg border-r-0">
              <span className="text-gray-700 font-medium">+7</span>
              <img
                src="https://flagcdn.com/w40/ru.png"
                alt="RU"
                className="h-4 w-6 object-cover rounded"
              />
            </div>
            <input
              type="tel"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
              placeholder="900 000 00 00"
            />
          </div>
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
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
              placeholder="Enter company name"
            />
          </div>

          {/* Tax ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax ID
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
              placeholder="Optional"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
              placeholder="https://example.com"
            />
          </div>

          {/* Promo Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promo Code
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-gray-800 placeholder-gray-500"
              placeholder="Enter promo code if any"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-6 pt-4">
          {/* Checkbox 1 */}
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <input 
              type="checkbox" 
              id="marketing" 
              className="mt-1 h-5 w-5 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
            />
            <label htmlFor="marketing" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
              I want to stay informed about exhibitions organized by
              <strong> ITE Expo International LLC</strong>, and be the first to
              receive information about exhibition stand sales, business program
              events, advertising and sponsorship opportunities.
            </label>
          </div>

          {/* Checkbox 2 */}
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <input 
              type="checkbox" 
              id="consent" 
              required
              className="mt-1 h-5 w-5 border-gray-300 rounded focus:ring-blue-500 text-blue-600"
            />
            <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
              I hereby give consent to <strong>ITE Expo International LLC</strong>
              for automated and mixed processing of my personal data in accordance
              with the <a href="#" className="text-blue-600 hover:text-blue-800 underline font-medium">Personal Data Policy</a>.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register Now
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">
            All fields marked with <span className="text-red-500">*</span> are required
          </p>
        </div>
      </form>
    </div>
  )
}