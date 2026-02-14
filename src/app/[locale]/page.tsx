import {
    HeroSection,
    IntroductionSection,
    ModsSection,
    FAQSection,
    CommunitySection,
} from '@/components/pages/home';

export default async function Home() {
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
