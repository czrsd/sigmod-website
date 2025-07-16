'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { sigfixLink } from '@/utils/getLink';
import { useTranslations } from 'next-intl';

export default function SigFixesPage() {
    const t = useTranslations('Guide.SigFixes');

    return (
        <div className='max-w-3xl px-4 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-semibold'>{t('title')}</h1>
                <p className='text-muted-foreground'>{t('desc')}</p>
                <p className='mt-4'>{t('prompt')}</p>
                <Button variant='outline' className='my-5' asChild>
                    <Link href={sigfixLink} target='_blank'>
                        {t('button')}
                    </Link>
                </Button>
                <p>{t('features')}</p>
            </div>
            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide/sigmod'>
                        <ArrowLeft className='mr-1' />
                        {t('back')}
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/guide/end'>
                        {t('end')}
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
