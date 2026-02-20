'use client';

import { useState } from 'react';
import GuideCard from './GuideCard';
import { Guide, categories } from '@/lib/guidesData';
import FadeIn from './animations/FadeIn';

interface GuideListProps {
    guides: Guide[];
}

const GuideList = ({ guides }: GuideListProps) => {
    const [activeCategory, setActiveCategory] = useState('全部');

    const filteredGuides = activeCategory === '全部'
        ? guides
        : guides.filter(guide => guide.category === activeCategory);

    return (
        <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                ? 'bg-primary text-white shadow-md transform scale-105'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGuides.map((guide, index) => (
                    <FadeIn key={guide.slug} delay={index * 0.1}>
                        <GuideCard guide={guide} />
                    </FadeIn>
                ))}
            </div>

            {filteredGuides.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500 text-lg">暂无该分类的文章</p>
                    <button
                        onClick={() => setActiveCategory('全部')}
                        className="mt-4 text-primary hover:underline"
                    >
                        查看所有文章
                    </button>
                </div>
            )}
        </div>
    );
};

export default GuideList;
