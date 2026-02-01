'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { sigmodLink } from '@/utils/getLink';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Hero() {
    const t = useTranslations('SigModPage.Hero');

    return (
        <section className='relative max-w-6xl mx-auto px-6 py-24 flex flex-col items-center gap-12 text-center overflow-hidden'>
            <div className='space-y-6 relative z-10'>
                <h1 className='text-6xl sm:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]'>
                    <span className='block drop-shadow-2xl'>
                        {t('title').split(' ')[0]}
                    </span>
                    <span className='block bg-gradient-to-b from-primary to-primary/70 text-transparent bg-clip-text filter drop-shadow-[0_0_30px_rgba(var(--primary),0.4)]'>
                        {t('title').split(' ').slice(1).join(' ')}
                    </span>
                </h1>

                <p className='text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed'>
                    {t('sub')}
                </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10'>
                <div className='relative group'>
                    <div className='absolute -inset-1 bg-primary blur opacity-25 group-hover:opacity-60 transition duration-500 rounded-xl' />
                    <Button
                        size='lg'
                        className='relative w-full sm:w-auto h-16 px-10 bg-primary hover:bg-primary/90 font-black uppercase italic text-xl rounded-xl border-t border-white/40 shadow-2xl transition-transform active:scale-95'
                        asChild
                    >
                        <Link
                            href={sigmodLink}
                            className='flex items-center gap-3'
                        >
                            <Download size={22} strokeWidth={3} />
                            {t('install')}
                        </Link>
                    </Button>
                </div>

                <Button
                    variant='outline'
                    size='lg'
                    className='h-16 px-10 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm font-black uppercase italic text-xl rounded-xl transition-all group'
                    asChild
                >
                    <Link href='#features' className='flex items-center gap-2'>
                        {t('explore')}
                        <ArrowRight className='group-hover:translate-x-1 transition-transform' />
                    </Link>
                </Button>
            </div>

            <div className='flex flex-col items-center gap-4 pt-4'>
                <p className='text-[10px] uppercase tracking-[0.2em] font-black text-neutral-500 italic'>
                    {t('require')}
                </p>
                <div className='flex gap-6 opacity-60 hover:opacity-100 transition-opacity'>
                    <Link
                        href='https://tampermonkey.net'
                        className='text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors border-b border-white/10 pb-1'
                    >
                        Tampermonkey
                    </Link>
                    <span className='text-neutral-700 font-black'>//</span>
                    <Link
                        href='https://violentmonkey.github.io'
                        className='text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors border-b border-white/10 pb-1'
                    >
                        Violentmonkey
                    </Link>
                </div>
            </div>
        </section>
    );
}
