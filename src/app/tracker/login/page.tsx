'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

export default function TrackerLoginPage() {
  const { isPartner, loading, login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isPartner) {
      router.replace('/tracker/dashboard');
    }
  }, [loading, isPartner, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await login(username, password);
    setSubmitting(false);

    if (result.success) {
      router.push('/tracker/dashboard');
    } else {
      setError(result.error || '登录失败，请检查账号密码');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50">
        <p className="text-slate-500">加载中…</p>
      </div>
    );
  }

  if (isPartner) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          返回官网
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-8 text-center">
            <div className="relative h-12 w-44 mx-auto mb-4">
              <Image src="/logo-new.png" alt="阿拉仃教育" fill className="object-contain" />
            </div>
            <h1 className="text-xl font-bold text-white">申请材料跟踪系统</h1>
            <p className="text-emerald-100 text-sm mt-1">合作伙伴 / 顾问登录</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <span className="shrink-0 mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                账号
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                placeholder="请输入合作伙伴账号"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
                placeholder="请输入密码"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <LogIn className="w-5 h-5" />
              {submitting ? '登录中…' : '登录'}
            </button>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                此系统仅供阿拉仃教育合作伙伴（顾问）使用。<br />
                如需开通账号，请联系管理员。
              </p>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Aladdin Education · 申请材料跟踪系统
        </p>
      </div>
    </div>
  );
}
