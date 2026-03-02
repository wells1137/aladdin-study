import { ArrowRight, Sparkles, Map, BookOpen, MessageCircle } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import ParticleGrid from './animations/ParticleGrid';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative bg-gradient-premium overflow-hidden flex flex-col pt-32 pb-20 min-h-screen">
            {/* Interactive Particle Canvas Background */}
            <ParticleGrid
                className="opacity-20"
                particleCount={40}
                color="255, 255, 255"
                connectionDistance={150}
                speed={0.15}
            />

            {/* Glowing Orbs in Background */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center w-full">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">

                    {/* Left Column - Text Content */}
                    <div className="lg:col-span-6 text-center lg:text-left pt-4 pb-8">
                        <FadeIn delay={0.1} direction="down">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-blue-500/30 text-blue-300 font-medium text-sm mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <Sparkles className="w-4 h-4" />
                                <span>Aladdin Smart Campus Platform 🎉</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
                                开启您的 <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">数字未来</span> <br />
                                马来西亚留学之旅
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                                Discover personalized university recommendations, connect with alumni, and manage your student life effortlessly with our smart platform.
                            </p>
                        </FadeIn>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <FadeIn delay={0.5} direction="up">
                                <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl transition-all premium-glow overflow-hidden">
                                    <span className="relative z-10 flex items-center">
                                        开始探索探索 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </a>
                            </FadeIn>
                            <FadeIn delay={0.6} direction="up">
                                <a href="#services" className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white glass-panel hover:bg-white/10 rounded-2xl transition-all border border-white/10">
                                    了解更多功能
                                </a>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Right Column - Glassmorphism UI Showcase */}
                    <div className="lg:col-span-6 relative mt-16 lg:mt-0 flex items-center justify-center min-h-[500px]">

                        {/* Main App Mockup Card */}
                        <FadeIn delay={0.4} direction="up" className="absolute z-20 w-full max-w-sm">
                            <div className="glass-card rounded-[2rem] p-6 text-white border-t border-l border-white/30 backdrop-blur-2xl">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-sm font-medium text-slate-300">Aladdin Smart Match</span>
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-blue-400" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">匹配 200+ 顶尖院校</h3>
                                <p className="text-slate-400 text-sm mb-6">Real-time analysis based on your background.</p>

                                <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">UM</div>
                                            <div>
                                                <p className="font-bold">马来亚大学</p>
                                                <p className="text-xs text-slate-400">QS rank 60</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-blue-400 font-black text-lg">94%</p>
                                            <p className="text-[10px] text-slate-500">匹配率</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors text-sm flex justify-center items-center gap-2">
                                    Search Universities <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </FadeIn>

                        {/* Floating Card 1 - Social Map */}
                        <FadeIn delay={0.6} direction="right" className="absolute -left-12 top-10 z-30 animate-float">
                            <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                    <Map className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-medium">发现留学生校友</p>
                                    <p className="text-sm font-bold text-white">全球实地打卡地图</p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Floating Card 2 - Community */}
                        <FadeIn delay={0.8} direction="left" className="absolute -right-8 bottom-20 z-30 animate-float-slow">
                            <div className="glass-card rounded-full pr-6 pl-2 py-2 flex items-center gap-3 border border-white/20">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                                    <Image src="/images/avatar-placeholder.png" width={40} height={40} className="rounded-full opacity-80" alt="User" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white leading-tight">@aladdin_scholar</p>
                                    <p className="text-[10px] text-slate-400">刚刚在双子塔打卡</p>
                                </div>
                            </div>
                        </FadeIn>

                    </div>
                </div>
            </div>

            {/* Bottom Fade Gradient to transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default Hero;
