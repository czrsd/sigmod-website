'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Wrench, ShieldCheck } from 'lucide-react';
import { sigfixLink } from '@/utils/getLink';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';

export default function SigFixesPage() {
    const t = useTranslations('Guide.SigFixes');

    return (
        <div className='max-w-4xl space-y-10'>
            <div className='space-y-4'>
                <h1 className='text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-3'>
                    <Wrench className='text-purple-500' size={32} />
                    {t('title')}
                </h1>
                <p className='text-neutral-400 text-lg max-w-2xl'>
                    {t('desc')}
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div className='space-y-6'>
                    <div className='p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-4'>
                        <div className='flex items-center gap-2 text-purple-400 font-bold uppercase text-xs tracking-widest'>
                            <ShieldCheck size={16} />
                            Optimization Required
                        </div>
                        <p className='text-neutral-300 leading-relaxed'>
                            {t('prompt')}
                        </p>
                        <Button
                            size='lg'
                            className='w-full bg-purple-600 hover:bg-purple-700 text-white font-bold h-12 rounded-xl'
                            asChild
                        >
                            <Link href={sigfixLink} target='_blank'>
                                {t('button')}
                            </Link>
                        </Button>
                    </div>

                    <p className='text-neutral-500 text-sm leading-relaxed px-2'>
                        {t('features')}
                    </p>
                </div>

                <div className='flex items-center justify-center p-6 bg-neutral-900/30 border border-white/5 rounded-2xl relative group'>
                    <div className='absolute inset-0 bg-purple-600/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
                    <ZoomableImage
                        src='/guide/install_sigfixes.png'
                        width={300}
                        height={100}
                        alt='Install SigFixes'
                        className='relative z-10 rounded-lg shadow-2xl'
                    />
                </div>
            </div>

            <div className='flex justify-between pt-10 border-t border-white/5'>
                <Button
                    variant='ghost'
                    className='text-neutral-500 hover:text-white'
                    asChild
                >
                    <Link href='/guide/sigmod'>
                        <ArrowLeft className='mr-2 h-4 w-4' /> {t('back')}
                    </Link>
                </Button>
                <Button
                    size='lg'
                    className='bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition-transform font-black px-10 rounded-full'
                    asChild
                >
                    <Link href='/guide/end'>
                        {t('end')} <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
