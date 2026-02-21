import React, { useState, useEffect } from 'react';
import { X, Save, User, GraduationCap, Image as ImageIcon } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function EditProfileModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { user, updateProfile } = useAuth();

    // Internal state to hold form values
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync state with context when modal opens or user changes
    useEffect(() => {
        if (isOpen && user) {
            setName(user.name || '');
            setUniversity(user.university || '');
            setAvatarUrl(user.avatarUrl || '');
            setError(null);
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name, university, avatarUrl })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                updateProfile(updatedUser); // Update global context immediately
                onClose(); // Close modal
            } else {
                const data = await res.json();
                setError(data.error || '更新失败');
            }
        } catch (err) {
            setError('网络错误，请稍后再试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 z-10"
                    aria-label="关闭"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6">
                    <div className="mb-6 text-center">
                        <div className="w-16 h-16 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-3 border border-brand-primary/30">
                            <User className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-white">编辑个人主页</h2>
                        <p className="text-sm text-slate-400 mt-1">完善信息让校友更容易认识你</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                                <User className="w-4 h-4" /> 昵称 / 姓名
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                                placeholder="输入你的名称"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" /> 就读院校
                            </label>
                            <input
                                type="text"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                                placeholder="例如：马来亚大学 (UM)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" /> 头像链接 (可选)
                            </label>
                            <input
                                type="url"
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                                placeholder="贴入图片URL链接..."
                            />
                        </div>

                        {/* Avatar Preview */}
                        {avatarUrl && (
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                <img src={avatarUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-white/20" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                <span className="text-xs text-slate-400">头像预览</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full relative group overflow-hidden bg-brand-primary text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-primary/90'}`}
                        >
                            <Save className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
                            <span className="relative z-10">{isLoading ? '保存中...' : '保存更改'}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
