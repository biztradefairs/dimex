"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Eye, FileText, Save, Send } from "lucide-react";
import toast from "react-hot-toast";
import { applicationFormAPI } from "@/lib/api/exhibitors";
import {
  ADVANCE_PERCENT,
  APPLICATION_GST_PERCENT,
  BARE_RATE,
  SHELL_RATE,
  THREE_SIDE_PERCENT,
  TWO_SIDE_PERCENT,
  calculateApplicationTotals,
  emptyApplicationForm,
  formatINR,
  type ApplicationFormData,
} from "@/lib/applicationForm";
import ApplicationFormPreview from "@/components/application-form/ApplicationFormPreview";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500";

export default function AdminApplicationFormPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [step, setStep] = useState<"form" | "preview">("form");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<ApplicationFormData>(emptyApplicationForm());

  const totals = useMemo(() => calculateApplicationTotals(form), [form]);

  useEffect(() => {
    applicationFormAPI
      .get(id)
      .then((data) => setForm({ ...emptyApplicationForm(), ...data }))
      .catch((error) => toast.error(error.message || "Failed to load form"))
      .finally(() => setLoading(false));
  }, [id]);

  const update = (patch: Partial<ApplicationFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const payload = () => ({ ...form, totals });

  const save = async () => {
    setSaving(true);
    try {
      const saved = await applicationFormAPI.save(id, payload());
      setForm({ ...emptyApplicationForm(), ...saved });
      toast.success("Application form saved");
    } catch (error: any) {
      toast.error(error.message || "Failed to save form");
    } finally {
      setSaving(false);
    }
  };

  const send = async () => {
    if (!form.companyName || !form.email) {
      toast.error("Company name and email are required before sending");
      setStep("form");
      return;
    }
    setSending(true);
    try {
      const sent = await applicationFormAPI.send(id, payload());
      setForm({ ...emptyApplicationForm(), ...sent });
      toast.success("Application form sent to exhibitor");
    } catch (error: any) {
      toast.error(error.message || "Failed to send form");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.push(`/admin/exhibition/exhibitors/${id}`)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to exhibitor
        </button>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Application Form</h1>
            <p className="text-sm text-gray-500">
              {form.status === "sent"
                ? `Sent to exhibitor${form.sentAt ? ` on ${new Date(form.sentAt).toLocaleDateString("en-IN")}` : ""}`
                : "Draft — fill the form, preview, then send to the exhibitor"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStep(step === "form" ? "preview" : "form")}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" />
              {step === "form" ? "Preview" : "Edit form"}
            </button>
            <button
              type="button"
              onClick={() =>
                applicationFormAPI
                  .downloadPdf(id, `DIEMEX-Application-Form-${form.companyName || "exhibitor"}.pdf`)
                  .catch((error) => toast.error(error.message))
              }
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              <FileText className="h-4 w-4" />
              Download PDF
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={send}
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending..." : "Send to exhibitor"}
            </button>
          </div>
        </div>

        {form.signedUpload && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Signed form uploaded: {form.signedUpload.fileName}
            {form.signedUpload.uploadedAt
              ? ` · ${new Date(form.signedUpload.uploadedAt).toLocaleString("en-IN")}`
              : ""}
          </div>
        )}

        {step === "preview" ? (
          <ApplicationFormPreview form={{ ...form, totals }} />
        ) : (
          <div className="space-y-6">
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b pb-3 text-lg font-semibold text-gray-900">
                Company Information
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="GST No">
                  <input className={inputClass} value={form.gstNo} onChange={(e) => update({ gstNo: e.target.value })} />
                </Field>
                <Field label="Name of the Company">
                  <input className={inputClass} value={form.companyName} onChange={(e) => update({ companyName: e.target.value })} />
                </Field>
                <Field label="Contact Person">
                  <input className={inputClass} value={form.contactPerson} onChange={(e) => update({ contactPerson: e.target.value })} />
                </Field>
                <Field label="Designation">
                  <input className={inputClass} value={form.designation} onChange={(e) => update({ designation: e.target.value })} />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Address">
                    <textarea className={inputClass} rows={2} value={form.address} onChange={(e) => update({ address: e.target.value })} />
                  </Field>
                </div>
                <Field label="City">
                  <input className={inputClass} value={form.city} onChange={(e) => update({ city: e.target.value })} />
                </Field>
                <Field label="Pincode">
                  <input className={inputClass} value={form.pincode} onChange={(e) => update({ pincode: e.target.value })} />
                </Field>
                <Field label="State">
                  <input className={inputClass} value={form.state} onChange={(e) => update({ state: e.target.value })} />
                </Field>
                <Field label="Telephone">
                  <input className={inputClass} value={form.telephone} onChange={(e) => update({ telephone: e.target.value })} />
                </Field>
                <Field label="Mobile">
                  <input className={inputClass} value={form.mobile} onChange={(e) => update({ mobile: e.target.value })} />
                </Field>
                <Field label="E-mail Address">
                  <input type="email" className={inputClass} value={form.email} onChange={(e) => update({ email: e.target.value })} />
                </Field>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b pb-3 text-lg font-semibold text-gray-900">
                Participation Expenses
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <label className="flex items-center gap-3 font-medium text-gray-900">
                    <input
                      type="checkbox"
                      checked={form.shellScheme}
                      onChange={(e) => update({ shellScheme: e.target.checked })}
                    />
                    Stall Type – Shell Scheme · ₹{SHELL_RATE.toLocaleString("en-IN")} / SQM
                  </label>
                  {form.shellScheme && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Field label="SQ.M">
                        <input
                          type="number"
                          min="0"
                          className={inputClass}
                          value={form.shellSqm}
                          onChange={(e) => update({ shellSqm: e.target.value })}
                        />
                      </Field>
                      <Field label="Amount ₹">
                        <input className={inputClass} readOnly value={formatINR(totals.shellAmount)} />
                      </Field>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <label className="flex items-center gap-3 font-medium text-gray-900">
                    <input
                      type="checkbox"
                      checked={form.bareSpace}
                      onChange={(e) => update({ bareSpace: e.target.checked })}
                    />
                    Stall Type – Bare Space · ₹{BARE_RATE.toLocaleString("en-IN")} / SQM
                  </label>
                  {form.bareSpace && (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Field label="SQ.M">
                        <input
                          type="number"
                          min="0"
                          className={inputClass}
                          value={form.bareSqm}
                          onChange={(e) => update({ bareSqm: e.target.value })}
                        />
                      </Field>
                      <Field label="Amount ₹">
                        <input className={inputClass} readOnly value={formatINR(totals.bareAmount)} />
                      </Field>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="mb-3 font-medium text-gray-900">Open Side Charges</p>
                  <label className="mb-2 flex items-center justify-between gap-3 text-sm text-gray-800">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.twoSideOpen}
                        onChange={(e) =>
                          update({ twoSideOpen: e.target.checked, threeSideOpen: e.target.checked ? false : form.threeSideOpen })
                        }
                      />
                      2 Side Open @ {TWO_SIDE_PERCENT}% of Space Charges
                    </span>
                    <span>{formatINR(totals.twoSideAmount)}</span>
                  </label>
                  <label className="flex items-center justify-between gap-3 text-sm text-gray-800">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={form.threeSideOpen}
                        onChange={(e) =>
                          update({ threeSideOpen: e.target.checked, twoSideOpen: e.target.checked ? false : form.twoSideOpen })
                        }
                      />
                      3 Side Open @ {THREE_SIDE_PERCENT}% of Space Charges
                    </span>
                    <span>{formatINR(totals.threeSideAmount)}</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="mt-1 text-lg font-semibold">{formatINR(totals.total)}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">GST @ {APPLICATION_GST_PERCENT}%</p>
                    <p className="mt-1 text-lg font-semibold">{formatINR(totals.gstAmount)}</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4 sm:col-span-2">
                    <p className="text-xs text-blue-700">Total Amount Payable</p>
                    <p className="mt-1 text-2xl font-bold text-blue-800">{formatINR(totals.totalPayable)}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">Advance Payment ({ADVANCE_PERCENT}%)</p>
                    <p className="mt-1 text-lg font-semibold">{formatINR(totals.advance)}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-4">
                    <p className="text-xs text-gray-500">Balance Amount Payable</p>
                    <p className="mt-1 text-lg font-semibold">{formatINR(totals.balance)}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 border-b pb-3 text-lg font-semibold text-gray-900">
                Office Use Only
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="Stall No.">
                  <input className={inputClass} value={form.stallNo} onChange={(e) => update({ stallNo: e.target.value })} />
                </Field>
                <Field label="Booked By">
                  <input className={inputClass} value={form.bookedBy} onChange={(e) => update({ bookedBy: e.target.value })} />
                </Field>
                <Field label="Date">
                  <input type="date" className={inputClass} value={form.date} onChange={(e) => update({ date: e.target.value })} />
                </Field>
                <Field label="Place">
                  <input className={inputClass} value={form.place} onChange={(e) => update({ place: e.target.value })} />
                </Field>
                <label className="flex items-center gap-3 text-sm text-gray-800">
                  <input
                    type="checkbox"
                    checked={form.confirmation}
                    onChange={(e) => update({ confirmation: e.target.checked })}
                  />
                  Confirmation / Signature
                </label>
                <label className="flex items-center gap-3 text-sm text-gray-800">
                  <input
                    type="checkbox"
                    checked={form.rubberStamp}
                    onChange={(e) => update({ rubberStamp: e.target.checked })}
                  />
                  Signature with Rubber Stamp
                </label>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
