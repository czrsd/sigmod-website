'use client';
import { Button } from '@/components/ui/button';
import { FullBundle } from '@/types/shopTypes';
import { formatNumber } from '@/utils/format';
import { Plus, Sparkles, Flame, TrendingUp, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SpecialBundles({
    bundles,
    sale,
}: {
    bundles: FullBundle[];
    sale: number;
}) {
    const t = useTranslations('Shop.MainPage.SpecialBundles');
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const colorSchemes = [
        {
            primary: '#FFD900',
            secondary: '#B77100',
            glow: 'rgba(255, 217, 0, 0.3)',
            label: t('labels.flash'),
            icon: <Zap size={12} fill='black' />,
        },
        {
            primary: '#44FF00',
            secondary: '#086200',
            glow: 'rgba(68, 255, 0, 0.3)',
            label: t('labels.popular'),
            icon: <Flame size={12} fill='black' />,
        },
        {
            primary: '#0095FF',
            secondary: '#0018B7',
            glow: 'rgba(0, 149, 255, 0.3)',
            label: t('labels.ultimate'),
            icon: <TrendingUp size={12} />,
        },
    ];

    return (
        <div className='flex justify-center items-center gap-10 flex-wrap py-12'>
            {bundles.map((bundle, i) => {
                const scheme = colorSchemes[i % colorSchemes.length];
                const isLight = resolvedTheme === 'light';

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
                        className='relative group flex flex-col items-center rounded-[2rem] border transition-all duration-500 hover:-translate-y-3 min-w-[340px]'
                        style={{
                            borderColor: isLight
                                ? 'rgba(0,0,0,0.1)'
                                : 'rgba(255,255,255,0.1)',
                            boxShadow: `0 20px 50px -15px ${scheme.glow}, inset 0 0 20px rgba(255,255,255,0.05)`,
                            background: isLight
                                ? 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))'
                                : 'linear-gradient(135deg, rgba(20,20,20,0.8), rgba(0,0,0,0.6))',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <div className='absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]'>
                            <div className='absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine' />
                        </div>

                        <div
                            className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1 px-4 py-1.5 rounded-full text-black font-black text-[10px] uppercase tracking-widest shadow-xl border border-white/20'
                            style={{ background: scheme.primary }}
                        >
                            {scheme.icon}
                            {scheme.label}
                        </div>

                        <div className='absolute top-4 right-4 z-10'>
                            <div className='bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md'>
                                {t('save', { percent: savings })}
                            </div>
                        </div>

                        <div className='w-full pt-8 pb-4 text-center'>
                            <h3
                                className='text-3xl font-black uppercase italic tracking-tighter'
                                style={{
                                    color: scheme.primary,
                                    textShadow: `0 0 15px ${scheme.glow}`,
                                }}
                            >
                                {bundle.name}
                            </h3>
                        </div>

                        <div className='flex flex-col items-center p-8 w-full space-y-8'>
                            <div className='flex justify-center items-center gap-6 relative'>
                                <div
                                    className='absolute inset-0 blur-3xl opacity-20 scale-150'
                                    style={{ background: scheme.primary }}
                                />

                                <div className='flex flex-col items-center animate-float relative z-10'>
                                    <Image
                                        src={`/shop/coins/coins${bundle.coins}.svg`}
                                        alt='Coins'
                                        width={85}
                                        height={85}
                                        className='drop-shadow-2xl'
                                    />
                                    <span className='text-xs font-black mt-2 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-md'>
                                        {formatNumber(bundle.coins)}{' '}
                                        {t('coins')}
                                    </span>
                                </div>

                                <Plus
                                    size={24}
                                    className='text-white/20 font-black'
                                />

                                <div className='flex flex-col items-center animate-float-delayed relative z-10'>
                                    <Image
                                        src={`/shop/subs/sub.svg`}
                                        alt='Sub'
                                        width={60}
                                        height={60}
                                        className='drop-shadow-2xl'
                                    />
                                    <span className='text-xs font-black mt-2 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-md'>
                                        {bundle.subscription}{' '}
                                        {bundle.subscription === 1
                                            ? t('month')
                                            : t('months')}
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-col items-center bg-white/5 dark:bg-black/40 w-full py-5 rounded-2xl border border-white/5 shadow-inner'>
                                <div className='relative mb-1'>
                                    <span className='text-sm opacity-40 line-through decoration-red-500/80 decoration-2 italic'>
                                        €{originalCosts}
                                    </span>
                                </div>
                                <div className='flex items-baseline gap-1'>
                                    <span
                                        className='text-4xl font-black tracking-tighter'
                                        style={{
                                            background: `linear-gradient(to bottom, #fff, ${scheme.primary})`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            WebkitTextStroke: isLight
                                                ? '1px rgba(0,0,0,0.1)'
                                                : 'none',
                                            filter: `drop-shadow(0 0 20px ${scheme.glow})`,
                                        }}
                                    >
                                        €{bundle.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className='w-full relative group/btn'>
                                <div
                                    className='absolute -inset-0.5 rounded-xl blur opacity-30 group-hover/btn:opacity-100 transition duration-500'
                                    style={{ background: scheme.primary }}
                                />
                                <Button
                                    asChild
                                    className='relative w-full h-14 uppercase font-black text-lg transition-all active:scale-95 rounded-xl border-t border-white/20'
                                    style={{
                                        background: `linear-gradient(180deg, ${scheme.primary}, ${scheme.secondary})`,
                                        color: '#000',
                                        boxShadow: `0 4px 15px rgba(0,0,0,0.3)`,
                                    }}
                                >
                                    <Link
                                        href={`/shop/products/bundles/${bundle._id}`}
                                    >
                                        <div className='flex items-center gap-2'>
                                            {t('buyNow')}
                                            <Sparkles size={18} fill='black' />
                                        </div>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            })}

            <style jsx global>{`
                @keyframes shine {
                    100% {
                        left: 125%;
                    }
                }
                .animate-shine {
                    animation: shine 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-12px) rotate(2deg);
                    }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float 4s ease-in-out infinite 0.5s;
                }
            `}</style>
        </div>
    );
}
