'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ScannerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && (!isAuthenticated || !user)) {
      router.replace('/admin/login?next=/scanner');
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !isAuthenticated || !user) {
    return <div className="flex min-h-screen items-center justify-center text-slate-600">Checking staff access…</div>;
  }
  if (!['admin', 'editor'].includes(user.role)) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-xl font-bold">Scanner access required</h1>
        <p className="mt-3 text-slate-600">Ask an administrator for an active admin or editor account.</p>
        <Link href="/admin/login?next=/scanner" className="mt-5 inline-block text-blue-700">Sign in with another account</Link>
      </div>
    );
  }
  return children;
}
