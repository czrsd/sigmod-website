'use client';

import { useEffect, useState } from 'react';
import { getSubscriptionPackage, getSale } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { SubPackage } from '@/types/shopTypes';

export default function SubPageClient({ subId }: { subId: string }) {
    const [sub, setSub] = useState<SubPackage | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const [subData, saleData] = await Promise.all([
                getSubscriptionPackage(subId),
                getSale(),
            ]);
            if (subData)
                setSub({
                    ...subData,
                    original:
                        Math.round(subData.original * (saleData || 1) * 100) /
                        100,
                });
        };
        fetchData();
    }, [subId]);

    if (!sub)
        return (
            <div className='text-center py-20'>
                Loading subscription package...
            </div>
        );

    return (
        <ProductLayout
            left={<ProductInfo item={sub} />}
            right={
                <ProductCheckout
                    productType='subscription'
                    productId={sub._id}
                />
            }
        />
    );
}
