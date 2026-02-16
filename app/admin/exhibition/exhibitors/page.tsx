"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Key,
  Search,
  Building,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { exhibitorsAPI, Exhibitor, ExhibitorStatus } from "@/lib/api/exhibitors";

export default function ExhibitorsPage() {
  const router = useRouter();
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  useEffect(() => {
    fetchExhibitors();
  }, []);

  const fetchExhibitors = async () => {
    try {
      setLoading(true);
      const response = await exhibitorsAPI.getAll();
      setExhibitors(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load exhibitors");
    } finally {
      setLoading(false);
    }
  };

  const deleteExhibitor = async (id: string, email: string) => {
    if (!confirm(`Delete exhibitor ${email}? This cannot be undone.`)) return;
    
    try {
      setDeletingId(id);
      await exhibitorsAPI.delete(id);
      toast.success("Exhibitor deleted successfully");
      fetchExhibitors();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete exhibitor");
    } finally {
      setDeletingId(null);
    }
  };

  const resendCredentials = async (id: string, email: string) => {
    if (!confirm(`Resend credentials to ${email}?`)) return;
    
    try {
      setResendingId(id);
      toast.loading("Resending credentials...");
      
      await exhibitorsAPI.resendCredentials(id);
      
      toast.dismiss();
      toast.success(`Credentials resent to ${email}`);
      
      // Refresh the list
      fetchExhibitors();
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message || "Failed to resend credentials");
    } finally {
      setResendingId(null);
    }
  };

  const showPassword = (exhibitor: Exhibitor) => {
    if (exhibitor.originalPassword) {
      toast.success(
        <div className="p-4">
          <h3 className="font-semibold mb-2">Password for {exhibitor.email}</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 font-mono text-lg">
            {exhibitor.originalPassword}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share this password securely with the exhibitor
          </p>
        </div>,
        { duration: 8000 }
      );
    } else {
      toast.error("No password available for this exhibitor");
    }
  };

  // ✅ FIXED: Type-safe status update function
  const updateStatus = async (id: string, status: ExhibitorStatus) => {
    try {
      await exhibitorsAPI.update(id, { status });
      toast.success(`Status updated to ${status}`);
      fetchExhibitors();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  // ✅ FIXED: Helper function to safely handle status button clicks
  const handleStatusClick = (id: string, status: string) => {
    // Validate that the status is a valid ExhibitorStatus
    const validStatuses: ExhibitorStatus[] = ["active", "pending", "inactive", "approved", "rejected"];
    
    if (validStatuses.includes(status as ExhibitorStatus)) {
      updateStatus(id, status as ExhibitorStatus);
    } else {
      toast.error(`Invalid status: ${status}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
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

  const filteredExhibitors = exhibitors.filter(
    (exhibitor) =>
      exhibitor.company.toLowerCase().includes(search.toLowerCase()) ||
      exhibitor.email.toLowerCase().includes(search.toLowerCase()) ||
      exhibitor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exhibitors</h1>
          <p className="text-gray-600 mt-2">
            Manage {exhibitors.length} exhibitors in the exhibition
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/exhibition/exhibitors/new")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Exhibitor
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search exhibitors by name, company, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Exhibitors Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading exhibitors...</span>
          </div>
        ) : filteredExhibitors.length === 0 ? (
          <div className="text-center py-16">
            <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No exhibitors found
            </h3>
            <p className="text-gray-600 mb-6">
              {search
                ? "Try adjusting your search criteria"
                : "Get started by adding your first exhibitor"}
            </p>
            {!search && (
              <button
                onClick={() => router.push("/admin/exhibition/exhibitors/new")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add First Exhibitor
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Company & Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Password
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExhibitors.map((exhibitor) => (
                  <tr key={exhibitor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {exhibitor.company}
                          </div>
                          <div className="text-sm text-gray-500">
                            {exhibitor.name}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {exhibitor.email}
                            </span>
                          </div>
                          {exhibitor.phone && (
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {exhibitor.phone}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-600">Sector:</span>
                          <span className="ml-2 font-medium">
                            {exhibitor.sector || "Not specified"}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Booth:</span>
                          <span className="ml-2 font-medium">
                            {exhibitor.booth || "Not assigned"}
                          </span>
                        </div>
                        {exhibitor.boothSize && (
                          <div>
                            <span className="text-sm text-gray-600">Booth Size:</span>
                            <span className="ml-2 font-medium">
                              {exhibitor.boothSize}
                            </span>
                          </div>
                        )}
                        <div className="text-sm text-gray-500">
                          Joined {new Date(exhibitor.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(exhibitor.status)}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            exhibitor.status
                          )}`}
                        >
                          {exhibitor.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleStatusClick(exhibitor.id, "active")}
                          className="text-xs text-green-600 hover:text-green-800"
                        >
                          Active
                        </button>
                        <button
                          onClick={() => handleStatusClick(exhibitor.id, "pending")}
                          className="text-xs text-yellow-600 hover:text-yellow-800"
                        >
                          Pending
                        </button>
                        <button
                          onClick={() => handleStatusClick(exhibitor.id, "inactive")}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          Inactive
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => showPassword(exhibitor)}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Key className="h-4 w-4" />
                        <span className="text-sm">Show Password</span>
                      </button>
                      {exhibitor.originalPassword && (
                        <div className="mt-2 text-xs text-gray-500">
                          Password available
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => resendCredentials(exhibitor.id, exhibitor.email)}
                        disabled={resendingId === exhibitor.id}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                      >
                        {resendingId === exhibitor.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        <span className="text-sm">Resend Email</span>
                      </button>
                      <div className="mt-2 text-xs text-gray-500">
                        Send credentials to exhibitor
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            router.push(`/admin/exhibition/exhibitors/${exhibitor.id}`)
                          }
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/exhibition/exhibitors/${exhibitor.id}/edit`
                            )
                          }
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteExhibitor(exhibitor.id, exhibitor.email)}
                          disabled={deletingId === exhibitor.id}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === exhibitor.id ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}