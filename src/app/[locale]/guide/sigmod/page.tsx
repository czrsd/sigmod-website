'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { sigmodLink } from '@/utils/getLink';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';

export default function SigModPage() {
    const t = useTranslations('Guide.SigMod');

    return (
        <div className='max-w-3xl px-4 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-semibold'>{t('title')}</h1>
                <p className='text-muted-foreground'>{t('desc')}</p>
                <p className='mt-3'>
                    {t.rich('popup', {
                        i: (chunk) => <i>{chunk}</i>,
                    })}
                </p>
                <Button variant='outline' className='my-5' asChild>
                    <Link href={sigmodLink} target='_blank'>
                        {t('button')}
                    </Link>
                </Button>
                <p>
                    {t.rich('after', {
                        link: (chunk) => (
                            <Link href='/sigmod' className='underline'>
                                {chunk}
                            </Link>
                        ),
                    })}
                </p>
                <ZoomableImage
                    src='/guide/install_sigmod.png'
                    width={300}
                    height={100}
                    alt='Install tampermonkey'
                    className='w-max'
                />
            </div>
            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide/userscript-manager'>
                        <ArrowLeft className='mr-1' />
                        {t('back')}
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/guide/sigfixes'>
                        {t('next')}
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
