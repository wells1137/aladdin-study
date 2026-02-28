"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

const offers = [
    {
        university: "马来亚大学",
        abbr: "UM",
        qs: 58,
        majorCn: "哲学博士 · 商业管理",
        major: "Doctor of Philosophy – Business and Management",
        date: "2025-12-26",
        image: "/images/offers/offer-01-um-phd-bm.png",
    },
    {
        university: "马来亚大学",
        abbr: "UM",
        qs: 58,
        majorCn: "哲学博士 · 教育学",
        major: "Doctor of Philosophy – Education",
        date: "2026-01-26",
        image: "/images/offers/offer-02-um-phd-edu.png",
    },
    {
        university: "马来西亚国立大学",
        abbr: "UKM",
        qs: 126,
        majorCn: "工商管理本科",
        major: "Bachelor in Business Administration with Honours",
        date: "2025-12-29",
        image: "/images/offers/offer-03-ukm-bba-1.png",
    },
    {
        university: "马来西亚国立大学",
        abbr: "UKM",
        qs: 126,
        majorCn: "工商管理本科",
        major: "Bachelor in Business Administration with Honours",
        date: "2025-12-29",
        image: "/images/offers/offer-04-ukm-bba-2.png",
    },
    {
        university: "马来西亚国立大学",
        abbr: "UKM",
        qs: 126,
        majorCn: "工商管理本科",
        major: "Bachelor in Business Administration with Honours",
        date: "2025-12-29",
        image: "/images/offers/offer-05-ukm-bba-3.png",
    },
    {
        university: "马来西亚国立大学",
        abbr: "UKM",
        qs: 126,
        majorCn: "工商管理本科",
        major: "Bachelor in Business Administration with Honours",
        date: "2025-12-31",
        image: "/images/offers/offer-06-ukm-bba-4.png",
    },
    {
        university: "马来西亚国立大学",
        abbr: "UKM",
        qs: 126,
        majorCn: "工商管理本科",
        major: "Bachelor in Business Administration with Honours",
        date: "2025-12-31",
        image: "/images/offers/offer-07-ukm-bba-5.png",
    },
    {
        university: "马来西亚博特拉大学",
        abbr: "UPM",
        qs: 134,
        majorCn: "经济学本科",
        major: "Bachelor of Economics with Honours",
        date: "2026-01-09",
        image: "/images/offers/offer-08-upm-econ.png",
    },
    {
        university: "马来西亚博特拉大学",
        abbr: "UPM",
        qs: 134,
        majorCn: "计算机科学本科",
        major: "Bachelor in Computer Science with Honours",
        date: "2026-01-09",
        image: "/images/offers/offer-09-upm-cs.png",
    },
    {
        university: "马来西亚博特拉大学",
        abbr: "UPM",
        qs: 134,
        majorCn: "传播学本科",
        major: "Bachelor of Communication with Honours",
        date: "2026-01-12",
        image: "/images/offers/offer-10-upm-comm-1.png",
    },
    {
        university: "马来西亚博特拉大学",
        abbr: "UPM",
        qs: 134,
        majorCn: "传播学本科",
        major: "Bachelor of Communication with Honours",
        date: "2026-01-12",
        image: "/images/offers/offer-11-upm-comm-2.png",
    },
    {
        university: "马来西亚博特拉大学",
        abbr: "UPM",
        qs: 134,
        majorCn: "计算机科学本科（网络方向）",
        major: "Bachelor in Computer Science (Computer Network) with Honours",
        date: "2026-01-23",
        image: "/images/offers/offer-12-upm-cs-net.png",
    },
    {
        university: "马来西亚理工大学",
        abbr: "UTM",
        qs: 153,
        majorCn: "电子信息工程本科",
        major: "Bachelor of Electronic Systems Engineering with Honours",
        date: "2026-01-19",
        image: "/images/offers/offer-13-utm-elec.png",
    },
    {
        university: "马来西亚理工大学",
        abbr: "UTM",
        qs: 153,
        majorCn: "商业管理本科（国际商务）",
        major: "Bachelor of Business Administration (International Business) with Honours",
        date: "2026-01-14",
        image: "/images/offers/offer-14-utm-bba-1.png",
    },
    {
        university: "马来西亚理工大学",
        abbr: "UTM",
        qs: 153,
        majorCn: "商业管理本科（国际商务）",
        major: "Bachelor of Business Administration (International Business) with Honours",
        date: "2026-01-14",
        image: "/images/offers/offer-15-utm-bba-2.png",
    },
    {
        university: "马来西亚理工大学",
        abbr: "UTM",
        qs: 153,
        majorCn: "商业管理本科（国际商务）",
        major: "Bachelor of Business Administration (International Business) with Honours",
        date: "2026-01-14",
        image: "/images/offers/offer-16-utm-bba-3.png",
    },
];

