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
import { Glow } from '@/components/glow';

export default function Home() {
    return (
        <div className='space-y-6'>
            <HeroSection />
            <IntroductionSection />
            <MainPart />
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
                    Powerful mods for Sigmally – smoother gameplay, smarter
                    tools and more control in one place.
                </p>
                <div className='mt-6 flex gap-4 justify-center md:justify-start'>
                    <Button
                        variant={'outline'}
                        className='text-base font-semibold'
                    >
                        <Link href='/guide'>Get Started</Link>
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
        <section className='max-w-screen-lg mx-auto px-6 md:px-16 py-20'>
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
                        improving performance, responsiveness and precision. It
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
        </>
    );
}
