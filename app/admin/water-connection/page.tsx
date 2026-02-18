// app/admin/water-connection/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  PencilIcon,
  XMarkIcon,
  CheckCircleIcon,
  
  ScaleIcon
} from '@heroicons/react/24/outline';
// import AdminShell from '@/app/admin/AdminShell';
import { DropletIcon } from 'lucide-react';

interface WaterConnectionConfig {
  id: string;
  costPerConnection: number;
  updatedAt: string;
}

const dummyConfig: WaterConnectionConfig = {
  id: '1',
  costPerConnection: 15000,
  updatedAt: '2024-01-01T00:00:00Z'
};

export default function AdminWaterConnectionPage() {
  const [config, setConfig] = useState<WaterConnectionConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState(15000);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setConfig(dummyConfig);
      setFormValue(dummyConfig.costPerConnection);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    if (config) {
      setConfig({
        ...config,
        costPerConnection: formValue,
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
          <h1 className="text-2xl font-bold text-gray-900">Water Connection</h1>
          <p className="text-sm text-gray-600 mt-1">Manage water connection pricing</p>
        </div>

        {showSuccess && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
            <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
            Configuration updated successfully
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DropletIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Water Connection Rate</h2>
              <p className="text-sm text-gray-500">Cost per water connection</p>
            </div>
          </div>

          {!editing ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-blue-600">₹{config?.costPerConnection.toLocaleString()}</span>
                <span className="text-sm text-gray-500 ml-2">per connection</span>
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
                  Cost per Connection (₹)
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
                    setFormValue(config?.costPerConnection || 15000);
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