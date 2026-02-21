'use client';

import { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from './AuthContext';

interface StudentAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function StudentAuthModal({ isOpen, onClose }: StudentAuthModalProps) {
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        let result;
        if (isLogin) {
            result = await login(email, password);
        } else {
            result = await register(email, password, name, university);
        }

        setLoading(false);

        if (result.success) {
            // Reset and close
            setEmail('');
            setPassword('');
            setName('');
            setUniversity('');
            onClose();
        } else {
            setError(result.error || (isLogin ? '登录失败' : '注册失败'));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-md mx-4 bg-slate-900 border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-fade-in-up">

                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-brand-primary to-blue-600 p-6 flex flex-col justify-end">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h2 className="text-3xl font-black text-white tracking-tight">
                        {isLogin ? 'Welcome Back!' : 'Join Aladdin Social'}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                        {isLogin ? '进入阿拉仃留学生社区' : '与全马留学生分享你的足迹'}
                    </p>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Mode Toggle */}
                    <div className="flex bg-slate-800 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-brand-primary text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                        >
                            登录 Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-brand-primary text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                        >
                            注册 Register
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-slate-500"
                                placeholder="邮箱 Email"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-slate-500"
                                placeholder="密码 Password"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <>
                                <div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-slate-500"
                                        placeholder="昵称 Username"
                                        required={!isLogin}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        value={university}
                                        onChange={(e) => setUniversity(e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all placeholder:text-slate-500"
                                        placeholder="所在大学 University (Optional)"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all border border-transparent focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50"
                    >
                        {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                        {loading ? '处理中...' : (isLogin ? '进入社区' : '立即加入')}
                    </button>
                </form>
            </div>
        </div>
    );
}
