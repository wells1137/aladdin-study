import Link from 'next/link';
import FadeIn from './animations/FadeIn';
import GlowCard from './animations/GlowCard';

const Partners = () => {
    const publicUniversities = [
        { name: "马来亚大学 (UM)", url: "https://www.um.edu.my", rank: "QS #60" },
        { name: "马来西亚博特拉大学 (UPM)", url: "https://www.upm.edu.my", rank: "QS #143" },
        { name: "马来西亚国民大学 (UKM)", url: "https://www.ukm.my", rank: "QS #159" },
        { name: "马来西亚理科大学 (USM)", url: "https://www.usm.my", rank: "QS #137" },
        { name: "马来西亚理工大学 (UTM)", url: "https://www.utm.my", rank: "QS #188" }
    ];

    const privateUniversities = [
        { name: "泰莱大学 (Taylor's University)", url: "https://university.taylors.edu.my", rank: "QS #284" },
        { name: "思特雅大学 (UCSI University)", url: "https://www.ucsiuniversity.edu.my", rank: "QS #300" },
        { name: "双威大学 (Sunway University)", url: "https://sunwayuniversity.edu.my", rank: "QS #386" },
        { name: "亚太科技大学 (APU)", url: "https://www.apu.edu.my", rank: "马来西亚TOP私立" },
        { name: "英迪国际大学 (INTI International University)", url: "https://newinti.edu.my", rank: "全球化教育" }
    ];

    return (
        <section id="partners" className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Animated background blurs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-50/50 blur-3xl animate-pulse"></div>
                <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-lime-50/40 blur-3xl animate-float-slow"></div>
            </div>

            {/* Tech grid subtle background */}
            <div className="absolute inset-0 tech-grid opacity-15"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl text-gradient inline-block">
                            合作院校
                        </h2>
                        <p className="mt-4 text-xl text-slate-500">
                            我们要么不做，要做就做最好；我们为您精选马来西亚最优质的教育资源。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <FadeIn direction="left">
                        <GlowCard glowColor="rgba(196, 30, 58, 0.25)">
                            <div className="gradient-border-gold p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-lg">
                                <h3 className="text-2xl font-bold text-primary mb-6 border-b-2 border-secondary pb-2 inline-block">公立大学</h3>
                                <ul className="space-y-4">
                                    {publicUniversities.map((uni, index) => (
                                        <li key={index} className="flex items-center text-slate-700 hover:text-primary transition-all duration-300 group/item hover:translate-x-2">
                                            <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0 group-hover/item:animate-pulse-glow-lime transition-all"></span>
                                            <a href={uni.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex-1">
                                                {uni.name}
                                            </a>
                                            <span className="text-xs font-bold text-white bg-primary px-2.5 py-1 rounded-full shadow-sm">{uni.rank}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </GlowCard>
                    </FadeIn>

                    <FadeIn direction="right">
                        <GlowCard glowColor="rgba(204, 255, 0, 0.25)">
                            <div className="gradient-border-gold p-8 h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-lg">
                                <h3 className="text-2xl font-bold text-primary mb-6 border-b-2 border-secondary pb-2 inline-block">私立大学</h3>
                                <ul className="space-y-4">
                                    {privateUniversities.map((uni, index) => (
                                        <li key={index} className="flex items-center text-slate-700 hover:text-primary transition-all duration-300 group/item hover:translate-x-2">
                                            <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0 group-hover/item:animate-pulse-glow-lime transition-all"></span>
                                            <a href={uni.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex-1">
                                                {uni.name}
                                            </a>
                                            <span className="text-xs font-bold text-white bg-primary px-2.5 py-1 rounded-full shadow-sm">{uni.rank}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </GlowCard>
                    </FadeIn>
                </div>

                <FadeIn delay={0.4}>
                    <div className="text-center mt-12">
                        <Link href="#contact" className="text-primary font-medium hover:text-secondary transition-colors inline-flex items-center group">
                            <span className="group-hover:translate-x-1 transition-transform">查看完整合作名单 &rarr;</span>
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Partners;
