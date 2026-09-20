import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Guide.End' });
    return pageMetadata({ locale, pathname: '/guide/end', title: t('title'), description: t('desc'), noIndex: true });
}

export default function GuideEndLayout({ children }: { children: React.ReactNode }) {
    return children;
}
