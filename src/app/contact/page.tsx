'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white py-16 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-900/20"></div>
                <div className="absolute inset-0 tech-grid opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">联系我们</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        无论您身在何处，我们都随时准备为您解答留学疑惑。
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Office Locations */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <MapPin className="text-primary w-5 h-5" /> 全球办公网络
                            </h3>
                            <div className="space-y-6 text-slate-600 text-sm">
                                {/* China HQ */}
                                <div className="pl-7 relative">
                                    <span className="absolute left-0 top-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-4 ring-red-100"></span>
                                    <p className="font-bold text-slate-900 text-base">中国 · 合肥 (中国总部)</p>
                                    <p className="text-slate-500 text-xs mb-1">CHINA HEADQUARTERS</p>
                                    <p>安徽省合肥市政务文化新区 / 蜀山区</p>
                                </div>

                                {/* Regional Offices */}
                                <div className="pl-7 relative">
                                    <span className="absolute left-0 top-1.5 w-2.5 h-2.5 bg-slate-400 rounded-full"></span>
                                    <p className="font-bold text-slate-900 text-base">中国 · 济南 (华北区办事处)</p>
                                    <p className="text-slate-500 text-xs mb-1">NORTH CHINA OFFICE</p>
                                    <p>山东省济南市高新区 / 历下区CBD</p>
                                </div>

                                <div className="pl-7 relative">
                                    <span className="absolute left-0 top-1.5 w-2.5 h-2.5 bg-slate-400 rounded-full"></span>
                                    <p className="font-bold text-slate-900 text-base">中国 · 南昌 (华中区办事处)</p>
                                    <p className="text-slate-500 text-xs mb-1">CENTRAL CHINA OFFICE</p>
                                    <p>江西省南昌市红谷滩新区</p>
                                </div>

                                {/* Overseas HQ */}
                                <div className="pl-7 relative border-t border-slate-100 pt-4 mt-2">
                                    <span className="absolute left-0 top-6 w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                                    <p className="font-bold text-slate-900 text-base">马来西亚 · 吉隆坡 (马来西亚总部)</p>
                                    <p className="text-slate-500 text-xs mb-1">MALAYSIA HEADQUARTERS</p>
                                    <p>Kuala Lumpur City Centre (KLCC)</p>
                                </div>
                            </div>
                        </div>

                        {/* Direct Contact */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Phone className="text-primary w-5 h-5" /> 直接联系
                            </h3>
                            <div className="space-y-4">
                                <a href="tel:18153480528" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">24小时热线</p>
                                        <p className="font-bold text-slate-900">181-5348-0528</p>
                                    </div>
                                </a>
                                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <MessageCircle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">微信咨询</p>
                                        <p className="font-bold text-slate-900">Aladddin_edu</p>
                                    </div>
                                </div>
                                <a href="mailto:Aladddin.edu@outlook.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">电子邮箱</p>
                                        <p className="font-bold text-slate-900 break-all">Aladddin.edu@outlook.com</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Clock className="text-secondary w-5 h-5" /> 工作时间
                            </h3>
                            <div className="space-y-2 text-sm text-slate-300">
                                <div className="flex justify-between">
                                    <span>周一至周五</span>
                                    <span className="text-white">09:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>周六至周日</span>
                                    <span className="text-white">10:00 - 16:00</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-700 text-xs text-slate-400">
                                    * 非工作时间请留言，我们将在次日优先回复。
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Map Placeholder */}
                        <div className="bg-slate-200 w-full h-64 rounded-2xl overflow-hidden relative flex items-center justify-center group">
                            <Image
                                src="/images/kl-skyline.png" // Using an existing image as placeholder background
                                alt="Location Map"
                                fill
                                className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-slate-900/30"></div>
                            <div className="relative z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-full flex items-center gap-2 shadow-lg animate-bounce">
                                <MapPin className="text-red-600 w-5 h-5" />
                                <span className="font-bold text-slate-900">吉隆坡中心办公室</span>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">发送咨询留言</h2>
                            <ContactForm />
                        </div>

                        {/* FAQ Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-slate-900">常见问题</h3>
                            <div className="bg-white p-4 rounded-xl border border-slate-100">
                                <h4 className="font-semibold text-slate-800 mb-2">咨询是免费的吗？</h4>
                                <p className="text-slate-600 text-sm">是的，我们提供免费的初步留学评估和咨询服务。您可以填写上方的评估表单或直接联系我们。</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100">
                                <h4 className="font-semibold text-slate-800 mb-2">不在马来西亚可以办理吗？</h4>
                                <p className="text-slate-600 text-sm">完全可以。我们的服务全程线上化，通过微信、Zoom 等工具与您保持密切沟通，签约、择校、申请均可远程完成。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        subject: '留学申请咨询',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'contact',
                    name: formData.name,
                    contact: formData.contact,
                    data: formData
                }),
            });

            if (res.ok) {
                alert('留言已发送！我们会尽快回复您。');
                setFormData({ name: '', contact: '', subject: '留学申请咨询', message: '' });
            } else {
                alert('发送失败，请稍后重试。');
            }
        } catch (error) {
            console.error(error);
            alert('发送失败，请稍后重试。');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">姓名</label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="您的称呼"
                    />
                </div>
                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1">联系方式</label>
                    <input
                        type="text"
                        id="contact"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        placeholder="电话或微信号"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">咨询主题</label>
                <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                >
                    <option>留学申请咨询</option>
                    <option>签证办理问题</option>
                    <option>商务合作</option>
                    <option>其他</option>
                </select>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">详细内容</label>
                <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    placeholder="请详细描述您的需求..."
                ></textarea>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? '发送中...' : '提交留言'}
                </button>
            </div>
        </form>
    );
}
