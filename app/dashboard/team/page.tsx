"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  UserGroupIcon,
  PlusIcon,
  TrashIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import { INDIA_CITIES } from "@/lib/indiaCities";
import { fetchMyTeam, submitMyTeam, type TeamMember } from "@/lib/api/exhibitorTeam";

type MemberDraft = TeamMember & { key: string };

function newMember(): MemberDraft {
  return {
    key: `member-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    designation: "",
  };
}

export default function TeamMembersPage() {
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [members, setMembers] = useState<MemberDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const cityBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const team = await fetchMyTeam();
        setCompanyName(team.companyName || "");
        setCity(team.city || "");
        setCityQuery(team.city || "");
        setSubmittedAt(team.submittedAt || null);
        setMembers(
          (team.members || []).map((member, index) => ({
            key: member.id || `saved-${index}`,
            name: member.name,
            designation: member.designation,
          }))
        );
      } catch (error: any) {
        if (error.message === "unauthorized") {
          window.location.href = "/login";
          return;
        }
        toast.error(error.message || "Failed to load team members");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (cityBoxRef.current && !cityBoxRef.current.contains(event.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return INDIA_CITIES;
    return INDIA_CITIES.filter((item) => item.toLowerCase().includes(q));
  }, [cityQuery]);

  const addTeammate = () => {
    setMembers((prev) => [...prev, newMember()]);
  };

  const removeTeammate = (key: string) => {
    setMembers((prev) => prev.filter((member) => member.key !== key));
  };

  const updateTeammate = (key: string, field: "name" | "designation", value: string) => {
    setMembers((prev) =>
      prev.map((member) => (member.key === key ? { ...member, [field]: value } : member))
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const cleanedMembers = members
      .map((member) => ({
        name: member.name.trim(),
        designation: member.designation.trim(),
      }))
      .filter((member) => member.name && member.designation);

    const selectedCity =
      city.trim() ||
      INDIA_CITIES.find(
        (item) => item.toLowerCase() === cityQuery.trim().toLowerCase()
      ) ||
      "";

    if (!companyName.trim()) {
      toast.error("Enter company name");
      return;
    }
    if (!selectedCity) {
      toast.error("Select a city");
      return;
    }
    if (!cleanedMembers.length) {
      toast.error("Add at least one team member");
      return;
    }

    try {
      setSubmitting(true);
      const saved = await submitMyTeam({
        companyName: companyName.trim(),
        city: selectedCity,
        members: cleanedMembers,
      });
      setCity(selectedCity);
      setCityQuery(selectedCity);
      setSubmittedAt(saved.submittedAt || new Date().toISOString());
      setMembers(
        (saved.members || cleanedMembers).map((member, index) => ({
          key: member.id || `saved-${index}`,
          name: member.name,
          designation: member.designation,
        }))
      );
      toast.success("Team members submitted successfully");
    } catch (error: any) {
      if (error.message === "unauthorized") {
        window.location.href = "/login";
        return;
      }
      toast.error(error.message || "Failed to submit team members");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <p className="text-sm text-gray-600 mt-1">
          Add your company details and the teammates attending the exhibition.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <BuildingOffice2Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div ref={cityBoxRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              India Cities
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setCity("");
                  setCityOpen(true);
                }}
                onFocus={() => setCityOpen(true)}
                placeholder="Select city"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                autoComplete="off"
                required={!city}
              />
            </div>
            {cityOpen && (
              <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {filteredCities.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-500">No cities found</p>
                ) : (
                  filteredCities.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => {
                        setCity(item);
                        setCityQuery(item);
                        setCityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                        city === item ? "bg-blue-50 text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Team mates</h2>
              <p className="text-sm text-gray-500">Add name and designation for each person.</p>
            </div>
            <button
              type="button"
              onClick={addTeammate}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              <PlusIcon className="h-4 w-4" />
              Add Team mate
            </button>
          </div>

          {members.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-gray-300 rounded-lg">
              <UserGroupIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">No team members yet. Click Add Team mate.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member, index) => (
                <div
                  key={member.key}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-lg border border-gray-200 p-4"
                >
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Name {index + 1}
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateTeammate(member.key, "name", e.target.value)}
                      placeholder="Team member name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      required
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={member.designation}
                      onChange={(e) => updateTeammate(member.key, "designation", e.target.value)}
                      placeholder="e.g. Sales Manager"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="button"
                      onClick={() => removeTeammate(member.key)}
                      className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {submittedAt ? (
            <p className="text-sm text-green-700 inline-flex items-center gap-1">
              <CheckCircleIcon className="h-4 w-4" />
              Last submitted {new Date(submittedAt).toLocaleString()}
            </p>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit team members"}
          </button>
        </div>
      </form>
    </div>
  );
}
