import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthContext';
import ConditionalShell from '@/components/ConditionalShell';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://aladdineducation.com'),
  title: {
    default: '阿拉仃教育 (Aladdin Education) | 马来西亚留学专家',
    template: '%s | 阿拉仃教育',
  },
  description: '阿拉仃教育是您最值得信赖的马来西亚留学伙伴。提供从选校咨询、申请办理、签证辅导到境外接机、住宿安排的全方位一站式服务。助您轻松开启大马留学之旅。',
  keywords: ['马来西亚留学', '马来西亚大学申请', '马来亚大学', '博特拉大学', '留学中介', '阿拉仃教育', 'Aladdin Education', '马来西亚签证', '留学费用', '留学指南'],
  authors: [{ name: 'Aladdin Education' }],
  creator: 'Aladdin Education',
  publisher: 'Aladdin Education',
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': 'https://aladdineducation.com',
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: '阿拉仃教育 | 马来西亚留学一站式服务',
    description: '专业团队助您圆梦马来西亚名校。高达98%的签证成功率，官方授权合作伙伴。',
    url: 'https://aladdineducation.com',
    siteName: 'Aladdin Education',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/images/kl-skyline.png',
        width: 1200,
        height: 630,
        alt: '阿拉仃教育 - 马来西亚留学专家',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '阿拉仃教育 | 马来西亚留学专家',
    description: '专业团队助您圆梦马来西亚名校。高达98%的签证成功率。',
    images: ['/images/kl-skyline.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased text-slate-900 bg-white`}>
        <AuthProvider>
          <ConditionalShell>
            {children}
          </ConditionalShell>
        </AuthProvider>
      </body>
    </html>
  );
}
