'use client';

import React from 'react';
import { Zap, ShieldCheck, HeartHandshake, Coins } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhyBuyHere(): React.ReactNode {
    const t = useTranslations('Shop.MainPage.WhyBuyHere');
    const reasons = t.raw('reasons') as { title: string; description: string }[];
    const icons = [Zap, ShieldCheck, HeartHandshake, Coins];

    return (
        <section className='flex flex-col items-center space-y-10 py-6 w-full max-w-5xl mx-auto'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground'>
                    {t('title')}
                </h2>
                <p className='text-sm text-neutral-500 max-w-md mx-auto'>
                    Safe, instant delivery backed by the SigModz team.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full px-4'>
                {reasons.map((reason, index) => {
                    const Icon = icons[index % icons.length];
                    return (
                        <div
                            key={index}
                            className='flex items-start gap-4 p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-left'
                        >
                            <div className='w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5'>
                                <Icon size={20} />
                            </div>
                            <div className='space-y-1.5'>
                                <h3 className='text-base font-bold text-foreground'>
                                    {reason.title}
                                </h3>
                                <p className='text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                                    {reason.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
