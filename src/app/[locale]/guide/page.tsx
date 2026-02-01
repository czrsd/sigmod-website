'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookMarked, PlayCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GuideOverview() {
    const t = useTranslations('Guide.Overview');

    return (
        <section className='flex flex-col xl:flex-row justify-between gap-12'>
            <div className='max-w-2xl space-y-8'>
                <div>
                    <div className='flex items-center gap-4 mb-4 text-blue-500'>
                        <BookMarked size={32} />
                        <h1 className='text-4xl md:text-5xl font-black tracking-tighter italic text-neutral-800 dark:text-primary'>
                            {t('title')}
                        </h1>
                    </div>
                    <div className='space-y-4 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed'>
                        <p>{t('desc')}</p>
                        <p className='p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-neutral-500 dark:text-neutral-300'>
                            {t('access')}
                        </p>
                    </div>
                </div>

                <div className='flex flex-wrap gap-4'>
                    <Button
                        size='lg'
                        className='bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 shadow-lg shadow-blue-600/20'
                        asChild
                    >
                        <Link href='/guide/userscript-manager'>
                            {t('start')}
                            <ArrowRight className='ml-2' />
                        </Link>
                    </Button>

                    <Button
                        variant='outline'
                        size='lg'
                        className='border-white/10 bg-white/5 hover:bg-white/10 font-bold rounded-full px-8 backdrop-blur-md'
                        asChild
                    >
                        <Link href='/quick-guide'>{t('quickGuide')}</Link>
                    </Button>
                </div>
            </div>

            <div className='flex flex-col gap-4 w-full xl:max-w-lg'>
                <div className='relative group'>
                    <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
                    <div className='relative bg-neutral-900 border border-white/10 p-3 rounded-2xl shadow-2xl overflow-hidden'>
                        <div className='flex items-center gap-2 mb-3 px-2'>
                            <PlayCircle size={18} className='text-blue-500' />
                            <h2 className='text-sm font-bold uppercase tracking-widest text-white'>
                                {t('video.title')}
                            </h2>
                        </div>
                        <video
                            src='/guide/videos/tutorial.mp4'
                            className='w-full rounded-xl bg-black'
                            width={520}
                            height={288}
                            controls
                        />
                    </div>
                </div>
                <div className='px-2 space-y-1'>
                    <p className='text-sm text-neutral-500 leading-snug'>
                        {t('video.desc')}
                    </p>
                    <p
                        className='text-[10px] uppercase font-bold text-neutral-600 text-end'
                        title={t('video.creditTitle')}
                    >
                        {t('video.credit')}
                    </p>
                </div>
            </div>
        </section>
    );
}
