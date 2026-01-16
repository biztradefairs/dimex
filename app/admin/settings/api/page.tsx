// app/admin/settings/api/page.tsx
"use client";

import { useState } from 'react';
import { Key, Plus, Eye, EyeOff, Copy, Trash2, Calendar, Shield } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  created: string;
  lastUsed: string;
  status: 'active' | 'inactive' | 'expired';
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Web Application',
      key: 'sk_live_**********abc123',
      permissions: ['read:exhibitors', 'write:exhibitors', 'read:articles'],
      created: '2024-01-01',
      lastUsed: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mobile App',
      key: 'sk_live_**********def456',
      permissions: ['read:exhibitors', 'read:articles'],
      created: '2024-01-05',
      lastUsed: '2024-01-14',
      status: 'active'
    },
    {
      id: '3',
      name: 'Integration Service',
      key: 'sk_live_**********ghi789',
      permissions: ['read:exhibitors', 'write:exhibitors', 'read:articles', 'write:articles'],
      created: '2024-01-10',
      lastUsed: '2024-01-13',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Analytics Dashboard',
      key: 'sk_test_**********jkl012',
      permissions: ['read:analytics'],
      created: '2023-12-15',
      lastUsed: '2024-01-10',
      status: 'expired'
    }
  ]);

  const [showKeys, setShowKeys] = useState<Set<string>>(new Set());
  const [isCreating, setIsCreating] = useState(false);
  const [newKey, setNewKey] = useState({
    name: '',
    permissions: [] as string[]
  });

  const availablePermissions = [
    'read:exhibitors',
    'write:exhibitors',
    'read:articles',
    'write:articles',
    'read:users',
    'write:users',
    'read:analytics',
    'read:payments',
    'write:payments'
  ];

  const toggleKeyVisibility = (id: string) => {
    const newShowKeys = new Set(showKeys);
    if (newShowKeys.has(id)) {
      newShowKeys.delete(id);
    } else {
      newShowKeys.add(id);
    }
    setShowKeys(newShowKeys);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('API key copied to clipboard!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const handleCreateKey = () => {
    if (!newKey.name.trim()) {
      alert('Please enter a name for the API key');
      return;
    }

    const generatedKey = `sk_live_${Math.random().toString(36).substr(2, 24)}`;
    const newApiKey: ApiKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKey.name,
      key: generatedKey,
      permissions: newKey.permissions,
      created: new Date().toISOString().split('T')[0],
      lastUsed: '-',
      status: 'active'
    };

    setApiKeys([...apiKeys, newApiKey]);
    setNewKey({ name: '', permissions: [] });
    setIsCreating(false);
    
    // Show the key to the user
    setShowKeys(prev => new Set([...prev, newApiKey.id]));
    alert(`API key created successfully!\n\nKey: ${generatedKey}\n\nMake sure to copy it now as it won't be shown again.`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys Management</h1>
          <p className="text-gray-600">Manage API keys for integration and services</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Generate New Key
        </button>
      </div>

      {/* Create Key Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generate New API Key</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Key Name *
                </label>
                <input
                  type="text"
                  value={newKey.name}
                  onChange={(e) => setNewKey({...newKey, name: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Production Server"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newKey.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKey({
                              ...newKey,
                              permissions: [...newKey.permissions, permission]
                            });
                          } else {
                            setNewKey({
                              ...newKey,
                              permissions: newKey.permissions.filter(p => p !== permission)
                            });
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKey}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Generate Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <Shield className="h-5 w-5 text-yellow-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>API keys provide full access to your exhibition data. Keep them secure and:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Never share API keys in public repositories or client-side code</li>
                <li>Rotate keys regularly, especially if compromised</li>
                <li>Use the principle of least privilege when assigning permissions</li>
                <li>Monitor key usage and revoke unused keys</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  API Key
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Key className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{apiKey.name}</div>
                        <div className="text-xs text-gray-500">
                          Created: {new Date(apiKey.created).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {showKeys.has(apiKey.id) ? apiKey.key : '•'.repeat(apiKey.key.length)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        title={showKeys.has(apiKey.id) ? 'Hide' : 'Show'}
                      >
                        {showKeys.has(apiKey.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        title="Copy"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.slice(0, 3).map((permission) => (
                        <span key={permission} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {permission}
                        </span>
                      ))}
                      {apiKey.permissions.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                          +{apiKey.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(apiKey.status)}`}>
                      {apiKey.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {apiKey.lastUsed === '-' ? 'Never' : new Date(apiKey.lastUsed).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">Last used</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => alert(`Revoke ${apiKey.name}`)}
                        className="text-red-600 hover:text-red-900"
                        title="Revoke"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-blue-100">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Active Keys</p>
              <p className="text-2xl font-semibold text-gray-900">
                {apiKeys.filter(k => k.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-green-100">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Keys Created This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                {apiKeys.filter(k => {
                  const created = new Date(k.created);
                  const now = new Date();
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md p-3 bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Unique Permissions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Array.from(new Set(apiKeys.flatMap(k => k.permissions))).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}