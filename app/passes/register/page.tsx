'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Lock,
  MapPin,
  MessageCircle,
  MessageSquare,
} from 'lucide-react';
import OtpModal from '@/components/passes/OtpModal';
import PassesChrome from '@/components/passes/PassesChrome';
import {
  registerVisitorPass,
  savePassSession,
  sendPassOtp,
  verifyPassOtp,
  type PassChannel,
} from '@/lib/api/passes';

const COUNTRIES = [
  { code: '+91', flag: '🇮🇳', name: 'India', max: 10 },
  { code: '+971', flag: '🇦🇪', name: 'UAE', max: 9 },
  { code: '+1', flag: '🇺🇸', name: 'USA', max: 10 },
  { code: '+44', flag: '🇬🇧', name: 'UK', max: 10 },
  { code: '+65', flag: '🇸🇬', name: 'Singapore', max: 8 },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia', max: 10 },
  { code: '+49', flag: '🇩🇪', name: 'Germany', max: 11 },
  { code: '+86', flag: '🇨🇳', name: 'China', max: 11 },
];

const INTERESTS = [
  'Die & Mould Manufacturers',
  'OEMs & Automotive',
  'Precision Engineering',
  'Tooling & Components',
  'Distributors & Wholesalers',
  'Retailers & Resellers',
  'Photographer & Videographer',
  'Media & Publications',
];

const SOURCES = [
  'Google Search',
  'Social Media',
  'Email Invitation',
  'Colleague / Friend',
  'Exhibition Website',
  'Other',
];

type Step = 'phone' | 'details';

