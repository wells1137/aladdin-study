import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import Marquee from './animations/Marquee';
import ParticleGrid from './animations/ParticleGrid';

const Hero = () => {
    return (
        <div className="relative bg-white overflow-hidden flex flex-col pt-20 pb-12">
            {/* Interactive Particle Canvas Background */}
            <ParticleGrid
                className="opacity-40"
                particleCount={50}
                color="196, 30, 58"
                connectionDistance={130}
                speed={0.25}
            />

            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 z-0 tech-grid opacity-30"></div>

            {/* Top Marquee */}
            <div className="w-full spring-banner-gradient border-y-4 border-yellow-600 transform -rotate-1 z-20 mb-6 overflow-hidden">
                <Marquee className="py-2 text-yellow-100 font-black uppercase tracking-widest text-base">
                    <span>🐴 马年大吉 • 恭贺新春 • 2026马来西亚留学 • QS百强名校 • 万事如意 • 工薪首选 • 🏮</span>
                </Marquee>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center">
                <div className="lg:grid lg:grid-cols-12 lg:gap-4">
                    <div className="lg:col-span-7 text-center lg:text-left pt-4 pb-8">
                        <FadeIn delay={0.1} direction="down">
                            <div className="inline-block px-3 py-1 border-2 border-black bg-black text-white font-bold uppercase tracking-widest mb-4 transform -skew-x-12 text-sm">
                                官方授权合作伙伴
                            </div>
                            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-black tracking-tighter leading-[1.15] mb-4">
                                开启您的 <br />
                                <span
                                    className="animate-gradient-text"
                                    style={{ backgroundImage: 'linear-gradient(90deg, #DC143C, #FFD700, #FF4500, #DC143C)' }}
                                >未来</span> <br />
                                <span className="relative inline-block text-3xl sm:text-5xl md:text-6xl mt-1">
                                    马来西亚留学之旅
                                    <span className="absolute bottom-1 sm:bottom-2 left-0 w-full h-2 sm:h-4 bg-secondary -z-10 transform -rotate-1"></span>
                                </span>
                            </h1>

                            {/* 🎆 Spring Festival Greeting Card */}
                            <div className="relative inline-block mb-6 spring-hero-glow rounded-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 border-2 border-yellow-500 rounded-lg px-6 py-3">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="text-2xl sm:text-3xl animate-lantern-swing origin-top">🏮</span>
                                        <div className="text-center">
                                            <p className="text-yellow-300 text-base sm:text-lg font-black tracking-widest whitespace-nowrap">🐴 马年大吉 · 恭贺新春 🐴</p>
                                            <p className="text-yellow-100/80 text-[10px] sm:text-xs mt-0.5 sm:mt-1">阿拉仃教育祝大家新春快乐，学业有成！</p>
                                        </div>
                                        <span className="text-2xl sm:text-3xl animate-lantern-swing origin-top" style={{ animationDelay: '0.5s' }}>🏮</span>
                                    </div>
                                    {/* Sparkle border at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] spring-sparkle-line" />
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="mt-2 text-lg sm:text-xl text-black font-bold max-w-2xl mx-auto lg:mx-0 border-l-4 border-primary pl-4 leading-tight">
                                一站式留学服务 • 98% 录取率 <br />
                                <span className="text-slate-600 font-medium text-base">从申请到落地，我们全程为您保驾护航。</span>
                            </p>
                        </FadeIn>

                        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <FadeIn delay={0.5} direction="up">
                                <a href="#contact" className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-black text-white bg-primary border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#FFD700] hover:-translate-y-1 transition-all tracking-wider animate-pulse-glow overflow-hidden shimmer-on-hover">
                                    免费咨询
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </FadeIn>
                            <FadeIn delay={0.6} direction="up">
                                <a href="#services" className="group inline-flex items-center justify-center px-6 py-3 text-base font-black text-black bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:bg-secondary hover:-translate-y-1 transition-all tracking-wider overflow-hidden shimmer-on-hover">
                                    了解服务
                                </a>
                            </FadeIn>
                        </div>

                        <FadeIn delay={0.8}>
                            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start font-bold text-xs tracking-tight text-black">
                                <div className="flex items-center gap-2 border-2 border-black px-3 py-1.5 bg-white shadow-[2px_2px_0px_0px_#000] hover-lift">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <span>官方合作伙伴</span>
                                </div>
                                <div className="flex items-center gap-2 border-2 border-black px-3 py-1.5 bg-white shadow-[2px_2px_0px_0px_#000] hover-lift">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <span>极速下签</span>
                                </div>
                                <div className="flex items-center gap-2 border-2 border-black px-3 py-1.5 bg-white shadow-[2px_2px_0px_0px_#000] hover-lift">
                                    <CheckCircle className="h-4 w-4 text-primary" />
                                    <span>0 隐形收费</span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center">
                        <FadeIn delay={0.4} direction="left">
                            <div className="relative w-full max-w-sm mx-auto">
                                <div className="absolute top-0 right-0 w-full h-full border-4 border-black bg-secondary transform translate-x-3 translate-y-3"></div>
                                <div className="relative border-4 border-black overflow-hidden bg-white grayscale hover:grayscale-0 transition-all duration-500">
                                    <Image
                                        src="/images/kl-skyline.png"
                                        alt="马来西亚吉隆坡天际线 - 阿拉仃教育助您留学马来西亚"
                                        width={400}
                                        height={300}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
                                </div>
                                {/* Floating Badge with Animation */}
                                <div className="absolute -bottom-6 -left-6 bg-black text-white p-3 border-4 border-secondary shadow-[6px_6px_0px_0px_#FFD700] animate-float">
                                    <p className="text-2xl font-black text-secondary">2026</p>
                                    <p className="text-xs font-bold">春季申请开放中</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
