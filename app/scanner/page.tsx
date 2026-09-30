'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  fetchScannerSummary,
  scanVisitorPass,
  type ScannerSummary,
  type ScanResult,
} from '@/lib/api/passes';

const SCANNER_KEY = 'diemex_scanner_id';

function scannerId() {
  const existing = localStorage.getItem(SCANNER_KEY);
  if (existing) return existing;
  const created = crypto.randomUUID();
  localStorage.setItem(SCANNER_KEY, created);
  return created;
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatClock(value: string) {
  return new Date(value).toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function ScannerPage() {
  const regionId = 'diemex-scanner-camera';
  const cameraRef = useRef<Html5Qrcode | null>(null);
  const runningRef = useRef(false);
  const busyRef = useRef(false);
  const startRef = useRef<() => void>(() => undefined);
  const handleScanRef = useRef<(text: string) => void>(() => undefined);
  const [online, setOnline] = useState(true);
  const [ready, setReady] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [summary, setSummary] = useState<ScannerSummary | null>(null);
  const [outcome, setOutcome] = useState<ScanResult | null>(null);
  const [notice, setNotice] = useState('');

  const loadSummary = useCallback(async () => {
    try {
      const data = await fetchScannerSummary();
      setSummary(data);
      setOnline(true);
    } catch {
      setOnline(false);
    }
  }, []);

  const stopCamera = useCallback(async () => {
    const camera = cameraRef.current;
    if (!camera || !runningRef.current) return;
    runningRef.current = false;
    try {
      await camera.stop();
    } catch {
      // Camera may already be stopped.
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (runningRef.current || busyRef.current) return;
    const camera = cameraRef.current;
    if (!camera) return;

    try {
      await camera.start(
        { facingMode: 'environment' },
        { fps: 8, qrbox: { width: 220, height: 220 } },
        (text) => {
          handleScanRef.current(text);
        },
        () => undefined
      );
      runningRef.current = true;
      setReady(true);
      setCameraError('');
    } catch {
      setCameraError('Allow camera access to scan visitor passes.');
      setReady(false);
    }
  }, []);

  useEffect(() => {
    startRef.current = () => {
      startCamera();
    };
  }, [startCamera]);

  useEffect(() => {
    handleScanRef.current = async (decodedText: string) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setNotice('');
      await stopCamera();

      const resume = (delay: number) => {
        window.setTimeout(() => {
          setOutcome(null);
          setNotice('');
          busyRef.current = false;
          startRef.current();
        }, delay);
      };

      try {
        const result = await scanVisitorPass(decodedText, scannerId());
        setOutcome(result);
        await loadSummary();
        resume(result.duplicate ? 1200 : 1700);
      } catch (error) {
        setNotice(error instanceof Error ? error.message : 'Invalid Pass');
        resume(1400);
      }
    };
  }, [loadSummary, stopCamera]);

  useEffect(() => {
    const camera = new Html5Qrcode(regionId);
    cameraRef.current = camera;
    loadSummary();
    const timer = window.setInterval(loadSummary, 15000);
    startCamera();

    return () => {
      window.clearInterval(timer);
      runningRef.current = false;
      camera.stop().catch(() => undefined).finally(() => {
        camera.clear();
      });
    };
  }, [loadSummary, startCamera]);

  const today = summary?.today;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-900">
      <header className="bg-[#004A96] px-5 py-4 text-white">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <div>
            <p className="text-lg font-black tracking-wide">DIEMEX 2027</p>
            <p className="text-xs font-semibold tracking-[0.16em] text-white/75">VISITOR SCANNER</p>
          </div>
          <p className="text-xs font-semibold">
            <span className={`mr-1 inline-block h-2 w-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-amber-300'}`} />
            {online ? 'Online' : 'Offline'}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-5">
        <div className="relative overflow-hidden rounded-3xl bg-[#0F2F5C] p-4 shadow-lg">
          <div id={regionId} className="min-h-[280px] overflow-hidden rounded-2xl bg-black" />
          {!ready && !cameraError ? (
            <p className="absolute inset-0 flex items-center justify-center text-sm text-white/80">Starting camera…</p>
          ) : null}
          {cameraError ? <p className="mt-3 text-center text-sm text-amber-200">{cameraError}</p> : null}
          <p className="mt-4 text-center text-sm font-semibold text-white">
            {notice || (ready ? 'Ready to scan' : 'Camera unavailable')}
          </p>
          <p className="mt-1 text-center text-xs text-white/70">Point the camera at the visitor QR</p>

          {outcome ? (
            <div className="absolute inset-3 flex flex-col items-center justify-center rounded-2xl bg-white px-6 text-center text-slate-900">
              <p className={`text-4xl ${outcome.duplicate ? 'text-amber-500' : 'text-emerald-600'}`}>
                {outcome.duplicate ? '!' : '✓'}
              </p>
              <p className="mt-2 text-xl font-black tracking-wide">
                {outcome.duplicate ? 'JUST SCANNED' : 'ACCESS ALLOWED'}
              </p>
              <p className="mt-4 text-2xl font-black uppercase">{outcome.visitor.name}</p>
              <p className="text-sm font-semibold text-slate-500">{outcome.visitor.company}</p>
              <p className="mt-3 text-sm font-bold text-[#004A96]">{outcome.visitor.registrationNumber}</p>
              {!outcome.duplicate ? (
                <div className="mt-4 text-sm text-slate-600">
                  <p>Today&apos;s visit: #{outcome.todayVisit}</p>
                  <p>Event visits: #{outcome.eventVisits}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">This scan was ignored.</p>
              )}
              <p className="mt-3 text-xs font-semibold text-slate-400">{formatClock(outcome.scannedAt)}</p>
            </div>
          ) : null}
        </div>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold tracking-[0.16em] text-slate-400">TODAY</p>
          <div className="mt-4 grid grid-cols-3 text-center">
            <div>
              <p className="text-2xl font-black text-[#004A96]">{today?.scans ?? 0}</p>
              <p className="text-xs text-slate-500">Scans</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#004A96]">{today?.visitors ?? 0}</p>
              <p className="text-xs text-slate-500">Visitors</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#004A96]">{today?.repeat ?? 0}</p>
              <p className="text-xs text-slate-500">Repeat</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-xs font-bold tracking-[0.16em] text-slate-400">RECENT SCANS</p>
          <div className="mt-3 divide-y divide-slate-100">
            {summary?.recent?.length ? summary.recent.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between py-2.5 text-sm">
                <p className="font-semibold">✓ {scan.name}</p>
                <p className="text-slate-400">{formatTime(scan.scannedAt)}</p>
              </div>
            )) : (
              <p className="py-3 text-sm text-slate-400">No scans yet today.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
