import OfferShowcase from '@/components/OfferShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '2026 名校录取捷报 | 阿拉仃教育',
    description: '查看阿拉仃教育2026年最新名校录取捷报，涵盖马来亚大学、国民大学、博特拉大学、理工大学等顶尖公立大学真实录取案例。',
    keywords: ['名校录取', '马来西亚留学offer', '马来亚大学录取', '博特拉大学录取', '2026录取捷报'],
    alternates: {
        canonical: '/guides/offers',
    },
    openGraph: {
        title: '2026 名校录取捷报 | 阿拉仃教育',
        description: '顶尖公立大学真实录取案例，下一个就是你！',
        url: 'https://aladdineducation.com/guides/offers',
        type: 'website',
    },
};

export default function OffersPage() {
    return (
        <main className="pt-20 min-h-screen bg-white">
            <OfferShowcase />
        </main>
    );
}
