const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api`;

export type PassChannel = 'sms' | 'whatsapp';

export type VisitorPass = {
  id: string;
  registrationNumber: string;
  publicCode: string;
  name: string;
  company: string;
  designation?: string | null;
  phone: string;
  maskedPhone: string;
  countryCode: string;
  nationalNumber: string;
  channel: PassChannel;
  email?: string | null;
  area?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  pinCode?: string | null;
  location?: string;
  source?: string | null;
  interests: string[];
  status: string;
  qrDataUrl: string;
  qrPayload: string;
  passUrl: string;
  sentVia?: string | null;
  sentStatus?: string | null;
  event: {
    name: string;
    dates: string;
    venue: string;
  };
};

export type PassDelivery = {
  success: boolean;
  simulated?: boolean;
  provider?: string;
  channel: PassChannel;
  whatsappUrl?: string;
  passUrl?: string;
  error?: string | null;
};

export type PassSession = {
  countryCode: string;
  mobile: string;
  channel: PassChannel;
  phone: string;
  e164?: string;
  verificationToken?: string;
  pass?: VisitorPass | null;
  delivery?: PassDelivery | null;
  alreadyRegistered?: boolean;
};

const SESSION_KEY = 'diemex_pass_session';

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.error || data.message || 'Request failed');
  }
  return data as T;
}

export function getPassSession(): PassSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as PassSession) : null;
  } catch {
    return null;
  }
}

export function savePassSession(session: PassSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearPassSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export async function sendPassOtp(payload: {
  countryCode: string;
  mobile: string;
  channel: PassChannel;
}) {
  const response = await fetch(`${API_BASE}/passes/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse<{
    success: true;
    message: string;
    channel: PassChannel;
    phone: string;
    e164: string;
    expiresIn: number;
    resendIn: number;
    provider: string;
    simulated?: boolean;
    devOtp?: string;
  }>(response);
}

export async function resendPassOtp(payload: {
  countryCode: string;
  mobile: string;
  channel: PassChannel;
}) {
  const response = await fetch(`${API_BASE}/passes/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse<{
    success: true;
    message: string;
    resendIn: number;
    devOtp?: string;
  }>(response);
}

export async function verifyPassOtp(payload: {
  countryCode: string;
  mobile: string;
  otp: string;
}) {
  const response = await fetch(`${API_BASE}/passes/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse<{
    success: true;
    verificationToken: string;
    channel: PassChannel;
    phone: string;
    e164: string;
    alreadyRegistered: boolean;
    pass: VisitorPass | null;
    delivery: PassDelivery | null;
  }>(response);
}

export async function registerVisitorPass(payload: {
  verificationToken: string;
  name: string;
  company: string;
  designation?: string;
  email?: string;
  pinCode?: string;
  area?: string;
  city?: string;
  state?: string;
  country?: string;
  source?: string;
  interests: string[];
}) {
  const response = await fetch(`${API_BASE}/passes/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse<{
    success: true;
    pass: VisitorPass;
    delivery: PassDelivery;
  }>(response);
}

export async function resendVisitorPass(payload: {
  verificationToken?: string;
  publicCode?: string;
  channel?: PassChannel;
}) {
  const response = await fetch(`${API_BASE}/passes/resend-pass`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return parseResponse<{
    success: true;
    pass: VisitorPass;
    delivery: PassDelivery;
  }>(response);
}

export async function fetchVisitorPass(code: string) {
  const response = await fetch(`${API_BASE}/passes/${encodeURIComponent(code)}`);
  return parseResponse<{ success: true; pass: VisitorPass }>(response);
}

export async function checkInVisitorPass(code: string) {
  const response = await fetch(`${API_BASE}/passes/check-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  return parseResponse<{
    success: true;
    alreadyCheckedIn?: boolean;
    message: string;
    checkInTime?: string;
    pass: VisitorPass;
  }>(response);
}
