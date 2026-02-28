'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackerHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/tracker/dashboard');
  }, [router]);
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <p className="text-slate-500">跳转中…</p>
    </div>
  );
}
