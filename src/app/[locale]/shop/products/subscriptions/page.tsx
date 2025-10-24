'use client';

import { useEffect, useState } from 'react';
import { getAllSubPackages } from '@/services/shop';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SubPackage } from '@/types/shopTypes';
import { getSale } from '@/services/shop';

export default function SubscriptionPackages() {
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
            <h1 className='text-3xl font-bold'>Subscription Packages</h1>

            <div className='flex flex-wrap justify-center gap-6 max-w-4xl'>
                {subs.map((coin, i) => (
                    <ProductCard
                        key={i}
                        _id={coin._id}
                        duration={coin.duration}
                        price={coin.price}
                        original={coin.original * sale}
                        sale={sale}
                        img='/shop/subscriptions/subscription.png'
                    />
                ))}
            </div>

            <div className='flex flex-col items-center space-y-3 pt-6'>
                <p className='text-sm text-neutral-400'>
                    Want to save even more? Check out our bundles.
                </p>
                <Button asChild variant='outline' className='font-semibold'>
                    <Link href='/shop/products/bundles'>View Bundles</Link>
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
    sale,
    img,
}: {
    _id: string;
    duration: number;
    price: number;
    original: number;
    sale: number;
    img: string;
}) {
    return (
        <div
            className='flex flex-col items-center gap-4 min-w-[250px] bg-neutral-900 rounded-xl p-8 border border-neutral-800 hover:scale-103 transition-transform'
            onClick={() =>
                (location.href = `/shop/products/subscriptions/${_id}`)
            }
        >
            <img
                src={img}
                alt={_id}
                width={100}
                height={100}
                draggable={false}
            />
            <div className='flex flex-col items-center'>
                <span className='text-lg font-semibold'>
                    {duration} {duration === 1 ? 'month' : 'months'}
                </span>
                <span className='text-2xl font-bold text-white'>
                    €{price.toFixed(2)}
                </span>
                <span className='relative text-neutral-500 text-sm'>
                    <span className='before:content-[""] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1px] before:bg-red-500 before:-rotate-[10deg] before:translate-y-[-50%] inline-block'>
                        €{original.toFixed(2)}
                    </span>
                </span>
            </div>
            <Button variant='secondary' className='w-full font-semibold'>
                Buy now
            </Button>
        </div>
    );
}
