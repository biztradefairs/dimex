import { submitContactForm, PROJECT_ID_VAR } from '@/lib/graphql-client';
import type { RegistrationTab } from '@/lib/registrationRoutes';

const THANKS_KEY = 'diemex_register_thanks';

function contactApiUrl() {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');
  return `${base}/contact`;
}

export type ThanksPayload = {
  name: string;
  tab: RegistrationTab;
  email?: string;
};

export function saveThanksSession(payload: ThanksPayload) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(THANKS_KEY, JSON.stringify(payload));
}

export function readThanksSession(): ThanksPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(THANKS_KEY);
    return raw ? (JSON.parse(raw) as ThanksPayload) : null;
  } catch {
    return null;
  }
}

/** CMS + contact API run in the background so the thank-you page can appear immediately. */
export function submitRegistrationInBackground(payload: Record<string, any>) {
  submitContactForm(PROJECT_ID_VAR.projectId, payload).catch((error) => {
    console.error('CMS lead save failed:', error);
  });

  fetch(contactApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    console.error('Contact API failed:', error);
  });
}
