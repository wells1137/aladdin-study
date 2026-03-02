import { Users, Award, Globe } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import AnimatedCounter from './animations/AnimatedCounter';

const About = () => {
    return (
        <section id="about" className="py-20 bg-white relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-30 animate-float-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-20 animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            关于我们
                        </h2>
                        <p className="mt-4 max-w-2xl text-xl text-slate-500 lg:mx-auto">
                            连接中国学生与马来西亚优质教育资源的桥梁。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Story Block - Spans 7 cols */}
                    <div className="lg:col-span-7">
                        <FadeIn direction="right">
                            <a href="https://mp.weixin.qq.com/s/4hItuv3ZQ_f-Gyg1PdzBpA" target="_blank" rel="noopener noreferrer" className="block relative h-full group/story cursor-pointer">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover/story:opacity-40 transition-opacity bg-gradient-animated" style={{ backgroundImage: 'linear-gradient(135deg, #C41E3A, #FFD700, #C41E3A)' }}></div>
                                <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 h-full group-hover/story:shadow-lg group-hover/story:-translate-y-1 transition-all duration-300">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                        <span className="w-2 h-8 bg-blue-600 rounded-full mr-3"></span>
                                        我们的故事
                                    </h3>
                                    <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                                        <p>
                                            阿拉仃教育成立于2020年，在中国和马来西亚均设有总部。我们专注于为中国留学生提供最专业、最透明的马来西亚留学服务。
                                        </p>
                                        <p>
                                            我们的核心团队由马来西亚本地华人及资深归国留学生组成，深谙两国教育体系与文化差异，致力于成为连接中国学生与马来西亚优质教育资源的桥梁。
                                        </p>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-slate-100 flex items-center gap-6">
                                        <div>
                                            <AnimatedCounter
                                                target={2000}
                                                suffix="+"
                                                className="block text-3xl font-bold text-blue-600"
                                            />
                                            <span className="text-sm text-slate-500">成功案例</span>
                                        </div>
                                        <div>
                                            <AnimatedCounter
                                                target={98}
                                                suffix="%"
                                                className="block text-3xl font-bold text-indigo-500"
                                            />
                                            <span className="text-sm text-slate-500">录取率</span>
                                        </div>
                                        <div>
                                            <AnimatedCounter
                                                target={8}
                                                suffix="年+"
                                                className="block text-3xl font-bold text-slate-900"
                                            />
                                            <span className="text-sm text-slate-500">行业深耕</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-primary font-semibold flex items-center gap-1 opacity-0 group-hover/story:opacity-100 transition-opacity">
                                        点击了解更多 →
                                    </div>
                                </div>
                            </a>
                        </FadeIn>
                    </div>

                    {/* Stat/Feature Blocks - Spans 5 cols */}
                    <div className="lg:col-span-5 space-y-6">
                        <FadeIn delay={0.2} direction="left">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-center mb-3">
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600 transition-all">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <h4 className="ml-4 text-lg font-bold text-slate-900">专业团队</h4>
                                </div>
                                <p className="text-slate-500">
                                    拥有多年行业经验的顾问团队，为您提供最精准的留学方案。
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3} direction="left">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-center mb-3">
                                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 transition-all">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <h4 className="ml-4 text-lg font-bold text-slate-900">官方授权</h4>
                                </div>
                                <p className="text-slate-500">
                                    获得马来西亚多所顶尖公立及私立大学的直接招生授权。
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.4} direction="left">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-center mb-3">
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600 transition-all">
                                        <Globe className="h-6 w-6" />
                                    </div>
                                    <h4 className="ml-4 text-lg font-bold text-slate-900">中马双总部</h4>
                                </div>
                                <p className="text-slate-500">
                                    在中国和马来西亚均设有总部，实现境内外无缝对接服务。
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
