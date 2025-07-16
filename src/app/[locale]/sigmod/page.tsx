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
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Autoplay from 'embla-carousel-autoplay';
import {
    Tag,
    Cpu,
    Palette,
    MessageSquare,
    ArrowRight,
    Settings2,
    Users2,
    LayoutDashboard,
    Eye,
    Camera,
    Type,
    User,
    BarChart,
    MessageSquareText,
} from 'lucide-react';
import { sigmodLink } from '@/utils/getLink';
import { Glow } from '@/components/Glow';

export default function SigModPage() {
    return (
        <main className='max-w-5xl mx-auto px-6 md:px-16 pt-20 space-y-24'>
            <Hero />
            <Features />
            <PreviewCarousel />
            <WhySigMod />
            <SigModFeatures />
            <FAQ />
            <Community />
            <GlowItems />
        </main>
    );
}

function Hero() {
    return (
        <section className='max-w-5xl mx-auto px-6 py-16 flex flex-col items-center gap-10 text-center'>
            <div className='space-y-4'>
                <h1 className='text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-pink-500 text-transparent bg-clip-text pb-3'>
                    SigMod Client
                </h1>
                <p className='text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto'>
                    Upgrade your Sigmally experience with advanced macros,
                    tag-based teams, UI control, and full in-game customization.
                </p>
            </div>

            <div className='space-x-2'>
                <Button className='font-semibold px-6 py-3' asChild>
                    <Link href={sigmodLink}>Install SigMod</Link>
                </Button>

                <Button variant={'outline'} className='px-6 py-3' asChild>
                    <Link href='#features'>
                        Explore features
                        <ArrowRight />
                    </Link>
                </Button>
            </div>

            <p className='text-sm text-muted-foreground max-w-md'>
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

const features = [
    {
        Icon: Cpu,
        title: 'Macros & Automation',
        description:
            'Streamline gameplay with programmable hotkeys, customizable mouse macros, auto‑respawn, and automated daily‑coin collection.',
    },
    {
        Icon: Tag,
        title: 'Party & Tag System',
        description:
            'Assign 3‑letter tags to teammates with real‑time minimap tracking, private chat channels, and precision pings.',
    },
    {
        Icon: Palette,
        title: 'Full Customization',
        description:
            'Personalize every aspect—modify UI themes, fonts, layouts, and keybindings in a unified in‑game mod menu.',
    },
];

function Features() {
    return (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto py-14 text-center'>
            {features.map(({ Icon, title, description }) => (
                <div
                    key={title}
                    className='space-y-4 flex flex-col items-center'
                >
                    <div className='relative w-12 h-12'>
                        <svg width='0' height='0'>
                            <defs>
                                <linearGradient
                                    id='blue_gradient'
                                    x1='0'
                                    y1='0'
                                    x2='24'
                                    y2='24'
                                    gradientUnits='userSpaceOnUse'
                                >
                                    <stop offset='0%' stopColor='purple' />
                                    <stop offset='100%' stopColor='blue' />
                                </linearGradient>
                            </defs>
                        </svg>

                        <Icon
                            className='w-full h-full'
                            style={{ stroke: 'url(#blue_gradient)' }}
                        />
                    </div>

                    <h3 className='text-2xl font-semibold'>{title}</h3>
                    <p className='text-muted-foreground'>{description}</p>
                </div>
            ))}
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

export function WhySigMod() {
    return (
        <section className='max-w-3xl mx-auto space-y-8 text-center px-6 py-12'>
            <h2 className='text-3xl font-semibold'>Why Choose SigMod?</h2>

            <p className='text-base text-muted-foreground max-w-2xl mx-auto'>
                SigMod upgrades the Sigmally client with smart automation,
                visual customization, and full UI control. Set macros, adjust
                layouts, manage hotkeys, and tweak visuals—all inside a clean
                mod menu. Switch themes, save names, and take screenshots with
                ease.
            </p>

            <p className='text-base text-muted-foreground max-w-2xl mx-auto'>
                Stay in sync with teammates using a live tag system: chat
                privately, send pings, and track friends on the minimap. View
                real-time stats, manage your friend list, and fine-tune chat
                visibility, colors, and keybinds.
            </p>

            <p className='text-sm text-muted-foreground max-w-2xl mx-auto'>
                Want even better performance? Combine SigMod with{' '}
                <Link href='/sigfixes' className='underline'>
                    SigFixes
                </Link>{' '}
                for a smoother, lag‑free experience.
            </p>

            <Button className='mx-auto mt-4 px-6 py-3' asChild>
                <Link href='/guide/sigmod'>Get Started with SigMod</Link>
            </Button>
        </section>
    );
}

const featureData = [
    {
        icon: Settings2,
        title: 'Macros & Automation',
        summary: 'Automate every move — keybinds, tricksplits & mouse macros',
        details:
            'Bind keys for advanced actions like rapid feed, double/triple/quad splits, and tricksplits. Create mouse macros for left/right click behaviors. Configure split sequences with precise delay settings and feed speeds. Toggle settings like names, skins, or respawn with a key — all fully customizable.',
    },
    {
        icon: Users2,
        title: 'Party & Tag System',
        summary: '3-letter tags, minimap tracking, pings & private party chat',
        details:
            'Assign yourself a tag (up to 3 characters) to form private teams. Members are tracked on the minimap, listed in a party panel with name and score, and can send precise pings. The party chat allows for secure communication, isolated from public chat. You’ll also see who sent which ping by tag index.',
    },
    {
        icon: LayoutDashboard,
        title: 'Menu Customization',
        summary: 'Themes, fonts, layout, tabs, borders, and input styling',
        details:
            'Personalize your UI with themes, rounded corners, background images, and custom input borders. Hide unwanted elements like Discord or language buttons. Customize tab order, spacing, shadows, and switch between preset layouts for a fully personalized experience.',
    },
    {
        icon: Eye,
        title: 'Visual Game Settings',
        summary: 'Tweak map colors, opacity, cell styling and fonts',
        details:
            'Adjust color and transparency of key game elements like the map, border, food, and cells. Replace in-game images such as viruses or map backgrounds. Choose different fonts, show/hide player names and skins, apply text outlines, and toggle visual overlays like grid and border.',
    },
    {
        icon: Camera,
        title: 'Gallery & Screenshots',
        summary: 'Capture moments & manage your game gallery',
        details:
            'Assign a keybind to instantly take a screenshot in-game. Browse your image collection in the Gallery tab. Each image includes timestamp, delete, and download options. Easily manage or clean your gallery in one place.',
    },
    {
        icon: Type,
        title: 'Name Tools & Color Effects',
        summary: 'Save names, use generators, gradients & symbols',
        details:
            'Access nickname generators from popular sites (NickFinder, Tell.wtf). Save your favorite names for one-click copying. Create stylish names with special characters and design vibrant name colors using gradients and two-tone effects. Quick delete or reuse features built in.',
    },
    {
        icon: User,
        title: 'Friends & Mod Profile',
        summary: 'Add users, chat privately & manage your mod identity',
        details:
            'Add and chat with friends using username or Discord login. See online status, tag, server, and more. Use filters and search to find users. Customize your mod profile with avatar, bio, status, and color highlights. Accept/decline requests and toggle public visibility options.',
    },
    {
        icon: BarChart,
        title: 'Stats & Quick Access Panel',
        summary: 'Track gameplay and toggle key settings instantly',
        details:
            'The Home tab shows stats like time played, top mass, and total deaths. The quick access panel lets you toggle Mass, Grid, Border, Jelly Physics, Auto-Respawn, Coin Claim and more — right from the menu without digging through settings.',
    },
    {
        icon: MessageSquareText,
        title: 'Chat System Overhaul',
        summary: 'Custom mod chat with tabs, keybinds & full control',
        details:
            'Switch between Party and Main chat via tabs. Messages update live using websocket interception. Use keybinds to send your location, toggle blur, enable time tags, or enable compact mode. Customize text, background, and full theme color including transparency.',
    },
];

export function SigModFeatures() {
    return (
        <section className='max-w-4xl mx-auto px-6 py-12 space-y-8'>
            <h2 className='text-3xl font-semibold text-center'>
                SigMod Features
            </h2>
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 2500 })]}
            >
                <CarouselContent className='items-center'>
                    {featureData.map(
                        ({ icon: Icon, title, summary, details }) => (
                            <CarouselItem
                                key={title}
                                className='pl-4 md:basis-1/2 lg:basis-1/3'
                            >
                                <Card key={title}>
                                    <CardHeader>
                                        <CardTitle className='flex items-center gap-2 text-base'>
                                            <span className='shrink-0'>
                                                <Icon
                                                    size={16}
                                                    aria-hidden='true'
                                                />
                                            </span>
                                            {title}
                                        </CardTitle>
                                        <CardDescription className='max-w-prose'>
                                            {summary}
                                        </CardDescription>
                                        <div>
                                            <Dialog>
                                                <DialogTrigger
                                                    className='mt-1'
                                                    asChild
                                                >
                                                    <Button variant='outline'>
                                                        View More
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            {title}
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            {details}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </CarouselItem>
                        )
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}

const faqData = [
    {
        question: 'What are the core features of SigMod?',
        answer: 'SigMod includes a fully customizable mod menu, powerful macros and automation tools, a party & tag system, live in-game stats, and a modern chat, name, and friend system — all integrated to enhance your Sigmally gameplay.',
    },
    {
        question: 'What customization options does SigMod offer?',
        answer: 'You can change themes, fonts, layout spacing, border radius, name colors (including gradients), UI opacity, menu visuals, game colors, and toggle dozens of visual settings. It also supports deathscreen tweaks, skin overrides, and background presets.',
    },
    {
        question: 'What is the tag system?',
        answer: 'The tag system lets you assign a 3-letter code to create a party with teammates. You can track each other on the minimap, chat in a private party channel, send pings, and view scores in a shared party panel with member names and tag indexes.',
    },
    {
        question: 'How does the friend system work?',
        answer: 'You can log in to create a mod profile and add other players as friends. View profiles, roles, online status, server info, and chat with them directly. Friend requests, search, settings, and profile customization (avatar, bio, status) are all included.',
    },
    {
        question: 'How do I open the SigMod menu?',
        answer: 'Press the V key or click the gear icon in the top-right corner of the game to open the mod menu. It includes tabs for Macros, Themes, Gallery, Friends, and more.',
    },
    {
        question: 'Can I customize hotkeys and macros?',
        answer: 'Yes. SigMod includes advanced keybinding tools for feeding, splitting, tricksplits, and more. You can also assign mouse macros, configure linesplit behavior, set rapid feed speed, and bind UI toggles like menu, names, or autorespawn.',
    },
    {
        question: 'Does SigMod affect game performance?',
        answer: 'SigMod adds many features but is optimized to stay lightweight. For better framerate or reduced lag, install SigFixes — which patches performance bottlenecks in the base Sigmally client.',
    },
    {
        question: 'Can I take and manage screenshots?',
        answer: 'Yes. Use a custom keybind to capture in-game screenshots instantly. View them by date in the Gallery tab, and download or delete them with one click.',
    },
];

function FAQ() {
    return (
        <section className='max-w-4xl mx-auto space-y-6'>
            <h2 className='text-3xl font-semibold text-center mb-8'>FAQ</h2>
            <Accordion type='single' collapsible className='space-y-4'>
                {faqData.map(({ question, answer }, i) => (
                    <AccordionItem key={i} value={`general-${i}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}
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

function GlowItems() {
    return (
        <>
            <Glow
                top='10%'
                left='-25%'
                opacity={0.27}
                width='700px'
                height='700px'
            />
            <Glow
                top='10%'
                right='-10%'
                opacity={0.1}
                width='600px'
                height='600px'
            />
            <Glow
                top='15%'
                left='40%'
                opacity={0.1}
                width='450px'
                height='450px'
            />
        </>
    );
}
