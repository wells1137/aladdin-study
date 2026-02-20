"use client";

import { FileCheck, GraduationCap, Building2 } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import GlowCard from './animations/GlowCard';

const offers = [
    {
        university: "马来亚大学 (UM)",
        logo_color: "bg-red-900",
        degree: "Doctor of Philosophy (PhD)",
        major: "Business and Management",
        date: "2025-12-26",
        student_label: "2026春季优秀录取"
    },
    {
        university: "马来西亚国民大学 (UKM)",
        logo_color: "bg-red-800",
        degree: "Bachelor Degree",
        major: "Business Administration with Honours",
        date: "2025-12-29",
        student_label: "2026春季优秀录取"
    },
    {
        university: "马来西亚博特拉大学 (UPM)",
        logo_color: "bg-green-800",
        degree: "Bachelor Degree",
        major: "Bachelor of Economics with Honours",
        date: "2026-01-09",
        student_label: "2026春季优秀录取"
    },
    {
        university: "马来西亚理工大学 (UTM)",
        logo_color: "bg-red-900",
        degree: "Bachelor Degree",
        major: "Management (Marketing) with Honours",
        date: "2025-12-19",
        student_label: "2026春季优秀录取"
    }
];

const OfferShowcase = () => {
    return (
        <section id="offers" className="py-12 bg-white relative overflow-hidden">
            {/* Subtle tech grid */}
            <div className="absolute inset-0 tech-grid opacity-10"></div>

            {/* Floating orbs */}
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
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {offers.map((offer, index) => (
                        <FadeIn key={index} delay={index * 0.15}>
                            <GlowCard glowColor="rgba(196, 30, 58, 0.3)">
                                <div className="group relative bg-white border-4 border-black h-full flex flex-col shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#FFD700] hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                                    {/* Card Header with Color Accent */}
                                    <div className={`h-3 w-full border-b-4 border-black ${offer.logo_color} relative overflow-hidden`}>
                                        {/* Shimmer sweep on header */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="inline-flex items-center justify-center p-1.5 bg-black text-white border-2 border-black group-hover:bg-primary transition-colors duration-300">
                                                <Building2 size={16} className="icon-hover-spin" />
                                            </div>
                                            <span className="px-2 py-0.5 text-[10px] font-black uppercase text-black bg-secondary border-2 border-black">
                                                正式录取
                                            </span>
                                        </div>

                                        <h3 className="text-base font-black text-black mb-1 leading-tight uppercase" title={offer.university}>
                                            {offer.university}
                                        </h3>
                                        <p className="text-xs font-mono font-bold text-gray-500 mb-4">{offer.date}</p>

                                        <div className="space-y-3 mb-4 flex-1 border-t-2 border-black pt-3">
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

                                        {/* Placeholder for Offer Letter Image with scanline */}
                                        <div className="relative w-full aspect-[3/4] bg-gray-100 border-2 border-black overflow-hidden group-hover:grayscale-0 grayscale transition-all scanline">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                                                <FileCheck size={24} className="mb-2 opacity-50 text-black" />
                                                <span className="text-[10px] font-black uppercase text-black">官方录取信</span>
                                            </div>
                                            {/* Overlay for hover effect */}
                                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>

                                    {/* Bottom accent line animation */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </GlowCard>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OfferShowcase;
