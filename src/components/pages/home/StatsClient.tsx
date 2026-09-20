'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Stats = {
    total: string;
    daily: string;
    online: string;
};

function StatItem({
    value,
    label,
    hasPulse,
}: {
    value: string;
    label: string;
    hasPulse?: boolean;
}) {
    return (
        <div className='flex flex-col min-w-[80px]'>
            <div className='flex items-center gap-2'>
                <span className='text-lg md:text-3xl w-full font-black italic tracking-tighter leading-none'>
                    {value}
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
                const ids = ['454648', '483587'];

                const [res1, res2, onlineRes] = await Promise.all([
                    fetch(`https://greasyfork.org/scripts/${ids[0]}.json`),
                    fetch(`https://greasyfork.org/scripts/${ids[1]}.json`),
                    fetch('https://mod.czrsd.com/onlineusers'),
                ]);

                let total = 0;
                let daily = 0;
                let onlineCount = 70;

                if (res1.ok) {
                    const data = await res1.json();
                    total += data.total_installs || 0;
                    daily += data.daily_installs || 0;
                }

                if (res2.ok) {
                    const data = await res2.json();
                    total += data.total_installs || 0;
                    daily += data.daily_installs || 0;
                }

                if (onlineRes.ok) {
                    const data = await onlineRes.json();
                    onlineCount = data.onlineUsers;
                }

                if (mounted) {
                    setStats({
                        total: total.toLocaleString() + '+',
                        daily: daily.toLocaleString() + '+',
                        online: onlineCount + '+',
                    });
                }
            } catch {
                if (mounted) {
                    setStats({
                        total: '30,000+',
                        daily: '50+',
                        online: '70+',
                    });
                }
            }
        }

        fetchStats();

        return () => {
            mounted = false;
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
            <StatItem value={stats.online} label={t('stats.online')} hasPulse />
        </div>
    );
}
