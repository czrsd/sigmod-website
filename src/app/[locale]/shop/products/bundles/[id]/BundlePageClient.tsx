'use client';

import { useEffect, useState } from 'react';
import { getBundle } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { Bundle } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';

export default function BundlePageClient({ bundleId }: { bundleId: string }) {
    const t = useTranslations('Shop.Products.BundlesPage');
    const [bundle, setBundle] = useState<Bundle | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setFailed(false);
            try {
                const data = await getBundle(bundleId);
                if (!data) {
                    setFailed(true);
                    return;
                }
                setBundle(data);
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [bundleId]);

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400'>
                {t('loading')}
            </div>
        );
    if (failed || !bundle)
        return (
            <div className='text-center py-20 text-red-500'>
                {t('notFound')}
            </div>
        );

    return (
        <ProductLayout
            left={<ProductInfo item={bundle} />}
            right={
                <ProductCheckout productType='bundle' productId={bundle._id} />
            }
        />
    );
}
