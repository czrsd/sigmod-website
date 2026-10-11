'use client';

import {
    Hero,
    CoreFeatures,
    Preview,
    WhySigMod,
    Features,
    FAQ,
    Community,
} from '@/components/pages/sigmod';

export default function SigModPage() {
    return (
        <main className='max-w-5xl mx-auto px-6 md:px-16 pt-16 md:pt-20 space-y-20'>
            <Hero />
            <CoreFeatures />
            <Preview />
            <WhySigMod />
            <Features />
            <FAQ />
            <Community />
        </main>
    );
}
