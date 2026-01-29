'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ShoppingCart, Users } from 'lucide-react';
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

export function HeroSection() {
    const t = useTranslations('HomePage.hero');
    const [stats, setStats] = useState({ total: '30,000+', daily: '...' });

    useEffect(() => {
        async function fetchStats() {
            try {
                const ids = ['454648', '483587'];
                let total = 0;
                let daily = 0;
                for (const id of ids) {
                    const res = await fetch(
                        `https://greasyfork.org/scripts/${id}.json`
                    );
                    const data = await res.json();
                    total += data.total_installs;
                    daily += data.daily_installs;
                }
                setStats({
                    total: total.toLocaleString(),
                    daily: daily.toLocaleString(),
                });
            } catch (e) {
                console.error('Failed to fetch GreasyFork stats', e);
            }
        }
        fetchStats();
    }, []);

    return (
        <section className='relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 pt-24 pb-20 lg:pt-44 lg:pb-32 gap-16 overflow-hidden'>
            <div className='w-full lg:w-1/2 text-center lg:text-left space-y-10 relative z-10'>
                {/* Headline & Sub */}
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
                    <p className='mx-auto lg:mx-0 max-w-lg text-lg md:text-xl text-neutral-400 leading-relaxed font-medium'>
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
                            <ShoppingCart className='mr-2 h-5 w-5' />{' '}
                            {t('shop_now')}
                        </Link>
                    </Button>

                    <Button
                        variant='outline'
                        size='lg'
                        className='border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold px-10 h-14 rounded-full backdrop-blur-md'
                        asChild
                    >
                        <Link href='/guide'>
                            {t('start')} <ArrowRight className='ml-2 h-5 w-5' />
                        </Link>
                    </Button>
                </div>

                <div className='pt-4 flex flex-row items-center justify-center lg:justify-start gap-12'>
                    <div className='flex flex-col'>
                        <span className='text-3xl font-black text-white italic tracking-tighter leading-none'>
                            {stats.total}
                        </span>
                        <span className='text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500 mt-2'>
                            {t('stats.total')}
                        </span>
                    </div>

                    <div className='w-px h-10 bg-white/10 hidden sm:block' />

                    <div className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <span className='text-3xl font-black text-white italic tracking-tighter leading-none'>
                                {stats.daily}
                            </span>
                            <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                        </div>
                        <span className='text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500 mt-2'>
                            {t('stats.active')}
                        </span>
                    </div>
                </div>
            </div>

            <div className='w-full lg:w-1/2 relative group z-10'>
                <div className='absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-3xl opacity-50' />
                <div className='relative bg-neutral-900/50 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-2xl'>
                    <Carousel
                        opts={{ loop: true }}
                        plugins={[Autoplay({ delay: 4000 })]}
                        className='w-full'
                    >
                        <CarouselContent>
                            {images.map((img, idx) => (
                                <CarouselItem key={idx}>
                                    <div className='relative aspect-video overflow-hidden rounded-[1.6rem]'>
                                        <Image
                                            src={'/preview/' + img}
                                            alt={img}
                                            fill
                                            className='object-cover'
                                            priority={idx === 0}
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
