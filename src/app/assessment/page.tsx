'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, CheckCircle, GraduationCap, Wallet, BookOpen, Send, User, Phone, Mail } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export default function AssessmentPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        wechat: '',
        currentEducation: '',
        grade: '', // GPA or Score
        englishLevel: '',
        targetDegree: '',
        budget: '',
        intendedMajor: '',
        intakeDate: '',
    });

    const totalSteps = 3;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'assessment',
                    name: formData.name,
                    contact: formData.phone,
                    data: formData
                }),
            });

            if (res.ok) {
                alert('提交成功！我们的顾问将尽快与您联系，为您定制专属留学方案。');
                // Optional: Reset form or redirect
                setStep(1);
                setFormData({
                    name: '',
                    phone: '',
                    wechat: '',
                    currentEducation: '',
                    grade: '',
                    englishLevel: '',
                    targetDegree: '',
                    budget: '',
                    intendedMajor: '',
                    intakeDate: '',
                });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            alert('提交失败，请稍后重试或直接联系我们。');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-4">
                        免费在大马留学评估
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        只需 1 分钟，让 AI 智能为您匹配最适合的马来西亚名校与奖学金方案。
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <span className={`text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-slate-400'}`}>1. 个人信息</span>
                        <span className={`text-sm font-medium ${step >= 2 ? 'text-primary' : 'text-slate-400'}`}>2. 学术背景</span>
                        <span className={`text-sm font-medium ${step >= 3 ? 'text-primary' : 'text-slate-400'}`}>3. 留学意向</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Personal Info */}
                            {step === 1 && (
                                <FadeIn>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                            <div className="p-2 bg-red-50 rounded-lg text-primary">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-800">基本联系信息</h2>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">您的姓名 <span className="text-red-500">*</span></label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                placeholder="请输入您的真实姓名"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">手机号码 <span className="text-red-500">*</span></label>
                                                <input
                                                    required
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="用于接收评估结果"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">微信号碼</label>
                                                <input
                                                    type="text"
                                                    name="wechat"
                                                    value={formData.wechat}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="方便顾问与您沟通"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                            {/* Step 2: Academic Background */}
                            {step === 2 && (
                                <FadeIn key="step2">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-800">当前学术背景</h2>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">目前学历/在读阶段</label>
                                            <select
                                                name="currentEducation"
                                                value={formData.currentEducation}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white"
                                            >
                                                <option value="">请选择...</option>
                                                <option value="high_school">高中在读</option>
                                                <option value="high_school_grad">高中毕业</option>
                                                <option value="undergrad">本科在读</option>
                                                <option value="undergrad_grad">本科毕业</option>
                                                <option value="master">硕士在读/毕业</option>
                                                <option value="other">其他</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">平均分/GPA</label>
                                                <input
                                                    type="text"
                                                    name="grade"
                                                    value={formData.grade}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="例如：85分 或 3.2/4.0"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">英语水平 (IELTS/TOEFL)</label>
                                                <input
                                                    type="text"
                                                    name="englishLevel"
                                                    value={formData.englishLevel}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="例如：雅思 6.0 (暂无填无)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                            {/* Step 3: Study Intentions */}
                            {step === 3 && (
                                <FadeIn key="step3">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                <BookOpen className="w-6 h-6" />
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-800">留学意向规划</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">目标学位</label>
                                                <select
                                                    name="targetDegree"
                                                    value={formData.targetDegree}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white"
                                                >
                                                    <option value="">请选择...</option>
                                                    <option value="bachelor">学士学位 (Bachelor)</option>
                                                    <option value="master">硕士学位 (Master)</option>
                                                    <option value="phd">博士学位 (PhD)</option>
                                                    <option value="language">语言班 (Language)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">意向专业</label>
                                                <input
                                                    type="text"
                                                    name="intendedMajor"
                                                    value={formData.intendedMajor}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                    placeholder="例如：商科、IT、医学"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">预计留学预算 (年/人民币)</label>
                                                <select
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-white"
                                                >
                                                    <option value="">请选择...</option>
                                                    <option value="<5w">5万以内</option>
                                                    <option value="5-8w">5-8万</option>
                                                    <option value="8-12w">8-12万</option>
                                                    <option value="12-20w">12-20万</option>
                                                    <option value=">20w">20万以上</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1">计划入学时间</label>
                                                <input
                                                    type="month"
                                                    name="intakeDate"
                                                    value={formData.intakeDate}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                            {/* Buttons */}
                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                                    >
                                        上一步
                                    </button>
                                ) : (
                                    <div></div> // Spacer
                                )}

                                {step < totalSteps ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-8 py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors flex items-center"
                                    >
                                        下一步
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center"
                                    >
                                        提交免费评估
                                        <Send className="w-4 h-4 ml-2" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Trust Badges */}
                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex flex-wrap justify-between items-center text-xs text-slate-500 gap-4">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>100% 隐私保护</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>24小时内专家回复</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>官方合作院校通道</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
