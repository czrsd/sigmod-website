'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookMarked } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GuideOverview() {
    const t = useTranslations('Guide.Overview');

    return (
        <section className='flex flex-col 2xl:flex-row justify-between px-4 gap-6 2xl:gap-0'>
            <div className='max-w-2xl'>
                <div className='flex items-center gap-3 mb-2'>
                    <BookMarked />
                    <h1 className='text-4xl font-extrabold mb-2'>
                        {t('title')}
                    </h1>
                </div>
                <p className='text-md mb-4'>{t('desc')}</p>
                <p className='text-md'>{t('access')}</p>

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
            </div>

            <div className='flex flex-col gap-2 max-w-lg'>
                <h2 className='text-2xl font-semibold'>{t('video.title')}</h2>
                <span className='text-muted-foreground'>{t('video.desc')}</span>
                <video
                    src='/guide/videos/tutorial.mp4'
                    className='w-full rounded-xl'
                    width={520}
                    height={288}
                    controls
                />
                <span
                    className='text-muted-foreground text-xs text-end'
                    title={t('video.creditTitle')}
                >
                    {t('video.credit')}
                </span>
            </div>
        </section>
    );
}
