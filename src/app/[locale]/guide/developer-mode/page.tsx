'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const WarningBox = ({ children }: { children: React.ReactNode }) => (
    <div className='border border-yellow-400 p-4 text-yellow-400 rounded-md'>
        {children}
    </div>
);

export default function DeveloperModePage() {
    const t = useTranslations('Guide.DevMode');
    const [browser, setBrowser] = useState<
        'chrome' | 'firefox' | 'safari' | 'default'
    >('default');

    useEffect(() => {
        if (typeof navigator === 'undefined') return;
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) setBrowser('firefox');
        else if (
            ua.includes('Chrome') &&
            !ua.includes('Edg') &&
            !ua.includes('OPR')
        )
            setBrowser('chrome');
        else if (
            ua.includes('Edg') ||
            ua.includes('OPR') ||
            ua.includes('Opera')
        )
            setBrowser('chrome');
        else if (ua.includes('Safari') && !ua.includes('Chrome'))
            setBrowser('safari');
        else setBrowser('default');
    }, []);

    return (
        <div className='max-w-3xl px-4 space-y-8'>
            <div className='space-y-4'>
                <h1 className='text-3xl font-bold'>{t('title')}</h1>
                <p className='text-muted-foreground text-lg'>{t('desc')}</p>

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

                <WarningBox>
                    <strong>{t('note.label')}</strong> {t('note.text')}
                </WarningBox>
            </div>

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
