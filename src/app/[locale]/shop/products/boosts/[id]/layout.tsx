import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
    const { locale, id } = await params;
    return pageMetadata({ locale, pathname: `/shop/products/boosts/${id}`, title: 'Sigmally Boost – SigModz Shop', description: 'Gameplay boost for Sigmally from the SigModz shop.' });
}

export default function BoostIdLayout({ children }: { children: React.ReactNode }) { return children; }
