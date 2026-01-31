'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { ChevronRight, Zap, ShieldCheck, Gauge, Activity } from 'lucide-react';

const LINKS = {
    sigmod: '/sigmod',
    guide: '/guide',
};

export function WhySigFixes() {
    const t = useTranslations('SigFixesPage.WhySigFixes');

    const highlights = [
        {
            icon: <Gauge size={20} />,
            text: t('highlight1') || 'Max Performance',
        },
        {
            icon: <ShieldCheck size={20} />,
            text: t('highlight2') || 'Stable Frames',
        },
        {
            icon: <Zap size={20} />,
            text: t('highlight3') || 'Input Optimization',
        },
    ];

    return (
        <section className='max-w-6xl mx-auto py-24 px-6 relative'>
            <div className='flex flex-col lg:flex-row gap-16 items-center'>
                <div className='flex-1 space-y-8 text-center lg:text-left'>
                    <div className='space-y-4'>
                        <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none'>
                            {t('title')}
                        </h2>
                        <div className='h-1.5 w-24 bg-cyan-500 mx-auto lg:mx-0 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]' />
                    </div>

                    <div className='space-y-6 text-neutral-400 font-medium leading-relaxed'>
                        <p className='text-lg text-white/80'>{t('desc1')}</p>
                        <p>{t('desc2')}</p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4'>
                        {highlights.map((h, i) => (
                            <div
                                key={i}
                                className='flex items-center gap-3 text-sm font-bold uppercase italic text-cyan-400'
                            >
                                <span className='p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20'>
                                    {h.icon}
                                </span>
                                {h.text}
                            </div>
                        ))}
                    </div>

                    <div className='p-4 rounded-2xl bg-white/5 border border-white/10 text-sm'>
                        <p className='text-neutral-400 flex items-center justify-center lg:justify-start gap-2 flex-wrap'>
                            <Activity size={16} className='text-cyan-500' />
                            {t('worksWith')}{' '}
                            <Link
                                href={LINKS.sigmod}
                                className='text-cyan-400 hover:text-cyan-300 font-bold underline decoration-cyan-500/30'
                            >
                                SigMod
                            </Link>{' '}
                            {t('combo')}
                        </p>
                    </div>

                    <div className='flex justify-center lg:justify-start pt-4'>
                        <Button
                            size='lg'
                            className='group h-14 px-10 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-black uppercase italic text-lg transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)]'
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

                <div className='flex-1 relative w-full max-w-[440px] aspect-square hidden md:block'>
                    <div className='absolute inset-0 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse' />

                    <div className='relative h-full w-full rounded-[2.5rem] border border-white/10 bg-neutral-900/40 backdrop-blur-2xl p-10 flex flex-col justify-center gap-6 overflow-hidden'>
                        <Gauge
                            size={140}
                            className='text-cyan-500 opacity-10 absolute -top-10 -right-10 rotate-12'
                        />

                        <div className='space-y-4 relative z-10'>
                            <div className='flex items-center gap-3'>
                                <div className='h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]' />
                                <div className='h-2 w-32 bg-white/20 rounded-full' />
                            </div>
                            <div className='h-[1px] w-full bg-gradient-to-r from-cyan-500/50 to-transparent' />
                            <div className='space-y-2'>
                                <div className='h-2 w-48 bg-white/10 rounded-full' />
                                <div className='h-2 w-40 bg-white/5 rounded-full' />
                            </div>
                            <div className='pt-6 flex items-end gap-2 h-24'>
                                <div className='w-full bg-cyan-500/20 rounded-t-lg h-[40%] animate-pulse' />
                                <div className='w-full bg-cyan-500/40 rounded-t-lg h-[70%]' />
                                <div className='w-full bg-cyan-500/60 rounded-t-lg h-[55%] animate-pulse' />
                                <div className='w-full bg-cyan-500 rounded-t-lg h-[90%]' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
