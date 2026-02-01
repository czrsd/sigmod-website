'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ProductList() {
    const t = useTranslations('Shop.MainPage.Products');
    return (
        <div className='flex flex-col items-center space-y-10'>
            <div className='text-center space-y-2'>
                <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h2>
                <div className='h-1 w-20 bg-primary mx-auto rounded-full' />
            </div>
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
    const t = useTranslations('Shop.MainPage.Products');
    return (
        <div
            className='group relative flex flex-col items-center justify-center gap-6 w-[300px] h-[320px] 
                       bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md 
                       rounded-2xl p-8 cursor-pointer border border-black/20 dark:border-white/20 dark:border-white/5 
                       transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]'
            onClick={() => {
                location.href = link;
            }}
        >
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

            <div className='relative z-10 transition-transform duration-500 group-hover:scale-110'>
                <Image
                    src={img}
                    alt={name}
                    width={110}
                    height={110}
                    draggable={false}
                    className={`${
                        roundImage ? 'rounded-full' : ''
                    } drop-shadow-xl`}
                />
            </div>

            <div className='relative z-10 flex flex-col items-center text-center space-y-2'>
                <span className='text-2xl font-black tracking-tight text-neutral-800 dark:text-neutral-100'>
                    {name}
                </span>
                <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2'>
                    {description}
                </p>
            </div>

            <div className='relative z-10 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-primary'>
                    {t('view')}
                </span>
            </div>
        </div>
    );
}
