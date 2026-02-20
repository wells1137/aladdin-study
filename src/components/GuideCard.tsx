import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Guide } from '@/lib/guidesData';

interface GuideCardProps {
    guide: Guide;
}

const GuideCard = ({ guide }: GuideCardProps) => {
    return (
        <Link href={`/guides/${guide.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={guide.coverImage}
                    alt={guide.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                    {guide.category}
                </div>
            </div>

            <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{guide.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{guide.readTime}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {guide.title}
                </h3>

                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {guide.excerpt}
                </p>

                <div className="flex items-center text-red-600 font-semibold text-sm mt-auto group/btn">
                    <span>阅读全文</span>
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </div>
            </div>
        </Link>
    );
};

export default GuideCard;
