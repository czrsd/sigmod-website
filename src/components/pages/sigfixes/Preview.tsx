'use client';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

const images: string[] = [
    'before_after.png',
    'multibox.png',
    'sigfixes/sigfixes.png',
    'sigfixes/camera.png',
    'sigfixes/multiboxing.png',
    'sigfixes/text.png',
    'sigfixes/patches.png',
];

export function Preview() {
    return (
        <section className='max-w-4xl mx-auto'>
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 4000 })]}
                className='rounded-lg shadow-lg'
            >
                <CarouselContent>
                    {images.map((img, idx) => {
                        const src = '/preview/' + img;
                        const altText = img
                            .replace('_', ' ')
                            .replace('.png', '')
                            .replace(/^./, (c) => c.toUpperCase());
                        return (
                            <CarouselItem
                                key={idx}
                                className='relative w-full h-full'
                            >
                                <Image
                                    src={src}
                                    alt={altText}
                                    width={1600}
                                    height={900}
                                    className='object-contain aspect-16/9'
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
