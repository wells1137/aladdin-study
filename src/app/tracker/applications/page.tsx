'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { trackerFetch } from '@/lib/trackerClient';

type Student = { id: number; name: string };
type University = { id: number; name: string; isActive: boolean };
type AppItem = {
  id: number;
  status: string;
  studentId: number;
  student: Student;
  university: University;
  updatedAt: string;
};

const STATUS_LABEL: Record<string, string> = {
  draft: '草稿',
  uploading: '上传中',
  under_review: '审核中',
  revision_needed: '需修改',
  approved: '已通过',
  rejected: '已拒绝',
};

export default function TrackerApplications() {
  const searchParams = useSearchParams();
  const studentIdParam = searchParams.get('studentId');
  const [apps, setApps] = useState<AppItem[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [createStudentId, setCreateStudentId] = useState<number | ''>(studentIdParam ? Number(studentIdParam) : '');
  const [createUniversityIds, setCreateUniversityIds] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      trackerFetch('/api/tracker/applications').then((r) => r.json()),
      trackerFetch('/api/tracker/students').then((r) => r.json()),
      trackerFetch('/api/tracker/universities').then((r) => r.json()),
    ])
      .then(([appList, studentList, uniList]) => {
        setApps(Array.isArray(appList) ? appList : []);
        setStudents(Array.isArray(studentList) ? studentList : []);
        setUniversities(Array.isArray(uniList) ? uniList.filter((u: University) => u.isActive) : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createStudentId || createUniversityIds.length === 0) {
      alert('请选择学生和至少一所院校');
      return;
    }
    setSubmitting(true);
    try {
      const res = await trackerFetch('/api/tracker/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: Number(createStudentId),
          universityIds: createUniversityIds,
        }),
      });
      if (res.ok) {
        setShowCreate(false);
        setCreateUniversityIds([]);
        const created = await res.json();
        setApps((prev) => [...(Array.isArray(created) ? created : [created]), ...prev]);
      } else {
        const err = await res.json();
        alert(err.error || '创建失败');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const toggleUni = (id: number) => {
    setCreateUniversityIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">申请管理</h1>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
        >
          新建申请
        </button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-800 mb-4">新建申请（可选多所院校）</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">选择学生 *</label>
              <select
                value={createStudentId}
                onChange={(e) => setCreateStudentId(e.target.value ? Number(e.target.value) : '')}
                className="w-full max-w-xs px-3 py-2 border border-slate-300 rounded-lg"
                required
              >
                <option value="">请选择</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">勾选院校 *</label>
              <div className="flex flex-wrap gap-2">
                {universities.map((u) => (
                  <label key={u.id} className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={createUniversityIds.includes(u.id)}
                      onChange={() => toggleUni(u.id)}
                      className="rounded border-slate-300 text-emerald-600"
                    />
                    <span className="text-sm text-slate-700">{u.name}</span>
                  </label>
                ))}
              </div>
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
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
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
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">学生</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">院校</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">状态</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">更新时间</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">加载中…</td>
              </tr>
            )}
            {!loading && apps.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  暂无申请，请先新建申请
                </td>
              </tr>
            )}
            {apps.map((app) => (
              <tr key={app.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{app.student?.name}</td>
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
                    查看详情
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
