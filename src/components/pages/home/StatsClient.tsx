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
        <div className='flex flex-col min-w-[70px]'>
            <div className='flex items-center gap-2'>
                <span className='text-2xl md:text-3xl font-bold tracking-tight text-foreground'>
                    {formatStat(value)}
                    {value !== null ? suffix : null}
                </span>
                {hasPulse && (
                    <span className='w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20' />
                )}
            </div>
            <span className='text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1'>
                {label}
            </span>
        </div>
    );
}

function StatsSkeleton() {
    return (
        <div className='pt-2 flex gap-8 sm:gap-12 justify-center lg:justify-start'>
            <div className='h-11 w-20 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
            <div className='h-11 w-20 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
            <div className='h-11 w-20 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
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
        <div className='pt-2 flex flex-row items-center justify-center lg:justify-start gap-8 sm:gap-10'>
            <StatItem value={stats.total} label={t('stats.total')} />
            <div className='w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block' />
            <StatItem value={stats.daily} label={t('stats.active')} />
            <div className='w-px h-8 bg-black/10 dark:bg-white/10 hidden sm:block' />
            <StatItem
                value={stats.online}
                label={t('stats.online')}
                hasPulse
                suffix='+'
            />
        </div>
    );
}
