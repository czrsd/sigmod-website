'use client';

import { useEffect, useState } from 'react';
import {
    getAllDefaultBundles,
    getCoinPackage,
    getSubscriptionPackage,
} from '@/services/shop';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { formatNumber } from '@/utils/format';
import { Bundle, FullBundle } from '@/types/shopTypes';
import { getSale } from '@/services/shop';

export default function BundlesPage() {
    const [bundles, setBundles] = useState<FullBundle[]>([]);
    const [sale, setSale] = useState(1);

    useEffect(() => {
        (async () => {
            const bundles = await getAllDefaultBundles();
            if (!bundles) return;
            getSale().then((s) => {
                if (s) setSale(s);
            });

            const preparedBundles = await Promise.all(
                bundles.map(async (bundle: Bundle) => {
                    const [coinPackage, subPackage] = await Promise.all([
                        getCoinPackage(bundle.combined?.[0]),
                        getSubscriptionPackage(bundle.combined?.[1]),
                    ]);
                    if (!coinPackage || !subPackage)
                        throw new Error('Invalid bundle data');
                    return { ...bundle, coinPackage, subPackage };
                })
            );
            setBundles(preparedBundles);
        })();
    }, []);

    return (
        <section className='flex flex-col items-center text-center space-y-8'>
            <h1 className='text-3xl font-bold'>Bundles</h1>
            <div className='flex flex-wrap justify-center gap-6 max-w-4xl'>
                {bundles.map((bundle, i) => (
                    <ProductCard key={i} bundle={bundle} sale={sale} />
                ))}
            </div>
        </section>
    );
}

function ProductCard({ bundle, sale }: { bundle: FullBundle; sale: number }) {
    const { _id, price, coinPackage, subPackage } = bundle;
    const original = coinPackage.original * sale + subPackage.original * sale;

    return (
        <div
            className='flex flex-col items-center gap-4 min-w-[250px] bg-neutral-900 rounded-xl p-8 border border-neutral-800 hover:scale-103 transition-transform'
            onClick={() => (location.href = `/shop/products/bundles/${_id}`)}
        >
            <img
                src='/shop/bundles.png'
                alt={_id}
                width={100}
                height={100}
                draggable={false}
            />
            <div className='flex flex-col items-center justify-center'>
                <span className='text-xl font-semibold mb-2'>
                    {bundle.name}
                </span>
                <span>
                    {subPackage.duration}{' '}
                    {subPackage.duration === 1 ? 'month' : 'months'}{' '}
                    Subscription
                </span>
                <Plus size={20} />
                <span>{formatNumber(coinPackage.amount)} Coins</span>
                <span className='text-2xl font-bold text-white mt-2'>
                    €{price.toFixed(2)}
                </span>
                <span className='relative text-neutral-500 text-sm'>
                    <span className='before:content-[""] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1px] before:bg-red-500 before:-rotate-[10deg] before:translate-y-[-50%] inline-block'>
                        €{original.toFixed(2)}
                    </span>
                </span>
            </div>
            <Button variant='secondary' className='w-full font-semibold'>
                Buy now
            </Button>
        </div>
    );
}
