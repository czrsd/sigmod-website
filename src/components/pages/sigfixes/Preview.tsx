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

export function Preview() {
    return (
        <section className='max-w-4xl mx-auto'>
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 4000 })]}
                className='rounded-lg shadow-lg'
            >
                <CarouselContent>
                    <CarouselItem>
                        <Image
                            src='/screenshots/sigmod_menu.png'
                            alt='SigMod Menu'
                            width={700}
                            height={450}
                            className='rounded-lg'
                            priority
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src='/screenshots/macros.png'
                            alt='Macros UI'
                            width={700}
                            height={450}
                            className='rounded-lg'
                            priority
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src='/screenshots/tag_system.png'
                            alt='Tag system preview'
                            width={700}
                            height={450}
                            className='rounded-lg'
                            priority
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
