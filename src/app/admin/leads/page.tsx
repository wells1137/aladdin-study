'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: '', label: '全部状态' },
    { value: 'new', label: '新线索' },
    { value: 'contacted', label: '已联系' },
    { value: 'closed', label: '已关闭' },
];

const STATUS_STYLE: Record<string, string> = {
    new: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    contacted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    closed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

type LeadItem = {
    id: number;
    type: string;
    name: string;
    contact: string;
    data: string;
    status: string;
    note: string | null;
    createdAt: string;
};

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<LeadItem[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        const params = new URLSearchParams({ page: String(page) });
        if (statusFilter) params.set('status', statusFilter);

        const res = await fetch(`/api/leads?${params}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLeads(data.leads || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
    }, [page, statusFilter]);

    useEffect(() => { fetchLeads(); }, [fetchLeads]);

    const updateLead = async (id: number, updates: { status?: string; note?: string }) => {
        const token = localStorage.getItem('auth_token');
        await fetch('/api/leads', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ id, ...updates }),
        });
        fetchLeads();
    };

    const parseData = (data: string) => {
        try { return JSON.parse(data); } catch { return {}; }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">线索管理</h1>
                <span className="text-sm text-slate-400">共 {total} 条线索</span>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                {STATUS_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => { setStatusFilter(opt.value); setPage(1); }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition ${statusFilter === opt.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                            }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">ID</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">姓名</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">联系方式</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">类型</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">时间</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">状态</th>
                                <th className="px-5 py-3 text-center text-xs font-medium text-slate-400 uppercase">详情</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads.map((lead) => (
                                <>
                                    <tr key={lead.id} className="hover:bg-white/5 transition">
                                        <td className="px-5 py-3 text-sm text-slate-500">#{lead.id}</td>
                                        <td className="px-5 py-3 text-sm text-white font-medium">{lead.name}</td>
                                        <td className="px-5 py-3 text-sm text-slate-400">{lead.contact}</td>
                                        <td className="px-5 py-3">
                                            <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${lead.type === 'assessment' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                                                }`}>
                                                {lead.type === 'assessment' ? '评估' : '咨询'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-500">{new Date(lead.createdAt).toLocaleDateString('zh-CN')}</td>
                                        <td className="px-5 py-3">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                                                className={`text-xs font-medium px-2 py-1 rounded-lg border bg-transparent cursor-pointer focus:outline-none ${STATUS_STYLE[lead.status] || STATUS_STYLE.new
                                                    }`}
                                            >
                                                <option value="new">新线索</option>
                                                <option value="contacted">已联系</option>
                                                <option value="closed">已关闭</option>
                                            </select>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <button
                                                onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                                                className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition"
                                            >
                                                {expandedId === lead.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedId === lead.id && (
                                        <tr key={`${lead.id}-detail`}>
                                            <td colSpan={7} className="px-5 py-4 bg-white/[0.02]">
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                                    {Object.entries(parseData(lead.data)).map(([key, value]) => (
                                                        <div key={key}>
                                                            <span className="text-slate-500 text-xs">{key}:</span>
                                                            <p className="text-slate-300">{String(value)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-3 pt-3 border-t border-white/5">
                                                    <label className="text-xs text-slate-500 block mb-1">备注</label>
                                                    <textarea
                                                        defaultValue={lead.note || ''}
                                                        placeholder="添加备注…"
                                                        rows={2}
                                                        className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500 transition placeholder:text-slate-600 resize-none"
                                                        onBlur={(e) => {
                                                            if (e.target.value !== (lead.note || '')) {
                                                                updateLead(lead.id, { note: e.target.value });
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                            {leads.length === 0 && (
                                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-500 text-sm">暂无线索</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

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
