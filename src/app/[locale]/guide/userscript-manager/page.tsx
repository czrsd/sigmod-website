'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Download, ExternalLink } from 'lucide-react';
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
        <div className='max-w-4xl space-y-10'>
            <div className='space-y-4'>
                <h1 className='text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase'>
                    {t('title')}
                </h1>
                <p className='text-neutral-400 text-lg max-w-2xl'>
                    {t('desc')}
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4'>
                    <h3 className='font-bold text-white flex items-center gap-2'>
                        <Download size={18} className='text-blue-500' />
                        {t('recommend')}
                    </h3>
                    <div className='flex gap-3'>
                        <span className='px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-bold'>
                            Tampermonkey
                        </span>
                        <span className='px-3 py-1 bg-white/5 border border-white/10 text-neutral-400 rounded-lg text-xs font-bold'>
                            Violentmonkey
                        </span>
                    </div>
                    <p className='text-sm text-neutral-400'>
                        {t('instruction')}
                    </p>
                    <Button
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl'
                        asChild
                    >
                        <Link href={link ?? '#'} target='_blank'>
                            <ExternalLink className='mr-2 h-4 w-4' />{' '}
                            {t('button')}
                        </Link>
                    </Button>
                </div>

                <div className='relative group overflow-hidden rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center p-4'>
                    <ZoomableImage
                        src='/guide/chrome/tampermonkey.png'
                        width={300}
                        height={100}
                        alt='Install tampermonkey'
                        className='transition-transform group-hover:scale-105 duration-500'
                    />
                </div>
            </div>

            <div className='p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-transparent border-l-4 border-blue-600 text-neutral-300'>
                {t.rich('installed', {
                    SigMod: (children) => (
                        <span className='text-white font-bold italic'>
                            {children}
                        </span>
                    ),
                    SigFixes: (children) => (
                        <span className='text-white font-bold italic'>
                            {children}
                        </span>
                    ),
                })}
            </div>

            <div className='flex justify-between pt-6'>
                <Button
                    variant='ghost'
                    className='text-neutral-500 hover:text-white'
                    asChild
                >
                    <Link href='/guide'>
                        <ArrowLeft className='mr-2 h-4 w-4' /> {t('back')}
                    </Link>
                </Button>
                <Button
                    size='lg'
                    className='bg-white text-black hover:bg-neutral-200 font-bold px-8 rounded-full'
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
