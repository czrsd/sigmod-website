'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';
import { Gamepad2, Search, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { discordLink } from '@/utils/getLink';

export default function EndPage() {
    const t = useTranslations('Guide.End');

    return (
        <div className='max-w-4xl space-y-8 pb-10'>
            {/* Step Header */}
            <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                    <span className='px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5'>
                        <CheckCircle2 size={13} />
                        Completed
                    </span>
                </div>
                <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground'>
                    {t('title')}
                </h1>
                <p className='text-neutral-600 dark:text-neutral-400 text-base max-w-2xl leading-relaxed'>
                    {t('desc')}
                </p>
            </div>

            {/* In-Game Preview Frame */}
            <div className='rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-900/60 overflow-hidden shadow-lg'>
                <div className='px-4 py-2.5 border-b border-white/10 bg-neutral-900 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='w-2.5 h-2.5 rounded-full bg-red-500/80' />
                        <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/80' />
                        <div className='w-2.5 h-2.5 rounded-full bg-green-500/80' />
                        <span className='text-xs text-neutral-300 ml-2 font-medium'>
                            {t('notice')}
                        </span>
                    </div>
                    <span className='text-[11px] text-neutral-400'>
                        Sigmally Client Preview
                    </span>
                </div>
                <div className='p-3 sm:p-6 bg-black/40'>
                    <ZoomableImage
                        src='/guide/main_menu.png'
                        width={800}
                        height={500}
                        alt='Sigmally main menu with SigMod'
                        className='rounded-xl border border-white/10 w-full shadow-md'
                    />
                </div>
            </div>

            {/* Launch & Action Area */}
            <div className='p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-6'>
                <div className='flex flex-wrap gap-4 items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-bold text-foreground'>
                            Ready to jump into the arena?
                        </h2>
                        <p className='text-xs sm:text-sm text-neutral-500 mt-0.5'>
                            Launch Sigmally with all mods active. Press ESC in-game to open the mod menu.
                        </p>
                    </div>

                    <Button
                        size='lg'
                        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 rounded-full shadow-md'
                        asChild
                    >
                        <Link href='/game' target='_blank'>
                            <Gamepad2 className='mr-2 h-5 w-5' />
                            {t('play')}
                        </Link>
                    </Button>
                </div>

                <div className='pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-3'>
                    <Button
                        variant='outline'
                        size='sm'
                        className='rounded-full h-9 px-4 text-xs font-medium border-black/10 dark:border-white/10'
                        asChild
                    >
                        <Link href='/sigmod'>
                            <Search className='mr-1.5 h-3.5 w-3.5 text-blue-500' />
                            {t('explore')} SigMod
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        className='rounded-full h-9 px-4 text-xs font-medium border-black/10 dark:border-white/10'
                        asChild
                    >
                        <Link href='/sigfixes'>
                            <Search className='mr-1.5 h-3.5 w-3.5 text-indigo-500' />
                            {t('explore')} SigFixes
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        className='rounded-full h-9 px-4 text-xs font-medium border-black/10 dark:border-white/10'
                        asChild
                    >
                        <a href={discordLink} target='_blank' rel='noopener noreferrer'>
                            <MessageSquare className='mr-1.5 h-3.5 w-3.5 text-[#5865F2]' />
                            Community Discord
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
