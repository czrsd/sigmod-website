'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { sigfixLink } from '@/utils/getLink';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Hero() {
    const t = useTranslations('SigFixesPage.Hero');

    return (
        <section className='relative max-w-6xl mx-auto px-6 py-24 flex flex-col items-center gap-12 text-center overflow-hidden'>
            <div className='space-y-6 relative z-10'>
                <div className='flex justify-center'>
                    <div className='flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] italic'>
                        <Zap size={12} fill='currentColor' /> {t('badge')}
                    </div>
                </div>

                <h1 className='text-6xl sm:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]'>
                    <span className='block text-white drop-shadow-2xl'>
                        {t('title').split(' ')[0]}
                    </span>
                    <span className='block bg-gradient-to-b from-cyan-400 to-blue-600 text-transparent bg-clip-text filter drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]'>
                        {t('title').split(' ').slice(1).join(' ')}
                    </span>
                </h1>

                <p className='text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto font-medium leading-relaxed'>
                    {t('sub')}
                </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10'>
                <div className='relative group'>
                    <div className='absolute -inset-1 bg-cyan-500 blur opacity-25 group-hover:opacity-60 transition duration-500 rounded-xl' />
                    <Button
                        size='lg'
                        className='relative w-full sm:w-auto h-16 px-10 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase italic text-xl rounded-xl border-t border-white/40 shadow-2xl transition-transform active:scale-95'
                        asChild
                    >
                        <Link
                            href={sigfixLink}
                            className='flex items-center gap-3'
                        >
                            <ShieldCheck size={22} strokeWidth={3} />
                            {t('install')}
                        </Link>
                    </Button>
                </div>

                <Button
                    variant='outline'
                    size='lg'
                    className='h-16 px-10 border-white/10 hover:bg-white/5 backdrop-blur-sm text-white font-black uppercase italic text-xl rounded-xl transition-all group'
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
                        target='_blank'
                        className='text-xs font-bold text-neutral-300 hover:text-cyan-400 transition-colors border-b border-white/10 pb-1'
                    >
                        Tampermonkey
                    </Link>
                    <span className='text-neutral-700 font-black'>//</span>
                    <Link
                        href='https://violentmonkey.github.io'
                        target='_blank'
                        className='text-xs font-bold text-neutral-300 hover:text-cyan-400 transition-colors border-b border-white/10 pb-1'
                    >
                        Violentmonkey
                    </Link>
                </div>
            </div>
        </section>
    );
}
