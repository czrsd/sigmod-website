'use client';

import { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { cancelOrder } from '@/services/shop';

export default function PurchaseCanceled() {
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const token = searchParams.get('token') || '';

    useEffect(() => {
        if (token) {
            setLoading(true);
            cancelOrder(token).finally(() => setLoading(false));
        }
    }, [token]);

    if (!token) return redirect('/shop');

    if (loading)
        return (
            <div className='flex flex-col items-center justify-center py-20'>
                <div className='animate-spin mb-6 w-16 h-16 border-4 border-neutral-400 border-t-transparent rounded-full'></div>
                <span className='text-xl font-semibold'>Loading...</span>
            </div>
        );

    return (
        <div className='flex flex-col items-center text-center py-16 px-4 animate-fade-in'>
            <XCircle size={120} className='text-red-500 drop-shadow-lg' />
            <span className='text-3xl font-bold uppercase mt-4'>
                Purchase Canceled
            </span>
            <span className='mt-2 text-sm text-neutral-400'>
                Order ID: {token}
            </span>

            <hr className='w-1/2 lg:w-1/3 my-5' />

            <p className='text-neutral-300'>No payment was processed.</p>
            <p className='text-neutral-500 text-sm mt-1'>
                If this was a mistake or you had trouble completing your
                purchase, please contact our support.
            </p>

            <div className='flex gap-4 mt-8'>
                <Button asChild>
                    <Link href='/shop'>Return to Shop</Link>
                </Button>
                <Button asChild variant='outline'>
                    <Link href='/game'>Back to Game</Link>
                </Button>
            </div>

            <div className='mt-6 text-sm text-neutral-500'>
                Need help?{' '}
                <Link
                    href='https://dsc.gg/sigmodz'
                    className='text-blue-400 hover:underline'
                    target='_blank'
                >
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
