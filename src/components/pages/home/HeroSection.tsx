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
        <section className='relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 pt-20 pb-16 lg:pt-36 lg:pb-28 gap-12 lg:gap-16'>
            <div className='w-full lg:w-1/2 text-center lg:text-left space-y-8 relative z-10'>
                <div className='space-y-5'>
                    <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]'>
                        {t.rich('title', {
                            glow: (chunks) => (
                                <span className='text-foreground'>
                                    {chunks}
                                </span>
                            ),
                        })}
                    </h1>
                    <p className='mx-auto lg:mx-0 max-w-lg text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal'>
                        {t('sub')}
                    </p>
                </div>

                <div className='flex flex-wrap gap-3.5 justify-center lg:justify-start'>
                    <Button
                        size='lg'
                        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-12 rounded-full transition-colors shadow-md'
                        asChild
                    >
                        <Link href='/guide'>
                            {t('start')} <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        size='lg'
                        className='border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] font-semibold px-8 h-12 rounded-full'
                        asChild
                    >
                        <Link href='/shop'>
                            <ShoppingCart className='mr-2 h-4 w-4' />
                            {t('shop_now')}
                        </Link>
                    </Button>
                </div>

                <StatsClient />
            </div>

            <div className='w-full lg:w-1/2 relative z-10'>
                <div
                    className='relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-black/10 dark:border-white/10 bg-neutral-900/60 shadow-xl'
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
            </div>
        </section>
    );
}
