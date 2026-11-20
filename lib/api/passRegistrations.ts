import api from '@/lib/api';

export type PassRegistration = {
  id: string;
  registrationNumber: string;
  publicCode: string;
  name: string;
  company: string;
  designation: string | null;
  phone: string;
  email: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pinCode: string | null;
  source: string | null;
  interests: string[];
  channel: string;
  status: string;
  verifiedAt: string | null;
  issuedAt: string | null;
  sentAt: string | null;
  sentVia: string | null;
  sentStatus: string | null;
  checkedInAt: string | null;
  createdAt: string;
  updatedAt: string;
  passUrl: string;
  badgeUrl: string;
  badgeDesign: string;
  cmsSync: {
    status: string;
    leadId: string | null;
    syncedAt: string | null;
    attempts: number;
    lastError: string | null;
    nextAttemptAt: string | null;
  };
};

export type PassRegistrationList = {
  success: true;
  registrations: PassRegistration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  cmsConfigured: boolean;
};

export async function fetchPassRegistrations(
  params: { page: number; limit: number; search: string; status: string },
  signal?: AbortSignal,
) {
  const { data } = await api.get<PassRegistrationList>('/api/passes/admin/registrations', { params, signal });
  return data;
}
