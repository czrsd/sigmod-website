'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

const images = [
    'menu.webp',
    'before_after.webp',
    'customization-comparison.webp',
    'game_menu.webp',
    'party_system.webp',
    'multibox.webp',
];

const imageAlts: Record<string, string> = {
    'menu.webp': 'Sigmally Mod Menu interface with custom features',
    'before_after.webp': 'Comparison of vanilla Sigmally vs SigModz graphics',
    'customization-comparison.webp': 'Custom skin and UI customization options',
    'game_menu.webp': 'In-game mod settings for Sigmally',
    'party_system.webp': 'Sigmally party system and clan features',
    'multibox.webp': 'Multibox support for Sigmally players',
};

export function HeroCarousel() {
    const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

    return (
        <div className='relative z-10 bg-neutral-900/50 lg:backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] shadow-2xl'>
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
                                    alt={imageAlts[img] || `Feature: ${img}`}
                                    fill
                                    className='object-cover'
                                    sizes='(max-width: 640px) 90vw, (max-width: 1024px) 40vw, (max-width: 1536px) 45vw, (max-width: 2560px) 50vw, 1200px'
                                    quality={75}
                                    priority={idx === 0}
                                    loading={idx === 0 ? 'eager' : 'lazy'}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
