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
        <div className='flex flex-col items-center pt-10 pb-6 w-full max-w-4xl px-4'>
            <div className='mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] uppercase font-black tracking-[0.2em]'>
                Official Sigmally Modz Shop
            </div>

            <h1 className='text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none text-center'>
                {t.rich('title', {
                    gold: (chunks) => (
                        <span className='text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm'>
                            {chunks}
                        </span>
                    ),
                    subscriptions: (chunks) => (
                        <span className='text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm'>
                            {chunks}
                        </span>
                    ),
                })}
            </h1>

            <p className='mt-6 text-neutral-500 dark:text-neutral-400 max-w-lg text-center text-lg leading-relaxed font-medium'>
                {t('description')}
            </p>

            {offerActive && (
                <div className='mt-12 relative group w-full max-w-md'>
                    <div className='absolute inset-0 bg-orange-600/20 blur-3xl animate-pulse rounded-full' />

                    <div className='relative overflow-hidden bg-white/5 dark:bg-neutral-900/30 backdrop-blur-xl border border-orange-500/30 dark:border-orange-500/20 p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center space-y-4'>
                        <div className='flex flex-col items-center'>
                            <div className='flex items-center gap-2 text-orange-500 font-black uppercase tracking-widest text-xs mb-2'>
                                <Flame size={16} className='animate-bounce' />
                                {t('limitedOffersTitle')}
                            </div>
                            <p className='text-sm text-neutral-600 dark:text-neutral-400 font-medium'>
                                {t('limitedOffersSubtitle')}
                            </p>
                        </div>

                        <div className='flex flex-col items-center bg-black/5 dark:bg-white/5 w-full py-4 rounded-2xl border border-white/5'>
                            <div className='text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-1 flex items-center gap-1'>
                                <Timer size={10} /> {t('endsIn')}
                            </div>
                            <div className='text-4xl font-mono font-black tracking-widest bg-gradient-to-b from-neutral-800 to-black dark:from-white dark:to-neutral-400 bg-clip-text text-transparent'>
                                {timeLeft}
                            </div>
                        </div>

                        <div className='w-full space-y-2'>
                            <Progress
                                value={Number(progress) || 0}
                                className='bg-orange-950/50 border'
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
