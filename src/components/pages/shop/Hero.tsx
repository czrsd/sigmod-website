'use client';

import { useEffect, useState } from 'react';
import { Flame, Timer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Progress } from '@/components/ui/progress';

export default function Hero({
    limitedEndsAt,
    startedAt,
}: {
    limitedEndsAt: number | null;
    startedAt: number | null;
}) {
    const t = useTranslations('Shop.MainPage.Hero');
    const [timeLeft, setTimeLeft] = useState<string | null>(null);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!limitedEndsAt || !startedAt) return;

        const totalDuration = limitedEndsAt - startedAt;

        const calculateStats = () => {
            const now = Date.now();
            const diff = limitedEndsAt - now;

            if (diff <= 0 || totalDuration <= 0) {
                setTimeLeft('');
                setProgress(0);
                return;
            }

            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000)
                .toString()
                .padStart(2, '0');
            const minutes = Math.floor((diff % 3600000) / 60000)
                .toString()
                .padStart(2, '0');
            const seconds = Math.floor((diff % 60000) / 1000)
                .toString()
                .padStart(2, '0');

            setTimeLeft(
                days > 0
                    ? `${days}d ${hours}:${minutes}:${seconds}`
                    : `${hours}:${minutes}:${seconds}`
            );

            const rawRemaining = (diff / totalDuration) * 100;
            const rawProgress = 100 - rawRemaining;
            const clampedProgress = Math.max(0, Math.min(100, rawProgress));

            setProgress(clampedProgress);
        };

        calculateStats();
        const interval = setInterval(calculateStats, 1000);
        return () => clearInterval(interval);
    }, [limitedEndsAt, startedAt]);

    const offerActive = timeLeft && timeLeft !== '';

    return (
        <div className='flex flex-col items-center pt-8 pb-4 w-full max-w-4xl px-4'>
            <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight text-center leading-[1.1]'>
                {t.rich('title', {
                    gold: (chunks) => (
                        <span className='text-amber-500'>
                            {chunks}
                        </span>
                    ),
                    subscriptions: (chunks) => (
                        <span className='text-blue-500'>
                            {chunks}
                        </span>
                    ),
                })}
            </h1>

            <p className='mt-4 text-neutral-600 dark:text-neutral-400 max-w-lg text-center text-base sm:text-lg leading-relaxed'>
                {t('description')}
            </p>

            {offerActive && (
                <div className='mt-8 w-full max-w-md'>
                    <div className='rounded-2xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/[0.03] p-6 flex flex-col items-center space-y-4 shadow-sm'>
                        <div className='flex flex-col items-center text-center'>
                            <div className='flex items-center gap-1.5 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-1'>
                                <Flame size={15} />
                                {t('limitedOffersTitle')}
                            </div>
                            <p className='text-xs sm:text-sm text-neutral-600 dark:text-neutral-400'>
                                {t('limitedOffersSubtitle')}
                            </p>
                        </div>

                        <div className='flex flex-col items-center bg-black/[0.03] dark:bg-white/[0.04] w-full py-3.5 rounded-xl border border-black/5 dark:border-white/5'>
                            <div className='text-[11px] text-neutral-500 mb-1 flex items-center gap-1 font-medium'>
                                <Timer size={12} /> {t('endsIn')}
                            </div>
                            <div className='text-3xl font-mono font-bold tracking-wider text-foreground'>
                                {timeLeft}
                            </div>
                        </div>

                        <div className='w-full'>
                            <Progress
                                value={Number(progress) || 0}
                                className='h-1.5 bg-neutral-200 dark:bg-neutral-800'
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
