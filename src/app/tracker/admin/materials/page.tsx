'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthContext';
import { trackerFetch } from '@/lib/trackerClient';

type University = { id: number; name: string };
type MaterialTemplate = {
  id: number;
  universityId: number;
  name: string;
  nameEn: string | null;
  category: string;
  isRequired: boolean;
  sortOrder: number;
};

const CATEGORY_LABEL: Record<string, string> = {
  academic: '学术',
  identity: '身份',
  financial: '财务',
  language: '语言',
  other: '其他',
};

export default function AdminMaterialsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniId, setSelectedUniId] = useState<number | ''>('');
  const [templates, setTemplates] = useState<MaterialTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !user.isAdmin) {
      router.replace('/tracker/dashboard');
      return;
    }
    trackerFetch('/api/tracker/universities')
      .then((r) => r.json())
      .then((list) => {
        setUniversities(list);
        if (list.length > 0 && !selectedUniId) setSelectedUniId(list[0].id);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  useEffect(() => {
    if (!selectedUniId) {
      setTemplates([]);
      return;
    }
    trackerFetch(`/api/tracker/material-templates?universityId=${selectedUniId}`)
      .then((r) => r.json())
      .then(setTemplates)
      .catch(console.error);
  }, [selectedUniId]);

  if (user && !user.isAdmin) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">材料配置</h1>
      <p className="text-slate-600">按院校查看材料要求模板；管理员可通过 API 添加/修改/删除。</p>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">选择院校</label>
        <select
          value={selectedUniId}
          onChange={(e) => setSelectedUniId(e.target.value ? Number(e.target.value) : '')}
          className="px-3 py-2 border border-slate-300 rounded-lg"
        >
          <option value="">请选择</option>
          {universities.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">材料名称</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">分类</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">必需</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">排序</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {templates.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  {selectedUniId ? '该院校暂无材料配置或加载中' : '请先选择院校'}
                </td>
              </tr>
            )}
            {templates.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{t.name}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{CATEGORY_LABEL[t.category] ?? t.category}</td>
                <td className="px-4 py-3 text-sm">{t.isRequired ? '是' : '否'}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{t.sortOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
