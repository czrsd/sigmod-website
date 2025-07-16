'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function EndPage() {
    const t = useTranslations('Guide.End');

    return (
        <div className='max-w-3xl px-4'>
            <h1 className='text-4xl font-extrabold mb-4'>{t('title')}</h1>
            <p className='text-md mb-4'>{t('desc')}</p>
            <div className='flex flex-col sm:flex-row gap-2'>
                <Button variant='outline' asChild>
                    <Link href='https://one.sigmally.com/' target='_blank'>
                        {t('play')}
                    </Link>
                </Button>
                <Button variant='outline' asChild>
                    <Link href='/sigmod'>{t('explore')}</Link>
                </Button>
            </div>
        </div>
    );
}
