'use client';

import { Button } from '@/components/ui/button';
import { FullBundle } from '@/types/shopTypes';
import { formatNumber } from '@/utils/format';
import { Plus, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default function SpecialBundles({
    bundles,
    sale,
}: {
    bundles: FullBundle[];
    sale: number;
}) {
    const t = useTranslations('Shop.MainPage.SpecialBundles');


    return (
        <div className='flex justify-center items-stretch gap-6 flex-wrap py-6 w-full max-w-5xl mx-auto'>
            {bundles.map((bundle, i) => {
                const isPopular = i === 1;

                const originalCosts = (
                    bundle.coinPackage.original * sale +
                    bundle.subPackage.original * sale
                ).toFixed(2);

                const savings = (
                    ((Number(originalCosts) - bundle.price) /
                        Number(originalCosts)) *
                    100
                ).toFixed();

                return (
                    <div
                        key={i}
                        className={`relative flex flex-col justify-between rounded-2xl border p-6 sm:p-8 w-full sm:w-[320px] transition-all duration-300 ${
                            isPopular
                                ? 'border-blue-500/40 bg-blue-500/[0.03] shadow-md ring-1 ring-blue-500/20'
                                : 'border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20'
                        }`}
                    >
                        {/* Top Badges */}
                        <div className='flex items-center justify-between gap-2 mb-4'>
                            {isPopular ? (
                                <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-semibold tracking-wide'>
                                    <Sparkles size={12} />
                                    {t('labels.popular')}
                                </span>
                            ) : (
                                <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-neutral-500 text-[11px] font-medium'>
                                    Bundle
                                </span>
                            )}

                            <span className='px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold'>
                                {t('save', { percent: savings })}
                            </span>
                        </div>

                        {/* Bundle Title */}
                        <div className='text-left mb-6'>
                            <h3 className='text-2xl font-bold tracking-tight text-foreground'>
                                {bundle.name}
                            </h3>
                            <p className='text-xs text-neutral-500 mt-1'>
                                Coins + VIP Subscription Package
                            </p>
                        </div>

                        {/* Bundled Content Showcase */}
                        <div className='flex items-center justify-center gap-5 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 mb-6'>
                            <div className='flex flex-col items-center gap-1.5'>
                                <Image
                                    src={`/shop/coins/coins${bundle.coins}.svg`}
                                    alt='Coins'
                                    width={64}
                                    height={64}
                                    className='drop-shadow'
                                />
                                <span className='text-xs font-semibold text-foreground'>
                                    {formatNumber(bundle.coins)} {t('coins')}
                                </span>
                            </div>

                            <Plus size={18} className='text-neutral-400 shrink-0' />

                            <div className='flex flex-col items-center gap-1.5'>
                                <Image
                                    src={`/shop/subs/sub.svg`}
                                    alt='Subscription'
                                    width={50}
                                    height={50}
                                    className='drop-shadow'
                                />
                                <span className='text-xs font-semibold text-foreground'>
                                    {bundle.subscription}{' '}
                                    {bundle.subscription === 1
                                        ? t('month')
                                        : t('months')}
                                </span>
                            </div>
                        </div>

                        {/* Price & Checkout CTA */}
                        <div className='space-y-4 pt-2'>
                            <div className='flex items-baseline justify-between'>
                                <div>
                                    <span className='text-xs text-neutral-400 line-through mr-2'>
                                        €{originalCosts}
                                    </span>
                                    <span className='text-3xl font-extrabold tracking-tight text-foreground'>
                                        €{bundle.price.toFixed(2)}
                                    </span>
                                </div>
                                <span className='text-xs text-neutral-500'>
                                    one-time
                                </span>
                            </div>

                            <Button
                                asChild
                                className={`w-full h-11 font-semibold rounded-xl transition-colors shadow-sm ${
                                    isPopular
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-foreground text-background hover:bg-foreground/90'
                                }`}
                            >
                                <Link href={`/shop/products/bundles/${bundle._id}`}>
                                    <span>{t('buyNow')}</span>
                                    <ArrowRight size={15} className='ml-1.5' />
                                </Link>
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
