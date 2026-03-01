import { MapPin, Phone, Mail, Send } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-white relative overflow-hidden">
            {/* Subtle tech grid */}
            <div className="absolute inset-0 tech-grid opacity-10"></div>

            {/* Gradient orbs */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-30 animate-float-slow"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl text-shadow">
                            联系我们
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 mb-8">
                            开启您的留学之旅，从一次免费的咨询开始。
                        </p>
                        <a
                            href="/guides"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-secondary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all hover:scale-105 active:scale-95 animate-pulse-glow-lime overflow-hidden shimmer-on-hover"
                        >
                            <span className="mr-2">📚</span>
                            前往留学资料下载中心
                        </a>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <FadeIn direction="right">
                        <div className="bg-slate-50 p-8 rounded-2xl h-full border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-500">
                            <h3 className="text-xl font-bold text-slate-900 mb-8">联系方式</h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-300">
                                    <div className="p-2 rounded-lg bg-red-50 group-hover:animate-pulse-glow transition-all">
                                        <MapPin className="h-6 w-6 text-primary shrink-0" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">全球运营网络</p>
                                        <div className="space-y-1.5 mt-1">
                                            <p className="text-slate-600 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-red-600 rounded-full ring-2 ring-red-50"></span>
                                                <span className="font-bold text-slate-800">安徽阿拉仃：</span> 合肥包河区绿地中心
                                            </p>
                                            <p className="text-slate-600 flex items-center gap-2 pl-0.5">
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                                <span className="font-medium text-slate-700">山东阿拉仃：</span> 济南（山东女子学院）
                                            </p>
                                            <p className="text-slate-600 flex items-center gap-2 pl-0.5">
                                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                                                <span className="font-medium text-slate-700">办事处：</span> 南昌（江西华夏学院）/ 成都名人科技
                                            </p>
                                            <p className="text-slate-600 flex items-center gap-2 pt-2 mt-2 border-t border-slate-100">
                                                <span className="w-2 h-2 bg-blue-600 rounded-full ring-2 ring-blue-50"></span>
                                                <span className="font-bold text-slate-800">马来西亚总部：</span> 吉隆坡 KLCC
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-300">
                                    <div className="p-2 rounded-lg bg-red-50 group-hover:animate-pulse-glow transition-all">
                                        <Phone className="h-6 w-6 text-primary shrink-0" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">电话</p>
                                        <p className="text-slate-600 font-mono">+86 18153480528</p>
                                        <p className="text-slate-600 font-mono">+86 18119962609</p>
                                        <p className="font-bold text-slate-900 mt-2">WhatsApp</p>
                                        <p className="text-slate-600 font-mono">+60 162609624</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group hover:translate-x-1 transition-transform duration-300">
                                    <div className="p-2 rounded-lg bg-red-50 group-hover:animate-pulse-glow transition-all">
                                        <Mail className="h-6 w-6 text-primary shrink-0" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">电子邮箱</p>
                                        <p className="text-slate-600 font-mono">Aladddin.edu@outlook.com</p>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-6 mt-6">
                                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                            <img src="/wechat-qr.png" alt="微信二维码" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 mb-1">添加微信客服</p>
                                            <p className="text-sm text-slate-500">扫描二维码添加微信客服</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Contact Form */}
                    <FadeIn direction="left">
                        <div className="bg-white rounded-lg">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">姓名</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm px-4 py-2 border input-glow transition-all duration-300"
                                            placeholder="请输入您的姓名"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">电话号码</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm px-4 py-2 border input-glow transition-all duration-300"
                                            placeholder="请输入您的电话号码"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="interest" className="block text-sm font-medium text-slate-700">感兴趣的课程</label>
                                    <select
                                        id="interest"
                                        name="interest"
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm px-4 py-2 border input-glow transition-all duration-300"
                                    >
                                        <option>请选择意向学位</option>
                                        <option>本科 (Bachelor&apos;s Degree)</option>
                                        <option>硕士 (Master&apos;s Degree)</option>
                                        <option>博士 (PhD)</option>
                                        <option>语言班 (Language Course)</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">留言内容</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm px-4 py-2 border input-glow transition-all duration-300"
                                        placeholder="简单描述您的需求..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="group w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all duration-300 overflow-hidden relative shimmer-on-hover animate-gradient-text"
                                    style={{
                                        background: 'linear-gradient(135deg, #C41E3A, #FF6347, #C41E3A)',
                                        backgroundSize: '200% 200%',
                                        animation: 'gradient-shift 4s ease infinite',
                                        WebkitTextFillColor: 'white',
                                    }}
                                >
                                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    发送信息
                                </button>
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default Contact;
