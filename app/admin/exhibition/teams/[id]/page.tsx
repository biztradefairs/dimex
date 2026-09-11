"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building, Mail, MapPin, Phone, Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchExhibitorTeamDetail,
  type ExhibitorTeamDetail,
} from "@/lib/api/exhibitorTeam";

export default function ExhibitorTeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const exhibitorId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ExhibitorTeamDetail | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchExhibitorTeamDetail(exhibitorId);
        setData(result);
      } catch (error: any) {
        if (error.message === "unauthorized") {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitor team");
      } finally {
        setLoading(false);
      }
    };

    if (exhibitorId) load();
  }, [exhibitorId, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">Loading exhibitor team...</span>
      </div>
    );
  }

  if (!data) return null;

  const companyName = data.team?.companyName || data.exhibitor.company;
  const city = data.team?.city || "";
  const members = data.team?.members || [];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => router.push("/admin/exhibition/teams")}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Exhibitors Team
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center">
            <Building className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
            <p className="text-gray-600 mt-1">{data.exhibitor.name}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {data.exhibitor.email}
              </span>
              {data.exhibitor.phone ? (
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {data.exhibitor.phone}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Company name</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">{companyName}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500">City</p>
          <p className="text-lg font-semibold text-gray-900 mt-1 inline-flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-400" />
            {city || "Not submitted"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Team details
          </h2>
        </div>

        {members.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium">This exhibitor has not submitted a team yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Designation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member, index) => (
                  <tr key={member.id || `${member.name}-${index}`}>
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{member.designation}</td>
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
