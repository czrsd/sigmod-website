'use client';

import { useEffect, useState } from 'react';
import { getCoinPackage, getSale } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { CoinPackage } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';

export default function CoinPageClient({ coinId }: { coinId: string }) {
    const t = useTranslations('Shop.Products.CoinPackages');
    const [coin, setCoin] = useState<CoinPackage | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setFailed(false);
            try {
                const [coinData, saleData] = await Promise.all([
                    getCoinPackage(coinId),
                    getSale(),
                ]);
                if (!coinData) {
                    setFailed(true);
                    return;
                }
                setCoin({
                    ...coinData,
                    original:
                        Math.round(coinData.original * (saleData || 1) * 100) /
                        100,
                });
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [coinId]);

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400'>
                {t('loading')}
            </div>
        );
    if (failed || !coin)
        return (
            <div className='text-center py-20 text-red-500'>
                {t('notFound')}
            </div>
        );

    return (
        <ProductLayout
            left={<ProductInfo item={coin} />}
            right={<ProductCheckout productType='coins' productId={coin._id} />}
        />
    );
}
