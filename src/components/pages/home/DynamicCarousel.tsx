'use client';

import dynamic from 'next/dynamic';

export const DynamicCarousel = dynamic(
    () => import('./HeroCarousel').then((mod) => mod.HeroCarousel),
    {
        ssr: false,
        loading: () => (
            <div className='w-full h-full bg-neutral-900/50 rounded-[2rem]' />
        ),
    }
);
