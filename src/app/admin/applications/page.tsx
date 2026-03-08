'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, FileCheck, Download } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: '', label: '全部状态' },
    { value: 'draft', label: '草稿' },
    { value: 'uploading', label: '上传中' },
    { value: 'under_review', label: '审核中' },
    { value: 'revision_needed', label: '需修改' },
    { value: 'approved', label: '已通过' },
    { value: 'rejected', label: '已拒绝' },
];

const STATUS_LABEL: Record<string, string> = {
    draft: '草稿',
    uploading: '上传中',
    under_review: '审核中',
    revision_needed: '需修改',
    approved: '已通过',
    rejected: '已拒绝',
};

const STATUS_STYLE: Record<string, string> = {
    draft: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    uploading: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    under_review: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    revision_needed: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const MATERIAL_STATUS_STYLE: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    approved: 'bg-emerald-500/20 text-emerald-400',
    rejected: 'bg-red-500/20 text-red-400',
    reupload_needed: 'bg-orange-500/20 text-orange-400',
};

type MaterialItem = {
    id: number;
    templateId: number;
    fileName: string;
    fileUrl: string;
    reviewStatus: string;
    createdAt: string;
};

type TemplateItem = {
    id: number;
    name: string;
    isRequired: boolean;
};

type AppItem = {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    completionRate: number;
    totalRequired: number;
    uploadedRequired: number;
    student: { id: number; name: string; email: string | null; phone: string | null };
    university: { id: number; name: string; nameEn: string | null; materialTemplates: TemplateItem[] };
    counselor: { id: number; name: string; email: string };
    materials: MaterialItem[];
};

type CounselorOption = { id: number; name: string; email: string };

export default function AdminApplicationsPage() {
    const [apps, setApps] = useState<AppItem[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [counselorFilter, setCounselorFilter] = useState('');
    const [counselors, setCounselors] = useState<CounselorOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const fetchApps = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        const params = new URLSearchParams({ page: String(page) });
        if (statusFilter) params.set('status', statusFilter);
        if (counselorFilter) params.set('counselorId', counselorFilter);

        const res = await fetch(`/api/admin/applications?${params}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setApps(data.applications || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        if (data.counselors) setCounselors(data.counselors);
        setLoading(false);
    }, [page, statusFilter, counselorFilter]);

    useEffect(() => { fetchApps(); }, [fetchApps]);

    const updateStatus = async (id: number, status: string) => {
        const token = localStorage.getItem('auth_token');
        await fetch('/api/admin/applications', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ id, status }),
        });
        fetchApps();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">材料进度</h1>
                <span className="text-sm text-slate-400">共 {total} 条申请</span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="flex gap-2 flex-wrap">
                    {STATUS_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => { setStatusFilter(opt.value); setPage(1); }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${statusFilter === opt.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
                {counselors.length > 0 && (
                    <select
                        value={counselorFilter}
                        onChange={(e) => { setCounselorFilter(e.target.value); setPage(1); }}
                        className="bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="">全部顾问</option>
                        {counselors.map((c) => (
                            <option key={c.id} value={String(c.id)}>{c.name} ({c.email})</option>
                        ))}
                    </select>
                )}
            </div>

            {/* Application Cards */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : apps.length === 0 ? (
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl py-16 text-center text-slate-500 text-sm">
                    暂无申请记录
                </div>
            ) : (
                <div className="space-y-3">
                    {apps.map((app) => (
                        <div key={app.id} className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition">
                            {/* Header Row */}
                            <div className="px-5 py-4 flex items-center gap-4">
                                {/* Student + University */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-white">{app.student.name}</span>
                                        <span className="text-xs text-slate-500">→</span>
                                        <span className="text-sm text-blue-400">{app.university.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                        <span>顾问: {app.counselor.name}</span>
                                        <span>·</span>
                                        <span>{new Date(app.updatedAt).toLocaleDateString('zh-CN')}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-32 shrink-0">
                                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                                        <span>{app.uploadedRequired}/{app.totalRequired}</span>
                                        <span className={app.completionRate === 100 ? 'text-emerald-400' : ''}>{app.completionRate}%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${app.completionRate === 100 ? 'bg-emerald-500' : app.completionRate > 50 ? 'bg-blue-500' : 'bg-amber-500'
                                                }`}
                                            style={{ width: `${app.completionRate}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <select
                                    value={app.status}
                                    onChange={(e) => updateStatus(app.id, e.target.value)}
                                    className={`text-xs font-medium px-2 py-1 rounded-lg border bg-transparent cursor-pointer focus:outline-none shrink-0 ${STATUS_STYLE[app.status] || STATUS_STYLE.draft
                                        }`}
                                >
                                    {STATUS_OPTIONS.filter((s) => s.value !== '').map((s) => (
                                        <option key={s.value} value={s.value}>{s.label}</option>
                                    ))}
                                </select>

                                {/* Expand */}
                                <button
                                    onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                                    className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition shrink-0"
                                >
                                    {expandedId === app.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                </button>
                            </div>

                            {/* Expanded: Material Checklist */}
                            {expandedId === app.id && (
                                <div className="px-5 pb-5 border-t border-white/5 pt-4">
                                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                        材料清单 ({app.materials.length} 已上传 / {app.university.materialTemplates.length} 总计)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {app.university.materialTemplates.map((tpl) => {
                                            const uploaded = app.materials.find((m) => m.templateId === tpl.id);
                                            return (
                                                <div
                                                    key={tpl.id}
                                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition ${uploaded
                                                            ? 'border-emerald-500/20 bg-emerald-500/5'
                                                            : 'border-white/5 bg-white/[0.02]'
                                                        }`}
                                                >
                                                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${uploaded ? 'bg-emerald-500/20' : 'bg-white/10'
                                                        }`}>
                                                        {uploaded ? (
                                                            <FileCheck size={12} className="text-emerald-400" />
                                                        ) : (
                                                            <div className="w-2 h-2 rounded-full bg-slate-600" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm ${uploaded ? 'text-white' : 'text-slate-500'}`}>
                                                            {tpl.name}
                                                            {tpl.isRequired && <span className="text-red-400 ml-1">*</span>}
                                                        </p>
                                                        {uploaded && (
                                                            <p className="text-xs text-slate-500 truncate">{uploaded.fileName}</p>
                                                        )}
                                                    </div>
                                                    {uploaded && (
                                                        <div className="flex items-center gap-2 shrink-0">
                                                            <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${MATERIAL_STATUS_STYLE[uploaded.reviewStatus] || MATERIAL_STATUS_STYLE.pending
                                                                }`}>
                                                                {uploaded.reviewStatus}
                                                            </span>
                                                            <a
                                                                href={uploaded.fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="p-1 text-slate-500 hover:text-blue-400 transition"
                                                            >
                                                                <Download size={12} />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Student Info */}
                                    <div className="mt-4 pt-3 border-t border-white/5 flex gap-6 text-xs text-slate-500">
                                        {app.student.email && <span>📧 {app.student.email}</span>}
                                        {app.student.phone && <span>📱 {app.student.phone}</span>}
                                        <span>🆔 申请ID: {app.id}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-2 text-slate-400 hover:text-white disabled:opacity-30 transition">
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm text-slate-400">{page} / {totalPages}</span>
                    <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-2 text-slate-400 hover:text-white disabled:opacity-30 transition">
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
