'use client';

import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
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
import { useTranslations } from 'next-intl';

export default function Home() {
    return (
        <div>
            <HeroSection />
            <IntroductionSection />
            <ModsSections />
            <FAQSection />
            <CommunitySection />
            <FooterSection />
            <GlowItems />
        </div>
    );
}

function HeroSection() {
    const t = useTranslations('HomePage.hero');
    return (
        <section className='flex flex-col md:flex-row md:flex-grow px-6 md:px-16 py-24 gap-12'>
            <div className='md:w-1/2 text-center md:text-left mt-10'>
                <h1 className='text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight'>
                    <span className='bg-gradient-to-r from-[var(--glow)] to-purple-500 text-transparent bg-clip-text [text-wrap:balance]'>
                        {t('title')}
                    </span>
                </h1>
                <p className='mt-4 max-w-lg text-base sm:text-lg md:text-xl text-muted-foreground'>
                    {t('sub')}
                </p>

                <div className='mt-6 flex gap-4 justify-center md:justify-start'>
                    <Button
                        variant={'outline'}
                        className='text-base font-semibold'
                        asChild
                    >
                        <Link href='/guide'>
                            {t('start')} <ArrowRight />
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
                </Carousel>
            </div>
        </section>
    );
}

function IntroductionSection() {
    const t = useTranslations('HomePage.introduction');

    return (
        <section className='max-w-screen-lg mx-auto px-6 md:px-16 py-14'>
            <div className='flex flex-col md:flex-row gap-12 md:gap-24'>
                <div className='md:w-1/2 text-center md:text-left space-y-4'>
                    <h3 className='text-2xl font-semibold'>
                        {t('what.title')}
                    </h3>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                        {t('what.desc')}
                    </p>
                </div>
                <div className='md:w-1/2 text-center md:text-left space-y-4'>
                    <h3 className='text-2xl font-semibold'>
                        <span>{t('why.title')} </span>
                        <span className='text-highlight'>Sigmally Modz</span>
                        <span>?</span>
                    </h3>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                        {t('why.desc')}
                    </p>
                </div>
            </div>
        </section>
    );
}

function ModsSections() {
    const t = useTranslations('HomePage.mods');
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
                    <h2 className='text-3xl font-semibold mb-4'>
                        {t('sigmod.title')}
                    </h2>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                        {t('sigmod.desc')}
                    </p>
                    <div className='mt-6'>
                        <Button asChild>
                            <Link href='/guide/sigmod'>{t('learnMore')}</Link>
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
                    <h2 className='text-3xl font-semibold mb-4'>
                        {t('sigfixes.title')}
                    </h2>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                        {t('sigfixes.desc')}
                    </p>
                    <div className='mt-6'>
                        <Button asChild>
                            <Link href='/guide/sigfixes'>{t('learnMore')}</Link>
                        </Button>
                    </div>
                </div>
            </article>
        </section>
    );
}

export function FAQSection() {
    const t = useTranslations('HomePage.faq');
    const questions = t.raw('questions') as {
        question: string;
        answer: string;
    }[];

    return (
        <section className='px-6 md:px-16 py-32 max-w-4xl mx-auto'>
            <h3 className='text-4xl font-bold text-center mb-12'>FAQ</h3>
            <Accordion type='single' collapsible className='space-y-4'>
                {questions.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}

function CommunitySection() {
    const t = useTranslations('HomePage.community');
    return (
        <section className='px-6 md:px-16 py-24 max-w-4xl mx-auto flex flex-col items-center text-center space-y-8'>
            <h3 className='text-4xl font-bold'>{t('title')}</h3>
            <p className='text-base text-muted-foreground max-w-prose'>
                {t('desc')}
            </p>
            <Button
                className='bg-blue-700 hover:bg-blue-800 text-foreground px-6 py-4 text-base font-medium'
                asChild
            >
                <Link href={discordLink} target='_blank'>
                    {t('join')}
                </Link>
            </Button>
        </section>
    );
}

function FooterSection() {
    const t = useTranslations('Footer');
    return (
        <footer className='w-full bg-black/60 px-6 md:px-16 py-10 border-t'>
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground'>
                <div className='text-center md:text-left'>{t('text')}</div>
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
