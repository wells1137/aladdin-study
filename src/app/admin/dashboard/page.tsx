'use client';

import { useEffect, useState } from 'react';
import { Users, FileText, MessageSquare, FolderOpen, TrendingUp } from 'lucide-react';

type Stats = {
    users: { total: number; newWeek: number };
    posts: { total: number; newWeek: number };
    leads: { total: number; newWeek: number };
    applications: { total: number; byStatus: Record<string, number> };
    recentUsers: { id: string; name: string; email: string; university: string | null; createdAt: string }[];
    recentLeads: { id: number; name: string; contact: string; type: string; status: string; createdAt: string }[];
};

function StatCard({
    icon: Icon,
    label,
    total,
    newWeek,
    color,
}: {
    icon: React.ElementType;
    label: string;
    total: number;
    newWeek: number;
    color: string;
}) {
    return (
        <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-5 hover:border-white/20 transition">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl ${color}`}>
                    <Icon size={18} className="text-white" />
                </div>
                <span className="text-sm text-slate-400">{label}</span>
            </div>
            <p className="text-3xl font-bold text-white">{total}</p>
            {newWeek > 0 && (
                <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
                    <TrendingUp size={12} />
                    <span>本周 +{newWeek}</span>
                </div>
            )}
        </div>
    );
}

const STATUS_COLORS: Record<string, string> = {
    new: 'bg-yellow-500/20 text-yellow-400',
    contacted: 'bg-blue-500/20 text-blue-400',
    closed: 'bg-slate-500/20 text-slate-400',
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) return;
        fetch('/api/admin/stats', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => r.json())
            .then(setStats)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-3 text-slate-400 py-20 justify-center">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                加载中…
            </div>
        );
    }

    if (!stats) return <p className="text-red-400">加载失败</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-white">数据概览</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users} label="注册用户" total={stats.users.total} newWeek={stats.users.newWeek} color="bg-blue-600/30" />
                <StatCard icon={FileText} label="社区帖子" total={stats.posts.total} newWeek={stats.posts.newWeek} color="bg-purple-600/30" />
                <StatCard icon={MessageSquare} label="咨询线索" total={stats.leads.total} newWeek={stats.leads.newWeek} color="bg-amber-600/30" />
                <StatCard icon={FolderOpen} label="申请总数" total={stats.applications.total} newWeek={0} color="bg-emerald-600/30" />
            </div>

            {/* App status breakdown */}
            {Object.keys(stats.applications.byStatus).length > 0 && (
                <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-5">
                    <h2 className="text-sm font-semibold text-slate-300 mb-3">申请状态分布</h2>
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(stats.applications.byStatus).map(([st, cnt]) => (
                            <div key={st} className="bg-white/5 rounded-xl px-4 py-2 text-center min-w-[80px]">
                                <p className="text-lg font-bold text-white">{cnt}</p>
                                <p className="text-xs text-slate-400">{st}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">最近注册</h2>
                    </div>
                    <div className="divide-y divide-white/5">
                        {stats.recentUsers.map((u) => (
                            <div key={u.id} className="px-5 py-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white font-medium">{u.name}</p>
                                    <p className="text-xs text-slate-500">{u.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400">{u.university || '-'}</p>
                                    <p className="text-xs text-slate-600">{new Date(u.createdAt).toLocaleDateString('zh-CN')}</p>
                                </div>
                            </div>
                        ))}
                        {stats.recentUsers.length === 0 && (
                            <p className="px-5 py-6 text-sm text-slate-500 text-center">暂无用户</p>
                        )}
                    </div>
                </div>

                {/* Recent Leads */}
                <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">最近线索</h2>
                    </div>
                    <div className="divide-y divide-white/5">
                        {stats.recentLeads.map((l) => (
                            <div key={l.id} className="px-5 py-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white font-medium">{l.name}</p>
                                    <p className="text-xs text-slate-500">{l.contact}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${STATUS_COLORS[l.status] || 'bg-slate-500/20 text-slate-400'}`}>
                                        {l.status}
                                    </span>
                                    <p className="text-xs text-slate-600 mt-1">{new Date(l.createdAt).toLocaleDateString('zh-CN')}</p>
                                </div>
                            </div>
                        ))}
                        {stats.recentLeads.length === 0 && (
                            <p className="px-5 py-6 text-sm text-slate-500 text-center">暂无线索</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
