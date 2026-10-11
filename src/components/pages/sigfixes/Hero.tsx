'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { sigfixLink } from '@/utils/getLink';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Hero() {
    const t = useTranslations('SigFixesPage.Hero');

    return (
        <section className='relative max-w-4xl mx-auto px-6 pt-12 pb-16 flex flex-col items-center gap-8 text-center'>
            <div className='space-y-4'>
                <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]'>
                    {t('title')}
                </h1>

                <p className='text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed'>
                    {t('sub')}
                </p>
            </div>

            <div className='flex flex-wrap gap-3.5 justify-center'>
                <Button
                    size='lg'
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 rounded-full shadow-md'
                    asChild
                >
                    <Link
                        href={sigfixLink}
                        target='_blank'
                        className='flex items-center gap-2'
                    >
                        <ShieldCheck size={18} />
                        {t('install')}
                    </Link>
                </Button>

                <Button
                    variant='outline'
                    size='lg'
                    className='h-12 px-8 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-semibold rounded-full'
                    asChild
                >
                    <Link href='#features' className='flex items-center gap-2'>
                        {t('explore')}
                        <ArrowRight size={16} />
                    </Link>
                </Button>
            </div>

            <div className='flex items-center gap-2 text-xs text-neutral-500 pt-2'>
                <span>Requires:</span>
                <a
                    href='https://tampermonkey.net'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-foreground hover:underline'
                >
                    Tampermonkey
                </a>
                <span>or</span>
                <a
                    href='https://violentmonkey.github.io'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-medium text-foreground hover:underline'
                >
                    Violentmonkey
                </a>
            </div>
        </section>
    );
}
