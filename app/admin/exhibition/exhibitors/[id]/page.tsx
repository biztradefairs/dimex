"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Key,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { exhibitorsAPI, Exhibitor } from "@/lib/api/exhibitors";

export default function ExhibitorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [exhibitor, setExhibitor] = useState<Exhibitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    fetchExhibitor();
  }, [id]);

  const fetchExhibitor = async () => {
    try {
      setLoading(true);
      const response = await exhibitorsAPI.getAll();
      const found = response.data.find((e: Exhibitor) => e.id === id);
      if (found) {
        setExhibitor(found);
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

 // In NewExhibitorPage.tsx, ExhibitorDetailsPage.tsx, ExhibitorsPage.tsx
const resendCredentials = async () => {
  try {
    toast.loading('Processing credentials...');
    
    const result = await exhibitorsAPI.resendCredentials(id);
    
    toast.dismiss();
    toast.success(
      <div>
        <p>✅ Credentials logged to console!</p>
        <p className="text-sm">Check your backend terminal for password</p>
      </div>
    );
    
  } catch (error: any) {
    toast.dismiss();
    toast.error(error.message || 'Failed to process');
  }
};

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
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

  if (!exhibitor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/exhibition/exhibitors")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Exhibitors
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {exhibitor.company}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(exhibitor.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      exhibitor.status
                    )}`}
                  >
                    {exhibitor.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Joined {new Date(exhibitor.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resendCredentials}
                disabled={resending}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${resending ? 'animate-spin' : ''}`} />
                {resending ? "Sending..." : "Resend Email"}
              </button>
              <button
                onClick={() =>
                  router.push(`/admin/exhibition/exhibitors/${exhibitor.id}/edit`)
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Edit className="h-4 w-4" />
                Edit Exhibitor
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-medium">Contact Person</span>
                    </div>
                    <p className="text-lg font-medium">{exhibitor.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm font-medium">Email Address</span>
                    </div>
                    <p className="text-lg font-medium">{exhibitor.email}</p>
                  </div>

                  {exhibitor.phone && (
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm font-medium">Phone Number</span>
                      </div>
                      <p className="text-lg font-medium">{exhibitor.phone}</p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Building className="h-4 w-4" />
                      <span className="text-sm font-medium">Company</span>
                    </div>
                    <p className="text-lg font-medium">{exhibitor.company}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exhibition Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
                Exhibition Details
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">Booth Number</span>
                    </div>
                    <p className="text-lg font-medium">
                      {exhibitor.booth || "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Building className="h-4 w-4" />
                      <span className="text-sm font-medium">Sector</span>
                    </div>
                    <p className="text-lg font-medium">
                      {exhibitor.sector || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Password Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
                Account Credentials
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Login Email</span>
                  </div>
                  <p className="font-medium">{exhibitor.email}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Key className="h-4 w-4" />
                    <span className="text-sm font-medium">Password</span>
                  </div>
                  {exhibitor.originalPassword ? (
                    <div className="space-y-3">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="font-mono text-lg text-center">
                          {exhibitor.originalPassword}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(exhibitor.originalPassword!);
                          toast.success("Password copied to clipboard");
                        }}
                        className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Copy Password
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No password available</p>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    Share these credentials securely with the exhibitor
                  </p>
                  <button
                    onClick={() => {
                      const message = `Exhibitor Login Credentials:\n\nEmail: ${exhibitor.email}\nPassword: ${exhibitor.originalPassword}\n\nLogin URL: ${window.location.origin}/login`;
                      navigator.clipboard.writeText(message);
                      toast.success("Credentials copied to clipboard");
                    }}
                    className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
                  >
                    Copy All Credentials
                  </button>
                </div>
              </div>
            </div>

            {/* Email Status Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 pb-4 border-b">
                Email Status
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Welcome Email</p>
                      <p className="text-sm text-gray-500">
                        Sent to {exhibitor.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-green-600">Sent</span>
                  </div>
                </div>
                
                <button
                  onClick={resendCredentials}
                  disabled={resending}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${resending ? 'animate-spin' : ''}`} />
                  {resending ? "Resending..." : "Resend Credentials Email"}
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  Click to resend login credentials to exhibitor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}