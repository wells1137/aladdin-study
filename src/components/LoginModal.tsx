'use client';

import { useState } from 'react';
import { X, Lock, LogIn } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(username, password);
        setLoading(false);

        if (result.success) {
            setUsername('');
            setPassword('');
            onClose();
        } else {
            setError(result.error || '登录失败');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-md mx-4 bg-white border-4 border-black shadow-[12px_12px_0px_0px_#C41E3A]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 bg-black text-white">
                    <div className="flex items-center gap-3">
                        <Lock className="w-6 h-6 text-[#FFD700]" />
                        <h2 className="text-2xl font-black uppercase tracking-tight">合作伙伴登录</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <p className="text-sm font-bold text-slate-600 border-l-4 border-[#FFD700] pl-3">
                        此资料仅供阿拉丁教育合作伙伴访问。请使用您的合作伙伴账号登录。
                    </p>

                    {error && (
                        <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 font-bold text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-black text-black uppercase mb-2">
                            用户名
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border-3 border-black font-bold text-black focus:outline-none focus:border-[#C41E3A] focus:shadow-[4px_4px_0px_0px_#C41E3A] transition-all"
                            placeholder="请输入合作伙伴账号"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black text-black uppercase mb-2">
                            密码
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border-3 border-black font-bold text-black focus:outline-none focus:border-[#C41E3A] focus:shadow-[4px_4px_0px_0px_#C41E3A] transition-all"
                            placeholder="请输入密码"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white font-black uppercase tracking-wider text-lg hover:bg-[#C41E3A] transition-colors border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <LogIn className="w-5 h-5" />
                        {loading ? '验证中...' : '登录'}
                    </button>
                </form>
            </div>
        </div>
    );
}
