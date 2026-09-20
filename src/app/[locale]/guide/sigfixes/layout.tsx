import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Guide.SigFixes' });
    return pageMetadata({ locale, pathname: '/guide/sigfixes', title: t('title'), description: t('desc'), image: '/preview/sigfixes/sigfixes.png' });
}

export default function GuideSigFixesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
