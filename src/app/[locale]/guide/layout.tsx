'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { detectBrowser } from '@/utils/getLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [browser, setBrowser] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('Guide.Sidebar');

    useEffect(() => {
        setBrowser(detectBrowser());
        if (window.innerWidth < 768) setMenuOpen(true);
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
        <div className='flex flex-col md:flex-row w-full min-h-screen'>
            <div className='md:hidden p-4 flex items-center justify-between'>
                <span className='font-semibold'>{t('title')}</span>
                <Button
                    onClick={() => setMenuOpen(!menuOpen)}
                    size='icon'
                    variant='ghost'
                >
                    {menuOpen ? (
                        <ChevronUp className='text-foreground' />
                    ) : (
                        <ChevronDown className='text-foreground' />
                    )}
                </Button>
            </div>

            <aside
                className={`${
                    menuOpen ? 'block' : 'hidden'
                } md:block w-full md:w-64 p-6 border-r bg-background`}
            >
                <nav className='flex flex-col gap-2'>
                    <span className='font-semibold mb-2 hidden md:block'>
                        {t('title')}
                    </span>
                    {filteredSteps.map((step, i) => {
                        const isActive =
                            pathname.replace(/^\/[a-z]{2}/, '') === step.href;
                        return (
                            <Button
                                key={step.href}
                                variant='ghost'
                                asChild
                                className={`justify-start ${
                                    isActive ? 'bg-muted font-semibold' : ''
                                }`}
                            >
                                <Link href={step.href}>
                                    {`${i + 1}. ${step.label}`}
                                </Link>
                            </Button>
                        );
                    })}
                </nav>
            </aside>

            <main className='flex-1 p-6 md:p-8'>{children}</main>
        </div>
    );
}
