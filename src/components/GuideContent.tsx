'use client';

import { useState } from 'react';
import { DollarSign, FileCheck, Trophy, Heart } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const sections = [
    {
        id: 'cost',
        title: '💰 2025费用明细',
        icon: DollarSign,
        color: '',
        content: (
            <div className="space-y-8 font-mono">
                <div className="bg-secondary border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000]">
                    <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-tight">学费（每年）</h3>
                    <ul className="space-y-4">
                        <li className="flex justify-between border-b-2 border-black pb-2">
                            <span className="font-bold">公立大学（本科）</span>
                            <span className="font-black">RM 12k - 25k</span>
                        </li>
                        <li className="flex justify-between border-b-2 border-black pb-2">
                            <span className="font-bold">公立大学（硕博）</span>
                            <span className="font-black">RM 15k - 35k</span>
                        </li>
                        <li className="flex justify-between border-b-2 border-black pb-2">
                            <span className="font-bold">私立大学</span>
                            <span className="font-black">RM 30k - 60k</span>
                        </li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#FFD700]">
                        <h3 className="text-xl font-black text-secondary mb-2 uppercase">🏠 住宿费用</h3>
                        <p className="font-bold">校内宿舍：RM 300-800/月</p>
                        <p className="font-bold">校外租房：RM 1000+/月</p>
                    </div>
                    <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_#FFD700]">
                        <h3 className="text-xl font-black text-secondary mb-2 uppercase">🍽️ 生活费用</h3>
                        <p className="font-bold">餐饮：RM 10-15/餐</p>
                        <p className="font-bold">月均：RM 2000-3000</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'visa',
        title: '🛂 签证（EMGS）指南',
        icon: FileCheck,
        color: '',
        content: (
            <div className="space-y-8 font-mono">
                <p className="text-black text-lg font-bold leading-tight border-b-4 border-secondary pb-4">
                    官方EMGS签证流程 · 快速通道申请
                </p>

                <div className="space-y-4">
                    {[
                        { step: "01", title: "录取通知", desc: "获得录取 & 完成体检" },
                        { step: "02", title: "申请eVAL", desc: "提交EMGS（4-6周）" },
                        { step: "03", title: "入境签证", desc: "使馆申请或电子签" },
                        { step: "04", title: "学生签", desc: "抵达后体检 & 贴签" }
                    ].map((item) => (
                        <div key={item.step} className="flex items-center gap-4 bg-white border-2 border-black p-4 hover:bg-secondary transition-colors group">
                            <div className="text-4xl font-black text-outline-black group-hover:text-black transition-colors">{item.step}</div>
                            <div>
                                <h4 className="text-xl font-black text-black uppercase">{item.title}</h4>
                                <p className="text-sm font-bold text-gray-600 group-hover:text-black">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-primary text-white p-4 border-4 border-black font-bold text-center">
                    ⚠️ 2025更新：资金证明要求更严 · 请提前准备
                </div>
            </div>
        )
    },
    {
        id: 'ranking',
        title: '🏆 QS2026排名',
        icon: Trophy,
        color: '',
        content: (
            <div className="space-y-6 font-mono">
                <div className="overflow-hidden border-4 border-black">
                    <table className="min-w-full divide-y-4 divide-black">
                        <thead className="bg-black text-white">
                            <tr>
                                <th className="px-4 py-3 text-left font-black uppercase tracking-wider">大学</th>
                                <th className="px-4 py-3 text-left font-black uppercase tracking-wider text-secondary">排名</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y-2 divide-black font-bold">
                            <tr><td className="px-4 py-3">马来亚大学 (UM)</td><td className="px-4 py-3 text-primary">#60</td></tr>
                            <tr><td className="px-4 py-3">国立大学 (UKM)</td><td className="px-4 py-3 text-primary">#138</td></tr>
                            <tr><td className="px-4 py-3">理科大学 (USM)</td><td className="px-4 py-3 text-primary">#146</td></tr>
                            <tr><td className="px-4 py-3">博特拉大学 (UPM)</td><td className="px-4 py-3 text-primary">#148</td></tr>
                            <tr><td className="px-4 py-3">工艺大学 (UTM)</td><td className="px-4 py-3 text-primary">#181</td></tr>
                            <tr><td className="px-4 py-3 bg-secondary">泰莱大学</td><td className="px-4 py-3 text-black">#251</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    },
    {
        id: 'benefits',
        title: '🌟 为什么选大马？',
        icon: Heart,
        color: '',
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                {[
                    { title: "性价比无敌", desc: "英澳1/3费用 · 世界级学位" },
                    { title: "全英授课", desc: "100%英语教学 · 全球认可" },
                    { title: "零文化冲击", desc: "华人友好 · 美食天堂" },
                    { title: "跳板优势", desc: "轻松转学世界前50" }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 border-4 border-black hover:bg-black hover:text-white transition-colors group">
                        <h3 className="font-black text-xl mb-2 text-primary group-hover:text-secondary uppercase">{item.title}</h3>
                        <p className="font-bold text-sm leading-tight">{item.desc}</p>
                    </div>
                ))}
            </div>
        )
    }
];

const GuideContent = () => {
    const [activeTab, setActiveTab] = useState('cost');

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="mb-16">
                        <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-none text-outline-black uppercase tracking-tighter leading-none mb-4">
                            Malaysia <span className="text-primary text-outline-none">Guide</span>
                        </h2>
                        <div className="w-full h-4 bg-secondary transform -skew-x-12"></div>
                    </div>
                </FadeIn>

                <div className="flex flex-wrap gap-4 mb-12">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeTab === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`
                                    flex items-center gap-3 px-8 py-4 text-lg font-black uppercase tracking-wider border-4 border-black transition-all duration-200
                                    ${isActive
                                        ? 'bg-secondary text-black shadow-[8px_8px_0px_0px_#000] -translate-y-2'
                                        : 'bg-white text-black hover:bg-gray-100'}
                                `}
                            >
                                <Icon className="w-6 h-6" />
                                {section.title.split(' ')[1]}
                            </button>
                        );
                    })}
                </div>

                <div className="max-w-6xl mx-auto min-h-[500px]">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={`transition-all duration-300 ${activeTab === section.id ? 'opacity-100 block' : 'opacity-0 hidden'}`}
                        >
                            <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[16px_16px_0px_0px_#C41E3A]">
                                <div className="flex items-center gap-6 mb-10 pb-6 border-b-4 border-black">
                                    <div className="p-4 bg-secondary border-2 border-black">
                                        <section.icon className="w-10 h-10 text-black" />
                                    </div>
                                    <h3 className="text-4xl font-black text-black uppercase transform -skew-x-6">{section.title}</h3>
                                </div>
                                <div className="prose prose-lg prose-slate max-w-none text-black">
                                    {section.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GuideContent;
