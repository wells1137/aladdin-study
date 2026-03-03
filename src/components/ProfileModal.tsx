import React, { useState, useEffect } from 'react';
import { X, Save, User, GraduationCap, Image as ImageIcon, MapPin, MessageCircle, Briefcase, Calendar, Info } from 'lucide-react';
import { useAuth } from './AuthContext';
import { MapItem, MapItemType } from '@/lib/mockMapData';
import { useRouter } from 'next/navigation';

export type ProfileMode = 'view' | 'edit'; // Kept 'edit' in type signature for prop compatibility, but it will redirect.

interface ExtendedMapItem extends Omit<MapItem, 'author'> {
    major?: string;
    enrollmentYear?: number;
    bio?: string;
    wechatId?: string;
    author?: any;
}

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: ProfileMode;
    setMode: (mode: ProfileMode) => void;
    profileData: ExtendedMapItem | null; // Data of the profile being viewed
}

export default function ProfileModal({ isOpen, onClose, mode, setMode, profileData }: ProfileModalProps) {
    const { user, isStudent } = useAuth();
    const router = useRouter();

    // The owner is viewing their own profile if their ID matches the profile's authorId
    const isOwner = user && profileData && user.id === profileData.authorId;

    // View Mode State
    const displayAvatar = profileData?.avatarUrl || (isOwner ? user?.avatarUrl : '');
    const displayName = profileData?.name || profileData?.title || (isOwner ? user?.name : 'Aladdin Scholar');
    const displayUniversity = profileData?.subtitle || profileData?.university || (isOwner ? user?.university : '');
    const displayStatus = profileData?.status;

    // New fields
    // Because profileData comes from the 'posts' API currently, it needs to be updated in the future to include full author info.
    // Right now, if it's the owner, we can use their context data immediately.
    const displayMajor = (profileData as any)?.author?.major || profileData?.major || (isOwner ? user?.major : '');
    const displayEnrollmentYear = (profileData as any)?.author?.enrollmentYear || profileData?.enrollmentYear || (isOwner ? user?.enrollmentYear : null);
    const displayBio = (profileData as any)?.author?.bio || profileData?.bio || (isOwner ? user?.bio : '');
    const displayWechatId = (profileData as any)?.author?.wechatId || profileData?.wechatId || (isOwner ? user?.wechatId : '');

    // Sync Edit Form state when opening edit mode (Only owners can edit)
    useEffect(() => {
        if (isOpen && mode === 'edit' && user) {
            router.push('/profile');
            onClose(); // Close modal immediately as we are navigating
        }
    }, [isOpen, mode, user, router, onClose]);

    if (!isOpen || !profileData || mode === 'edit') return null;

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-20">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div
                className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full z-10 backdrop-blur"
                    aria-label="关闭"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative overflow-y-auto w-full no-scrollbar">
                    {/* Banner Background */}
                    <div className="h-32 bg-gradient-to-tr from-brand-primary to-orange-500 w-full relative shrink-0">
                        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                    </div>

                    {/* Profile Info Display (主态 & 客态) */}
                    <div className="px-6 pb-8 pt-0 relative flex-1">
                        {/* Avatar pushing up into banner */}
                        <div className="w-28 h-28 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center -mt-14 mb-4 shadow-xl relative z-10 overflow-hidden mx-auto">
                            {displayAvatar ? (
                                <img src={displayAvatar} alt={displayName} className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-slate-400" />
                            )}
                            {displayStatus === 'online' && (
                                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                            )}
                        </div>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-black text-white leading-tight flex items-center justify-center gap-2">
                                {displayName}
                                {isOwner && <span className="text-xs bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded-full font-bold ml-1 align-middle whitespace-nowrap">你本人</span>}
                            </h2>
                            {displayUniversity && (
                                <p className="text-brand-primary font-bold text-sm mt-1.5 flex items-center justify-center gap-1.5 flex-wrap">
                                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                                    {displayUniversity}
                                </p>
                            )}
                        </div>

                        {/* Extended Details Grid */}
                        <div className="space-y-3 mb-8">
                            {(displayMajor || displayEnrollmentYear) && (
                                <div className="flex bg-slate-800/50 rounded-2xl p-4 gap-4 border border-white/5 truncate">
                                    {displayMajor && (
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> 专业</p>
                                            <p className="text-sm font-semibold text-slate-200 truncate">{displayMajor}</p>
                                        </div>
                                    )}
                                    {displayEnrollmentYear && (
                                        <div className="flex-1 min-w-0 border-l border-white/10 pl-4">
                                            <p className="text-xs text-slate-500 mb-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> 入学</p>
                                            <p className="text-sm font-semibold text-slate-200 truncate">{displayEnrollmentYear} 级</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {displayBio && (
                                <div className="bg-slate-800/50 rounded-2xl p-4 border border-white/5">
                                    <p className="text-xs text-slate-500 mb-2 flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> 关于我</p>
                                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{displayBio}</p>
                                </div>
                            )}

                            {displayWechatId && (
                                <div className="bg-brand-primary/10 rounded-2xl p-4 border border-brand-primary/20">
                                    <p className="text-xs text-brand-primary mb-1 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> 微信 WeChat</p>
                                    <p className="text-sm font-mono font-bold text-white selection:bg-brand-primary/50">{displayWechatId}</p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex flex-col gap-3">
                            {isOwner ? (
                                /* Owner View: Can edit profile -> Redirects to /profile page */
                                <button
                                    onClick={() => {
                                        router.push('/profile');
                                        onClose();
                                    }}
                                    className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>编辑完整资料</span>
                                </button>
                            ) : (
                                /* Guest View (客态): Can interact */
                                <button
                                    onClick={() => alert(displayWechatId ? '请添加上方微信号联系我！' : '该用户暂未留下联系方式')}
                                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--brand-primary-rgb),0.5)] focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>跟TA打个招呼 👋</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
