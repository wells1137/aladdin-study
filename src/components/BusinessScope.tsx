import { Plane, Map, Briefcase, Building2, ArrowRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import GlowCard from './animations/GlowCard';
import Link from 'next/link';

const BusinessScope = () => {
    const businesses = [
        {
            title: '国际游学',
            subtitle: 'Study Tours',
            description: '寒暑假名校深度体验、英语浸泡营、亲子游学团。',
            points: ['顶尖大学参访', '全真课堂体验', '当地文化探索'],
            icon: Plane,
            color: 'from-blue-500 to-cyan-500',
            link: '/contact'
        },
        {
            title: '高端旅游',
            subtitle: 'Premium Tourism',
            description: '家长探亲考察、医疗康养之旅、房产置业考察。',
            points: ['定制行程安排', '全程专车接送', '置业投资咨询'],
            icon: Map,
            color: 'from-emerald-500 to-teal-500',
            link: '/contact'
        },
        {
            title: '名企实习',
            subtitle: 'Career Internships',
            description: '世界500强企业远程/实地实习，提升背景竞争力。',
            points: ['大厂内推机会', '导师一对一指导', '实习证明/推荐信'],
            icon: Briefcase,
            color: 'from-violet-500 to-purple-500',
            link: '/contact'
        },
        {
            title: '就业推荐',
            subtitle: 'Job Placement',
            description: '毕业生就业指导、简历优化、工作签证办理协助。',
            points: ['简历面试辅导', '本地企业对接', '工签政策咨询'],
            icon: Building2,
            color: 'from-orange-500 to-red-500',
            link: '/contact'
        }
    ];

    return (
        <section id="business" className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            多元化业务体系
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
                            不仅仅是留学，无论是短期游学、家长陪读还是未来就业，我们提供全生命周期服务。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {businesses.map((item, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <GlowCard className="h-full">
                                <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-7 h-7" />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{item.subtitle}</p>

                                    <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-grow">
                                        {item.description}
                                    </p>

                                    <ul className="space-y-2 mb-6">
                                        {item.points.map((point, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-slate-500">
                                                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} mr-2`}></span>
                                                {point}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href={item.link} className="flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform mt-auto">
                                        了解详情 <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </GlowCard>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BusinessScope;
