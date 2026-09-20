'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Stats = {
    total: number | null;
    daily: number | null;
    online: number | null;
};

const STATS_REFRESH_INTERVAL_MS = 30_000;

function formatStat(value: number | null) {
    return value === null ? '—' : value.toLocaleString();
}

function StatItem({
    value,
    label,
    hasPulse,
    suffix,
}: {
    value: number | null;
    label: string;
    hasPulse?: boolean;
    suffix?: string;
}) {
    return (
        <div className='flex flex-col min-w-[80px]'>
            <div className='flex items-center gap-2'>
                <span className='text-lg md:text-3xl w-full font-black italic tracking-tighter leading-none'>
                    {formatStat(value)}
                    {value !== null ? suffix : null}
                </span>
                {hasPulse && (
                    <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                )}
            </div>
            <span className='text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-600 dark:text-neutral-300 mt-2'>
                {label}
            </span>
        </div>
    );
}

function StatsSkeleton() {
    return (
        <div className='pt-4 flex gap-12'>
            <div className='h-[41px] md:h-[53px] w-[80px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
            <div className='h-[41px] md:h-[53px] w-[80px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
            <div className='h-[41px] md:h-[53px] w-[80px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
        </div>
    );
}

export default function StatsClient() {
    const t = useTranslations('HomePage.hero');

    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {
        let mounted = true;

        async function fetchStats() {
            try {
                const response = await fetch('/api/stats', {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error(`Stats request failed with ${response.status}`);
                }
                const data = (await response.json()) as Stats;
                if (mounted) {
                    setStats({
                        total: data.total,
                        daily: data.daily,
                        online: data.online,
                    });
                }
            } catch {
                if (mounted) {
                    setStats({
                        total: null,
                        daily: null,
                        online: null,
                    });
                }
            }
        }

        fetchStats();
        const refreshTimer = window.setInterval(
            fetchStats,
            STATS_REFRESH_INTERVAL_MS,
        );

        return () => {
            mounted = false;
            window.clearInterval(refreshTimer);
        };
    }, []);

    if (!stats) {
        return <StatsSkeleton />;
    }

    return (
        <div className='pt-4 flex flex-row items-center justify-center lg:justify-start gap-12'>
            <StatItem value={stats.total} label={t('stats.total')} />
            <div className='w-px h-10 bg-white/10 hidden sm:block' />
            <StatItem value={stats.daily} label={t('stats.active')} />
            <div className='w-px h-10 bg-white/10 hidden sm:block' />
            <StatItem
                value={stats.online}
                label={t('stats.online')}
                hasPulse
                suffix='+'
            />
        </div>
    );
}
