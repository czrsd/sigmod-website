'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GuideOverview() {
    const t = useTranslations('Guide.Overview');

    return (
        <section className='max-w-3xl px-4'>
            <h1 className='text-4xl font-extrabold mb-4'>{t('title')}</h1>
            <p className='text-md mb-4'>{t('desc')}</p>
            <p className='text-md mb-8'>{t('access')}</p>

            <div className='space-x-3 mt-10'>
                <Button asChild>
                    <Link href='/guide/userscript-manager'>
                        {t('start')}
                        <ArrowRight />
                    </Link>
                </Button>

                <Button variant={'outline'} asChild>
                    <Link href='/quick-guide'>{t('quickGuide')}</Link>
                </Button>
            </div>
        </section>
    );
}
