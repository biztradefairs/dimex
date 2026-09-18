'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { dashboardAPI } from '@/lib/api/exhibitors';
import { formatINR, type ApplicationFormData } from '@/lib/applicationForm';
import ApplicationFormPreview from '@/components/application-form/ApplicationFormPreview';

export default function ExhibitorApplicationFormPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<ApplicationFormData | null>(null);

  const load = () => {
    dashboardAPI
      .getApplicationForm()
      .then((data) => {
        setSent(Boolean(data?.sent));
        setForm(data?.form || null);
      })
      .catch((error) => toast.error(error.message || 'Failed to load application form'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const downloadPdf = async () => {
    try {
      await dashboardAPI.downloadApplicationPdf(
        `DIEMEX-Application-Form-${form?.companyName || 'exhibitor'}.pdf`
      );
      toast.success('PDF downloaded. Sign it and upload below.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to download PDF');
    }
  };

  const onFile = async (file?: File) => {
    if (!file) return;
    const allowed = /(\.pdf|\.doc|\.docx)$/i.test(file.name);
    if (!allowed) {
      toast.error('Please upload a PDF or Word document');
      return;
    }
    setUploading(true);
    try {
      const updated = await dashboardAPI.uploadSignedApplication(file);
      setForm(updated);
      toast.success('Signed form uploaded');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="mt-3 text-gray-600">Loading application form...</p>
      </div>
    );
  }

  if (!sent || !form) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Application Form</h1>
        <p className="mt-2 text-gray-600">
          The organiser has not sent your application form yet. It will appear here once it is ready to download, sign, and upload.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Application Form</h1>
        <p className="mt-1 text-sm text-gray-500">
          Download the PDF, add your signature, then upload the signed PDF or Word document.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total payable</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{formatINR(form.totals?.totalPayable || 0)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Advance 30%</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{formatINR(form.totals?.advance || 0)}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Balance</p>
          <p className="mt-2 text-2xl font-bold text-blue-700">{formatINR(form.totals?.balance || 0)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-gray-900">1. Download the form</p>
          <p className="text-sm text-gray-500">Includes company details, charges, and rules and regulations.</p>
        </div>
        <button
          type="button"
          onClick={downloadPdf}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
          Download PDF
        </button>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <p className="font-medium text-gray-900">2. Upload signed PDF or Word file</p>
        <p className="mt-1 text-sm text-gray-500">Accepted: .pdf, .doc, .docx</p>
        {form.signedUpload && (
          <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
            Uploaded: {form.signedUpload.fileName}
            {form.signedUpload.uploadedAt
              ? ` · ${new Date(form.signedUpload.uploadedAt).toLocaleString('en-IN')}`
              : ''}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            {uploading ? 'Uploading...' : form.signedUpload ? 'Replace file' : 'Upload signed form'}
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
          <DocumentTextIcon className="h-5 w-5 text-blue-600" />
          Form preview
        </h2>
        <ApplicationFormPreview form={form} />
      </div>
    </div>
  );
}
