function getApiBase() {
  const raw = (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api`
  ).replace(/\/$/, "");
  return raw.endsWith("/api") ? raw : `${raw}/api`;
}

function getExhibitorToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("exhibitor_token") || localStorage.getItem("token");
}

function getAdminToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token") || localStorage.getItem("admin_token");
}

export type TeamMember = {
  id?: string;
  name: string;
  designation: string;
  sortOrder?: number;
};

export type ExhibitorTeam = {
  companyName: string;
  city: string;
  submittedAt?: string | null;
  members: TeamMember[];
};

export type ExhibitorTeamSummary = {
  exhibitorId: string;
  exhibitorName: string;
  email: string;
  phone: string;
  boothNumber?: string;
  status?: string;
  companyName: string;
  city: string;
  memberCount: number;
  submittedAt: string | null;
  hasTeam: boolean;
};

export type ExhibitorTeamDetail = {
  exhibitor: {
    id: string;
    name: string;
    email: string;
    company: string;
    phone: string;
    boothNumber?: string;
    status?: string;
  };
  team: {
    id: string;
    exhibitorId: string;
    companyName: string;
    city: string;
    submittedAt: string;
    updatedAt?: string;
    members: TeamMember[];
  } | null;
};

async function apiFetch(path: string, token: string | null, options: RequestInit = {}) {
  if (!token) {
    throw new Error("unauthorized");
  }

  const response = await fetch(`${getApiBase()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    throw new Error("unauthorized");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || "Request failed");
  }

  return payload;
}

export async function fetchMyTeam(): Promise<ExhibitorTeam> {
  const payload = await apiFetch("/exhibitor-team", getExhibitorToken());
  return payload.data;
}

export async function submitMyTeam(input: {
  companyName: string;
  city: string;
  members: Array<{ name: string; designation: string }>;
}): Promise<ExhibitorTeam> {
  const payload = await apiFetch("/exhibitor-team", getExhibitorToken(), {
    method: "PUT",
    body: JSON.stringify(input),
  });
  return payload.data;
}

export async function fetchExhibitorTeamSummaries(): Promise<ExhibitorTeamSummary[]> {
  const payload = await apiFetch("/exhibitor-team/admin", getAdminToken());
  return payload.data || [];
}

export async function fetchExhibitorTeamDetail(exhibitorId: string): Promise<ExhibitorTeamDetail> {
  const payload = await apiFetch(`/exhibitor-team/admin/${exhibitorId}`, getAdminToken());
  return payload.data;
}
