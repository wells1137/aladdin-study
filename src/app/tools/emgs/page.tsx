import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileSearch, BookOpen, MousePointerClick } from 'lucide-react';

export const metadata: Metadata = {
    title: 'EMGS 签证进度查询指南 | 阿拉仃教育',
    description: '了解如何在 EMGS 官方网站上查询您的马来西亚学生签证申请状态，三步即可完成查询。',
};

const EMGS_OFFICIAL_URL = 'https://visa.educationmalaysia.gov.my/emgs/application/searchForm/';

const steps = [
    {
        id: 1,
        icon: FileSearch,
        title: '准备您的护照号',
        description: '在 "Travel Document Number" 一栏中输入您的护照号码。',
    },
    {
        id: 2,
        icon: BookOpen,
        title: '选择您的国籍',
        description: '在 "Nationality" 下拉菜单中选择您的国籍（例如：CHINA）。',
    },
    {
        id: 3,
        icon: MousePointerClick,
        title: '开始查询',
        description: '勾选同意条款后，点击 "Track My Application" 按钮获取最新进度。',
    },
];

export default function EmgsGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero */}
            <div className="pt-28 pb-12 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-6">
                        <FileSearch className="w-4 h-4" />
                        官方权威查询渠道
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        EMGS 签证进度<span className="text-blue-600">官方查询指南</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        为了确保您获得最准确、最及时的签证申请状态，我们将引导您至马来西亚 EMGS 官方网站进行查询。
                    </p>
                </div>
            </div>

            {/* Guide Card */}
            <div className="max-w-3xl mx-auto px-4 pb-16">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5">
                        <h2 className="text-xl font-bold text-white text-center">
                            三步完成签证进度查询
                        </h2>
                    </div>

                    {/* Steps */}
                    <div className="p-6 md:p-8 space-y-6">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                                    {step.id}
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-bold text-slate-800 text-base mb-1">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Annotated Screenshot */}
                    <div className="px-6 md:px-8 pb-6">
                        <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                            <Image
                                src="/images/emgs-guide-annotated.png"
                                alt="EMGS 官网查询界面操作示意图"
                                width={800}
                                height={450}
                                className="w-full h-auto"
                            />
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">
                            ▲ EMGS 官网查询界面示意（字段位置已标注）
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-10 text-center">
                    <a
                        href={EMGS_OFFICIAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
                    >
                        前往 EMGS 官方网站查询
                        <ArrowRight className="w-5 h-5" />
                    </a>
                    <p className="text-sm text-slate-400 mt-3">
                        将在新标签页中打开 EMGS 官方网站
                    </p>
                </div>

                {/* Tips */}
                <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="font-bold text-amber-800 mb-3">温馨提示</h3>
                    <ul className="text-sm text-amber-700 space-y-2">
                        <li>• 签证进度更新可能存在 1-3 个工作日的延迟，请耐心等待。</li>
                        <li>• 如遇到 EMGS 官网无法访问，请稍后重试或尝试使用 VPN。</li>
                        <li>• 如有疑问，可随时<Link href="/contact" className="underline font-medium hover:text-amber-900">联系我们的顾问团队</Link>协助查询。</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
