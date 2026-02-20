import { GraduationCap, FileText, Languages, Plane, Home, UserCheck } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import GlowCard from './animations/GlowCard';

const Services = () => {
    const services = [
        {
            title: '升学规划',
            description: '为高中、本科、硕士及博士申请者量身定制马来西亚顶尖大学的学术路径。',
            icon: GraduationCap,
            accent: '#C41E3A',
        },
        {
            title: '申请指导',
            description: '提供全方位的支持，包括材料准备、背景提升建议及专业的面试辅导。',
            icon: FileText,
            accent: '#FF6347',
        },
        {
            title: '语言培训',
            description: '提供雅思(IELTS)、MUET及PTE考试的专业培训，助您轻松达到入学语言要求。',
            icon: Languages,
            accent: '#FFD700',
        },
        {
            title: '签证办理',
            description: '专业处理EMGS（马来西亚教育全球服务）签证流程，拥有高达98%的获签率。',
            icon: Plane,
            accent: '#C41E3A',
        },
        {
            title: '境外"管家"服务',
            description: '提供接机安置、住宿寻找、银行开户及初抵办卡等一站式落地服务。',
            icon: Home,
            accent: '#FF6347',
        },
        {
            title: '学业支持',
            description: '提供持续的学业辅导及毕业协助，确保您的留学之旅顺利无忧。',
            icon: UserCheck,
            accent: '#FFD700',
        },
    ];

    return (
        <section id="services" className="py-12 bg-secondary border-y-4 border-black relative overflow-hidden">
            {/* Animated Diagonal Stripes Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(135deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent 100%)', backgroundSize: '20px 20px' }}></div>

            {/* Animated gradient accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-animated" style={{ backgroundImage: 'linear-gradient(90deg, #C41E3A, #FFD700, #FF6347, #C41E3A)' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <FadeIn>
                        <span className="inline-block py-1 px-3 border-2 border-black bg-white text-xs font-black uppercase tracking-widest mb-3">我们的专业服务</span>
                        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-4">
                            全方位 · <span className="text-white text-outline-black">留学服务</span>
                        </h2>
                        <p className="mt-2 max-w-2xl mx-auto text-lg text-black font-bold">
                            从咨询到毕业，我们始终与您同行。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <GlowCard glowColor={`${service.accent}40`}>
                                <div className="relative group bg-white p-5 border-4 border-black h-full shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#C41E3A] hover:-translate-y-1 transition-all duration-200 overflow-hidden scanline">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                                        <service.icon className="h-16 w-16 text-secondary rotate-12 icon-hover-spin" />
                                    </div>

                                    <div className="flex items-center justify-center h-12 w-12 bg-black border-2 border-black text-secondary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-[2px_2px_0px_0px_#888]">
                                        <service.icon className="h-6 w-6 icon-hover-spin" aria-hidden="true" />
                                    </div>

                                    <h3 className="text-xl font-black text-black mb-2 tracking-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-black text-sm font-medium border-l-2 border-secondary pl-3 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-500" style={{ backgroundColor: service.accent }}></div>
                                </div>
                            </GlowCard>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* Bottom animated gradient line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-animated" style={{ backgroundImage: 'linear-gradient(90deg, #C41E3A, #FFD700, #FF6347, #C41E3A)' }}></div>
        </section>
    );
};

export default Services;
