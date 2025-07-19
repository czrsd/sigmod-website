'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
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
        <div className='max-w-3xl px-4 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-semibold'>{t('title')}</h1>
                <p className='text-muted-foreground'>{t('desc')}</p>
                <p>{t('recommend')}</p>
                <ul className='list-disc pl-5'>
                    <li>Tampermonkey</li>
                    <li>Violentmonkey</li>
                </ul>
                <p>{t('instruction')}</p>
                <Button className='my-4' variant='outline' asChild>
                    <Link href={link ?? '#'} target='_blank'>
                        {t('button')}
                    </Link>
                </Button>
                <ZoomableImage
                    src='/guide/tampermonkey_chrome.png'
                    width={300}
                    height={100}
                    alt='Install tampermonkey'
                    className='w-max'
                />
                <p>
                    {t.rich('installed', {
                        SigMod: (children) => <strong>{children}</strong>,
                        SigFixes: (children) => <strong>{children}</strong>,
                    })}
                </p>
            </div>
            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide'>
                        <ArrowLeft className='mr-1' />
                        {t('back')}
                    </Link>
                </Button>
                <Button asChild>
                    <Link
                        href={
                            browser === 'firefox' || browser === 'safari'
                                ? '/guide/sigmod'
                                : '/guide/developer-mode'
                        }
                    >
                        {t('next')}
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
