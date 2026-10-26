import api from '@/lib/api';

export type BadgeDesignId = 'design1' | 'design2';
export type BadgeDesign = { id: BadgeDesignId; name: string; description: string };
export type BadgeDesignSettings = {
  success: true;
  design: BadgeDesignId;
  designs: BadgeDesign[];
  updatedAt: string | null;
};

export async function fetchBadgeDesignSettings() {
  const { data } = await api.get<BadgeDesignSettings>('/api/passes/badge-design');
  return data;
}
export async function saveBadgeDesign(design: BadgeDesignId) {
  const { data } = await api.put<BadgeDesignSettings>('/api/passes/badge-design', { design });
  return data;
}
export async function fetchBadgeDesignPreview(design: BadgeDesignId) {
  const { data } = await api.get<Blob>(`/api/passes/badge-designs/${design}/preview`, { responseType: 'blob' });
  return data;
}
