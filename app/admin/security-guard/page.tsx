// app/admin/security-guard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';

interface SecurityGuardConfig {
  id: string;
  ratePerGuardPerDay: number;
  updatedAt: string;
}

const dummyConfig: SecurityGuardConfig = {
  id: '1',
  ratePerGuardPerDay: 2500,
  updatedAt: '2024-01-01T00:00:00Z'
};

export default function AdminSecurityGuardPage() {
  const [config, setConfig] = useState<SecurityGuardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState(2500);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setConfig(dummyConfig);
      setFormValue(dummyConfig.ratePerGuardPerDay);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    if (config) {
      setConfig({
        ...config,
        ratePerGuardPerDay: formValue,
        updatedAt: new Date().toISOString()
      });
      setEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Security Guard</h1>
          <p className="text-sm text-gray-600 mt-1">Manage security guard rates</p>
        </div>

        {showSuccess && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            Rate updated successfully
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Security Guard Rate</h2>
              <p className="text-sm text-gray-500">Rate per guard per day</p>
            </div>
          </div>

          {!editing ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-blue-600">₹{config?.ratePerGuardPerDay.toLocaleString()}</span>
                <span className="text-sm text-gray-500 ml-2">per guard / day</span>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Rate
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rate per Guard per Day (₹)
                </label>
                <input
                  type="number"
                  value={formValue}
                  onChange={(e) => setFormValue(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg"
                  min="0"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <ScaleIcon className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormValue(config?.ratePerGuardPerDay || 2500);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {config?.updatedAt && (
            <div className="mt-4 pt-4 border-t text-xs text-gray-400">
              Last updated: {new Date(config.updatedAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </>
  );
}