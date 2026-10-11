'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
    ArrowRight,
    ArrowLeft,
    AlertTriangle,
    ShieldCheck,
    Laptop,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { detectBrowser } from '@/utils/getLink';
import { ZoomableImage } from '@/components/ZoomableImage';

const WarningBox = ({ label, text }: { label: string; text: string }) => (
    <div className='bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3.5 items-start'>
        <AlertTriangle className='text-amber-500 shrink-0 mt-0.5' size={18} />
        <div className='text-xs sm:text-sm leading-relaxed text-neutral-600 dark:text-neutral-300'>
            <strong className='text-amber-500 uppercase tracking-wide text-xs block mb-1 font-semibold'>
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
        const detected = detectBrowser();
        setBrowser(
            detected === 'chrome' ||
                detected === 'edge' ||
                detected === 'opera' ||
                detected === 'firefox' ||
                detected === 'safari'
                ? detected
                : 'default'
        );
    }, []);

    const { base, files } = imageData[browser] ?? imageData.default;

    return (
        <div className='max-w-4xl space-y-8'>
            {/* Step Header */}
            <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                    <span className='px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold'>
                        Step 2
                    </span>
                    <span className='text-xs text-neutral-400'>
                        Browser Permission
                    </span>
                </div>
                <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3'>
                    <ShieldCheck className='text-blue-500' size={32} />
                    {browser === 'chrome' ? t('chrome.pageTitle') : t('title')}
                </h1>
                <p className='text-neutral-600 dark:text-neutral-400 text-base max-w-2xl leading-relaxed'>
                    {browser === 'chrome' ? t('chrome.desc') : t('desc')}
                </p>
            </div>

            {/* Browser Switcher Pills */}
            <div className='flex items-center gap-2 flex-wrap'>
                <span className='text-xs text-neutral-400 font-medium mr-1'>
                    Select your browser:
                </span>
                {(['chrome', 'edge', 'opera', 'default'] as const).map((b) => (
                    <button
                        key={b}
                        onClick={() => setBrowser(b)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            browser === b
                                ? 'bg-blue-600 text-white'
                                : 'bg-black/5 dark:bg-white/5 text-neutral-500 hover:text-foreground'
                        }`}
                    >
                        {b === 'default' ? 'Other' : b.charAt(0).toUpperCase() + b.slice(1)}
                    </button>
                ))}
            </div>

            {/* Main Interactive Layout */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-start'>
                {/* Steps List */}
                <div className='lg:col-span-6 p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-6'>
                    <h2 className='text-base font-semibold text-foreground pb-2 border-b border-black/5 dark:border-white/10'>
                        {t(`${browser}.title`)}
                    </h2>
                    <ol className='space-y-4'>
                        {t
                            .raw(`${browser}.steps`)
                            .map((step: string, i: number) => (
                                <li
                                    key={i}
                                    className='flex gap-3.5 items-start'
                                >
                                    <span className='w-6 h-6 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5'>
                                        {i + 1}
                                    </span>
                                    <span className='text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed'>
                                        {step}
                                    </span>
                                </li>
                            ))}
                    </ol>

                    {browser !== 'chrome' && browser !== 'firefox' && (
                        <div className='pt-2'>
                            <WarningBox label={t('note.label')} text={t('note.text')} />
                        </div>
                    )}
                </div>

                {/* Screenshots Frame */}
                <div className='lg:col-span-6 flex flex-col gap-4'>
                    {files.map((img, i) => (
                        <div
                            key={i}
                            className='rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-900/60 overflow-hidden shadow-sm'
                        >
                            <div className='px-4 py-2 border-b border-white/10 bg-neutral-900 flex items-center justify-between'>
                                <div className='flex items-center gap-1.5'>
                                    <div className='w-2 h-2 rounded-full bg-red-500/80' />
                                    <div className='w-2 h-2 rounded-full bg-yellow-500/80' />
                                    <div className='w-2 h-2 rounded-full bg-green-500/80' />
                                </div>
                                <span className='text-[10px] text-neutral-400 truncate'>
                                    Screenshot {i + 1}
                                </span>
                            </div>
                            <div className='p-4 flex items-center justify-center bg-black/40'>
                                <ZoomableImage
                                    src={base + img}
                                    width={400}
                                    height={240}
                                    alt={img}
                                    className='rounded-lg max-w-full'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Footer */}
            <div className='flex justify-between items-center pt-4 border-t border-black/5 dark:border-white/10'>
                <Button variant='ghost' className='text-neutral-500 hover:text-foreground' asChild>
                    <Link href='/guide/userscript-manager'>
                        <ArrowLeft className='mr-2 h-4 w-4' /> {t('back')}
                    </Link>
                </Button>
                <Button
                    size='lg'
                    className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-full shadow-sm'
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
