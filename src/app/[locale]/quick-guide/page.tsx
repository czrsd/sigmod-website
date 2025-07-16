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

function detectBrowser(): 'firefox' | 'other' {
    if (typeof navigator === 'undefined') return 'other';
    return navigator.userAgent.includes('Firefox') ? 'firefox' : 'other';
}

export default function QuickGuidePage() {
    const [browser, setBrowser] = useState<'firefox' | 'other' | null>(null);

    useEffect(() => {
        setBrowser(detectBrowser());
    }, []);

    if (!browser) return null;

    const baseSteps = [
        {
            title: 'Install Tampermonkey',
            description:
                'Install the userscript manager required to run SigMod and SigFixes.',
            button: {
                text: 'Get Tampermonkey',
                href: getTampermonkeyLink(),
                variant: 'outline' as const,
                external: true,
            },
        },
        ...(browser === 'firefox'
            ? []
            : [
                  {
                      title: 'Enable Developer Mode',
                      description:
                          'Follow the steps in the pictures below. Restart your browser enabling the developer mode.',
                      images: [
                          '/screenshots/guide/manage_extensions.png',
                          '/screenshots/guide/devmode_1.png',
                          '/screenshots/guide/devmode_2.png',
                      ],
                  },
              ]),
        {
            title: 'Install SigMod',
            description: 'Adds macros, customization, party tags, and more.',
            button: {
                text: 'Install SigMod',
                href: sigmodLink,
                variant: 'outline' as const,
                external: true,
            },
        },
        {
            title: 'Install SigFixes',
            description: 'Boost FPS, reduce lag, enable multiboxing.',
            button: {
                text: 'Install SigFixes',
                href: sigfixLink,
                variant: 'outline' as const,
                external: true,
            },
        },
        {
            title: 'Play Sigmally',
            description: 'Everything is ready now. Time to play.',
            button: {
                text: 'Play Now',
                href: sigmallyLink,
                variant: 'default' as const,
                external: true,
            },
        },
    ];

    return (
        <section className='max-w-3xl mx-auto px-6 md:px-16 py-24'>
            <h1 className='text-4xl font-bold text-center'>Quick Guide</h1>
            <p className='text-muted-foreground text-center text-xs mt-2 mb-10'>
                Note that this page isn't as detailed as the full guide.
            </p>

            <div className='space-y-10'>
                {baseSteps.map((step, i) => (
                    <Card key={i}>
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
                                                <Dialog key={idx}>
                                                    <DialogTrigger asChild>
                                                        <Image
                                                            src={img}
                                                            alt={`Step ${
                                                                i + 1
                                                            } image ${idx + 2}`}
                                                            width={600}
                                                            height={300}
                                                            className='rounded-xl border shadow cursor-zoom-in hover:scale-105 transition w-full flex-1 object-cover h-full'
                                                        />
                                                    </DialogTrigger>
                                                    <DialogContent className='max-w-4xl p-0 bg-transparent border-none shadow-none'>
                                                        <VisuallyHidden>
                                                            <DialogTitle>
                                                                Zoomed Image
                                                            </DialogTitle>
                                                        </VisuallyHidden>
                                                        <Image
                                                            src={img}
                                                            alt={`Step ${
                                                                i + 1
                                                            } zoomed image ${
                                                                idx + 2
                                                            }`}
                                                            width={1200}
                                                            height={800}
                                                            className='mx-auto rounded-xl'
                                                        />
                                                    </DialogContent>
                                                </Dialog>
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
                        Join the Discord
                    </Link>
                </Button>
                <Button variant='secondary' asChild>
                    <Link href='/guide'>View Full Guide</Link>
                </Button>
            </div>
        </section>
    );
}
