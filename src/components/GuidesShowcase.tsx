'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { guides, categories } from '@/lib/guidesData';
import { Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
    '留学准备': 'bg-red-50 text-red-700 border-red-200',
    '申请指南': 'bg-amber-50 text-amber-700 border-amber-200',
    '院校介绍': 'bg-blue-50 text-blue-700 border-blue-200',
    '生活指南': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const categoryEmojis: Record<string, string> = {
    '留学准备': '📋',
    '申请指南': '📝',
    '院校介绍': '🏫',
    '生活指南': '🌴',
};

// Filter out old dates just in case, or sort by date desc
const sortedGuides = [...guides].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function GuidesShowcase() {
    const [activeCategory, setActiveCategory] = useState('全部');

    const filteredGuides = activeCategory === '全部'
        ? sortedGuides
        : sortedGuides.filter(guide => guide.category === activeCategory);

    // For "All" view, show featured + grid. For specific category, show grid.
    const featuredGuides = activeCategory === '全部' ? filteredGuides.slice(0, 3) : [];
    const gridGuides = activeCategory === '全部' ? filteredGuides.slice(3) : filteredGuides;

    return (
        <section id="guides-showcase" className="py-20 bg-gradient-to-b from-white to-red-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <BookOpen className="w-4 h-4" />
                        留学百科 2026
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                        马来西亚留学全方位指南
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        从申请准备到校园生活，从美食攻略到旅游景点——你需要的所有信息都在这里
                    </p>
                </div>

                {/* Category Tabs - Scrollable on mobile, centered on desktop */}
                <div className="flex flex-nowrap overflow-x-auto md:flex-wrap justify-start md:justify-center gap-3 mb-12 px-4 md:px-0 pb-2 no-scrollbar snap-x w-full">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 snap-center whitespace-nowrap ${activeCategory === category
                                ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:bg-slate-50'
                                }`}
                        >
                            {category === '全部' ? '✨ 全部指南' : `${categoryEmojis[category] || ''} ${category}`}
                        </button>
                    ))}
                </div>

                {/* Featured Guides - Only show on "All" tab */}
                {activeCategory === '全部' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {featuredGuides.map((guide) => (
                            <Link
                                key={guide.slug}
                                href={`/guides/${guide.slug}`}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-primary/20 hover:-translate-y-1 block h-full flex flex-col"
                            >
                                <div className="relative h-52 overflow-hidden shrink-0">
                                    <Image
                                        src={guide.coverImage}
                                        alt={guide.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColors[guide.category] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                                        {categoryEmojis[guide.category]} {guide.category}
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                        {guide.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
                                        {guide.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                                        <span className="flex items-center text-xs text-slate-400">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {guide.readTime}
                                        </span>
                                        <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                                            阅读全文 <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Grid Guides */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both" style={{ animationDelay: '100ms' }}>
                    {gridGuides.map((guide) => (
                        <Link
                            key={guide.slug}
                            href={`/guides/${guide.slug}`}
                            className="group flex gap-3 bg-white rounded-xl p-3 border border-slate-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 items-start hover:-translate-y-0.5"
                        >
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                <Image
                                    src={guide.coverImage}
                                    alt={guide.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex-1 min-w-0 py-0.5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded border ${categoryColors[guide.category] || 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                                        {guide.category}
                                    </span>
                                    <span className="text-[10px] text-slate-400">{guide.date.split('-')[0]}</span>
                                </div>
                                <h4 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                                    {guide.title}
                                </h4>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {gridGuides.length === 0 && activeCategory !== '全部' && (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-500">该分类下暂无指南，敬请期待！</p>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-8">
                    <Link
                        href="/guides"
                        className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-full font-semibold hover:bg-slate-50 hover:text-primary hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
                    >
                        <BookOpen className="w-4 h-4" />
                        查看全部 {guides.length} 篇指南
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
