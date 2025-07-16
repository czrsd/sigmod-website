'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { detectBrowser } from '@/utils/getLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {} from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Layout({ children }: { children: React.ReactNode }) {
    const [browser, setBrowser] = useState<string | null>(null);
    const pathname = usePathname();
    const t = useTranslations('Guide.Sidebar');

    useEffect(() => {
        setBrowser(detectBrowser());
    }, []);

    const steps = [
        { href: '/guide', label: t('overview') },
        {
            href: '/guide/userscript-manager',
            label: t('usm'),
        },
        {
            href: '/guide/developer-mode',
            label: t('devmode'),
            skipIfFirefox: true,
        },
        { href: '/guide/sigmod', label: t('sigmod') },
        { href: '/guide/sigfixes', label: t('sigfixes') },
        { href: '/guide/end', label: t('end') },
    ];

    const filteredSteps =
        browser === 'firefox'
            ? steps.filter((step) => !step.skipIfFirefox)
            : steps;

    return (
        <div className='flex w-full min-h-screen'>
            <aside className='w-64 p-6 border-r'>
                <nav className='flex flex-col gap-2'>
                    <span className='font-semibold mb-2'>{t('title')}</span>
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
            <main className='flex-1 p-8'>{children}</main>
        </div>
    );
}
