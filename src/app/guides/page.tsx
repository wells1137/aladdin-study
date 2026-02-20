import HandbookShowcase from '@/components/HandbookShowcase';
import GuideContent from '@/components/GuideContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '留学指南下载 | 阿拉仃教育',
    description: '下载最新的马来西亚公立大学招生简章、博士内推项目介绍及申请攻略。涵盖马来亚大学、博特拉大学、国民大学等名校资料。',
    keywords: ['马来西亚留学指南', '大学招生简章', '留学攻略', '马来亚大学', '博特拉大学', '留学资料下载'],
    alternates: {
        canonical: '/guides',
    },
    openGraph: {
        title: '留学指南 & 资源下载 | 阿拉仃教育',
        description: '下载马来西亚公立大学官方招生简章，获取最全面的留学攻略与申请指南。',
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
    twitter: {
        card: 'summary_large_image',
        title: '留学指南 & 资源下载 | 阿拉仃教育',
        description: '下载马来西亚公立大学官方招生简章，获取最全面的留学攻略。',
        images: ['/images/kl-skyline.png'],
    },
};

export default function GuidesPage() {
    return (
        <main className="pt-16 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl text-shadow mb-4">
                        留学指南 & 资源
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-500">
                        在这里，您可以找到所有关于马来西亚留学的官方一手资料。
                    </p>
                </div>
            </div>
            <HandbookShowcase />
            <GuideContent />
        </main>
    );
}
