'use client';

import { useEffect, useState } from 'react';
import { getBoost } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { Boost } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';

export default function CoinPageClient({ boostId }: { boostId: string }) {
    const t = useTranslations('Shop.Products.Boosts');
    const [boost, setBoost] = useState<Boost | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setFailed(false);
            try {
                const boostData = await getBoost(boostId);

                if (!boostData) {
                    setFailed(true);
                    return;
                }
                setBoost(boostData);
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [boostId]);

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400'>
                {t('loading')}
            </div>
        );

    if (failed || !boost)
        return (
            <div className='text-center py-20 text-red-500'>
                {t('notFound')}
            </div>
        );

    return (
        <ProductLayout
            left={<ProductInfo item={boost} />}
            right={
                <ProductCheckout productType='boost' productId={boost._id} />
            }
        />
    );
}
