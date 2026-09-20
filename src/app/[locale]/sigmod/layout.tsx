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
    const t = await getTranslations({ locale, namespace: 'SigModPage' });

    return pageMetadata({
        locale,
        pathname: '/sigmod',
        title: `SigMod for Sigmally – ${t('Hero.title')}`,
        description: t('Hero.sub'),
        image: '/preview/sigmod_menu.webp',
    });
}

export default function SigModLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Sigmally Mods', item: absoluteUrl('/en') },
                        { '@type': 'ListItem', position: 2, name: 'SigMod', item: absoluteUrl('/en/sigmod') },
                    ],
                }}
            />
            {children}
        </>
    );
}
