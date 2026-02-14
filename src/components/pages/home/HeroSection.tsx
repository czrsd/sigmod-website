import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Image from 'next/image';
import { DynamicCarousel } from './DynamicCarousel';

async function getStats() {
    const ids = ['454648', '483587'];

    try {
        const [res1, res2, onlineRes] = await Promise.all([
            fetch(`https://greasyfork.org/scripts/${ids[0]}.json`, {
                next: { revalidate: 600 },
            }),
            fetch(`https://greasyfork.org/scripts/${ids[1]}.json`, {
                next: { revalidate: 600 },
            }),
            fetch('https://mod.czrsd.com/onlineusers', {
                next: { revalidate: 60 },
            }),
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

        return {
            total: total.toLocaleString() + '+',
            daily: daily.toLocaleString() + '+',
            online: onlineCount + '+',
        };
    } catch (error) {
        console.error('Stats fetch failed', error);
        return { total: '30,000+', daily: '50+', online: '70+' };
    }
}

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

async function StatsDisplay() {
    const t = useTranslations('HomePage.hero');
    const stats = await getStats();

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

function StatsSkeleton() {
    return (
        <div className='pt-4 flex gap-12'>
            <div className='h-[41px] md:h-[53px] w-[80px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
            <div className='h-[41px] md:h-[53px] w-[80px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
            <div className='h-[41px] md:h-[53px] w-[80px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg' />
        </div>
    );
}

export function HeroSection() {
    const t = useTranslations('HomePage.hero');

    return (
        <section className='relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 pt-24 pb-20 lg:pt-44 lg:pb-32 gap-16 overflow-hidden'>
            <div className='w-full lg:w-1/2 text-center lg:text-left space-y-10 relative z-10'>
                <div className='space-y-6'>
                    <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] md:leading-[1] tracking-tighter'>
                        {t.rich('title', {
                            glow: (chunks) => (
                                <span className='bg-gradient-to-r from-[var(--glow)] to-purple-400 text-transparent bg-clip-text'>
                                    {chunks}
                                </span>
                            ),
                        })}
                    </h1>
                    <p className='mx-auto lg:mx-0 max-w-lg text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium'>
                        {t('sub')}
                    </p>
                </div>

                <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
                    <Button
                        size='lg'
                        className='bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 h-14 rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-600/20'
                        asChild
                    >
                        <Link href='/shop'>
                            <ShoppingCart className='mr-2 h-5 w-5' />
                            {t('shop_now')}
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        size='lg'
                        className='border-black/10 dark:border-white/10 bg-white/5 hover:bg-white/10 font-bold px-10 h-14 rounded-full backdrop-blur-md'
                        asChild
                    >
                        <Link href='/guide'>
                            {t('start')} <ArrowRight className='ml-2 h-5 w-5' />
                        </Link>
                    </Button>
                </div>

                <Suspense fallback={<StatsSkeleton />}>
                    <StatsDisplay />
                </Suspense>
            </div>

            <div className='w-full lg:w-1/2 relative z-10'>
                <div className='relative w-full overflow-hidden rounded-xl md:rounded-[2rem] aspect-video md:shadow-2xl border border-white/10'>
                    <Image
                        src='/preview/menu.webp'
                        alt='Sigmally Mod Menu interface'
                        width={1200}
                        height={675}
                        priority
                        fetchPriority='high'
                        loading='eager'
                        quality={60}
                        className='object-cover z-0'
                        sizes='(max-width: 768px) 85vw, (max-width: 1200px) 45vw, (max-width: 1920px) 45vw, 1200px'
                    />

                    <div className='hidden md:block absolute inset-0 z-10'>
                        <DynamicCarousel />
                    </div>
                </div>

                <div className='hidden md:block absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-3xl opacity-50 pointer-events-none -z-10' />
            </div>
        </section>
    );
}
