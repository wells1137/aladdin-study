'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type NavItem =
    | { name: string; href: string; highlight?: boolean }
    | { name: string; children: { name: string; href: string }[] };

const navItems: NavItem[] = [
    { name: '留学指南', href: '/guides' },
    { name: '签证进度', href: '/tools/emgs' },
    { name: '3D 社交地图', href: '/community' },
    {
        name: '服务项目',
        children: [
            { name: '专业服务', href: '/#services' },
            { name: '多元业务', href: '/#business' },
        ],
    },
    {
        name: '关于我们',
        children: [
            { name: '关于我们', href: '/#about' },
            { name: '合作院校', href: '/#partners' },
            { name: '联系我们', href: '/contact' },
        ],
    },
    { name: '申请跟踪', href: '/tracker', highlight: true },
];

function DropdownItem({ item }: { item: Extract<NavItem, { children: unknown[] }> }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 text-slate-600 hover:text-primary font-medium transition-colors"
            >
                {item.name}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                    <div className="bg-white rounded-lg shadow-lg border border-slate-100 py-1 min-w-[140px]">
                        {item.children.map((child) => (
                            <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2.5 text-sm text-slate-600 hover:text-primary hover:bg-slate-50 whitespace-nowrap transition-colors"
                                onClick={() => setOpen(false)}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileDropdownItem({
    item,
    onClose,
}: {
    item: Extract<NavItem, { children: unknown[] }>;
    onClose: () => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 rounded-md transition-colors border-b border-slate-50"
            >
                {item.name}
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="pl-4">
                    {item.children.map((child) => (
                        <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-slate-500 hover:text-primary hover:bg-slate-50 rounded-md transition-colors"
                            onClick={onClose}
                        >
                            {child.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b-2 border-red-200" aria-label="主导航栏">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold">
                跳转到主要内容
            </a>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
                            <div className="relative h-16 w-56">
                                <Image src="/logo-cropped.jpg" alt="阿拉仃教育 Logo" fill className="object-contain" priority />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) =>
                            'children' in item ? (
                                <DropdownItem key={item.name} item={item} />
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={
                                        item.highlight
                                            ? 'text-emerald-600 hover:text-emerald-700 font-semibold transition-colors'
                                            : 'text-slate-600 hover:text-primary font-medium transition-colors'
                                    }
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                        <Link
                            href="/assessment"
                            className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md"
                        >
                            免费评估
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-primary p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white/98 backdrop-blur-md border-b border-slate-100 shadow-xl h-screen overflow-y-auto">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) =>
                            'children' in item ? (
                                <MobileDropdownItem key={item.name} item={item} onClose={() => setIsOpen(false)} />
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={
                                        item.highlight
                                            ? 'block px-4 py-3 rounded-md text-base font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors border-b border-slate-50 last:border-0'
                                            : 'block px-4 py-3 rounded-md text-base font-medium text-slate-600 hover:text-primary hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-slate-50 last:border-0'
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            )
                        )}
                        <div className="pt-4 pb-2">
                            <Link
                                href="/assessment"
                                className="block w-full text-center bg-primary text-white px-5 py-3 rounded-md font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                免费智能评估
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
