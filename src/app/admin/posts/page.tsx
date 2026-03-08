'use client';

import { useEffect, useState, useCallback } from 'react';
import { Trash2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const TYPE_OPTIONS = [
    { value: '', label: '全部类型' },
    { value: 'food', label: '🍜 美食' },
    { value: 'study_spot', label: '📚 学习地点' },
    { value: 'life', label: '🌟 生活' },
];

const TYPE_BADGE: Record<string, string> = {
    food: 'bg-orange-500/20 text-orange-400',
    study_spot: 'bg-blue-500/20 text-blue-400',
    life: 'bg-pink-500/20 text-pink-400',
};

type PostItem = {
    id: string;
    type: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    imageUrl: string | null;
    longitude: number;
    latitude: number;
    createdAt: string;
    author: { id: string; name: string; avatarUrl: string | null; university: string | null };
};

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [typeFilter, setTypeFilter] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        const params = new URLSearchParams({ page: String(page) });
        if (typeFilter) params.set('type', typeFilter);

        const res = await fetch(`/api/admin/posts?${params}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPosts(data.posts || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
    }, [page, typeFilter]);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`确定删除帖子 "${title}" 吗？`)) return;
        const token = localStorage.getItem('auth_token');
        await fetch(`/api/admin/posts?id=${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchPosts();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">内容管理</h1>
                <span className="text-sm text-slate-400">共 {total} 条帖子</span>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                {TYPE_OPTIONS.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => { setTypeFilter(opt.value); setPage(1); }}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition ${typeFilter === opt.value
                                ? 'bg-blue-600 text-white'
                                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                            }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {/* Cards */}
            {loading ? (
                <div className="flex justify-center py-16">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : posts.length === 0 ? (
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl py-16 text-center text-slate-500 text-sm">
                    暂无帖子
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {posts.map((p) => (
                        <div key={p.id} className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition group">
                            {p.imageUrl && (
                                <div className="h-36 overflow-hidden">
                                    <img src={p.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                            )}
                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${TYPE_BADGE[p.type] || 'bg-slate-500/20 text-slate-400'}`}>
                                        {p.type}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(p.id, p.title)}
                                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <h3 className="text-sm font-semibold text-white line-clamp-1">{p.title}</h3>
                                {p.subtitle && <p className="text-xs text-slate-400 line-clamp-1">{p.subtitle}</p>}
                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center text-[10px] text-blue-400 font-bold">
                                            {p.author.name[0]}
                                        </div>
                                        <span className="text-xs text-slate-400">{p.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <MapPin size={10} />
                                        <span>{p.latitude.toFixed(2)}, {p.longitude.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
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