const OfferShowcase = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 2);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
    }, []);

    const scroll = (dir: 'left' | 'right') => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = 260 + 16;
        el.scrollBy({ left: dir === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el || !isAutoScrolling) return;

        autoScrollTimer.current = setInterval(() => {
            if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: 276, behavior: 'smooth' });
            }
        }, 3000);

        return () => {
            if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
        };
    }, [isAutoScrolling]);

    const pauseAutoScroll = () => {
        setIsAutoScrolling(false);
        if (pauseTimer.current) clearTimeout(pauseTimer.current);
        pauseTimer.current = setTimeout(() => setIsAutoScrolling(true), 8000);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
        return () => el.removeEventListener('scroll', checkScroll);
    }, [checkScroll]);

    useEffect(() => {
        if (lightbox !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [lightbox]);

    const qsColor = (qs: number) => {
        if (qs <= 60) return 'bg-red-600 text-white';
        if (qs <= 130) return 'bg-orange-500 text-white';
        return 'bg-blue-600 text-white';
    };

    return (
        <>
            <section id="offers" className="py-12 bg-white relative overflow-hidden">
                <div className="absolute inset-0 tech-grid opacity-10"></div>
                <div className="absolute top-20 right-20 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-lime-50 rounded-full blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: '3s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-10">
                        <FadeIn>
                            <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-3">
                                2026 <span
                                    className="animate-gradient-text"
                                    style={{ backgroundImage: 'linear-gradient(90deg, #C41E3A, #FF6347, #FFD700, #C41E3A)' }}
                                >名校录取捷报</span>
                            </h2>
                            <div className="w-full h-3 bg-secondary skew-x-12 max-w-xs mx-auto mb-4 bg-gradient-animated" style={{ backgroundImage: 'linear-gradient(90deg, #FFD700, #C41E3A, #FFD700)' }}></div>
                            <p className="mt-2 text-lg text-black font-bold max-w-2xl mx-auto">
                                顶尖公立大学 · 真实录取案例 · 下一个就是你
                            </p>
                            <p className="mt-1 text-sm text-gray-500 font-medium">
                                共 {offers.length} 份 Offer · 点击查看录取信原件 · 滑动或点击箭头查看更多
                            </p>
                        </FadeIn>
                    </div>

                    <div className="relative group/carousel">
                        <button
                            type="button"
                            onClick={() => { scroll('left'); pauseAutoScroll(); }}
                            aria-label="向左滚动"
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#FFD700] hover:bg-primary transition-all ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            type="button"
                            onClick={() => { scroll('right'); pauseAutoScroll(); }}
                            aria-label="向右滚动"
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#FFD700] hover:bg-primary transition-all ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        >
                            <ChevronRight size={20} />
                        </button>

                        <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
                        <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

                        <div
                            ref={scrollRef}
                            onMouseEnter={pauseAutoScroll}
                            onTouchStart={pauseAutoScroll}
                            className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-1 snap-x snap-mandatory"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                        >
                            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                            {offers.map((offer, index) => (
                                <div key={index} className="snap-start shrink-0 w-[260px]">
                                    <div
                                        className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-100"
                                        onClick={() => setLightbox(index)}
                                    >
                                        <div className="relative w-full aspect-[3/5] bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
                                            <Image
                                                src={offer.image}
                                                alt={`${offer.university} ${offer.majorCn} 录取信`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="260px"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <div className="absolute top-2 left-2">
                                                <span className={`inline-block px-2 py-0.5 text-[10px] font-black rounded ${qsColor(offer.qs)}`}>
                                                    QS {offer.qs}
                                                </span>
                                            </div>
                                            <div className="absolute top-2 right-2">
                                                <span className="inline-block px-2 py-0.5 text-[10px] font-black rounded bg-green-500 text-white">
                                                    已录取
                                                </span>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                                <h3 className="text-white text-sm font-bold leading-tight drop-shadow-lg">
                                                    {offer.university}
                                                </h3>
                                                <p className="text-white/90 text-xs mt-0.5 drop-shadow-lg">
                                                    {offer.majorCn}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                                点击查看大图
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6 gap-1.5">
                        {Array.from({ length: Math.ceil(offers.length / 4) }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                aria-label={`滚动到第 ${i + 1} 组`}
                                onClick={() => {
                                    const el = scrollRef.current;
                                    if (!el) return;
                                    el.scrollTo({ left: i * 276 * 4, behavior: 'smooth' });
                                    pauseAutoScroll();
                                }}
                                className="w-8 h-1.5 bg-gray-300 hover:bg-primary transition-colors rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        type="button"
                        className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-bold z-10 w-10 h-10 flex items-center justify-center"
                        onClick={() => setLightbox(null)}
                        aria-label="关闭"
                    >
                        ✕
                    </button>

                    <button
                        type="button"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox > 0 ? lightbox - 1 : offers.length - 1); }}
                        aria-label="上一张"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-10 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); setLightbox(lightbox < offers.length - 1 ? lightbox + 1 : 0); }}
                        aria-label="下一张"
                    >
                        <ChevronRight size={28} />
                    </button>

                    <div
                        className="relative max-w-lg w-full max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={offers[lightbox].image}
                            alt={`${offers[lightbox].university} ${offers[lightbox].majorCn} 录取信`}
                            width={600}
                            height={1000}
                            className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                            priority
                        />
                        <div className="text-center mt-3">
                            <p className="text-white font-bold text-lg">
                                {offers[lightbox].university} ({offers[lightbox].abbr})
                            </p>
                            <p className="text-white/80 text-sm">
                                {offers[lightbox].majorCn} · {offers[lightbox].date}
                            </p>
                            <p className="text-white/50 text-xs mt-1">
                                {lightbox + 1} / {offers.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OfferShowcase;
