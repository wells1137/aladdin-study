'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackerFetch } from '@/lib/trackerClient';

type Stats = {
  total: number;
  draft: number;
  uploading: number;
  under_review: number;
  revision_needed: number;
  approved: number;
  rejected: number;
};

type AppItem = {
  id: number;
  status: string;
  updatedAt: string;
  student: { name: string };
  university: { name: string };
};

const STATUS_LABEL: Record<string, string> = {
  draft: '草稿',
  uploading: '上传中',
  under_review: '审核中',
  revision_needed: '需修改',
  approved: '已通过',
  rejected: '已拒绝',
};

export default function TrackerDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    Promise.all([
      trackerFetch('/api/tracker/dashboard-stats').then((r) => r.json()),
      trackerFetch('/api/tracker/applications').then((r) => r.json()),
    ])
      .then(([s, list]) => {
        setStats(s);
        setApps(Array.isArray(list) ? list.slice(0, 10) : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-slate-500">加载中…</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">工作台</h1>
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { key: 'total', label: '全部', value: stats.total },
            { key: 'draft', label: '草稿', value: stats.draft },
            { key: 'uploading', label: '上传中', value: stats.uploading },
            { key: 'under_review', label: '审核中', value: stats.under_review },
            { key: 'revision_needed', label: '需修改', value: stats.revision_needed },
            { key: 'approved', label: '已通过', value: stats.approved },
            { key: 'rejected', label: '已拒绝', value: stats.rejected },
          ].map(({ key, label, value }) => (
            <div key={key} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-2xl font-semibold text-slate-800">{value}</p>
            </div>
          ))}
        </div>
      )}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold text-slate-800">最近申请</h2>
          <Link
            href="/tracker/applications"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            查看全部
          </Link>
        </div>
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">学生</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">院校</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">状态</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">更新时间</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-slate-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {apps.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  暂无申请记录
                </td>
              </tr>
            )}
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-800">{app.student?.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{app.university?.name}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                    {STATUS_LABEL[app.status] ?? app.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {new Date(app.updatedAt).toLocaleString('zh-CN')}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/tracker/applications/${app.id}`}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    查看
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
