'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Download, ExternalLink, Check, Shield } from 'lucide-react';
import { getTampermonkeyLink, detectBrowser } from '@/utils/getLink';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';

export default function UserscriptManagerPage() {
    const t = useTranslations('Guide.UserscriptManager');
    const [browser, setBrowser] = useState<string | null>(null);
    const [link, setLink] = useState<string | null>(null);

    useEffect(() => {
        setLink(getTampermonkeyLink());
        setBrowser(detectBrowser());
    }, []);

    return (
        <div className='max-w-4xl space-y-8'>
            {/* Step Header */}
            <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                    <span className='px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold'>
                        Step 1
                    </span>
                    <span className='text-xs text-neutral-400'>
                        Prerequisite
                    </span>
                </div>
                <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground'>
                    {t('title')}
                </h1>
                <p className='text-neutral-600 dark:text-neutral-400 text-base max-w-2xl leading-relaxed'>
                    {t('desc')}
                </p>
            </div>

            {/* Main Interactive Card */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch'>
                {/* Actions & Instructions */}
                <div className='lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-6'>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-base font-semibold text-foreground flex items-center gap-2'>
                                <Download size={18} className='text-blue-500' />
                                {t('recommend')}
                            </h2>
                            {browser && (
                                <span className='text-xs px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-neutral-500 capitalize'>
                                    {browser} detected
                                </span>
                            )}
                        </div>

                        <div className='flex gap-2.5'>
                            <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium'>
                                <Check size={14} />
                                Tampermonkey (Recommended)
                            </div>
                            <div className='flex items-center px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-neutral-500 text-xs font-medium'>
                                Violentmonkey
                            </div>
                        </div>

                        <p className='text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                            {t('instruction')}
                        </p>
                    </div>

                    <div className='space-y-4 pt-2'>
                        <Button
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl transition-colors shadow-sm'
                            asChild
                        >
                            <Link href={link ?? '#'} target='_blank'>
                                <ExternalLink className='mr-2 h-4 w-4' />
                                {t('button')}
                            </Link>
                        </Button>

                        <div className='p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                            {t.rich('installed', {
                                SigMod: (children) => (
                                    <span className='font-semibold text-foreground'>{children}</span>
                                ),
                                SigFixes: (children) => (
                                    <span className='font-semibold text-foreground'>{children}</span>
                                ),
                            })}
                        </div>
                    </div>
                </div>

                {/* Screenshot Visual Mockup */}
                <div className='lg:col-span-5 flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-900/60 overflow-hidden shadow-sm'>
                    <div className='px-4 py-2.5 border-b border-white/10 bg-neutral-900 flex items-center gap-2'>
                        <div className='w-2.5 h-2.5 rounded-full bg-red-500/80' />
                        <div className='w-2.5 h-2.5 rounded-full bg-yellow-500/80' />
                        <div className='w-2.5 h-2.5 rounded-full bg-green-500/80' />
                        <span className='text-[11px] text-neutral-400 ml-2 truncate'>
                            Chrome Web Store / Addons
                        </span>
                    </div>
                    <div className='flex-1 p-6 flex flex-col items-center justify-center bg-black/40'>
                        <ZoomableImage
                            src='/guide/chrome/tampermonkey.png'
                            width={320}
                            height={120}
                            alt='Install Tampermonkey'
                            className='rounded-lg shadow-md max-w-full'
                        />
                        <p className='text-[11px] text-neutral-400 mt-4 text-center'>
                            Click to zoom screenshot
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation Footer */}
            <div className='flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/10'>
                <Button
                    variant='ghost'
                    className='text-neutral-500 hover:text-foreground'
                    asChild
                >
                    <Link href='/guide'>
                        <ArrowLeft className='mr-2 h-4 w-4' /> {t('back')}
                    </Link>
                </Button>
                <Button
                    size='lg'
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-full shadow-sm'
                    asChild
                >
                    <Link
                        href={
                            browser === 'firefox' || browser === 'safari'
                                ? '/guide/sigmod'
                                : '/guide/developer-mode'
                        }
                    >
                        {t('next')} <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
