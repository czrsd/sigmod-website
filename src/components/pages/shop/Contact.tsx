'use client';

import { Link } from '@/i18n/navigation';
import { MessageSquare, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('Shop.MainPage.Contact');

    return (
        <section className='flex flex-col items-center space-y-10 py-6 w-full max-w-4xl mx-auto'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground'>
                    {t('title')}
                </h2>
                <p className='text-sm text-neutral-500 max-w-md mx-auto'>
                    Need help with an order or have questions? Get in touch with us anytime.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4'>
                <div className='flex flex-col items-center text-center p-8 bg-black/[0.02] dark:bg-white/[0.02] rounded-2xl border border-black/10 dark:border-white/10 space-y-3'>
                    <div className='w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-1'>
                        <Mail className='w-6 h-6' />
                    </div>

                    <h3 className='text-base font-bold text-foreground'>
                        {t('supportEmail')}
                    </h3>
                    <p className='text-neutral-500 text-xs max-w-xs'>
                        {t('emailResponseTime')}
                    </p>

                    <a
                        href='mailto:sigmallymod@proton.me'
                        className='text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2 inline-flex items-center gap-1.5'
                    >
                        sigmallymod@proton.me
                        <ExternalLink className='w-3.5 h-3.5' />
                    </a>
                </div>

                <div className='flex flex-col items-center text-center p-8 bg-black/[0.02] dark:bg-white/[0.02] rounded-2xl border border-black/10 dark:border-white/10 space-y-3'>
                    <div className='w-12 h-12 bg-[#5865F2]/10 rounded-xl flex items-center justify-center text-[#5865F2] mb-1'>
                        <MessageSquare className='w-6 h-6' />
                    </div>

                    <h3 className='text-base font-bold text-foreground'>
                        {t('discordTitle')}
                    </h3>
                    <p className='text-neutral-500 text-xs max-w-xs'>
                        {t('discordDesc')}
                    </p>

                    <div className='pt-2'>
                        <Button
                            asChild
                            className='bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full px-6 h-10 text-xs font-semibold shadow-sm'
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
            </div>

            <p className='text-xs text-neutral-400 text-center'>
                {t('footerNote')}
            </p>
        </section>
    );
}
