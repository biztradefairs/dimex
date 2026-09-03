'use client';

import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Lock, X } from 'lucide-react';

type OtpModalProps = {
  open: boolean;
  phone: string;
  channel: 'sms' | 'whatsapp';
  expiresIn?: number;
  resendIn?: number;
  devOtp?: string;
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
  devOtp,
  loading,
  error,
  onClose,
  onVerify,
  onResend,
}: OtpModalProps) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [seconds, setSeconds] = useState(resendIn);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    setDigits(['', '', '', '']);
    setSeconds(resendIn);
    const timer = window.setTimeout(() => inputs.current[0]?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [open, resendIn, phone, channel]);

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
    const clean = next.replace(/\D/g, '').slice(0, 4).split('');
    const filled = [clean[0] || '', clean[1] || '', clean[2] || '', clean[3] || ''];
    setDigits(filled);
    const nextIndex = Math.min(clean.length, 3);
    inputs.current[nextIndex]?.focus();
    if (clean.length === 4) onVerify(clean.join(''));
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-[#0B1F4B]/55 backdrop-blur-md"
        aria-label="Close OTP popup"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E5AA6] to-[#4F46E5] text-sm font-black text-white">
              D
            </div>
            <p className="text-sm font-bold text-slate-900">DIEMEX 2026</p>
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
            Verify Your Phone Number
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            We&apos;ve sent a 4-digit verification code to{' '}
            <span className="font-semibold text-slate-800">{phone}</span>
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            Tip: Copy the OTP and paste it here to auto-fill
          </p>

          {devOtp ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Local test OTP: <span className="font-mono text-base font-bold tracking-[0.3em]">{devOtp}</span>
            </div>
          ) : null}

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
                  if (index < 3) inputs.current[index + 1]?.focus();
                  const joined = copy.join('');
                  if (joined.length === 4) onVerify(joined);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && !digits[index] && index > 0) {
                    inputs.current[index - 1]?.focus();
                  }
                  if (event.key === 'Enter' && value.length === 4) onVerify(value);
                }}
                onPaste={(event) => {
                  event.preventDefault();
                  applyValue(event.clipboardData.getData('text'));
                }}
                className={`h-14 w-12 rounded-xl border-2 text-center text-2xl font-bold text-slate-900 outline-none transition sm:h-16 sm:w-14 ${
                  digit
                    ? 'border-[#1E5AA6] bg-blue-50'
                    : 'border-slate-200 focus:border-[#1E5AA6] focus:ring-4 focus:ring-blue-100'
                }`}
              />
            ))}
          </div>

          {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

          <div className="mt-5 text-sm text-slate-500">
            {seconds > 0 ? (
              <>
                Resend code in <span className="font-semibold text-[#1E5AA6]">{seconds}s</span>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSeconds(resendIn);
                  onResend();
                }}
                className="font-semibold text-[#1E5AA6] hover:underline"
              >
                Resend code
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {channel === 'whatsapp'
              ? 'WhatsApp usually arrives within a few seconds.'
              : 'SMS from DIEMEX · Expires in 10 minutes.'}
          </p>

          <button
            type="button"
            disabled={loading || value.length !== 4}
            onClick={() => onVerify(value)}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#0F2F5C] to-[#1E5AA6] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
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
