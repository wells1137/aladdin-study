'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { trackerFetch } from '@/lib/trackerClient';

type Log = {
  id: number;
  applicationId: number;
  syncType: string;
  status: string;
  requestPayload: string | null;
  responseData: string | null;
  createdAt: string;
};

export default function AdminFeishuPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [list, setList] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.replace('/tracker/dashboard');
      return;
    }
    trackerFetch('/api/tracker/feishu-logs')
      .then((r) => r.json())
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  if (user && !user.isAdmin) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">飞书同步日志</h1>
      <p className="text-slate-600">当前为 Mock 模式，仅记录同步类型与请求内容；正式接入飞书 API 后在此查看最近 100 条日志。</p>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">申请 ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">同步类型</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">状态</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">加载中…</td>
              </tr>
            )}
            {!loading && list.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">暂无同步记录</td>
              </tr>
            )}
            {list.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-800">{log.applicationId}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{log.syncType}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                    log.status === 'success' ? 'bg-emerald-100 text-emerald-800' : log.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{new Date(log.createdAt).toLocaleString('zh-CN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
