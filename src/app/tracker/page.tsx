'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';

export default function TrackerHome() {
  const { isPartner, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (isPartner) {
      router.replace('/tracker/dashboard');
    } else {
      router.replace('/tracker/login');
    }
  }, [loading, isPartner, router]);
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <p className="text-slate-500">跳转中…</p>
    </div>
  );
}
