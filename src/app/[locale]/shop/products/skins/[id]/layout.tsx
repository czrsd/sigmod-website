import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
    const { locale, id } = await params;
    return pageMetadata({ locale, pathname: `/shop/products/skins/${id}`, title: 'Sigmally Skin – SigModz Shop', description: 'Custom Sigmally skin from the SigModz shop.' });
}

export default function SkinIdLayout({ children }: { children: React.ReactNode }) { return children; }
