import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Guide.SigMod' });
    return pageMetadata({ locale, pathname: '/guide/sigmod', title: t('title'), description: t('desc'), image: '/preview/sigmod_menu.webp' });
}

export default function GuideSigModLayout({ children }: { children: React.ReactNode }) {
    return children;
}
