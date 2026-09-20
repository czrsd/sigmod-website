import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ProductsShell from './ProductsShell';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return pageMetadata({
        locale,
        pathname: '/shop/products',
        title: 'SigModz Products for Sigmally',
        description:
            'Browse Sigmally coins, subscriptions, skins, boosts, private servers and bundles from SigModz.',
    });
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return <ProductsShell>{children}</ProductsShell>;
}
