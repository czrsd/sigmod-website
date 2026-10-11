'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { detectBrowser } from '@/utils/getLink';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

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
        <div className='flex flex-col md:flex-row w-full min-h-screen bg-background'>
            {/* Mobile guide navigation header */}
            <div className='md:hidden p-4 flex items-center justify-between border-b border-black/5 dark:border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-40'>
                <div className='flex items-center gap-2.5'>
                    <BookOpen size={18} className='text-blue-500' />
                    <span className='font-bold text-sm text-foreground'>
                        {t('title')}
                    </span>
                </div>
                <Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    size='sm'
                    variant='outline'
                    className='h-8 px-3 rounded-lg text-xs font-medium'
                >
                    {menuOpen ? 'Hide Steps' : 'View Steps'}
                    {menuOpen ? <ChevronUp size={14} className='ml-1' /> : <ChevronDown size={14} className='ml-1' />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={`${
                    menuOpen ? 'block' : 'hidden'
                } md:block w-full md:w-72 lg:w-80 p-6 md:border-r border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-black/20 shrink-0`}
            >
                <div className='sticky top-20 space-y-6'>
                    <div className='hidden md:block space-y-1 px-2'>
                        <div className='flex items-center gap-2'>
                            <BookOpen size={18} className='text-blue-500' />
                            <h2 className='font-bold text-base text-foreground'>
                                {t('title')}
                            </h2>
                        </div>
                        <p className='text-xs text-neutral-500'>
                            Step-by-step setup walkthrough
                        </p>
                    </div>

                    <nav className='flex flex-col gap-1.5'>
                        {filteredSteps.map((step, i) => {
                            const currentPath = pathname.replace(/^\/[a-z]{2}/, '');
                            const isActive =
                                currentPath === step.href ||
                                (step.href === '/guide' &&
                                    (currentPath === '/guide' || currentPath === ''));

                            return (
                                <Link
                                    key={step.href}
                                    href={step.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                                        isActive
                                            ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-600/20'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                                    }`}
                                >
                                    <span
                                        className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-medium shrink-0 transition-colors ${
                                            isActive
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-black/5 dark:bg-white/5 text-neutral-500'
                                        }`}
                                    >
                                        {i + 1}
                                    </span>
                                    <span className='truncate'>{step.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {browser && (
                        <div className='px-3 py-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 text-xs text-neutral-500'>
                            Browser: <span className='capitalize font-medium text-foreground'>{browser}</span>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className='flex-1 p-6 md:p-12 lg:p-16'>
                <div className='max-w-4xl mx-auto'>{children}</div>
            </main>
        </div>
    );
}
