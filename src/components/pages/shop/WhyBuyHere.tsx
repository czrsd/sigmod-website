import { JSX } from 'react';
import { Zap, Lock, Handshake, HandCoins } from 'lucide-react';

export default function WhyBuyHere(): JSX.Element {
    return (
        <div className='flex flex-col items-center space-y-10'>
            <h2 className='text-4xl font-bold'>Why Buy Here</h2>
            <div className='grid md:grid-cols-2 gap-5'>
                <ReasonCard
                    title='Fast Delivery'
                    description='Get your items instantly after payment with no waiting time.'
                    Icon={Zap}
                />
                <ReasonCard
                    title='Secure Checkout'
                    description='All payments are encrypted and processed through trusted providers like PayPal.'
                    Icon={Lock}
                />
                <ReasonCard
                    title='Trust'
                    description='Made by a verified Sigmally moderator and the creator of SigMod with over 28,000 installs.'
                    Icon={Handshake}
                />
                <ReasonCard
                    title='Cheap'
                    description='Enjoy fair pricing and great value without any hidden costs.'
                    Icon={HandCoins}
                />
            </div>
        </div>
    );
}

function ReasonCard({
    title,
    description,
    Icon,
}: {
    title: string;
    description: string;
    Icon: React.ComponentType<{
        className?: string;
        style?: React.CSSProperties;
    }>;
}): JSX.Element {
    return (
        <div className='flex flex-col items-center justify-center gap-4 min-w-[250px] max-w-[300px] bg-neutral-900 rounded-lg p-10 border hover:-rotate-2 hover:scale-101 transition-all duration-100'>
            <div className='relative flex justify-center items-center py-2'>
                <svg width='0' height='0'>
                    <defs>
                        <linearGradient
                            id='blue_gradient'
                            x1='0'
                            y1='0'
                            x2='24'
                            y2='24'
                            gradientUnits='userSpaceOnUse'
                        >
                            <stop offset='0%' stopColor='#9127F5' />
                            <stop offset='100%' stopColor='#2765F5' />
                        </linearGradient>
                    </defs>
                </svg>

                <Icon
                    className='w-20 h-20'
                    style={{ stroke: 'url(#blue_gradient)' }}
                />
            </div>
            <div>
                <span className='text-lg font-bold'>{title}</span>
                <p className='text-sm text-neutral-500'>{description}</p>
            </div>
        </div>
    );
}
