import {
    HeroSection,
    IntroductionSection,
    ModsSection,
    FAQSection,
    CommunitySection,
} from '@/components/pages/home';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl, pageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return pageMetadata({
        locale,
        pathname: '/',
        title: 'Sigmally Mods – SigMod & SigFixes',
        description: t('desc'),
    });
}

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <main>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'WebSite',
                            '@id': `${absoluteUrl('/')}/#website`,
                            url: absoluteUrl(`/${locale}`),
                            name: 'SigModz',
                            alternateName: 'Sigmally Mods',
                            inLanguage: locale,
                        },
                        {
                            '@type': 'Organization',
                            '@id': `${absoluteUrl('/')}/#organization`,
                            name: 'SigModz',
                            url: absoluteUrl(`/${locale}`),
                            logo: absoluteUrl('/sigmodz.svg'),
                            description:
                                'An unofficial community project providing SigMod and SigFixes for Sigmally.',
                            sameAs: [
                                'https://github.com/czrsd/sigmod',
                                'https://github.com/8y8x/sigmally-fixes',
                                'https://discord.gg/QyUhvUC8AD',
                            ],
                        },
                    ],
                }}
            />
            <HeroSection />
            <IntroductionSection />
            <ModsSection />
            <FAQSection />
            <CommunitySection />
        </main>
    );
}
