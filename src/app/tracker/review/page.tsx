'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { trackerFetch } from '@/lib/trackerClient';

type AppItem = {
  id: number;
  status: string;
  adminNotes: string | null;
  student: { name: string; email?: string };
  university: { name: string };
  materials: { id: number; templateId: number; fileName: string; fileUrl: string; reviewStatus: string; reviewComment: string | null }[];
  updatedAt: string;
};

export default function TrackerReviewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);
  const [reviewing, setReviewing] = useState<number | null>(null);
  const [reviewComments, setReviewComments] = useState<Record<number, string>>({});
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.replace('/tracker/dashboard');
      return;
    }
    trackerFetch('/api/tracker/applications?status=under_review')
      .then((r) => r.json())
      .then((list) => setApps(Array.isArray(list) ? list : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  const updateStatus = async (appId: number, status: string) => {
    setUpdatingStatus(appId);
    try {
      const res = await trackerFetch(`/api/tracker/applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      });
      if (res.ok) {
        setApps((prev) => prev.filter((a) => a.id !== appId));
      } else {
        const err = await res.json();
        alert(err.error || '更新失败');
      }
    } finally {
      setUpdatingStatus(null);
    }
  };

  const submitMaterialReview = async (materialId: number, status: string) => {
    const reviewComment = reviewComments[materialId] ?? '';
    setReviewing(materialId);
    try {
      const res = await trackerFetch('/api/tracker/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: materialId, status, reviewComment }),
      });
      if (res.ok) {
        setReviewComments((prev) => ({ ...prev, [materialId]: '' }));
        setApps((prev) =>
          prev.map((a) => ({
            ...a,
            materials: a.materials.map((m) =>
              m.id === materialId ? { ...m, reviewStatus: status, reviewComment } : m
            ),
          }))
        );
      } else {
        const err = await res.json();
        alert(err.error || '操作失败');
      }
    } finally {
      setReviewing(null);
    }
  };

  if (user && !user.isAdmin) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">材料审核</h1>
      <p className="text-slate-600">以下为状态为「审核中」的申请，请逐项审核材料并更新整体状态。</p>

      {loading && <p className="text-slate-500">加载中…</p>}
      {!loading && apps.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
          当前没有待审核的申请
        </div>
      )}

      {apps.map((app) => (
        <div key={app.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <div>
              <span className="font-medium text-slate-800">{app.student?.name}</span>
              <span className="text-slate-500 mx-2">·</span>
              <span className="text-slate-600">{app.university?.name}</span>
            </div>
            <Link href={`/tracker/applications/${app.id}`} className="text-sm text-emerald-600 hover:text-emerald-700">
              查看详情
            </Link>
          </div>
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">管理员备注（更新状态时一并发送给顾问）</label>
              <input
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="选填"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['approved', 'revision_needed', 'rejected'].map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={updatingStatus === app.id}
                  onClick={() => updateStatus(app.id, status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : status === 'revision_needed'
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                  } disabled:opacity-50`}
                >
                  {status === 'approved' ? '通过' : status === 'revision_needed' ? '需修改' : '拒绝'}
                </button>
              ))}
            </div>
          </div>
          <ul className="border-t border-slate-200 divide-y divide-slate-100">
            {app.materials.map((m) => (
              <li key={m.id} className="px-4 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <a href={m.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-emerald-600 hover:underline truncate block">
                    {m.fileName}
                  </a>
                  <span className="text-xs text-slate-500">审核状态：{m.reviewStatus}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="text"
                    placeholder="审核意见"
                    value={reviewComments[m.id] ?? ''}
                    onChange={(e) => setReviewComments((prev) => ({ ...prev, [m.id]: e.target.value }))}
                    className="w-32 px-2 py-1 border border-slate-300 rounded text-sm"
                  />
                  <button
                    type="button"
                    disabled={reviewing === m.id}
                    onClick={() => submitMaterialReview(m.id, 'approved')}
                    className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded hover:bg-emerald-200"
                  >
                    通过
                  </button>
                  <button
                    type="button"
                    disabled={reviewing === m.id}
                    onClick={() => submitMaterialReview(m.id, 'rejected')}
                    className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    拒绝
                  </button>
                  <button
                    type="button"
                    disabled={reviewing === m.id}
                    onClick={() => submitMaterialReview(m.id, 'reupload_needed')}
                    className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded hover:bg-amber-200"
                  >
                    需重传
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
