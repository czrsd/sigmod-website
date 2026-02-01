'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ChevronRight, Zap, ShieldCheck, Users, Layout } from 'lucide-react';

const LINKS = {
    sigfixes: '/sigfixes',
    guide: '/guide',
};

export function WhySigMod() {
    const t = useTranslations('SigModPage.WhySigMod');

    const highlights = [
        { icon: <Layout size={20} />, text: t('highlight1') },
        { icon: <Users size={20} />, text: t('highlight2') },
        { icon: <Zap size={20} />, text: t('highlight3') },
    ];

    return (
        <section className='max-w-5xl mx-auto py-24 px-6 relative'>
            <div className='flex flex-col lg:flex-row gap-16 items-center'>
                <div className='flex-1 space-y-8 text-center lg:text-left'>
                    <div className='space-y-4'>
                        <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none'>
                            {t('title')}
                        </h2>
                        <div className='h-1.5 w-24 bg-primary mx-auto lg:mx-0 rounded-full' />
                    </div>

                    <div className='space-y-6 text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed'>
                        <p className='text-lg text-white/80'>{t('desc1')}</p>
                        <p>{t('desc2')}</p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
                        {highlights.map((h, i) => (
                            <div
                                key={i}
                                className='flex items-center gap-3 text-sm font-bold uppercase italic text-primary'
                            >
                                <span className='p-2 rounded-lg bg-primary/10 border border-primary/20'>
                                    {h.icon}
                                </span>
                                {h.text}
                            </div>
                        ))}
                    </div>

                    <div className='p-4 rounded-2xl bg-white/5 border border-white/10 text-sm'>
                        <p className='text-neutral-600 dark:text-neutral-400'>
                            ⚡ {t('performance')}{' '}
                            <Link
                                href={LINKS.sigfixes}
                                className='text-primary hover:underline font-bold'
                            >
                                SigFixes
                            </Link>{' '}
                            {t('smooth')}
                        </p>
                    </div>

                    <div className='flex justify-center lg:justify-start pt-4'>
                        <Button
                            size='lg'
                            className='group h-14 px-8 rounded-xl font-black uppercase italic text-lg transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(var(--primary),0.4)]'
                            asChild
                        >
                            <Link
                                href={LINKS.guide}
                                className='flex items-center gap-2'
                            >
                                {t('getStarted')}
                                <ChevronRight className='transition-transform group-hover:translate-x-1' />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className='flex-1 relative w-full max-w-[400px] aspect-square hidden md:block'>
                    <div className='absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse' />
                    <div className='relative h-full w-full rounded-[2.5rem] border border-white/10 bg-neutral-600/50 dark:bg-neutral-900/50 backdrop-blur-xl p-8 flex flex-col justify-center items-center overflow-hidden'>
                        <ShieldCheck
                            size={120}
                            className='text-primary opacity-20 absolute -top-10 -right-10 rotate-12'
                        />
                        <div className='space-y-6 relative z-10'>
                            <div className='h-2 w-32 bg-primary/40 rounded-full animate-bounce' />
                            <div className='h-2 w-48 bg-white/10 rounded-full' />
                            <div className='h-2 w-40 bg-white/10 rounded-full' />
                            <div className='pt-4 flex gap-2'>
                                <div className='h-8 w-8 rounded bg-primary/20 border border-primary/40' />
                                <div className='h-8 w-8 rounded bg-white/5 border border-white/10' />
                                <div className='h-8 w-8 rounded bg-white/5 border border-white/10' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
