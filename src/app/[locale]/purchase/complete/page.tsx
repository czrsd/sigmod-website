'use client';

import { getOrderStatus } from '@/services/shop';
import { OrderStatusResponse, Bundle } from '@/types/shopTypes';
import { CheckCircle, Coins, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSpring, animated } from '@react-spring/web';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function PurchaseCompleted() {
    const t = useTranslations('Shop.Purchase.Complete');
    const [order, setOrder] = useState<OrderStatusResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    const previousGold = order?.userData?.previousGold || 0;
    const currentGold = order?.userData?.gold || 0;

    const goldSpring = useSpring({
        from: { value: previousGold },
        to: { value: currentGold },
        config: { tension: 100, friction: 60 },
    });

    useEffect(() => {
        if (!token) return;

        const interval = setInterval(async () => {
            try {
                const res = await getOrderStatus(token);
                if (res?.success) {
                    setOrder(res);

                    if (res.status === 'completed') {
                        localStorage.setItem(
                            'email',
                            res.userData?.email || ''
                        );
                        clearInterval(interval);
                        setLoading(false);
                    } else {
                        setLoading(true);
                    }
                } else {
                    setLoading(false);
                }
            } catch {
                setLoading(false);
            }
        }, 2500);

        (async () => {
            try {
                const res = await getOrderStatus(token);
                if (res?.success) setOrder(res);
            } catch {}
        })();

        return () => clearInterval(interval);
    }, [token]);

    const subscriptionDate = order?.userData?.subscription
        ? new Date(order.userData.subscription).toLocaleDateString('de-DE')
        : null;

    const { width, height } = useWindowSize();

    if (loading)
        return (
            <div className='flex flex-col items-center justify-center py-20'>
                <div className='animate-spin mb-6 w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full'></div>
                <span className='text-xl font-semibold'>
                    {order?.status === 'pending'
                        ? 'Please wait while we verify your order...'
                        : t('loading')}
                </span>
            </div>
        );

    if (!order)
        return (
            <div className='flex flex-col items-center py-10'>
                <span className='text-red-500 text-xl font-semibold'>
                    {t('failedPurchase')}
                </span>
            </div>
        );

    const productLabels: Record<OrderStatusResponse['productType'], string> = {
        bundle: (order.product as Bundle).name,
        coins: t('coinsLabel'),
        subscription: t('subscriptionLabel'),
    };

    return (
        <div className='flex flex-col items-center py-10'>
            {order.status === 'completed' && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={200}
                    recycle={false}
                />
            )}

            <div className='flex flex-col items-center animate-fade-in'>
                <CheckCircle
                    size={120}
                    color={
                        order.status === 'completed' ? '#5ace5aff' : '#cccccc'
                    }
                />
                <span className='text-3xl font-bold uppercase mt-4 text-green-500 drop-shadow-lg'>
                    {order.status === 'completed'
                        ? t('purchaseComplete')
                        : 'Order is being verified'}
                </span>
            </div>

            <span className='text-2xl font-semibold mt-5'>
                {productLabels[order.productType]}
            </span>

            <p className='mt-6 text-xl text-center'>{t('thanks')}</p>
            <p className='mt-1 text-sm text-neutral-400 text-center'>
                {t('orderId', { id: order.orderId })}
            </p>

            {order.status === 'completed' && (
                <div className='mt-6 flex flex-col items-center gap-4 dark:bg-neutral-900 rounded-xl border py-4 px-6 shadow-lg animate-fade-in-up'>
                    <Image
                        className='rounded-full w-28 h-28 border shadow-lg'
                        src={order.userData?.imageURL || ''}
                        width={112}
                        height={112}
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
                                    {goldSpring.value.to((val) =>
                                        Math.floor(val)
                                    )}
                                </animated.span>
                                <Coins size={24} className='text-yellow-400' />
                            </div>
                            {order.userData?.gold != null &&
                                order.userData?.previousGold != null && (
                                    <span className='flex items-center gap-1 text-sm text-green-300'>
                                        +
                                        {order.userData.gold -
                                            order.userData.previousGold}{' '}
                                        {t('coinsLabel')}
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
                                    {t('subscriptionValidUntil', {
                                        date: subscriptionDate,
                                    })}
                                </span>
                            </div>
                        )}
                </div>
            )}

            <div className='mt-6 flex gap-4'>
                <Button>
                    <Link href={'/game'}>{t('goToGame')}</Link>
                </Button>
                <Button variant={'outline'}>
                    <Link href={'/shop'}>{t('shopMore')}</Link>
                </Button>
            </div>
        </div>
    );
}
