'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const images = [
    'menu.png',
    'before_after.png',
    'customization-comparison.png',
    'game_menu.png',
    'party_system.png',
    'multibox.png',
];

const imageAlts: Record<string, string> = {
    'menu.png': 'Sigmally Mod Menu interface with custom features',
    'before_after.png': 'Comparison of vanilla Sigmally vs SigModz graphics',
    'customization-comparison.png': 'Custom skin and UI customization options',
    'game_menu.png': 'In-game mod settings for Sigmally',
    'party_system.png': 'Sigmally party system and clan features',
    'multibox.png': 'Multibox support for Sigmally players',
};

export function HeroSection() {
    const t = useTranslations('HomePage.hero');
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        total: '30,000+',
        daily: '50+',
        online: '70+',
    });

    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    useEffect(() => {
        const controller = new AbortController();

        async function fetchStats() {
            try {
                const res = await fetch('/api/stats', {
                    signal: controller.signal,
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (e: any) {
                if (e.name !== 'AbortError') {
                    console.error('Failed to fetch stats', e);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchStats();
        return () => controller.abort();
    }, []);

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

                <div className='pt-4 flex flex-row items-center justify-center lg:justify-start gap-12'>
                    <StatItem
                        loading={isLoading}
                        value={stats.total}
                        label={t('stats.total')}
                    />
                    <div className='w-px h-10 bg-white/10 hidden sm:block' />
                    <StatItem
                        loading={isLoading}
                        value={stats.daily}
                        label={t('stats.active')}
                    />
                    <div className='w-px h-10 bg-white/10 hidden sm:block' />
                    <StatItem
                        loading={isLoading}
                        value={stats.online}
                        label={t('stats.online')}
                        hasPulse
                    />
                </div>
            </div>

            <div className='w-full lg:w-1/2 relative group z-10'>
                <div className='absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-3xl opacity-50' />
                <div className='relative bg-neutral-900/50 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-2xl'>
                    <Carousel
                        opts={{ loop: true }}
                        plugins={[plugin.current]}
                        className='w-full'
                    >
                        <CarouselContent>
                            {images.map((img, idx) => (
                                <CarouselItem key={img}>
                                    <div className='relative aspect-video overflow-hidden rounded-[1.6rem]'>
                                        <Image
                                            src={'/preview/' + img}
                                            alt={
                                                imageAlts[img] ||
                                                `Sigmally Mod Feature: ${img.replace(
                                                    '.png',
                                                    ''
                                                )}`
                                            }
                                            fill
                                            className='object-cover'
                                            sizes='(max-width: 768px) 100vw, 600px'
                                            priority={idx === 0}
                                            {...(idx === 0
                                                ? { fetchPriority: 'high' }
                                                : {})}
                                            loading={
                                                idx === 0 ? 'eager' : 'lazy'
                                            }
                                            decoding={
                                                idx === 0 ? 'sync' : 'async'
                                            }
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

function StatItem({
    value,
    label,
    loading,
    hasPulse,
}: {
    value: string;
    label: string;
    loading: boolean;
    hasPulse?: boolean;
}) {
    return (
        <div className='flex flex-col min-w-[80px]'>
            <div className='flex items-center gap-2'>
                {loading ? (
                    <div className='h-[30px] w-20 bg-white/10 animate-pulse rounded-md' />
                ) : (
                    <span className='text-3xl font-black italic tracking-tighter leading-none'>
                        {value}
                    </span>
                )}
                {!loading && hasPulse && (
                    <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                )}
            </div>
            <span className='text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-600 dark:text-neutral-300 mt-2'>
                {label}
            </span>
        </div>
    );
}
