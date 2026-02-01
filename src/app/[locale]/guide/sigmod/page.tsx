'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Terminal, Cpu } from 'lucide-react';
import { sigmodLink } from '@/utils/getLink';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';

export default function SigModPage() {
    const t = useTranslations('Guide.SigMod');

    return (
        <div className='max-w-4xl space-y-10'>
            <div className='space-y-4'>
                <h1 className='text-3xl md:text-4xl font-black italic tracking-tighter uppercase flex items-center gap-3'>
                    <Terminal className='text-blue-500' size={32} />
                    {t('title')}
                </h1>
                <p className='text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl'>
                    {t('desc')}
                </p>
            </div>

            <div className='bg-neutral-300 dark:bg-neutral-900/50 border border-white/10 rounded-2xl overflow-hidden'>
                <div className='p-8 space-y-6'>
                    <div className='space-y-2'>
                        <h3 className='font-bold text-xl'>{t('button')}</h3>
                        <p className='text-neutral-600 dark:text-neutral-400 text-sm'>
                            {t.rich('popup', {
                                i: (chunk) => (
                                    <span className='text-blue-400 italic'>
                                        {chunk}
                                    </span>
                                ),
                            })}
                        </p>
                    </div>

                    <div className='flex flex-col md:flex-row gap-8 items-center'>
                        <Button
                            size='lg'
                            className='bg-blue-600 hover:bg-blue-700 text-white font-black px-10 h-14 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105 active:scale-95'
                            asChild
                        >
                            <Link href={sigmodLink} target='_blank'>
                                {t('button')}
                            </Link>
                        </Button>

                        <div className='p-2 bg-black/50 rounded-xl border border-white/5 group'>
                            <ZoomableImage
                                src='/guide/install_sigmod.png'
                                width={300}
                                height={100}
                                alt='Install SigMod'
                                className='rounded-lg opacity-80 group-hover:opacity-100 transition-opacity'
                            />
                        </div>
                    </div>
                </div>

                <div className='bg-white/5 p-4 px-8 border-t border-white/5'>
                    <p className='text-sm text-neutral-600 dark:text-neutral-500 italic'>
                        {t.rich('after', {
                            link: (chunk) => (
                                <Link
                                    href='/sigmod'
                                    className='text-blue-500 hover:underline font-bold'
                                >
                                    {chunk}
                                </Link>
                            ),
                        })}
                    </p>
                </div>
            </div>

            <div className='flex justify-between pt-6'>
                <Button variant='ghost' className='text-neutral-500' asChild>
                    <Link href='/guide/userscript-manager'>
                        <ArrowLeft className='mr-2 h-4 w-4' /> {t('back')}
                    </Link>
                </Button>
                <Button
                    size='lg'
                    className='bg-white text-black hover:bg-neutral-200 font-bold px-8 rounded-full'
                    asChild
                >
                    <Link href='/guide/sigfixes'>
                        {t('next')} <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
