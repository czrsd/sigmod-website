'use client';

import {
    Hero,
    CoreFeatures,
    Preview,
    WhySigMod,
    Features,
    FAQ,
    Community,
    GlowItems,
} from '@/components/pages/sigmod';

export default function SigModPage() {
    return (
        <main className='max-w-5xl mx-auto px-6 md:px-16 pt-20 space-y-24'>
            <Hero />
            <CoreFeatures />
            <Preview />
            <WhySigMod />
            <Features />
            <FAQ />
            <Community />
            <GlowItems />
        </main>
    );
}
