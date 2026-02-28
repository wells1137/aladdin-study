import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import FooterWechatBanner from './FooterWechatBanner';

const Footer = () => {
    return (
        <footer>
            <FooterWechatBanner />
            <div className="bg-gradient-to-b from-red-50 to-red-100 border-t-2 border-red-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold text-primary mb-4 block">
                            阿拉仃教育
                        </Link>
                        <p className="text-slate-600 mb-6">
                            您在马来西亚值得信赖的留学伙伴。从申请到毕业，我们全程陪伴。
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" rel="nofollow" aria-label="Facebook" className="text-slate-400 hover:text-secondary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" rel="nofollow" aria-label="Instagram" className="text-slate-400 hover:text-secondary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" rel="nofollow" aria-label="LinkedIn" className="text-slate-400 hover:text-secondary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">服务项目</h3>
                        <ul className="space-y-3">
                            <li><Link href="#services" className="text-slate-600 hover:text-secondary">升学规划</Link></li>
                            <li><Link href="/tools/emgs" className="text-slate-600 hover:text-secondary">签证进度查询</Link></li>
                            <li><Link href="#services" className="text-slate-600 hover:text-secondary">语言培训</Link></li>
                            <li><Link href="/#services" className="text-slate-600 hover:text-secondary">境外服务</Link></li>
                            <li><Link href="/assessment" className="text-secondary font-bold hover:text-primary">免费留学评估</Link></li>
                            <li>
                                <a href="/guides" className="text-primary font-medium hover:text-secondary flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-primary mb-0.5"></span>
                                    留学指南下载中心
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">公司信息</h3>
                        <ul className="space-y-3">
                            <li><Link href="/#about" className="text-slate-600 hover:text-secondary">关于我们</Link></li>
                            <li><Link href="/#partners" className="text-slate-600 hover:text-secondary">合作院校</Link></li>
                            <li><Link href="/contact" className="text-slate-600 hover:text-secondary">联系我们</Link></li>
                            <li><Link href="#" rel="nofollow" className="text-slate-600 hover:text-secondary">隐私政策</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-4">联系方式</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-slate-600">
                                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                                <div>
                                    <span className="block font-bold text-slate-700">CN：中国总部 (合肥/济南/南昌)</span>
                                    <span className="block text-sm mt-1">MY：马来西亚总部 (吉隆坡)</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <Phone className="h-5 w-5 text-secondary shrink-0" />
                                <span>18153480528 / 18119962609</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <Mail className="h-5 w-5 text-secondary shrink-0" />
                                <span>Aladddin.edu@outlook.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Aladdin Education Technology. 保留所有权利。</p>
                </div>
            </div>
            </div>
        </footer>
    );
};

export default Footer;
