'use client';

import { useState, useEffect } from 'react';
import { 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon,
  CameraIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define types locally if not in @/types
interface ExhibitorProfile {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  industry: string;
  description: string;
  status: string;
  boothNumber?: string;
}

export default function EnhancedProfilePage() {
  const [profile, setProfile] = useState<ExhibitorProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<ExhibitorProfile>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Function to get token - UPDATED to look for 'exhibitor_token'
  const getAuthToken = () => {
    console.log('🔍 Checking for token in localStorage...');
    
    // First, check for 'exhibitor_token' (what your login component saves)
    const exhibitorToken = localStorage.getItem('exhibitor_token');
    if (exhibitorToken) {
      console.log('✅ Found token in localStorage with key: exhibitor_token');
      return exhibitorToken;
    }
    
    // Also check for 'token' (backward compatibility)
    const token = localStorage.getItem('token');
    if (token) {
      console.log('✅ Found token in localStorage with key: token');
      return token;
    }
    
    // Check for exhibitor data
    const exhibitorData = localStorage.getItem('exhibitor_data');
    if (exhibitorData) {
      console.log('ℹ️ Found exhibitor_data in localStorage');
    }
    
    console.log('❌ No token found in localStorage');
    return null;
  };

  // Function to check if we're logged in
  const checkAuth = () => {
    const token = getAuthToken();
    const exhibitorData = localStorage.getItem('exhibitor_data');
    
    console.log('🔐 Auth check:', { 
      hasToken: !!token, 
      hasExhibitorData: !!exhibitorData,
      localStorageKeys: Object.keys(localStorage)
    });
    
    return !!token;
  };

  useEffect(() => {
    console.log('🚀 Profile page mounted');
    
    // Check auth on mount
    if (!checkAuth()) {
      setError('Please log in to access your profile');
      setLoading(false);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }
    
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = getAuthToken();
      
      if (!token) {
        setError('Please log in to access your profile');
        setLoading(false);
        router.push('/login');
        return;
      }
      
      console.log('📡 Fetching profile with token (first 20 chars):', token.substring(0, 20) + '...');
      
const response = await axios.get('https://diemex-backend.onrender.com/api/exhibitorDashboard/profile', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      
      if (response.data.success) {
        const exhibitorData = response.data.data;
        
        console.log('✅ Profile data received:', exhibitorData);
        
        // Map the data to your profile structure
        const profileData: ExhibitorProfile = {
          id: exhibitorData.id || '',
          companyName: exhibitorData.company || '',
          contactPerson: exhibitorData.name || '',
          email: exhibitorData.email || '',
          phone: exhibitorData.phone || '',
          address: exhibitorData.address || '',
          website: exhibitorData.website || '',
          industry: exhibitorData.sector || '',
          description: exhibitorData.description || '',
          status: exhibitorData.status || 'active',
          boothNumber: exhibitorData.boothNumber || '',
        };
        
        setProfile(profileData);
        setEditedProfile(profileData);
      } else {
        throw new Error(response.data.error || 'Failed to fetch profile');
      }
    } catch (error: any) {
      console.error('❌ Error fetching profile:', error);
      
      // Check if it's an authentication error
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Your session has expired. Please log in again.');
        
        // Clear all tokens
        localStorage.removeItem('exhibitor_token');
        localStorage.removeItem('exhibitor_data');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error.response?.status === 404) {
        setError('Profile endpoint not found. The server might be misconfigured.');
      } else {
        setError(error.response?.data?.error || error.message || 'Failed to load profile');
      }
      
      // Fallback to empty state
      const emptyProfile: ExhibitorProfile = {
        id: '',
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        industry: '',
        description: '',
        status: 'pending',
        boothNumber: '',
      };
      setProfile(emptyProfile);
      setEditedProfile(emptyProfile);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setError(null);
      setSuccess(null);
      
      const token = getAuthToken();
      
      if (!token) {
        setError('Please log in to update your profile');
        router.push('/login');
        return;
      }
      
      // Prepare data for backend
      const updateData = {
        name: editedProfile.contactPerson,
        company: editedProfile.companyName,
        phone: editedProfile.phone,
        address: editedProfile.address,
        website: editedProfile.website,
        sector: editedProfile.industry,
        description: editedProfile.description,
        boothNumber: editedProfile.boothNumber,
      };
      
      console.log('💾 Saving profile update:', updateData);
      
const response = await axios.put('https://diemex-backend.onrender.com/api/exhibitorDashboard/profile', updateData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      
      if (response.data.success) {
        // Update the profile with the edited data
        const updatedProfile = {
          ...profile,
          ...editedProfile
        } as ExhibitorProfile;
        
        setProfile(updatedProfile);
        setIsEditing(false);
        setSuccess('Profile updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
        
        // Refresh data to get latest from server
        setTimeout(() => {
          fetchProfileData();
        }, 1000);
      } else {
        throw new Error(response.data.error || 'Failed to update profile');
      }
    } catch (error: any) {
      console.error('❌ Error updating profile:', error);
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        setError('Your session has expired. Please log in again.');
        
        // Clear tokens and redirect
        localStorage.removeItem('exhibitor_token');
        localStorage.removeItem('exhibitor_data');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(error.response?.data?.error || error.message || 'Failed to update profile');
      }
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditedProfile(profile);
    }
    setIsEditing(false);
    setError(null);
  };

  const handleChange = (field: keyof ExhibitorProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleDebugStorage = () => {
    console.log('🔍 Debug localStorage:');
    console.log('- exhibitor_token:', localStorage.getItem('exhibitor_token')?.substring(0, 20) + '...');
    console.log('- exhibitor_data:', localStorage.getItem('exhibitor_data'));
    console.log('- token:', localStorage.getItem('token'));
    console.log('- All keys:', Object.keys(localStorage));
    
    // Check if token is valid
    const token = localStorage.getItem('exhibitor_token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('🔑 Token payload:', payload);
        console.log('⏰ Token expires:', new Date(payload.exp * 1000));
      } catch (e) {
        console.log('❌ Cannot parse token');
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 h-48 animate-pulse"></div>
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-2 bg-gray-200 rounded-lg h-10 w-10"></div>
                      <div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                        <div className="h-5 w-36 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i}>
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-12 bg-gray-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt if no token
  if (error?.includes('log in')) {
    return (
      <div className="space-y-6">
        <div className="card p-6 text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleLoginRedirect}
              className="btn-primary"
            >
              Go to Login
            </button>
            <button
              onClick={handleDebugStorage}
              className="btn-secondary text-sm"
            >
              Debug Storage
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <div className="card p-6 text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'Unable to load exhibitor profile.'}</p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={fetchProfileData}
              className="btn-primary"
            >
              Retry
            </button>
            <button 
              onClick={handleLoginRedirect}
              className="btn-secondary"
            >
              Go to Login
            </button>
            <button
              onClick={handleDebugStorage}
              className="btn-secondary text-sm"
            >
              Debug Storage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckIcon className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800">{success}</p>
          </div>
        </div>
      )}
      
      {error && !error.includes('log in') && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XMarkIcon className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-2">Manage your exhibitor information and preferences</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="btn-primary flex items-center gap-2"
              >
                <CheckIcon className="h-4 w-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center gap-2"
              >
                <XMarkIcon className="h-4 w-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="flex flex-col items-center text-center text-white">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <BuildingOfficeIcon className="h-12 w-12 text-white/90" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <CameraIcon className="h-4 w-4 text-gray-700" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-bold">{profile.companyName || 'No Company Name'}</h2>
                <p className="text-blue-100 text-sm mt-1">{profile.industry || 'No Industry Specified'}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <UserCircleIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p className="font-medium text-gray-900">{profile.contactPerson || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <EnvelopeIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{profile.email || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <PhoneIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{profile.phone || 'Not specified'}</p>
                  </div>
                </div>

                {profile.boothNumber && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <MapPinIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Booth Number</p>
                      <p className="font-medium text-gray-900">{profile.boothNumber}</p>
                    </div>
                  </div>
                )}

                {profile.website && (
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <GlobeAltIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a 
                        href={`https://${profile.website}`}
                        className="font-medium text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profile.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className={`badge ${
                    profile.status === 'active' || profile.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : profile.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="section-title">Company Information</h2>
                 
                </div>
              </div>

              <div className="space-y-6">
                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.companyName || ''}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900">{profile.companyName}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.industry || ''}
                        onChange={(e) => handleChange('industry', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900">{profile.industry}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.contactPerson || ''}
                        onChange={(e) => handleChange('contactPerson', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900">{profile.contactPerson}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booth Number
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.boothNumber || ''}
                        onChange={(e) => handleChange('boothNumber', e.target.value)}
                        className="input-field"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-900">{profile.boothNumber || 'Not assigned'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-4 w-4" />
                      Company Address
                    </div>
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.address || ''}
                      onChange={(e) => handleChange('address', e.target.value)}
                      rows={3}
                      className="input-field"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900 whitespace-pre-line">{profile.address || 'No address provided'}</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedProfile.description || ''}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={4}
                      className="input-field"
                      placeholder="Tell us about your company, products, and services..."
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900 whitespace-pre-line">{profile.description || 'No description provided'}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    This description will be displayed in the exhibition catalog
                  </p>
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  {isEditing ? (
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={editedProfile.website || ''}
                          onChange={(e) => handleChange('website', e.target.value)}
                          className="input-field"
                          placeholder="example.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profile.website ? (
                        <a 
                          href={`https://${profile.website}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {profile.website}
                        </a>
                      ) : (
                        <p className="text-gray-500">No website provided</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}