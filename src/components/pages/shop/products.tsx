'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function ProductList() {
    const t = useTranslations('Shop.MainPage.Products');
    return (
        <div className='flex flex-col items-center space-y-10'>
            <h2 className='text-4xl font-bold'>{t('title')}</h2>
            <div className='flex justify-center flex-wrap gap-6'>
                <ProductCard
                    name={t('coins.name')}
                    description={t('coins.description')}
                    img='/shop/coins.png'
                    link='/shop/products/coins'
                />
                <ProductCard
                    name={t('subscriptions.name')}
                    description={t('subscriptions.description')}
                    img='/shop/subs.png'
                    link='/shop/products/subscriptions'
                />
                <ProductCard
                    name={t('bundles.name')}
                    description={t('bundles.description')}
                    img='/shop/bundles.png'
                    link='/shop/products/bundles'
                />
            </div>
        </div>
    );
}

function ProductCard({
    name,
    description,
    img,
    link,
}: {
    name: string;
    description: string;
    img: string;
    link: string;
}): React.ReactElement {
    return (
        <div
            className='flex flex-col items-center justify-center gap-4 w-[300px] bg-neutral-900 rounded-lg p-10 cursor-pointer border hover:scale-101'
            onClick={() => {
                location.href = link;
            }}
        >
            <img
                src={img}
                alt={name}
                width={100}
                height={100}
                draggable={false}
            />
            <div className='flex flex-col items-center'>
                <span className='text-xl font-bold'>{name}</span>
                <p className='text-sm text-neutral-400'>{description}</p>
            </div>
        </div>
    );
}
