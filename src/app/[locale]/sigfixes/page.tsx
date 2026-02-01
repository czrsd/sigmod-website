import {
    Hero,
    CoreFeatures,
    Preview,
    WhySigFixes,
    Features,
    FAQ,
    Community,
} from '@/components/pages/sigfixes';

export default function SigFixesPage() {
    return (
        <main className='max-w-5xl mx-auto px-6 md:px-16 pt-20 space-y-24'>
            <Hero />
            <CoreFeatures />
            <Preview />
            <WhySigFixes />
            <Features />
            <FAQ />
            <Community />
        </main>
    );
}
