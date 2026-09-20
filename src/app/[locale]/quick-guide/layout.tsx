import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'QuickGuide' });

    return pageMetadata({
        locale,
        pathname: '/quick-guide',
        title: t('title'),
        description: t('note'),
    });
}

export default function QuickGuideLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
