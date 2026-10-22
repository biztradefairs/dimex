import { NextResponse, type NextRequest } from 'next/server';
import { PROJECT_ID_VAR, submitContactForm } from '@/lib/graphql-client';

export const runtime = 'nodejs';
export const maxDuration = 120;

const FORM_TYPES = new Set([
  'visitor-registration',
  'exhibitor-enquiry',
  'partner-registration',
  'brochure-request',
  'event-brochure',
]);

function contactApiUrl() {
  const base = (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'https://diemex-backend.onrender.com'
  ).replace(/\/+$/, '').replace(/\/api$/, '');
  return `${base}/api/contact`;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const payload = body?.payload;
  if (
    !payload || typeof payload !== 'object' || Array.isArray(payload) ||
    typeof payload.email !== 'string' || !payload.email.trim() ||
    !FORM_TYPES.has(payload.formType)
  ) {
    return NextResponse.json(
      { success: false, message: 'Please provide a valid registration form and email address.' },
      { status: 400 },
    );
  }

  // Both operations belong to this server request and continue during client navigation.
  const cmsTask = async () => {
    const result = await submitContactForm(PROJECT_ID_VAR.projectId, payload);
    if (!result.data.submitContact.success) {
      throw new Error(result.data.submitContact.message);
    }
  };
  const contactTask = async () => {
    if (body.options?.contact === false) return;
    const response = await fetch(contactApiUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(90_000),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || `Contact API returned ${response.status}`);
    }
  };

  const [cms, contact] = await Promise.allSettled([cmsTask(), contactTask()]);
  if (cms.status === 'rejected') console.error('CMS lead save failed:', cms.reason);
  if (contact.status === 'rejected') console.error('Contact registration failed:', contact.reason);

  const success = cms.status === 'fulfilled' && contact.status === 'fulfilled';
  const message = success
    ? 'Registration saved. Your confirmation email has been accepted for delivery.'
    : cms.status === 'fulfilled'
      ? 'Your registration was saved, but we could not complete your confirmation email. Please contact our team.'
      : 'We could not finish saving your registration. Please contact our team.';

  return NextResponse.json({ success, message }, { status: success ? 200 : 502 });
}
