"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Building, User, Mail, Phone, MapPin, Key, AlertCircle, Ruler } from "lucide-react";
import toast from "react-hot-toast";
import { exhibitorsAPI, CreateExhibitorData } from "@/lib/api/exhibitors";

// Update the interface to include booth size
interface ExtendedCreateExhibitorData extends CreateExhibitorData {
  boothSize?: string;
  boothType?: string;
  boothDimensions?: string;
  boothNotes?: string;
}

export default function NewExhibitorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ExtendedCreateExhibitorData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "",
    boothNumber: "",
    boothSize: "",
    boothType: "standard",
    boothDimensions: "",
    boothNotes: "",
    password: "",
    status: "active",
  });
  const [emailStatus, setEmailStatus] = useState<{
    sent: boolean;
    recipient: string;
    password: string;
  } | null>(null);

  const sectors = [
    "Rail Transport",
    "Maritime Logistics",
    "Air Cargo",
    "Warehouse Solutions",
    "Technology & Software",
    "Cold Chain Logistics",
    "Logistics Services",
    "Transport",
    "Shipping",
    "Supply Chain",
    "Other",
  ];

  const boothTypes = [
    { value: "standard", label: "Standard Booth (3x3m)" },
    { value: "double", label: "Double Booth (6x3m)" },
    { value: "corner", label: "Corner Booth" },
    { value: "island", label: "Island Booth" },
    { value: "custom", label: "Custom Size" },
  ];

  const boothSizes = [
    "3x3 m (9 sqm)",
    "6x3 m (18 sqm)",
    "6x6 m (36 sqm)",
    "9x6 m (54 sqm)",
    "12x6 m (72 sqm)",
    "Custom",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.company || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    setEmailStatus(null);

    try {
      // Prepare data for API
      const apiData = {
        ...formData,
        // Ensure booth size is included
        boothSize: formData.boothSize,
        boothType: formData.boothType,
        boothDimensions: formData.boothDimensions,
        boothNotes: formData.boothNotes,
      };
      
      const result = await exhibitorsAPI.create(apiData);
      
      // Store email status for display
      setEmailStatus({
        sent: true,
        recipient: result.email,
        password: result.originalPassword || formData.password,
      });
      
      // Show success toast with booth info
      toast.success(
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Building className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Exhibitor Created Successfully!</h3>
              <p className="text-sm text-gray-600">Email with credentials has been sent</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-green-800 mb-1">Email</p>
                  <p className="font-medium">{result.email}</p>
                </div>
                <div>
                  <p className="text-sm text-green-800 mb-1">Password</p>
                  <p className="font-mono font-bold">{result.originalPassword || formData.password}</p>
                </div>
                {formData.boothSize && (
                  <div>
                    <p className="text-sm text-green-800 mb-1">Booth Size</p>
                    <p className="font-medium">{formData.boothSize}</p>
                  </div>
                )}
                {formData.boothNumber && (
                  <div>
                    <p className="text-sm text-green-800 mb-1">Booth Number</p>
                    <p className="font-medium">{formData.boothNumber}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Important:</p>
                <p className="text-sm text-blue-800">
                  Credentials have been emailed to {result.email}. Save this password and share it securely.
                </p>
              </div>
            </div>
          </div>
        </div>,
        { 
          duration: 8000,
          position: 'top-center'
        }
      );
      
      // Wait 3 seconds before redirecting
      setTimeout(() => {
        router.push("/admin/exhibition/exhibitors");
      }, 3000);
      
    } catch (error: any) {
      toast.error(error.message || "Failed to create exhibitor");
    } finally {
      setLoading(false);
    }
  };

  const copyAllCredentials = () => {
    const message = `Exhibitor Login Credentials:\n\nEmail: ${formData.email}\nPassword: ${formData.password}\nCompany: ${formData.company}\nContact: ${formData.name}\nBooth Number: ${formData.boothNumber || 'N/A'}\nBooth Size: ${formData.boothSize || 'N/A'}\n\nLogin URL: ${window.location.origin}/login`;
    navigator.clipboard.writeText(message);
    toast.success("Credentials copied to clipboard");
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create New Exhibitor
              </h1>
              <p className="text-gray-600">
                Add a new exhibitor account to the exhibition
              </p>
            </div>
          </div>
          
          {/* Email Status Banner */}
          {emailStatus && (
            <div className={`mb-4 p-4 rounded-lg border ${
              emailStatus.sent 
                ? 'bg-green-50 border-green-200' 
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {emailStatus.sent ? (
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {emailStatus.sent 
                        ? 'Email sent successfully!' 
                        : 'Email sending...'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Credentials sent to {emailStatus.recipient}
                    </p>
                  </div>
                </div>
                <button
                  onClick={copyAllCredentials}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  Copy Credentials
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Password Information</p>
                <p className="text-sm text-blue-700">
                  The password will be emailed to the exhibitor. Make sure to save it!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company Name *
                  </div>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter company name"
                />
              </div>

              {/* Sector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector *
                </label>
                <select
                  name="sector"
                  required
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select a sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contact Person *
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="email@company.com"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Credentials will be sent to this email
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </div>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Exhibition Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
              Exhibition Details & Booth Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Booth Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Booth Number *
                  </div>
                </label>
                <input
                  type="text"
                  name="boothNumber"
                  required
                  value={formData.boothNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="A-101"
                />
              </div>

              {/* Booth Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Booth Type
                  </div>
                </label>
                <select
                  name="boothType"
                  value={formData.boothType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  {boothTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Booth Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Booth Size
                  </div>
                </label>
                <select
                  name="boothSize"
                  value={formData.boothSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select booth size</option>
                  {boothSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Booth Dimensions (if custom) */}
              {formData.boothSize === "Custom" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Dimensions
                  </label>
                  <input
                    type="text"
                    name="boothDimensions"
                    value={formData.boothDimensions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., 4x5 m"
                  />
                </div>
              )}

              {/* Booth Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booth Notes / Special Requirements
                </label>
                <textarea
                  name="boothNotes"
                  value={formData.boothNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Any special requirements for the booth..."
                />
              </div>
            </div>
          </div>

          {/* Credentials Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
              Login Credentials
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Set Password *
                  </div>
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                    placeholder="Enter password for exhibitor"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {formData.password.length} characters
                      </div>
                      <button
                        type="button"
                        onClick={generatePassword}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Generate Strong Password
                      </button>
                    </div>
                    {formData.password.length < 6 && (
                      <p className="text-xs text-red-500">Min 6 characters</p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This password will be emailed to the exhibitor
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || formData.password.length < 6}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating & Sending Email...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Create Exhibitor
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}