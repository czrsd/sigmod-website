'use client';
import {
    HeroSection,
    IntroductionSection,
    ModsSection,
    FAQSection,
    CommunitySection,
} from '@/components/pages/home';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <IntroductionSection />
            <ModsSection />
            <FAQSection />
            <CommunitySection />
        </div>
    );
}
