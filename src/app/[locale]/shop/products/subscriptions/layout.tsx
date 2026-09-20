import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return pageMetadata({ locale, pathname: '/shop/products/subscriptions', title: 'Sigmally Subscriptions – SigModz Shop', description: 'View Sigmally subscriptions and membership options from SigModz.' });
}

export default function SubscriptionsLayout({ children }: { children: React.ReactNode }) { return children; }
