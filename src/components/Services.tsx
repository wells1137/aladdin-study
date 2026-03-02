import { GraduationCap, FileText, Languages, Plane, Home, UserCheck, ArrowRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Services = () => {
    const services = [
        {
            title: '升学规划',
            description: '为高中、本科、硕士及博士申请者量身定制马来西亚顶尖大学的学术路径。',
            icon: GraduationCap,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: '申请指导',
            description: '提供全方位的支持，包括材料准备、背景提升建议及专业的面试辅导。',
            icon: FileText,
            iconBg: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
        },
        {
            title: '语言培训',
            description: '提供雅思(IELTS)、MUET及PTE考试的专业培训，助您轻松达到入学语言要求。',
            icon: Languages,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: '签证办理',
            description: '专业处理EMGS（马来西亚教育全球服务）签证流程，拥有高达98%的获签率。',
            icon: Plane,
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
        },
        {
            title: '境外服务',
            description: '提供接机安置、住宿寻找、银行开户及初抵办卡等一站式落地服务。',
            icon: Home,
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
        },
        {
            title: '学业支持',
            description: '提供持续的学业辅导及毕业协助，确保您的留学之旅顺利无忧。',
            icon: UserCheck,
            iconBg: 'bg-rose-100',
            iconColor: 'text-rose-600',
        },
    ];

    return (
        <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <span className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                            Premium Services
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                            全方位留学服务
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                            从前期咨询到学成毕业，我们提供智能、高效、透明的一站式服务体系，让您的留学之路畅通无阻。
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-slate-100">

                                <div className={`w-14 h-14 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}>
                                    <service.icon className={`h-7 w-7 ${service.iconColor}`} aria-hidden="true" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {service.title}
                                </h3>

                                <p className="text-slate-500 mb-6 flex-grow leading-relaxed">
                                    {service.description}
                                </p>

                                <a href="#contact" className="inline-flex items-center text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors mt-auto group-hover:gap-2">
                                    Learn more <ArrowRight className="ml-1 w-4 h-4 transition-all" />
                                </a>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
