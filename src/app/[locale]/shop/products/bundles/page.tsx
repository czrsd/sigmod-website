'use client';
import { useEffect, useState } from 'react';
import {
    getAllDefaultBundles,
    getCoinPackage,
    getSubscriptionPackage,
    getSale,
} from '@/services/shop';
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/utils/format';
import { FullBundle } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';
export default function BundlesPage() {
    const t = useTranslations('Shop.Products.BundlesPage');
    const [bundles, setBundles] = useState<FullBundle[] | null>(null);
    const [sale, setSale] = useState(1);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            setFailed(false);
            try {
                const allBundles = await getAllDefaultBundles();
                if (!allBundles) throw new Error('No bundles found');
                const s = await getSale();
                setSale(s || 1);
                const preparedBundles = await Promise.all(
                    allBundles.map(async (bundle) => {
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
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400'>
                {t('loading')}
            </div>
        );
    if (failed || !bundles || bundles.length === 0)
        return (
            <div className='text-center py-20 text-red-500'>
                {t('notFound')}
            </div>
        );
    return (
        <section className='flex flex-col items-center text-center space-y-8'>
            <h1 className='text-3xl font-bold'>{t('title')}</h1>
            <div className='flex flex-wrap justify-center gap-6 max-w-4xl'>
                {bundles.map((bundle, i) => (
                    <ProductCard key={i} bundle={bundle} sale={sale} t={t} />
                ))}
            </div>
        </section>
    );
}
function ProductCard({ bundle, sale, t }: any) {
    const { _id, price, coinPackage, subPackage } = bundle;
    const original = coinPackage.original * sale + subPackage.original * sale;
    const durationLabel =
        subPackage.duration === 1
            ? t('monthLabel', { duration: subPackage.duration })
            : t('monthsLabel', { duration: subPackage.duration });
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
                <span className='text-xl font-semibold bg-gradient-to-t from-blue-500 to-blue-300 text-transparent bg-clip-text mb-2'>
                    {bundle.name}
                </span>
                <span>{durationLabel}</span>
                <span>
                    {t('coinsLabel', {
                        amount: formatNumber(coinPackage.amount),
                    })}
                </span>
                <span className='text-2xl font-bold text-white mt-2'>
                    {t('price', { price: price.toFixed(2) })}
                </span>
                <span className='relative text-neutral-500 text-sm'>
                    <span className='before:content-[""] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1px] before:bg-red-500 before:-rotate-[10deg] before:translate-y-[-50%] inline-block'>
                        {t('originalPrice', {
                            original: original.toFixed(2),
                        })}
                    </span>
                </span>
            </div>
            <Button variant='secondary' className='w-full font-semibold'>
                {t('buyNow')}
            </Button>
        </div>
    );
}
