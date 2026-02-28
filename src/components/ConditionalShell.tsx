'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTracker = pathname.startsWith('/tracker');

  if (isTracker) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
