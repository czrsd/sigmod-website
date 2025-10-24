'use client';

import { useEffect, useState } from 'react';
import { getCoinPackage, getSale } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { CoinPackage } from '@/types/shopTypes';

export default function CoinPageClient({ coinId }: { coinId: string }) {
    const [coin, setCoin] = useState<CoinPackage | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [coinData, saleData] = await Promise.all([
                getCoinPackage(coinId),
                getSale(),
            ]);
            if (coinData)
                setCoin({
                    ...coinData,
                    original:
                        Math.round(coinData.original * (saleData || 1) * 100) /
                        100,
                });
        };
        fetchData();
    }, [coinId]);

    if (!coin)
        return <div className='text-center py-20'>Loading coin package...</div>;

    return (
        <ProductLayout
            left={<ProductInfo item={coin} />}
            right={<ProductCheckout productType='coins' productId={coin._id} />}
        />
    );
}
