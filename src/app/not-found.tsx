import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '页面未找到 (404)',
    description: '您访问的页面不存在。请返回首页或浏览我们的留学指南。',
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="text-center max-w-lg">
                <div className="mb-8">
                    <span className="text-8xl font-black text-primary tracking-tighter">404</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                    页面未找到
                </h1>
                <p className="text-lg text-slate-500 mb-8">
                    抱歉，您访问的页面不存在或已被移除。
                    请检查网址是否正确，或浏览下方链接。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-primary border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#CCFF00] hover:-translate-y-1 transition-all"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        返回首页
                    </Link>
                    <Link
                        href="/guides"
                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-black bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-secondary hover:-translate-y-1 transition-all"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        浏览留学指南
                    </Link>
                </div>
            </div>
        </main>
    );
}
