'use client';

import Link from 'next/link';
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
import { Glow } from '@/components/Glow';
import { ZoomableImage } from '@/components/ZoomableImage';

function detectBrowser(): 'firefox' | 'other' {
    if (typeof navigator === 'undefined') return 'other';
    return navigator.userAgent.includes('Firefox') ? 'firefox' : 'other';
}

export default function QuickGuidePage() {
    const [browser, setBrowser] = useState<'firefox' | 'other' | null>(null);
    const t = useTranslations('QuickGuide');

    useEffect(() => {
        setBrowser(detectBrowser());
    }, []);

    if (!browser) return null;

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
        ...(browser === 'firefox'
            ? []
            : [
                  {
                      title: t('developermode.title'),
                      description: t('developermode.desc'),
                      images: [
                          '/screenshots/guide/manage_extensions.png',
                          '/screenshots/guide/devmode_1.png',
                          '/screenshots/guide/devmode_2.png',
                      ],
                  },
              ]),
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
        <section className='max-w-3xl mx-auto px-6 md:px-16 py-24'>
            <GlowItems />
            <h1 className='text-4xl font-bold text-center'>{t('title')}</h1>
            <p className='text-muted-foreground text-center text-xs mt-2 mb-10'>
                {t('note')}
            </p>

            <div className='space-y-10'>
                {baseSteps.map((step, i) => (
                    <Card key={i} className='bg-black/30 backdrop-blur-sm'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <span className='text-xl text-muted-foreground'>
                                    {i + 1}.
                                </span>
                                {step.title}
                            </CardTitle>
                            <CardDescription>
                                {step.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {step.images && (
                                <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                                    <div className='sm:w-1/2'>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Image
                                                    src={step.images[0]}
                                                    alt={`Step ${
                                                        i + 1
                                                    } image 1`}
                                                    width={600}
                                                    height={300}
                                                    className='rounded-xl border shadow cursor-zoom-in hover:scale-105 transition w-full h-full object-cover'
                                                />
                                            </DialogTrigger>
                                            <DialogContent className='max-w-4xl p-0 bg-transparent border-none shadow-none'>
                                                <VisuallyHidden>
                                                    <DialogTitle>
                                                        Zoomed Image
                                                    </DialogTitle>
                                                </VisuallyHidden>
                                                <Image
                                                    src={step.images[0]}
                                                    alt={`Step ${
                                                        i + 1
                                                    } zoomed image 1`}
                                                    width={1200}
                                                    height={800}
                                                    className='mx-auto rounded-xl'
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div className='sm:w-1/2 flex flex-col gap-4'>
                                        {step.images
                                            .slice(1)
                                            .map((img, idx) => (
                                                <ZoomableImage
                                                    key={idx}
                                                    src={img}
                                                    alt={`Step ${i + 1}`}
                                                    width={600}
                                                    height={300}
                                                />
                                            ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        {step.button && (
                            <CardFooter>
                                <Button variant={step.button.variant} asChild>
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
                                    </Link>
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>

            <div className='pt-10 space-x-3 flex flex-wrap justify-center'>
                <Button variant='outline' asChild>
                    <Link
                        href={discordLink}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {t('discord')}
                    </Link>
                </Button>
                <Button variant='secondary' asChild>
                    <Link href='/guide'>{t('fullGuide')}</Link>
                </Button>
            </div>
        </section>
    );
}

function GlowItems() {
    return (
        <>
            <Glow
                top='-30%'
                left='-20%'
                width='600px'
                height='600px'
                opacity={0.4}
            />
            <Glow
                top='15%'
                left='40%'
                width='400px'
                height='400px'
                opacity={0.18}
            />
            <Glow
                top='60%'
                right='-16%'
                width='400px'
                height='400px'
                opacity={0.3}
            />
        </>
    );
}
