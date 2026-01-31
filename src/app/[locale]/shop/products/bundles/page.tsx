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
import Image from 'next/image';
import { Sparkles, Gift, ArrowRightCircle } from 'lucide-react';

type Translate = ReturnType<typeof useTranslations>;

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

    const features = [
        {
            icon: <Gift size={16} />,
            text: t('features.bestValue') || 'Bester Wert',
        },
        {
            icon: <Sparkles size={16} />,
            text: t('features.exclusive') || 'Exklusive Kombinationen',
        },
    ];

    if (loading)
        return (
            <div className='text-center py-20 text-neutral-400 animate-pulse font-bold uppercase italic'>
                {t('loading')}
            </div>
        );

    if (failed || !bundles || bundles.length === 0)
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
                {bundles.map((bundle, i) => (
                    <ProductCard key={i} bundle={bundle} sale={sale} t={t} />
                ))}
            </div>
        </section>
    );
}

function ProductCard({
    bundle,
    sale,
    t,
}: {
    bundle: FullBundle;
    sale: number;
    t: Translate;
}) {
    const { _id, price, coinPackage, subPackage, name } = bundle;

    const original = coinPackage.original * sale + subPackage.original * sale;
    const hasDiscount = original > price;

    const durationLabel =
        subPackage.duration === 1
            ? t('monthLabel', { duration: subPackage.duration })
            : t('monthsLabel', { duration: subPackage.duration });

    return (
        <div
            className='group relative flex flex-col items-center w-[300px] bg-white/50 dark:bg-neutral-900/40 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px] cursor-pointer'
            onClick={() => (location.href = `/shop/products/bundles/${_id}`)}
        >
            <div className='relative mb-4 transition-transform duration-500 group-hover:scale-110'>
                <Image
                    src={`/shop/bundles/${name}.svg`}
                    alt={name}
                    width={120}
                    height={120}
                    draggable={false}
                    className='h-[110px] w-auto drop-shadow-2xl'
                />
            </div>

            <div className='flex flex-col items-center space-y-1 w-full'>
                <span className='text-xl font-black uppercase italic tracking-tight bg-gradient-to-t from-primary to-primary/80 text-transparent bg-clip-text'>
                    {name}
                </span>

                <div className='flex flex-col text-sm font-bold text-neutral-500 uppercase italic'>
                    <span>{durationLabel}</span>
                    <span>
                        {t('coinsLabel', {
                            amount: formatNumber(coinPackage.amount),
                        })}
                    </span>
                </div>

                <div className='flex flex-col items-center py-4'>
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
                        className='w-full font-black uppercase italic text-xs gap-2 group-hover:!bg-primary group-hover:!text-black transition-all'
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
