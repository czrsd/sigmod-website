'use client';

import { useEffect, useState } from 'react';
import { getAllSubPackages, getSale } from '@/services/shop';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubPackage } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Translate = ReturnType<typeof useTranslations>;

export default function SubscriptionPackages() {
    const t = useTranslations('Shop.Products.SubscriptionPackages');
    const [subs, setSubs] = useState<SubPackage[]>([]);
    const [sale, setSale] = useState(1);

    useEffect(() => {
        getAllSubPackages().then((res) => {
            if (res) setSubs(res);
        });
        getSale().then((s) => {
            if (s) setSale(s);
        });
    }, []);

    return (
        <section className='flex flex-col items-center text-center space-y-8'>
            <h1 className='text-3xl font-bold'>{t('title')}</h1>

            <div className='flex flex-wrap justify-center gap-6 max-w-4xl'>
                {subs.map((sub, i) => (
                    <ProductCard
                        key={i}
                        _id={sub._id}
                        duration={sub.duration}
                        price={sub.price}
                        original={sub.original * sale}
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

function ProductCard({
    _id,
    duration,
    price,
    original,
    t,
}: {
    _id: string;
    duration: number;
    price: number;
    original: number;
    t: Translate;
}) {
    const label =
        duration === 1
            ? t('monthLabel', { duration })
            : t('monthsLabel', { duration });

    return (
        <div
            className='flex flex-col items-center gap-4 min-w-[250px] bg-secondary dark:bg-neutral-900 rounded-xl p-8 border dark:border-neutral-800 hover:scale-103 transition-transform'
            onClick={() =>
                (location.href = `/shop/products/subscriptions/${_id}`)
            }
        >
            <Image
                src='/shop/subs/sub.svg'
                alt={_id}
                width={80}
                height={80}
                draggable={false}
                className='h-[100px]'
            />
            <div className='flex flex-col items-center'>
                <span className='text-lg font-semibold'>{label}</span>
                <span className='text-2xl font-bold'>
                    {t('price', { price: price.toFixed(2) })}
                </span>
                <span className='relative text-neutral-500 text-sm'>
                    <span className='before:content-[""] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1px] before:bg-red-500 before:-rotate-[10deg] before:translate-y-[-50%] inline-block'>
                        {t('originalPrice', { original: original.toFixed(2) })}
                    </span>
                </span>
            </div>
            <Button variant='outline' className='w-full font-semibold'>
                {t('buyNow')}
            </Button>
        </div>
    );
}
