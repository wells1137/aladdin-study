'use client';

import { useAuth } from '@/components/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const TRACKER_NAV = [
  { href: '/tracker/dashboard', label: '工作台' },
  { href: '/tracker/students', label: '学生管理' },
  { href: '/tracker/applications', label: '申请管理' },
  { href: '/tracker/notifications', label: '通知中心' },
];

const ADMIN_NAV = [
  { href: '/tracker/review', label: '材料审核' },
  { href: '/tracker/admin/universities', label: '院校管理' },
  { href: '/tracker/admin/materials', label: '材料配置' },
  { href: '/tracker/admin/feishu', label: '飞书同步' },
];

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export default function TrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPartner, loading, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user?.isAdmin === true;

  useEffect(() => {
    if (loading) return;
    if (!isPartner && pathname !== '/tracker/login') {
      router.replace('/tracker/login');
      return;
    }
  }, [loading, isPartner, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500">加载中…</p>
      </div>
    );
  }
  // Login page: render directly without sidebar
  if (pathname === '/tracker/login') {
    return <>{children}</>;
  }

  if (!isPartner) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col shrink-0 fixed top-0 left-0 h-screen z-40">
        <div className="p-4 border-b border-slate-200">
          <Link href="/" className="text-lg font-semibold text-slate-800 hover:text-emerald-600">
            阿拉仃教育
          </Link>
          <p className="text-xs text-slate-500 mt-1">申请材料跟踪系统</p>
        </div>
        <nav className="p-2 flex-1 overflow-auto">
          {TRACKER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                pathname === item.href
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <>
              <div className="my-2 border-t border-slate-200 pt-2">
                <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">管理</p>
              </div>
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                    pathname === item.href
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </nav>
        <div className="p-3 border-t border-slate-200">
          <p className="text-xs text-slate-500 truncate">{user?.name ?? '顾问'}</p>
          <p className="text-xs text-slate-400">{isAdmin ? '管理员' : '顾问'}</p>
          <Link
            href="/"
            className="mt-2 block text-xs text-slate-500 hover:text-slate-700"
          >
            返回官网
          </Link>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('auth_token');
              window.location.href = '/tracker/login';
            }}
            className="mt-1 block text-xs text-red-500 hover:text-red-700"
          >
            退出登录
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6 ml-56">{children}</main>
    </div>
  );
}
