'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';

export default function EndPage() {
    const t = useTranslations('Guide.End');

    return (
        <div className='max-w-3xl px-4 space-y-5'>
            <h1 className='text-4xl font-extrabold mb-4'>{t('title')}</h1>
            <p className='text-md mb-4'>{t('desc')}</p>
            <ul>
                <li className='list-disc ml-5'>
                    <strong className='text-md mb-4'>{t('notice')}</strong>
                </li>
            </ul>
            <ZoomableImage
                src='/guide/main_menu.png'
                width={330}
                height={300}
                alt='Sigmally main menu'
                className='w-max'
            />
            <div className='flex flex-col sm:flex-row gap-2'>
                <Button asChild>
                    <Link href='https://one.sigmally.com/' target='_blank'>
                        {t('play')}
                    </Link>
                </Button>
                <Button variant='outline' asChild>
                    <Link href='/sigmod'>{t('explore')} SigMod</Link>
                </Button>
                <Button variant='outline' asChild>
                    <Link href='/sigfixes'>{t('explore')} SigFixes</Link>
                </Button>
            </div>
        </div>
    );
}
