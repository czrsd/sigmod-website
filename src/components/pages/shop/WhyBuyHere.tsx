'use client';

import React from 'react';
import { Zap, Lock, Handshake, HandCoins } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhyBuyHere(): React.ReactNode {
    const t = useTranslations('Shop.MainPage.WhyBuyHere');
    const reasons = t.raw('reasons');
    const icons = [Zap, Lock, Handshake, HandCoins];

    return (
        <div className='flex flex-col items-center space-y-12 py-10 w-full max-w-6xl'>
            <div className='text-center space-y-2'>
                <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h2>
                <div className='h-1 w-20 bg-primary mx-auto rounded-full' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4'>
                {reasons.map(
                    (
                        reason: { title: string; description: string },
                        index: number
                    ) => (
                        <ReasonCard
                            key={index}
                            title={reason.title}
                            description={reason.description}
                            Icon={icons[index]}
                        />
                    )
                )}
            </div>
        </div>
    );
}

function ReasonCard({
    title,
    description,
    Icon,
}: {
    title: string;
    description: string;
    Icon: React.ComponentType<{
        className?: string;
        style?: React.CSSProperties;
    }>;
}) {
    return (
        <div
            className='group relative flex items-center gap-6 p-6 
                        bg-white/5 dark:bg-neutral-900/40 backdrop-blur-xl 
                        rounded-2xl border border-white/10 dark:border-white/5
                        transition-all duration-300 hover:border-primary/50 hover:bg-white/10'
        >
            <div className='relative flex-shrink-0'>
                <div className='absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity' />
                <div className='relative flex justify-center items-center w-16 h-16 bg-white/5 dark:bg-white/5 rounded-xl border border-white/10 group-hover:rotate-6 transition-transform'>
                    <svg width='0' height='0' className='absolute'>
                        <defs>
                            <linearGradient
                                id='blue_gradient'
                                x1='0'
                                y1='0'
                                x2='24'
                                y2='24'
                                gradientUnits='userSpaceOnUse'
                            >
                                <stop offset='0%' stopColor='#9127F5' />
                                <stop offset='100%' stopColor='#2765F5' />
                            </linearGradient>
                        </defs>
                    </svg>

                    <Icon
                        className='w-10 h-10 transition-transform group-hover:scale-110'
                        style={{ stroke: 'url(#blue_gradient)' }}
                    />
                </div>
            </div>

            <div className='flex flex-col text-left'>
                <h3 className='text-xl font-black tracking-tight dark:text-white'>
                    {title}
                </h3>
                <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
                    {description}
                </p>
            </div>

            <div className='absolute right-4 bottom-2 opacity-[0.03] pointer-events-none'>
                <Icon className='w-20 h-20' />
            </div>
        </div>
    );
}
