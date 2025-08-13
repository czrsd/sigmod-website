'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookMarked } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';

export default function GuideOverview() {
    const t = useTranslations('Guide.Overview');

    return (
        <section className='flex flex-col 2xl:flex-row justify-between px-4'>
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

            <div className='flex flex-col'>
                <h2 className='text-2xl font-semibold'>Video tutorial</h2>
                <span className='text-muted-foreground'>
                    Watch this video if you don't like to read or it's too
                    complicated
                </span>
                <ReactPlayer
                    src='/guide/videos/tutorial.mp4'
                    width={500}
                    height={400}
                    controls
                />
                <span className='text-muted-foreground text-xs text-end'>
                    Video made by fake
                </span>
            </div>
        </section>
    );
}
