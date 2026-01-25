'use client';

import Image from 'next/image';
import { formatNumber } from '@/utils/format';
import {
    CoinPackage,
    SubPackage,
    Bundle,
    Boost,
    Skin,
} from '@/types/shopTypes';
import { useTranslations } from 'next-intl';

type ProductItem = CoinPackage | SubPackage | Bundle | Boost | Skin;

export default function ProductInfo({ item }: { item: ProductItem }) {
    const t = useTranslations('Shop.MainPage.SpecialBundles');

    const isCoin = (i: ProductItem): i is CoinPackage => 'amount' in i;
    const isSub = (i: ProductItem): i is SubPackage =>
        'duration' in i && !('coins' in i);
    const isBundle = (i: ProductItem): i is Bundle =>
        'coins' in i && 'subscription' in i;

    const isSkin = (i: ProductItem): i is Skin => 'skinId' in i;
    const isBoost = (i: ProductItem): i is Boost => 'hours' in i;

    const title = isCoin(item)
        ? `${formatNumber(item.amount)} ${t('coins')}`
        : isSub(item)
        ? `${item.duration} ${
              item.duration === 1 ? t('month') : t('months')
          } Subscription`
        : isBoost(item)
        ? `${item.hours}h XP Boost`
        : item.name;

    const image = isCoin(item)
        ? `/shop/coins/coins${item.amount}.svg`
        : isSub(item)
        ? '/shop/subs/sub.svg'
        : isSkin(item)
        ? `https://sigmally.com/static/skins/${item.name}.png`
        : isBoost(item)
        ? `/shop/boosts/boost_${item.hours}.svg`
        : item.isLimited
        ? '/shop/bundles/Starter 2.svg'
        : `/shop/bundles/${item.name}.svg`;

    return (
        <div className='flex flex-col gap-6 w-full lg:w-1/2'>
            <div className='relative overflow-hidden rounded-xl bg-neutral-900/50 pr-4'>
                <Image
                    src={image}
                    alt={item._id || 'Item'}
                    width={160}
                    height={160}
                    draggable={false}
                    className='rounded-xl object-contain'
                />
            </div>

            <div className='flex flex-col gap-1'>
                {isSkin(item) && (
                    <span
                        className={`text-xs font-bold uppercase tracking-wider rarity-${item.rarity}`}
                    >
                        {item.rarity} Skin
                    </span>
                )}
                <h1 className='text-3xl font-bold'>{title}</h1>
            </div>

            {isBundle(item) && (
                <p className='text-neutral-400'>
                    {`${formatNumber(item.coins)} ${t('coins')} + ${
                        item.subscription
                    } ${
                        item.subscription === 1 ? t('month') : t('months')
                    } Subscription`}
                </p>
            )}

            <div className='flex flex-col'>
                <span className='text-4xl font-semibold text-primary'>
                    €{'price' in item ? item.price : 0}
                </span>

                {'original' in item &&
                    item.original &&
                    item.original > item.price && (
                        <span className='relative inline-block text-neutral-400 text-lg'>
                            <span className='relative'>
                                <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1.5px] before:bg-red-500 before:-rotate-[12deg] before:translate-y-[-50%] inline-block">
                                    €{item.original}
                                </span>
                            </span>
                        </span>
                    )}
            </div>
        </div>
    );
}
