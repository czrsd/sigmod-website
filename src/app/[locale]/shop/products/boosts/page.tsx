'use client';

import { useEffect, useState } from 'react';
import { getAllBoosts, getSale } from '@/services/shop';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Boost } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Translate = ReturnType<typeof useTranslations>;

export default function SkinsProducts() {
    const t = useTranslations('Shop.Products.Boosts');
    const [boosts, setBoosts] = useState<Boost[]>([]);
    const [sale, setSale] = useState(1);

    useEffect(() => {
        getAllBoosts().then((res) => {
            if (res) setBoosts(res);
        });
        getSale().then((s) => {
            if (s) setSale(s);
        });
    }, []);

    return (
        <section className='flex flex-col items-center text-center space-y-8'>
            <h1 className='text-3xl font-bold'>{t('title')}</h1>

            <div className='flex flex-wrap justify-center gap-6 max-w-6xl'>
                {boosts.map((boost, i) => (
                    <ProductCard key={i} boost={boost} t={t} />
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

function ProductCard({ boost, t }: { boost: Boost; t: Translate }) {
    return (
        <div
            className={`
                flex flex-col items-center gap-4 min-w-[250px] 
                rounded-xl p-8 border
                hover:scale-103 transition-all duration-300 cursor-pointer
            `}
            onClick={() =>
                (location.href = `/shop/products/boosts/${boost._id}`)
            }
        >
            <Image
                src={'/shop/products/boosts.png'}
                alt={`${boost.hours} hour boost`}
                width={100}
                height={100}
                draggable={false}
            />
            <div className='flex flex-col items-center'>
                <span className='text-lg font-semibold'>
                    {boost.hours} {t('hours')}
                </span>
                <span className='text-2xl font-bold'>
                    {t('price', { price: boost.price.toFixed(2) })}
                </span>
            </div>
            <Button variant='outline' className='w-full font-semibold'>
                {t('buyNow')}
            </Button>
        </div>
    );
}
