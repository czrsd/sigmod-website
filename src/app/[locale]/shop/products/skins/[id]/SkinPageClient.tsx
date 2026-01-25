'use client';

import { useEffect, useState } from 'react';
import { getSkin } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { Skin } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';

export default function CoinPageClient({ skinId }: { skinId: string }) {
    const t = useTranslations('Shop.Products.Boosts');
    const [skin, setSkin] = useState<Skin | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setFailed(false);
            try {
                const skinData = await getSkin(skinId);

                if (!skinData) {
                    setFailed(true);
                    return;
                }
                setSkin(skinData);
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [skinId]);

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400'>
                {t('loading')}
            </div>
        );

    if (failed || !skin)
        return (
            <div className='text-center py-20 text-red-500'>
                {t('notFound')}
            </div>
        );

    return (
        <ProductLayout
            left={<ProductInfo item={skin} />}
            right={<ProductCheckout productType='skin' productId={skin._id} />}
        />
    );
}
