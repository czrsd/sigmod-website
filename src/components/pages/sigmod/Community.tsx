'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, Github, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Community() {
    const t = useTranslations('SigModPage.Community');

    return (
        <section className='max-w-5xl mx-auto py-24 px-6'>
            <div className='relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md p-8 md:p-16 text-center space-y-8'>
                <div className='absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[80px] rounded-full' />
                <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full' />

                <div className='relative z-10 space-y-4'>
                    <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                        {t('title')}
                    </h2>
                    <p className='text-neutral-400 max-w-xl mx-auto font-medium leading-relaxed'>
                        {t('text')}
                    </p>
                </div>

                <div className='relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
                    <Button
                        size='lg'
                        className='w-full sm:w-auto px-8 h-14 rounded-xl font-black uppercase italic text-lg shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]'
                        asChild
                    >
                        <Link
                            href='https://discord.gg/QyUhvUC8AD'
                            target='_blank'
                            className='flex items-center gap-2'
                        >
                            <MessageSquare size={20} /> {t('discord')}
                        </Link>
                    </Button>
                </div>

                <p className='relative z-10 text-xs font-bold uppercase tracking-widest text-white/20 pt-4'>
                    {t('explore')}
                </p>

                <Button
                    variant='outline'
                    size='lg'
                    className='w-full sm:w-auto px-8 h-14 rounded-xl font-black uppercase italic text-lg border-white/10 hover:bg-white/5'
                    asChild
                >
                    <Link
                        href='https://github.com/czrsd/sigmod'
                        target='_blank'
                        className='flex items-center gap-2'
                    >
                        <Github size={20} /> GitHub{' '}
                        <ExternalLink size={14} className='opacity-40' />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
