'use client';

import { useState } from 'react';
import { Download, BookOpen, Lock, LogOut, UserCheck } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import Marquee from './animations/Marquee';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';

const handbooks = [
    {
        title: '马来西亚公立院校简介',
        description: '全面了解马来西亚顶尖公立大学的教育概况与优势。',
        file: '马来西亚公立院校简介.pdf',
        date: '2026 最新版',
        partnerOnly: false,
    },
    {
        title: '大马博士内推项目',
        description: '专属博士申请通道，无需繁琐流程，直通名校。',
        file: '大马博士内推项目.pdf',
        date: '2026 博士专栏',
        partnerOnly: true,
    },
    {
        title: '马来亚大学 (UM) 本硕宣传册',
        description: 'QS排名60+，马来西亚第一学府详细招生简章。',
        file: '2026 UM 本硕宣传册 .pdf',
        date: '2026 UM',
        partnerOnly: true,
    },
    {
        title: '马来西亚国立大学 (UKM) 本硕宣传册',
        description: '拥有东南亚最大图书馆，综合实力强劲的公立名校。',
        file: '2026 UKM 本硕宣传册.pdf',
        date: '2026 UKM',
        partnerOnly: true,
    },
    {
        title: '博特拉大学 (UPM) 本硕宣传册',
        description: '农业与林业学科世界领先，校园环境优美的研究型大学。',
        file: '2026 UPM 本硕宣传册.pdf',
        date: '2026 UPM',
        partnerOnly: true,
    },
    {
        title: '马来西亚理工大学 (UTM) 本硕开放专业',
        description: '工程与技术领域翘楚，培养无数理工科精英。',
        file: '2026 UTM 本硕开放专业.pdf',
        date: '2026 UTM',
        partnerOnly: true,
    },
    {
        title: '马来亚大学 (UM) 高级研究硕士 MAS',
        description: 'QS排名60+，马来亚大学 Master of Advanced Studies 授课型硕士项目介绍。',
        file: 'UM高级研究硕士（MAS）中文.pdf',
        date: '2026 UM',
        partnerOnly: true,
    },
    {
        title: '浙财×UKM 数据科学硕士（中外合作办学）',
        description: 'QS126 马来西亚国立大学，1.5年学制，18万学费，中留服认证，免联考申请制。',
        file: 'images/ukm-data-science-poster.png',
        date: '2025 UKM',
        partnerOnly: false,
    },
    {
        title: '理科大学 (USM) 设计硕士（创意产业）',
        description: 'USM 设计硕士（创意产业方向）详细招生简章与课程介绍。',
        file: 'USM - 设计硕士(创意产业).pdf',
        date: '2026 USM',
        partnerOnly: true,
    },
];

const HandbookShowcase = () => {
    const { isPartner, user, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(false);

    const handleDownload = (book: typeof handbooks[0]) => {
        if ('comingSoon' in book && book.comingSoon) return;
        if (book.partnerOnly && !isPartner) {
            setShowLogin(true);
        } else {
            window.open(`/${book.file}`, '_blank');
        }
    };

    return (
        <>
            <section id="handbooks" className="py-24 bg-primary relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

                <div className="mb-20 transform -rotate-2">
                    <Marquee className="bg-secondary text-black py-4 border-y-4 border-black">
                        <span className="text-4xl font-black uppercase mx-8">下载官方指南 • 2026招生 • </span>
                    </Marquee>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center justify-between mb-16">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter transform -skew-x-12">
                                留学 <span className="text-secondary">资料</span>
                            </h2>
                            <p className="max-w-2xl text-xl text-white/90 font-medium">
                                下载官方宣传手册 · 开启你的未来
                            </p>
                        </div>

                        {/* Partner login/status badge */}
                        <div className="hidden md:block">
                            {isPartner ? (
                                <div className="flex items-center gap-3">
                                    <div className="bg-secondary border-4 border-black px-6 py-3 flex items-center gap-2">
                                        <UserCheck className="w-5 h-5" />
                                        <span className="font-black text-sm uppercase">{user?.name}</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="bg-white/20 text-white border-2 border-white/40 px-4 py-3 font-bold text-sm hover:bg-white/30 transition-colors flex items-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        退出
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="bg-secondary border-4 border-black px-6 py-3 font-black text-sm uppercase hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-all flex items-center gap-2"
                                >
                                    <Lock className="w-4 h-4" />
                                    合作伙伴登录
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {handbooks.map((book, index) => {
                            const isLocked = book.partnerOnly && !isPartner;
                            const isComingSoon = 'comingSoon' in book && book.comingSoon;
                            return (
                                <FadeIn key={book.title} delay={index * 0.1}>
                                    <div className={`group relative bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#CCFF00] hover:-translate-y-2 transition-all duration-200 ${isLocked || isComingSoon ? 'opacity-90' : ''}`}>
                                        <div className={`absolute -top-6 -right-6 ${isComingSoon ? 'bg-orange-400' : 'bg-secondary'} border-4 border-black text-black font-black text-xs px-3 py-1 transform rotate-12 group-hover:rotate-0 transition-transform`}>
                                            {book.date}
                                        </div>

                                        {/* Partner-only badge */}
                                        {book.partnerOnly && (
                                            <div className={`absolute -top-3 -left-3 ${isLocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} border-2 border-black text-xs font-black px-2 py-1 flex items-center gap-1`}>
                                                {isLocked ? <><Lock className="w-3 h-3" /> B端专属</> : <><UserCheck className="w-3 h-3" /> 已解锁</>}
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <BookOpen className="w-12 h-12 text-primary" strokeWidth={2.5} />
                                        </div>

                                        <h3 className="text-2xl font-black text-black mb-4 uppercase leading-none italic">
                                            {book.title}
                                        </h3>
                                        <p className="text-slate-800 mb-8 font-medium border-l-4 border-secondary pl-4">
                                            {book.description}
                                        </p>

                                        <button
                                            onClick={() => handleDownload(book)}
                                            disabled={isComingSoon}
                                            className={`block w-full text-center py-4 font-bold uppercase tracking-wider transition-colors border-2 border-transparent hover:border-black ${isComingSoon
                                                ? 'bg-orange-100 text-orange-500 cursor-not-allowed'
                                                : isLocked
                                                    ? 'bg-gray-300 text-gray-600 hover:bg-gray-400 cursor-pointer'
                                                    : 'bg-black text-white hover:bg-primary hover:text-white'
                                                }`}
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                {isComingSoon ? (
                                                    <>⏳ 等待上传</>
                                                ) : isLocked ? (
                                                    <><Lock className="w-4 h-4" /> 登录后下载</>
                                                ) : (
                                                    <><Download className="w-4 h-4" /> 下载 PDF</>
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>

                    {/* Mobile partner login */}
                    <div className="md:hidden mt-8 text-center">
                        {isPartner ? (
                            <div className="flex items-center justify-center gap-3">
                                <span className="bg-secondary border-2 border-black px-4 py-2 font-black text-sm">{user?.name}</span>
                                <button onClick={logout} className="text-white font-bold text-sm underline">退出</button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="bg-secondary border-4 border-black px-6 py-3 font-black text-sm uppercase"
                            >
                                🔒 合作伙伴登录解锁更多资料
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </>
    );
};

export default HandbookShowcase;
