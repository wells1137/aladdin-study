import React, { useState, useEffect } from 'react';
import { X, Save, User, GraduationCap, Image as ImageIcon, MapPin, MessageCircle } from 'lucide-react';
import { useAuth } from './AuthContext';
import { MapItem } from '@/lib/mockMapData';

export type ProfileMode = 'view' | 'edit';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: ProfileMode;
    setMode: (mode: ProfileMode) => void;
    profileData: MapItem | null; // Data of the profile being viewed
}

export default function ProfileModal({ isOpen, onClose, mode, setMode, profileData }: ProfileModalProps) {
    const { user, updateProfile } = useAuth();

    // The owner is viewing their own profile if their ID matches the profile's authorId
    const isOwner = user && profileData && user.id === profileData.authorId;

    // View Mode State
    const displayAvatar = profileData?.avatarUrl || user?.avatarUrl;
    const displayName = profileData?.name || profileData?.title || user?.name || 'Aladdin Scholar';
    const displayUniversity = profileData?.subtitle || profileData?.university || user?.university || '';
    const displayStatus = profileData?.status;

    // Edit Mode Form State
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Sync Edit Form state when opening edit mode (Only owners can edit)
    useEffect(() => {
        if (isOpen && mode === 'edit' && user) {
            setName(user.name || '');
            setUniversity(user.university || '');
            setAvatarUrl(user.avatarUrl || '');
            setError(null);
        }
    }, [isOpen, mode, user]);

    if (!isOpen || !profileData) return null;

    const handleSave = async (e: React.FormEvent) => {
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
                updateProfile(updatedUser);

                // Update local profileData reference visually so it shows instantly on view switch back
                if (profileData) {
                    profileData.name = updatedUser.name;
                    profileData.title = updatedUser.name;
                    profileData.university = updatedUser.university;
                    profileData.subtitle = updatedUser.university;
                    profileData.avatarUrl = updatedUser.avatarUrl;
                }

                setMode('view'); // Go back to view state naturally
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

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div
                className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full z-10 backdrop-blur"
                    aria-label="关闭"
                >
                    <X className="w-4 h-4" />
                </button>

                {mode === 'view' && (
                    <div className="relative">
                        {/* Banner Background */}
                        <div className="h-28 bg-gradient-to-tr from-brand-primary to-blue-500 w-full relative">
                            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                        </div>

                        {/* Profile Info Display (主态 & 客态) */}
                        <div className="px-6 pb-6 pt-0 relative">
                            {/* Avatar pushing up into banner */}
                            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center -mt-12 mb-3 shadow-xl relative z-10 overflow-hidden mx-auto">
                                {displayAvatar ? (
                                    <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10 text-slate-400" />
                                )}
                                {displayStatus === 'online' && (
                                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                                )}
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-black text-white leading-tight flex items-center justify-center gap-2">
                                    {displayName}
                                    {isOwner && <span className="text-xs bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded-full font-bold ml-1 align-middle whitespace-nowrap">你本人</span>}
                                </h2>
                                <p className="text-slate-400 font-medium text-sm mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                                    {displayUniversity || '未填写院校'}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-col gap-3">
                                {isOwner ? (
                                    /* Owner View (主态): Can edit profile */
                                    <button
                                        onClick={() => setMode('edit')}
                                        className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    >
                                        <Save className="w-5 h-5" />
                                        <span>编辑资料</span>
                                    </button>
                                ) : (
                                    /* Guest View (客态): Can interact */
                                    <button
                                        onClick={() => alert('打招呼功能开发中!')}
                                        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand-primary-rgb),0.5)] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span>跟TA打个招呼 👋</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {mode === 'edit' && isOwner && (
                    <div className="p-6">
                        <div className="mb-6 text-center">
                            <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                                <Save className="w-5 h-5 text-brand-primary" /> 编辑个人主页
                            </h2>
                            <p className="text-sm text-slate-400 mt-1">完善信息让大家更好地认识你</p>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
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

                            {avatarUrl && (
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                    <img src={avatarUrl} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-white/20" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    <span className="text-xs text-slate-400">头像预览</span>
                                </div>
                            )}

                            <div className="flex gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setMode('view')}
                                    disabled={isLoading}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-colors border border-white/10"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex-[2] relative overflow-hidden bg-brand-primary text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-brand-primary/90'}`}
                                >
                                    {isLoading ? '保存中...' : '保存更改'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
