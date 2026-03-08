'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

type UserItem = {
    id: string;
    email: string;
    name: string;
    university: string | null;
    avatarUrl: string | null;
    role: string;
    createdAt: string;
    _count: { posts: number };
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<UserItem[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        const params = new URLSearchParams({ page: String(page) });
        if (search) params.set('search', search);

        const res = await fetch(`/api/admin/users?${params}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data.users || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
    }, [page, search]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearch(searchInput);
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`确定删除用户 "${name}" 吗？其所有帖子也将被删除。`)) return;
        const token = localStorage.getItem('auth_token');
        await fetch(`/api/admin/users?id=${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">用户管理</h1>
                <span className="text-sm text-slate-400">共 {total} 位用户</span>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-blue-500 transition placeholder:text-slate-500 text-sm"
                        placeholder="搜索用户名、邮箱、大学…"
                    />
                </div>
                <button type="submit" className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-500 transition">
                    搜索
                </button>
            </form>

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
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">用户</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">邮箱</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">大学</th>
                                <th className="px-5 py-3 text-center text-xs font-medium text-slate-400 uppercase">帖子</th>
                                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase">注册时间</th>
                                <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-white/5 transition">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            {u.avatarUrl ? (
                                                <img src={u.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-xs text-blue-400 font-bold">
                                                    {u.name[0]}
                                                </div>
                                            )}
                                            <span className="text-sm text-white font-medium">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-slate-400">{u.email}</td>
                                    <td className="px-5 py-3 text-sm text-slate-400">{u.university || '-'}</td>
                                    <td className="px-5 py-3 text-sm text-slate-400 text-center">{u._count.posts}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{new Date(u.createdAt).toLocaleDateString('zh-CN')}</td>
                                    <td className="px-5 py-3 text-right">
                                        <button
                                            onClick={() => handleDelete(u.id, u.name)}
                                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-500 text-sm">暂无用户</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="p-2 text-slate-400 hover:text-white disabled:opacity-30 transition"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm text-slate-400">
                        {page} / {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="p-2 text-slate-400 hover:text-white disabled:opacity-30 transition"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
