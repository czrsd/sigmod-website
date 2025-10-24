'use client';

import { captureOrder } from '@/services/shop';
import { CaptureOrderResponse, Bundle, CoinPackage } from '@/types/shopTypes';
import { CheckCircle, Coins, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSpring, animated } from '@react-spring/web';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PurchaseCompleted() {
    const [order, setOrder] = useState<CaptureOrderResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';
    const payerID = searchParams.get('PayerID') || '';

    const previousGold = order?.userData?.previousGold || 0;
    const currentGold = order?.userData?.gold || 0;

    const goldSpring = useSpring({
        from: { value: previousGold },
        to: { value: currentGold },
        config: { tension: 100, friction: 60 },
    });

    useEffect(() => {
        if (token && payerID) {
            setLoading(true);
            captureOrder(token, payerID)
                .then((res) => {
                    if (res) {
                        setOrder(res);

                        if (res.success && res.userData) {
                            localStorage.setItem('email', res.userData.email);
                        }
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [token, payerID]);

    const subscriptionDate = order?.userData?.subscription
        ? new Date(order.userData.subscription).toLocaleDateString('de-DE')
        : null;

    const { width, height } = useWindowSize();

    if (loading)
        return (
            <div className='flex flex-col items-center justify-center py-20'>
                <div className='animate-spin mb-6 w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full'></div>
                <span className='text-xl font-semibold'>
                    Completing your purchase...
                </span>
            </div>
        );

    if (!order)
        return (
            <div className='flex flex-col items-center py-10'>
                <span className='text-red-500 text-xl font-semibold'>
                    Failed to capture order.
                </span>
            </div>
        );

    if (!order.success)
        return (
            <div className='flex flex-col items-center py-10'>
                <span className='text-red-500 text-xl font-semibold'>
                    Purchase failed. Please contact the support on Discord.
                </span>
            </div>
        );

    const productLabels: Record<CaptureOrderResponse['productType'], string> = {
        bundle: (order.product as Bundle).name,
        coins: 'Coins',
        subscription: 'Subscription',
    };

    return (
        <div className='flex flex-col items-center py-10'>
            <Confetti
                width={width}
                height={height}
                numberOfPieces={200}
                recycle={false}
            />
            <div className='flex flex-col items-center animate-fade-in'>
                <CheckCircle size={120} color='#5ace5aff' />
                <span className='text-3xl font-bold uppercase mt-4 text-green-500 drop-shadow-lg'>
                    Purchase Complete!
                </span>
            </div>

            <span className='text-2xl font-semibold mt-5'>
                {productLabels[order.productType]}
            </span>

            <p className='mt-6 text-xl text-center'>Thanks for your order!</p>

            <p className='mt-1 text-sm text-neutral-400 text-center'>
                Order id: {order.orderId}
            </p>

            <div className='mt-6 flex flex-col items-center gap-4 dark:bg-neutral-900 rounded-xl border py-4 px-6 shadow-lg animate-fade-in-up'>
                <img
                    className='rounded-full w-28 h-28 border shadow-lg'
                    src={order.userData?.imageURL || ''}
                    alt='User'
                />
                <span className='font-bold text-2xl'>
                    {order.userData?.fullName}
                </span>

                {(order.productType === 'coins' ||
                    order.productType === 'bundle') && (
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2 text-xl font-semibold mt-2'>
                            <animated.span className='text-yellow-400'>
                                {goldSpring.value.to((val) => Math.floor(val))}
                            </animated.span>
                            <Coins size={24} className='text-yellow-400' />
                        </div>
                        {order.userData?.gold != null &&
                            order.userData?.previousGold != null && (
                                <span className='flex items-center gap-1 text-sm text-green-300'>
                                    +
                                    {order.userData.gold -
                                        order.userData.previousGold}{' '}
                                    Coins
                                </span>
                            )}
                    </div>
                )}

                {(order.productType === 'subscription' ||
                    order.productType === 'bundle') &&
                    subscriptionDate && (
                        <div className='flex items-center gap-2 text-sm text-gray-300 mt-1'>
                            <Crown size={20} className='text-yellow-400' />
                            <span>
                                Subscription valid until {subscriptionDate}
                            </span>
                        </div>
                    )}
            </div>
            <div className='mt-6 flex gap-4'>
                <Button>
                    <Link href={'/game'}>Go to Game</Link>
                </Button>
                <Button variant={'outline'}>
                    <Link href={'/shop'}>Shop more</Link>
                </Button>
            </div>
        </div>
    );
}
