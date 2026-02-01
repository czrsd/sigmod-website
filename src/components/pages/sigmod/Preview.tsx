'use client';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const images: string[] = [
    'menu.png',
    'party_system.png',
    'sigmod/macro_tab.png',
    'sigmod/game_tab.png',
    'sigmod/name_tab.png',
    'sigmod/themes_tab.png',
    'sigmod/gallery_tab.png',
    'sigmod/friends_tab.png',
];

export function Preview() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const onSelect = useCallback((api: CarouselApi) => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!api) return;

        onSelect(api);

        api.on('select', () => onSelect(api));
        api.on('reInit', () => onSelect(api));

        return () => {
            api.off('select', () => onSelect(api));
        };
    }, [api, onSelect]);

    return (
        <section className='max-w-5xl mx-auto py-12 px-4'>
            <div className='relative group'>
                <div className='absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000'></div>

                <Carousel
                    setApi={setApi}
                    opts={{ loop: true }}
                    plugins={[Autoplay({ delay: 5000 })]}
                    className='relative bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-[1.5rem] border border-white/10 shadow-2xl overflow-hidden'
                >
                    <CarouselContent>
                        {images.map((img, idx) => {
                            const src = '/preview/' + img;
                            const label = img
                                .split('/')
                                .pop()!
                                .replace('_', ' ')
                                .replace('.png', '')
                                .replace(/^./, (c) => c.toUpperCase());

                            return (
                                <CarouselItem key={idx}>
                                    <div className='p-2 md:p-4'>
                                        <div className='relative rounded-xl overflow-hidden border border-white/5 bg-neutral-900'>
                                            <Image
                                                src={src}
                                                alt={label}
                                                width={1600}
                                                height={900}
                                                className='object-cover aspect-video'
                                                priority={idx === 0}
                                            />
                                            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6'>
                                                <span className='text-white/90 text-sm md:text-lg font-black uppercase italic tracking-widest'>
                                                    {label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    <div className='hidden md:block'>
                        <CarouselPrevious className='left-4 bg-black/50 border-white/10 transition-all hover:bg-white hover:text-black z-20' />
                        <CarouselNext className='right-4 bg-black/50 border-white/10 transition-all hover:bg-white hover:text-black z-20' />
                    </div>
                </Carousel>
            </div>

            <div className='flex justify-center flex-wrap gap-3 mt-8 relative z-30'>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            api?.scrollTo(i);
                            api?.plugins().autoplay?.stop();
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                        className='group py-3 px-1 transition-all'
                    >
                        <div
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-500 ease-out',
                                current === i
                                    ? 'w-12 bg-black dark:bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                                    : 'w-6 bg-black/20 dark:bg-white/20 group-hover:bg-black/50 dark:group-hover:bg-white/50'
                            )}
                        />
                    </button>
                ))}
            </div>
        </section>
    );
}
