import { guides } from '@/lib/guidesData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
// import ReactMarkdown from 'react-markdown'; // Removed due to missing dependency
// Actually, to avoid installing new dependencies without permission, I will render the content as simple paragraphs for now, 
// or simpler, I'll just use a utility to split by newlines for the MVP.
// Better yet, I'll just render it as is inside a whitespace-pre-wrap div for now, 
// but since I am "Antigravity", I should probably try to make it look decent.
// Let's stick to standard React rendering of the string for now.

// Wait, I can't easily install react-markdown without asking. 
// I'll implement a simple renderer or just display pre-formatted text.
// Given the "rich aesthetics" requirement, I should try to format it a bit.
// I'll parse the simple markdown I wrote (headers and bold) with regex for a better look.

interface GuidePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export async function generateMetadata({ params }: GuidePageProps) {
    const { slug } = await params;
    const guide = guides.find((g) => g.slug === slug);
    if (!guide) return { title: 'Guide Not Found' };

    const url = `https://aladdineducation.com/guides/${guide.slug}`;

    return {
        title: guide.title,
        description: guide.excerpt,
        alternates: {
            canonical: `/guides/${guide.slug}`,
        },
        openGraph: {
            title: guide.title,
            description: guide.excerpt,
            url: url,
            type: 'article',
            publishedTime: guide.date,
            authors: ['阿拉仃教育'],
            tags: guide.tags,
            images: [
                {
                    url: guide.coverImage,
                    width: 1200,
                    height: 630,
                    alt: guide.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: guide.title,
            description: guide.excerpt,
            images: [guide.coverImage],
        },
    };
}

export default async function GuidePage({ params }: GuidePageProps) {
    const { slug } = await params;
    const guide = guides.find((g) => g.slug === slug);

    if (!guide) {
        notFound();
    }

    // Simple Markdown-ish renderer
    const renderContent = (content: string) => {
        return content.split('\n').map((line, index) => {
            const trimLine = line.trim();
            if (!trimLine) return <br key={index} />;

            if (trimLine.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">{trimLine.replace('## ', '')}</h2>;
            }

            if (trimLine.startsWith('- **')) {
                const parts = trimLine.replace('- **', '').split('**：');
                if (parts.length === 2) {
                    return <li key={index} className="ml-4 list-disc text-slate-700 mb-2"><strong className="text-slate-900">{parts[0]}</strong>：{parts[1]}</li>
                }
            }

            // Basic bold support
            const boldRegex = /\*\*(.*?)\*\*/g;
            const parts = trimLine.split(boldRegex);
            if (parts.length > 1) {
                return (
                    <p key={index} className="text-slate-700 leading-relaxed mb-4">
                        {parts.map((part, i) => (
                            i % 2 === 1 ? <strong key={i} className="text-slate-900">{part}</strong> : part
                        ))}
                    </p>
                )
            }

            return <p key={index} className="text-slate-700 leading-relaxed mb-4">{trimLine}</p>;
        });
    };

    return (
        <article className="bg-white min-h-screen pt-24 pb-16">
            <ArticleJsonLd
                title={guide.title}
                description={guide.excerpt}
                url={`https://aladdineducation.com/guides/${guide.slug}`}
                datePublished={guide.date}
                coverImage={guide.coverImage}
                tags={guide.tags}
                category={guide.category}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: '首页', url: 'https://aladdineducation.com' },
                    { name: '留学指南', url: 'https://aladdineducation.com/guides' },
                    { name: guide.title, url: `https://aladdineducation.com/guides/${guide.slug}` },
                ]}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/guides" className="inline-flex items-center text-slate-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回指南列表
                </Link>

                <header className="mb-10 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 mb-6">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                            {guide.category}
                        </span>
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {guide.date}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {guide.readTime}
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        {guide.title}
                    </h1>
                </header>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-12">
                    {/* Using a placeholder if the image path is local but doesn't exist yet/mocked 
                For now we use the path from data. In a real app we'd verify.
             */}
                    <Image
                        src={guide.coverImage}
                        alt={guide.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="prose prose-slate sm:prose-lg mx-auto max-w-none">
                    {renderContent(guide.content)}
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                        相关话题
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {guide.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors cursor-pointer">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
