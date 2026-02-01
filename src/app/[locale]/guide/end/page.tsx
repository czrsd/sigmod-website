'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';
import { PartyPopper, Gamepad2, Search, Sparkles } from 'lucide-react';

export default function EndPage() {
    const t = useTranslations('Guide.End');

    return (
        <div className='max-w-4xl space-y-12 pb-10'>
            <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-2'>
                    <PartyPopper size={14} />
                    {t('completed_label') || 'Setup Complete'}
                </div>
                <h1 className='text-4xl md:text-6xl font-black italic tracking-tighter uppercase'>
                    {t('title')}
                </h1>
                <p className='text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl'>
                    {t('desc')}
                </p>
            </div>

            <div className='relative group max-w-2xl'>
                <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000'></div>
                <div className='relative bg-neutral-200 dark:bg-neutral-900 border border-white/10 p-4 rounded-2xl'>
                    <div className='flex items-center gap-2 mb-4 px-2'>
                        <Sparkles size={18} className='text-yellow-500' />
                        <span className='text-sm font-bold uppercase tracking-tight'>
                            {t('notice')}
                        </span>
                    </div>
                    <ZoomableImage
                        src='/guide/main_menu.png'
                        width={600}
                        height={400}
                        alt='Sigmally main menu'
                        className='rounded-xl border border-white/5 w-full shadow-2xl'
                    />
                </div>
            </div>

            <div className='space-y-6'>
                <div className='flex flex-wrap gap-4'>
                    <Button
                        size='lg'
                        className='bg-blue-600 hover:bg-blue-700 font-black px-12 h-16 rounded-2xl text-xl shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-95'
                        asChild
                    >
                        <Link href='/game' target='_blank'>
                            <Gamepad2 className='mr-3 h-6 w-6' />
                            {t('play')}
                        </Link>
                    </Button>
                </div>

                <div className='flex flex-wrap gap-3'>
                    <Button
                        variant='outline'
                        className='border-white/10 bg-white/5 hover:bg-white/10 font-bold rounded-xl h-12'
                        asChild
                    >
                        <Link href='/sigmod'>
                            <Search className='mr-2 h-4 w-4 text-blue-400' />
                            {t('explore')} SigMod
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        className='border-white/10 bg-white/5 hover:bg-white/10 font-bold rounded-xl h-12'
                        asChild
                    >
                        <Link href='/sigfixes'>
                            <Search className='mr-2 h-4 w-4 text-purple-400' />
                            {t('explore')} SigFixes
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
