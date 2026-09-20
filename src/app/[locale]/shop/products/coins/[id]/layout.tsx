import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
    const { locale, id } = await params;
    return pageMetadata({ locale, pathname: `/shop/products/coins/${id}`, title: 'Sigmally Coin Package – SigModz Shop', description: 'Sigmally coin package from the SigModz shop.' });
}

export default function CoinIdLayout({ children }: { children: React.ReactNode }) { return children; }
