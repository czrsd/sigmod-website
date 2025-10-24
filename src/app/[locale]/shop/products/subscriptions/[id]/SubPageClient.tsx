'use client';

import { useEffect, useState } from 'react';
import { getSubscriptionPackage, getSale } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { SubPackage } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';

export default function SubPageClient({ subId }: { subId: string }) {
    const t = useTranslations('Shop.Products.SubscriptionPackages');
    const [sub, setSub] = useState<SubPackage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [subData, saleData] = await Promise.all([
                getSubscriptionPackage(subId),
                getSale(),
            ]);
            if (subData) {
                setSub({
                    ...subData,
                    original:
                        Math.round(subData.original * (saleData || 1) * 100) /
                        100,
                });
            }
            setLoading(false);
        };
        fetchData();
    }, [subId]);

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400'>
                {t('loading')}
            </div>
        );

    if (!sub)
        return (
            <div className='text-center py-20 text-red-500'>
                {t('notFound')}
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
