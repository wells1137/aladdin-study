import GuideContent from '@/components/GuideContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '留学指南 | 阿拉仃教育',
    description: '马来西亚留学全方位攻略，涵盖申请流程、院校介绍、签证指南等实用信息。',
    keywords: ['马来西亚留学指南', '留学攻略', '马来亚大学', '博特拉大学', '留学申请'],
    alternates: {
        canonical: '/guides',
    },
    openGraph: {
        title: '留学指南 | 阿拉仃教育',
        description: '马来西亚留学全方位攻略，涵盖申请流程、院校介绍、签证指南等实用信息。',
        url: 'https://aladdineducation.com/guides',
        type: 'website',
        images: [
            {
                url: '/images/kl-skyline.png',
                width: 1200,
                height: 630,
                alt: '阿拉仃教育留学指南',
            },
        ],
    },
};

export default function GuidesPage() {
    return (
        <main className="pt-16 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl text-shadow mb-4">
                        留学指南
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-500">
                        马来西亚留学全方位攻略，助你顺利开启留学之旅。
                    </p>
                </div>
            </div>
            <GuideContent />
        </main>
    );
}
