"use client";

import { FileCheck, GraduationCap, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import GlowCard from './animations/GlowCard';
import { useState, useRef, useEffect, useCallback } from 'react';

const offers = [
    // ——— 马来亚大学 UM（QS #58）———
    {
        university: "马来亚大学 (UM)",
        logo_color: "bg-red-900",
        degree: "Doctor of Philosophy (PhD)",
        major: "Business and Management",
        date: "2025-12-26",
        qs: "QS #58",
    },
    {
        university: "马来亚大学 (UM)",
        logo_color: "bg-red-900",
        degree: "Master of Engineering",
        major: "Electrical Engineering",
        date: "2026-01-15",
        qs: "QS #58",
    },
    {
        university: "马来亚大学 (UM)",
        logo_color: "bg-red-900",
        degree: "Master of Arts",
        major: "Applied Linguistics",
        date: "2026-01-20",
        qs: "QS #58",
    },
    {
        university: "马来亚大学 (UM)",
        logo_color: "bg-red-900",
        degree: "Bachelor Degree",
        major: "Computer Science with Honours",
        date: "2026-02-03",
        qs: "QS #58",
    },
    // ——— 国民大学 UKM（QS #126）———
    {
        university: "马来西亚国民大学 (UKM)",
        logo_color: "bg-red-800",
        degree: "Bachelor Degree",
        major: "Business Administration with Honours",
        date: "2025-12-29",
        qs: "QS #126",
    },
    {
        university: "马来西亚国民大学 (UKM)",
        logo_color: "bg-red-800",
        degree: "Master of Science",
        major: "Information Technology",
        date: "2026-01-08",
        qs: "QS #126",
    },
    {
        university: "马来西亚国民大学 (UKM)",
        logo_color: "bg-red-800",
        degree: "Doctor of Philosophy (PhD)",
        major: "Education",
        date: "2026-01-22",
        qs: "QS #126",
    },
    // ——— 博特拉大学 UPM（QS #134）———
    {
        university: "马来西亚博特拉大学 (UPM)",
        logo_color: "bg-green-800",
        degree: "Bachelor Degree",
        major: "Bachelor of Economics with Honours",
        date: "2026-01-09",
        qs: "QS #134",
    },
    {
        university: "马来西亚博特拉大学 (UPM)",
        logo_color: "bg-green-800",
        degree: "Master of Science",
        major: "Environmental Science",
        date: "2026-01-18",
        qs: "QS #134",
    },
    {
        university: "马来西亚博特拉大学 (UPM)",
        logo_color: "bg-green-800",
        degree: "Doctor of Philosophy (PhD)",
        major: "Agricultural Science",
        date: "2026-02-01",
        qs: "QS #134",
    },
    {
        university: "马来西亚博特拉大学 (UPM)",
        logo_color: "bg-green-800",
        degree: "Bachelor Degree",
        major: "Accounting with Honours",
        date: "2026-02-10",
        qs: "QS #134",
    },
    // ——— 理工大学 UTM（QS #153）———
    {
        university: "马来西亚理工大学 (UTM)",
        logo_color: "bg-blue-900",
        degree: "Bachelor Degree",
        major: "Management (Marketing) with Honours",
        date: "2025-12-19",
        qs: "QS #153",
    },
    {
        university: "马来西亚理工大学 (UTM)",
        logo_color: "bg-blue-900",
        degree: "Master of Engineering",
        major: "Civil Engineering",
        date: "2026-01-12",
        qs: "QS #153",
    },
    {
        university: "马来西亚理工大学 (UTM)",
        logo_color: "bg-blue-900",
        degree: "Bachelor Degree",
        major: "Mechanical Engineering with Honours",
        date: "2026-02-05",
        qs: "QS #153",
    },
];

const OfferShowcase = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
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
        const cardWidth = 280 + 16; // card width + gap
        el.scrollBy({ left: dir === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
    };

    // Auto-scroll
    useEffect(() => {
        const el = scrollRef.current;
        if (!el || !isAutoScrolling) return;

        autoScrollTimer.current = setInterval(() => {
            if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
                el.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                el.scrollBy({ left: 296, behavior: 'smooth' });
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

    return (
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
                            顶尖公立大学 • 真实录取案例 • 下一个就是你
                        </p>
                        <p className="mt-1 text-sm text-gray-500 font-medium">
                            共 {offers.length} 份 Offer · 滑动或点击箭头查看更多
                        </p>
                    </FadeIn>
                </div>

                {/* Carousel wrapper */}
                <div className="relative group/carousel">
                    {/* Left arrow */}
                    <button
                        type="button"
                        onClick={() => { scroll('left'); pauseAutoScroll(); }}
                        aria-label="向左滚动"
                        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#FFD700] hover:bg-primary transition-all ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Right arrow */}
                    <button
                        type="button"
                        onClick={() => { scroll('right'); pauseAutoScroll(); }}
                        aria-label="向右滚动"
                        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#FFD700] hover:bg-primary transition-all ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Fade edges */}
                    <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
                    <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

                    {/* Scrollable container */}
                    <div
                        ref={scrollRef}
                        onMouseEnter={pauseAutoScroll}
                        onTouchStart={pauseAutoScroll}
                        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-1 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                    >
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                        {offers.map((offer, index) => (
                            <div key={index} className="snap-start shrink-0 w-[280px]">
                                <GlowCard glowColor="rgba(196, 30, 58, 0.3)">
                                    <div className="group relative bg-white border-4 border-black h-full flex flex-col shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#FFD700] hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                                        <div className={`h-3 w-full border-b-4 border-black ${offer.logo_color} relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="inline-flex items-center justify-center p-1.5 bg-black text-white border-2 border-black group-hover:bg-primary transition-colors duration-300">
                                                    <Building2 size={16} className="icon-hover-spin" />
                                                </div>
                                                <span className="px-2 py-0.5 text-[10px] font-black uppercase text-black bg-secondary border-2 border-black">
                                                    正式录取
                                                </span>
                                            </div>

                                            <h3 className="text-sm font-black text-black mb-0.5 leading-tight uppercase" title={offer.university}>
                                                {offer.university}
                                            </h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <p className="text-xs font-mono font-bold text-gray-500">{offer.date}</p>
                                                <span className="text-[10px] font-black text-primary bg-red-50 px-1.5 py-0.5 border border-red-200 rounded-sm">
                                                    {offer.qs}
                                                </span>
                                            </div>

                                            <div className="space-y-2.5 flex-1 border-t-2 border-black pt-3">
                                                <div className="flex items-start">
                                                    <GraduationCap className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-gray-400">学位</p>
                                                        <p className="text-xs font-bold text-black leading-tight">{offer.degree}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <FileCheck className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-gray-400">专业</p>
                                                        <p className="text-xs font-bold text-black leading-tight line-clamp-2" title={offer.major}>{offer.major}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-2 border-t-2 border-dashed border-gray-200 flex items-center justify-center gap-1.5 text-gray-400 group-hover:text-primary transition-colors">
                                                <FileCheck size={14} />
                                                <span className="text-[10px] font-bold uppercase">已获官方录取信</span>
                                            </div>
                                        </div>

                                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
                                    </div>
                                </GlowCard>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll indicator dots */}
                <div className="flex justify-center mt-6 gap-1.5">
                    {Array.from({ length: Math.ceil(offers.length / 4) }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`滚动到第 ${i + 1} 组`}
                            onClick={() => {
                                const el = scrollRef.current;
                                if (!el) return;
                                el.scrollTo({ left: i * 296 * 4, behavior: 'smooth' });
                                pauseAutoScroll();
                            }}
                            className="w-8 h-1.5 bg-gray-300 hover:bg-primary transition-colors border border-black"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OfferShowcase;
