// components/PostShowReportForm.tsx
export default function PostShowReportForm() {
  return (
    <form className="w-full rounded-2xl border border-black/80 bg-white p-6 lg:p-8 space-y-5">

      {/* Title */}
      <h3 className="text-2xl lg:text-3xl font-semibold text-mainColor1 mb-2">
        Download Post-Show Report
      </h3>

      {/* First Name */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          First Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Type your first name"
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-mainColor1"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Last Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Type your last name"
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Company Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Type your Company Name"
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Company Website<span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          placeholder="Company Website"
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm"
        />
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Job Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Type your Job Title"
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm"
        />
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Country of Residence<span className="text-red-500">*</span>
        </label>
        <select
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm bg-white"
        >
          <option value="">Select</option>
          <option>India</option>
          <option>Russia</option>
          <option>United Kingdom</option>
          <option>United States</option>
        </select>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Phone<span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          placeholder="Type your phone number"
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Work Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Type your email"
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm"
        />
      </div>

      {/* Preferred Stand Size */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          Preferred Stand Size<span className="text-red-500">*</span>
        </label>
        <select
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm bg-white"
        >
          <option value="">Select</option>
          <option>Up to 50 sqm</option>
          <option>50 – 100 sqm</option>
          <option>100+ sqm</option>
        </select>
      </div>

      {/* How did you hear */}
      <div>
        <label className="block text-sm font-semibold mb-1">
          How Did You Hear About Us?<span className="text-red-500">*</span>
        </label>
        <select
          required
          className="w-full rounded border border-gray-400 px-4 py-2 text-sm bg-white"
        >
          <option value="">Select</option>
          <option>Website</option>
          <option>Email</option>
          <option>Social Media</option>
          <option>Partner</option>
        </select>
      </div>

      {/* Product Sector */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Product Sector<span className="text-red-500">*</span>
        </label>

        <div className="space-y-2 text-sm">
          {[
            "Air Freight",
            "Rail Freight",
            "Road Freight Transportation",
            "Warehouse Equipment & Technology SkladTech",
            "Ports & Terminals",
            "E-commerce Logistics",
          ].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="radio" name="sector" required />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 rounded bg-mainColor1 px-6 py-3 text-white font-semibold hover:bg-mainColor1/90 transition"
      >
        Submit
      </button>

      {/* T&C */}
      <p className="text-xs text-gray-700 leading-relaxed">
        T&amp;Cs: By submitting a TransRussia form, you agree to receive marketing
        communications, updates, and promotional materials from us. For more
        information, please refer to our{" "}
        <a
          href="https://ite.group/en/privacy/"
          target="_blank"
          className="font-semibold underline"
        >
          Privacy Policy
        </a>.
      </p>

    </form>
  );
}
