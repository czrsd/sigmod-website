'use client';

import React from 'react';
import { Zap, Lock, Handshake, HandCoins } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function WhyBuyHere(): React.ReactNode {
    const t = useTranslations('Shop.MainPage.WhyBuyHere');

    const reasons = t.raw('reasons');
    const icons = [Zap, Lock, Handshake, HandCoins];

    return (
        <div className='flex flex-col items-center space-y-10'>
            <h2 className='text-4xl font-bold'>{t('title')}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
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
}): React.ReactNode {
    return (
        <div className='flex flex-col items-center justify-center gap-4 min-w-[250px] max-w-[300px] bg-secondary dark:bg-neutral-900 rounded-lg p-10 border hover:-rotate-2 hover:scale-101 transition-all duration-100'>
            <div className='relative flex justify-center items-center py-2'>
                <svg width='0' height='0'>
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
                    className='w-20 h-20'
                    style={{ stroke: 'url(#blue_gradient)' }}
                />
            </div>
            <div>
                <span className='text-lg font-bold'>{title}</span>
                <p className='text-sm text-neutral-500'>{description}</p>
            </div>
        </div>
    );
}
