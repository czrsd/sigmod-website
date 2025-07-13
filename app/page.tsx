'use client';

import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { Glow } from '@/components/Glow';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';
import { discordLink } from '@/utils/getLink';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <IntroductionSection />
            <MainPart />
            <FAQSection />
            <CommunitySection />
            <FooterSection />
            <GlowItems />
        </div>
    );
}

function HeroSection() {
    return (
        <section className='flex flex-col md:flex-row md:flex-grow px-6 md:px-16 py-24 gap-12'>
            <div className='md:w-1/2 text-center md:text-left mt-10'>
                <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight'>
                    <span className='bg-gradient-to-r from-[var(--glow)] to-purple-500 text-transparent bg-clip-text [text-wrap:balance]'>
                        Sigmally Modz
                    </span>
                </h1>
                <p className='mt-4 max-w-xl text-base sm:text-lg md:text-xl text-muted-foreground'>
                    Take Sigmally to the next level — faster gameplay, smarter
                    tools, and full control at your fingertips.
                </p>

                <div className='mt-6 flex gap-4 justify-center md:justify-start'>
                    <Button
                        variant={'outline'}
                        className='text-base font-semibold'
                        asChild
                    >
                        <Link href='/guide'>
                            Get Started <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
                <Carousel
                    opts={{ loop: true }}
                    plugins={[Autoplay({ delay: 3000 })]}
                    className='w-full mx-w-md md:max-w-2xl'
                >
                    <CarouselContent className='-ml-4'>
                        <CarouselItem className='pl-4'>
                            <Image
                                src='/screenshots/sigmod_menu.png'
                                alt='SigMod Menu'
                                width={800}
                                height={600}
                                className='rounded-xl shadow-md'
                            />
                        </CarouselItem>
                        <CarouselItem className='pl-4'>
                            <Image
                                src='/screenshots/macros.png'
                                alt='Macros preview'
                                width={800}
                                height={600}
                                className='rounded-xl shadow-md'
                            />
                        </CarouselItem>
                        <CarouselItem className='pl-4'>
                            <Image
                                src='/screenshots/customization.png'
                                alt='Game customization'
                                width={800}
                                height={400}
                                className='rounded-xl shadow-md'
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
}

function IntroductionSection() {
    return (
        <section className='max-w-screen-lg mx-auto px-6 md:px-16 py-14'>
            <div className='flex flex-col md:flex-row gap-12 md:gap-24'>
                <div className='md:w-1/2 text-center md:text-left space-y-4'>
                    <h3 className='text-2xl font-semibold'>What’s Sigmally?</h3>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                        Sigmally is a private server-based agar.io-style game.
                        Fast-paced, competitive, and accessible in-browser, it’s
                        built for players who want simplicity and enjoyable
                        physics.
                        <br />
                        Eat pellets, grow by consuming other players and
                        dominate the leaderboard.
                    </p>
                </div>
                <div className='md:w-1/2 text-center md:text-left space-y-4'>
                    <h3 className='text-2xl font-semibold'>
                        Why{' '}
                        <span className='text-highlight'>Sigmally Modz</span>?
                    </h3>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                        Sigmally Modz gives you deeper control over the game.
                        Whether you’re a casual or competitive player, the mods
                        help with macros, multibox tools, smoother visuals and
                        customization.
                        <br />
                        Everything is designed to boost performance and gameplay
                        comfort.
                    </p>
                </div>
            </div>
        </section>
    );
}

function MainPart() {
    return (
        <section className='flex flex-col gap-24 px-6 md:px-16 py-32 max-w-screen-xl mx-auto'>
            <article className='flex flex-col md:flex-row items-center md:items-start gap-12'>
                <div className='md:w-1/2 flex justify-center md:justify-end'>
                    <Image
                        src='/screenshots/sigmod_menu.png'
                        width={600}
                        height={400}
                        alt='SigMod preview'
                        className='rounded-lg shadow-lg'
                        priority
                    />
                </div>
                <div className='md:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-3xl font-semibold mb-4'>SigMod</h2>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                        SigMod enhances your overall Sigmally experience with
                        powerful features like macros, custom themes, advanced
                        settings and more. Designed for smoother gameplay and
                        smarter control, it gives you the tools to play your
                        best.
                    </p>
                    <div className='mt-6'>
                        <Button asChild>
                            <Link href='/guide/sigmod'>
                                Learn more & install
                            </Link>
                        </Button>
                    </div>
                </div>
            </article>

            <article className='flex flex-col md:flex-row-reverse items-center md:items-start gap-12'>
                <div className='md:w-1/2 flex justify-center md:justify-start'>
                    <Image
                        src='/screenshots/customization.png'
                        width={600}
                        height={400}
                        alt='SigFixes preview'
                        className='rounded-lg shadow-lg'
                        priority
                    />
                </div>
                <div className='md:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-3xl font-semibold mb-4'>SigFixes</h2>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                        SigFixes rewrites major parts of the Sigmally client,
                        improving performance, stability and precision. It
                        eliminates lag spikes, allows multiboxing and adds
                        options like draw delay, custom opacity, name scaling
                        and much more.
                    </p>
                    <div className='mt-6'>
                        <Button asChild>
                            <Link href='/guide/sigfixes'>
                                Learn more & install
                            </Link>
                        </Button>
                    </div>
                </div>
            </article>
        </section>
    );
}

function FAQSection() {
    return (
        <section className='px-6 md:px-16 py-32 max-w-4xl mx-auto'>
            <h3 className='text-4xl font-bold text-center mb-12'>FAQ</h3>
            <Accordion type='single' collapsible className='space-y-4'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger>
                        Are tampermonkey and the userscripts safe?
                    </AccordionTrigger>
                    <AccordionContent>
                        Absolutely, because who wouldn’t trust installing random
                        scripts from the internet to improve their game, right?
                        But seriously — Tampermonkey is a well-established tool
                        used by millions, and our userscripts only tweak your
                        game experience without any funny business. There are
                        also reviews on the script pages. So yeah, it’s safe.
                        Use with confidence.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger>
                        Do I need both SigMod and SigFixes?
                    </AccordionTrigger>
                    <AccordionContent>
                        No, but using both gives the best performance and
                        customization. They're designed to work together.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3'>
                    <AccordionTrigger>
                        Is SigMod and SigFixes allowed in Sigmally?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. SigMod is approved by the owner of Sigmally and
                        widely embraced by the community. Both mods are fully
                        accepted.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-4'>
                    <AccordionTrigger>
                        Can I uninstall the mods anytime?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes, just disable or remove them from your userscript
                        manager.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-99'>
                    <AccordionTrigger>
                        Will SigMod make me a pro gamer overnight?
                    </AccordionTrigger>
                    <AccordionContent>
                        If only! SigMod can make gameplay smoother and easier,
                        but it won't do your skills or reflexes for you.
                        Practice still required.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
}

function CommunitySection() {
    return (
        <section className='px-6 md:px-16 py-24 max-w-4xl mx-auto flex flex-col items-center text-center space-y-8'>
            <h3 className='text-4xl font-bold'>Community</h3>
            <p className='text-base text-muted-foreground max-w-prose'>
                Sigmally Modz has a Discord server — not the most lively place,
                but perfect if you’ve found a bug, need help, or just want to
                ask “why is this broken?” at 3AM. Support lives there
                (sometimes).
            </p>
            <Button
                className='bg-blue-700 hover:bg-blue-800 text-foreground px-6 py-4 text-base font-medium'
                asChild
            >
                <Link href={discordLink} target='_blank'>
                    Join Discord
                </Link>
            </Button>
        </section>
    );
}

function FooterSection() {
    return (
        <footer className='w-full bg-black/60 px-6 md:px-16 py-10 border-t'>
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground'>
                <div className='text-center md:text-left'>
                    © 2025 Sigmally Modz. Not affiliated with Sigmally. Built
                    with ♥.
                </div>
                <div className='flex gap-4'>
                    <Link
                        href='https://github.com/czrsd/sigmod'
                        target='_blank'
                        className='hover:underline'
                        rel='noopener noreferrer'
                    >
                        SigMod GitHub
                    </Link>
                    <Link
                        href='https://github.com/8y8x/sigmally-fixes'
                        target='_blank'
                        className='hover:underline'
                        rel='noopener noreferrer'
                    >
                        SigFixes GitHub
                    </Link>
                </div>
            </div>
        </footer>
    );
}

function GlowItems() {
    return (
        <>
            <Glow
                top='10%'
                left='-10%'
                width='500px'
                height='500px'
                opacity={0.15}
                blur='100px'
            />
            <Glow
                top='30%'
                right='-10%'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />

            <Glow
                top='128%'
                left='-20%'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />
            <Glow
                top='200%'
                right='-20%'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />
        </>
    );
}
