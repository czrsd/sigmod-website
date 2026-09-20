import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'SigFixesPage' });

    return pageMetadata({
        locale,
        pathname: '/sigfixes',
        title: `SigFixes for Sigmally – ${t('Hero.title')}`,
        description: t('Hero.sub'),
        image: '/preview/sigfixes/sigfixes.png',
    });
}

export default async function SigFixesLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Sigmally Mods', item: absoluteUrl(`/${locale}`) },
                        { '@type': 'ListItem', position: 2, name: 'SigFixes', item: absoluteUrl(`/${locale}/sigfixes`) },
                    ],
                }}
            />
            {children}
        </>
    );
}
