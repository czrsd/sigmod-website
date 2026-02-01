'use client';

import Link from 'next/link';
import { MessageSquare, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('Shop.MainPage.Contact');

    return (
        <div className='flex flex-col items-center space-y-12 py-10 w-full max-w-4xl'>
            <div className='text-center space-y-2'>
                <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h2>
                <div className='h-1 w-20 bg-primary mx-auto rounded-full' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4'>
                <div className='group relative flex flex-col items-center p-10 bg-black/5 dark:bg-white/5 dark:bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-black/10 dark:border-white/10 dark:border-white/5 transition-all duration-300 hover:bg-white/10'>
                    <div className='w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                        <Mail className='w-7 h-7 text-primary' />
                    </div>

                    <h3 className='text-lg font-bold mb-2'>
                        {t('supportEmail')}
                    </h3>
                    <p className='text-neutral-400 text-sm mb-6 text-center'>
                        {t('emailResponseTime')}
                    </p>

                    <a
                        href='mailto:sigmallymod@proton.me'
                        className='text-lg font-medium hover:text-primary transition-colors flex items-center gap-2'
                    >
                        sigmallymod@proton.me
                        <ExternalLink className='w-4 h-4 opacity-50' />
                    </a>
                </div>

                <div className='group relative flex flex-col items-center p-10 bg-black/5 dark:bg-[#5865F2]/5 backdrop-blur-xl rounded-2xl border border-black/10 dark:border-[#5865F2]/20 transition-all duration-300 hover:bg-[#5865F2]/10'>
                    <div className='w-14 h-14 bg-[#5865F2]/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                        <MessageSquare className='w-7 h-7 text-[#5865F2]' />
                    </div>

                    <h3 className='text-lg font-bold mb-2'>
                        {t('discordTitle')}
                    </h3>
                    <p className='text-neutral-400 text-sm mb-6 text-center'>
                        {t('discordDesc')}
                    </p>

                    <Button
                        asChild
                        className='bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full px-8 py-6 h-auto text-md font-bold transition-all hover:shadow-[0_0_20px_rgba(88,101,242,0.4)]'
                    >
                        <Link
                            href='https://discord.gg/QyUhvUC8AD'
                            target='_blank'
                        >
                            {t('createTicket')}
                        </Link>
                    </Button>
                </div>
            </div>

            <p className='text-xs uppercase tracking-[0.3em] text-neutral-600 dark:text-neutral-500'>
                {t('footerNote')}
            </p>
        </div>
    );
}
