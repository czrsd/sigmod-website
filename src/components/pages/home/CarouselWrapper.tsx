'use client';

import { useEffect, useState } from 'react';
import { DynamicCarousel } from './DynamicCarousel';

export default function CarouselWrapper() {
    const [shouldLoadCarousel, setShouldLoadCarousel] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setShouldLoadCarousel(true);
            }
        };

        checkDesktop();
    }, []);

    return (
        <>
            {shouldLoadCarousel && (
                <div className='hidden md:block absolute inset-0 z-10'>
                    <DynamicCarousel />
                </div>
            )}
        </>
    );
}
