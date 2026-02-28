const WX_BIZ = 'MzkyMjM4MTYyMQ==';
const historyUrl = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${WX_BIZ}&scene=124#wechat_redirect`;

const WechatArticlesEntry = () => {
    return (
        <div className="mt-12 p-6 md:p-8 bg-green-50 border border-green-100 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="#07C160" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.328.328 0 00.186-.059l2.003-1.175a.89.89 0 01.415-.107.866.866 0 01.282.045 10.27 10.27 0 002.738.369c.207 0 .41-.015.614-.023-.16-.567-.248-1.157-.248-1.766 0-3.784 3.547-6.855 7.924-6.855.245 0 .485.015.724.036C16.898 4.109 13.118 2.188 8.691 2.188zm-3.11 4.49a1.035 1.035 0 110-2.07 1.035 1.035 0 010 2.07zm5.83 0a1.035 1.035 0 110-2.07 1.035 1.035 0 010 2.07z" />
                    <path d="M23.676 14.903c0-3.246-3.37-5.878-7.525-5.878-4.156 0-7.525 2.632-7.525 5.878 0 3.247 3.37 5.879 7.525 5.879.848 0 1.665-.112 2.432-.314a.72.72 0 01.236-.038.74.74 0 01.346.09l1.676.984a.27.27 0 00.156.05.247.247 0 00.242-.247c0-.06-.024-.12-.04-.178l-.327-1.233a.494.494 0 01.178-.556c1.548-1.132 2.626-2.81 2.626-4.437zm-10.53-.766a.872.872 0 110-1.743.872.872 0 010 1.743zm5.98 0a.872.872 0 110-1.743.872.872 0 010 1.743z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800">
                    往期精选 · 大马留学指南公众号
                </h3>
            </div>

            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
                更多深度好文，尽在微信公众号「大马留学指南」。
                <br />
                关注后即可查看全部历史文章，获取最新大马留学政策与干货。
            </p>

            <a
                href={historyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#07C160] text-white font-semibold rounded-lg hover:bg-[#06ae56] transition-colors shadow-sm hover:shadow-md"
            >
                前往公众号查看全部文章
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </a>
        </div>
    );
};

export default WechatArticlesEntry;
