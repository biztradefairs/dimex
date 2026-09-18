"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Save,
  X,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Key,
  ArrowLeft,
  Ruler,
} from "lucide-react";
import toast from "react-hot-toast";
import { exhibitorsAPI, Exhibitor, CreateExhibitorData } from "@/lib/api/exhibitors";
import ExhibitorPaymentFields, {
  defaultPaymentFormValue,
  type PaymentFormValue,
} from "@/components/admin/ExhibitorPaymentFields";
import { toDateInputValue } from "@/lib/stallPayment";

// Extend the interface to include booth size fields
interface ExtendedCreateExhibitorData extends CreateExhibitorData {
  boothSize?: string;
  boothType?: string;
  boothOpenSides?: string;
  boothDimensions?: string;
  boothNotes?: string;
}

export default function EditExhibitorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState<ExtendedCreateExhibitorData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "",
    boothNumber: "",
    boothSize: "",
    boothType: "",
    boothOpenSides: "",
    boothDimensions: "",
    boothNotes: "",
    password: "",
    status: "active",
  });
  const [payment, setPayment] = useState<PaymentFormValue>(defaultPaymentFormValue);

  const sectors = [
 "Additive Manufacturing - 3D Printing",
 "CNC Milling / Machining Centre, EDM",
 "Cutting Tools",
 "Heat Treatment",
 "Hot Runner System",
 "Injection Moulding Machine",
 "Inspection and Quality Systems, CMM",
 "Machine Tools & Accessories for Dies and Moulds",
 "Mechanical Presses for Sheet Metal Components",
 "Raw Material Suppliers (Tool Steel)",
 "Texturizing, Polishing & Plating",
 "CAD/CAM/CAE, Simulation",
 "Mould Base",
 "Tool Room - Die Casting Dies & Rubber Moulds",
 "Tool Room - Jig, Fixture and Gauges",
 "Tool Room - Sheet Metal Dies / Sheet metal Components",
  ];

  const boothTypes = [
    { value: "raw-space", label: "Raw Space" },
    { value: "shell-space", label: "Shell Space" },
  ];

  const openSidesOptions = [
    { value: "two-side", label: "2 Side corner booth" },
    { value: "three-side", label: "3 Side corner booth" },
    { value: "island", label: "Island Booth" },
  ];

  const boothSizes = [
    "3x3 m (9 sqm)",
    "4x3 m (12 sqm)",
    "4x5 m (20 sqm)",
    "4x4 m (16 sqm)",
    "4x7 m (28 sqm)",
    "4x8 m (32 sqm)",
    "5x3 m (15 sqm)",
    "6x3 m (18 sqm)",
    "9x3 m (27 sqm)",
    "9x6 m (54 sqm)",
    "6x7 m (42 sqm)",
    "6x8 m (48 sqm)",
    "8x3 m (24 sqm)",
    "8x6 m (48 sqm)",
    "8x5 m (45 sqm)",
    "7x10 m(70 sqm)",
    "7x5 m (35 sqm)",
    "7x7 m (49 sqm)",
    "6x10 m(60 sqm)",
    "Custom",
  ];

  useEffect(() => {
    fetchExhibitor();
  }, [id]);

  const fetchExhibitor = async () => {
    try {
      setLoading(true);
      const response = await exhibitorsAPI.getById(id);
      const exhibitor = response.data;
      
      if (exhibitor) {
        setFormData({
          name: exhibitor.name,
          email: exhibitor.email,
          phone: exhibitor.phone,
          company: exhibitor.company,
          sector: exhibitor.sector,
          boothNumber: exhibitor.booth,
          boothSize: exhibitor.boothSize || "",
          boothType: exhibitor.boothType || "",
          boothOpenSides: exhibitor.boothOpenSides || exhibitor.stallDetails?.openSides || "",
          boothDimensions: exhibitor.boothDimensions || "",
          boothNotes: exhibitor.boothNotes || "",
          password: "", // Don't show existing password for security
          status: exhibitor.status,
        });
        const phases = exhibitor.paymentPhases || exhibitor.stallDetails?.paymentPhases || [];
        setPayment({
          stallCost: String(exhibitor.stallCost ?? exhibitor.stallDetails?.stallCost ?? ""),
          gstPercent: String(exhibitor.gstPercent ?? exhibitor.stallDetails?.gstPercent ?? 18),
          discount: String(exhibitor.discount ?? exhibitor.stallDetails?.discount ?? ""),
          phases: [0, 1, 2].map((index) => ({
            dueDate: toDateInputValue(phases[index]?.dueDate),
            status: (phases[index]?.status as PaymentFormValue["phases"][number]["status"]) || "pending",
          })),
        });
      } else {
        toast.error("Exhibitor not found");
        router.push("/admin/exhibition/exhibitors");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load exhibitor");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Build payload
      const updateData: Partial<ExtendedCreateExhibitorData> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        sector: formData.sector,
        boothNumber: formData.boothNumber,
        boothSize: formData.boothSize,
        boothType: formData.boothType,
        boothOpenSides: formData.boothOpenSides,
        boothDimensions: formData.boothDimensions,
        boothNotes: formData.boothNotes,
        status: formData.status,
        stallCost: payment.stallCost,
        gstPercent: payment.gstPercent || "18",
        discount: payment.discount,
        paymentPhases: payment.phases.map((phase, index) => ({
          phase: index + 1,
          dueDate: phase.dueDate,
          status: phase.status,
        })),
      };

      // Only send password if admin typed a new one
      if (formData.password && formData.password.trim() !== "") {
        updateData.password = formData.password;
      }

      await exhibitorsAPI.update(id, updateData);
      toast.success("Exhibitor updated successfully");
      router.push(`/admin/exhibition/exhibitors/${id}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to update exhibitor");
    } finally {
      setSaving(false);
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exhibitor details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(`/admin/exhibition/exhibitors/${id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Details
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Edit Exhibitor
              </h1>
              <p className="text-gray-600">
                Update exhibitor information, booth details, and credentials
              </p>
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
                />
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

          {/* Booth Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
              Booth Details
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
                  <option value="">Select booth type</option>
                  {boothTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Open Sides */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Open Sides
                  </div>
                </label>
                <select
                  name="boothOpenSides"
                  value={formData.boothOpenSides}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Select open sides</option>
                  {openSidesOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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

          <ExhibitorPaymentFields value={payment} onChange={setPayment} />

          {/* Password Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
              Change Password (Optional)
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    New Password
                  </div>
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono"
                    placeholder="Leave blank to keep current password"
                  />
                  <div className="flex items-center justify-between">
                    {formData.password && (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Only enter a new password if you want to change it
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push(`/admin/exhibition/exhibitors/${id}`)}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}