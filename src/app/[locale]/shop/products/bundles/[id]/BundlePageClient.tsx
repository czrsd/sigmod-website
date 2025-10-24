'use client';

import { useEffect, useState } from 'react';
import { getBundle } from '@/services/shop';
import ProductLayout from '@/components/pages/shop/products/ProductLayout';
import ProductInfo from '@/components/pages/shop/products/ProductInfo';
import ProductCheckout from '@/components/pages/shop/products/ProductCheckout';
import { Bundle } from '@/types/shopTypes';

export default function SubPageClient({ bundleId }: { bundleId: string }) {
    const [bundle, setBundle] = useState<Bundle | null>(null);

    useEffect(() => {
        const fetchBundle = async () => {
            const data = await getBundle(bundleId);
            setBundle(data);
        };
        fetchBundle();
    }, [bundleId]);

    if (!bundle)
        return <div className='text-center py-20'>Loading bundle...</div>;

    return (
        <ProductLayout
            left={<ProductInfo item={bundle} />}
            right={
                <ProductCheckout productType='bundle' productId={bundle._id} />
            }
        />
    );
}
