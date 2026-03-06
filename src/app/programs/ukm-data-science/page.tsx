import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Clock, DollarSign, Award, CheckCircle, Users, Globe, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: '浙财×UKM 数据科学硕士 | 中外合作办学 | 阿拉仃教育',
    description: '浙江财经大学×马来西亚国立大学(UKM) QS126 中外合作数据科学硕士，1.5年学制，18万学费，中留服认证，免联考申请制。',
    keywords: ['UKM数据科学硕士', '中外合作办学', '浙江财经大学', '马来西亚国立大学', '免联考硕士'],
};

const highlights = [
    { icon: Clock, label: '最短学制', value: '1.5年', color: 'bg-blue-500' },
    { icon: DollarSign, label: '学费总计', value: '18万元', color: 'bg-green-500' },
    { icon: Users, label: '招生名额', value: '40人', color: 'bg-orange-500' },
];

const advantages = [
    { title: '国内就读，享海外名校文凭', desc: '在杭州浙江财经大学完成全部课程，无需出国，毕业获UKM硕士学位' },
    { title: '高性价比，远超欧美', desc: '学费约18万元人民币，远低于赴英美留学费用，生活成本也大幅降低' },
    { title: 'QS全球Top 200名校背书', desc: 'UKM 2025年QS排名全球第126位，马来西亚排名前三的研究型大学' },
    { title: '申请门槛友好，无需联考', desc: '本科均分70分，雅思5.5分即可申请，无需参加全国联考' },
    { title: '学历权威认证，回国认可', desc: '毕业学历获教育部留学服务中心（中留服）认证，考公、落户均可用' },
];

const careers = [
    { role: '数据分析师', desc: '收集、处理和分析数据，为企业提供决策支持' },
    { role: '数据工程师', desc: '设计、构建和维护数据系统，确保数据有效性和可访问性' },
    { role: '数据科学家', desc: '深入研究数据，挖掘数据背后的模式和洞见' },
    { role: '机器学习工程师', desc: '开发、优化和维护机器学习模型，应用于各种预测场景' },
    { role: '大数据工程师', desc: '处理海量数据，优化数据存储、处理和分析流程' },
    { role: 'AI产品经理', desc: '将数据科学和AI技术转化为实际产品，满足市场需求' },
];

const requirements = [
    '本科双证，计算机相关专业优先',
    '雅思5.5分起（或托福等同等成绩）',
    '本科均分70分以上',
];

const suitableFor = [
    '在职人士：想提升学历但不想辞职，利用1.5年完成学业',
    '想避开考研内卷的人：申请制入学，另辟蹊径获取硕士学位',
    '有特行或跨专业需求的人：项目包含数据科学基础模块，非CS背景可申请',
    '"考公"或一线城市落户需求者：QS前200学历符合一线城市落户政策要求',
];

export default function UkmDataSciencePage() {
    return (
        <main className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 tech-grid"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">中外合作办学</span>
                                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">QS 126</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                                浙江财经大学 ×<br />
                                <span className="text-yellow-400">马来西亚国立大学</span>
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-bold text-blue-200 mb-6">
                                数据科学硕士
                            </h2>
                            <p className="text-lg text-white/80 mb-8 max-w-lg">
                                不出国门，拿世界名校文凭！全国首个中马合作数据科学硕士项目，教育部认证。
                            </p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {highlights.map((h) => (
                                    <div key={h.label} className="text-center">
                                        <div className={`${h.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                            <h.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <p className="text-2xl font-extrabold">{h.value}</p>
                                        <p className="text-sm text-white/60">{h.label}</p>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/assessment"
                                className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/30"
                            >
                                立即咨询 · 开启名校硕士之旅
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="relative hidden lg:block">
                            <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                                <Image
                                    src="/images/ukm-data-science-poster.png"
                                    alt="浙财×UKM 数据科学硕士项目海报"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile poster */}
            <section className="lg:hidden bg-slate-50 py-8">
                <div className="max-w-md mx-auto px-4">
                    <Image
                        src="/images/ukm-data-science-poster.png"
                        alt="浙财×UKM 数据科学硕士项目海报"
                        width={600}
                        height={900}
                        className="w-full h-auto rounded-xl shadow-lg"
                    />
                </div>
            </section>

            {/* Why This Program */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">项目核心亮点</h2>
                        <p className="text-slate-500 text-lg">Why Choose This Programme</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((item, i) => (
                            <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-primary" />
                                入学要求
                            </h2>
                            <div className="space-y-4">
                                {requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
                                        <span className="bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                        <p className="text-slate-700 font-medium">{req}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                                <Users className="w-8 h-8 text-blue-600" />
                                适合哪些人？
                            </h2>
                            <div className="space-y-4">
                                {suitableFor.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
                                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Prospects */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 flex items-center justify-center gap-3">
                            <Award className="w-8 h-8 text-yellow-500" />
                            就业前景
                        </h2>
                        <p className="text-slate-500">Employment Prospects</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {careers.map((career) => (
                            <div key={career.role} className="group bg-slate-900 text-white p-5 rounded-xl hover:bg-blue-900 transition-colors">
                                <h3 className="font-bold text-lg mb-1 text-yellow-400 group-hover:text-yellow-300">{career.role}</h3>
                                <p className="text-sm text-white/70">{career.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-900 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <Globe className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold mb-3">立即咨询 · 开启你的名校硕士之旅</h2>
                    <p className="text-white/70 mb-8 text-lg">名额有限（仅40人），先到先得</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/assessment"
                            className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors shadow-lg"
                        >
                            <GraduationCap className="w-5 h-5" />
                            免费评估申请资格
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
                        >
                            联系顾问老师
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
