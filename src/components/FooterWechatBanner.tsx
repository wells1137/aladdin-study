import Image from 'next/image';

const FooterWechatBanner = () => {
    return (
        <div className="bg-slate-900 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Brand info */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-3">
                            <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 24 24" fill="#07C160" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.186-.059l2.003-1.175a.89.89 0 01.415-.107.866.866 0 01.282.045 10.27 10.27 0 002.738.369c.207 0 .41-.015.614-.023-.16-.567-.248-1.157-.248-1.766 0-3.784 3.547-6.855 7.924-6.855.245 0 .485.015.724.036C16.898 4.109 13.118 2.188 8.691 2.188zm-3.11 4.49a1.035 1.035 0 110-2.07 1.035 1.035 0 010 2.07zm5.83 0a1.035 1.035 0 110-2.07 1.035 1.035 0 010 2.07z" />
                                <path d="M23.676 14.903c0-3.246-3.37-5.878-7.525-5.878-4.156 0-7.525 2.632-7.525 5.878 0 3.247 3.37 5.879 7.525 5.879.848 0 1.665-.112 2.432-.314a.72.72 0 01.236-.038.74.74 0 01.346.09l1.676.984a.27.27 0 00.156.05.247.247 0 00.242-.247c0-.06-.024-.12-.04-.178l-.327-1.233a.494.494 0 01.178-.556c1.548-1.132 2.626-2.81 2.626-4.437zm-10.53-.766a.872.872 0 110-1.743.872.872 0 010 1.743zm5.98 0a.872.872 0 110-1.743.872.872 0 010 1.743z" />
                            </svg>
                            <span className="text-white font-bold text-lg">大马留学指南</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            你在马来西亚留学路上的专属向导。
                            <br />
                            政策解读 · 院校攻略 · 生活干货，一网打尽。
                        </p>
                    </div>

                    {/* Official account QR */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-lg bg-white p-1 mb-3 relative overflow-hidden">
                            <Image
                                src="/images/wechat-official-qr.png"
                                alt="大马留学指南公众号二维码"
                                fill
                                className="object-contain"
                                sizes="128px"
                            />
                        </div>
                        <p className="text-white font-medium text-sm mb-1">扫码关注公众号</p>
                        <p className="text-gray-400 text-xs">
                            获取最新大马留学政策与干货
                        </p>
                    </div>

                    {/* Advisor QR */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-lg bg-white p-1 mb-3 relative overflow-hidden">
                            <Image
                                src="/images/wechat-advisor-qr.png"
                                alt="顾问老师微信二维码"
                                fill
                                className="object-contain"
                                sizes="128px"
                            />
                        </div>
                        <p className="text-white font-medium text-sm mb-1">扫码添加顾问老师</p>
                        <p className="text-gray-400 text-xs">
                            一对一免费咨询留学方案
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterWechatBanner;
