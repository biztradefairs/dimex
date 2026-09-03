'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Download, Loader2 } from 'lucide-react';
import VisitorPassCard from '@/components/passes/VisitorPassCard';
import { downloadVisitorBadge } from '@/lib/downloadVisitorBadge';
import { fetchVisitorPass, type VisitorPass } from '@/lib/api/passes';

export default function PassViewPage() {
  const params = useParams<{ code: string }>();
  const [pass, setPass] = useState<VisitorPass | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState('');

  useEffect(() => {
    if (!params?.code) return;
    fetchVisitorPass(params.code)
      .then((result) => setPass(result.pass))
      .catch((err) => setError(err instanceof Error ? err.message : 'Pass not found'));
  }, [params?.code]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <p className="text-sm font-medium text-slate-600">{error}</p>
      </div>
    );
  }

  if (!pass) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const downloadBadge = async () => {
    setDownloading(true);
    setDownloadMessage('');
    try {
      await downloadVisitorBadge(pass);
    } catch (err) {
      setDownloadMessage(err instanceof Error ? err.message : 'Could not download badge');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-400">DIEMEX 2026</p>
        <h1 className="mt-2 text-2xl font-black text-slate-900">Your Visitor Pass</h1>
        <div className="mt-8">
          <VisitorPassCard pass={pass} />
        </div>
        <button
          type="button"
          onClick={downloadBadge}
          disabled={downloading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F2F5C] py-3.5 text-sm font-bold text-white disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          {downloading ? 'Preparing badge…' : 'Download Badge'}
        </button>
        {downloadMessage ? <p className="mt-3 text-sm text-red-600">{downloadMessage}</p> : null}
      </div>
    </div>
  );
}
