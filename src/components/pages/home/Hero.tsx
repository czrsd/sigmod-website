import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight } from 'lucide-react';
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
    return (
        <section className='flex flex-col md:flex-row md:flex-grow px-6 md:px-16 pt-24 pb-32 md:pt-32 md:pb-64 gap-12'>
            <div className='md:w-1/2 text-center md:text-left mt-10'>
                <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight'>
                    <span className='bg-gradient-to-r from-[var(--glow)] to-purple-500 text-transparent bg-clip-text [text-wrap:balance]'>
                        {t('title')}
                    </span>
                </h1>
                <p className='mt-4 max-w-lg text-base sm:text-lg md:text-xl text-muted-foreground'>
                    {t('sub')}
                </p>

                <div className='mt-6 flex gap-4 justify-center md:justify-start'>
                    <Button
                        variant={'outline'}
                        className='text-base font-semibold'
                        asChild
                    >
                        <Link href='/guide'>
                            {t('start')} <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
                <Carousel
                    opts={{ loop: true }}
                    plugins={[Autoplay({ delay: 3000 })]}
                    className='w-full mx-w-md md:max-w-3xl'
                >
                    <CarouselContent>
                        {images.map((img, idx) => {
                            const imgSrc = '/preview/' + img;
                            const imgAlt = img
                                .replace('_', ' ')
                                .replace('.png', '')
                                .replace(/^./, (c) => c.toUpperCase());

                            return (
                                <CarouselItem key={idx}>
                                    <Image
                                        src={imgSrc}
                                        alt={imgAlt}
                                        width={1600}
                                        height={900}
                                        className='rounded-xl shadow-md'
                                        loading={idx === 0 ? 'eager' : 'lazy'}
                                        fetchPriority={
                                            idx === 0 ? 'high' : 'auto'
                                        }
                                    />
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
