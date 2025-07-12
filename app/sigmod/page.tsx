'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Tag, Cpu, Palette, MessageSquare } from 'lucide-react';

export default function SigModPage() {
    return (
        <main className='max-w-5xl mx-auto px-6 md:px-16 py-20 space-y-24'>
            <Hero />
            <Features />
            <QuickInstall />
            <PreviewCarousel />
            <WhySigMod />
            <FAQ />
            <Community />
        </main>
    );
}

function Hero() {
    return (
        <section className='text-center max-w-3xl mx-auto space-y-6'>
            <h1 className='text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text'>
                SigMod — Customize Sigmally Your Way
            </h1>
            <p className='text-lg text-muted-foreground'>
                Macros, tags, and full control — tailor your gameplay like never
                before.
            </p>
            <Button
                variant='outline'
                className='mx-auto mt-4 text-lg font-semibold'
            >
                <Link href='/guide/sigmod'>Install SigMod</Link>
            </Button>
            <p className='text-sm text-muted-foreground mt-2'>
                Requires{' '}
                <Link href='https://tampermonkey.net' className='underline'>
                    Tampermonkey
                </Link>{' '}
                or{' '}
                <Link
                    href='https://violentmonkey.github.io'
                    className='underline'
                >
                    Violentmonkey
                </Link>
                .
            </p>
        </section>
    );
}

function Features() {
    const features = [
        {
            Icon: Cpu,
            title: 'Macros & Automation',
            description:
                'Streamline your gameplay with powerful, easy-to-use macros that let you act faster and smarter.',
        },
        {
            Icon: Tag,
            title: 'Advanced Tag System',
            description:
                'Manage friends and parties seamlessly with enhanced tags, chat, and notifications.',
        },
        {
            Icon: Palette,
            title: 'Full Customization',
            description:
                'Themes, UI tweaks, hotkeys — make Sigmally truly yours with flexible mod options.',
        },
    ];

    return (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center'>
            {features.map(({ Icon, title, description }) => (
                <div key={title} className='space-y-4'>
                    <Icon size={48} className='mx-auto text-purple-600' />
                    <h3 className='text-2xl font-semibold'>{title}</h3>
                    <p className='text-muted-foreground'>{description}</p>
                </div>
            ))}
        </section>
    );
}

function QuickInstall() {
    return (
        <section className='max-w-3xl mx-auto space-y-6 text-center'>
            <h2 className='text-3xl font-semibold'>Quick Installation</h2>
            <ol className='list-decimal list-inside space-y-2 text-muted-foreground text-left max-w-md mx-auto'>
                <li>
                    Install a userscript manager: Tampermonkey or Violentmonkey
                </li>
                <li>
                    Install SigMod from{' '}
                    <Link
                        href='https://greasyfork.org/scripts/454648'
                        target='_blank'
                        className='underline'
                    >
                        Greasyfork
                    </Link>
                </li>
                <li>
                    Open the mod menu by pressing “V” or clicking the gear icon
                    in-game
                </li>
            </ol>
            <Button asChild className='mt-4'>
                <Link href='/guide/sigmod'>Detailed Installation Guide</Link>
            </Button>
        </section>
    );
}

function PreviewCarousel() {
    return (
        <section className='max-w-4xl mx-auto'>
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 4000 })]}
                className='rounded-lg shadow-lg'
            >
                <CarouselContent>
                    <CarouselItem>
                        <Image
                            src='/screenshots/sigmod_menu.png'
                            alt='SigMod Menu'
                            width={700}
                            height={450}
                            className='rounded-lg'
                            priority
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src='/screenshots/macros.png'
                            alt='Macros UI'
                            width={700}
                            height={450}
                            className='rounded-lg'
                            priority
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image
                            src='/screenshots/tag_system.png'
                            alt='Tag system preview'
                            width={700}
                            height={450}
                            className='rounded-lg'
                            priority
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}

function WhySigMod() {
    return (
        <section className='max-w-3xl mx-auto space-y-4 text-center'>
            <h2 className='text-3xl font-semibold'>Why Choose SigMod?</h2>
            <p className='text-muted-foreground'>
                SigMod puts you in full control of your Sigmally experience.
                It’s trusted by the community and approved by the game owner.
                Designed to offer deep customization and smart tools without
                sacrificing simplicity.
            </p>
            <p className='text-muted-foreground'>
                For those who want even better performance, SigMod works
                perfectly with{' '}
                <Link href='/guide/sigfixes' className='underline'>
                    SigFixes
                </Link>
                .
            </p>
        </section>
    );
}

function FAQ() {
    return (
        <section className='max-w-4xl mx-auto space-y-6'>
            <h2 className='text-3xl font-semibold text-center mb-8'>FAQ</h2>
            <Accordion type='single' collapsible className='space-y-4'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger>
                        Are macros allowed in Sigmally?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes, macros provided by SigMod are widely accepted and
                        designed to improve your gameplay experience without
                        violating server rules.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-2'>
                    <AccordionTrigger>
                        How does the tag system work?
                    </AccordionTrigger>
                    <AccordionContent>
                        It helps you organize and communicate with friends and
                        party members via enhanced tags and notifications.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-3'>
                    <AccordionTrigger>
                        Can I uninstall SigMod anytime?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes, just disable or remove the script from your
                        userscript manager like Tampermonkey.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-4'>
                    <AccordionTrigger>Is SigMod safe to use?</AccordionTrigger>
                    <AccordionContent>
                        Absolutely. SigMod is open source, trusted by thousands,
                        and only modifies client-side behavior without any funny
                        business.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}

function Community() {
    return (
        <section className='max-w-3xl mx-auto text-center space-y-6'>
            <h2 className='text-3xl font-semibold'>Join the Community</h2>
            <p className='text-muted-foreground max-w-prose mx-auto'>
                Need help, found a bug, or want to share your custom macros?
                Join the Discord and connect with other SigMod users.
            </p>
            <Button variant='outline' asChild>
                <Link href='https://discord.gg/QyUhvUC8AD' target='_blank'>
                    <MessageSquare className='inline mr-2' /> Join Discord
                </Link>
            </Button>
            <p className='text-muted-foreground text-sm'>
                Or explore the code on{' '}
                <Link
                    href='https://github.com/czrsd/sigmod'
                    target='_blank'
                    className='underline flex items-center justify-center gap-1'
                >
                    GitHub
                </Link>
            </p>
        </section>
    );
}
