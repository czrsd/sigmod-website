'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    ArrowLeft,
    AlertTriangle,
    ShieldCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { detectBrowser } from '@/utils/getLink';
import { ZoomableImage } from '@/components/ZoomableImage';

const WarningBox = ({ label, text }: { label: string; text: string }) => (
    <div className='bg-yellow-500/5 border border-yellow-500/20 p-5 rounded-2xl flex gap-4 items-start'>
        <AlertTriangle className='text-yellow-500 shrink-0' size={24} />
        <div className='text-sm leading-relaxed text-yellow-200/80'>
            <strong className='text-yellow-500 uppercase tracking-wider text-xs block mb-1'>
                {label}
            </strong>
            {text}
        </div>
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
        setBrowser(detectBrowser() as any);
    }, []);

    const { base, files } = imageData[browser] ?? imageData.default;

    return (
        <div className='max-w-4xl space-y-10'>
            <div className='space-y-4'>
                <h1 className='text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase flex items-center gap-3'>
                    <ShieldCheck className='text-blue-500' size={32} />
                    {browser === 'chrome' ? t('chrome.pageTitle') : t('title')}
                </h1>
                <p className='text-neutral-400 text-lg max-w-2xl'>
                    {browser === 'chrome' ? t('chrome.desc') : t('desc')}
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-5 gap-10 items-start'>
                <div className='lg:col-span-2 space-y-6'>
                    <h2 className='text-white font-bold uppercase tracking-widest text-sm border-b border-white/10 pb-2'>
                        {t(`${browser}.title`)}
                    </h2>
                    <ol className='space-y-4'>
                        {t
                            .raw(`${browser}.steps`)
                            .map((step: string, i: number) => (
                                <li
                                    key={i}
                                    className='flex gap-4 items-start group'
                                >
                                    <span className='w-6 h-6 rounded bg-white/5 border border-white/10 text-white text-[10px] font-bold flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors'>
                                        {i + 1}
                                    </span>
                                    <span className='text-neutral-300 text-sm font-medium pt-0.5 leading-snug'>
                                        {step}
                                    </span>
                                </li>
                            ))}
                    </ol>
                </div>

                <div className='lg:col-span-3 flex flex-wrap gap-4 justify-center lg:justify-start'>
                    {files.map((img, i) => (
                        <div
                            key={i}
                            className='p-2 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/50 transition-colors'
                        >
                            <ZoomableImage
                                src={base + img}
                                width={i === 0 ? 180 : 240}
                                height={300}
                                alt={img}
                                className='rounded-lg'
                            />
                        </div>
                    ))}
                </div>
            </div>

            {browser !== 'chrome' && browser !== 'firefox' && (
                <WarningBox label={t('note.label')} text={t('note.text')} />
            )}

            <div className='flex justify-between pt-6'>
                <Button
                    variant='ghost'
                    className='text-neutral-500 hover:text-white'
                    asChild
                >
                    <Link href='/guide/userscript-manager'>
                        <ArrowLeft className='mr-2 h-4 w-4' /> {t('back')}
                    </Link>
                </Button>
                <Button
                    size='lg'
                    className='bg-white text-black hover:bg-neutral-200 font-bold px-8 rounded-full shadow-lg'
                    asChild
                >
                    <Link href='/guide/sigmod'>
                        {t('next')} <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
