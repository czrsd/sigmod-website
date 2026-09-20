import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
    const { locale, id } = await params;
    return pageMetadata({ locale, pathname: `/shop/products/subscriptions/${id}`, title: 'Sigmally Subscription – SigModz Shop', description: 'Sigmally subscription from the SigModz shop.' });
}

export default function SubscriptionIdLayout({ children }: { children: React.ReactNode }) { return children; }
