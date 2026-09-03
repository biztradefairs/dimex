'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { checkInVisitorPass, type VisitorPass } from '@/lib/api/passes';

function extractCode(decodedText: string) {
  const lines = decodedText.split('\n');
  const codeLine = lines.find((line) => line.toLowerCase().includes('code:'));
  if (codeLine) return codeLine.replace(/code:\s*/i, '').trim();
  try {
    const parsed = JSON.parse(decodedText);
    return parsed.code || parsed.registrationNumber || decodedText;
  } catch {
    return decodedText.trim();
  }
}

export default function PassScanPage() {
  const [result, setResult] = useState('');
  const [pass, setPass] = useState<VisitorPass | null>(null);
  const busyRef = useRef(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'pass-qr-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        if (busyRef.current) return;
        busyRef.current = true;
        try {
          const code = extractCode(decodedText);
          const data = await checkInVisitorPass(code);
          setPass(data.pass);
          setResult(data.message);
          scanner.clear().catch(() => undefined);
        } catch (error) {
          setResult(error instanceof Error ? error.message : 'Check-in failed');
          busyRef.current = false;
        }
      },
      () => undefined
    );

    return () => {
      scanner.clear().catch(() => undefined);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1F4B] px-4 py-10 text-white">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-black">Scan Visitor Pass</h1>
        <p className="mt-1 text-sm text-white/70">Point the camera at a DIEMEX visitor QR code.</p>
        <div id="pass-qr-reader" className="mt-6 overflow-hidden rounded-2xl bg-white p-3 text-slate-900" />
        {result ? (
          <div className="mt-5 rounded-2xl bg-white p-4 text-slate-800">
            <p className="font-bold">{result}</p>
            {pass ? (
              <p className="mt-1 text-sm text-slate-500">
                {pass.name} · {pass.company} · {pass.registrationNumber}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
