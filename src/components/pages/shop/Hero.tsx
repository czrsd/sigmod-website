'use client';

import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

export default function Hero({
    limitedEndsAt,
}: {
    limitedEndsAt: number | null;
}) {
    const [timeLeft, setTimeLeft] = useState<string | null>(null);

    useEffect(() => {
        if (!limitedEndsAt) return;

        const calculateTimeLeft = () => {
            const now = Date.now();
            const diff = limitedEndsAt - now;
            if (diff <= 0) return '';
            const h = Math.floor(diff / 3600000)
                .toString()
                .padStart(2, '0');
            const m = Math.floor((diff % 3600000) / 60000)
                .toString()
                .padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000)
                .toString()
                .padStart(2, '0');
            return `${h}:${m}:${s}`;
        };

        setTimeLeft(calculateTimeLeft());

        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [limitedEndsAt]);

    const offerActive = timeLeft && timeLeft !== '';

    return (
        <div className='flex flex-col items-center space-y-6'>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
                Get Your <span className='text-blue-500'>Gold</span> &{' '}
                <span className='text-blue-500'>Subscriptions</span> Cheaper
            </h1>

            <p className='text-neutral-400 max-w-xl text-center'>
                Prices in-game are high, here you’ll find exclusive deals that
                won’t last forever.
            </p>

            {offerActive && (
                <div className='border border-orange-500 bg-gradient-to-b from-orange-600/10 to-yellow-500/10 text-white py-8 mb-2 px-10 rounded-2xl shadow-lg space-y-4 w-full max-w-md'>
                    <div>
                        <h2 className='text-3xl font-bold uppercase flex items-center justify-center my-3 text-orange-400'>
                            <Flame size={30} />
                            <span className='bg-gradient-to-b from-orange-500 to-orange-400 text-transparent bg-clip-text'>
                                Limited Offers
                            </span>
                        </h2>
                        <p className='text-sm opacity-90'>
                            Grab them before they’re gone!
                        </p>
                    </div>
                    <div className='flex items-center justify-center gap-3'>
                        <span className='text-sm opacity-80'>Ends in</span>
                        <span className='text-2xl font-semibold tracking-widest'>
                            {timeLeft}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
