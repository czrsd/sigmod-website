'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { detectBrowser } from '@/utils/getLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, LayoutDashboard } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [browser, setBrowser] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('Guide.Sidebar');

    useEffect(() => {
        setBrowser(detectBrowser());
    }, []);

    const steps = [
        { href: '/guide', label: t('overview') },
        { href: '/guide/userscript-manager', label: t('usm') },
        {
            href: '/guide/developer-mode',
            label: browser === 'chrome' ? t('aus_chrome') : t('devmode'),
            skipIfFirefox: true,
        },
        { href: '/guide/sigmod', label: t('sigmod') },
        { href: '/guide/sigfixes', label: t('sigfixes') },
        { href: '/guide/end', label: t('end') },
    ];

    const filteredSteps =
        browser === 'firefox' ? steps.filter((s) => !s.skipIfFirefox) : steps;

    return (
        <div className='flex flex-col md:flex-row w-full min-h-screen bg-[#050505]'>
            <div className='md:hidden p-4 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50'>
                <div className='flex items-center gap-2'>
                    <LayoutDashboard size={18} className='text-blue-500' />
                    <span className='font-black uppercase tracking-tighter text-white'>
                        {t('title')}
                    </span>
                </div>
                <Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    size='icon'
                    variant='ghost'
                    className='text-white'
                >
                    {menuOpen ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </div>

            <aside
                className={`${
                    menuOpen ? 'block' : 'hidden'
                } md:block w-full md:w-80 p-6 border-r border-white/5 bg-[#080808]`}
            >
                <div className='sticky top-10'>
                    <div className='hidden md:flex items-center gap-3 mb-10 px-4'>
                        <div className='w-1 h-6 bg-blue-600 rounded-full' />
                        <span className='font-black text-xl italic uppercase tracking-tighter text-white'>
                            {t('title')}
                        </span>
                    </div>

                    <nav className='flex flex-col gap-1.5'>
                        {filteredSteps.map((step, i) => {
                            const isActive =
                                pathname.replace(/^\/[a-z]{2}/, '') ===
                                step.href;
                            return (
                                <Button
                                    key={step.href}
                                    variant='ghost'
                                    asChild
                                    className={`justify-start h-12 rounded-xl transition-all duration-300 ${
                                        isActive
                                            ? 'bg-blue-600/10 text-blue-400 font-bold border border-blue-600/20'
                                            : 'text-neutral-500 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Link
                                        href={step.href}
                                        className='flex items-center gap-4'
                                    >
                                        <span
                                            className={`text-[10px] w-5 h-5 flex items-center justify-center rounded-md border ${
                                                isActive
                                                    ? 'border-blue-400/30 bg-blue-400/20'
                                                    : 'border-neutral-800'
                                            }`}
                                        >
                                            {i + 1}
                                        </span>
                                        {step.label}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            <main className='flex-1 p-6 md:p-12 lg:p-20 bg-gradient-to-br from-black to-[#0a0a0a]'>
                <div className='max-w-5xl mx-auto'>{children}</div>
            </main>
        </div>
    );
}
