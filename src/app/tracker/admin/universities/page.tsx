'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { trackerFetch } from '@/lib/trackerClient';

type University = {
  id: number;
  name: string;
  nameEn: string | null;
  type: string;
  country: string;
  isActive: boolean;
};

export default function AdminUniversitiesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [list, setList] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.replace('/tracker/dashboard');
      return;
    }
    trackerFetch('/api/tracker/universities?activeOnly=false')
      .then((r) => r.json())
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  if (user && !user.isAdmin) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">院校管理</h1>
      <p className="text-slate-600">系统已预设 6 所马来西亚院校；管理员可在此查看。软删除（停用）通过 API 支持。</p>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">名称</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">英文名</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">类型</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">国家</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">加载中…</td>
              </tr>
            )}
            {list.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{u.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{u.nameEn ?? '—'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{u.type === 'public' ? '公立' : '私立'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{u.country}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${u.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                    {u.isActive ? '启用了' : '已停用'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
