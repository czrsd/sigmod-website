import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return pageMetadata({ locale, pathname: '/shop/products/coins', title: 'Sigmally Coins – SigModz Shop', description: 'Buy Sigmally coins from the SigModz shop.' });
}

export default function CoinsLayout({ children }: { children: React.ReactNode }) { return children; }
