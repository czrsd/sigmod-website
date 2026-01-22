'use client';

import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Hero({
    limitedEndsAt,
}: {
    limitedEndsAt: number | null;
}) {
    const t = useTranslations('Shop.MainPage.Hero');
    const [timeLeft, setTimeLeft] = useState<string | null>(null);

    useEffect(() => {
        if (!limitedEndsAt) return;

        const calculateTimeLeft = () => {
            const now = Date.now();
            const diff = limitedEndsAt - now;
            if (diff <= 0) return '';

            const days = Math.floor(diff / (24 * 3600000));
            const hours = Math.floor((diff % (24 * 3600000)) / 3600000)
                .toString()
                .padStart(2, '0');
            const minutes = Math.floor((diff % 3600000) / 60000)
                .toString()
                .padStart(2, '0');
            const seconds = Math.floor((diff % 60000) / 1000)
                .toString()
                .padStart(2, '0');

            return days > 0
                ? `${days}d ${hours}:${minutes}:${seconds}`
                : `${hours}:${minutes}:${seconds}`;
        };

        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [limitedEndsAt]);

    const offerActive = timeLeft && timeLeft !== '';

    return (
        <div className='flex flex-col items-center space-y-6'>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
                {t.rich('title', {
                    gold: (chunks) => (
                        <span className='text-yellow-500'>{chunks}</span>
                    ),
                    subscriptions: (chunks) => (
                        <span className='text-yellow-500'>{chunks}</span>
                    ),
                })}
            </h1>

            <p className='text-neutral-400 max-w-xl text-center'>
                {t('description')}
            </p>

            {offerActive && (
                <div className='border border-orange-400 dark:border-orange-500 bg-gradient-to-b from-orange-600/60 dark:from-orange-600/10 to-yellow-500/60 dark:to-yellow-500/10 text-white py-8 mb-2 px-10 rounded-2xl shadow-lg space-y-4 w-full max-w-md'>
                    <div>
                        <h2 className='text-3xl font-bold uppercase flex items-center justify-center my-3 text-orange-500 dark:text-orange-400'>
                            <Flame size={30} />
                            <span className='bg-gradient-to-b from-orange-500 dark:from-orange-500 to-orange-600 dark:to-orange-400 text-transparent bg-clip-text'>
                                {t('limitedOffersTitle')}
                            </span>
                        </h2>
                        <p className='text-sm opacity-90'>
                            {t('limitedOffersSubtitle')}
                        </p>
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        <span className='text-sm opacity-80'>
                            {t('endsIn')}
                        </span>
                        <span className='text-2xl font-semibold tracking-widest'>
                            {timeLeft}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