export default function PassRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('phone');
  const [channel, setChannel] = useState<PassChannel>('sms');
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, setMobile] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [resendIn, setResendIn] = useState(45);
  const [verificationToken, setVerificationToken] = useState('');
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const [form, setForm] = useState({
    name: '',
    company: '',
    pinCode: '',
    area: '',
    city: '',
    state: '',
    country: 'India',
    source: '',
    interests: [] as string[],
  });
  const [pinStatus, setPinStatus] = useState('');

  const selectedCountry = COUNTRIES.find((item) => item.code === countryCode) || COUNTRIES[0];
  const isValidMobile =
    countryCode === '+91'
      ? /^[6-9]\d{9}$/.test(mobile)
      : mobile.length >= 6 && mobile.length <= selectedCountry.max;

  const channelLabel = channel === 'whatsapp' ? 'WhatsApp' : 'SMS';

  const canSubmitDetails = useMemo(
    () => form.name.trim().length >= 2 && form.company.trim().length >= 2 && form.interests.length > 0,
    [form]
  );

  const sendOtp = async () => {
    setError('');
    setOtpError('');
    setLoading(true);
    try {
      const result = await sendPassOtp({ countryCode, mobile, channel });
      setDevOtp(result.devOtp || '');
      setResendIn(result.resendIn || 45);
      savePassSession({ countryCode, mobile, channel, phone: result.phone, e164: result.e164 });
      setOtpOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (otp: string) => {
    if (otp.length !== 4) return;
    setOtpLoading(true);
    setOtpError('');
    try {
      const result = await verifyPassOtp({ countryCode, mobile, otp });
      setVerificationToken(result.verificationToken);
      setVerifiedPhone(result.e164 || result.phone);
      savePassSession({
        countryCode,
        mobile,
        channel: result.channel,
        phone: result.phone,
        e164: result.e164,
        verificationToken: result.verificationToken,
        alreadyRegistered: result.alreadyRegistered,
        pass: result.pass,
        delivery: result.delivery,
      });
      setOtpOpen(false);

      if (result.alreadyRegistered && result.pass) {
        if (result.delivery?.whatsappUrl && result.channel === 'whatsapp') {
          window.open(result.delivery.whatsappUrl, '_blank');
        }
        router.push('/passes/success');
        return;
      }

      setForm((prev) => ({
        ...prev,
        country: countryCode === '+91' ? 'India' : prev.country,
      }));
      setStep('details');
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Invalid OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const lookupPin = async (pin: string) => {
    setForm((prev) => ({ ...prev, pinCode: pin }));
    if (!/^\d{6}$/.test(pin)) {
      setPinStatus('');
      return;
    }
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      const office = data?.[0]?.PostOffice?.[0];
      if (office) {
        setForm((prev) => ({
          ...prev,
          pinCode: pin,
          area: office.Name || prev.area,
          city: office.District || prev.city,
          state: office.State || prev.state,
          country: office.Country || 'India',
        }));
        setPinStatus('Auto-filled from pincode');
      } else {
        setPinStatus('Pincode not found');
      }
    } catch {
      setPinStatus('Could not look up pincode');
    }
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmitDetails) return;
    setLoading(true);
    setError('');
    try {
      const result = await registerVisitorPass({
        verificationToken,
        name: form.name,
        company: form.company,
        pinCode: form.pinCode,
        area: form.area,
        city: form.city,
        state: form.state,
        country: form.country,
        source: form.source,
        interests: form.interests,
      });
      savePassSession({
        countryCode,
        mobile,
        channel,
        phone: verifiedPhone,
        verificationToken,
        pass: result.pass,
        delivery: result.delivery,
      });
      if (result.delivery?.whatsappUrl && channel === 'whatsapp') {
        window.open(result.delivery.whatsappUrl, '_blank');
      }
      router.push('/passes/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F5F9]">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#3B1C8C] via-[#312E81] to-[#0F2F5C] pb-24 pt-6 text-white">
        <PassesChrome backHref="/passes" backLabel="Back to Exhibitions" />
        <div className="mx-auto max-w-5xl px-5 pt-16">
          <span className="inline-flex items-center rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
            Registration Open
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">DIEMEX 2026</h1>
          <div className="mt-5 max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-white/85 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-wide text-white/60">About This Event</p>
            <p className="mt-1">
              India&apos;s international die & mould exhibition. Register once, get your QR visitor pass on WhatsApp or SMS, and walk in.
            </p>
          </div>
        </div>
      </div>

      <div className="-mt-12 mx-auto grid max-w-5xl gap-6 px-5 pb-16 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Event Details</p>
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex gap-3">
              <CalendarDays className="mt-0.5 h-4 w-4 text-[#1E5AA6]" />
              <div>
                <p className="font-semibold text-slate-500">Event Dates</p>
                <p className="font-bold text-slate-800">8–10 Oct 2026</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-[#1E5AA6]" />
              <div>
                <p className="font-semibold text-slate-500">Venue</p>
                <p className="font-bold text-slate-800">Auto Cluster Exhibition Centre, Pune</p>
              </div>
            </div>
          </div>
        </aside>

        {step === 'phone' ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F2F5C] to-[#1E5AA6] px-5 py-4 text-white">
              <p className="text-xs font-bold tracking-[0.18em] text-white/70">DIEMEX 2026</p>
              <p className="text-lg font-black">International Die & Mould Exhibition</p>
              <p className="text-xs text-white/70">8–10 Oct 2026 · Pune, India</p>
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">Choose Verification Method</h2>
            <p className="mt-1 text-sm text-slate-500">Select how you&apos;d like to receive your one-time password</p>

            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1.5">
              <button
                type="button"
                onClick={() => setChannel('sms')}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  channel === 'sms' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                SMS
              </button>
              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  channel === 'whatsapp' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-800">
              OTP will be sent via <strong>{channelLabel}</strong> to your phone number.
            </div>

            <label className="mt-5 block text-sm font-bold text-rose-600">Mobile Number *</label>
            <div className="mt-2 flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryOpen((open) => !open)}
                  className="flex h-12 min-w-[118px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold"
                >
                  <span>
                    {selectedCountry.flag} {selectedCountry.code}
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                {countryOpen ? (
                  <div className="absolute z-20 mt-1 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                    {COUNTRIES.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(item.code);
                          setCountryOpen(false);
                          setMobile('');
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50"
                      >
                        {item.flag} {item.name} {item.code}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <input
                value={mobile}
                onChange={(event) => setMobile(event.target.value.replace(/\D/g, '').slice(0, selectedCountry.max))}
                placeholder={countryCode === '+91' ? '10-digit mobile number' : 'Mobile number'}
                className="h-12 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#1E5AA6] focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">Select your country code and enter your mobile number.</p>
            {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

            <button
              type="button"
              disabled={!isValidMobile || loading}
              onClick={sendOtp}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#0F2F5C] to-[#2563EB] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
            >
              {loading ? 'Sending OTP…' : `Send OTP via ${channelLabel}`}
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
              {channelLabel} OTP from DIEMEX · Expires in 10 minutes
            </p>
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="h-3.5 w-3.5" />
              Your data is encrypted and secure
            </p>
          </section>
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Complete Registration</h2>
                <p className="text-sm text-slate-500">Fill in your details to complete registration</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStep('phone');
                  setVerificationToken('');
                }}
                className="text-sm font-semibold text-[#1E5AA6] hover:underline"
              >
                Change Number
              </button>
            </div>

            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
                required
              />
              <Field
                label="Company Or Firm Name"
                value={form.company}
                onChange={(value) => setForm((prev) => ({ ...prev, company: value }))}
                required
              />

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone No.</label>
                <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                  <span className="font-semibold text-slate-800">{verifiedPhone}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Verified
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-emerald-700">This number was verified via OTP</p>
              </div>

              <Field
                label="Search By Area / Pin Code"
                value={form.pinCode}
                onChange={lookupPin}
                placeholder="6-digit pincode"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <LockedField label="Area" value={form.area} hint={pinStatus} />
                <LockedField label="City" value={form.city} hint="Auto-filled from pincode" />
                <LockedField label="State" value={form.state} hint="Auto-filled from pincode" />
                <LockedField label="Country" value={form.country} hint="Set based on your phone number" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">How Did You Find Us</label>
                <select
                  value={form.source}
                  onChange={(event) => setForm((prev) => ({ ...prev, source: event.target.value }))}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#1E5AA6]"
                >
                  <option value="">Select a source</option>
                  {SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700">What are you looking for?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => {
                    const selected = form.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${
                          selected
                            ? 'bg-[#1E5AA6] text-white ring-[#1E5AA6]'
                            : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-300'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
                {form.interests.length === 0 ? (
                  <p className="mt-3 rounded-xl bg-sky-50 px-3 py-2 text-xs text-sky-800">
                    Please select at least one interest to continue.
                  </p>
                ) : null}
              </div>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              <button
                type="submit"
                disabled={!canSubmitDetails || loading}
                className="w-full rounded-2xl bg-[#0F2F5C] py-3.5 text-sm font-bold text-white transition hover:bg-[#163d73] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Issuing your pass…' : 'Complete Registration'}
              </button>
              <p className="text-center text-xs text-slate-400">
                By registering, you agree to our terms and conditions.
              </p>
            </form>
          </section>
        )}
      </div>

      <OtpModal
        open={otpOpen}
        phone={`${countryCode}${mobile}`}
        channel={channel}
        resendIn={resendIn}
        devOtp={devOtp}
        loading={otpLoading}
        error={otpError}
        onClose={() => setOtpOpen(false)}
        onVerify={handleVerify}
        onResend={sendOtp}
      />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-[#1E5AA6] focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function LockedField({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        value={value}
        readOnly
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600"
      />
      {hint && value ? <p className="mt-1 text-[11px] text-slate-400">{hint}</p> : null}
    </label>
  );
}
