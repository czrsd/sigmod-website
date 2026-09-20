import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

const descriptions: Record<string, string> = {
    en: 'SigModz shop for Sigmally coins, subscriptions and bundles.',
    de: 'SigModz-Shop für Sigmally-Münzen, Abos und Bundles.',
    es: 'Tienda de SigModz para monedas, suscripciones y paquetes de Sigmally.',
    tr: 'Sigmally coinleri, abonelikleri ve paketleri için SigModz mağazası.',
    ru: 'Магазин SigModz: монеты, подписки и наборы для Sigmally.',
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
