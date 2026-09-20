import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: 'TutorialPage.overview',
    });

    return pageMetadata({
        locale,
        pathname: '/tutorials',
        title: t('title'),
        description: t('communityHub'),
    });
}

export default function TutorialsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
