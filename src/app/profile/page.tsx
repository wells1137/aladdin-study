'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, GraduationCap, MapPin, Save, Image as ImageIcon, Briefcase, Calendar, MessageCircle, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
    const router = useRouter();
    const { user, isStudent, updateProfile, loading } = useAuth();

    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [enrollmentYear, setEnrollmentYear] = useState('');
    const [wechatId, setWechatId] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Load available user data into form
    useEffect(() => {
        if (!loading && !isStudent) {
            router.push('/community');
            return;
        }

        if (user) {
            setName(user.name || '');
            setUniversity(user.university || '');
            setMajor(user.major || '');
            setEnrollmentYear(user.enrollmentYear ? user.enrollmentYear.toString() : '');
            setWechatId(user.wechatId || '');
            setBio(user.bio || '');
            setAvatarUrl(user.avatarUrl || '');
        }
    }, [user, isStudent, loading, router]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setIsSaving(true);

        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    university,
                    avatarUrl,
                    major,
                    enrollmentYear: enrollmentYear ? parseInt(enrollmentYear, 10) : null,
                    bio,
                    wechatId
                })
            });

            if (res.ok) {
                const updatedUser = await res.json();
                updateProfile(updatedUser);
                setSuccessMessage('个人资料更新成功！');

                // Add a small delay before navigating back or hiding the success message
                setTimeout(() => {
                    router.push('/community');
                }, 1500);
            } else {
                const data = await res.json();
                setError(data.error || '更新失败');
            }
        } catch (err) {
            setError('网络错误，请稍后再试');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"></div>
            </div>
        );
    }

    if (!isStudent) {
        return null; // The useEffect will redirect them
    }

    return (
        <main className="min-h-screen bg-slate-900 selection:bg-brand-primary/30">
            <Navbar />

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
                {/* Back button */}
                <button
                    onClick={() => router.push('/community')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
                >
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">返回社交地图</span>
                </button>

                <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
                    <div className="h-32 bg-gradient-to-r from-brand-primary to-orange-500 relative">
                        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                    </div>

                    <div className="px-8 pb-10">
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end -mt-16 mb-10 relative z-10">
                            <div className="w-32 h-32 rounded-2xl bg-slate-900 border-4 border-slate-800 flex items-center justify-center overflow-hidden shadow-xl shrink-0">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-slate-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-black text-white">完善个人主页</h1>
                                <p className="text-slate-400 mt-1">让大家更好地在阿拉仃校友圈认识你</p>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-8 flex items-center gap-3 animate-fade-in">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-xl mb-8 flex items-center gap-3 animate-fade-in">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-8">
                            {/* Basic Info */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">基本资料</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <User className="w-4 h-4 text-slate-400" /> 姓名 / 昵称 <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-slate-800 transition-all"
                                            placeholder="输入你的名称"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-slate-400" /> 头像链接
                                        </label>
                                        <input
                                            type="url"
                                            value={avatarUrl}
                                            onChange={(e) => setAvatarUrl(e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-slate-800 transition-all"
                                            placeholder="贴入图片 URL 链接..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Academic Info */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">学术背景</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-slate-400" /> 就读院校
                                        </label>
                                        <input
                                            type="text"
                                            value={university}
                                            onChange={(e) => setUniversity(e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-slate-800 transition-all"
                                            placeholder="例如：马来亚大学 (UM)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-slate-400" /> 专业 / 院系
                                        </label>
                                        <input
                                            type="text"
                                            value={major}
                                            onChange={(e) => setMajor(e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-slate-800 transition-all"
                                            placeholder="例如：计算机科学"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" /> 入学年份
                                        </label>
                                        <select
                                            value={enrollmentYear}
                                            onChange={(e) => setEnrollmentYear(e.target.value)}
                                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-slate-800 transition-all appearance-none"
                                        >
                                            <option value="" className="bg-slate-800">请选择...</option>
                                            <option value="2026" className="bg-slate-800">2026</option>
                                            <option value="2025" className="bg-slate-800">2025</option>
                                            <option value="2024" className="bg-slate-800">2024</option>
                                            <option value="2023" className="bg-slate-800">2023</option>
                                            <option value="2022" className="bg-slate-800">2022</option>
                                            <option value="2021" className="bg-slate-800">2021</option>
                                            <option value="2020" className="bg-slate-800">2020</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold text-white border-b border-white/10 pb-2">社交信息</h2>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-slate-400" /> 微信号 (非公开，方便互相联系)
                                    </label>
                                    <input
                                        type="text"
                                        value={wechatId}
                                        onChange={(e) => setWechatId(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-slate-800 transition-all"
                                        placeholder="WeChat ID"
                                    />
                                    <p className="text-xs text-slate-500 mt-2">只有你同意后，其他校友才能看到你的微信号。</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        个人简介
                                    </label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows={4}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-slate-800 transition-all resize-none"
                                        placeholder="介绍一下自己吧，例如你的兴趣爱好、想寻找什么类型的搭子..."
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.push('/community')}
                                    disabled={isSaving}
                                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors"
                                >
                                    取消
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={`px-8 py-3 rounded-xl text-white font-bold transition-all flex items-center gap-2 
                                        ${isSaving
                                            ? 'bg-brand-primary/60 cursor-not-allowed'
                                            : 'bg-brand-primary hover:bg-brand-primary/90 hover:-translate-y-1 shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--brand-primary-rgb),0.5)]'}`}
                                >
                                    <Save className="w-5 h-5" />
                                    {isSaving ? '保存中...' : '保存个人主页'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
