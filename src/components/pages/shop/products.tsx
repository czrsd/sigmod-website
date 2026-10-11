'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';

export default function ProductList() {
    const t = useTranslations('Shop.MainPage.Products');
    return (
        <section className='flex flex-col items-center space-y-10 w-full max-w-5xl mx-auto'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground'>
                    {t('title')}
                </h2>
                <p className='text-sm text-neutral-500 max-w-md mx-auto'>
                    Choose from game coins, VIP subscriptions, and curated special bundles.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4'>
                <ProductCard
                    name={t('coins.name')}
                    description={t('coins.description')}
                    img='/shop/products/coins.png'
                    link='/shop/products/coins'
                />
                <ProductCard
                    name={t('subscriptions.name')}
                    description={t('subscriptions.description')}
                    img='/shop/products/subs.png'
                    link='/shop/products/subscriptions'
                />
                <ProductCard
                    name={t('bundles.name')}
                    description={t('bundles.description')}
                    img='/shop/products/bundles.png'
                    link='/shop/products/bundles'
                />
            </div>
        </section>
    );
}

function ProductCard({
    name,
    description,
    img,
    link,
    roundImage = false,
}: {
    name: string;
    description: string;
    img: string;
    link: string;
    roundImage?: boolean;
}): React.ReactElement {
    const t = useTranslations('Shop.MainPage.Products');
    return (
        <Link
            href={link}
            className='group flex flex-col justify-between items-center text-center p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-200'
        >
            <div className='relative mb-6 transition-transform duration-300 group-hover:scale-105'>
                <Image
                    src={img}
                    alt={name}
                    width={96}
                    height={96}
                    draggable={false}
                    className={`${roundImage ? 'rounded-full' : ''} drop-shadow-md`}
                />
            </div>

            <div className='space-y-2 mb-6 flex-1 flex flex-col justify-center'>
                <h3 className='text-xl font-bold tracking-tight text-foreground'>
                    {name}
                </h3>
                <p className='text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2'>
                    {description}
                </p>
            </div>

            <div className='inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-1.5 gap-1 transition-all'>
                <span>{t('view')}</span>
                <ArrowRight size={13} />
            </div>
        </Link>
    );
}
