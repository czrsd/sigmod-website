'use client';

import { useEffect, useState } from 'react';
import { getAllCoinPackages, getSale } from '@/services/shop';
import { formatNumber } from '@/utils/format';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CoinPackage } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Coins, Zap, ArrowRightCircle } from 'lucide-react';

type Translate = ReturnType<typeof useTranslations>;

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

    const features = [
        {
            icon: <Coins size={16} />,
            text: t('features.instant') || 'Sofortige Lieferung',
        },
        {
            icon: <Zap size={16} />,
            text: t('features.unlock') || 'Exklusive Items',
        },
    ];

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400 animate-pulse font-bold uppercase italic'>
                {t('loading')}
            </div>
        );

    if (failed || !coins)
        return (
            <div className='text-center py-20 text-red-500 font-bold'>
                {t('notFound')}
            </div>
        );

    return (
        <section className='flex flex-col items-center text-center space-y-12 py-6'>
            <div className='space-y-4'>
                <h1 className='text-4xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h1>
                <div className='flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400'>
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className='flex items-center gap-2 bg-neutral-100 dark:bg-white/5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/5'
                        >
                            <span className='text-primary'>{feature.icon}</span>
                            {feature.text}
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-6 max-w-7xl px-4'>
                {coins
                    .sort((a, b) => a.amount - b.amount)
                    .map((coin) => (
                        <ProductCard
                            key={coin._id}
                            _id={coin._id}
                            amount={coin.amount}
                            price={coin.price}
                            original={coin.original * sale}
                            img={`/shop/coins/coins${coin.amount}.svg`}
                            t={t}
                        />
                    ))}
            </div>

            <div className='flex flex-col items-center space-y-3 pt-4'>
                <p className='text-xs font-bold uppercase tracking-widest text-neutral-500'>
                    {t('saveMore')}
                </p>
                <Button
                    asChild
                    variant='outline'
                    className='font-bold uppercase italic transition-all'
                >
                    <Link href='/shop/products/bundles'>
                        {t('viewBundles')}
                    </Link>
                </Button>
            </div>
        </section>
    );
}

function ProductCard({
    _id,
    amount,
    price,
    original,
    img,
    t,
}: {
    _id: string;
    amount: number;
    price: number;
    original: number;
    img: string;
    t: Translate;
}) {
    const hasDiscount = original > price;

    return (
        <div
            className='group relative flex flex-col items-center w-[280px] bg-white/50 dark:bg-neutral-900/40 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer'
            onClick={() => (location.href = `/shop/products/coins/${_id}`)}
        >
            <div className='relative mb-4 transition-transform duration-500 group-hover:scale-110'>
                <Image
                    src={img}
                    alt={_id}
                    width={100}
                    height={100}
                    draggable={false}
                    className='h-[100px] w-auto drop-shadow-2xl'
                />
            </div>

            <div className='flex flex-col items-center space-y-1 w-full'>
                <span className='text-lg font-black uppercase italic tracking-tight'>
                    {t('coinsLabel', { amount: formatNumber(amount) })}
                </span>

                <div className='flex flex-col items-center pb-6'>
                    <span className='text-3xl font-black tracking-tighter'>
                        €{price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                        <span className='text-sm line-through decoration-red-500/60 decoration-2 italic font-medium text-neutral-500'>
                            €{original.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className='w-full pt-4 border-t border-neutral-200 dark:border-white/5 group-hover:border-primary/20 transition-colors'>
                    <Button
                        variant='ghost'
                        className='w-full font-black uppercase italic text-xs gap-2 group-hover:!bg-primary group-hover:!text-black cursor-pointer transition-all'
                    >
                        {t('buyNow')}
                        <ArrowRightCircle
                            size={14}
                            className='opacity-0 group-hover:opacity-100 transition-opacity'
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}
