// components/ContactForm.tsx
interface ContactFormProps {
  className?: string;
}

export default function ContactForm({ className = "" }: ContactFormProps) {
  return (
    <form className={`w-full space-y-6 ${className}`}>

      {/* Intro */}
      <p className="text-gray-700 text-base">
        For any enquiries, feel free to reach out to us.
      </p>

      {/* Department */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Which Department Would You Like to Contact? <span className="text-red-500">*</span>
        </label>

        <div className="space-y-2 text-sm">
          {[
            "Sales Team",
            "Marketing Team",
            "Technical / Operations Team",
            "Sponsorship Team",
            "General Exhibition Enquiries",
          ].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="radio" name="department" required />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* First Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Type your first name"
          className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Type your last name"
          className="w-full rounded border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Type your company name"
          className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
        />
      </div>

      {/* Job Title */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="Type your job title"
          className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
        />
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Country of Residence
        </label>
        <select className="w-full rounded border border-gray-300 px-4 py-3 text-sm">
          <option>Select your country</option>
          <option>India</option>
          <option>Russia</option>
          <option>United Kingdom</option>
          <option>United States</option>
        </select>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          required
          className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          placeholder="Type your email"
          className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          Your Message
        </label>
        <textarea
          rows={4}
          className="w-full rounded border border-gray-300 px-4 py-3 text-sm"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="rounded bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Submit
      </button>

      {/* Terms */}
      <p className="text-xs text-gray-600 leading-relaxed">
        By submitting this form, you agree to our{" "}
        <a
          href="https://ite.group/en/privacy/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:underline"
        >
          Privacy Policy
        </a>.
      </p>
    </form>
  );
}
