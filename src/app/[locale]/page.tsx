'use client';
import {
    HeroSection,
    IntroductionSection,
    ModsSection,
    FAQSection,
    CommunitySection,
    GlowItems,
} from '@/components/pages/home';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <IntroductionSection />
            <ModsSection />
            <FAQSection />
            <CommunitySection />
            <GlowItems />
        </div>
    );
}
