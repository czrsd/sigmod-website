'use client';

import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
    getTampermonkeyLink,
    sigmodLink,
    sigfixLink,
    sigmallyLink,
    discordLink,
} from '@/utils/getLink';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useTranslations } from 'next-intl';
import { ZoomableImage } from '@/components/ZoomableImage';
import { detectBrowser } from '@/utils/getLink';
import { Zap, ExternalLink, ArrowRight, BookOpen, MessageSquare } from 'lucide-react';

export default function QuickGuidePage() {
    const [browser, setBrowser] = useState('other');
    const t = useTranslations('QuickGuide');

    useEffect(() => {
        setBrowser(detectBrowser());
    }, []);

    let devModeStep = null;

    if (browser === 'chrome') {
        devModeStep = {
            title: t('allow_userscripts.title'),
            description: t('allow_userscripts.desc'),
            images: [
                '/guide/chrome/manage_extension.png',
                '/guide/chrome/allow_userscripts.png',
            ],
        };
    } else if (browser === 'firefox' || browser === 'safari') {
        devModeStep = {
            title: t('developermode.title'),
            description: t('developermode.desc'),
            images: [],
            skip: true,
        };
    } else {
        const imagesMap: Record<string, string[]> = {
            edge: [
                '/guide/edge/developermode.png',
                '/guide/edge/developermode.png',
            ],
            opera: [
                '/guide/opera/developermode.png',
                '/guide/opera/developermode.png',
            ],
            other: [
                '/screenshots/guide/manage_extensions.png',
                '/screenshots/guide/devmode_1.png',
                '/screenshots/guide/devmode_2.png',
            ],
        };
        devModeStep = {
            title: t('developermode.title'),
            description: t('developermode.desc'),
            images: imagesMap[browser] || imagesMap['other'],
            skip: false,
        };
    }

    const baseSteps = [
        {
            title: t('tampermonkey.title'),
            description: t('tampermonkey.desc'),
            button: {
                text: t('tampermonkey.button'),
                href: getTampermonkeyLink(),
                variant: 'outline' as const,
                external: true,
            },
        },
        ...(devModeStep && !devModeStep.skip ? [devModeStep] : []),
        {
            title: t('sigmod.title'),
            description: t('sigmod.desc'),
            button: {
                text: t('sigmod.title'),
                href: sigmodLink,
                variant: 'outline' as const,
                external: true,
            },
        },
        {
            title: t('sigfixes.title'),
            description: t('sigfixes.desc'),
            button: {
                text: t('sigfixes.title'),
                href: sigfixLink,
                variant: 'outline' as const,
                external: true,
            },
        },
        {
            title: t('play.title'),
            description: t('play.desc'),
            button: {
                text: t('play.button'),
                href: sigmallyLink,
                variant: 'default' as const,
                external: true,
            },
        },
    ];

    return (
        <section className='max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-10'>
            <div className='text-center space-y-3 max-w-xl mx-auto'>
                <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold'>
                    <Zap size={14} />
                    Quick Setup
                </div>
                <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground'>
                    {t('title')}
                </h1>
                <p className='text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed'>
                    {t('note')}
                </p>
            </div>

            <div className='space-y-6'>
                {baseSteps.map((step, i) => (
                    <Card
                        key={i}
                        className='rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] shadow-sm overflow-hidden'
                    >
                        <CardHeader className='pb-3'>
                            <CardTitle className='flex items-center gap-3 text-lg font-bold'>
                                <span className='w-6 h-6 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-semibold shrink-0'>
                                    {i + 1}
                                </span>
                                <span>{step.title}</span>
                            </CardTitle>
                            <CardDescription className='text-sm text-neutral-600 dark:text-neutral-400 pl-9'>
                                {step.description}
                            </CardDescription>
                        </CardHeader>

                        {step.images && step.images.length > 0 && (
                            <CardContent className='pl-9 pt-2'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    {step.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className='rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-neutral-900/60 p-2'
                                        >
                                            <ZoomableImage
                                                src={img}
                                                alt={`Step ${i + 1} image ${idx + 1}`}
                                                width={400}
                                                height={220}
                                                className='rounded-lg w-full h-auto'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        )}

                        {step.button && (
                            <CardFooter className='pl-9 pt-2 pb-6'>
                                <Button
                                    variant={step.button.variant}
                                    className={`rounded-full px-6 h-10 text-xs font-semibold ${
                                        step.button.variant === 'default'
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'border-black/10 dark:border-white/10'
                                    }`}
                                    asChild
                                >
                                    <Link
                                        href={step.button.href}
                                        target={
                                            step.button.external
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel={
                                            step.button.external
                                                ? 'noopener noreferrer'
                                                : undefined
                                        }
                                    >
                                        {step.button.text}
                                        {step.button.external && (
                                            <ExternalLink className='ml-1.5 h-3.5 w-3.5' />
                                        )}
                                    </Link>
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>

            <div className='pt-6 flex flex-wrap justify-center gap-3'>
                <Button
                    variant='outline'
                    className='rounded-full h-11 px-6 border-black/10 dark:border-white/10 font-medium'
                    asChild
                >
                    <Link href='/guide'>
                        <BookOpen className='mr-2 h-4 w-4' />
                        {t('fullGuide')}
                    </Link>
                </Button>
                <Button
                    variant='outline'
                    className='rounded-full h-11 px-6 border-black/10 dark:border-white/10 font-medium'
                    asChild
                >
                    <a
                        href={discordLink}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <MessageSquare className='mr-2 h-4 w-4 text-[#5865F2]' />
                        {t('discord')}
                    </a>
                </Button>
            </div>
        </section>
    );
}
