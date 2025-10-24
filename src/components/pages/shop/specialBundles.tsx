import { Button } from '@/components/ui/button';
import { FullBundle } from '@/types/shopTypes';
import { formatNumber } from '@/utils/format';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const colorSchemes = [
    { primary: '#FFD900', secondary: '#B77100' },
    { primary: '#44FF00', secondary: '#086200' },
    { primary: '#0095FF', secondary: '#0018B7' },
];

export default function SpecialBundles({
    bundles,
    sale,
}: {
    bundles: FullBundle[];
    sale: number;
}) {
    return (
        <div className='flex justify-center items-center gap-6 flex-wrap'>
            {bundles.map((bundle, i) => {
                const { primary, secondary } =
                    colorSchemes[i % colorSchemes.length];

                const originalCosts = (
                    bundle.coinPackage.original * sale +
                    bundle.subPackage.original * sale
                ).toFixed(2);

                const difference = Number(originalCosts) - bundle.price;
                const savings = (
                    (difference / Number(originalCosts)) *
                    100
                ).toFixed();

                return (
                    <div
                        key={i}
                        style={{ borderColor: primary }}
                        className='flex flex-col items-center rounded-xl bg-black border py-0 min-w-[300px] shadow-[2px_0_10px_10px_rgba(0,0,0,0.6)] overflow-hidden hover:scale-102 transition-all duration-100'
                    >
                        <div
                            style={{ borderBottom: `1px solid ${primary}` }}
                            className='w-full py-2 text-center'
                        >
                            <span className='text-lg font-bold uppercase tracking-wide'>
                                {bundle.name}
                            </span>
                        </div>
                        <div className='flex flex-col items-center py-4 space-y-2'>
                            <div className='flex justify-center items-center gap-5 py-10'>
                                <div className='flex flex-col items-center'>
                                    <img
                                        src={`/shop/coins/gold_${bundle.coins}.png`}
                                        width={60}
                                    />
                                    <span className='text-sm'>
                                        {formatNumber(bundle.coins)} Coins
                                    </span>
                                </div>
                                <Plus size={20} />
                                <div className='flex flex-col items-center'>
                                    <img
                                        src={`/shop/subscriptions/subscription.png`}
                                        width={40}
                                    />
                                    <span className='max-w-[80px] text-sm'>
                                        {bundle.subscription}{' '}
                                        {bundle.subscription === 1
                                            ? 'month'
                                            : 'months'}{' '}
                                        subcription
                                    </span>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex flex-col'>
                                    <div className='relative inline-block'>
                                        <span className='relative'>
                                            <span className='before:content-[""] before:absolute before:left-0 before:top-1/2 before:w-full before:h-[1.5px] before:bg-red-500 before:-rotate-[12deg] before:translate-y-[-50%] inline-block'>
                                                €{originalCosts}
                                            </span>
                                        </span>
                                    </div>
                                    <span
                                        style={{
                                            background: `linear-gradient(to bottom, ${primary}, ${secondary})`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                        className='text-3xl font-bold'
                                    >
                                        €{bundle.price.toFixed(2)}
                                    </span>
                                </div>
                                <span className='text-xs text-neutral-400'>
                                    save {savings}%
                                </span>
                            </div>
                            <Button
                                asChild
                                className='w-full uppercase font-bold'
                            >
                                <Link
                                    href={`/shop/products/bundles/${bundle._id}`}
                                >
                                    Buy now
                                </Link>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
