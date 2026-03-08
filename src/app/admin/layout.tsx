'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    MessageSquare,
    FolderOpen,
    LogOut,
    ChevronLeft,
    Menu,
} from 'lucide-react';

const NAV_ITEMS = [
    { href: '/admin/dashboard', label: '数据概览', icon: LayoutDashboard },
    { href: '/admin/users', label: '用户管理', icon: Users },
    { href: '/admin/posts', label: '内容管理', icon: FileText },
    { href: '/admin/leads', label: '线索管理', icon: MessageSquare },
    { href: '/admin/applications', label: '材料进度', icon: FolderOpen },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token && pathname !== '/admin') {
            router.replace('/admin');
        } else if (token) {
            fetch('/api/auth', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((r) => r.json())
                .then((d) => {
                    if (d.authenticated && (d.role === 'partner' || d.role === 'admin')) {
                        setAuthenticated(true);
                    } else {
                        localStorage.removeItem('auth_token');
                        if (pathname !== '/admin') router.replace('/admin');
                    }
                })
                .catch(() => {
                    if (pathname !== '/admin') router.replace('/admin');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [pathname, router]);

    // Login page — render without sidebar
    if (pathname === '/admin') {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-400">加载中…</span>
                </div>
            </div>
        );
    }

    if (!authenticated) return null;

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen z-40 flex flex-col border-r border-white/10 bg-slate-900/80 backdrop-blur-xl transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                    {!collapsed && (
                        <span className="text-lg font-bold text-white tracking-tight">
                            🧞 运营后台
                        </span>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                    >
                        {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-4 px-2 space-y-1 overflow-auto">
                    {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                title={label}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active
                                        ? 'bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} className="shrink-0" />
                                {!collapsed && <span>{label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-3 border-t border-white/10">
                    <Link
                        href="/"
                        className={`flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-slate-300 transition ${collapsed ? 'justify-center' : ''
                            }`}
                    >
                        {!collapsed && '返回官网'}
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem('auth_token');
                            router.push('/admin');
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:text-red-300 transition rounded-lg hover:bg-red-500/10 ${collapsed ? 'justify-center' : ''
                            }`}
                    >
                        <LogOut size={14} />
                        {!collapsed && '退出登录'}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'
                    }`}
            >
                <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
