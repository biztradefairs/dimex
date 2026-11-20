"use client";
import { useState } from "react";
import Image from "next/image";
import { Building } from "lucide-react";

export default function ExhibitorLogo({ logoUrl, company, className = "h-12 w-12" }: {
  logoUrl?: string; company: string; className?: string;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  return (
    <span className={"relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white " + className}>
      {logoUrl && failedUrl !== logoUrl
        ? <Image unoptimized src={logoUrl} alt={company + " logo"} fill sizes="96px" className="object-contain p-1.5" onError={() => setFailedUrl(logoUrl)} />
        : <Building aria-label="No company logo" className="h-5 w-5 text-slate-300" />}
    </span>
  );
}
