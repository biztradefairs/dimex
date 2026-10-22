import type { RegistrationTab } from '@/lib/registrationRoutes';

const THANKS_KEY = 'diemex_register_thanks';
const STATUS_KEY = 'diemex_register_status';
export const REGISTRATION_STATUS_EVENT = 'diemex_registration_status';

const FORM_TABS: Record<string, RegistrationTab> = {
  'visitor-registration': 'visitor',
  'exhibitor-enquiry': 'exhibitor',
  'partner-registration': 'sponsor',
  'brochure-request': 'brochure',
  'event-brochure': 'brochure',
};

export type ThanksPayload = {
  name: string;
  tab: RegistrationTab;
  email?: string;
};

export type RegistrationStatus = {
  tab?: RegistrationTab;
  status: 'pending' | 'success' | 'error';
  message?: string;
};

let latestStatus: RegistrationStatus | null = null;
let latestThanks: ThanksPayload | null = null;
let latestRequest = 0;

export function saveThanksSession(payload: ThanksPayload) {
  if (typeof window === 'undefined') return;
  latestThanks = payload;
  try {
    sessionStorage.setItem(THANKS_KEY, JSON.stringify(payload));
  } catch {
    // The query string still provides the thank-you name and tab.
  }
  window.dispatchEvent(new Event(REGISTRATION_STATUS_EVENT));
}

export function readThanksSession(): ThanksPayload | null {
  if (latestThanks) return latestThanks;
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(THANKS_KEY);
    latestThanks = raw ? (JSON.parse(raw) as ThanksPayload) : null;
    return latestThanks;
  } catch {
    return null;
  }
}

export function readRegistrationStatus(): RegistrationStatus | null {
  if (latestStatus) return latestStatus;
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STATUS_KEY);
    latestStatus = raw ? (JSON.parse(raw) as RegistrationStatus) : null;
    return latestStatus;
  } catch {
    return null;
  }
}

export function subscribeRegistrationUpdates(onChange: () => void) {
  window.addEventListener(REGISTRATION_STATUS_EVENT, onChange);
  return () => window.removeEventListener(REGISTRATION_STATUS_EVENT, onChange);
}

function setRegistrationStatus(value: RegistrationStatus) {
  latestStatus = value;
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STATUS_KEY, JSON.stringify(value));
  } catch {
    // In-memory status remains available when browser storage is blocked.
  }
  window.dispatchEvent(new Event(REGISTRATION_STATUS_EVENT));
}

/** Start server-side processing without delaying navigation to the thank-you page. */
export function submitRegistrationInBackground(
  payload: Record<string, unknown>,
  options: { contact?: boolean } = {},
) {
  const requestId = ++latestRequest;
  const tab = FORM_TABS[String(payload.formType)];
  setRegistrationStatus({ tab, status: 'pending' });

  void fetch('/api/registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payload: {
        ...payload,
        utmUrl: payload.utmUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
      },
      options,
    }),
    keepalive: true,
  }).then(async (response) => {
    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || 'We could not complete your registration. Please contact our team.');
    }
    if (requestId === latestRequest) setRegistrationStatus({ tab, status: 'success' });
  }).catch((error: unknown) => {
    console.error('Registration processing failed:', error);
    if (requestId === latestRequest) {
      setRegistrationStatus({
        tab,
        status: 'error',
        message: error instanceof Error
          ? error.message
          : 'We could not complete your registration. Please contact our team.',
      });
    }
  });
}
