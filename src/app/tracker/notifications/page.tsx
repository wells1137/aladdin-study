'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackerFetch } from '@/lib/trackerClient';

type Notification = {
  id: number;
  title: string;
  content: string | null;
  isRead: boolean;
  applicationId: number | null;
  createdAt: string;
};

export default function TrackerNotifications() {
  const [list, setList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterUnread, setFilterUnread] = useState(false);

  const load = () => {
    const url = filterUnread ? '/api/tracker/notifications?unreadOnly=true' : '/api/tracker/notifications';
    trackerFetch(url)
      .then((r) => r.json())
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [filterUnread]);

  const markRead = async (id: number) => {
    await trackerFetch('/api/tracker/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const markAllRead = async () => {
    await trackerFetch('/api/tracker/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ allRead: true }),
    });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">通知中心</h1>
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={filterUnread}
              onChange={(e) => setFilterUnread(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600"
            />
            仅未读
          </label>
          <button
            type="button"
            onClick={markAllRead}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            全部标为已读
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-200">
        {loading && (
          <div className="px-4 py-8 text-center text-slate-500">加载中…</div>
        )}
        {!loading && list.length === 0 && (
          <div className="px-4 py-8 text-center text-slate-500">暂无通知</div>
        )}
        {list.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 flex items-start justify-between gap-4 ${!n.isRead ? 'bg-emerald-50/50' : ''}`}
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-800">{n.title}</p>
              {n.content && <p className="text-sm text-slate-600 mt-0.5">{n.content}</p>}
              <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleString('zh-CN')}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {n.applicationId && (
                <Link
                  href={`/tracker/applications/${n.applicationId}`}
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  查看申请
                </Link>
              )}
              {!n.isRead && (
                <button
                  type="button"
                  onClick={() => markRead(n.id)}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  标为已读
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
