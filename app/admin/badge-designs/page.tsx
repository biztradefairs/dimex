'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { isAxiosError } from 'axios';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  fetchBadgeDesignSettings, fetchBadgeDesignPreview, saveBadgeDesign,
  type BadgeDesignId, type BadgeDesignSettings,
} from '@/lib/api/badgeDesigns';

function errorMessage(error: unknown) {
  if (isAxiosError<{ error?: string }>(error)) {
    if (error.response?.status === 403) return 'Only an admin can manage visitor badge designs.';
    return error.response?.data?.error || error.message;
  }
  return error instanceof Error ? error.message : 'Could not update the badge design.';
}

export default function BadgeDesignsPage() {
  const [settings, setSettings] = useState<BadgeDesignSettings | null>(null);
  const [selected, setSelected] = useState<BadgeDesignId>('design1');
  const [previews, setPreviews] = useState<Partial<Record<BadgeDesignId, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    Promise.all([
      fetchBadgeDesignSettings(), fetchBadgeDesignPreview('design1'), fetchBadgeDesignPreview('design2'),
    ]).then(([config, first, second]) => {
      const firstUrl = URL.createObjectURL(first);
      const secondUrl = URL.createObjectURL(second);
      urls.push(firstUrl, secondUrl);
      if (cancelled) { urls.forEach((url) => URL.revokeObjectURL(url)); return; }
      setSettings(config);
      setSelected(config.design);
      setPreviews({ design1: firstUrl, design2: secondUrl });
    }).catch((failure: unknown) => {
      if (!cancelled) setError(errorMessage(failure));
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; urls.forEach((url) => URL.revokeObjectURL(url)); };
  }, []);

  const save = async () => {
    if (!settings || saving) return;
    setSaving(true); setError(''); setMessage('');
    try {
      const updated = await saveBadgeDesign(selected);
      setSettings(updated);
      setSelected(updated.design);
      setMessage(`${updated.design === 'design1' ? 'Design 1' : 'Design 2'} is now active for WhatsApp visitor badges.`);
    } catch (failure: unknown) {
      setError(errorMessage(failure));
    } finally { setSaving(false); }
  };

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 sm:p-8">
      <div>
        <p className="text-sm font-semibold text-[#004A96]">Visitor registration</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">Badge Designs</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Choose the design used for new WhatsApp visitor badges and resends. Both designs use the visitor&apos;s registration details and QR code.
        </p>
      </div>
      {error ? <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p> : null}
      {loading ? (
        <div className="flex items-center gap-2 py-20 text-slate-500"><Loader2 className="h-5 w-5 animate-spin" />Loading badge designs...</div>
      ) : settings ? (
        <>
          <fieldset disabled={saving} className="grid gap-6 sm:grid-cols-2">
            <legend className="sr-only">Choose a visitor badge design</legend>
            {settings.designs.map((design) => (
              <label key={design.id} className={`cursor-pointer overflow-hidden rounded-xl border-2 bg-white transition ${selected === design.id ? 'border-[#004A96] ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-400'}`}>
                <div className="flex items-center gap-3 border-b border-slate-100 p-4">
                  <input type="radio" name="badgeDesign" value={design.id} checked={selected === design.id}
                    onChange={() => { setSelected(design.id); setMessage(''); }} className="h-4 w-4 accent-[#004A96]" />
                  <span className="font-semibold text-slate-900">{design.name}</span>
                  {settings.design === design.id ? <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700"><CheckCircle2 className="h-3 w-3" />Active</span> : null}
                </div>
                <div className="bg-slate-100 p-5">
                  {previews[design.id] ? <Image src={previews[design.id]!} width={450} height={714} unoptimized
                    alt={`${design.name} sample visitor badge`} className="mx-auto h-auto w-full max-w-[320px] bg-white shadow-md" /> : null}
                </div>
                <p className="p-4 text-sm leading-6 text-slate-600">{design.description}</p>
              </label>
            ))}
          </fieldset>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" onClick={save} disabled={saving || selected === settings.design}
              className="inline-flex items-center gap-2 rounded-lg bg-[#004A96] px-5 py-3 text-sm font-semibold text-white hover:bg-[#003875] disabled:cursor-not-allowed disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? 'Saving...' : 'Use selected design'}
            </button>
            <p aria-live="polite" className="text-sm text-green-700">{message}</p>
          </div>
          <p className="text-xs text-slate-500">Preview badges are samples and are not valid for entry.</p>
        </>
      ) : null}
    </main>
  );
}
