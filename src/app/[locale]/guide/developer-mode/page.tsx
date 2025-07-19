'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { detectBrowser } from '@/utils/getLink';
import { ZoomableImage } from '@/components/ZoomableImage';

const WarningBox = ({ children }: { children: React.ReactNode }) => (
    <div className='border border-yellow-400 p-4 text-yellow-400 rounded-md'>
        {children}
    </div>
);

const imageData: Record<string, { base: string; files: string[] }> = {
    chrome: {
        base: '/guide/chrome/',
        files: ['manage_extension.png', 'allow_userscripts.png'],
    },
    edge: {
        base: '/guide/edge/',
        files: ['manage_extensions.png', 'developermode.png'],
    },
    opera: {
        base: '/guide/opera/',
        files: ['manage_extensions.png', 'developermode.png'],
    },
    default: {
        base: '/guide/',
        files: ['manage_extensions.png', 'developermode.png'],
    },
};

export default function DeveloperModePage() {
    const t = useTranslations('Guide.DevMode');
    const [browser, setBrowser] = useState<
        'chrome' | 'edge' | 'opera' | 'firefox' | 'safari' | 'default'
    >('default');

    useEffect(() => {
        setBrowser(detectBrowser());
    }, []);

    const { base, files } = imageData[browser] ?? imageData.default;

    return (
        <div className='max-w-3xl px-4 space-y-8'>
            <div className='space-y-4'>
                <h1 className='text-3xl font-bold'>
                    {browser === 'chrome' ? t('chrome.pageTitle') : t('title')}
                </h1>
                <p className='text-muted-foreground text-lg'>
                    {browser === 'chrome' ? t('chrome.desc') : t('desc')}
                </p>

                <div>
                    <h2 className='font-semibold text-xl mb-2'>
                        {t(`${browser}.title`)}
                    </h2>
                    <ol className='list-decimal list-inside space-y-2 text-base'>
                        {t
                            .raw(`${browser}.steps`)
                            .map((step: string, i: number) => (
                                <li key={i}>{step}</li>
                            ))}
                    </ol>
                </div>

                <div className='flex flex-wrap gap-4'>
                    {files.map((img, i) => (
                        <ZoomableImage
                            key={i}
                            src={base + img}
                            width={i === 0 ? 200 : 260}
                            height={300}
                            alt={img.replace('.png', '').replace('_', ' ')}
                            className='w-max'
                        />
                    ))}
                </div>
            </div>

            {browser !== 'chrome' && (
                <WarningBox>
                    <strong>{t('note.label')}</strong> {t('note.text')}
                </WarningBox>
            )}

            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide/userscript-manager'>
                        <ArrowLeft className='mr-1' />
                        {t('back')}
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/guide/sigmod'>
                        {t('next')}
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
