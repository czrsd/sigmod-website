'use client';

import { useEffect, useState } from 'react';
import { getAllCoinPackages, getSale } from '@/services/shop';
import { formatNumber } from '@/utils/format';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CoinPackage } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';

export default function CoinPackages() {
    const t = useTranslations('Shop.Products.CoinPackages');
    const [coins, setCoins] = useState<CoinPackage[] | null>(null);
    const [sale, setSale] = useState(1);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setFailed(false);
            try {
                const [coinData, saleData] = await Promise.all([
                    getAllCoinPackages(),
                    getSale(),
                ]);
                if (!coinData) throw new Error('No data');
                setCoins(coinData);
                if (saleData) setSale(saleData);
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400'>
                {t('loading')}
            </div>
        );

    if (failed || !coins)
        return (
            <div className='text-center py-20 text-red-500'>
                {t('notFound')}
            </div>
        );

    return (
        <section className='flex flex-col items-center text-center space-y-8'>
            <h1 className='text-3xl font-bold'>{t('title')}</h1>

            <div className='flex flex-wrap justify-center gap-6 max-w-4xl'>
                {coins.map((coin) => (
                    <ProductCard
                        key={coin._id}
                        _id={coin._id}
                        amount={coin.amount}
                        price={coin.price}
                        original={coin.original * sale}
                        img='/shop/coins/gold_50000.png'
                        t={t}
                    />
                ))}
            </div>

            <div className='flex flex-col items-center space-y-3 pt-6'>
                <p className='text-sm text-neutral-400'>{t('saveMore')}</p>
                <Button asChild variant='outline' className='font-semibold'>
                    <Link href='/shop/products/bundles'>
                        {t('viewBundles')}
                    </Link>
                </Button>
            </div>
        </section>
    );
}

function ProductCard({ _id, amount, price, original, img, t }: any) {
    return (
        <div
            className='flex flex-col items-center gap-4 min-w-[250px] bg-neutral-900 rounded-xl p-8 border border-neutral-800 hover:scale-103 transition-transform cursor-pointer'
            onClick={() => (location.href = `/shop/products/coins/${_id}`)}
        >
            <img
                src={img}
                alt={_id}
                width={100}
                height={100}
                draggable={false}
            />
            <div className='flex flex-col items-center'>
                <span className='text-lg font-semibold'>
                    {t('coinsLabel', { amount: formatNumber(amount) })}
                </span>
                <span className='text-2xl font-bold text-white'>
                    {t('price', { price: price.toFixed(2) })}
                </span>
                <span className='relative text-neutral-500 text-sm'>
                    <span className='before:content-[""] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1px] before:bg-red-500 before:-rotate-[10deg] before:translate-y-[-50%] inline-block'>
                        {t('originalPrice', { original: original.toFixed(2) })}
                    </span>
                </span>
            </div>
            <Button variant='secondary' className='w-full font-semibold'>
                {t('buyNow')}
            </Button>
        </div>
    );
}
