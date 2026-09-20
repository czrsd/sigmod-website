import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AboutPage' });

    return pageMetadata({
        locale,
        pathname: '/about',
        title: t('title'),
        description: t('subtitle'),
    });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
