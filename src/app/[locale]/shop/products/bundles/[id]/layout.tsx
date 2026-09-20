import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
    const { locale, id } = await params;
    return pageMetadata({ locale, pathname: `/shop/products/bundles/${id}`, title: 'Sigmally Bundle – SigModz Shop', description: 'Sigmally bundle from the SigModz shop.' });
}

export default function BundleIdLayout({ children }: { children: React.ReactNode }) { return children; }
