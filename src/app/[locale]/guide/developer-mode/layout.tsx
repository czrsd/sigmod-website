import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Guide.DevMode' });
    return pageMetadata({ locale, pathname: '/guide/developer-mode', title: t('title'), description: t('desc') });
}

export default function DeveloperModeLayout({ children }: { children: React.ReactNode }) {
    return children;
}
