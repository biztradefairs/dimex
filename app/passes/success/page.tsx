'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Download,
  MessageCircle,
  MessageSquare,
} from 'lucide-react';
import VisitorPassCard from '@/components/passes/VisitorPassCard';
import { downloadVisitorBadge } from '@/lib/downloadVisitorBadge';
import {
  clearPassSession,
  getPassSession,
  resendVisitorPass,
  type PassDelivery,
  type VisitorPass,
} from '@/lib/api/passes';

export default function PassSuccessPage() {
  const router = useRouter();
  const [pass, setPass] = useState<VisitorPass | null>(null);
  const [delivery, setDelivery] = useState<PassDelivery | null>(null);
  const [sending, setSending] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const session = getPassSession();
    if (!session?.pass) {
      router.replace('/passes/register');
      return;
    }
    setPass(session.pass);
    setDelivery(session.delivery || null);
  }, [router]);

  if (!pass) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading your visitor pass…
      </div>
    );
  }

  const sent = delivery?.success && !delivery.simulated;
  const channel = pass.channel;

  const downloadBadge = async () => {
    setDownloading(true);
    setMessage('');
    try {
      await downloadVisitorBadge(pass);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not download badge');
    } finally {
      setDownloading(false);
    }
  };

  const sendAgain = async () => {
    setSending(true);
    setMessage('');
    try {
      const result = await resendVisitorPass({
        publicCode: pass.publicCode,
        channel,
      });
      setDelivery(result.delivery);
      setPass(result.pass);
      if (result.delivery.whatsappUrl && channel === 'whatsapp') {
        window.open(result.delivery.whatsappUrl, '_blank');
      }
      setMessage(result.delivery.success ? 'Pass sent to your phone.' : result.delivery.error || 'Could not send pass.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not send pass');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-4 py-10">
      <div className="mx-auto max-w-xl text-center">
        <div className="inline-flex items-center gap-2 text-lg font-black text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
          Registration Successful!
        </div>

        <div className="mt-8">
          <VisitorPassCard pass={pass} />
        </div>

        <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 px-5 py-4 text-left">
          <p className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Next step
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Show this screen at the entrance or download the badge below.
          </p>
          <p className="mt-2 font-mono text-xs font-semibold text-slate-500">
            {pass.registrationNumber}
          </p>
        </div>

        <button
          type="button"
          onClick={downloadBadge}
          disabled={downloading}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {downloading ? 'Preparing badge…' : 'Download Full Badge'}
        </button>
        <p className="mt-2 text-xs text-slate-400">High-quality badge for printing.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatusTile
            icon={channel === 'whatsapp' ? MessageCircle : MessageSquare}
            title={channel === 'whatsapp' ? 'Check Your WhatsApp' : 'Check Your SMS'}
            subtitle={sent ? 'Confirmation sent' : delivery?.simulated ? 'Open to send' : 'Ready to send'}
          />
          <StatusTile icon={Download} title="Badge Ready" subtitle="Download above" />
          <StatusTile icon={CalendarDays} title="Event Reminder" subtitle="We'll remind you" />
        </div>

        {delivery?.whatsappUrl && channel === 'whatsapp' ? (
          <a
            href={delivery.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-sm font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Send pass on WhatsApp
          </a>
        ) : (
          <button
            type="button"
            onClick={sendAgain}
            disabled={sending}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F2F5C] py-3.5 text-sm font-bold text-white disabled:opacity-60"
          >
            <MessageSquare className="h-4 w-4" />
            {sending ? 'Sending…' : `Send pass via ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}`}
          </button>
        )}
        {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/"
            className="rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white"
            onClick={() => clearPassSession()}
          >
            Back to Home
          </Link>
          <Link
            href="/passes/register"
            className="rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700"
            onClick={() => clearPassSession()}
          >
            Another Registration
          </Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">Need help? Contact us at visitor@diemex.in</p>
      </div>
    </div>
  );
}

function StatusTile({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof BadgeCheck;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left">
      <Icon className="h-5 w-5 text-[#1E5AA6]" />
      <p className="mt-2 text-sm font-bold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
