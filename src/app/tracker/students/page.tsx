'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { trackerFetch } from '@/lib/trackerClient';

type Student = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt: string;
};

export default function TrackerStudents() {
  const [list, setList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = () => {
    trackerFetch('/api/tracker/students')
      .then((r) => r.json())
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      const res = await trackerFetch('/api/tracker/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: '', email: '', phone: '' });
        setShowForm(false);
        load();
      } else {
        const err = await res.json();
        alert(err.error || '创建失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">学生管理</h1>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
        >
          新建学生
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">新建学生</h2>
          <form onSubmit={handleCreate} className="space-y-3 max-w-md">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">姓名 *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">邮箱</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">电话</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
              >
                {submitting ? '提交中…' : '创建'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">姓名</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">邮箱</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">电话</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">创建时间</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  加载中…
                </td>
              </tr>
            )}
            {!loading && list.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  暂无学生，请先新建学生
                </td>
              </tr>
            )}
            {list.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{s.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.email ?? '—'}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{s.phone ?? '—'}</td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  {new Date(s.createdAt).toLocaleDateString('zh-CN')}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/tracker/applications?studentId=${s.id}`}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    申请管理
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
