import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

const descriptions: Record<string, string> = {
    en: 'Official SigModz shop for Sigmally coins, subscriptions, skins, boosts and bundles.',
    de: 'Offizieller SigModz-Shop für Sigmally-Münzen, Abos, Skins, Boosts und Bundles.',
    es: 'Tienda oficial de SigModz para monedas, suscripciones, skins, boosts y paquetes de Sigmally.',
    tr: 'Sigmally coinleri, abonelikleri, skinleri, boostları ve paketleri için resmi SigModz mağazası.',
    ru: 'Официальный магазин SigModz: монеты, подписки, скины, усилители и наборы для Sigmally.',
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return pageMetadata({
        locale,
        pathname: '/shop',
        title: 'SigModz Shop for Sigmally',
        description: descriptions[locale] || descriptions.en,
    });
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return children;
}
