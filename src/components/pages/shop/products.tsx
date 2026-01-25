'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ProductList() {
    const t = useTranslations('Shop.MainPage.Products');
    return (
        <div className='flex flex-col items-center space-y-10'>
            <h2 className='text-4xl font-bold'>{t('title')}</h2>
            <div className='flex justify-center flex-wrap gap-6 max-w-5xl'>
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
                <ProductCard
                    name={t('skins.name')}
                    description={t('skins.description')}
                    img='/shop/products/skins.png'
                    link='/shop/products/skins'
                    roundImage={true}
                />
                <ProductCard
                    name={t('boosts.name')}
                    description={t('boosts.description')}
                    img='/shop/products/boosts.png'
                    link='/shop/products/boosts'
                />
                <ProductCard
                    name={t('servers.name')}
                    description={t('servers.description')}
                    img='/shop/products/serverrack.png'
                    link='/shop/products/private-servers'
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
    roundImage = false,
}: {
    name: string;
    description: string;
    img: string;
    link: string;
    roundImage?: boolean;
}): React.ReactElement {
    return (
        <div
            className='flex flex-col items-center justify-center gap-4 w-[300px] bg-secondary dark:bg-neutral-900 rounded-lg p-10 cursor-pointer border hover:scale-101'
            onClick={() => {
                location.href = link;
            }}
        >
            <Image
                src={img}
                alt={name}
                width={100}
                height={100}
                draggable={false}
                className={roundImage ? 'rounded-full' : ''}
            />
            <div className='flex flex-col items-center'>
                <span className='text-xl font-bold'>{name}</span>
                <p className='text-sm text-neutral-400'>{description}</p>
            </div>
        </div>
    );
}
