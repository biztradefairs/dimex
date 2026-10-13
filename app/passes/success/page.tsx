'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Download,
  Mail,
  MessageCircle,
  MessageSquare,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import VisitorPassCard from '@/components/passes/VisitorPassCard';
import {
  downloadVisitorBadge,
  generateVisitorBadgeDataUrl,
} from '@/lib/downloadVisitorBadge';
import {
  clearPassSession,
  getPassSession,
  resendVisitorPass,
  type PassChannel,
  type PassDelivery,
  type VisitorPass,
} from '@/lib/api/passes';

export default function PassSuccessPage() {
  const router = useRouter();
  const [pass, setPass] = useState<VisitorPass | null>(null);
  const [delivery, setDelivery] = useState<PassDelivery | null>(null);
  const [sending, setSending] = useState<PassChannel | null>(null);
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

  const shareImageToWhatsApp = async () => {
    setSending('whatsapp');
    setMessage('');

    try {
      // -----------------------------------------
      // 1. Resolve registered phone number digits
      // -----------------------------------------
      const ccDigits = String(pass.countryCode || '').replace(/\D/g, '');
      const nnDigits = String(pass.nationalNumber || '').replace(/\D/g, '');
      const rawPhoneDigits = String(pass.phone || '').replace(/\D/g, '');

      let phoneDigits = '';
      if (ccDigits && nnDigits) {
        phoneDigits = `${ccDigits}${nnDigits}`;
      } else if (rawPhoneDigits) {
        phoneDigits = rawPhoneDigits.length === 10 ? `91${rawPhoneDigits}` : rawPhoneDigits;
      }

      // -----------------------------------------
      // 2. Create Public pass URL & Message
      // -----------------------------------------
      const publicAppUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

      const passUrl = `${publicAppUrl}/passes/view/${pass.publicCode}`;

      const whatsappText =
        `*DIEMEX 2027 — Your Visitor Pass*\n\n` +
        `Hi *${pass.name}*,\n\n` +
        `Your digital visitor badge is ready.\n` +
        `📌 *Registration:* ${pass.registrationNumber}\n\n` +
        `👉 *Show this QR at entry:*\n${passUrl}\n\n` +
        `📅 24–26 Mar 2027\n` +
        `📍 Auto Cluster Exhibition Centre, Pune`;

      const whatsappUrl = phoneDigits
        ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappText)}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`;

      // -----------------------------------------
      // 3. Directly open WhatsApp for registered number
      // -----------------------------------------
      window.open(whatsappUrl, '_blank');

      // -----------------------------------------
      // 4. Download badge PNG for visitor
      // -----------------------------------------
      try {
        let dataUrl = '';

        const badgeElement =
          document.getElementById('visitor-pass') ||
          document.getElementById('visitor-pass-card') ||
          document.querySelector('[data-visitor-pass]');

        if (badgeElement) {
          try {
            dataUrl = await toPng(badgeElement as HTMLElement, {
              cacheBust: true,
              pixelRatio: 2,
              backgroundColor: '#ffffff',
            });
          } catch (domErr) {
            console.warn('DOM to PNG fallback to canvas generator:', domErr);
          }
        }

        if (!dataUrl) {
          dataUrl = await generateVisitorBadgeDataUrl(pass);
        }

        if (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${pass.registrationNumber}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (badgeErr) {
        console.warn('Badge download warning:', badgeErr);
      }

      // -----------------------------------------
      // 5. Trigger backend registration sync
      // -----------------------------------------
      try {
        const result = await resendVisitorPass({
          publicCode: pass.publicCode,
          channel: 'whatsapp',
        });
        if (result?.delivery) {
          setDelivery(result.delivery);
        }
        if (result?.pass) {
          setPass(result.pass);
        }
      } catch (err) {
        console.warn('Backend sync warning:', err);
      }

      setMessage(`Opening WhatsApp chat directly for ${pass.phone || phoneDigits}…`);
    } catch (error) {
      console.error('Failed to share visitor pass:', error);
      setMessage(error instanceof Error ? error.message : 'Unable to open WhatsApp.');
    } finally {
      setSending(null);
    }
  };

  const sendVia = async (nextChannel: PassChannel) => {
    if (nextChannel === 'whatsapp') {
      return shareImageToWhatsApp();
    }

    setSending(nextChannel);
    setMessage('');
    try {
      const result = await resendVisitorPass({
        publicCode: pass.publicCode,
        channel: nextChannel,
      });
      setDelivery(result.delivery);
      setPass(result.pass);
      const sentTo = nextChannel === 'email' ? 'Email' : 'SMS';

      if (result.delivery.success) {
        setMessage(`Pass sent successfully via ${sentTo}!`);
      } else {
        setMessage(result.delivery.error || `Could not send pass via ${sentTo}.`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not send pass');
    } finally {
      setSending(null);
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

        <div className="mt-6 rounded-2xl border border-[#004A96]/20 bg-[#E8F1F8] px-5 py-4 text-left">
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
            icon={channel === 'whatsapp' ? MessageCircle : channel === 'email' ? Mail : MessageSquare}
            title={channel === 'whatsapp' ? 'Check Your WhatsApp' : channel === 'email' ? 'Check Your Email' : 'Check Your SMS'}
            subtitle={sent ? 'Confirmation sent' : delivery?.error ? 'Send failed' : 'Ready to send'}
          />
          <StatusTile icon={Download} title="Badge Ready" subtitle="Download above" />
          <StatusTile icon={CalendarDays} title="Event Reminder" subtitle="We'll remind you" />
        </div>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={() => sendVia('sms')}
            disabled={sending !== null}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#004A96] py-3.5 text-sm font-bold text-white disabled:opacity-60"
          >
            <MessageSquare className="h-4 w-4" />
            {sending === 'sms' ? 'Sending…' : 'Send pass via SMS'}
          </button>
          <button
            type="button"
            onClick={() => sendVia('whatsapp')}
            disabled={sending !== null}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-sm font-bold text-white disabled:opacity-60"
          >
            <MessageCircle className="h-4 w-4" />
            {sending === 'whatsapp' ? 'Sending…' : 'Send pass via WhatsApp'}
          </button>
          {pass.email ? (
            <button
              type="button"
              onClick={() => sendVia('email')}
              disabled={sending !== null}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-800 disabled:opacity-60"
            >
              <Mail className="h-4 w-4" />
              {sending === 'email' ? 'Sending…' : 'Send pass via Email'}
            </button>
          ) : null}
        </div>
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
      <Icon className="h-5 w-5 text-[#004A96]" />
      <p className="mt-2 text-sm font-bold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
