import HandbookShowcase from '@/components/HandbookShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '留学资料下载 | 阿拉仃教育',
    description: '下载最新的马来西亚公立大学招生简章、博士内推项目介绍及申请攻略。涵盖马来亚大学、博特拉大学、国民大学等名校资料。',
    keywords: ['马来西亚留学资料', '大学招生简章', '留学资料下载', '马来亚大学', '博特拉大学'],
    alternates: {
        canonical: '/guides/downloads',
    },
    openGraph: {
        title: '留学资料下载 | 阿拉仃教育',
        description: '下载马来西亚公立大学官方招生简章，获取最全面的留学资料。',
        url: 'https://aladdineducation.com/guides/downloads',
        type: 'website',
    },
};

export default function DownloadsPage() {
    return (
        <main className="pt-16 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl text-shadow mb-4">
                        留学资料下载
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-500">
                        下载马来西亚公立大学官方招生简章与申请攻略。
                    </p>
                </div>
            </div>
            <HandbookShowcase />
        </main>
    );
}
