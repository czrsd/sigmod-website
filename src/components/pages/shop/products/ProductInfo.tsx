import Image from 'next/image';
import { formatNumber } from '@/utils/format';
import { CoinPackage, SubPackage, Bundle } from '@/types/shopTypes';

type ProductItem = CoinPackage | SubPackage | Bundle;

export default function ProductInfo({ item }: { item: ProductItem }) {
    const isCoin = (i: ProductItem): i is CoinPackage => 'amount' in i;
    const isSub = (i: ProductItem): i is SubPackage =>
        'duration' in i && !('coins' in i);
    const isBundle = (i: ProductItem): i is Bundle =>
        'coins' in i && 'subscription' in i;

    const title = isCoin(item)
        ? `${formatNumber(item.amount)} Coins`
        : isSub(item)
        ? `${item.duration} ${
              item.duration === 1 ? 'Month' : 'Months'
          } Subscription`
        : item.name;

    const image = isCoin(item)
        ? `/shop/coins/gold_50000.png`
        : isSub(item)
        ? '/shop/subscriptions/subscription.png'
        : '/shop/bundles.png';

    return (
        <div className='flex flex-col gap-6 w-full lg:w-1/2'>
            <Image
                src={image}
                alt={item._id || 'Item'}
                width={260}
                height={260}
                draggable={false}
                className='rounded-xl'
            />
            <h1 className='text-3xl font-bold'>{title}</h1>
            {isBundle(item) ? (
                <p>{`${formatNumber(item.coins)} Coins + ${item.subscription} ${
                    item.subscription === 1 ? 'Month' : 'Months'
                } Subscription`}</p>
            ) : (
                <></>
            )}
            <div className='flex flex-col'>
                <span className='text-4xl font-semibold text-primary'>
                    €{'price' in item ? item.price : 0}
                </span>
                {'original' in item && item.original && (
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
