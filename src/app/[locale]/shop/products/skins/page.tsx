'use client';

import { useEffect, useState } from 'react';
import { getAllSkins, getSale } from '@/services/shop';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skin } from '@/types/shopTypes';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type Translate = ReturnType<typeof useTranslations>;

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

const cardRarityClasses: Record<Rarity, string> = {
    common: `
    bg-blue-50/50 border-blue-200 
    dark:bg-blue-950/20 dark:border-blue-800/50 
    dark:bg-gradient-to-b dark:from-blue-900/10 dark:to-transparent
  `,
    rare: `
    bg-orange-50/50 border-orange-200 
    dark:bg-orange-950/20 dark:border-orange-800/50 
    dark:bg-gradient-to-b dark:from-orange-900/10 dark:to-transparent
  `,
    epic: `
    bg-purple-50/50 border-purple-200 
    dark:bg-purple-950/20 dark:border-purple-800/50 
    dark:bg-gradient-to-b dark:from-purple-900/10 dark:to-transparent
  `,
    legendary: `
    bg-gray-100/50 border-gray-300 
    dark:bg-zinc-900/40 dark:border-zinc-700/50 
    dark:bg-gradient-to-b dark:from-zinc-800/20 dark:to-transparent
  `,
};

export default function SkinsProducts() {
    const t = useTranslations('Shop.Products.Skins');
    const [skins, setSkins] = useState<Skin[]>([]);
    const [sale, setSale] = useState(1);

    useEffect(() => {
        getAllSkins().then((res) => {
            if (res) setSkins(res);
        });
        getSale().then((s) => {
            if (s) setSale(s);
        });
    }, []);

    return (
        <section className='flex flex-col items-center text-center space-y-8'>
            <h1 className='text-4xl font-black uppercase italic tracking-tighter'>
                {t('title')}
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full'>
                {skins.map((skin, i) => (
                    <ProductCard key={i} skin={skin} t={t} />
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

function ProductCard({ skin, t }: { skin: Skin; t: Translate }) {
    const rarityCardStyles =
        cardRarityClasses[skin.rarity] || cardRarityClasses.common;

    return (
        <div
            className={`
                flex flex-col items-center gap-4 min-w-[250px] 
                rounded-xl p-8 border backdrop-blur-sm
                hover:scale-103 transition-all duration-300 cursor-pointer
                ${rarityCardStyles}
            `}
            onClick={() => (location.href = `/shop/products/skins/${skin._id}`)}
        >
            <Image
                src={`https://sigmally.com/static/skins/${skin.name}.png`}
                alt={skin.name}
                width={100}
                height={100}
                draggable={false}
                className={`
                    w-[100px] h-[100px] 
                    rounded-full 
                    bg-gradient-to-b  
                    border-2 border-white/10 dark:border-white/5
                    shadow-sm
                    transition-all duration-300
                `}
            />
            <div className='flex flex-col items-center'>
                <span className='text-lg font-semibold'>{skin.name}</span>
                <span className='text-2xl font-bold'>
                    {t('price', { price: skin.price.toFixed(2) })}
                </span>
            </div>
            <Button variant='outline' className='w-full font-semibold'>
                {t('buyNow')}
            </Button>
        </div>
    );
}
