import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return pageMetadata({ locale, pathname: '/shop/products/skins', title: 'Sigmally Skins – SigModz Shop', description: 'Browse custom Sigmally skins from the SigModz shop.' });
}

export default function SkinsLayout({ children }: { children: React.ReactNode }) { return children; }
