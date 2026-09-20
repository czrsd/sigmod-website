import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import StatsClient from './StatsClient';
import CarouselWrapper from './CarouselWrapper';

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

                <StatsClient />
            </div>

            <div className='w-full lg:w-1/2 relative z-10'>
                <div
                    className='relative w-full overflow-hidden rounded-xl md:rounded-[2rem] md:shadow-2xl border border-white/10'
                    style={{ aspectRatio: '16 / 9' }}
                >
                    <Image
                        src='/preview/menu.webp'
                        alt='Sigmally Mod Menu interface'
                        fill
                        priority
                        fetchPriority='high'
                        quality={75}
                        className='object-cover z-0'
                        sizes='(max-width: 768px) 85vw, (max-width: 1200px) 45vw, (max-width: 1920px) 45vw, 1200px'
                    />

                    <CarouselWrapper />
                </div>

                <div className='hidden md:block absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-3xl opacity-50 pointer-events-none -z-10' />
            </div>
        </section>
    );
}
