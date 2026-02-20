'use client';
import { useState } from 'react';
import Image from 'next/image';
import FadeIn from './animations/FadeIn';

const FounderLetter = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className="py-16 bg-gradient-to-b from-red-50/50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 text-4xl opacity-20 animate-lantern-swing origin-top">🏮</div>
            <div className="absolute top-10 right-10 text-4xl opacity-20 animate-lantern-swing origin-top" style={{ animationDelay: '0.5s' }}>🏮</div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn delay={0.2} direction="up">
                    {/* Section Header */}
                    <div className="text-center mb-8">
                        <span className="inline-block px-4 py-1.5 bg-red-700 text-yellow-300 text-sm font-bold tracking-widest uppercase border-2 border-yellow-500 rounded-sm mb-4">
                            🐴 创始人寄语 · 马年大吉
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            2026致阿拉仃的一封信
                        </h2>
                        <p className="mt-2 text-slate-500 text-sm">写于2026.02.16除夕之夜</p>
                    </div>

                    {/* Letter Image - Collapsible */}
                    <div className="relative spring-hero-glow rounded-xl overflow-hidden border-2 border-red-200 shadow-2xl">
                        <div
                            className="relative overflow-hidden transition-all duration-700 ease-in-out"
                            style={{ maxHeight: expanded ? '9999px' : '500px' }}
                        >
                            <Image
                                src="/founder-letter-2026.png"
                                alt="2026致阿拉仃的一封信 — 创始人一丁子勤于2026年除夕夜写给所有学生、合作伙伴和团队的新年寄语"
                                width={940}
                                height={2732}
                                className="w-full h-auto"
                                priority
                            />

                            {/* Gradient fade overlay when collapsed */}
                            {!expanded && (
                                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
                            )}
                        </div>

                        {/* Expand / Collapse button */}
                        <div className={`text-center ${expanded ? 'py-4 bg-white' : 'absolute bottom-0 left-0 right-0 pb-4 pt-8 z-10'}`}>
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-700 hover:bg-red-800 text-yellow-300 font-bold text-sm tracking-wider rounded-full border-2 border-yellow-500 transition-all hover:scale-105 shadow-lg"
                            >
                                <span>{expanded ? '收起信件 ▲' : '展开阅读全文 ▼'}</span>
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default FounderLetter;
