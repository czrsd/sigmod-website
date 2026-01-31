'use client';

import { useEffect, useState } from 'react';
import { getAllSubPackages, getSale } from '@/services/shop';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubPackage } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Users, Trophy, Crown, ArrowRightCircle } from 'lucide-react';

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

    const perks = [
        { icon: <Users size={16} />, text: t('perks.clans') },
        { icon: <Trophy size={16} />, text: t('perks.pass') },
        { icon: <Crown size={16} />, text: t('perks.goldNick') },
    ];

    return (
        <section className='flex flex-col items-center text-center space-y-12 py-6'>
            <div className='space-y-4'>
                <h1 className='text-4xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h1>
                <div className='flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-500 dark:text-neutral-400'>
                    {perks.map((perk, i) => (
                        <div
                            key={i}
                            className='flex items-center gap-2 bg-neutral-100 dark:bg-white/5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/5'
                        >
                            <span className='text-primary'>{perk.icon}</span>
                            {perk.text}
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-wrap justify-center gap-6 max-w-6xl px-4'>
                {subs
                    .sort((a, b) => a.duration - b.duration)
                    .map((sub) => (
                        <ProductCard
                            key={sub._id}
                            _id={sub._id}
                            duration={sub.duration}
                            price={sub.price}
                            original={sub.original * sale}
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
    const hasDiscount = original > price;

    return (
        <div
            className='group relative flex flex-col items-center w-[280px] bg-white/50 dark:bg-neutral-900/40 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-white/5 hover:border-primary/50 transition-all duration-300 hover:translate-y-[-4px]'
            onClick={() =>
                (location.href = `/shop/products/subscriptions/${_id}`)
            }
        >
            <div className='relative mb-4 transition-transform duration-500 group-hover:scale-110'>
                <Image
                    src='/shop/subs/sub.svg'
                    alt={_id}
                    width={80}
                    height={80}
                    draggable={false}
                    className='h-[90px] w-auto drop-shadow-lg'
                />
            </div>

            <div className='flex flex-col items-center space-y-1 w-full'>
                <span className='text-lg font-black uppercase italic tracking-tight'>
                    {label}
                </span>

                <div className='flex flex-col items-center pb-6'>
                    <span className='text-3xl font-black tracking-tighter'>
                        €{price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                        <span className='text-sm line-through decoration-red-500/60 decoration-2 italic font-medium'>
                            €{original.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className='w-full pt-4 border-t border-neutral-200 dark:border-white/5 group-hover:border-primary/20 transition-colors'>
                    <Button
                        variant='ghost'
                        className='w-full font-black uppercase italic text-xs gap-2 group-hover:!bg-primary group-hover:!text-black cursor-pointer'
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
