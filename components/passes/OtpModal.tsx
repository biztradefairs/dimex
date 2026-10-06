'use client';

import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Lock, X } from 'lucide-react';

type OtpModalProps = {
  open: boolean;
  phone: string;
  channel: 'sms' | 'whatsapp' | 'email';
  expiresIn?: number;
  resendIn?: number;
  length?: number;
  loading?: boolean;
  error?: string;
  onClose: () => void;
  onVerify: (otp: string) => void;
  onResend: () => void;
};

export default function OtpModal({
  open,
  phone,
  channel,
  expiresIn = 600,
  resendIn = 45,
  length = 4,
  loading,
  error,
  onClose,
  onVerify,
  onResend,
}: OtpModalProps) {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length }, () => ''));
  const [seconds, setSeconds] = useState(resendIn);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    setDigits(Array.from({ length }, () => ''));
    setSeconds(resendIn);
    const timer = window.setTimeout(() => inputs.current[0]?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [open, resendIn, phone, channel, length]);

  useEffect(() => {
    if (!open || seconds <= 0) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [open, seconds]);

  if (!open) return null;

  const value = digits.join('');

  const applyValue = (next: string) => {
    const clean = next.replace(/\D/g, '').slice(0, length).split('');
    const filled = Array.from({ length }, (_, index) => clean[index] || '');
    setDigits(filled);
    const nextIndex = Math.min(clean.length, length - 1);
    inputs.current[nextIndex]?.focus();
    if (clean.length === length) onVerify(clean.join(''));
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#004A96]/55 backdrop-blur-md"
        aria-label="Close OTP popup"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#004A96] to-[#004A96] text-sm font-black text-white">
              D
            </div>
            <p className="text-sm font-bold text-slate-900">DIEMEX 2027</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-7 text-center">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {channel === 'email' ? 'Verify Your Email' : 'Verify Your Phone Number'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            We&apos;ve sent a {length}-digit verification code to{' '}
            <span className="font-semibold text-slate-800">{phone}</span>
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            {channel === 'email'
              ? 'Check your inbox for the DIEMEX verification email.'
              : 'Tip: Copy the OTP and paste it here to auto-fill'}
          </p>

          <div className="mt-6 flex justify-center gap-3">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputs.current[index] = node;
                }}
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                onChange={(event) => {
                  const next = event.target.value.replace(/\D/g, '');
                  if (!next) {
                    const copy = [...digits];
                    copy[index] = '';
                    setDigits(copy);
                    return;
                  }
                  const copy = [...digits];
                  copy[index] = next.slice(-1);
                  setDigits(copy);
                  if (index < length - 1) inputs.current[index + 1]?.focus();
                  const joined = copy.join('');
                  if (joined.length === length) onVerify(joined);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && !digits[index] && index > 0) {
                    inputs.current[index - 1]?.focus();
                  }
                  if (event.key === 'Enter' && value.length === length) onVerify(value);
                }}
                onPaste={(event) => {
                  event.preventDefault();
                  applyValue(event.clipboardData.getData('text'));
                }}
                className={`h-14 w-12 rounded-xl border-2 text-center text-2xl font-bold text-slate-900 outline-none transition sm:h-16 sm:w-14 ${
                  digit
                    ? 'border-[#004A96] bg-[#E8F1F8]'
                    : 'border-slate-200 focus:border-[#004A96] focus:ring-4 focus:ring-[#004A96]/15'
                }`}
              />
            ))}
          </div>

          {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

          <div className="mt-5 text-sm text-slate-500">
            {seconds > 0 ? (
              <>
                Resend code in <span className="font-semibold text-[#004A96]">{seconds}s</span>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSeconds(resendIn);
                  onResend();
                }}
                className="font-semibold text-[#004A96] hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {channel === 'whatsapp'
              ? 'WhatsApp usually arrives within a few seconds.'
              : channel === 'email'
                ? 'Check your inbox for the DIEMEX verification email.'
                : 'SMS from DIEMEX · Expires in 10 minutes.'}
          </p>

          <button
            type="button"
            disabled={loading || value.length !== length}
            onClick={() => onVerify(value)}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#004A96] to-[#004A96] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Verifying…' : 'Verify OTP'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-slate-100 px-5 py-3 text-[11px] text-slate-400">
          <Lock className="h-3.5 w-3.5 text-amber-500" />
          Your phone number is securely verified and will not be shared.
        </div>
      </div>
    </div>
  );
}
